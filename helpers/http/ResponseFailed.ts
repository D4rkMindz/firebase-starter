interface ErrorMessage {
    field: string,
    message: string,
}

interface ResponseError {
    type: string,
    errors?: ErrorMessage[],
}

interface ResponseFailed extends ResponseBase {
    error: ResponseError,
}