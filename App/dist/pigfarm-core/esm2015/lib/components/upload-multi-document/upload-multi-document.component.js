import { Component, ViewChild, Input, ChangeDetectorRef, Inject } from "@angular/core";
import { createSpinner, showSpinner, hideSpinner, } from "@syncfusion/ej2-popups";
import { detach, Browser, createElement, isNullOrUndefined, EventHandler, } from "@syncfusion/ej2-base";
import { MessageConstants } from "../../../_core/_constants";
import { AlertifyService } from "../../../services/alertify.service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
export class UploadMultiDocumentComponent {
    constructor(baseUrl, alertify, cd, http, translate) {
        this.baseUrl = baseUrl;
        this.alertify = alertify;
        this.cd = cd;
        this.http = http;
        this.translate = translate;
        this.allowExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
        this.filesName = [];
        this.filesDetails = [];
        this.filesList = [];
        this.allowedExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
        this.multiple = false;
        this.autoUpload = true;
        this.enabled = true;
        this.files = [];
        this.showFile = false;
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
    }
    ngOnInit() {
        this.path = {
            saveUrl: `${this.baseUrl}${this.controlerName}/Save?id=${this.id}`,
            removeUrl: `${this.baseUrl}${this.controlerName}/remove?id=${this.id}`,
        };
        this.dropElement = document.getElementsByClassName("control-section")[0];
        if (Browser.isDevice) {
            document.getElementById("dropimage").style.padding = "0px 10%";
        }
        document.getElementById("browse").onclick = () => {
            document
                .getElementsByClassName("e-file-select-wrap")[0]
                .querySelector("button")
                .click();
            return false;
        };
        document.getElementById("clearbtn").onclick = () => {
            if (!this.dropElement.querySelector("ul")) {
                return;
            }
            detach(this.dropElement.querySelector("ul"));
            this.filesList = [];
            this.filesDetails = [];
            this.filesName = [];
            if (this.dropElement
                .querySelector("#dropArea")
                .classList.contains("e-spinner-pane")) {
                hideSpinner(this.dropElement.querySelector("#dropArea"));
                detach(this.dropElement.querySelector(".e-spinner-pane"));
            }
        };
        document.getElementById("uploadbtn").onclick = () => {
            if (this.dropElement.querySelector("ul") &&
                this.filesDetails.length > 0) {
                this.uploadObj.upload(this.filesDetails, true);
            }
        };
    }
    onSelect(args) {
        if (!this.dropElement.querySelector("li")) {
            this.filesDetails = [];
        }
        if (isNullOrUndefined(document.getElementById("dropArea").querySelector(".e-upload-files"))) {
            this.parentElement = createElement("ul", { className: "e-upload-files" });
            document
                .getElementsByClassName("e-upload")[0]
                .appendChild(this.parentElement);
        }
        let validFiles = this.validateFiles(args, this.filesDetails);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (let i = 0; i < validFiles.length; i++) {
            this.formSelectedData(validFiles[i], this);
        }
        this.filesDetails = this.filesDetails.concat(validFiles);
        args.cancel = true;
    }
    validateFiles(args, viewedFiles) {
        let modifiedFiles = [];
        let validFiles = [];
        let isModified = false;
        if (args.event.type === "drop") {
            isModified = true;
            let allImages = ["png", "jpg", "jpeg"];
            let files = args.filesData;
            for (let file of files) {
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        let files = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (this.filesName.length > 0) {
            for (let file of files) {
                if (this.filesName.indexOf(file.name) === -1) {
                    this.filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        }
        else {
            for (let file of files) {
                this.filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    }
    formSelectedData(file, proxy) {
        let liEle = createElement("li", {
            className: "e-upload-file-list",
            attrs: { "data-file-name": file.name },
        });
        let imageTag = createElement("IMG", {
            className: "upload-image",
            attrs: { alt: "Image" },
        });
        let wrapper = createElement("span", { className: "wrapper" });
        wrapper.appendChild(imageTag);
        liEle.appendChild(wrapper);
        liEle.appendChild(createElement("div", {
            className: "name file-name",
            innerHTML: file.name,
            attrs: { title: file.name },
        }));
        liEle.appendChild(createElement("div", {
            className: "file-size",
            innerHTML: proxy.uploadObj.bytesToSize(file.size),
        }));
        let clearbtn;
        let uploadbtn;
        clearbtn = createElement("span", {
            id: "removeIcon",
            className: "e-icons e-file-remove-btn",
            attrs: { title: "Remove" },
        });
        EventHandler.add(clearbtn, "click", this.removeFiles, proxy);
        liEle.setAttribute("title", "Ready to Upload");
        uploadbtn = createElement("span", {
            className: "e-upload-icon e-icons e-file-remove-btn",
            attrs: { title: "Upload" },
        });
        uploadbtn.setAttribute("id", "iconUpload");
        EventHandler.add(uploadbtn, "click", this.uploadFile, proxy);
        let progressbarContainer;
        progressbarContainer = createElement("progress", {
            className: "progressbar",
            id: "progressBar",
            attrs: { value: "0", max: "100" },
        });
        liEle.appendChild(clearbtn);
        liEle.appendChild(uploadbtn);
        liEle.appendChild(progressbarContainer);
        this.readURL(liEle, file);
        document.querySelector(".e-upload-files").appendChild(liEle);
        proxy.filesList.push(liEle);
    }
    uploadFile(args) {
        this.uploadObj.upload([
            this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)],
        ], true);
    }
    removeFiles(args) {
        let removeFile = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)];
        let statusCode = removeFile.statusCode;
        if (statusCode === "2" || statusCode === "1") {
            this.uploadObj.remove(removeFile, true);
            this.uploadObj.element.value = "";
        }
        let index = this.filesList.indexOf(args.currentTarget.parentElement);
        this.filesList.splice(index, 1);
        this.filesDetails.splice(index, 1);
        this.filesName.splice(this.filesName.indexOf(removeFile.name), 1);
        if (statusCode !== "2") {
            detach(args.currentTarget.parentElement);
        }
    }
    onFileUpload(args) {
        let li = document
            .getElementById("dropArea")
            .querySelector('[data-file-name="' + args.file.name + '"]');
        let iconEle = li.querySelector("#iconUpload");
        iconEle.style.cursor = "not-allowed";
        iconEle.classList.add("e-uploaded");
        EventHandler.remove(li.querySelector("#iconUpload"), "click", this.uploadFile);
        let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector(".progressbar")) {
            li.getElementsByTagName("progress")[0].value = progressValue;
        }
    }
    onUploadSuccess(args) {
        let spinnerElement = document.getElementById("dropArea");
        let li = document
            .getElementById("dropArea")
            .querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !isNullOrUndefined(li.querySelector(".progressbar"))) {
            li.querySelector(".progressbar").style.visibility =
                "hidden";
        }
        if (args.operation === "upload") {
            EventHandler.remove(li.querySelector("#iconUpload"), "click", this.uploadFile);
            li.setAttribute("title", args.e.currentTarget.statusText);
            li.querySelector(".file-name").style.color = "green";
            li.querySelector(".e-icons").onclick = () => {
                this.generateSpinner(this.dropElement.querySelector("#dropArea"));
            };
        }
        else {
            if (!isNullOrUndefined(li)) {
                detach(li);
            }
            if (!isNullOrUndefined(spinnerElement)) {
                hideSpinner(spinnerElement);
                detach(spinnerElement.querySelector(".e-spinner-pane"));
            }
        }
        li.querySelector("#removeIcon").removeAttribute(".e-file-remove-btn");
        li.querySelector("#removeIcon").setAttribute("class", "e-icons e-file-delete-btn");
    }
    generateSpinner(targetElement) {
        createSpinner({ target: targetElement, width: "25px" });
        showSpinner(targetElement);
    }
    onUploadFailed(args) {
        let li = document
            .getElementById("dropArea")
            .querySelector('[data-file-name="' + args.file.name + '"]');
        li.querySelector(".file-name").style.color = "red";
        li.setAttribute("title", args.e.currentTarget.statusText);
        if (args.operation === "upload") {
            EventHandler.remove(li.querySelector("#iconUpload"), "click", this.uploadFile);
            li.querySelector(".progressbar").style.visibility =
                "hidden";
        }
    }
    readURL(li, args) {
        let preview = li.querySelector(".upload-image");
        let file = args.rawFile;
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    onFileRemove(args) {
        args.postRawFile = false;
    }
}
UploadMultiDocumentComponent.decorators = [
    { type: Component, args: [{
                selector: "app-upload-multi-document",
                template: "<div class=\"control-section\">\r\n  <div class=\"col-12\">\r\n      <div class=\"control_wrapper\">\r\n          <div class='imagepreview'>\r\n              <div id='dropArea' style='height: auto'>\r\n                  <span id='dropimage'> {{ 'Drop image (.doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png) files here or' | translate}} <a href=\"\" id='browse'><u>{{'Browse' | translate}}</u></a> </span>\r\n                  <ejs-uploader #previewupload id='previewfileupload' [asyncSettings]='path'\r\n                  [multiple]=\"multiple\"\r\n                  [asyncSettings]=\"path\"\r\n                  [autoUpload]=\"autoUpload\"\r\n                  [enabled]=\"enabled\"\r\n                  [dropArea]='dropElement' [allowedExtensions]='allowExtensions' (selected)='onSelect($event)'\r\n                      (success)='onUploadSuccess($event)' (progress)='onFileUpload($event)' (failure)='onUploadFailed($event)' (removing)='onFileRemove($event)'>\r\n                  </ejs-uploader>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".control_wrapper .imagepreview{max-width:505px;margin:auto}.e-upload{float:none}.imagepreview .e-file-select-wrap{display:none}.imagepreview .e-upload{border:none;margin-top:10px;width:100%}.imagepreview #dropimage{font-size:14px}.e-bigger .imagepreview #dropimage{font-size:15px}.imagepreview #dropArea{border:1px dashed #c3c3cc;position:relative;text-align:center;padding:15px 0 5px;display:block;width:100%;overflow:hidden}.e-bigger .imagepreview #dropArea{padding:20px 0 10px}.imagepreview #dropArea .e-upload .e-upload-files{text-align:initial;border-top:none}.imagepreview #dropArea .e-upload-files .e-file-delete-btn.e-icons,.imagepreview #dropArea .e-upload-files .e-file-remove-btn.e-icons{top:120px;background-color:#fff;border-radius:50%;font-size:12px;left:80px}.imagepreview #dropArea .e-upload-files li .e-file-remove-btn.e-icons.e-upload-icon{font-size:14px;left:20px}.imagepreview #dropArea .e-upload-files li:hover .e-icons{visibility:visible}.imagepreview #dropArea .e-upload-files li .e-icons{visibility:hidden}@font-face{font-family:Uploader_Icon;src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmoZcPvgAAAcgAAABAaGVhZBLQTSUAAADQAAAANmhoZWEINQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQAgAAAAAAHAAAAABm1heHABDgAdAAABCAAAACBuYW1lQySinQAAAggAAAIxcG9zdLfl0usAAAQ8AAAAMgABAAAEAAAAAFwEAAAAAAAD2AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAA2vKJUF8PPPUACwQAAAAAANftBBgAAAAA1+0EGAAAAAAD2AP4AAAACAACAAAAAAAAAAEAAAACABEAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAIAAAAAIAAAAAA9gD+AAHABAAADchESMVITUjEzM3ETMRFzMBKAOwPvzMPp1mtUC1Zv7FCAF6vb0BO7X+EAHwtQE7AAAAABIA3gABAAAAAAAAAAEAAAABAAAAAAABAAgAAQABAAAAAAACAAcACQABAAAAAAADAAgAEAABAAAAAAAEAAgAGAABAAAAAAAFAAsAIAABAAAAAAAGAAgAKwABAAAAAAAKACwAMwABAAAAAAALABIAXwADAAEECQAAAAIAcQADAAEECQABABAAcwADAAEECQACAA4AgwADAAEECQADABAAkQADAAEECQAEABAAoQADAAEECQAFABYAsQADAAEECQAGABAAxwADAAEECQAKAFgA1wADAAEECQALACQBLyBVcGxvYWRlclJlZ3VsYXJVcGxvYWRlclVwbG9hZGVyVmVyc2lvbiAxLjBVcGxvYWRlckZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAVQBwAGwAbwBhAGQAZQByAFIAZQBnAHUAbABhAHIAVQBwAGwAbwBhAGQAZQByAFUAcABsAG8AYQBkAGUAcgBWAGUAcgBzAGkAbwBuACAAMQAuADAAVQBwAGwAbwBhAGQAZQByAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAFMAeQBuAGMAZgB1AHMAaQBvAG4AIABNAGUAdAByAG8AIABTAHQAdQBkAGkAbwB3AHcAdwAuAHMAeQBuAGMAZgB1AHMAaQBvAG4ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBAgEDAAhVcGxvYWRlcgAAAAA=) format(\"truetype\");font-weight:400;font-style:normal}.imagepreview #dropArea .e-upload .e-upload-files .e-icons.e-upload-icon{font-family:Uploader_Icon;speak:none;font-size:16px;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.imagepreview #dropArea .e-upload .e-upload-files .e-icons.e-upload-icon:before{content:\"\\e700\"}.imagepreview #dropArea .e-upload .e-upload-files .e-icons:not(.e-uploaded):hover{background-color:#e6e6e6;border-color:#adadad;color:#333}.bootstrap5-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.bootstrap-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.fabric-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.material-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.tailwind-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons{color:#333}.highcontrast .imagepreview #dropArea .e-upload-files .e-file-delete-btn.e-icons,.highcontrast .imagepreview #dropArea .e-upload-files .e-file-remove-btn.e-icons{background-color:#ffd939}.highcontrast .imagepreview #dropArea .e-upload .e-upload-files .e-file-delete-btn.e-icons:before,.highcontrast .imagepreview #dropArea .e-upload .e-upload-files .e-file-remove-btn.e-icons:before{color:#000}.imagepreview #dropArea .e-upload .e-upload-files .e-upload-file-list{border:0;display:inline-block;width:165px}.imagepreview .upload-image{width:150px;height:150px;display:inline-flex;background-size:contain;margin:7px;text-align:center;line-height:10;border-radius:5px}.imagepreview .upload-image:after{content:\"\";position:absolute;top:6px;left:6px;width:inherit;height:inherit;background:#d3d3d3 url(http://via.placeholder.com/300?text=Loading...) no-repeat 50%;color:transparent;border-radius:5px}.bootstrap5-dark .imagepreview div.file-name,.bootstrap-dark .imagepreview div.file-name,.fabric-dark .imagepreview div.file-name,.fluent-dark .imagepreview div.file-name,.highcontrast .imagepreview div.file-name,.material-dark .imagepreview div.file-name,.tailwind-dark .imagepreview div.file-name{color:#fff}.imagepreview div.file-name{color:rgba(0,0,0,.87);font-size:14px;padding:3px 10px;overflow:hidden;text-overflow:ellipsis;width:90%;white-space:nowrap}.highcontrast .imagepreview div.file-size{color:#fff}.imagepreview div.file-size{font-size:13px;padding:3px 10px;overflow:hidden}.imagepreview .progressbar{background:#ff4081;border:none;border-radius:10px;height:4px;margin-left:7px;width:90%;top:-60px;position:relative}.bootstrap5 .imagepreview .progressbar,.bootstrap5-dark .imagepreview .progressbar,.fluent-dark .imagepreview .progressbar,.tailwind-dark .imagepreview .progressbar,.tailwind .imagepreview .progressbar{top:-70px}.imagepreview #dropArea progress{border:none;background:#fff}.bootstrap5-dark .imagepreview #dropArea progress,.bootstrap-dark .imagepreview #dropArea progress,.fabric-dark .imagepreview #dropArea progress,.highcontrast .imagepreview #dropArea progress,.material-dark .imagepreview #dropArea progress,.tailwind-dark .imagepreview #dropArea progress{border:none;background:#000}.imagepreview progress::-webkit-progress-bar{border:none;background-color:#fff}.highcontrast .imagepreview progress::-webkit-progress-bar{border:none;background-color:#000}.imagepreview progress::-webkit-progress-value,.material .imagepreview progress::-webkit-progress-value{border-radius:2px;background-color:#ff4081}.bootstrap .imagepreview progress::-webkit-progress-value{border-radius:2px;background-color:#1f496e}.fabric .imagepreview progress::-webkit-progress-value{background-color:#1763ff;border-radius:2px;top:-66px}.highcontrast .imagepreview progress::-webkit-progress-value{background-color:#ffd939;border-radius:2px}.imagepreview progress::-moz-progress-bar,.material .imagepreview progress::-moz-progress-bar{border-radius:2px;background-color:#ff4081}.bootstrap .imagepreview progress::-moz-progress-bar{border-radius:2px;background-color:#1f496e}.fabric .imagepreview progress::-moz-progress-bar{background-color:#1763ff;border-radius:2px;top:-66px}.highcontrast .imagepreview progress::-moz-progress-bar{background-color:#ffd939;border-radius:2px}.imagepreview #dropimage a,.material .imagepreview #dropimage a{color:#ff4081}.fabric .imagepreview #dropimage a{color:#1763ff}.bootstrap .imagepreview #dropimage a{color:#1f496e}.highcontrast .imagepreview #dropimage a{color:#ffd939}.material-dark .imagepreview #dropimage a{color:#56a4fd}.fabric-dark .imagepreview #dropimage a{color:#0074cc}.bootstrap-dark .imagepreview #dropimage a{color:#0070f0}.bootstrap5-dark .imagepreview #dropimage a{color:#0d6efd}.tailwind-dark .imagepreview #dropimage a{color:#22d3ee}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.e-bigger .imagepreview #dropArea .e-upload .e-upload-files .e-file-remove-btn.e-icons,.imagepreview #dropArea .e-upload .e-upload-files .e-file-remove-btn.e-icons{padding:18px 25px 18px 12px}}"]
            },] }
];
UploadMultiDocumentComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: AlertifyService },
    { type: ChangeDetectorRef },
    { type: HttpClient },
    { type: TranslateService }
];
UploadMultiDocumentComponent.propDecorators = {
    uploadObj: [{ type: ViewChild, args: ["previewupload",] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLW11bHRpLWRvY3VtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvdXBsb2FkLW11bHRpLWRvY3VtZW50L3VwbG9hZC1tdWx0aS1kb2N1bWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBR1QsS0FBSyxFQUNMLGlCQUFpQixFQUNqQixNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFPdkIsT0FBTyxFQUNMLGFBQWEsRUFDYixXQUFXLEVBQ1gsV0FBVyxHQUNaLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUVMLE1BQU0sRUFDTixPQUFPLEVBQ1AsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixZQUFZLEdBQ2IsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTXZELE1BQU0sT0FBTyw0QkFBNEI7SUF3VXZDLFlBQ3lCLE9BQU8sRUFDdEIsUUFBeUIsRUFDekIsRUFBcUIsRUFDckIsSUFBZ0IsRUFDakIsU0FBMkI7UUFKWCxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUF6VTdCLG9CQUFlLEdBQ3BCLHVEQUF1RCxDQUFDO1FBR25ELGNBQVMsR0FB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ICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb24sXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIEluamVjdFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgVXBsb2FkZXJDb21wb25lbnQsXHJcbiAgU2VsZWN0ZWRFdmVudEFyZ3MsXHJcbiAgRmlsZUluZm8sXHJcbiAgUmVtb3ZpbmdFdmVudEFyZ3MsXHJcbn0gZnJvbSBcIkBzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWlucHV0c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZVNwaW5uZXIsXHJcbiAgc2hvd1NwaW5uZXIsXHJcbiAgaGlkZVNwaW5uZXIsXHJcbn0gZnJvbSBcIkBzeW5jZnVzaW9uL2VqMi1wb3B1cHNcIjtcclxuaW1wb3J0IHtcclxuICBFbWl0VHlwZSxcclxuICBkZXRhY2gsXHJcbiAgQnJvd3NlcixcclxuICBjcmVhdGVFbGVtZW50LFxyXG4gIGlzTnVsbE9yVW5kZWZpbmVkLFxyXG4gIEV2ZW50SGFuZGxlcixcclxufSBmcm9tIFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZUNvbnN0YW50cyB9IGZyb20gXCIuLi8uLi8uLi9fY29yZS9fY29uc3RhbnRzXCI7XHJcblxyXG5pbXBvcnQgeyBBbGVydGlmeVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYWxlcnRpZnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtdXBsb2FkLW11bHRpLWRvY3VtZW50XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi91cGxvYWQtbXVsdGktZG9jdW1lbnQuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4vdXBsb2FkLW11bHRpLWRvY3VtZW50LmNvbXBvbmVudC5jc3NcIl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGxvYWRNdWx0aURvY3VtZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKFwicHJldmlld3VwbG9hZFwiKVxyXG4gIHB1YmxpYyB1cGxvYWRPYmo6IFVwbG9hZGVyQ29tcG9uZW50O1xyXG5cclxuICBwdWJsaWMgYWxsb3dFeHRlbnNpb25zOiBzdHJpbmcgPVxyXG4gICAgXCIuZG9jLCAueGxzLCAueGxzeCwgLnBkZiwgLm9kdCwgLm9kZiwgLmpwZywgLmdpZiwgLnBuZ1wiO1xyXG5cclxuICBwdWJsaWMgZHJvcEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHB1YmxpYyBmaWxlc05hbWU6IHN0cmluZ1tdID0gW107XHJcbiAgcHVibGljIGZpbGVzRGV0YWlsczogRmlsZUluZm9bXSA9IFtdO1xyXG4gIHB1YmxpYyBmaWxlc0xpc3Q6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuICBwdWJsaWMgdXBsb2FkV3JhcHBlcjogSFRNTEVsZW1lbnQ7XHJcbiAgcHVibGljIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIEBJbnB1dCgpIHBhdGg6IGFueTtcclxuICBASW5wdXQoKSBhbGxvd2VkRXh0ZW5zaW9ucyA9XHJcbiAgICBcIi5kb2MsIC54bHMsIC54bHN4LCAucGRmLCAub2R0LCAub2RmLCAuanBnLCAuZ2lmLCAucG5nXCI7XHJcbiAgQElucHV0KCkgaWQ6IGFueTtcclxuICBASW5wdXQoKSBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGF1dG9VcGxvYWQgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGVuYWJsZWQgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIHNlcnZpY2U6IGFueTtcclxuICBASW5wdXQoKSBmaWxlczogYW55W10gPSBbXTtcclxuICBASW5wdXQoKSBjb250cm9sZXJOYW1lOiBzdHJpbmc7XHJcbiAgZmlsZTogYW55O1xyXG4gIHNob3dGaWxlOiBhbnkgPSBmYWxzZTtcclxuICBhbGVydCA9IHtcclxuICAgIHVwZGF0ZU1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5VUERBVEVfTUVTU0FHRSksXHJcbiAgICB1cGRhdGVUaXRsZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLlVQREFURV9USVRMRSksXHJcbiAgICBjcmVhdGVNZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuQ1JFQVRFX01FU1NBR0UpLFxyXG4gICAgY3JlYXRlVGl0bGU6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5DUkVBVEVfVElUTEUpLFxyXG4gICAgZGVsZXRlTWVzc2FnZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLkRFTEVURV9NRVNTQUdFKSxcclxuICAgIGRlbGV0ZVRpdGxlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuREVMRVRFX1RJVExFKSxcclxuICAgIGNhbmNlbE1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5DQU5DRUxfTUVTU0FHRSksXHJcbiAgICBzZXJ2ZXJFcnJvcjogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLlNFUlZFUl9FUlJPUiksXHJcbiAgICBkZWxldGVkX29rX21zZzogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLkRFTEVURURfT0tfTVNHKSxcclxuICAgIGNyZWF0ZWRfb2tfbXNnOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuQ1JFQVRFRF9PS19NU0cpLFxyXG4gICAgdXBkYXRlZF9va19tc2c6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5VUERBVEVEX09LX01TRyksXHJcbiAgICBzeXN0ZW1fZXJyb3JfbXNnOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuU1lTVEVNX0VSUk9SX01TRyksXHJcbiAgICBleGlzdF9tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuRVhJU1RfTUVTU0FHRSksXHJcbiAgICBjaG9vc2VfZmFybV9tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICBNZXNzYWdlQ29uc3RhbnRzLkNIT09TRV9GQVJNX01FU1NBR0VcclxuICAgICksXHJcbiAgICBzZWxlY3Rfb3JkZXJfbWVzc2FnZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgTWVzc2FnZUNvbnN0YW50cy5TRUxFQ1RfT1JERVJfTUVTU0FHRVxyXG4gICAgKSxcclxuICAgIHllc19tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuWUVTX01TRyksXHJcbiAgICBub19tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuTk9fTVNHKSxcclxuICB9O1xyXG4gIGRvd25sb2FkVXJsOiBzdHJpbmc7XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhdGggPSB7XHJcbiAgICAgIHNhdmVVcmw6IGAke3RoaXMuYmFzZVVybH0ke3RoaXMuY29udHJvbGVyTmFtZX0vU2F2ZT9pZD0ke3RoaXMuaWR9YCxcclxuICAgICAgcmVtb3ZlVXJsOiBgJHt0aGlzLmJhc2VVcmx9JHt0aGlzLmNvbnRyb2xlck5hbWV9L3JlbW92ZT9pZD0ke3RoaXMuaWR9YCxcclxuICAgIH07XHJcbiAgICB0aGlzLmRyb3BFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcclxuICAgICAgXCJjb250cm9sLXNlY3Rpb25cIlxyXG4gICAgKVswXSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGlmIChCcm93c2VyLmlzRGV2aWNlKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcGltYWdlXCIpLnN0eWxlLnBhZGRpbmcgPSBcIjBweCAxMCVcIjtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnJvd3NlXCIpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50XHJcbiAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlLWZpbGUtc2VsZWN0LXdyYXBcIilbMF1cclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKVxyXG4gICAgICAgIC5jbGljaygpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhcmJ0blwiKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuZHJvcEVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGRldGFjaCh0aGlzLmRyb3BFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSk7XHJcbiAgICAgIHRoaXMuZmlsZXNMaXN0ID0gW107XHJcbiAgICAgIHRoaXMuZmlsZXNEZXRhaWxzID0gW107XHJcbiAgICAgIHRoaXMuZmlsZXNOYW1lID0gW107XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLmRyb3BFbGVtZW50XHJcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIiNkcm9wQXJlYVwiKVxyXG4gICAgICAgICAgLmNsYXNzTGlzdC5jb250YWlucyhcImUtc3Bpbm5lci1wYW5lXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGhpZGVTcGlubmVyKHRoaXMuZHJvcEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNkcm9wQXJlYVwiKSk7XHJcbiAgICAgICAgZGV0YWNoKHRoaXMuZHJvcEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5lLXNwaW5uZXItcGFuZVwiKSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZGJ0blwiKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5kcm9wRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikgJiZcclxuICAgICAgICB0aGlzLmZpbGVzRGV0YWlscy5sZW5ndGggPiAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMudXBsb2FkT2JqLnVwbG9hZCh0aGlzLmZpbGVzRGV0YWlscywgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIHB1YmxpYyBvblNlbGVjdChhcmdzOiBTZWxlY3RlZEV2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRyb3BFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaVwiKSkge1xyXG4gICAgICB0aGlzLmZpbGVzRGV0YWlscyA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICBpc051bGxPclVuZGVmaW5lZChcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3BBcmVhXCIpLnF1ZXJ5U2VsZWN0b3IoXCIuZS11cGxvYWQtZmlsZXNcIilcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucGFyZW50RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IGNsYXNzTmFtZTogXCJlLXVwbG9hZC1maWxlc1wiIH0pO1xyXG4gICAgICBkb2N1bWVudFxyXG4gICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZS11cGxvYWRcIilbMF1cclxuICAgICAgICAuYXBwZW5kQ2hpbGQodGhpcy5wYXJlbnRFbGVtZW50KTtcclxuICAgIH1cclxuICAgIGxldCB2YWxpZEZpbGVzOiBGaWxlSW5mb1tdID0gdGhpcy52YWxpZGF0ZUZpbGVzKGFyZ3MsIHRoaXMuZmlsZXNEZXRhaWxzKTtcclxuICAgIGlmICh2YWxpZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB2YWxpZEZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuZm9ybVNlbGVjdGVkRGF0YSh2YWxpZEZpbGVzW2ldLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmlsZXNEZXRhaWxzID0gdGhpcy5maWxlc0RldGFpbHMuY29uY2F0KHZhbGlkRmlsZXMpO1xyXG4gICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlRmlsZXMoYXJnczogYW55LCB2aWV3ZWRGaWxlczogRmlsZUluZm9bXSk6IEZpbGVJbmZvW10ge1xyXG4gICAgbGV0IG1vZGlmaWVkRmlsZXM6IEZpbGVJbmZvW10gPSBbXTtcclxuICAgIGxldCB2YWxpZEZpbGVzOiBGaWxlSW5mb1tdID0gW107XHJcbiAgICBsZXQgaXNNb2RpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaWYgKGFyZ3MuZXZlbnQudHlwZSA9PT0gXCJkcm9wXCIpIHtcclxuICAgICAgaXNNb2RpZmllZCA9IHRydWU7XHJcbiAgICAgIGxldCBhbGxJbWFnZXM6IHN0cmluZ1tdID0gW1wicG5nXCIsIFwianBnXCIsIFwianBlZ1wiXTtcclxuICAgICAgbGV0IGZpbGVzOiBGaWxlSW5mb1tdID0gYXJncy5maWxlc0RhdGE7XHJcbiAgICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcclxuICAgICAgICBpZiAoYWxsSW1hZ2VzLmluZGV4T2YoZmlsZS50eXBlKSAhPT0gLTEpIHtcclxuICAgICAgICAgIG1vZGlmaWVkRmlsZXMucHVzaChmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBmaWxlczogRmlsZUluZm9bXSA9XHJcbiAgICAgIG1vZGlmaWVkRmlsZXMubGVuZ3RoID4gMCB8fCBpc01vZGlmaWVkID8gbW9kaWZpZWRGaWxlcyA6IGFyZ3MuZmlsZXNEYXRhO1xyXG4gICAgaWYgKHRoaXMuZmlsZXNOYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbGVzTmFtZS5pbmRleE9mKGZpbGUubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLmZpbGVzTmFtZS5wdXNoKGZpbGUubmFtZSk7XHJcbiAgICAgICAgICB2YWxpZEZpbGVzLnB1c2goZmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgICAgdGhpcy5maWxlc05hbWUucHVzaChmaWxlLm5hbWUpO1xyXG4gICAgICAgIHZhbGlkRmlsZXMucHVzaChmaWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbGlkRmlsZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZm9ybVNlbGVjdGVkRGF0YShmaWxlOiBGaWxlSW5mbywgcHJveHk6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IGxpRWxlOiBIVE1MRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJlLXVwbG9hZC1maWxlLWxpc3RcIixcclxuICAgICAgYXR0cnM6IHsgXCJkYXRhLWZpbGUtbmFtZVwiOiBmaWxlLm5hbWUgfSxcclxuICAgIH0pO1xyXG4gICAgbGV0IGltYWdlVGFnOiBIVE1MSW1hZ2VFbGVtZW50ID0gPEhUTUxJbWFnZUVsZW1lbnQ+Y3JlYXRlRWxlbWVudChcIklNR1wiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJ1cGxvYWQtaW1hZ2VcIixcclxuICAgICAgYXR0cnM6IHsgYWx0OiBcIkltYWdlXCIgfSxcclxuICAgIH0pO1xyXG4gICAgbGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwid3JhcHBlclwiIH0pO1xyXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChpbWFnZVRhZyk7XHJcbiAgICBsaUVsZS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICAgIGxpRWxlLmFwcGVuZENoaWxkKFxyXG4gICAgICBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcclxuICAgICAgICBjbGFzc05hbWU6IFwibmFtZSBmaWxlLW5hbWVcIixcclxuICAgICAgICBpbm5lckhUTUw6IGZpbGUubmFtZSxcclxuICAgICAgICBhdHRyczogeyB0aXRsZTogZmlsZS5uYW1lIH0sXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgbGlFbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xyXG4gICAgICAgIGNsYXNzTmFtZTogXCJmaWxlLXNpemVcIixcclxuICAgICAgICBpbm5lckhUTUw6IHByb3h5LnVwbG9hZE9iai5ieXRlc1RvU2l6ZShmaWxlLnNpemUpLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIGxldCBjbGVhcmJ0bjogSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgdXBsb2FkYnRuOiBIVE1MRWxlbWVudDtcclxuICAgIGNsZWFyYnRuID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwge1xyXG4gICAgICBpZDogXCJyZW1vdmVJY29uXCIsXHJcbiAgICAgIGNsYXNzTmFtZTogXCJlLWljb25zIGUtZmlsZS1yZW1vdmUtYnRuXCIsXHJcbiAgICAgIGF0dHJzOiB7IHRpdGxlOiBcIlJlbW92ZVwiIH0sXHJcbiAgICB9KTtcclxuICAgIEV2ZW50SGFuZGxlci5hZGQoY2xlYXJidG4sIFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVGaWxlcywgcHJveHkpO1xyXG4gICAgbGlFbGUuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJSZWFkeSB0byBVcGxvYWRcIik7XHJcbiAgICB1cGxvYWRidG4gPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogXCJlLXVwbG9hZC1pY29uIGUtaWNvbnMgZS1maWxlLXJlbW92ZS1idG5cIixcclxuICAgICAgYXR0cnM6IHsgdGl0bGU6IFwiVXBsb2FkXCIgfSxcclxuICAgIH0pO1xyXG4gICAgdXBsb2FkYnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiaWNvblVwbG9hZFwiKTtcclxuICAgIEV2ZW50SGFuZGxlci5hZGQodXBsb2FkYnRuLCBcImNsaWNrXCIsIHRoaXMudXBsb2FkRmlsZSwgcHJveHkpO1xyXG4gICAgbGV0IHByb2dyZXNzYmFyQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICAgIHByb2dyZXNzYmFyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcInByb2dyZXNzXCIsIHtcclxuICAgICAgY2xhc3NOYW1lOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgIGlkOiBcInByb2dyZXNzQmFyXCIsXHJcbiAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIjBcIiwgbWF4OiBcIjEwMFwiIH0sXHJcbiAgICB9KTtcclxuICAgIGxpRWxlLmFwcGVuZENoaWxkKGNsZWFyYnRuKTtcclxuICAgIGxpRWxlLmFwcGVuZENoaWxkKHVwbG9hZGJ0bik7XHJcbiAgICBsaUVsZS5hcHBlbmRDaGlsZChwcm9ncmVzc2JhckNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnJlYWRVUkwobGlFbGUsIGZpbGUpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lLXVwbG9hZC1maWxlc1wiKS5hcHBlbmRDaGlsZChsaUVsZSk7XHJcbiAgICBwcm94eS5maWxlc0xpc3QucHVzaChsaUVsZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyB1cGxvYWRGaWxlKGFyZ3M6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy51cGxvYWRPYmoudXBsb2FkKFxyXG4gICAgICBbXHJcbiAgICAgICAgdGhpcy5maWxlc0RldGFpbHNbXHJcbiAgICAgICAgICB0aGlzLmZpbGVzTGlzdC5pbmRleE9mKGFyZ3MuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50KVxyXG4gICAgICAgIF0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW1vdmVGaWxlcyhhcmdzOiBhbnkpOiB2b2lkIHtcclxuICAgIGxldCByZW1vdmVGaWxlOiBGaWxlSW5mbyA9XHJcbiAgICAgIHRoaXMuZmlsZXNEZXRhaWxzW1xyXG4gICAgICAgIHRoaXMuZmlsZXNMaXN0LmluZGV4T2YoYXJncy5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQpXHJcbiAgICAgIF07XHJcbiAgICBsZXQgc3RhdHVzQ29kZTogc3RyaW5nID0gcmVtb3ZlRmlsZS5zdGF0dXNDb2RlO1xyXG4gICAgaWYgKHN0YXR1c0NvZGUgPT09IFwiMlwiIHx8IHN0YXR1c0NvZGUgPT09IFwiMVwiKSB7XHJcbiAgICAgIHRoaXMudXBsb2FkT2JqLnJlbW92ZShyZW1vdmVGaWxlLCB0cnVlKTtcclxuICAgICAgdGhpcy51cGxvYWRPYmouZWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZmlsZXNMaXN0LmluZGV4T2YoXHJcbiAgICAgIGFyZ3MuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50XHJcbiAgICApO1xyXG4gICAgdGhpcy5maWxlc0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMuZmlsZXNEZXRhaWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLmZpbGVzTmFtZS5zcGxpY2UodGhpcy5maWxlc05hbWUuaW5kZXhPZihyZW1vdmVGaWxlLm5hbWUpLCAxKTtcclxuICAgIGlmIChzdGF0dXNDb2RlICE9PSBcIjJcIikge1xyXG4gICAgICBkZXRhY2goYXJncy5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgb25GaWxlVXBsb2FkKGFyZ3M6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IGxpOiBFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwiZHJvcEFyZWFcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZpbGUtbmFtZT1cIicgKyBhcmdzLmZpbGUubmFtZSArICdcIl0nKTtcclxuICAgIGxldCBpY29uRWxlOiBIVE1MRWxlbWVudCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIjaWNvblVwbG9hZFwiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGljb25FbGUuc3R5bGUuY3Vyc29yID0gXCJub3QtYWxsb3dlZFwiO1xyXG4gICAgaWNvbkVsZS5jbGFzc0xpc3QuYWRkKFwiZS11cGxvYWRlZFwiKTtcclxuICAgIEV2ZW50SGFuZGxlci5yZW1vdmUoXHJcbiAgICAgIGxpLnF1ZXJ5U2VsZWN0b3IoXCIjaWNvblVwbG9hZFwiKSxcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLnVwbG9hZEZpbGVcclxuICAgICk7XHJcbiAgICBsZXQgcHJvZ3Jlc3NWYWx1ZTogbnVtYmVyID0gTWF0aC5yb3VuZChcclxuICAgICAgKGFyZ3MuZS5sb2FkZWQgLyBhcmdzLmUudG90YWwpICogMTAwXHJcbiAgICApO1xyXG4gICAgaWYgKCFpc05hTihwcm9ncmVzc1ZhbHVlKSAmJiBsaS5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzYmFyXCIpKSB7XHJcbiAgICAgIGxpLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicHJvZ3Jlc3NcIilbMF0udmFsdWUgPSBwcm9ncmVzc1ZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgb25VcGxvYWRTdWNjZXNzKGFyZ3M6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IHNwaW5uZXJFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJvcEFyZWFcIik7XHJcbiAgICBsZXQgbGk6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnRcclxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwiZHJvcEFyZWFcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZpbGUtbmFtZT1cIicgKyBhcmdzLmZpbGUubmFtZSArICdcIl0nKTtcclxuICAgIGlmIChsaSAmJiAhaXNOdWxsT3JVbmRlZmluZWQobGkucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc2JhclwiKSkpIHtcclxuICAgICAgKGxpLnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3NiYXJcIikgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnZpc2liaWxpdHkgPVxyXG4gICAgICAgIFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoYXJncy5vcGVyYXRpb24gPT09IFwidXBsb2FkXCIpIHtcclxuICAgICAgRXZlbnRIYW5kbGVyLnJlbW92ZShcclxuICAgICAgICBsaS5xdWVyeVNlbGVjdG9yKFwiI2ljb25VcGxvYWRcIiksXHJcbiAgICAgICAgXCJjbGlja1wiLFxyXG4gICAgICAgIHRoaXMudXBsb2FkRmlsZVxyXG4gICAgICApO1xyXG4gICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBhcmdzLmUuY3VycmVudFRhcmdldC5zdGF0dXNUZXh0KTtcclxuICAgICAgKGxpLnF1ZXJ5U2VsZWN0b3IoXCIuZmlsZS1uYW1lXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5jb2xvciA9IFwiZ3JlZW5cIjtcclxuICAgICAgKGxpLnF1ZXJ5U2VsZWN0b3IoXCIuZS1pY29uc1wiKSBhcyBIVE1MRWxlbWVudCkub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlU3Bpbm5lcih0aGlzLmRyb3BFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZHJvcEFyZWFcIikpO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChsaSkpIHtcclxuICAgICAgICBkZXRhY2gobGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoc3Bpbm5lckVsZW1lbnQpKSB7XHJcbiAgICAgICAgaGlkZVNwaW5uZXIoc3Bpbm5lckVsZW1lbnQpO1xyXG4gICAgICAgIGRldGFjaChzcGlubmVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmUtc3Bpbm5lci1wYW5lXCIpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGkucXVlcnlTZWxlY3RvcihcIiNyZW1vdmVJY29uXCIpLnJlbW92ZUF0dHJpYnV0ZShcIi5lLWZpbGUtcmVtb3ZlLWJ0blwiKTtcclxuICAgIGxpLnF1ZXJ5U2VsZWN0b3IoXCIjcmVtb3ZlSWNvblwiKS5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgIFwiY2xhc3NcIixcclxuICAgICAgXCJlLWljb25zIGUtZmlsZS1kZWxldGUtYnRuXCJcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZW5lcmF0ZVNwaW5uZXIodGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNyZWF0ZVNwaW5uZXIoeyB0YXJnZXQ6IHRhcmdldEVsZW1lbnQsIHdpZHRoOiBcIjI1cHhcIiB9KTtcclxuICAgIHNob3dTcGlubmVyKHRhcmdldEVsZW1lbnQpO1xyXG4gIH1cclxuICBwdWJsaWMgb25VcGxvYWRGYWlsZWQoYXJnczogYW55KTogdm9pZCB7XHJcbiAgICBsZXQgbGk6IEVsZW1lbnQgPSBkb2N1bWVudFxyXG4gICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wQXJlYVwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcignW2RhdGEtZmlsZS1uYW1lPVwiJyArIGFyZ3MuZmlsZS5uYW1lICsgJ1wiXScpO1xyXG4gICAgKGxpLnF1ZXJ5U2VsZWN0b3IoXCIuZmlsZS1uYW1lXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBhcmdzLmUuY3VycmVudFRhcmdldC5zdGF0dXNUZXh0KTtcclxuICAgIGlmIChhcmdzLm9wZXJhdGlvbiA9PT0gXCJ1cGxvYWRcIikge1xyXG4gICAgICBFdmVudEhhbmRsZXIucmVtb3ZlKFxyXG4gICAgICAgIGxpLnF1ZXJ5U2VsZWN0b3IoXCIjaWNvblVwbG9hZFwiKSxcclxuICAgICAgICBcImNsaWNrXCIsXHJcbiAgICAgICAgdGhpcy51cGxvYWRGaWxlXHJcbiAgICAgICk7XHJcbiAgICAgIChsaS5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzYmFyXCIpIGFzIEhUTUxFbGVtZW50KS5zdHlsZS52aXNpYmlsaXR5ID1cclxuICAgICAgICBcImhpZGRlblwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgcmVhZFVSTChsaTogSFRNTEVsZW1lbnQsIGFyZ3M6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IHByZXZpZXc6IEhUTUxJbWFnZUVsZW1lbnQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLnVwbG9hZC1pbWFnZVwiKTtcclxuICAgIGxldCBmaWxlOiBGaWxlID0gYXJncy5yYXdGaWxlO1xyXG4gICAgbGV0IHJlYWRlcjogRmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJsb2FkXCIsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBwcmV2aWV3LnNyYyA9IHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuICAgIGlmIChmaWxlKSB7XHJcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRmlsZVJlbW92ZShhcmdzOiBSZW1vdmluZ0V2ZW50QXJncyk6IHZvaWQge1xyXG4gICAgYXJncy5wb3N0UmF3RmlsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxcclxuICAgIHByaXZhdGUgYWxlcnRpZnk6IEFsZXJ0aWZ5U2VydmljZSxcclxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHVibGljIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxyXG4gICkge31cclxufVxyXG4iXX0=