import { Response, Request } from 'express';
import { ApiResponse } from '../../utils/apiResponse';

export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

export const mockRequest = (body = {}, params = {}, query = {}): Partial<Request> => ({
  body,
  params,
  query,
  get: jest.fn(),
  header: jest.fn(),
  accepts: jest.fn(),
  acceptsCharsets: jest.fn(),
  acceptsEncodings: jest.fn(),
  acceptsLanguages: jest.fn(),
  param: jest.fn(),
  is: jest.fn(),
  protocol: 'http',
  secure: false,
  ip: '127.0.0.1',
  ips: [],
  subdomains: [],
  path: '/',
  hostname: 'localhost',
  host: 'localhost:3000',
  fresh: false,
  stale: true,
  xhr: false,
  method: 'GET',
  url: '/',
  originalUrl: '/',
  baseUrl: '',
  cookies: {},
  signedCookies: {},
  app: {} as any,
  res: {} as any,
  next: jest.fn(),
});

export const mockNext = jest.fn();

export const expectSuccessResponse = (
  response: Response,
  data: unknown,
  message = 'Success',
  statusCode = 200
) => {
  expect(response.status).toHaveBeenCalledWith(statusCode);
  expect(response.json).toHaveBeenCalledWith({
    success: true,
    data,
    message,
  });
};

export const expectErrorResponse = (
  response: Response,
  message: string,
  statusCode = 500,
  errorCode = 'INTERNAL_SERVER_ERROR',
  details: Record<string, unknown> = {}
) => {
  expect(response.status).toHaveBeenCalledWith(statusCode);
  expect(response.json).toHaveBeenCalledWith({
    success: false,
    status: 'error',
    errorCode,
    message,
    details,
  });
}; 