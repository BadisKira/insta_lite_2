export interface IYupError {
    key: string,
    message: string,
    path: string,
    values?: {
        min?: number,
        max?: number,
    }
}

export interface IDisplayedError {
    path: string
    setError: React.Dispatch<React.SetStateAction<object>>
}