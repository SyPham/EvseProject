import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { OperationResult } from "../_core/models/application-user";
export declare class PigfarmCoreService {
    private http;
    private base;
    private recordSource;
    currentRecordEarTag: Observable<{}>;
    private recordLabelSource;
    currentRecordLabel: Observable<any>;
    constructor(http: HttpClient, base: any);
    changeRecordEarTag(farm: any): void;
    changLable(value: any): void;
    getBreedingByFarmGuid(farmGuid: any): Observable<any>;
    getMakeOrderByFarmGuid(farmGuid: any): Observable<any>;
    getMakeOrderByFarmGuidAndPigType(farmGuid: any, pigType: any): Observable<any>;
    removeRecord2Pig(model: any): Observable<OperationResult>;
    addRecord2Pig(model: any): Observable<OperationResult>;
    getPensByFarmGuidOrRoomGuid(farmGuid: any, roomGuid: any): Observable<any>;
    getByFarmGuid(farmGuid: any): Observable<any>;
    getRoomsByFarmGuid(farmGuid: any, barnGuid: any, makeOrderGuid: any): Observable<any>;
    getBreeding2SowInByBreedingGuid(breedingGuid: any): Observable<any>;
    protected handleError(errorResponse: any): Observable<never>;
}
