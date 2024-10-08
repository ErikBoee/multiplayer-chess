import { Response } from "express";
import { Send } from "express-serve-static-core";
import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
