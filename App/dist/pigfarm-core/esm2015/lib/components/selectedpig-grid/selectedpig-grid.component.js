import { Component, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef, Inject, } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { EditService } from "@syncfusion/ej2-angular-grids";
import { Subscription } from "rxjs";
import { PigfarmCoreService } from '../../../services';
export class SelectedpigGridComponent {
    constructor(baseUrl, trans, cd, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.cd = cd;
        this.service = service;
        this.pigName = 'Gilt';
        this.selectedPigDataSource = [];
        this.recordNextDataSource = ["CullingSale", "Chemical", "Buried"];
        this.recordNext2DataSource = ["CullingSale", "Chemical", "Buried"];
        this.searchOptions = { fields: ["name"], operator: "contains", ignoreCase: true };
        this.avgWeightChange = new EventEmitter();
        this.totalWeightChange = new EventEmitter();
        this.avgAmountChange = new EventEmitter();
        this.totalAmountChange = new EventEmitter();
        this.selectedPigDataSourceChange = new EventEmitter();
        this.maleAvgWeightChange = new EventEmitter();
        this.maleTotalWeightChange = new EventEmitter();
        this.maleTotalSelectedChange = new EventEmitter();
        this.femaleAvgWeightChange = new EventEmitter();
        this.femaleTotalWeightChange = new EventEmitter();
        this.femaleTotalSelectedChange = new EventEmitter();
        this.visibleNextRoom = false;
        this.visibleNextPen = false;
        this.visibleNext2 = false;
        this.visibleButton = false;
        this.visibleNext = true;
        this.visibleAmount = true;
        this.visibleDisease = true;
        this.visibleWeight = true;
        this.visibleValue = false;
        this.visiblePigSex = false;
        this.visibleSourceGuid = false;
        this.visibleSource1Guid = false;
        this.visibleSource2Guid = false;
        this.visibleSource3Guid = false;
        this.visibleSemenConcentration = false;
        this.visibleSemenVolume = false;
        this.visibleMalformationRate = false;
        this.visiblePig = true;
        this.visibleRfid = false;
        this.valueLabel = "";
        this.pigLabel = "Pig";
        this.next1Label = "Next1";
        this.next2Label = "Next2";
        this.editSettingsPig = {
            showDeleteConfirmDialog: false,
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            mode: "Normal",
        };
        this.subscription = new Subscription();
        this.average = (nums, length) => {
            if (nums.length > 0) {
                return nums.reduce((a, b) => a + b) / length;
            }
            return 0;
        };
        this.total = (nums) => {
            if (nums.length > 0) {
                return nums.reduce((a, b) => a + b);
            }
            return 0;
        };
        let user = JSON.parse(localStorage.getItem("user"));
        let pageSize = Number(user === null || user === void 0 ? void 0 : user.pageSizeSettingValue) || 10;
        let pageSizesTemp = (user === null || user === void 0 ? void 0 : user.pageSizeSettingList) || ["5", "10", "12", "20"];
        let pageSizes = pageSizesTemp.map((x) => +x);
        this.pageSettings = {
            pageSizes: pageSizes,
            enableQueryString: true,
            pageSize: pageSize,
            currentPage: 1,
            enableScroll: true,
        };
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngAfterViewInit() {
        let buttons = document.getElementsByClassName("btn");
        for (let button of Array.from(buttons)) {
            button.addEventListener("click", () => {
                var _a;
                (_a = this.grid) === null || _a === void 0 ? void 0 : _a.endEdit();
            });
        }
    }
    ngOnChanges(changes) {
        if (changes["selectedPigDataSource"]) {
            this.caculator();
            this.cd.detectChanges();
        }
    }
    created() {
        this.subscription.add(this.service.currentRecordLabel.subscribe((data) => {
            if (data) {
                this.valueLabel = data;
                this.grid.refreshHeader();
            }
        }));
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (e.action === "edit" && e.requestType === "save") {
            if (this.diseaseItem) {
                e.data.recordDisease = (_a = this.diseaseItem) === null || _a === void 0 ? void 0 : _a.guid;
                e.data.recordDiseaseName = (_b = this.diseaseItem) === null || _b === void 0 ? void 0 : _b.name;
            }
            if (this.recordNextItem) {
                e.data.recordNext = (_c = this.recordNextItem) === null || _c === void 0 ? void 0 : _c.guid;
                e.data.recordNextName = (_d = this.recordNextItem) === null || _d === void 0 ? void 0 : _d.name;
            }
            if (this.recordNext2Item) {
                e.data.recordNext2 = (_e = this.recordNext2Item) === null || _e === void 0 ? void 0 : _e.guid;
                e.data.recordNext2Name = (_f = this.recordNext2Item) === null || _f === void 0 ? void 0 : _f.name;
            }
            if (this.nextRoomItem) {
                e.data.nextRoom = (_g = this.nextRoomItem) === null || _g === void 0 ? void 0 : _g.guid;
                e.data.nextRoomName = (_h = this.nextRoomItem) === null || _h === void 0 ? void 0 : _h.name;
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
                this.selectedPigDataSource[index].recordNext = (_j = this.recordNextItem) === null || _j === void 0 ? void 0 : _j.guid;
                this.selectedPigDataSource[index].recordNext2 = (_k = this.recordNext2Item) === null || _k === void 0 ? void 0 : _k.guid;
                this.selectedPigDataSource[index].recordNextName = (_l = this.recordNextItem) === null || _l === void 0 ? void 0 : _l.name;
                this.selectedPigDataSource[index].recordNext2Name = (_m = this.recordNext2Item) === null || _m === void 0 ? void 0 : _m.name;
                this.selectedPigDataSource[index].nextRoomName = (_o = this.nextRoomItem) === null || _o === void 0 ? void 0 : _o.name;
                this.selectedPigDataSource[index].nextPenName = (_p = this.nextPenItem) === null || _p === void 0 ? void 0 : _p.name;
                this.cd.detectChanges();
                this.caculator();
            }
        }
    }
    onChangeRecordNext(e, data) {
        var _a, _b, _c, _d;
        if (e.isInteracted) {
            data.recordNext = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
            data.recordNextName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
            this.recordNextItem = e.itemData;
            this.recordNextndex = this.selectedPigDataSource.findIndex((obj) => obj.pigGuid === data.pigGuid);
            if (this.recordNextndex !== -1) {
                this.selectedPigDataSource[this.recordNextndex].recordNext = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                this.selectedPigDataSource[this.recordNextndex].recordNextName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                this.cd.detectChanges();
            }
        }
    }
    onChangeRecordNext2(e, data) {
        var _a, _b, _c, _d;
        if (e.isInteracted) {
            data.recordNext2 = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
            data.recordNext2Name = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
            this.recordNext2Item = e.itemData;
            this.recordNextndex2 = this.selectedPigDataSource.findIndex((obj) => obj.pigGuid === data.pigGuid);
            if (this.recordNextndex2 !== -1) {
                this.selectedPigDataSource[this.recordNextndex2].recordNext2 = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                this.selectedPigDataSource[this.recordNextndex2].recordNext2Name = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                this.cd.detectChanges();
            }
        }
    }
    onChangePigSex(e, data) {
        var _a, _b, _c, _d;
        if (e.isInteracted) {
            data.pigSex = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
            data.pigSexName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
            this.pigSexItem = e.itemData;
            this.pigSexIndex = this.selectedPigDataSource.findIndex((obj) => obj.pigGuid === data.pigGuid);
            if (this.pigSexIndex !== -1) {
                this.selectedPigDataSource[this.pigSexIndex].pigSex = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                this.selectedPigDataSource[this.pigSexIndex].pigSexName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                this.cd.detectChanges();
            }
        }
    }
    onChangeDisease(e, data) {
        var _a, _b, _c, _d;
        if (e.isInteracted) {
            data.recordDisease = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
            data.recordDiseaseName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
            this.diseaseItem = e.itemData;
            this.index = this.selectedPigDataSource.findIndex((obj) => obj.pigGuid === data.pigGuid);
            if (this.index !== -1) {
                this.selectedPigDataSource[this.index].recordDisease = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                this.selectedPigDataSource[this.index].recordDiseaseName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
                this.cd.detectChanges();
            }
        }
    }
    onChangeNextRoom(e, data) {
        var _a, _b, _c, _d;
        if (e.isInteracted) {
            data.nextRoom = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
            data.nextRoomName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
            this.nextRoomItem = e.itemData;
            const index = this.selectedPigDataSource.findIndex((obj) => obj.nextRoom === data.nextRoom);
            if (index !== -1) {
                this.selectedPigDataSource[index].nextRoom = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                this.selectedPigDataSource[index].nextRoomName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
                this.cd.detectChanges();
            }
        }
    }
    onChangeNextPen(e, data) {
        var _a, _b, _c, _d;
        if (e.isInteracted) {
            data.nextPen = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
            data.nextPenName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
            this.nextPenItem = e.itemData;
            const index = this.selectedPigDataSource.findIndex((obj) => obj.nextPen === data.nextPen);
            if (index !== -1) {
                this.selectedPigDataSource[index].nextPen = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                this.selectedPigDataSource[index].nextPenName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
                this.cd.detectChanges();
            }
        }
    }
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
        this.femaleAvgWeight = +this.average(femaleWeights, femalelength).toFixed(0);
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
SelectedpigGridComponent.decorators = [
    { type: Component, args: [{
                selector: "app-selectedpig-grid",
                template: "<ejs-grid\r\n          #grid\r\n          id=\"grid-detail\"\r\n          [dataSource]=\"selectedPigDataSource\"\r\n          [enableInfiniteScrolling]=\"true\"\r\n          [allowPaging]=\"false\"\r\n          [pageSettings]=\"pageSettings\"\r\n          [editSettings]=\"editSettingsPig\"\r\n          [searchSettings]=\"searchOptions\"\r\n          (actionBegin)=\"actionBeginPig($event)\"\r\n          (created)=\"created()\"\r\n          [toolbar]=\"['Search']\"\r\n          [height]=\"300 + 'px'\"\r\n          gridLines=\"Both\"\r\n        >\r\n          <e-columns>\r\n            <e-column\r\n              field=\"name\"\r\n              [allowSorting]=\"false\"\r\n              [visible]=\"visiblePig\"\r\n\r\n              [allowSearching]=\"false\"\r\n              [allowGrouping]=\"false\"\r\n              [allowFiltering]=\"false\"\r\n              [allowEditing]=\"false\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ pigName | translate }}\"\r\n            >\r\n            </e-column>\r\n            \r\n\r\n            <e-column\r\n            field=\"pigSexName\"\r\n            [visible]=\"visiblePigSex\"\r\n            [allowEditing]=\"false\"\r\n            textAlign=\"Left\"\r\n            headerTextAlign=\"Center\"\r\n            headerText=\"{{ 'PigSex' | translate }}\"\r\n          >\r\n          </e-column>\r\n\r\n          <e-column\r\n          field=\"rfid\"\r\n          [visible]=\"visibleRfid\"\r\n          textAlign=\"Left\"\r\n          [validationRules]=\" {maxLength: 40 }\"\r\n          headerTextAlign=\"Center\"\r\n          headerText=\"{{ 'RFID' | translate }}\"\r\n        >\r\n        </e-column>\r\n            <e-column\r\n              field=\"recordValue\"\r\n              [visible]=\"visibleValue\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n            >\r\n            <ng-template #headerTemplate let-data>\r\n              <span class=\"e-headertext\" >{{valueLabel}}</span>\r\n          </ng-template>\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordAmount\"\r\n              [visible]=\"visibleAmount\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              editType=\"numericEdit\"\r\n              headerText=\"{{ 'Amount' | translate }}\"\r\n            >\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordWeight\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              [visible]=\"visibleWeight\"\r\n              editType=\"numericEdit\"\r\n              headerText=\"{{ 'Weight' | translate }}\"\r\n            >\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordDiseaseName\"\r\n              [visible]=\"visibleDisease\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ 'Disease' | translate }}\"\r\n            >\r\n            <ng-template #editTemplate let-data>\r\n              <app-disease-dropdownlist [(selectedValue)]=\"data.recordDisease\" (change)=\"onChangeDisease($event,data)\">\r\n              </app-disease-dropdownlist>\r\n            </ng-template>\r\n            <ng-template #template let-data>\r\n              {{ data.recordDiseaseName }}\r\n            </ng-template>\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordNext\"\r\n              [visible]=\"visibleNext\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ next1Label | translate }}\"\r\n            >\r\n            <ng-template #editTemplate let-data>\r\n              <app-code-type-dropdownlist\r\n              id=\"recordNext\"\r\n              [codeType]=\"codeType\"\r\n              (change)=\"onChangeRecordNext($event, data)\"\r\n              [(selectedValue)]=\"data.recordNext\"\r\n            >\r\n            </app-code-type-dropdownlist>\r\n            </ng-template>\r\n            <ng-template #template let-data>\r\n              {{ data.recordNextName | translate }}\r\n            </ng-template>\r\n            </e-column>\r\n\r\n            <e-column\r\n              field=\"recordNext2\"\r\n              [visible]=\"visibleNext2\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ next2Label | translate }}\"\r\n            >\r\n            <ng-template #editTemplate let-data>\r\n              <app-code-type-dropdownlist\r\n              id=\"recordNext2\"\r\n              [codeType]=\"codeType2\"\r\n              (change)=\"onChangeRecordNext2($event, data)\"\r\n              [(selectedValue)]=\"data.recordNext2\"\r\n            >\r\n            </app-code-type-dropdownlist>\r\n            </ng-template>\r\n            <ng-template #template let-data>\r\n              {{ data.recordNext2Name | translate }}\r\n            </ng-template>\r\n            </e-column>\r\n\r\n            <e-column\r\n            field=\"nextRoom\"\r\n            [visible]=\"visibleNextRoom\"\r\n            textAlign=\"Left\"\r\n            headerTextAlign=\"Center\"\r\n            headerText=\"{{ 'NextRoom' | translate }}\"\r\n          >\r\n          <ng-template #editTemplate let-data>\r\n            <app-room-dropdownlist\r\n            id=\"nextRoom\"\r\n            (change)=\"onChangeNextRoom($event, data)\"\r\n            [(selectedValue)]=\"data.nextRoom\"\r\n          >\r\n          </app-room-dropdownlist>\r\n          </ng-template>\r\n          <ng-template #template let-data>\r\n            {{ data.nextRoomName | translate }}\r\n          </ng-template>\r\n          </e-column>\r\n\r\n          \r\n          <e-column\r\n          field=\"nextPen\"\r\n          [visible]=\"visibleNextPen\"\r\n          textAlign=\"Left\"\r\n          headerTextAlign=\"Center\"\r\n          headerText=\"{{ 'NextPen' | translate }}\"\r\n        >\r\n        <ng-template #editTemplate let-data>\r\n          <app-pen-dropdownlist\r\n          id=\"nextPen\"\r\n          (change)=\"onChangeNextPen($event, data)\"\r\n          [(selectedValue)]=\"data.nextPen\"\r\n        >\r\n        </app-pen-dropdownlist>\r\n        </ng-template>\r\n        <ng-template #template let-data>\r\n          {{ data.nextPenName | translate }}\r\n        </ng-template>\r\n        </e-column>\r\n\r\n\r\n        <e-column\r\n        field=\"sourceGuid\"\r\n        textAlign=\"Left\"\r\n        headerTextAlign=\"Center\"\r\n        [validationRules]=' { maxLength: 40 }'\r\n        [visible]=\"visibleSourceGuid\"\r\n        headerText=\"{{ 'SourceGuid' | translate }}\"\r\n      >\r\n      </e-column>\r\n      <e-column\r\n      field=\"source1Guid\"\r\n      [validationRules]=' { maxLength: 40 }'\r\n      textAlign=\"Left\"\r\n      headerTextAlign=\"Center\"\r\n      [visible]=\"visibleSource1Guid\"\r\n      headerText=\"{{ 'Source1Guid' | translate }}\"\r\n    >\r\n    </e-column>\r\n\r\n\r\n      <e-column\r\n      field=\"source2Guid\"\r\n      [validationRules]=' { maxLength: 40 }'\r\n      textAlign=\"Left\"\r\n      headerTextAlign=\"Center\"\r\n      [visible]=\"visibleSource2Guid\"\r\n      headerText=\"{{ 'Source2Guid' | translate }}\"\r\n    >\r\n    </e-column>\r\n\r\n\r\n      <e-column\r\n      field=\"source3Guid\"\r\n      [validationRules]=' { maxLength: 40 }'\r\n      textAlign=\"Left\"\r\n      headerTextAlign=\"Center\"\r\n      [visible]=\"visibleSource3Guid\"\r\n      headerText=\"{{ 'Source3Guid' | translate }}\"\r\n    >\r\n    </e-column>\r\n\r\n    <e-column\r\n    field=\"semenConcentration \"\r\n    textAlign=\"Left\"\r\n    headerTextAlign=\"Center\"\r\n    [visible]=\"visibleSemenConcentration\"\r\n    editType=\"numericEdit\"\r\n    headerText=\"{{ 'SemenConcentration ' | translate }}\"\r\n  >\r\n  </e-column>\r\n\r\n\r\n    <e-column\r\n    field=\"semenVolume\"\r\n    textAlign=\"Left\"\r\n    headerTextAlign=\"Center\"\r\n    [visible]=\"visibleSemenVolume\"\r\n    editType=\"numericEdit\"\r\n    headerText=\"{{ 'Source2Guid' | translate }}\"\r\n  >\r\n  </e-column>\r\n\r\n\r\n    <e-column\r\n    field=\"malformationRate\"\r\n    textAlign=\"Left\"\r\n    headerTextAlign=\"Center\"\r\n    [visible]=\"visibleMalformationRate\"\r\n    editType=\"numericEdit\"\r\n    [edit]=\"{ params: { decimals: 2, min: 0, max: 0.9 } }\"\r\n    headerText=\"{{ 'MalformationRate' | translate }}\"\r\n  >\r\n  </e-column>\r\n\r\n\r\n          </e-columns>\r\n        </ejs-grid>\r\n",
                providers: [EditService],
                styles: [""]
            },] }
];
SelectedpigGridComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: ChangeDetectorRef },
    { type: PigfarmCoreService }
];
SelectedpigGridComponent.propDecorators = {
    pigName: [{ type: Input }],
    selectedPigDataSource: [{ type: Input }],
    recordNextDataSource: [{ type: Input }],
    recordNext2DataSource: [{ type: Input }],
    grid: [{ type: ViewChild, args: ["grid",] }],
    avgWeightChange: [{ type: Output }],
    totalWeightChange: [{ type: Output }],
    avgAmountChange: [{ type: Output }],
    totalAmountChange: [{ type: Output }],
    selectedPigDataSourceChange: [{ type: Output }],
    maleAvgWeightChange: [{ type: Output }],
    maleTotalWeightChange: [{ type: Output }],
    maleTotalSelectedChange: [{ type: Output }],
    femaleAvgWeightChange: [{ type: Output }],
    femaleTotalWeightChange: [{ type: Output }],
    femaleTotalSelectedChange: [{ type: Output }],
    visibleNextRoom: [{ type: Input }],
    visibleNextPen: [{ type: Input }],
    visibleNext2: [{ type: Input }],
    visibleButton: [{ type: Input }],
    visibleNext: [{ type: Input }],
    visibleAmount: [{ type: Input }],
    visibleDisease: [{ type: Input }],
    visibleWeight: [{ type: Input }],
    visibleValue: [{ type: Input }],
    visiblePigSex: [{ type: Input }],
    visibleSourceGuid: [{ type: Input }],
    visibleSource1Guid: [{ type: Input }],
    visibleSource2Guid: [{ type: Input }],
    visibleSource3Guid: [{ type: Input }],
    visibleSemenConcentration: [{ type: Input }],
    visibleSemenVolume: [{ type: Input }],
    visibleMalformationRate: [{ type: Input }],
    visiblePig: [{ type: Input }],
    visibleRfid: [{ type: Input }],
    valueLabel: [{ type: Input }],
    pigLabel: [{ type: Input }],
    next1Label: [{ type: Input }],
    next2Label: [{ type: Input }],
    avgWeight: [{ type: Input }],
    totalWeight: [{ type: Input }],
    totalAmount: [{ type: Input }],
    avgAmount: [{ type: Input }],
    codeType: [{ type: Input }],
    codeType2: [{ type: Input }],
    maleAvgWeight: [{ type: Input }],
    maleTotalWeight: [{ type: Input }],
    maleTotalSelected: [{ type: Input }],
    femaleAvgWeight: [{ type: Input }],
    femaleTotalWeight: [{ type: Input }],
    femaleTotalSelected: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0ZWRwaWctZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL3NlbGVjdGVkcGlnLWdyaWQvc2VsZWN0ZWRwaWctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBR1QsaUJBQWlCLEVBRWpCLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFpQixNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRdkQsTUFBTSxPQUFPLHdCQUF3QjtJQW1GbkMsWUFBbUMsT0FBTyxFQUNoQyxLQUF1QixFQUN2QixFQUFxQixFQUNyQixPQUEyQjtRQUhGLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFuRjVCLFlBQU8sR0FBUSxNQUFNLENBQUM7UUFDdEIsMEJBQXFCLEdBQVEsRUFBRSxDQUFDO1FBQ2hDLHlCQUFvQixHQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRSwwQkFBcUIsR0FBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUUsa0JBQWEsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEs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QkFDTCxLQUFLOzhCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs4QkFFTCxLQUFLO2dDQUNMLEtBQUs7a0NBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT25EZXN0cm95LFxyXG4gIEluamVjdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcclxuaW1wb3J0IHsgRWRpdFNlcnZpY2UsIEdyaWRDb21wb25lbnQgfSBmcm9tIFwiQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZ3JpZHNcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgUGlnZmFybUNvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXNlbGVjdGVkcGlnLWdyaWRcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL3NlbGVjdGVkcGlnLWdyaWQuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4vc2VsZWN0ZWRwaWctZ3JpZC5jb21wb25lbnQuc2Nzc1wiXSxcclxuICBwcm92aWRlcnM6IFtFZGl0U2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdGVkcGlnR3JpZENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3lcclxue1xyXG4gIEBJbnB1dCgpIHBpZ05hbWU6IGFueSA9ICdHaWx0JztcclxuICBASW5wdXQoKSBzZWxlY3RlZFBpZ0RhdGFTb3VyY2U6IGFueSA9IFtdO1xyXG4gIEBJbnB1dCgpIHJlY29yZE5leHREYXRhU291cmNlOiBhbnkgPSBbXCJDdWxsaW5nU2FsZVwiLCBcIkNoZW1pY2FsXCIsIFwiQnVyaWVkXCJdO1xyXG4gIEBJbnB1dCgpIHJlY29yZE5leHQyRGF0YVNvdXJjZTogYW55ID0gW1wiQ3VsbGluZ1NhbGVcIiwgXCJDaGVtaWNhbFwiLCBcIkJ1cmllZFwiXTtcclxuICBzZWFyY2hPcHRpb25zID0geyBmaWVsZHM6IFtcIm5hbWVcIl0sIG9wZXJhdG9yOiBcImNvbnRhaW5zXCIsIGlnbm9yZUNhc2U6IHRydWUgfTtcclxuICBAVmlld0NoaWxkKFwiZ3JpZFwiKSBwdWJsaWMgZ3JpZDogR3JpZENvbXBvbmVudDtcclxuICBAT3V0cHV0KCkgYXZnV2VpZ2h0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSB0b3RhbFdlaWdodENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYXZnQW1vdW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSB0b3RhbEFtb3VudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRQaWdEYXRhU291cmNlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KCkgbWFsZUF2Z1dlaWdodENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbWFsZVRvdGFsV2VpZ2h0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBtYWxlVG90YWxTZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQE91dHB1dCgpIGZlbWFsZUF2Z1dlaWdodENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZmVtYWxlVG90YWxXZWlnaHRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGZlbWFsZVRvdGFsU2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHBhZ2VTZXR0aW5nczogYW55O1xyXG4gIEBJbnB1dCgpIHZpc2libGVOZXh0Um9vbSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVOZXh0UGVuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdmlzaWJsZU5leHQyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdmlzaWJsZUJ1dHRvbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVOZXh0ID0gdHJ1ZTtcclxuICBASW5wdXQoKSB2aXNpYmxlQW1vdW50ID0gdHJ1ZTtcclxuICBASW5wdXQoKSB2aXNpYmxlRGlzZWFzZSA9IHRydWU7XHJcbiAgQElucHV0KCkgdmlzaWJsZVdlaWdodCA9IHRydWU7XHJcbiAgQElucHV0KCkgdmlzaWJsZVZhbHVlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgdmlzaWJsZVBpZ1NleCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB2aXNpYmxlU291cmNlR3VpZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVTb3VyY2UxR3VpZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVTb3VyY2UyR3VpZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVTb3VyY2UzR3VpZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVTZW1lbkNvbmNlbnRyYXRpb24gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2aXNpYmxlU2VtZW5Wb2x1bWUgPSBmYWxzZTtcclxuICBASW5wdXQoKSB2aXNpYmxlTWFsZm9ybWF0aW9uUmF0ZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHZpc2libGVQaWcgPSB0cnVlO1xyXG4gIEBJbnB1dCgpICB2aXNpYmxlUmZpZDogYW55ID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHZhbHVlTGFiZWwgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIHBpZ0xhYmVsID0gXCJQaWdcIjtcclxuICBASW5wdXQoKSBuZXh0MUxhYmVsID0gXCJOZXh0MVwiO1xyXG4gIEBJbnB1dCgpIG5leHQyTGFiZWwgPSBcIk5leHQyXCI7XHJcbiAgZWRpdFNldHRpbmdzUGlnID0ge1xyXG4gICAgc2hvd0RlbGV0ZUNvbmZpcm1EaWFsb2c6IGZhbHNlLFxyXG4gICAgYWxsb3dFZGl0aW5nOiB0cnVlLFxyXG4gICAgYWxsb3dBZGRpbmc6IHRydWUsXHJcbiAgICBhbGxvd0RlbGV0aW5nOiB0cnVlLFxyXG4gICAgbW9kZTogXCJOb3JtYWxcIixcclxuICB9O1xyXG4gIEBJbnB1dCgpIGF2Z1dlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHRvdGFsV2VpZ2h0OiBudW1iZXI7XHJcbiAgQElucHV0KCkgdG90YWxBbW91bnQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBhdmdBbW91bnQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBjb2RlVHlwZTogYW55O1xyXG4gIEBJbnB1dCgpIGNvZGVUeXBlMjogYW55O1xyXG4gIEBJbnB1dCgpIG1hbGVBdmdXZWlnaHQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBtYWxlVG90YWxXZWlnaHQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBtYWxlVG90YWxTZWxlY3RlZDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBmZW1hbGVBdmdXZWlnaHQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBmZW1hbGVUb3RhbFdlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZlbWFsZVRvdGFsU2VsZWN0ZWQ6IG51bWJlcjtcclxuXHJcbiAgaW5kZXg6IGFueTtcclxuICBkaXNlYXNlSXRlbTogYW55O1xyXG4gIHJlY29yZE5leHQ6IGFueTtcclxuICByZWNvcmROZXh0bmRleDogYW55O1xyXG4gIHJlY29yZE5leHQyOiBhbnk7XHJcbiAgcmVjb3JkTmV4dG5kZXgyOiBhbnk7XHJcbiAgcmVjb3JkTmV4dDJJdGVtOiBhbnk7XHJcbiAgcmVjb3JkTmV4dEl0ZW06IGFueTtcclxuICBwaWdTZXhJdGVtOiBhbnk7XHJcbiAgcGlnU2V4SW5kZXg6IGFueTtcclxuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuICBuZXh0Um9vbUl0ZW06IGFueTtcclxuICBuZXh0UGVuSXRlbTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLFxyXG4gICAgcHJpdmF0ZSB0cmFuczogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBQaWdmYXJtQ29yZVNlcnZpY2VcclxuICApIHtcclxuICAgIGxldCB1c2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJcIikpO1xyXG4gICAgbGV0IHBhZ2VTaXplID0gTnVtYmVyKHVzZXI/LnBhZ2VTaXplU2V0dGluZ1ZhbHVlKSB8fCAxMDtcclxuICAgIGxldCBwYWdlU2l6ZXNUZW1wID0gdXNlcj8ucGFnZVNpemVTZXR0aW5nTGlzdCB8fCBbXCI1XCIsIFwiMTBcIiwgXCIxMlwiLCBcIjIwXCJdO1xyXG4gICAgbGV0IHBhZ2VTaXplcyA9IHBhZ2VTaXplc1RlbXAubWFwKCh4KSA9PiAreCk7XHJcbiAgICB0aGlzLnBhZ2VTZXR0aW5ncyA9IHtcclxuICAgICAgcGFnZVNpemVzOiBwYWdlU2l6ZXMsXHJcbiAgICAgIGVuYWJsZVF1ZXJ5U3RyaW5nOiB0cnVlLFxyXG4gICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXHJcbiAgICAgIGN1cnJlbnRQYWdlOiAxLFxyXG4gICAgICBlbmFibGVTY3JvbGw6IHRydWUsXHJcbiAgICB9O1xyXG4gIH1cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBsZXQgYnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG5cIik7XHJcbiAgICBmb3IgKGxldCBidXR0b24gb2YgQXJyYXkuZnJvbShidXR0b25zKSkge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICB0aGlzLmdyaWQ/LmVuZEVkaXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbXCJzZWxlY3RlZFBpZ0RhdGFTb3VyY2VcIl0pIHtcclxuICAgICAgdGhpcy5jYWN1bGF0b3IoKTtcclxuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiBcclxuICB9XHJcbiAgY3JlYXRlZCgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgdGhpcy5zZXJ2aWNlLmN1cnJlbnRSZWNvcmRMYWJlbC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlTGFiZWwgPSBkYXRhO1xyXG4gICAgICAgICAgdGhpcy5ncmlkLnJlZnJlc2hIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRvdGFsQW1vdW50ID0gMDtcclxuICAgIHRoaXMudG90YWxXZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5hdmdXZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5mZW1hbGVUb3RhbFdlaWdodCA9IDA7XHJcbiAgICB0aGlzLm1hbGVUb3RhbFdlaWdodCA9IDA7XHJcbiAgICB0aGlzLm1hbGVBdmdXZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5tYWxlQXZnV2VpZ2h0ID0gMDtcclxuICAgIFxyXG5cclxuICB9XHJcbiAgYWN0aW9uQmVnaW5QaWcoZSkge1xyXG4gICAgaWYgKGUuYWN0aW9uID09PSBcImVkaXRcIiAmJiBlLnJlcXVlc3RUeXBlID09PSBcInNhdmVcIikge1xyXG4gICAgICBpZiAodGhpcy5kaXNlYXNlSXRlbSkge1xyXG4gICAgICAgIGUuZGF0YS5yZWNvcmREaXNlYXNlID0gdGhpcy5kaXNlYXNlSXRlbT8uZ3VpZDtcclxuICAgICAgICBlLmRhdGEucmVjb3JkRGlzZWFzZU5hbWUgPSB0aGlzLmRpc2Vhc2VJdGVtPy5uYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnJlY29yZE5leHRJdGVtKSB7XHJcbiAgICAgICAgZS5kYXRhLnJlY29yZE5leHQgPSB0aGlzLnJlY29yZE5leHRJdGVtPy5ndWlkO1xyXG4gICAgICAgIGUuZGF0YS5yZWNvcmROZXh0TmFtZSA9IHRoaXMucmVjb3JkTmV4dEl0ZW0/Lm5hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucmVjb3JkTmV4dDJJdGVtKSB7XHJcbiAgICAgICAgZS5kYXRhLnJlY29yZE5leHQyID0gdGhpcy5yZWNvcmROZXh0Mkl0ZW0/Lmd1aWQ7XHJcbiAgICAgICAgZS5kYXRhLnJlY29yZE5leHQyTmFtZSA9IHRoaXMucmVjb3JkTmV4dDJJdGVtPy5uYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm5leHRSb29tSXRlbSkge1xyXG4gICAgICAgIGUuZGF0YS5uZXh0Um9vbSA9IHRoaXMubmV4dFJvb21JdGVtPy5ndWlkO1xyXG4gICAgICAgIGUuZGF0YS5uZXh0Um9vbU5hbWUgPSB0aGlzLm5leHRSb29tSXRlbT8ubmFtZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpbmRleCA9IGUucm93SW5kZXg7XHJcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ucmZpZCA9IGUuZGF0YS5yZmlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5yZWNvcmRWYWx1ZSA9IGUuZGF0YS5yZWNvcmRWYWx1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ucmVjb3JkQW1vdW50ID0gZS5kYXRhLnJlY29yZEFtb3VudDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ucmVjb3JkV2VpZ2h0ID0gZS5kYXRhLnJlY29yZFdlaWdodDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0uc291cmNlR3VpZCA9IGUuZGF0YS5zb3VyY2VHdWlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5zb3VyY2UxR3VpZCA9IGUuZGF0YS5zb3VyY2UxR3VpZDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0uc291cmNlMkd1aWQgPSBlLmRhdGEuc291cmNlMkd1aWQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VbaW5kZXhdLnNvdXJjZTNHdWlkID0gZS5kYXRhLnNvdXJjZTNHdWlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5zZW1lbkNvbmNlbnRyYXRpb24gPSBlLmRhdGEuc2VtZW5Db25jZW50cmF0aW9uO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5zZW1lblZvbHVtZSA9IGUuZGF0YS5zZW1lblZvbHVtZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ubWFsZm9ybWF0aW9uUmF0ZSA9IGUuZGF0YS5tYWxmb3JtYXRpb25SYXRlO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ucmVjb3JkTmV4dCA9XHJcbiAgICAgICAgICB0aGlzLnJlY29yZE5leHRJdGVtPy5ndWlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5yZWNvcmROZXh0MiA9XHJcbiAgICAgICAgICB0aGlzLnJlY29yZE5leHQySXRlbT8uZ3VpZDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ucmVjb3JkTmV4dE5hbWUgPVxyXG4gICAgICAgICAgdGhpcy5yZWNvcmROZXh0SXRlbT8ubmFtZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ucmVjb3JkTmV4dDJOYW1lID1cclxuICAgICAgICAgIHRoaXMucmVjb3JkTmV4dDJJdGVtPy5uYW1lO1xyXG5cclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5uZXh0Um9vbU5hbWUgPSB0aGlzLm5leHRSb29tSXRlbT8ubmFtZTtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5uZXh0UGVuTmFtZSA9IHRoaXMubmV4dFBlbkl0ZW0/Lm5hbWU7XHJcbiAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgXHJcbiAgICAgICAgdGhpcy5jYWN1bGF0b3IoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VSZWNvcmROZXh0KGUsIGRhdGEpIHtcclxuICAgIGlmIChlLmlzSW50ZXJhY3RlZCkge1xyXG4gICAgICBkYXRhLnJlY29yZE5leHQgPSBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICBkYXRhLnJlY29yZE5leHROYW1lID0gZS5pdGVtRGF0YT8ubmFtZTtcclxuICAgICAgdGhpcy5yZWNvcmROZXh0SXRlbSA9IGUuaXRlbURhdGE7XHJcblxyXG4gICAgICB0aGlzLnJlY29yZE5leHRuZGV4ID0gdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2UuZmluZEluZGV4KFxyXG4gICAgICAgIChvYmopID0+IG9iai5waWdHdWlkID09PSBkYXRhLnBpZ0d1aWRcclxuICAgICAgKTtcclxuICAgICAgaWYgKHRoaXMucmVjb3JkTmV4dG5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VbdGhpcy5yZWNvcmROZXh0bmRleF0ucmVjb3JkTmV4dCA9XHJcbiAgICAgICAgICBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW3RoaXMucmVjb3JkTmV4dG5kZXhdLnJlY29yZE5leHROYW1lID1cclxuICAgICAgICAgIGUuaXRlbURhdGE/Lm5hbWU7XHJcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgb25DaGFuZ2VSZWNvcmROZXh0MihlLCBkYXRhKSB7XHJcbiAgICBpZiAoZS5pc0ludGVyYWN0ZWQpIHtcclxuICAgICAgZGF0YS5yZWNvcmROZXh0MiA9IGUuaXRlbURhdGE/Lmd1aWQ7XHJcbiAgICAgIGRhdGEucmVjb3JkTmV4dDJOYW1lID0gZS5pdGVtRGF0YT8ubmFtZTtcclxuICAgICAgdGhpcy5yZWNvcmROZXh0Mkl0ZW0gPSBlLml0ZW1EYXRhO1xyXG5cclxuICAgICAgdGhpcy5yZWNvcmROZXh0bmRleDIgPSB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZS5maW5kSW5kZXgoXHJcbiAgICAgICAgKG9iaikgPT4gb2JqLnBpZ0d1aWQgPT09IGRhdGEucGlnR3VpZFxyXG4gICAgICApO1xyXG4gICAgICBpZiAodGhpcy5yZWNvcmROZXh0bmRleDIgIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VbdGhpcy5yZWNvcmROZXh0bmRleDJdLnJlY29yZE5leHQyID1cclxuICAgICAgICAgIGUuaXRlbURhdGE/Lmd1aWQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VbdGhpcy5yZWNvcmROZXh0bmRleDJdLnJlY29yZE5leHQyTmFtZSA9XHJcbiAgICAgICAgICBlLml0ZW1EYXRhPy5uYW1lO1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZVBpZ1NleChlLCBkYXRhKSB7XHJcbiAgICBpZiAoZS5pc0ludGVyYWN0ZWQpIHtcclxuICAgICAgZGF0YS5waWdTZXggPSBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICBkYXRhLnBpZ1NleE5hbWUgPSBlLml0ZW1EYXRhPy5uYW1lO1xyXG4gICAgICB0aGlzLnBpZ1NleEl0ZW0gPSBlLml0ZW1EYXRhO1xyXG5cclxuICAgICAgdGhpcy5waWdTZXhJbmRleCA9IHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlLmZpbmRJbmRleChcclxuICAgICAgICAob2JqKSA9PiBvYmoucGlnR3VpZCA9PT0gZGF0YS5waWdHdWlkXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnBpZ1NleEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW3RoaXMucGlnU2V4SW5kZXhdLnBpZ1NleCA9IGUuaXRlbURhdGE/Lmd1aWQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VbdGhpcy5waWdTZXhJbmRleF0ucGlnU2V4TmFtZSA9XHJcbiAgICAgICAgICBlLml0ZW1EYXRhPy5uYW1lO1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZURpc2Vhc2UoZSwgZGF0YSkge1xyXG4gICAgaWYgKGUuaXNJbnRlcmFjdGVkKSB7XHJcbiAgICAgIGRhdGEucmVjb3JkRGlzZWFzZSA9IGUuaXRlbURhdGE/Lmd1aWQ7XHJcbiAgICAgIGRhdGEucmVjb3JkRGlzZWFzZU5hbWUgPSBlLml0ZW1EYXRhPy5uYW1lO1xyXG4gICAgICB0aGlzLmRpc2Vhc2VJdGVtID0gZS5pdGVtRGF0YTtcclxuICAgICAgdGhpcy5pbmRleCA9IHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlLmZpbmRJbmRleChcclxuICAgICAgICAob2JqKSA9PiBvYmoucGlnR3VpZCA9PT0gZGF0YS5waWdHdWlkXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLmluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW3RoaXMuaW5kZXhdLnJlY29yZERpc2Vhc2UgPSBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW3RoaXMuaW5kZXhdLnJlY29yZERpc2Vhc2VOYW1lID1cclxuICAgICAgICAgIGUuaXRlbURhdGE/Lm5hbWU7XHJcbiAgICAgICAgLy8gdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZSk7XHJcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uQ2hhbmdlTmV4dFJvb20oZSwgZGF0YSkge1xyXG4gICAgaWYgKGUuaXNJbnRlcmFjdGVkKSB7XHJcbiAgICAgIGRhdGEubmV4dFJvb20gPSBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICBkYXRhLm5leHRSb29tTmFtZSA9IGUuaXRlbURhdGE/Lm5hbWU7XHJcbiAgICAgIHRoaXMubmV4dFJvb21JdGVtID0gZS5pdGVtRGF0YTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZS5maW5kSW5kZXgoXHJcbiAgICAgICAgKG9iaikgPT4gb2JqLm5leHRSb29tID09PSBkYXRhLm5leHRSb29tXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ubmV4dFJvb20gPSBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5uZXh0Um9vbU5hbWUgPVxyXG4gICAgICAgICAgZS5pdGVtRGF0YT8ubmFtZTtcclxuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlKTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgb25DaGFuZ2VOZXh0UGVuKGUsIGRhdGEpIHtcclxuICAgIGlmIChlLmlzSW50ZXJhY3RlZCkge1xyXG4gICAgICBkYXRhLm5leHRQZW4gPSBlLml0ZW1EYXRhPy5ndWlkO1xyXG4gICAgICBkYXRhLm5leHRQZW5OYW1lID0gZS5pdGVtRGF0YT8ubmFtZTtcclxuICAgICAgdGhpcy5uZXh0UGVuSXRlbSA9IGUuaXRlbURhdGE7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2UuZmluZEluZGV4KFxyXG4gICAgICAgIChvYmopID0+IG9iai5uZXh0UGVuID09PSBkYXRhLm5leHRQZW5cclxuICAgICAgKTtcclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlW2luZGV4XS5uZXh0UGVuID0gZS5pdGVtRGF0YT8uZ3VpZDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZVtpbmRleF0ubmV4dFBlbk5hbWUgPVxyXG4gICAgICAgICAgZS5pdGVtRGF0YT8ubmFtZTtcclxuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlKTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYXZlcmFnZSA9IChudW1zLCBsZW5ndGgpID0+IHtcclxuICAgIGlmICgobnVtcyBhcyBbXSkubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbnVtcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSAvIGxlbmd0aDtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH07XHJcbiAgdG90YWwgPSAobnVtcykgPT4ge1xyXG4gICAgaWYgKChudW1zIGFzIFtdKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBudW1zLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfTtcclxuICBjYWN1bGF0b3IoKSB7XHJcbiAgICBjb25zdCB3ZWlnaHRzID0gdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VcclxuICAgICAgLmZpbHRlcigoeCkgPT4geC5yZWNvcmRXZWlnaHQgPiAwKVxyXG4gICAgICAubWFwKCh4KSA9PiB4LnJlY29yZFdlaWdodCk7XHJcbiAgICBjb25zdCBhbW91bnRzID0gdGhpcy5zZWxlY3RlZFBpZ0RhdGFTb3VyY2VcclxuICAgICAgLmZpbHRlcigoeCkgPT4geC5yZWNvcmRBbW91bnQgPiAwKVxyXG4gICAgICAubWFwKCh4KSA9PiB4LnJlY29yZEFtb3VudCk7XHJcblxyXG4gICAgbGV0IGxlbmd0aCA9IHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlLmxlbmd0aDtcclxuICAgIHRoaXMuYXZnV2VpZ2h0ID0gK3RoaXMuYXZlcmFnZSh3ZWlnaHRzLCBsZW5ndGgpLnRvRml4ZWQoMCk7XHJcbiAgICB0aGlzLmF2Z0Ftb3VudCA9ICt0aGlzLmF2ZXJhZ2UoYW1vdW50cywgbGVuZ3RoKS50b0ZpeGVkKDApO1xyXG4gICAgdGhpcy50b3RhbFdlaWdodCA9ICt0aGlzLnRvdGFsKHdlaWdodHMpLnRvRml4ZWQoMCk7XHJcbiAgICB0aGlzLnRvdGFsQW1vdW50ID0gK3RoaXMudG90YWwoYW1vdW50cykudG9GaXhlZCgwKTtcclxuXHJcbiAgICBjb25zdCBtYWxlV2VpZ2h0cyA9IHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlXHJcbiAgICAgIC5maWx0ZXIoKHgpID0+IHgucGlnU2V4ID09IFwiMVwiKVxyXG4gICAgICAubWFwKCh4KSA9PiB4LnJlY29yZFdlaWdodCk7XHJcblxyXG4gICAgY29uc3QgZmVtYWxlV2VpZ2h0cyA9IHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlXHJcbiAgICAgIC5maWx0ZXIoKHgpID0+IHgucGlnU2V4ICE9PSBcIjFcIilcclxuICAgICAgLm1hcCgoeCkgPT4geC5yZWNvcmRXZWlnaHQpO1xyXG5cclxuICAgIGxldCBmZW1hbGVsZW5ndGggPSBmZW1hbGVXZWlnaHRzLmxlbmd0aDtcclxuICAgIHRoaXMuZmVtYWxlQXZnV2VpZ2h0ID0gK3RoaXMuYXZlcmFnZShmZW1hbGVXZWlnaHRzLCBmZW1hbGVsZW5ndGgpLnRvRml4ZWQoXHJcbiAgICAgIDBcclxuICAgICk7XHJcbiAgICB0aGlzLmZlbWFsZVRvdGFsV2VpZ2h0ID0gK3RoaXMudG90YWwoZmVtYWxlV2VpZ2h0cykudG9GaXhlZCgwKTtcclxuICAgIHRoaXMuZmVtYWxlVG90YWxTZWxlY3RlZCA9IGZlbWFsZWxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZlbWFsZUF2Z1dlaWdodENoYW5nZS5lbWl0KHRoaXMuZmVtYWxlQXZnV2VpZ2h0KTtcclxuICAgIHRoaXMuZmVtYWxlVG90YWxXZWlnaHRDaGFuZ2UuZW1pdCh0aGlzLmZlbWFsZVRvdGFsV2VpZ2h0KTtcclxuICAgIHRoaXMuZmVtYWxlVG90YWxTZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuZmVtYWxlVG90YWxTZWxlY3RlZCk7XHJcblxyXG4gICAgbGV0IG1hbGVsZW5ndGggPSBtYWxlV2VpZ2h0cy5sZW5ndGg7XHJcbiAgICB0aGlzLm1hbGVBdmdXZWlnaHQgPSArdGhpcy5hdmVyYWdlKG1hbGVXZWlnaHRzLCBtYWxlbGVuZ3RoKS50b0ZpeGVkKDApO1xyXG4gICAgdGhpcy5tYWxlVG90YWxXZWlnaHQgPSArdGhpcy50b3RhbChtYWxlV2VpZ2h0cykudG9GaXhlZCgwKTtcclxuICAgIHRoaXMubWFsZVRvdGFsU2VsZWN0ZWQgPSBtYWxlbGVuZ3RoO1xyXG5cclxuICAgIHRoaXMubWFsZUF2Z1dlaWdodENoYW5nZS5lbWl0KHRoaXMubWFsZUF2Z1dlaWdodCk7XHJcbiAgICB0aGlzLm1hbGVUb3RhbFdlaWdodENoYW5nZS5lbWl0KHRoaXMubWFsZVRvdGFsV2VpZ2h0KTtcclxuICAgIHRoaXMubWFsZVRvdGFsU2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLm1hbGVUb3RhbFNlbGVjdGVkKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkUGlnRGF0YVNvdXJjZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRQaWdEYXRhU291cmNlKTtcclxuICAgIHRoaXMuYXZnQW1vdW50Q2hhbmdlLmVtaXQodGhpcy5hdmdBbW91bnQpO1xyXG4gICAgdGhpcy5hdmdXZWlnaHRDaGFuZ2UuZW1pdCh0aGlzLmF2Z1dlaWdodCk7XHJcbiAgICB0aGlzLnRvdGFsQW1vdW50Q2hhbmdlLmVtaXQodGhpcy50b3RhbEFtb3VudCk7XHJcbiAgICB0aGlzLnRvdGFsV2VpZ2h0Q2hhbmdlLmVtaXQodGhpcy50b3RhbFdlaWdodCk7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgfVxyXG59XHJcbiJdfQ==