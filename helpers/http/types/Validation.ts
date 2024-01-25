interface Validation<Data = never> {
    success: boolean;
    message: string;
    type: string;
    data?: Data;
}