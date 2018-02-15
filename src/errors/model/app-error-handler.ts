import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('An unexpected error occurred.'); // use toaster
        console.log(error); // log to console
        // also log to database
    }
}
