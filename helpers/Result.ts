interface ErrorField {
    field: string,
    message: string,
}

interface ErrorData {
    type: string | null,
    errors: ErrorField[]
}

export class Result<Data = never> {
    private error: ErrorData = {
        type: null,
        errors: [],
    };

    constructor(
        public message?: string,
        public success: boolean = false,
        private data: Data | null = null
    ) {
    }

    public setData(data: Data): this {
        this.data = data;
        return this;
    }

    public getData(): Data | null {
        return this.data;
    }

    public addError(field: string, message: string): this {
        this.error.errors.push({field: field, message: message});
        return this;
    }

    public getError(field: string, separator: string = ", "): string {
        let errorMessage = '';
        for (let i = 0; i < this.error.errors.length; i++) {
            if (this.error.errors[i].field == field) {
                errorMessage += this.error.errors[i].message + separator;
            }
        }

        if (errorMessage.endsWith(separator)) {
            errorMessage = errorMessage.slice(0, -(separator.length));
        }

        if (!errorMessage) {
            throw new Error("Field " + field + " has no error");
        }

        return errorMessage;
    }

    public hasError(field: string): boolean {
        return this.error.errors.some(error => error.field == field);
    }

    public setErrorType(type: string): this {
        this.error.type = type;
        return this;
    }
}