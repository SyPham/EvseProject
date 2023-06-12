import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, Input, ViewChild, Inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UploaderComponent, } from "@syncfusion/ej2-angular-inputs";
import { MessageConstants } from "../../../_core/_constants";
import { AlertifyService } from "../../../services/alertify.service";
export class UploadDocumentComponent {
    constructor(baseUrl, alertify, cd, http, translate) {
        this.baseUrl = baseUrl;
        this.alertify = alertify;
        this.cd = cd;
        this.http = http;
        this.translate = translate;
        this.allowedExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
        this.multiple = false;
        this.autoUpload = true;
        this.enabled = true;
        this.files = [];
        this.showFile = false;
        this.showImgFile = false;
        this.alert = {
            updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
            updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
            createMessage: this.translate.instant(MessageConstants.CREATE_MESSAGE),
            createTitle: this.translate.instant(MessageConstants.CREATE_TITLE),
            deleteMessage: this.translate.instant(MessageConstants.DELETE_MESSAGE),
            deleteTitle: this.translate.instant(MessageConstants.DELETE_TITLE),
            cancelMessage: this.translate.instant(MessageConstants.CANCEL_MESSAGE),
            serverError: this.translate.instant(MessageConstants.SERVER_ERROR),
            deleted_ok_msg: this.translate.instant(MessageConstants.DELETED_OK_MSG),
            created_ok_msg: this.translate.instant(MessageConstants.CREATED_OK_MSG),
            updated_ok_msg: this.translate.instant(MessageConstants.UPDATED_OK_MSG),
            system_error_msg: this.translate.instant(MessageConstants.SYSTEM_ERROR_MSG),
            exist_message: this.translate.instant(MessageConstants.EXIST_MESSAGE),
            choose_farm_message: this.translate.instant(MessageConstants.CHOOSE_FARM_MESSAGE),
            select_order_message: this.translate.instant(MessageConstants.SELECT_ORDER_MESSAGE),
            yes_message: this.translate.instant(MessageConstants.YES_MSG),
            no_message: this.translate.instant(MessageConstants.NO_MSG),
        };
        this.allImages = ['.jpg', '.gif', '.png'];
        this.onUploadSuccess = (args) => {
            this.getFileInfo();
            this.uploadObj.clearAll();
        };
    }
    ngOnChanges(changes) {
        if (changes['service'] && changes.service.currentValue) {
            this.initialUploader();
            this.cd.detectChanges();
        }
    }
    ngAfterViewInit() {
        // this.initialUploader();
        // this.cd.detectChanges();
    }
    ngOnInit() { }
    beforeUpload(args) {
        args.statusText = args.response.statusText;
    }
    initialUploader() {
        if (!this.path) {
            this.path = {
                saveUrl: `${this.baseUrl}${this.controlerName}/Save?id=${this.id}`,
                removeUrl: `${this.baseUrl}${this.controlerName}/remove?id=${this.id}`,
            };
        }
        this.downloadUrl = `${this.baseUrl}${this.controlerName}/Download?id=${this.id}`;
        this.getFileInfo();
    }
    getFileInfo() {
        this.service.getFilesById(this.id).subscribe((file) => {
            if (file.name !== "") {
                this.files = [file];
                this.file = file;
                this.showFile = true;
                this.showImgFile = this.allImages.indexOf(file.type) !== -1;
            }
            else {
                this.files = null;
                this.file = null;
                this.showFile = false;
                this.showImgFile = false;
                this.uploadObj.refresh();
            }
        }, (error) => {
            this.files = null;
            this.file = null;
            this.showFile = false;
            this.uploadObj.refresh();
        });
    }
    onSelected(args) {
        args.filesData.splice(5);
        let filesData = args.filesData;
        let allFiles = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (let i = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            args.modifiedFilesData = args.filesData;
        }
        this.showFile = args.filesData.length > 0;
        if (this.showFile) {
            this.showImgFile = this.allImages.indexOf(this.showFile[0].type) !== -1;
        }
        args.isModified = true;
    }
    onFileRemove(args) {
        args.postRawFile = false;
    }
    removeFile() {
        this.remove();
    }
    remove() {
        this.alertify.confirm4(this.alert.yes_message, this.alert.no_message, this.alert.deleteTitle, this.alert.deleteMessage, () => {
            let ajax = new XMLHttpRequest();
            ajax.open("POST", `${this.baseUrl}${this.controlerName}/remove?id=${this.id}`);
            ajax.onload = () => {
                this.getFileInfo();
                this.alertify.success(this.alert.deleted_ok_msg);
            };
            ajax.send();
        }, () => {
            this.alertify.error(this.alert.cancelMessage);
        });
    }
    download() {
        let downloadLink = document.createElement("a");
        downloadLink.href = this.downloadUrl;
        downloadLink.setAttribute("download", this.file.name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}
UploadDocumentComponent.decorators = [
    { type: Component, args: [{
                selector: "app-upload-document",
                template: "<ejs-uploader\r\n  [allowedExtensions]=\"allowedExtensions\"\r\n  (selected)=\"onSelected($event)\"\r\n  #defaultupload\r\n  id=\"defaultfileupload\"\r\n  (failure)=\"beforeUpload($event)\"\r\n  [multiple]=\"multiple\"\r\n  [asyncSettings]=\"path\"\r\n  [autoUpload]=\"autoUpload\"\r\n  [enabled]=\"enabled\"\r\n  (success)=\"onUploadSuccess($event)\"\r\n  (removing)=\"onFileRemove($event)\"\r\n>\r\n</ejs-uploader>\r\n\r\n<div *ngIf=\"showFile\">\r\n  <ul class=\"list-group\">\r\n    <li\r\n      class=\"list-group-item d-flex justify-content-between align-items-center\"\r\n      style=\"color: green\"\r\n    >\r\n      <div *ngIf=\"!showImgFile\">\r\n        {{ file?.name }}\r\n      </div>\r\n      <div class=\"text-center\" *ngIf=\"showImgFile\">\r\n        <img [src]=\"downloadUrl\" class=\"rounded\" alt=\"{{ file?.name }}\">\r\n      </div>\r\n      <div>\r\n        <button class=\"btn btn-sm btn-primary\" (click)=\"download()\">\r\n          <i\r\n          class=\"fa fa-file-download mx-2\"\r\n          style=\"cursor: pointer\"\r\n        ></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-danger\" (click)=\"removeFile()\" *ngIf=\"enabled\">\r\n        <i class=\"fa fa-trash\" style=\"cursor: pointer\" ></i>\r\n        </button>\r\n\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</div>\r\n",
                styles: [".a{cursor:pointer}"]
            },] }
];
UploadDocumentComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: AlertifyService },
    { type: ChangeDetectorRef },
    { type: HttpClient },
    { type: TranslateService }
];
UploadDocumentComponent.propDecorators = {
    uploadObj: [{ type: ViewChild, args: [UploaderComponent,] }],
    path: [{ type: Input }],
    allowedExtensions: [{ type: Input }],
    id: [{ type: Input }],
    multiple: [{ type: Input }],
    autoUpload: [{ type: Input }],
    enabled: [{ type: Input }],
    service: [{ type: Input }],
    files: [{ type: Input }],
    controlerName: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLWRvY3VtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvdXBsb2FkLWRvY3VtZW50L3VwbG9hZC1kb2N1bWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFFTCxTQUFTLEVBR1QsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFJTCxpQkFBaUIsR0FDbEIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFPckUsTUFBTSxPQUFPLHVCQUF1QjtJQXdDbEMsWUFBbUMsT0FBTyxFQUNoQyxRQUF5QixFQUN6QixFQUFxQixFQUNyQixJQUFnQixFQUNqQixTQUEyQjtRQUpELFlBQU8sR0FBUCxPQUFPLENBQUE7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQXpDM0Isc0JBQWlCLEdBQUcsdURBQXVELENBQUM7UUFFNUUsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFFZixVQUFLLEdBQVUsRUFBRSxDQUFDO1FBRzNCLGFBQVEsR0FBUSxLQUFLLENBQUM7UUFDdEIs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QUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFsS0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDZ6Q0FBK0M7O2FBRWhEOzs7NENBeUNjLE1BQU0sU0FBQyxLQUFLO1lBL0NsQixlQUFlO1lBbkJ0QixpQkFBaUI7WUFIVixVQUFVO1lBWVYsZ0JBQWdCOzs7d0JBa0J0QixTQUFTLFNBQUMsaUJBQWlCO21CQUMzQixLQUFLO2dDQUNMLEtBQUs7aUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLEtBQUs7NEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEluamVjdFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gIFNlbGVjdGVkRXZlbnRBcmdzLFxyXG4gIEZpbGVJbmZvLFxyXG4gIFJlbW92aW5nRXZlbnRBcmdzLFxyXG4gIFVwbG9hZGVyQ29tcG9uZW50LFxyXG59IGZyb20gXCJAc3luY2Z1c2lvbi9lajItYW5ndWxhci1pbnB1dHNcIjtcclxuaW1wb3J0IHsgRW1pdFR5cGUgfSBmcm9tIFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZUNvbnN0YW50cyB9IGZyb20gXCIuLi8uLi8uLi9fY29yZS9fY29uc3RhbnRzXCI7XHJcblxyXG5pbXBvcnQgeyBBbGVydGlmeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYWxlcnRpZnkuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXVwbG9hZC1kb2N1bWVudFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vdXBsb2FkLWRvY3VtZW50LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL3VwbG9hZC1kb2N1bWVudC5jb21wb25lbnQuc2Nzc1wiXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFVwbG9hZERvY3VtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xyXG4gIEBWaWV3Q2hpbGQoVXBsb2FkZXJDb21wb25lbnQpIHVwbG9hZE9iajogVXBsb2FkZXJDb21wb25lbnQ7XHJcbiAgQElucHV0KCkgcGF0aDogYW55O1xyXG4gIEBJbnB1dCgpIGFsbG93ZWRFeHRlbnNpb25zID0gXCIuZG9jLCAueGxzLCAueGxzeCwgLnBkZiwgLm9kdCwgLm9kZiwgLmpwZywgLmdpZiwgLnBuZ1wiO1xyXG4gIEBJbnB1dCgpIGlkOiBhbnk7XHJcbiAgQElucHV0KCkgbXVsdGlwbGUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBhdXRvVXBsb2FkID0gdHJ1ZTtcclxuICBASW5wdXQoKSBlbmFibGVkID0gdHJ1ZTtcclxuICBASW5wdXQoKSBzZXJ2aWNlOiBhbnk7XHJcbiAgQElucHV0KCkgZmlsZXM6IGFueVtdID0gW107XHJcbiAgQElucHV0KCkgY29udHJvbGVyTmFtZTogc3RyaW5nO1xyXG4gIGZpbGU6IGFueTtcclxuICBzaG93RmlsZTogYW55ID0gZmFsc2U7XHJcbiAgc2hvd0ltZ0ZpbGU6IGFueSA9IGZhbHNlO1xyXG4gIGFsZXJ0ID0ge1xyXG4gICAgdXBkYXRlTWVzc2FnZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLlVQREFURV9NRVNTQUdFKSxcclxuICAgIHVwZGF0ZVRpdGxlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuVVBEQVRFX1RJVExFKSxcclxuICAgIGNyZWF0ZU1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5DUkVBVEVfTUVTU0FHRSksXHJcbiAgICBjcmVhdGVUaXRsZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLkNSRUFURV9USVRMRSksXHJcbiAgICBkZWxldGVNZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuREVMRVRFX01FU1NBR0UpLFxyXG4gICAgZGVsZXRlVGl0bGU6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5ERUxFVEVfVElUTEUpLFxyXG4gICAgY2FuY2VsTWVzc2FnZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLkNBTkNFTF9NRVNTQUdFKSxcclxuICAgIHNlcnZlckVycm9yOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuU0VSVkVSX0VSUk9SKSxcclxuICAgIGRlbGV0ZWRfb2tfbXNnOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuREVMRVRFRF9PS19NU0cpLFxyXG4gICAgY3JlYXRlZF9va19tc2c6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5DUkVBVEVEX09LX01TRyksXHJcbiAgICB1cGRhdGVkX29rX21zZzogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLlVQREFURURfT0tfTVNHKSxcclxuICAgIHN5c3RlbV9lcnJvcl9tc2c6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5TWVNURU1fRVJST1JfTVNHKSxcclxuICAgIGV4aXN0X21lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5FWElTVF9NRVNTQUdFKSxcclxuICAgIGNob29zZV9mYXJtX21lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgIE1lc3NhZ2VDb25zdGFudHMuQ0hPT1NFX0ZBUk1fTUVTU0FHRVxyXG4gICAgKSxcclxuICAgIHNlbGVjdF9vcmRlcl9tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICBNZXNzYWdlQ29uc3RhbnRzLlNFTEVDVF9PUkRFUl9NRVNTQUdFXHJcbiAgICApLFxyXG4gICAgeWVzX21lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5ZRVNfTVNHKSxcclxuICAgIG5vX21lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5OT19NU0cpLFxyXG4gIH07XHJcbiAgZG93bmxvYWRVcmw6IHN0cmluZztcclxuICBwdWJsaWMgZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGFsbEltYWdlczogc3RyaW5nW10gPSBbJy5qcGcnLCAnLmdpZicsICcucG5nJ107XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwsXHJcbiAgICBwcml2YXRlIGFsZXJ0aWZ5OiBBbGVydGlmeVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIHB1YmxpYyB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcclxuICApIHt9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXNbJ3NlcnZpY2UnXSAmJiBjaGFuZ2VzLnNlcnZpY2UuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbFVwbG9hZGVyKCk7XHJcbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAvLyB0aGlzLmluaXRpYWxVcGxvYWRlcigpO1xyXG4gICAgLy8gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcbiAgYmVmb3JlVXBsb2FkKGFyZ3MpIHtcclxuICAgIGFyZ3Muc3RhdHVzVGV4dCA9IGFyZ3MucmVzcG9uc2Uuc3RhdHVzVGV4dDtcclxuICB9XHJcbiAgaW5pdGlhbFVwbG9hZGVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhdGgpIHtcclxuICAgICAgdGhpcy5wYXRoID0ge1xyXG4gICAgICAgIHNhdmVVcmw6IGAke3RoaXMuYmFzZVVybH0ke3RoaXMuY29udHJvbGVyTmFtZX0vU2F2ZT9pZD0ke3RoaXMuaWR9YCxcclxuICAgICAgICByZW1vdmVVcmw6IGAke3RoaXMuYmFzZVVybH0ke3RoaXMuY29udHJvbGVyTmFtZX0vcmVtb3ZlP2lkPSR7dGhpcy5pZH1gLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG93bmxvYWRVcmwgPSBgJHt0aGlzLmJhc2VVcmx9JHt0aGlzLmNvbnRyb2xlck5hbWV9L0Rvd25sb2FkP2lkPSR7dGhpcy5pZH1gO1xyXG4gICAgdGhpcy5nZXRGaWxlSW5mbygpO1xyXG4gIH1cclxuICBnZXRGaWxlSW5mbygpIHtcclxuICAgIHRoaXMuc2VydmljZS5nZXRGaWxlc0J5SWQodGhpcy5pZCkuc3Vic2NyaWJlKFxyXG4gICAgICAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWxlLm5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgIHRoaXMuZmlsZXMgPSBbZmlsZV07XHJcbiAgICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xyXG4gICAgICAgICAgdGhpcy5zaG93RmlsZSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNob3dJbWdGaWxlID0gdGhpcy5hbGxJbWFnZXMuaW5kZXhPZihmaWxlLnR5cGUpICE9PSAtMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmZpbGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZmlsZSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLnNob3dGaWxlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNob3dJbWdGaWxlID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZE9iai5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICB0aGlzLmZpbGVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpbGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2hvd0ZpbGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwbG9hZE9iai5yZWZyZXNoKCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvblNlbGVjdGVkKGFyZ3M6IFNlbGVjdGVkRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICBhcmdzLmZpbGVzRGF0YS5zcGxpY2UoNSk7XHJcbiAgICBsZXQgZmlsZXNEYXRhOiBGaWxlSW5mb1tdID0gYXJncy5maWxlc0RhdGE7XHJcbiAgICBsZXQgYWxsRmlsZXM6IEZpbGVJbmZvW10gPSBmaWxlc0RhdGEuY29uY2F0KGFyZ3MuZmlsZXNEYXRhKTtcclxuICAgIGlmIChhbGxGaWxlcy5sZW5ndGggPiA1KSB7XHJcbiAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBhbGxGaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChhbGxGaWxlcy5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICBhbGxGaWxlcy5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBhcmdzLmZpbGVzRGF0YSA9IGFsbEZpbGVzO1xyXG4gICAgICBhcmdzLm1vZGlmaWVkRmlsZXNEYXRhID0gYXJncy5maWxlc0RhdGE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNob3dGaWxlID0gYXJncy5maWxlc0RhdGEubGVuZ3RoID4gMDtcclxuICAgIGlmICh0aGlzLnNob3dGaWxlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0ltZ0ZpbGUgPSB0aGlzLmFsbEltYWdlcy5pbmRleE9mKHRoaXMuc2hvd0ZpbGVbMF0udHlwZSkgIT09IC0xXHJcblxyXG4gICAgfVxyXG4gICAgYXJncy5pc01vZGlmaWVkID0gdHJ1ZTtcclxuICB9XHJcbiAgb25GaWxlUmVtb3ZlKGFyZ3M6IFJlbW92aW5nRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgICBhcmdzLnBvc3RSYXdGaWxlID0gZmFsc2U7XHJcbiAgfVxyXG4gIHJlbW92ZUZpbGUoKSB7XHJcbiAgICB0aGlzLnJlbW92ZSgpO1xyXG4gIH1cclxuICBwdWJsaWMgb25VcGxvYWRTdWNjZXNzOiBFbWl0VHlwZTxPYmplY3Q+ID0gKGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgdGhpcy5nZXRGaWxlSW5mbygpO1xyXG4gICAgdGhpcy51cGxvYWRPYmouY2xlYXJBbGwoKTtcclxuICB9O1xyXG5cclxuICByZW1vdmUoKSB7XHJcbiAgICB0aGlzLmFsZXJ0aWZ5LmNvbmZpcm00KFxyXG4gICAgICB0aGlzLmFsZXJ0Lnllc19tZXNzYWdlLFxyXG4gICAgICB0aGlzLmFsZXJ0Lm5vX21lc3NhZ2UsXHJcbiAgICAgIHRoaXMuYWxlcnQuZGVsZXRlVGl0bGUsXHJcbiAgICAgIHRoaXMuYWxlcnQuZGVsZXRlTWVzc2FnZSxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIGxldCBhamF4ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgYWpheC5vcGVuKFxyXG4gICAgICAgICAgXCJQT1NUXCIsXHJcbiAgICAgICAgICBgJHt0aGlzLmJhc2VVcmx9JHt0aGlzLmNvbnRyb2xlck5hbWV9L3JlbW92ZT9pZD0ke3RoaXMuaWR9YFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYWpheC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmdldEZpbGVJbmZvKCk7XHJcbiAgICAgICAgICB0aGlzLmFsZXJ0aWZ5LnN1Y2Nlc3ModGhpcy5hbGVydC5kZWxldGVkX29rX21zZyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBhamF4LnNlbmQoKTtcclxuICAgICAgfSxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWxlcnRpZnkuZXJyb3IodGhpcy5hbGVydC5jYW5jZWxNZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKCkge1xyXG4gICAgbGV0IGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgZG93bmxvYWRMaW5rLmhyZWYgPSB0aGlzLmRvd25sb2FkVXJsO1xyXG4gICAgZG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIHRoaXMuZmlsZS5uYW1lKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG93bmxvYWRMaW5rKTtcclxuICAgIGRvd25sb2FkTGluay5jbGljaygpO1xyXG4gIH1cclxufVxyXG4iXX0=