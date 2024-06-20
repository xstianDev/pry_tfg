export interface IServerError {
    status: number;
    error: string;
}

/** Error que contiene un código de estado y un mensaje de error. */
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

/**
 * Rechaza la petición para manejarla en el catch de la promesa.
 * 
 * @param status - Código de estado.
 * @param error - Mensaje de error
 * @throws Error del servidor.
 */
export const reject = (status: number, error: string) => { throw new ServerError(status, error); };