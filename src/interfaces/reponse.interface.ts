export interface Response<T> {
    items:             T[];
    item:              T;
    state:             string;
    code:              string;
    message:           string;
}
