import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
export class BaseService {
    constructor() {
        this.valueSource = new BehaviorSubject(null);
        this.currentValue = this.valueSource.asObservable();
    }
    handleError(errorResponse) {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === 401) {
                return throwError(errorResponse.statusText);
            }
            const applicationError = errorResponse.headers.get('Application-Error');
            if (applicationError) {
                console.error(applicationError);
                return throwError(applicationError);
            }
            const serverError = errorResponse.error;
            let modalStateErrors = '';
            if (serverError && typeof serverError === 'object') {
                for (const key in serverError) {
                    if (serverError[key]) {
                        modalStateErrors += serverError[key] + '\n';
                    }
                }
            }
            return throwError(modalStateErrors || serverError || 'Server Error');
        }
    }
    changeValue(message) {
        this.valueSource.next(message);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9zZXJ2aWNlcy9iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsTUFBTSxPQUFPLFdBQVc7SUFHcEI7UUFGQSxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFtQixJQUFJLENBQUMsQ0FBQztRQUMxRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVQLFdBQVcsQ0FBQyxhQUFrQjtRQUN0QyxJQUFJLGFBQWEsWUFBWSxpQkFBaUIsRUFBRTtZQUM5QyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUNoQyxPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0M7WUFDRCxNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDeEUsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN4QyxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLFdBQVcsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xELEtBQUssTUFBTSxHQUFHLElBQUksV0FBVyxFQUFFO29CQUM3QixJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDcEIsZ0JBQWdCLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDN0M7aUJBQ0Y7YUFDRjtZQUNELE9BQU8sVUFBVSxDQUFDLGdCQUFnQixJQUFJLFdBQVcsSUFBSSxjQUFjLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFDRCxXQUFXLENBQUMsT0FBeUI7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlQ29uc3RhbnRzIH0gZnJvbSAnLi4vX2NvcmUvX2NvbnN0YW50cyc7XHJcbmV4cG9ydCBjbGFzcyBCYXNlU2VydmljZSB7XHJcbiAgICB2YWx1ZVNvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWVzc2FnZUNvbnN0YW50cz4obnVsbCk7XHJcbiAgICBjdXJyZW50VmFsdWUgPSB0aGlzLnZhbHVlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3IoZXJyb3JSZXNwb25zZTogYW55KSB7XHJcbiAgICAgIGlmIChlcnJvclJlc3BvbnNlIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcclxuICAgICAgICBpZiAoZXJyb3JSZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JSZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXBwbGljYXRpb25FcnJvciA9IGVycm9yUmVzcG9uc2UuaGVhZGVycy5nZXQoJ0FwcGxpY2F0aW9uLUVycm9yJyk7XHJcbiAgICAgICAgaWYgKGFwcGxpY2F0aW9uRXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYXBwbGljYXRpb25FcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihhcHBsaWNhdGlvbkVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VydmVyRXJyb3IgPSBlcnJvclJlc3BvbnNlLmVycm9yO1xyXG4gICAgICAgIGxldCBtb2RhbFN0YXRlRXJyb3JzID0gJyc7XHJcbiAgICAgICAgaWYgKHNlcnZlckVycm9yICYmIHR5cGVvZiBzZXJ2ZXJFcnJvciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHNlcnZlckVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXJFcnJvcltrZXldKSB7XHJcbiAgICAgICAgICAgICAgbW9kYWxTdGF0ZUVycm9ycyArPSBzZXJ2ZXJFcnJvcltrZXldICsgJ1xcbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobW9kYWxTdGF0ZUVycm9ycyB8fCBzZXJ2ZXJFcnJvciB8fCAnU2VydmVyIEVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNoYW5nZVZhbHVlKG1lc3NhZ2U6IE1lc3NhZ2VDb25zdGFudHMpIHtcclxuICAgICAgICB0aGlzLnZhbHVlU291cmNlLm5leHQobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuIl19