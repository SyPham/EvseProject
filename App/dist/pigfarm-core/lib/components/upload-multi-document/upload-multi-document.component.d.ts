import { OnInit, ChangeDetectorRef } from "@angular/core";
import { UploaderComponent, SelectedEventArgs, FileInfo, RemovingEventArgs } from "@syncfusion/ej2-angular-inputs";
import { AlertifyService } from "../../../services/alertify.service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
export declare class UploadMultiDocumentComponent implements OnInit {
    private baseUrl;
    private alertify;
    private cd;
    private http;
    translate: TranslateService;
    uploadObj: UploaderComponent;
    allowExtensions: string;
    dropElement: HTMLElement;
    filesName: string[];
    filesDetails: FileInfo[];
    filesList: HTMLElement[];
    uploadWrapper: HTMLElement;
    parentElement: HTMLElement;
    path: any;
    allowedExtensions: string;
    id: any;
    multiple: boolean;
    autoUpload: boolean;
    enabled: boolean;
    service: any;
    files: any[];
    controlerName: string;
    file: any;
    showFile: any;
    alert: {
        updateMessage: any;
        updateTitle: any;
        createMessage: any;
        createTitle: any;
        deleteMessage: any;
        deleteTitle: any;
        cancelMessage: any;
        serverError: any;
        deleted_ok_msg: any;
        created_ok_msg: any;
        updated_ok_msg: any;
        system_error_msg: any;
        exist_message: any;
        choose_farm_message: any;
        select_order_message: any;
        yes_message: any;
        no_message: any;
    };
    downloadUrl: string;
    ngOnInit(): void;
    onSelect(args: SelectedEventArgs): void;
    validateFiles(args: any, viewedFiles: FileInfo[]): FileInfo[];
    formSelectedData(file: FileInfo, proxy: any): void;
    uploadFile(args: any): void;
    removeFiles(args: any): void;
    onFileUpload(args: any): void;
    onUploadSuccess(args: any): void;
    generateSpinner(targetElement: HTMLElement): void;
    onUploadFailed(args: any): void;
    readURL(li: HTMLElement, args: any): void;
    onFileRemove(args: RemovingEventArgs): void;
    constructor(baseUrl: any, alertify: AlertifyService, cd: ChangeDetectorRef, http: HttpClient, translate: TranslateService);
}