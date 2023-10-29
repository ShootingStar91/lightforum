
export class NotFoundError extends Error {
  status: number;
  constructor (message: string = "Resource not found") {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

export class ForbiddenError extends Error {
  status: number;
  constructor (message: string = "Action forbidden") {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

export class InvalidParametersError extends Error {
  status: number;
  constructor (message: string = "Invalid parameters") {
    super(message);
    this.name = 'InvalidParametersError';
    this.status = 400;
  }
}

export type CustomError = NotFoundError | ForbiddenError | InvalidParametersError;
