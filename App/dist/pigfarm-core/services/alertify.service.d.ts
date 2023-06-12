import { TranslateService } from '@ngx-translate/core';
export declare class AlertifyService {
    private trans;
    $swal: any;
    constructor(trans: TranslateService);
    private Toast;
    showLoading(timer?: number): void;
    confirm(title: string, message: string, okCallback: () => void): void;
    errorConfirm(title: string, message: string, okCallback: () => void): void;
    confirm2(title: string, message: string, okCallback: () => void, cancelCallback: () => void): void;
    confirm4(confirmButtonText: string, cancelButtonText: string, title: string, message: string, okCallback: () => void, cancelCallback: () => void, icon?: string): void;
    deleteConfirm(confirmButtonText: string, cancelButtonText: string, title: string, message: string, okCallback: () => void, cancelCallback: () => void): void;
    confirm5(confirmButtonText: string, cancelButtonText: string, title: string, message: string, okCallback: () => void, cancelCallback: () => void): void;
    confirm3(title: string, message: string, confirmButtonText: string, cancelButtonText: string, okCallback: () => void, cancelCallback: () => void): void;
    valid(title: string, message: string): Promise<boolean>;
    validation(title: string, message: string): void;
    success(message: string, noToast?: boolean): void;
    errorBackToLogin(message: string, btnText: string, callBack: any, showCancelButton?: boolean, errorCallBack?: () => void): void;
    error(message: string, noToast?: boolean): void;
    warning(message: string, noToast?: boolean): void;
    message(message: string, noToast?: boolean): void;
    messagePreventClosed(message: string, okCallback: () => void): void;
}
