import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class PigfarmCoreService {
    constructor(http, base) {
        this.http = http;
        this.base = base;
        this.recordSource = new BehaviorSubject({});
        this.currentRecordEarTag = this.recordSource.asObservable();
        this.recordLabelSource = new BehaviorSubject(null);
        this.currentRecordLabel = this.recordLabelSource.asObservable();
    }
    changeRecordEarTag(farm) {
        this.recordSource.next(farm);
    }
    changLable(value) {
        this.recordLabelSource.next(value);
    }
    getBreedingByFarmGuid(farmGuid) {
        return this.http.get(`${this.base}Breeding/GetBreedingByFarmGuid?farmGuid=${farmGuid}`, {});
    }
    getMakeOrderByFarmGuid(farmGuid) {
        return this.http.get(`${this.base}MakeOrder/GetMakeOrderByFarmGuid?farmGuid=${farmGuid}`, {});
    }
    getMakeOrderByFarmGuidAndPigType(farmGuid, pigType) {
        return this.http.get(`${this.base}MakeOrder/GetMakeOrderByFarmGuidAndPigType?farmGuid=${farmGuid}&pigType=${pigType}`, {});
    }
    removeRecord2Pig(model) {
        return this.http
            .post(`${this.base}Record/RemoveRecord2Pen`, model)
            .pipe(catchError(this.handleError));
    }
    addRecord2Pig(model) {
        return this.http
            .post(`${this.base}Record/AddRecord2Pen`, model)
            .pipe(catchError(this.handleError));
    }
    getPensByFarmGuidOrRoomGuid(farmGuid, roomGuid) {
        return this.http.get(`${this.base}Pen/getPensByFarmGuidOrRoomGuid?farmGuid=${farmGuid}&roomGuid=${roomGuid}`, {});
    }
    getByFarmGuid(farmGuid) {
        return this.http.get(`${this.base}RecordSale/GetByFarmGuid?farmGuid=${farmGuid}`, {});
    }
    getRoomsByFarmGuid(farmGuid, barnGuid, makeOrderGuid) {
        return this.http.get(`${this.base}Room/GetRoomsByFarmGuid?farmGuid=${farmGuid}&barnGuid=${barnGuid}&makeOrderGuid=${makeOrderGuid}`, {});
    }
    getBreeding2SowInByBreedingGuid(breedingGuid) {
        return this.http.get(`${this.base}Breeding/GetBreeding2SowInByBreedingGuid?breedingGuid=${breedingGuid}`, {});
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
}
PigfarmCoreService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PigfarmCoreService_Factory() { return new PigfarmCoreService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject("Env")); }, token: PigfarmCoreService, providedIn: "root" });
PigfarmCoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
PigfarmCoreService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlnZmFybS1jb3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL3NlcnZpY2VzL3BpZ2Zhcm0tY29yZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU01QyxNQUFNLE9BQU8sa0JBQWtCO0lBTTdCLFlBQW9CLElBQWdCLEVBQ1gsSUFBSTtRQURULFNBQUksR0FBSixJQUFJLENBQVk7UUFDWCxTQUFJLEdBQUosSUFBSSxDQUFBO1FBTnJCLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFFLENBQUM7UUFDaEQsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQyxzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFJdEQsQ0FBQztJQUNOLGtCQUFrQixDQUFDLElBQUk7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUNELFVBQVUsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ0QscUJBQXFCLENBQUMsUUFBUTtRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJ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QyxHQUFHLENBQUMsRUFBRTt3QkFDcEIsZ0JBQWdCLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDN0M7aUJBQ0Y7YUFDRjtZQUNELE9BQU8sVUFBVSxDQUFDLGdCQUFnQixJQUFJLFdBQVcsSUFBSSxjQUFjLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7Ozs7WUEzRUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFSUSxVQUFVOzRDQWdCZCxNQUFNLFNBQUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuaW1wb3J0IHsgT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSBcIi4uL19jb3JlL21vZGVscy9hcHBsaWNhdGlvbi11c2VyXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWdmYXJtQ29yZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmVjb3JkU291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSApO1xyXG4gIGN1cnJlbnRSZWNvcmRFYXJUYWcgPSB0aGlzLnJlY29yZFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICBwcml2YXRlIHJlY29yZExhYmVsU291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcclxuICBjdXJyZW50UmVjb3JkTGFiZWwgPSB0aGlzLnJlY29yZExhYmVsU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlXHJcbiAgICApIHt9XHJcbiAgY2hhbmdlUmVjb3JkRWFyVGFnKGZhcm0pIHtcclxuICAgIHRoaXMucmVjb3JkU291cmNlLm5leHQoZmFybSlcclxuICB9XHJcbiAgY2hhbmdMYWJsZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5yZWNvcmRMYWJlbFNvdXJjZS5uZXh0KHZhbHVlKVxyXG4gIH1cclxuICBnZXRCcmVlZGluZ0J5RmFybUd1aWQoZmFybUd1aWQpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlfUJyZWVkaW5nL0dldEJyZWVkaW5nQnlGYXJtR3VpZD9mYXJtR3VpZD0ke2Zhcm1HdWlkfWAsIHt9KTtcclxuICB9XHJcbiAgZ2V0TWFrZU9yZGVyQnlGYXJtR3VpZChmYXJtR3VpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55PihcclxuICAgICAgYCR7dGhpcy5iYXNlfU1ha2VPcmRlci9HZXRNYWtlT3JkZXJCeUZhcm1HdWlkP2Zhcm1HdWlkPSR7ZmFybUd1aWR9YCxcclxuICAgICAge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRNYWtlT3JkZXJCeUZhcm1HdWlkQW5kUGlnVHlwZShmYXJtR3VpZCxwaWdUeXBlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZX1NYWtlT3JkZXIvR2V0TWFrZU9yZGVyQnlGYXJtR3VpZEFuZFBpZ1R5cGU/ZmFybUd1aWQ9JHtmYXJtR3VpZH0mcGlnVHlwZT0ke3BpZ1R5cGV9YCwge30pO1xyXG4gIH1cclxuICByZW1vdmVSZWNvcmQyUGlnKG1vZGVsKTogT2JzZXJ2YWJsZTxPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3Q8T3BlcmF0aW9uUmVzdWx0PihgJHt0aGlzLmJhc2V9UmVjb3JkL1JlbW92ZVJlY29yZDJQZW5gLCBtb2RlbClcclxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSk7XHJcbiAgfVxyXG4gIGFkZFJlY29yZDJQaWcobW9kZWwpOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdDxPcGVyYXRpb25SZXN1bHQ+KGAke3RoaXMuYmFzZX1SZWNvcmQvQWRkUmVjb3JkMlBlbmAsIG1vZGVsKVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcclxuICB9XHJcbiAgZ2V0UGVuc0J5RmFybUd1aWRPclJvb21HdWlkKGZhcm1HdWlkLCByb29tR3VpZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZX1QZW4vZ2V0UGVuc0J5RmFybUd1aWRPclJvb21HdWlkP2Zhcm1HdWlkPSR7ZmFybUd1aWR9JnJvb21HdWlkPSR7cm9vbUd1aWR9YCwge30pO1xyXG4gIH1cclxuICBnZXRCeUZhcm1HdWlkKGZhcm1HdWlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZX1SZWNvcmRTYWxlL0dldEJ5RmFybUd1aWQ/ZmFybUd1aWQ9JHtmYXJtR3VpZH1gLCB7fSk7XHJcbiAgfVxyXG4gIGdldFJvb21zQnlGYXJtR3VpZChmYXJtR3VpZCwgYmFybkd1aWQsbWFrZU9yZGVyR3VpZCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZX1Sb29tL0dldFJvb21zQnlGYXJtR3VpZD9mYXJtR3VpZD0ke2Zhcm1HdWlkfSZiYXJuR3VpZD0ke2Jhcm5HdWlkfSZtYWtlT3JkZXJHdWlkPSR7bWFrZU9yZGVyR3VpZH1gLCB7fSk7XHJcbiAgfVxyXG4gIGdldEJyZWVkaW5nMlNvd0luQnlCcmVlZGluZ0d1aWQoYnJlZWRpbmdHdWlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZX1CcmVlZGluZy9HZXRCcmVlZGluZzJTb3dJbkJ5QnJlZWRpbmdHdWlkP2JyZWVkaW5nR3VpZD0ke2JyZWVkaW5nR3VpZH1gLCB7fSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3IoZXJyb3JSZXNwb25zZTogYW55KSB7XHJcbiAgICBpZiAoZXJyb3JSZXNwb25zZSBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAgIGlmIChlcnJvclJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3JSZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBhcHBsaWNhdGlvbkVycm9yID0gZXJyb3JSZXNwb25zZS5oZWFkZXJzLmdldCgnQXBwbGljYXRpb24tRXJyb3InKTtcclxuICAgICAgaWYgKGFwcGxpY2F0aW9uRXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGFwcGxpY2F0aW9uRXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGFwcGxpY2F0aW9uRXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHNlcnZlckVycm9yID0gZXJyb3JSZXNwb25zZS5lcnJvcjtcclxuICAgICAgbGV0IG1vZGFsU3RhdGVFcnJvcnMgPSAnJztcclxuICAgICAgaWYgKHNlcnZlckVycm9yICYmIHR5cGVvZiBzZXJ2ZXJFcnJvciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzZXJ2ZXJFcnJvcikge1xyXG4gICAgICAgICAgaWYgKHNlcnZlckVycm9yW2tleV0pIHtcclxuICAgICAgICAgICAgbW9kYWxTdGF0ZUVycm9ycyArPSBzZXJ2ZXJFcnJvcltrZXldICsgJ1xcbic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKG1vZGFsU3RhdGVFcnJvcnMgfHwgc2VydmVyRXJyb3IgfHwgJ1NlcnZlciBFcnJvcicpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxufVxyXG4iXX0=