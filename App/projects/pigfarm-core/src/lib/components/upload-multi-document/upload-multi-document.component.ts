import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  Input,
  ChangeDetectorRef,
  Inject
} from "@angular/core";
import {
  UploaderComponent,
  SelectedEventArgs,
  FileInfo,
  RemovingEventArgs,
} from "@syncfusion/ej2-angular-inputs";
import {
  createSpinner,
  showSpinner,
  hideSpinner,
} from "@syncfusion/ej2-popups";
import {
  EmitType,
  detach,
  Browser,
  createElement,
  isNullOrUndefined,
  EventHandler,
} from "@syncfusion/ej2-base";
import { MessageConstants } from "../../../_core/_constants";

import { AlertifyService } from "../../../services/alertify.service";
import { HttpClient } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-upload-multi-document",
  templateUrl: "./upload-multi-document.component.html",
  styleUrls: ["./upload-multi-document.component.css"],
})
export class UploadMultiDocumentComponent implements OnInit {
  @ViewChild("previewupload")
  public uploadObj: UploaderComponent;

  public allowExtensions: string =
    ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";

  public dropElement: HTMLElement;
  public filesName: string[] = [];
  public filesDetails: FileInfo[] = [];
  public filesList: HTMLElement[] = [];
  public uploadWrapper: HTMLElement;
  public parentElement: HTMLElement;
  @Input() path: any;
  @Input() allowedExtensions =
    ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
  @Input() id: any;
  @Input() multiple = false;
  @Input() autoUpload = true;
  @Input() enabled = true;
  @Input() service: any;
  @Input() files: any[] = [];
  @Input() controlerName: string;
  file: any;
  showFile: any = false;
  alert = {
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
    choose_farm_message: this.translate.instant(
      MessageConstants.CHOOSE_FARM_MESSAGE
    ),
    select_order_message: this.translate.instant(
      MessageConstants.SELECT_ORDER_MESSAGE
    ),
    yes_message: this.translate.instant(MessageConstants.YES_MSG),
    no_message: this.translate.instant(MessageConstants.NO_MSG),
  };
  downloadUrl: string;
  ngOnInit(): void {
    this.path = {
      saveUrl: `${this.baseUrl}${this.controlerName}/Save?id=${this.id}`,
      removeUrl: `${this.baseUrl}${this.controlerName}/remove?id=${this.id}`,
    };
    this.dropElement = document.getElementsByClassName(
      "control-section"
    )[0] as HTMLElement;
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
      if (
        this.dropElement
          .querySelector("#dropArea")
          .classList.contains("e-spinner-pane")
      ) {
        hideSpinner(this.dropElement.querySelector("#dropArea"));
        detach(this.dropElement.querySelector(".e-spinner-pane"));
      }
    };
    document.getElementById("uploadbtn").onclick = () => {
      if (
        this.dropElement.querySelector("ul") &&
        this.filesDetails.length > 0
      ) {
        this.uploadObj.upload(this.filesDetails, true);
      }
    };
  }
  public onSelect(args: SelectedEventArgs): void {
    if (!this.dropElement.querySelector("li")) {
      this.filesDetails = [];
    }
    if (
      isNullOrUndefined(
        document.getElementById("dropArea").querySelector(".e-upload-files")
      )
    ) {
      this.parentElement = createElement("ul", { className: "e-upload-files" });
      document
        .getElementsByClassName("e-upload")[0]
        .appendChild(this.parentElement);
    }
    let validFiles: FileInfo[] = this.validateFiles(args, this.filesDetails);
    if (validFiles.length === 0) {
      args.cancel = true;
      return;
    }
    for (let i: number = 0; i < validFiles.length; i++) {
      this.formSelectedData(validFiles[i], this);
    }
    this.filesDetails = this.filesDetails.concat(validFiles);
    args.cancel = true;
  }

  public validateFiles(args: any, viewedFiles: FileInfo[]): FileInfo[] {
    let modifiedFiles: FileInfo[] = [];
    let validFiles: FileInfo[] = [];
    let isModified: boolean = false;
    if (args.event.type === "drop") {
      isModified = true;
      let allImages: string[] = ["png", "jpg", "jpeg"];
      let files: FileInfo[] = args.filesData;
      for (let file of files) {
        if (allImages.indexOf(file.type) !== -1) {
          modifiedFiles.push(file);
        }
      }
    }
    let files: FileInfo[] =
      modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
    if (this.filesName.length > 0) {
      for (let file of files) {
        if (this.filesName.indexOf(file.name) === -1) {
          this.filesName.push(file.name);
          validFiles.push(file);
        }
      }
    } else {
      for (let file of files) {
        this.filesName.push(file.name);
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  public formSelectedData(file: FileInfo, proxy: any): void {
    let liEle: HTMLElement = createElement("li", {
      className: "e-upload-file-list",
      attrs: { "data-file-name": file.name },
    });
    let imageTag: HTMLImageElement = <HTMLImageElement>createElement("IMG", {
      className: "upload-image",
      attrs: { alt: "Image" },
    });
    let wrapper: HTMLElement = createElement("span", { className: "wrapper" });
    wrapper.appendChild(imageTag);
    liEle.appendChild(wrapper);
    liEle.appendChild(
      createElement("div", {
        className: "name file-name",
        innerHTML: file.name,
        attrs: { title: file.name },
      })
    );
    liEle.appendChild(
      createElement("div", {
        className: "file-size",
        innerHTML: proxy.uploadObj.bytesToSize(file.size),
      })
    );
    let clearbtn: HTMLElement;
    let uploadbtn: HTMLElement;
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
    let progressbarContainer: HTMLElement;
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
  public uploadFile(args: any): void {
    this.uploadObj.upload(
      [
        this.filesDetails[
          this.filesList.indexOf(args.currentTarget.parentElement)
        ],
      ],
      true
    );
  }
  public removeFiles(args: any): void {
    let removeFile: FileInfo =
      this.filesDetails[
        this.filesList.indexOf(args.currentTarget.parentElement)
      ];
    let statusCode: string = removeFile.statusCode;
    if (statusCode === "2" || statusCode === "1") {
      this.uploadObj.remove(removeFile, true);
      this.uploadObj.element.value = "";
    }
    let index: number = this.filesList.indexOf(
      args.currentTarget.parentElement
    );
    this.filesList.splice(index, 1);
    this.filesDetails.splice(index, 1);
    this.filesName.splice(this.filesName.indexOf(removeFile.name), 1);
    if (statusCode !== "2") {
      detach(args.currentTarget.parentElement);
    }
  }
  public onFileUpload(args: any): void {
    let li: Element = document
      .getElementById("dropArea")
      .querySelector('[data-file-name="' + args.file.name + '"]');
    let iconEle: HTMLElement = li.querySelector("#iconUpload") as HTMLElement;
    iconEle.style.cursor = "not-allowed";
    iconEle.classList.add("e-uploaded");
    EventHandler.remove(
      li.querySelector("#iconUpload"),
      "click",
      this.uploadFile
    );
    let progressValue: number = Math.round(
      (args.e.loaded / args.e.total) * 100
    );
    if (!isNaN(progressValue) && li.querySelector(".progressbar")) {
      li.getElementsByTagName("progress")[0].value = progressValue;
    }
  }
  public onUploadSuccess(args: any): void {
    let spinnerElement: HTMLElement = document.getElementById("dropArea");
    let li: HTMLElement = document
      .getElementById("dropArea")
      .querySelector('[data-file-name="' + args.file.name + '"]');
    if (li && !isNullOrUndefined(li.querySelector(".progressbar"))) {
      (li.querySelector(".progressbar") as HTMLElement).style.visibility =
        "hidden";
    }
    if (args.operation === "upload") {
      EventHandler.remove(
        li.querySelector("#iconUpload"),
        "click",
        this.uploadFile
      );
      li.setAttribute("title", args.e.currentTarget.statusText);
      (li.querySelector(".file-name") as HTMLElement).style.color = "green";
      (li.querySelector(".e-icons") as HTMLElement).onclick = () => {
        this.generateSpinner(this.dropElement.querySelector("#dropArea"));
      };
    } else {
      if (!isNullOrUndefined(li)) {
        detach(li);
      }
      if (!isNullOrUndefined(spinnerElement)) {
        hideSpinner(spinnerElement);
        detach(spinnerElement.querySelector(".e-spinner-pane"));
      }
    }
    li.querySelector("#removeIcon").removeAttribute(".e-file-remove-btn");
    li.querySelector("#removeIcon").setAttribute(
      "class",
      "e-icons e-file-delete-btn"
    );
  }
  public generateSpinner(targetElement: HTMLElement): void {
    createSpinner({ target: targetElement, width: "25px" });
    showSpinner(targetElement);
  }
  public onUploadFailed(args: any): void {
    let li: Element = document
      .getElementById("dropArea")
      .querySelector('[data-file-name="' + args.file.name + '"]');
    (li.querySelector(".file-name") as HTMLElement).style.color = "red";
    li.setAttribute("title", args.e.currentTarget.statusText);
    if (args.operation === "upload") {
      EventHandler.remove(
        li.querySelector("#iconUpload"),
        "click",
        this.uploadFile
      );
      (li.querySelector(".progressbar") as HTMLElement).style.visibility =
        "hidden";
    }
  }
  public readURL(li: HTMLElement, args: any): void {
    let preview: HTMLImageElement = li.querySelector(".upload-image");
    let file: File = args.rawFile;
    let reader: FileReader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result as string;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  public onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }

  constructor(
    @Inject("Env") private baseUrl,
    private alertify: AlertifyService,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    public translate: TranslateService
  ) {}
}
