import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
    private handleWebRequestExceptions;
    private handleApiRequestExceptions;
}
