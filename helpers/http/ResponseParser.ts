import {Result} from "~/helpers/Result";

export default class ResponseParser {
    constructor(
        public data: any,
        public error: any,
        public defaultMessage: string = 'Please check your data',
    ){}

    public parse(): Result {
        const result = new Result(this.defaultMessage, false);

        if (this.data?.value?.data) {
            result.message = this.data.value.message;
            result.success = this.data.value.success ?? true;
            return result;
        }

        if (this.error.value?.response?._data) {
            const errorResponse = this.error.value?.response?._data;
            result.message = errorResponse.message;
            result.success = false;
            if (errorResponse.error?.type) {
                result.setErrorType(errorResponse.error?.type);
            } else {
                result.setErrorType('generic');
            }
            const errors = errorResponse.error?.errors
            if (errors && errors.length > 0) {
                errors.forEach((err:any) => result.addError(err.field, err.message))
            }
        }

        return result;
    }
}