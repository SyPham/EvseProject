import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Inject
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  SelectedEventArgs,
  FileInfo,
  RemovingEventArgs,
  UploaderComponent,
} from "@syncfusion/ej2-angular-inputs";
import { EmitType } from "@syncfusion/ej2-base";
import { MessageConstants } from "../../../_core/_constants";

import { AlertifyService } from "../../../services/alertify.service";

@Component({
  selector: "app-upload-document",
  templateUrl: "./upload-document.component.html",
  styleUrls: ["./upload-document.component.scss"],
})
export class UploadDocumentComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(UploaderComponent) uploadObj: UploaderComponent;
  @Input() path: any;
  @Input() allowedExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
  @Input() id: any;
  @Input() multiple = false;
  @Input() autoUpload = true;
  @Input() enabled = true;
  @Input() service: any;
  @Input() files: any[] = [];
  @Input() controlerName: string;
  file: any;
  showFile: any = false;
  showImgFile: any = false;
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
  public dropElement: HTMLElement;
  allImages: string[] = ['.jpg', '.gif', '.png'];
  constructor(@Inject("Env") private baseUrl,
    private alertify: AlertifyService,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    public translate: TranslateService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'] && changes.service.currentValue) {
      this.initialUploader();
      this.cd.detectChanges();
    }
  }
  ngAfterViewInit(): void {
    // this.initialUploader();
    // this.cd.detectChanges();
  }

  ngOnInit() {}
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
    this.service.getFilesById(this.id).subscribe(
      (file) => {
        if (file.name !== "") {
          this.files = [file];
          this.file = file;
          this.showFile = true;
          this.showImgFile = this.allImages.indexOf(file.type) !== -1
        } else {
          this.files = null;
          this.file = null;
          this.showFile = false;
          this.showImgFile = false;
          this.uploadObj.refresh();
        }
      },
      (error) => {
        this.files = null;
        this.file = null;
        this.showFile = false;
        this.uploadObj.refresh();
      }
    );
  }
  public onSelected(args: SelectedEventArgs): void {
    args.filesData.splice(5);
    let filesData: FileInfo[] = args.filesData;
    let allFiles: FileInfo[] = filesData.concat(args.filesData);
    if (allFiles.length > 5) {
      for (let i: number = 0; i < allFiles.length; i++) {
        if (allFiles.length > 5) {
          allFiles.shift();
        }
      }
      args.filesData = allFiles;
      args.modifiedFilesData = args.filesData;
    }
    this.showFile = args.filesData.length > 0;
    if (this.showFile) {
      this.showImgFile = this.allImages.indexOf(this.showFile[0].type) !== -1

    }
    args.isModified = true;
  }
  onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }
  removeFile() {
    this.remove();
  }
  public onUploadSuccess: EmitType<Object> = (args: any) => {
    this.getFileInfo();
    this.uploadObj.clearAll();
  };

  remove() {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.deleteTitle,
      this.alert.deleteMessage,
      () => {
        let ajax = new XMLHttpRequest();
        ajax.open(
          "POST",
          `${this.baseUrl}${this.controlerName}/remove?id=${this.id}`
        );
        ajax.onload = () => {
          this.getFileInfo();
          this.alertify.success(this.alert.deleted_ok_msg);
        };
        ajax.send();
      },
      () => {
        this.alertify.error(this.alert.cancelMessage);
      }
    );
  }

  download() {
    let downloadLink = document.createElement("a");
    downloadLink.href = this.downloadUrl;
    downloadLink.setAttribute("download", this.file.name);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
