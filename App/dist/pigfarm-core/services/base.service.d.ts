import { BehaviorSubject } from 'rxjs';
import { MessageConstants } from '../_core/_constants';
export declare class BaseService {
    valueSource: BehaviorSubject<MessageConstants>;
    currentValue: import("rxjs").Observable<MessageConstants>;
    constructor();
    protected handleError(errorResponse: any): import("rxjs").Observable<never>;
    changeValue(message: MessageConstants): void;
}
