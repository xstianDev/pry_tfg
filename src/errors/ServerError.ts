export type IServerError = {
    status: number;
    error: string;
}

export default class ServerError extends Error implements IServerError {
    status: number;
    error: string;

    constructor(status: number, error: string) {
        super(error);
        this.status = status;
        this.error = error;
        // Error.captureStackTrace(this, this.constructor);
    }
}

export const reject = (status: number, error: string) => { throw new ServerError(status, error); };