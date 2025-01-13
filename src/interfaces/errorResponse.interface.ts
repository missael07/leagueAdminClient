export interface ErrorResponse {
    Data:              null;
    State:             string;
    Code:              string;
    Message:           string;
    ValidationResults: ValidationResults;
}

export interface ValidationResults {
    Isvalid:      boolean;
    InvalidItems: InvalidItem[];
}

export interface InvalidItem {
    IsValid:  boolean;
    Message:  string;
    ItemName: string;
}
