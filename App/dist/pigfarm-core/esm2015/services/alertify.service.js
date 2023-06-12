import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class AlertifyService {
    constructor(trans) {
        this.trans = trans;
        this.$swal = Swal;
        this.Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });
    }
    showLoading(timer = 2000) {
        {
            Swal({
                title: this.trans.instant('Now loading'),
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer,
                onOpen: () => {
                    Swal.showLoading();
                }
            }).then(() => { }, (dismiss) => {
                if (dismiss === 'timer') {
                    Swal({
                        title: this.trans.instant('Finished!'),
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
        }
    }
    confirm(title, message, okCallback) {
        Swal.fire({
            title,
            // text: message,
            html: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.trans.instant('Yes'),
            cancelButtonText: this.trans.instant('No!')
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(this.trans.instant('Cancelled'), this.trans.instant('Your imaginary file is safe :)'), this.trans.instant('error'));
            }
        });
    }
    errorConfirm(title, message, okCallback) {
        Swal.fire({
            title,
            text: message,
            icon: 'warning',
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: this.trans.instant('Yes'),
        }).then((result) => {
            okCallback();
        });
    }
    confirm2(title, message, okCallback, cancelCallback) {
        Swal.fire({
            title,
            html: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.trans.instant('Yes'),
            cancelButtonText: this.trans.instant('No!')
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelCallback();
            }
        });
    }
    confirm4(confirmButtonText = 'Yes', cancelButtonText = 'No', title, message, okCallback, cancelCallback, icon = 'warning') {
        Swal.fire({
            title,
            html: message,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelCallback();
            }
        });
    }
    deleteConfirm(confirmButtonText = 'Yes', cancelButtonText = 'No', title, message, okCallback, cancelCallback) {
        Swal.fire({
            title,
            html: message,
            icon: 'question',
            iconHtml: '<i class="fa fa-exclamation" aria-hidden="true"></i>',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelCallback();
            }
        });
    }
    confirm5(confirmButtonText = 'Yes', cancelButtonText = 'No', title, message, okCallback, cancelCallback) {
        Swal.fire({
            title,
            html: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelCallback();
            }
        });
    }
    confirm3(title, message, confirmButtonText, cancelButtonText, okCallback, cancelCallback) {
        Swal.fire({
            title,
            html: message,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            allowOutsideClick: false
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                cancelCallback();
            }
        });
    }
    valid(title, message) {
        return new Promise((res, rejects) => {
            Swal.fire({
                title,
                text: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: this.trans.instant('Yes'),
                cancelButtonText: this.trans.instant('No')
            }).then((result) => {
                if (result.value) {
                    res(true);
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    rejects(false);
                }
            });
        });
    }
    validation(title, message) {
        Swal.fire(title, message, 'warning');
    }
    success(message, noToast) {
        if (!noToast) {
            this.Toast.fire({
                icon: 'success',
                title: message
            });
        }
        else {
            Swal.fire(this.trans.instant('Successfully!'), message, 'success');
        }
    }
    errorBackToLogin(message, btnText, callBack, showCancelButton = false, errorCallBack = () => { }) {
        Swal.fire({
            text: message,
            icon: 'error',
            showCancelButton: showCancelButton,
            allowOutsideClick: false,
            confirmButtonText: `<i class="fa fa-backward"></i> ${this.trans.instant(btnText)}`,
            cancelButtonText: this.trans.instant('No') || 'No'
        }).then((result) => {
            if (result.value) {
                callBack();
            }
            else {
                errorCallBack();
            }
        });
    }
    error(message, noToast) {
        if (!noToast) {
            this.Toast.fire({
                icon: 'error',
                title: message
            });
        }
        else {
            Swal.fire(this.trans.instant('Error!'), message, 'error');
        }
    }
    warning(message, noToast) {
        if (!noToast) {
            this.Toast.fire({
                icon: 'warning',
                title: message
            });
        }
        else {
            Swal.fire(this.trans.instant('Warning!'), message, 'warning');
        }
    }
    message(message, noToast) {
        if (!noToast) {
            this.Toast.fire({
                icon: 'info',
                title: message
            });
        }
        else {
            Swal.fire(this.trans.instant('Info!'), message, 'info');
        }
    }
    messagePreventClosed(message, okCallback) {
        Swal.fire({
            html: message,
            icon: 'info',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: this.trans.instant('Confirm'),
            cancelButtonText: this.trans.instant('No!')
        }).then((result) => {
            if (result.value) {
                okCallback();
            }
        });
    }
}
AlertifyService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AlertifyService_Factory() { return new AlertifyService(i0.ɵɵinject(i1.TranslateService)); }, token: AlertifyService, providedIn: "root" });
AlertifyService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AlertifyService.ctorParameters = () => [
    { type: TranslateService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRpZnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvc2VydmljZXMvYWxlcnRpZnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFLdkQsTUFBTSxPQUFPLGVBQWU7SUFFMUIsWUFBb0IsS0FBdUI7UUFBdkIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFEcEMsVUFBSyxHQUFHLElBQUksQ0FBQztRQUVaLFVBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLFlBQVk7WUFDdEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixLQUFLLEVBQUUsSUFBSTtZQUNYLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBWDRDLENBQUM7SUFZaEQsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJO1FBQ3RCO1lBQ0UsSUFBSSxDQUFDO2dCQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBQ3hDLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixLQUFLO2dCQUNMLE1BQU0sRUFBRSxHQUFHLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLFdBQVcsRUFB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QixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLFVBQVUsRUFBRSxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7WUE3UEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFKUSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuZGVjbGFyZSBsZXQgU3dhbDogYW55O1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbGVydGlmeVNlcnZpY2Uge1xyXG4gIHB1YmxpYyAkc3dhbCA9IFN3YWw7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuczogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcbiAgcHJpdmF0ZSBUb2FzdCA9IFN3YWwubWl4aW4oe1xyXG4gICAgdG9hc3Q6IHRydWUsXHJcbiAgICBwb3NpdGlvbjogJ2JvdHRvbS1lbmQnLFxyXG4gICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxyXG4gICAgdGltZXI6IDMwMDAsXHJcbiAgICB0aW1lclByb2dyZXNzQmFyOiB0cnVlLFxyXG4gICAgb25PcGVuOiAodG9hc3QpID0+IHtcclxuICAgICAgdG9hc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIFN3YWwuc3RvcFRpbWVyKTtcclxuICAgICAgdG9hc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIFN3YWwucmVzdW1lVGltZXIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHNob3dMb2FkaW5nKHRpbWVyID0gMjAwMCkge1xyXG4gICAge1xyXG4gICAgICBTd2FsKHtcclxuICAgICAgICB0aXRsZTogdGhpcy50cmFucy5pbnN0YW50KCdOb3cgbG9hZGluZycpLFxyXG4gICAgICAgIGFsbG93RXNjYXBlS2V5OiBmYWxzZSxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgdGltZXIsXHJcbiAgICAgICAgb25PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICBTd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKFxyXG4gICAgICAgICgpID0+IHsgfSxcclxuICAgICAgICAoZGlzbWlzcykgPT4ge1xyXG4gICAgICAgICAgaWYgKGRpc21pc3MgPT09ICd0aW1lcicpIHtcclxuICAgICAgICAgICAgU3dhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRoaXMudHJhbnMuaW5zdGFudCgnRmluaXNoZWQhJyksXHJcbiAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgIHRpbWVyOiAyMDAwLFxyXG4gICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbmZpcm0odGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBva0NhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICBTd2FsLmZpcmUoe1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgLy8gdGV4dDogbWVzc2FnZSxcclxuICAgICAgaHRtbDogbWVzc2FnZSxcclxuICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogdGhpcy50cmFucy5pbnN0YW50KCdZZXMnKSxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy50cmFucy5pbnN0YW50KCdObyEnKVxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICBva0NhbGxiYWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRpc21pc3MgPT09IFN3YWwuRGlzbWlzc1JlYXNvbi5jYW5jZWwpIHtcclxuICAgICAgICBTd2FsLmZpcmUoXHJcbiAgICAgICAgICB0aGlzLnRyYW5zLmluc3RhbnQoJ0NhbmNlbGxlZCcpLFxyXG4gICAgICAgICAgdGhpcy50cmFucy5pbnN0YW50KCdZb3VyIGltYWdpbmFyeSBmaWxlIGlzIHNhZmUgOiknKSxcclxuICAgICAgICAgIHRoaXMudHJhbnMuaW5zdGFudCgnZXJyb3InKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBlcnJvckNvbmZpcm0odGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBva0NhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICBTd2FsLmZpcmUoe1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgdGV4dDogbWVzc2FnZSxcclxuICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICBhbGxvd0VzY2FwZUtleTogZmFsc2UsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLnRyYW5zLmluc3RhbnQoJ1llcycpLFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgb2tDYWxsYmFjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNvbmZpcm0yKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgb2tDYWxsYmFjazogKCkgPT4gdm9pZCwgY2FuY2VsQ2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBodG1sOiBtZXNzYWdlLFxyXG4gICAgICBpY29uOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLnRyYW5zLmluc3RhbnQoJ1llcycpLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLnRyYW5zLmluc3RhbnQoJ05vIScpXHJcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgIG9rQ2FsbGJhY2soKTtcclxuICAgICAgfSBlbHNlIGlmIChyZXN1bHQuZGlzbWlzcyA9PT0gU3dhbC5EaXNtaXNzUmVhc29uLmNhbmNlbCkge1xyXG4gICAgICAgIGNhbmNlbENhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBjb25maXJtNChjb25maXJtQnV0dG9uVGV4dCA9ICdZZXMnLGNhbmNlbEJ1dHRvblRleHQgPSAnTm8nLCB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIG9rQ2FsbGJhY2s6ICgpID0+IHZvaWQsIGNhbmNlbENhbGxiYWNrOiAoKSA9PiB2b2lkICwgaWNvbj0nd2FybmluZycpIHtcclxuICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBodG1sOiBtZXNzYWdlLFxyXG4gICAgICBpY29uOmljb24sXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBjb25maXJtQnV0dG9uVGV4dCxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogY2FuY2VsQnV0dG9uVGV4dFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICBva0NhbGxiYWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRpc21pc3MgPT09IFN3YWwuRGlzbWlzc1JlYXNvbi5jYW5jZWwpIHtcclxuICAgICAgICBjYW5jZWxDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZGVsZXRlQ29uZmlybShjb25maXJtQnV0dG9uVGV4dCA9ICdZZXMnLGNhbmNlbEJ1dHRvblRleHQgPSAnTm8nLCB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIG9rQ2FsbGJhY2s6ICgpID0+IHZvaWQsIGNhbmNlbENhbGxiYWNrOiAoKSA9PiB2b2lkICkge1xyXG4gICAgU3dhbC5maXJlKHtcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGh0bWw6IG1lc3NhZ2UsXHJcbiAgICAgIGljb246J3F1ZXN0aW9uJyxcclxuICAgICAgaWNvbkh0bWw6ICc8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPicsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBjb25maXJtQnV0dG9uVGV4dCxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogY2FuY2VsQnV0dG9uVGV4dFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICBva0NhbGxiYWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRpc21pc3MgPT09IFN3YWwuRGlzbWlzc1JlYXNvbi5jYW5jZWwpIHtcclxuICAgICAgICBjYW5jZWxDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY29uZmlybTUoY29uZmlybUJ1dHRvblRleHQgPSAnWWVzJyxjYW5jZWxCdXR0b25UZXh0ID0gJ05vJywgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBva0NhbGxiYWNrOiAoKSA9PiB2b2lkLCBjYW5jZWxDYWxsYmFjazogKCkgPT4gdm9pZCApIHtcclxuICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBodG1sOiBtZXNzYWdlLFxyXG4gICAgICBpY29uOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBjb25maXJtQnV0dG9uVGV4dCxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogY2FuY2VsQnV0dG9uVGV4dFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICBva0NhbGxiYWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRpc21pc3MgPT09IFN3YWwuRGlzbWlzc1JlYXNvbi5jYW5jZWwpIHtcclxuICAgICAgICBjYW5jZWxDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY29uZmlybTModGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBjb25maXJtQnV0dG9uVGV4dDogc3RyaW5nLCBjYW5jZWxCdXR0b25UZXh0OiBzdHJpbmcsIG9rQ2FsbGJhY2s6ICgpID0+IHZvaWQsIGNhbmNlbENhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICBTd2FsLmZpcmUoe1xyXG4gICAgICB0aXRsZSxcclxuICAgICAgaHRtbDogbWVzc2FnZSxcclxuICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogY29uZmlybUJ1dHRvblRleHQsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IGNhbmNlbEJ1dHRvblRleHQsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICBva0NhbGxiYWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0LmRpc21pc3MgPT09IFN3YWwuRGlzbWlzc1JlYXNvbi5jYW5jZWwpIHtcclxuICAgICAgICBjYW5jZWxDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgdmFsaWQodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqZWN0cykgPT4ge1xyXG4gICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IHRoaXMudHJhbnMuaW5zdGFudCgnWWVzJyksXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy50cmFucy5pbnN0YW50KCdObycpXHJcbiAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgIHJlcyh0cnVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5kaXNtaXNzID09PSBTd2FsLkRpc21pc3NSZWFzb24uY2FuY2VsKSB7XHJcbiAgICAgICAgICByZWplY3RzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHZhbGlkYXRpb24odGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICBTd2FsLmZpcmUodGl0bGUsIG1lc3NhZ2UsICd3YXJuaW5nJyk7XHJcbiAgfVxyXG5cclxuICBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZywgbm9Ub2FzdD86IGJvb2xlYW4pIHtcclxuICAgIGlmICghbm9Ub2FzdCkge1xyXG4gICAgICB0aGlzLlRvYXN0LmZpcmUoe1xyXG4gICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICB0aXRsZTogbWVzc2FnZVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFN3YWwuZmlyZSh0aGlzLnRyYW5zLmluc3RhbnQoJ1N1Y2Nlc3NmdWxseSEnKSwgbWVzc2FnZSwgJ3N1Y2Nlc3MnKTtcclxuICAgIH1cclxuICB9XHJcbiAgZXJyb3JCYWNrVG9Mb2dpbihtZXNzYWdlOiBzdHJpbmcsIGJ0blRleHQ6IHN0cmluZywgY2FsbEJhY2s6IGFueSwgc2hvd0NhbmNlbEJ1dHRvbiA9IGZhbHNlLCBlcnJvckNhbGxCYWNrID0gKCkgPT4ge30pIHtcclxuICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHNob3dDYW5jZWxCdXR0b24sXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6IGA8aSBjbGFzcz1cImZhIGZhLWJhY2t3YXJkXCI+PC9pPiAke3RoaXMudHJhbnMuaW5zdGFudChidG5UZXh0KX1gLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLnRyYW5zLmluc3RhbnQoJ05vJykgfHwgJ05vJ1xyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgIGNhbGxCYWNrKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JDYWxsQmFjaygpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIG5vVG9hc3Q/OiBib29sZWFuKSB7XHJcbiAgICBpZiAoIW5vVG9hc3QpIHtcclxuICAgICAgdGhpcy5Ub2FzdC5maXJlKHtcclxuICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgIHRpdGxlOiBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgU3dhbC5maXJlKHRoaXMudHJhbnMuaW5zdGFudCgnRXJyb3IhJyksIG1lc3NhZ2UsICdlcnJvcicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2FybmluZyhtZXNzYWdlOiBzdHJpbmcsIG5vVG9hc3Q/OiBib29sZWFuKSB7XHJcbiAgICBpZiAoIW5vVG9hc3QpIHtcclxuICAgICAgdGhpcy5Ub2FzdC5maXJlKHtcclxuICAgICAgICBpY29uOiAnd2FybmluZycsXHJcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBTd2FsLmZpcmUodGhpcy50cmFucy5pbnN0YW50KCdXYXJuaW5nIScpLCBtZXNzYWdlLCAnd2FybmluZycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIG5vVG9hc3Q/OiBib29sZWFuKSB7XHJcbiAgICBpZiAoIW5vVG9hc3QpIHtcclxuICAgICAgdGhpcy5Ub2FzdC5maXJlKHtcclxuICAgICAgICBpY29uOiAnaW5mbycsXHJcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBTd2FsLmZpcmUodGhpcy50cmFucy5pbnN0YW50KCdJbmZvIScpLCBtZXNzYWdlLCAnaW5mbycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVzc2FnZVByZXZlbnRDbG9zZWQoIG1lc3NhZ2U6IHN0cmluZywgb2tDYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgU3dhbC5maXJlKHtcclxuICAgICAgaHRtbDogbWVzc2FnZSxcclxuICAgICAgaWNvbjogJ2luZm8nLFxyXG4gICAgICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICBhbGxvd0VzY2FwZUtleTogZmFsc2UsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLnRyYW5zLmluc3RhbnQoJ0NvbmZpcm0nKSxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy50cmFucy5pbnN0YW50KCdObyEnKVxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICBva0NhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=