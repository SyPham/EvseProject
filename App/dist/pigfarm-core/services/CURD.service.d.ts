import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { MessageConstants } from "../_core/_constants";
import { UtilitiesService } from "../services";
import { BaseService } from "./base.service";
import { OperationResult } from "../_core/models/application-user";
export interface ICURDService<T> {
    getAll(): Observable<T[]>;
    getById(id: any): Observable<T>;
    insertWithFormData(model: T): Observable<OperationResult>;
    updateWithFormData(model: T): Observable<OperationResult>;
    add(model: T): Observable<OperationResult>;
    update(model: T): Observable<OperationResult>;
    delete(id: any): Observable<OperationResult>;
    deleterange(ids: object[]): Observable<OperationResult>;
    changeValue(message: MessageConstants): any;
    getAudit(id: any): Observable<any>;
}
export declare class CURDService<T> extends BaseService implements ICURDService<T> {
    protected env: any;
    protected http: HttpClient;
    protected entity: string;
    protected utilitiesService: UtilitiesService;
    audits: string[];
    protected base: any;
    protected _sharedHeaders: HttpHeaders;
    constructor(env: any, http: HttpClient, entity: string, utilitiesService: UtilitiesService);
    getAll(): Observable<T[]>;
    getById(id: any): Observable<T>;
    insertWithFormData(model: T): Observable<OperationResult>;
    updateWithFormData(model: T): Observable<OperationResult>;
    add(model: T): Observable<OperationResult>;
    addRange(model: T[]): Observable<OperationResult>;
    updateRange(model: T[]): Observable<OperationResult>;
    update(model: T): Observable<OperationResult>;
    updatestatus(id: T): Observable<OperationResult>;
    delete(id: any): Observable<OperationResult>;
    deleterange(ids: object[]): Observable<OperationResult>;
    getAudit(id: any): Observable<T>;
    downloadODSFile(model: any): Observable<import("@angular/common/http").HttpResponse<Blob>>;
    downloadExcelFile(recordGuid: any): Observable<import("@angular/common/http").HttpResponse<Blob>>;
    excelExportRecordSale(p: {
        pigs: any[];
    }): Observable<import("@angular/common/http").HttpResponse<Blob>>;
    downloadBlob(data: any, fileName: any, mimeType: any): void;
}
