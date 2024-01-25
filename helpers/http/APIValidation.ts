import {Result} from "~/helpers/Result";
import ResponseParser from "~/helpers/http/ResponseParser";

export default class APIValidation {
    constructor(
        public type: string = '', // the URL without /v1/ => e.g. "users/validate/username"
        public defaultMessage: string = 'Please check your data',
    ) {
    }

    public async validate(value: any, key: string): Promise<Result> {
        const {data, error} = await useAPIAuthenticated<ResponseData<Validation>>('/v1/' + this.type, {
            method: 'POST',
            body: JSON.stringify({
                [key]: value,
            }),
        });

        return new ResponseParser(data, error).parse();
    }

    public async validatePublic(value: any, key: string): Promise<Result> {
        const {data, error} = await useAPI<ResponseData<Validation>>('/v1/' + this.type, {
            method: 'POST',
            body: JSON.stringify({
                [key]: value,
            }),
        });

        return new ResponseParser(data, error).parse();
    }
}