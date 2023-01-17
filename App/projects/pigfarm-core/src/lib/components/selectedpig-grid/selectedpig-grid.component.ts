import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { EditService, GridComponent } from "@syncfusion/ej2-angular-grids";
import { Subscription } from "rxjs";
import { PigfarmCoreService } from '../../../services';

@Component({
  selector: "app-selectedpig-grid",
  templateUrl: "./selectedpig-grid.component.html",
  styleUrls: ["./selectedpig-grid.component.scss"],
  providers: [EditService]
})
export class SelectedpigGridComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() pigName: any = 'Gilt';
  @Input() selectedPigDataSource: any = [];
  @Input() recordNextDataSource: any = ["CullingSale", "Chemical", "Buried"];
  @Input() recordNext2DataSource: any = ["CullingSale", "Chemical", "Buried"];
  searchOptions = { fields: ["name"], operator: "contains", ignoreCase: true };
  @ViewChild("grid") public grid: GridComponent;
  @Output() avgWeightChange = new EventEmitter();
  @Output() totalWeightChange = new EventEmitter();
  @Output() avgAmountChange = new EventEmitter();
  @Output() totalAmountChange = new EventEmitter();
  @Output() selectedPigDataSourceChange = new EventEmitter();

  @Output() maleAvgWeightChange = new EventEmitter();
  @Output() maleTotalWeightChange = new EventEmitter();
  @Output() maleTotalSelectedChange = new EventEmitter();

  @Output() femaleAvgWeightChange = new EventEmitter();
  @Output() femaleTotalWeightChange = new EventEmitter();
  @Output() femaleTotalSelectedChange = new EventEmitter();

  pageSettings: any;
  @Input() visibleNextRoom = false;
  @Input() visibleNextPen = false;
  @Input() visibleNext2 = false;
  @Input() visibleButton = false;
  @Input() visibleNext = true;
  @Input() visibleAmount = true;
  @Input() visibleDisease = true;
  @Input() visibleWeight = true;
  @Input() visibleValue = false;
  @Input() visiblePigSex = false;

  @Input() visibleSourceGuid = false;
  @Input() visibleSource1Guid = false;
  @Input() visibleSource2Guid = false;
  @Input() visibleSource3Guid = false;
  @Input() visibleSemenConcentration = false;
  @Input() visibleSemenVolume = false;
  @Input() visibleMalformationRate = false;
  @Input() visiblePig = true;
  @Input()  visibleRfid: any = false;

  @Input() valueLabel = "";
  @Input() pigLabel = "Pig";
  @Input() next1Label = "Next1";
  @Input() next2Label = "Next2";
  editSettingsPig = {
    showDeleteConfirmDialog: false,
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Normal",
  };
  @Input() avgWeight: number;
  @Input() totalWeight: number;
  @Input() totalAmount: number;
  @Input() avgAmount: number;
  @Input() codeType: any;
  @Input() codeType2: any;
  @Input() maleAvgWeight: number;
  @Input() maleTotalWeight: number;
  @Input() maleTotalSelected: number;

  @Input() femaleAvgWeight: number;
  @Input() femaleTotalWeight: number;
  @Input() femaleTotalSelected: number;

  index: any;
  diseaseItem: any;
  recordNext: any;
  recordNextndex: any;
  recordNext2: any;
  recordNextndex2: any;
  recordNext2Item: any;
  recordNextItem: any;
  pigSexItem: any;
  pigSexIndex: any;
  subscription: Subscription = new Subscription();
  nextRoomItem: any;
  nextPenItem: any;
  constructor(@Inject("Env") private baseUrl,
    private trans: TranslateService,
    private cd: ChangeDetectorRef,
    private service: PigfarmCoreService
  ) {
    let user = JSON.parse(localStorage.getItem("user"));
    let pageSize = Number(user?.pageSizeSettingValue) || 10;
    let pageSizesTemp = user?.pageSizeSettingList || ["5", "10", "12", "20"];
    let pageSizes = pageSizesTemp.map((x) => +x);
    this.pageSettings = {
      pageSizes: pageSizes,
      enableQueryString: true,
      pageSize: pageSize,
      currentPage: 1,
      enableScroll: true,
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    let buttons = document.getElementsByClassName("btn");
    for (let button of Array.from(buttons)) {
      button.addEventListener("click", () => {
        this.grid?.endEdit();
      });
    }

  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes["selectedPigDataSource"]) {
      this.caculator();
      this.cd.detectChanges();
    }
 
  }
  created() {
    this.subscription.add(
      this.service.currentRecordLabel.subscribe((data: any) => {
        if (data) {
          this.valueLabel = data;
          this.grid.refreshHeader();

        }
      })
    );
  }
  ngOnInit() {
    this.totalAmount = 0;
    this.totalWeight = 0;
    this.avgWeight = 0;
    this.femaleTotalWeight = 0;
    this.maleTotalWeight = 0;
    this.maleAvgWeight = 0;
    this.maleAvgWeight = 0;
    

  }
  actionBeginPig(e) {
    if (e.action === "edit" && e.requestType === "save") {
      if (this.diseaseItem) {
        e.data.recordDisease = this.diseaseItem?.guid;
        e.data.recordDiseaseName = this.diseaseItem?.name;
      }
      if (this.recordNextItem) {
        e.data.recordNext = this.recordNextItem?.guid;
        e.data.recordNextName = this.recordNextItem?.name;
      }
      if (this.recordNext2Item) {
        e.data.recordNext2 = this.recordNext2Item?.guid;
        e.data.recordNext2Name = this.recordNext2Item?.name;
      }
      if (this.nextRoomItem) {
        e.data.nextRoom = this.nextRoomItem?.guid;
        e.data.nextRoomName = this.nextRoomItem?.name;
      }
      const index = e.rowIndex;
      if (index !== -1) {
        this.selectedPigDataSource[index].rfid = e.data.rfid;
        this.selectedPigDataSource[index].recordValue = e.data.recordValue;
        this.selectedPigDataSource[index].recordAmount = e.data.recordAmount;
        this.selectedPigDataSource[index].recordWeight = e.data.recordWeight;
        this.selectedPigDataSource[index].sourceGuid = e.data.sourceGuid;
        this.selectedPigDataSource[index].source1Guid = e.data.source1Guid;
        this.selectedPigDataSource[index].source2Guid = e.data.source2Guid;
        this.selectedPigDataSource[index].source3Guid = e.data.source3Guid;
        this.selectedPigDataSource[index].semenConcentration = e.data.semenConcentration;
        this.selectedPigDataSource[index].semenVolume = e.data.semenVolume;
        this.selectedPigDataSource[index].malformationRate = e.data.malformationRate;

        this.selectedPigDataSource[index].recordNext =
          this.recordNextItem?.guid;
        this.selectedPigDataSource[index].recordNext2 =
          this.recordNext2Item?.guid;
        this.selectedPigDataSource[index].recordNextName =
          this.recordNextItem?.name;
        this.selectedPigDataSource[index].recordNext2Name =
          this.recordNext2Item?.name;

          this.selectedPigDataSource[index].nextRoomName = this.nextRoomItem?.name;
          this.selectedPigDataSource[index].nextPenName = this.nextPenItem?.name;
          this.cd.detectChanges();
      
        this.caculator();
      }
    }
  }

  onChangeRecordNext(e, data) {
    if (e.isInteracted) {
      data.recordNext = e.itemData?.guid;
      data.recordNextName = e.itemData?.name;
      this.recordNextItem = e.itemData;

      this.recordNextndex = this.selectedPigDataSource.findIndex(
        (obj) => obj.pigGuid === data.pigGuid
      );
      if (this.recordNextndex !== -1) {
        this.selectedPigDataSource[this.recordNextndex].recordNext =
          e.itemData?.guid;
        this.selectedPigDataSource[this.recordNextndex].recordNextName =
          e.itemData?.name;
        this.cd.detectChanges();
      }
    }
  }
  onChangeRecordNext2(e, data) {
    if (e.isInteracted) {
      data.recordNext2 = e.itemData?.guid;
      data.recordNext2Name = e.itemData?.name;
      this.recordNext2Item = e.itemData;

      this.recordNextndex2 = this.selectedPigDataSource.findIndex(
        (obj) => obj.pigGuid === data.pigGuid
      );
      if (this.recordNextndex2 !== -1) {
        this.selectedPigDataSource[this.recordNextndex2].recordNext2 =
          e.itemData?.guid;
        this.selectedPigDataSource[this.recordNextndex2].recordNext2Name =
          e.itemData?.name;
        this.cd.detectChanges();
      }
    }
  }

  onChangePigSex(e, data) {
    if (e.isInteracted) {
      data.pigSex = e.itemData?.guid;
      data.pigSexName = e.itemData?.name;
      this.pigSexItem = e.itemData;

      this.pigSexIndex = this.selectedPigDataSource.findIndex(
        (obj) => obj.pigGuid === data.pigGuid
      );
      if (this.pigSexIndex !== -1) {
        this.selectedPigDataSource[this.pigSexIndex].pigSex = e.itemData?.guid;
        this.selectedPigDataSource[this.pigSexIndex].pigSexName =
          e.itemData?.name;
        this.cd.detectChanges();
      }
    }
  }

  onChangeDisease(e, data) {
    if (e.isInteracted) {
      data.recordDisease = e.itemData?.guid;
      data.recordDiseaseName = e.itemData?.name;
      this.diseaseItem = e.itemData;
      this.index = this.selectedPigDataSource.findIndex(
        (obj) => obj.pigGuid === data.pigGuid
      );
      if (this.index !== -1) {
        this.selectedPigDataSource[this.index].recordDisease = e.itemData?.guid;
        this.selectedPigDataSource[this.index].recordDiseaseName =
          e.itemData?.name;
        // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
        this.cd.detectChanges();

      }
    }
  }
  onChangeNextRoom(e, data) {
    if (e.isInteracted) {
      data.nextRoom = e.itemData?.guid;
      data.nextRoomName = e.itemData?.name;
      this.nextRoomItem = e.itemData;
      const index = this.selectedPigDataSource.findIndex(
        (obj) => obj.nextRoom === data.nextRoom
      );
      if (index !== -1) {
        this.selectedPigDataSource[index].nextRoom = e.itemData?.guid;
        this.selectedPigDataSource[index].nextRoomName =
          e.itemData?.name;
        // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
        this.cd.detectChanges();

      }
    }
  }
  onChangeNextPen(e, data) {
    if (e.isInteracted) {
      data.nextPen = e.itemData?.guid;
      data.nextPenName = e.itemData?.name;
      this.nextPenItem = e.itemData;
      const index = this.selectedPigDataSource.findIndex(
        (obj) => obj.nextPen === data.nextPen
      );
      if (index !== -1) {
        this.selectedPigDataSource[index].nextPen = e.itemData?.guid;
        this.selectedPigDataSource[index].nextPenName =
          e.itemData?.name;
        // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
        this.cd.detectChanges();

      }
    }
  }
  average = (nums, length) => {
    if ((nums as []).length > 0) {
      return nums.reduce((a, b) => a + b) / length;
    }
    return 0;
  };
  total = (nums) => {
    if ((nums as []).length > 0) {
      return nums.reduce((a, b) => a + b);
    }
    return 0;
  };
  caculator() {
    const weights = this.selectedPigDataSource
      .filter((x) => x.recordWeight > 0)
      .map((x) => x.recordWeight);
    const amounts = this.selectedPigDataSource
      .filter((x) => x.recordAmount > 0)
      .map((x) => x.recordAmount);

    let length = this.selectedPigDataSource.length;
    this.avgWeight = +this.average(weights, length).toFixed(0);
    this.avgAmount = +this.average(amounts, length).toFixed(0);
    this.totalWeight = +this.total(weights).toFixed(0);
    this.totalAmount = +this.total(amounts).toFixed(0);

    const maleWeights = this.selectedPigDataSource
      .filter((x) => x.pigSex == "1")
      .map((x) => x.recordWeight);

    const femaleWeights = this.selectedPigDataSource
      .filter((x) => x.pigSex !== "1")
      .map((x) => x.recordWeight);

    let femalelength = femaleWeights.length;
    this.femaleAvgWeight = +this.average(femaleWeights, femalelength).toFixed(
      0
    );
    this.femaleTotalWeight = +this.total(femaleWeights).toFixed(0);
    this.femaleTotalSelected = femalelength;

    this.femaleAvgWeightChange.emit(this.femaleAvgWeight);
    this.femaleTotalWeightChange.emit(this.femaleTotalWeight);
    this.femaleTotalSelectedChange.emit(this.femaleTotalSelected);

    let malelength = maleWeights.length;
    this.maleAvgWeight = +this.average(maleWeights, malelength).toFixed(0);
    this.maleTotalWeight = +this.total(maleWeights).toFixed(0);
    this.maleTotalSelected = malelength;

    this.maleAvgWeightChange.emit(this.maleAvgWeight);
    this.maleTotalWeightChange.emit(this.maleTotalWeight);
    this.maleTotalSelectedChange.emit(this.maleTotalSelected);

    this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
    this.avgAmountChange.emit(this.avgAmount);
    this.avgWeightChange.emit(this.avgWeight);
    this.totalAmountChange.emit(this.totalAmount);
    this.totalWeightChange.emit(this.totalWeight);
    this.cd.detectChanges();

  }
}
