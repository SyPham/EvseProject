import { NgxSpinnerService } from "ngx-spinner";

import {
  DataManager,
  Query,
  UrlAdaptor,
  Predicate,
} from "@syncfusion/ej2-data";

import { L10n, setCulture } from "@syncfusion/ej2-base";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NgbModalRef,
  NgbModal,
  NgbTooltipConfig,
} from "@ng-bootstrap/ng-bootstrap";
import {
  ExcelExportCompleteArgs,
  ExcelExportProperties,
  GridComponent,
} from "@syncfusion/ej2-angular-grids";
import { AlertifyService } from "src/app/_core/_service/alertify.service";
import { BaseComponent } from "herr-core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import { PigService } from "src/app/_core/_service/pigs/pig.service";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";

import { PenService, RoomService } from "src/app/_core/_service/farms";
import { Breeding2SowConst, SowWeaning } from "../../config";
import { Record2PigService } from "src/app/_core/_service/apply-orders";
import { Breeding2SowInService, Breeding2SowService, Breeding2SucklingService, BreedingService, SowWeaningService } from "../../services";
declare let window: any;
@Component({
  selector: "app-sow-weaning",
  templateUrl: "./sow-weaning.component.html",
  styleUrls: ["./sow-weaning.component.scss"],
})
export class SowWeaningComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public query: Query;
  localLang = window.navigator.userLanguage || window.navigator.language;
  @Output() selectSowWeaning = new EventEmitter();
  data: DataManager;
  baseUrl = environment.apiUrl;
  password = "";
  modalReference: NgbModalRef;

  @ViewChild("grid") public grid: GridComponent;
  model: SowWeaning;
  setFocus: any;
  locale = localStorage.getItem("lang");
  editSettings = {
    showDeleteConfirmDialog: false,
    allowEditing: false,
    allowAdding: true,
    allowDeleting: false,
    mode: "Normal",
  };

  title: any;
  @ViewChild("odsTemplate", { static: true }) public odsTemplate: any;
  @ViewChild("breedingGuidSearchTemplate", { static: true })
  public breedingGuidSearchTemplate: any;
  @ViewChild("optionModal", { static: false }) templateRef: TemplateRef<any>;

  breedingGuidSearch: any;
  toolbarOptions: any;
  selectionOptions = { checkboxMode: "ResetOnRowClick" };
  fields: object = { text: "name", value: "guid" };
  breedingGuid: any;
  subscription: Subscription;
  checkedData: any[] = [];
  orderStatusCheckedData: number[] = [];
  orderStatus: any;
  configButtonData: any;
  selectedSow: any[] = [];
  selectedPigData: any[] = [];
  oldselectedPigData: any[];
  penGuid: any;
  pen: any;
  room: any;
  
  public actionComplete(e: any): void {
    e.result = e.result?.filter((x) => x?.guid != "");
  }
  
  constructor(
    private service: SowWeaningService,
    private serviceBreeding: BreedingService,
    private serviceBreeding2Sow: Breeding2SowService,
    private servicePen: PenService,
    private serviceRoom: RoomService,
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private servicePig: PigService,
    private route: ActivatedRoute,
    private router: Router,
    public record2PigService: Record2PigService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private cdRef:ChangeDetectorRef
  ) {
    super(translate,environment.apiUrl);
  }
  pens: any;
  pigs: any;
  pigGuid: string;
  estDate: any;
  status: string;
  searchOptions = { fields: ["name"], operator: "contains", ignoreCase: true };
  roomGuid: any;
  @ViewChild("statusTemplate", { static: true }) public statusTemplate: any;
  // @ViewChild("estTemplate", { static: true }) public estTemplate: any;
  onSelectedEstDateValue(args: any) {
    this.estDate = args;
    this.loadData();
  }
 
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit() {
    this.onParamChange();
    this.toolbarOptions = [
      {
        text: this.translate.instant("Excelexport"),
        align: "Right",
        id: "grid_excelexport",
        prefixIcon: "e-excelexport e-icons",
      },
      { template: this.odsTemplate, align: "Right" },
      "Add",
      { template: this.statusTemplate },
      // { template: this.estTemplate },
      { text: "Search", align: "Left" },
      { template: this.breedingGuidSearchTemplate, align: "Left" },
    ];
    // this.Permission(this.route);
    let lang = localStorage.getItem("lang");
    let languages = JSON.parse(localStorage.getItem("languages"));
    // setCulture(lang);
    let load = {
      [lang]: {
        grid: languages["grid"],
        pager: languages["pager"],
        "multi-select": languages["multiselect"],
      },
    };
    L10n.load(load);
    this.loadConfig();
    this.loadData();
    this.loadOrderStatus();
    this.loadButtonConfig();
  }

  loadRoomGuid() {
    return this.serviceRoom
      .getRoomByRecord(this.model?.guid || "", Breeding2SowConst.SowWeaning)
      .toPromise();
  }

   onChangebreedingGuid(e) {
    this.roomGuid = e.itemData?.roomGuid
    this.penGuid = e.itemData?.penGuid
    
    if (e.isInteracted) {
      this.model.breedingGuid = e.itemData?.guid;
      this.loadSelectedPig();
    }
  }



  refresh() {
    this.loadSelectedPig();
  }

  // loadSelectedPig() {
  //   this.serviceBreeding2Sow.getBreeding2SowIn(this.model.breedingGuid).subscribe((res: any) => {
  //     this.selectedPigData = res;
  //   });
  // }
  loadSelectedPig() {
    this.serviceBreeding2Sow.getBreeding2Sow(
      {
        breedingGuid:this.model.breedingGuid, 
        recordGuid: this.model.guid, 
        lang: localStorage.getItem('lang')
    })
    .subscribe((res: any) => {
      this.selectedPigData = res;
      setTimeout(() => {
        for (let old of this.selectedPigData) {
          old.nextRoom = this.room?.guid
          old.nextRoomName = this.room?.name
          old.nextPen = this.pen?.guid
          old.nextPenName = this.pen?.name
        }
      }, 300);
    });
  }
  copy(breeding2suckling) {
      for (let old of this.selectedPigData) {
        old.nextRoom = this.room?.guid
        old.nextRoomName = this.room?.name
        old.nextPen = this.pen?.guid
        old.nextPenName = this.pen?.name
      }
      breeding2suckling?.grid.refresh()
  }
  loadButtonConfig() {
    let query = new Query();
    const accessToken = localStorage.getItem("token");
    let predicate: Predicate = new Predicate(
      "type",
      "equal",
      Breeding2SowConst.SowWeaning
    );
    predicate = predicate.and("link", "notequal", null);
    predicate = predicate.or("link", "notequal", "");

    query.where(predicate).sortBy("sort");

    new DataManager({
      url: `${this.baseUrl}SystemConfig/GetDataDropdownlist`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    })
      .executeQuery(query)
      .then((x: any) => {
        this.configButtonData = x.result;
        console.log(x.result);
      });
  }
  goToLink(item) {
    try {
      const uri = item.link?.trim() + this.model.guid;
      this.router.navigate([uri]);
      this.modalReference.dismiss();
    } catch (error) {}
  }
  // life cycle ejs-grid
  rowSelected(args) {
    //console.log(args.data);
  }
  recordClick(args: any) {
    //console.log(args.rowData);
    this.service.changeSowWeaning(args.rowData);
  }

  onDoubleClick(args: any): void {
    this.setFocus = args.column; // Get the column from Double click event
  }
  onChangebreedingGuidSearch(e) {
    if (e.isInteracted) {
      this.breedingGuidSearch = e.value;
      this.loadData();
    }
  }
  onChangeEst(e) {
    if (e.isInteracted) {
      this.estDate = e.value;
      this.loadData();
    }
  }
  onChangeStatus(e) {
    if (e.isInteracted) {
      this.status = e.value;
      this.loadData();
    }
  }
  onChange(args, data) {
    data.isDefault = args.checked;
  }

  actionBegin(args) {}
  odsExport() {
    const functionName = this.functionName;
    const printBy = this.printBy;
    const accountName =
      JSON.parse(localStorage.getItem("user"))?.accountName || "N/A";
    const header = {
      headerRows: 3,
      rows: [
        {
          cells: [
            {
              colSpan: 5,
              value: `* ${functionName}`,
              style: {
                fontColor: "#fd7e14",
                fontSize: 18,
                hAlign: "Left",
                bold: true,
              },
            },
          ],
        },
        {
          cells: [
            {
              colSpan: 5,
              value: `* ${this.datePipe.transform(
                new Date(),
                "yyyyMMdd_HHmmss"
              )}`,
              style: {
                fontColor: "#fd7e14",
                fontSize: 18,
                hAlign: "Left",
                bold: true,
              },
            },
          ],
        },
        {
          cells: [
            {
              colSpan: 5,
              value: `* ${printBy} ${accountName}`,
              style: {
                fontColor: "#fd7e14",
                fontSize: 18,
                hAlign: "Left",
                bold: true,
              },
            },
          ],
        },
      ],
    } as any;

    const fileName = `${functionName}_${this.datePipe.transform(
      new Date(),
      "yyyyMMdd_HHmmss"
    )}.ods`;
    const excelExportProperties: ExcelExportProperties = {
      hierarchyExportMode: "All",
      fileName: fileName,
      header: header,
    };

    this.isodsExport = true;

    this.grid.excelExport(excelExportProperties, null, null, true);
  }

  excelExpComplete(args: ExcelExportCompleteArgs) {
    if (this.isodsExport) {
      const fileName = `${this.functionName}_${this.datePipe.transform(
        new Date(),
        "yyyyMMdd_HHmmss"
      )}.ods`;

      args.promise.then((e: { blobData: Blob }) => {
        const model = {
          functionName: fileName,
          file: e.blobData,
        };
        this.service.downloadODSFile(model).subscribe((res: any) => {
          this.service.downloadBlob(
            res.body,
            fileName,
            "application/vnd.oasis.opendocument.spreadsheet"
          );
        });
      });
    }
  }
  toolbarClick(args) {
    const functionName = this.functionName;
    const printBy = this.printBy;
    switch (args.item.id) {
      case "grid_excelexport":
        const accountName =
          JSON.parse(localStorage.getItem("user"))?.accountName || "N/A";
        const header = {
          headerRows: 3,
          rows: [
            {
              cells: [
                {
                  colSpan: 5,
                  value: `* ${functionName}`,
                  style: {
                    fontColor: "#fd7e14",
                    fontSize: 18,
                    hAlign: "Left",
                    bold: true,
                  },
                },
              ],
            },
            {
              cells: [
                {
                  colSpan: 5,
                  value: `* ${this.datePipe.transform(
                    new Date(),
                    "yyyyMMdd_HHmmss"
                  )}`,
                  style: {
                    fontColor: "#fd7e14",
                    fontSize: 18,
                    hAlign: "Left",
                    bold: true,
                  },
                },
              ],
            },
            {
              cells: [
                {
                  colSpan: 5,
                  value: `* ${printBy} ${accountName}`,
                  style: {
                    fontColor: "#fd7e14",
                    fontSize: 18,
                    hAlign: "Left",
                    bold: true,
                  },
                },
              ],
            },
          ],
        } as any;

        const fileName = `${functionName}_${this.datePipe.transform(
          new Date(),
          "yyyyMMdd_HHmmss"
        )}.xlsx`;
        const excelExportProperties: ExcelExportProperties = {
          hierarchyExportMode: "All",
          fileName: fileName,
          header: header,
        };
        this.grid.excelExport(excelExportProperties);
        break;
      case "grid_add":
        args.cancel = true;
        this.model = {} as any;
        this.openModal(this.templateRef);
        break;
      default:
        break;
    }
  }

  // end life cycle ejs-grid

  // api
  getAudit(id) {
    this.service.getAudit(id).subscribe((data) => {
      this.audit = data;
    });
  }
  loadConfig() {
    let query = new Query();
    query.where("type", "equal", Breeding2SowConst.SowWeaning);
    query.where("no", "equal", "insert");

    const accessToken = localStorage.getItem("token");
    new DataManager({
      url: `${this.baseUrl}SystemConfig/GetDataDropdownlist`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    })
      .executeQuery(query)
      .then((x: any) => {
        const configData = x.result;
        const item = configData[0];
        if (item && item.value === "0") {
          this.toolbarOptions = [
            {
              text: this.translate.instant("Excelexport"),
              align: "Right",
              id: "grid_excelexport",
              prefixIcon: "e-excelexport e-icons",
            },
            { template: this.odsTemplate, align: "Right" },
            { template: this.statusTemplate },
            // { template: this.estTemplate },
            { text: "Search", align: "Left" },
            { template: this.breedingGuidSearchTemplate, align: "Left" },
          ];
        } else {
          this.toolbarOptions = [
            {
              text: this.translate.instant("Excelexport"),
              align: "Right",
              id: "grid_excelexport",
              prefixIcon: "e-excelexport e-icons",
            },
            { template: this.odsTemplate, align: "Right" },
            "Add",
            { template: this.statusTemplate },
            // { template: this.estTemplate },
            { text: "Search", align: "Left" },
            { template: this.breedingGuidSearchTemplate, align: "Left" },
          ];
        }
      });
  }
  loadData() {
    this.query = new Query();
    // if (this.estDate) {
    //   this.query.where("estDate", "equal", this.convertDateTime(this.estDate));
    // }
    if (this.breedingGuidSearch) {
      this.query.where("breedingGuid", "equal", this.breedingGuidSearch);
    }
    if (this.orderStatusCheckedData.length > 1) {
      let predicate: Predicate = Predicate.or();
      predicate.predicates = [];
      for (const status of this.orderStatusCheckedData) {
        predicate.predicates.push(new Predicate("status", "equal", status));
      }
      this.query.where(predicate);
    } else if (this.orderStatusCheckedData.length == 1) {
      this.query.where(
        new Predicate("status", "equal", this.orderStatusCheckedData[0])
      );
    }
    const accessToken = localStorage.getItem("token");
    const farmGuid = localStorage.getItem("farmGuid");
    this.data = new DataManager(
      {
        url: `${this.baseUrl}SowWeaning/LoadData?farmGuid=${farmGuid}&lang=${this.globalLang}`,
        adaptor: new UrlAdaptor(),
        headers: [{ authorization: `Bearer ${accessToken}` }],
      },
      this.query.sortByDesc("id")
    );
  }

  delete(id) {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.deleteTitle,
      this.alert.deleteMessage,
      () => {
        this.service.delete(id).subscribe(
          (res) => {
            if (res.success === true) {
              this.alertify.success(this.alert.deleted_ok_msg);
              this.loadData();
            } else {
              this.alertify.warning(this.alert.system_error_msg);
            }
          },
          (err) => this.alertify.warning(this.alert.system_error_msg)
        );
      },
      () => {
        this.alertify.error(this.alert.cancelMessage);
      }
    );
  }
  getPenByBreedingGuid() {
    return this.serviceBreeding.getByGuid(this.model.breedingGuid).toPromise();
  }
  ToFormatModel(model: any) {
    for (let key in model) {
      let value = model[key];
      if (value && value instanceof Date) {
        if (key === "createDate") {
          model[key] = this.datePipe.transform(value, "yyyy/MM/dd HH:mm:ss");
        } else {
          model[key] = this.datePipe.transform(value, "yyyy/MM/dd");
        }
      } else {
        model[key] = value;
      }
    }
    return model;
  }
  create() {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.createTitle,
      this.alert.createMessage,
      () => {
        const farmGuid = localStorage.getItem("farmGuid");
        if (!farmGuid) {
          this.alertify.warning(this.alert.choose_farm_message, true);
          return;
        }
        this.model.farmGuid = farmGuid;
        this.setStatus(this.model);

        this.model.breeding2Sow = this.selectedPigData;
        this.model.executeDate = this.convertDateTime(this.model.executeDate);
        this.service.add(this.ToFormatModel(this.model)).subscribe(
          (res) => {
            if (res.success === true) {
              this.alertify.success(this.alert.created_ok_msg);
              this.loadData();
              this.modalReference.dismiss();
            } else {
              this.alertify.warning(this.alert.system_error_msg);
            }
          },
          (error) => {
            this.alertify.warning(this.alert.system_error_msg);
          }
        );
      },
      () => {
        this.alertify.error(this.alert.cancelMessage);
      }
    );
  }

  setStatus(model: SowWeaning) {
    if (model.executeGuid) {
      this.model.status = this.statusConts.Execute;
    }
  }
  convertDateTime(data) {
    if (data instanceof Date) {
      return this.datePipe.transform(data as Date, "yyyy-MM-dd");
    }
    return data;
  }
  update() {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.updateTitle,
      this.alert.updateMessage,
      () => {
        this.model.executeDate = this.convertDateTime(this.model.executeDate);
        this.model.breeding2Sow = this.selectedPigData;
        this.service.update(this.ToFormatModel(this.model)).subscribe(
          (res) => {
            if (res.success === true) {
              this.alertify.success(this.alert.updated_ok_msg);
              this.loadData();
              this.modalReference.dismiss();
            } else {
              this.alertify.warning(this.alert.system_error_msg);
            }
          },
          (error) => {
            this.alertify.warning(this.alert.system_error_msg);
          }
        );
      },
      () => {
        this.alertify.error(this.alert.cancelMessage);
      }
    );
  }
 
  // end api
  NO(index) {
    return (
      (this.grid.pageSettings.currentPage - 1) *
        this.grid.pageSettings.pageSize +
      Number(index) +
      1
    );
  }
  onChangeChecked(e, data) {
    let checked = e.checked;
    if (checked) {
      this.checkedData.push(data.guid);
    } else {
      this.checkedData = this.checkedData.filter((pig) => pig !== data.guid);
    }
    console.log(this.checkedData);
  }
  save() {
    if (this.model.id > 0) {
      this.update();
    } else {
      this.create();
    }
  }
  dataSourceChange(e) {
    this.selectedPigData = e
    for (let old of this.selectedPigData) {
      old.nextRoom = this.room?.guid
      old.nextRoomName = this.room?.name
      old.nextPen = this.pen?.guid
      old.nextPenName = this.pen?.name
    }
  }
  execute() {
    if (this.model.id == 0) {
      this.create();
    } else {
      
      this.model.status = this.statusConts.Close;
      this.model.executeGuid = JSON.parse(localStorage.getItem("user")).guid;
      this.model.executeDate = new Date();
      this.update();
    }
  }
  onParamChange() {
    this.route.paramMap.subscribe((params: any) => {
      const upperguid = params.get("upperguid");
      const recordguid = params.get("recordguid");
      if (upperguid) {
        this.service
          .getByRecordGuid(upperguid, recordguid)
          .subscribe((model: any) => {
            this.model = { ...model };
            this.openModal(this.templateRef, this.model);
          });
      }
    });
  }
 
  async openModal(template, data = {} as any) {
    this.checkedData = [];
    this.selectedSow = null;
    this.selectedPigData = [];
    this.roomGuid = null;
    this.pen = null;
    this.room = null;
    
    if (data?.id > 0) {
      this.model = { ...data };
      try {
        this.spinner.show("default");
        if (this.model.breedingGuid) {
           this.loadSelectedPig();
        }
        this.getAudit(this.model.id);
        this.title = "Sow_Weaning_EDIT_MODAL";
        this.showModal(template);
      } catch {
        this.spinner.hide("default");
      }
      this.spinner.hide("default");
    } else {
      this.model.id = 0;
      this.model.breedingGuid = "";
      this.model.status = this.statusConts.Default;
      this.model.executeGuid = JSON.parse(localStorage.getItem("user")).guid;
      this.model.executeDate = new Date();
      this.title = "Sow_Weaning_ADD_MODAL";
      this.showModal(template);
    }
  }
  showModal(template) {
    this.modalReference = this.modalService.open(template, {
      size: "xl",
      backdrop: "static",
    });
  }

  rowDataBoundApplyOrder(args) {
    if (args.data.status === 2) {
      args.row.classList.add("status-2");
    }
    if (args.data.status === 4) {
      args.row.classList.add("status-4");
    }
    if (args.data.status === 5) {
      args.row.classList.add("status-5");
    }
  }
  loadOrderStatus() {
    new DataManager({
      url: `${
        this.baseUrl
      }CodeType/GetDataDropdownlist?lang=${localStorage.getItem(
        "lang"
      )}&codeType=Order_Status`,
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    })
      .executeQuery(
        new Query()
          .skip(this.skip)
          .take(this.take)
          .addParams("lang", localStorage.getItem("lang"))
      )
      .then((data: any) => {
        this.orderStatus = data.result.filter((x) => x.guid != "");
      });
  }
  onCheckedChangeOrderStatus(e, data) {
    if (e.checked) {
      if (data.guid) {
        this.orderStatusCheckedData.push(+data.guid);
      }
    } else {
      if (data.guid) {
        this.orderStatusCheckedData = [
          ...this.orderStatusCheckedData.filter((x) => x !== +data.guid),
        ];
      }
    }
    this.loadData();
  }
  onChangeSowGuid(e) {
    this.pen =  e.itemData
    for (let old of this.selectedPigData) {
      old.nextPen = e.itemData?.guid
      old.nextPenName = e.itemData?.name
    }
    this.cdRef.detectChanges();
    if (e.isInteracted) {
      this.model.sowGuid = e.itemData?.guid;
      if (this.model.id > 0 && this.model.breedingGuid && this.model.sowGuid) {
        this.loadSelectedPig();
     }
    }
  

  }
  onChangeRoom(e) {
    this.room =  e.itemData
    for (let old of this.selectedPigData) {
      old.nextRoom = e.itemData?.guid
      old.nextRoomName = e.itemData?.name
    }
    this.cdRef.detectChanges();

    console.log(this.selectedPigData)
  }
}
