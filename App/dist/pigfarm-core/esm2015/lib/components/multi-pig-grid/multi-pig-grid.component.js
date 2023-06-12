import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageConstants } from '../../../_core/_constants';
import { DataManager, UrlAdaptor, } from "@syncfusion/ej2-data";
import { AlertifyService } from '../../../services/alertify.service';
import { PigfarmCoreService } from '../../../services/pigfarm-core.service';
export class MultiPigGridComponent {
    constructor(baseUrl, service, alertify, translate) {
        this.baseUrl = baseUrl;
        this.service = service;
        this.alertify = alertify;
        this.translate = translate;
        this.height = 300;
        this.type = '';
        this.recordGuid = '';
        this.penGuid = '';
        this.checked = '';
        this.onCheckedChange = new EventEmitter();
        this.pageSettings = {
            pageCount: 10,
            pageSizes: 20,
            enableQueryString: true,
            pageSize: 10,
            currentPage: 1,
            enableScroll: true,
        };
        this.searchOptions = { fields: ['name'], operator: 'contains', ignoreCase: true };
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
    ngOnChanges(changes) {
        // if (changes.pigData.currentValue != changes.pigData.previousValue) {
        //   this.pigData = changes.pigData.currentValue;
        // }
    }
    ngOnInit() {
    }
    onChangeChecked(e, data) {
        let checked = e.checked;
        this.onCheckedChange.emit(e);
        this.toggle(checked, data.guid);
    }
    toggle(checked, pigGuid) {
        if (checked === false && this.recordGuid) {
            this.model = {
                recordGuid: this.recordGuid || "",
                pigGuid,
                type: this.type
            };
            this.service.removeRecord2Pig(this.model).subscribe((res) => {
                if (res.success === true) {
                    this.alertify.success(this.alert.deleted_ok_msg);
                    this.loadDataByRoom();
                }
                else {
                    this.alertify.warning(this.alert.system_error_msg);
                }
            }, (error) => {
                this.alertify.warning(this.alert.system_error_msg);
            });
        }
        else {
            if (this.recordGuid) {
                this.model = {
                    recordGuid: this.recordGuid || "",
                    pigGuid,
                    type: this.type
                };
                this.service.addRecord2Pig(this.model).subscribe((res) => {
                    if (res.success === true) {
                        this.alertify.success(this.alert.created_ok_msg);
                        this.loadDataByRoom();
                    }
                    else {
                        this.alertify.warning(this.alert.system_error_msg);
                    }
                }, (error) => {
                    this.alertify.warning(this.alert.system_error_msg);
                });
            }
        }
    }
    loadDataByRoom() {
        const accessToken = localStorage.getItem("token");
        this.pigData = new DataManager({
            url: `${this.baseUrl}Pen/GetPigsByPen?penGuid=${this.penGuid || ""}&recordGuid=${this.recordGuid || ""}&type=${this.type || ""}`,
            adaptor: new UrlAdaptor(),
            headers: [{ authorization: `Bearer ${accessToken}` }],
        });
    }
}
MultiPigGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-multi-pig-grid',
                template: "<ejs-grid\r\n#piggrid\r\nid=\"pig-grid\"\r\n[dataSource]=\"pigData\"\r\n[enableInfiniteScrolling]=\"true\"\r\n[allowPaging]=\"false\"\r\n[pageSettings]=\"pageSettings\"\r\n[searchSettings]=\"searchOptions\"\r\n[toolbar]=\"['Search']\"\r\n[height]=\"height + 'px'\"\r\ngridLines=\"Both\"\r\n>\r\n<e-columns>\r\n<e-column\r\n  field=\"name\"\r\n  [allowSorting]=\"false\"\r\n  [allowSearching]=\"false\"\r\n  [allowGrouping]=\"false\"\r\n  [allowFiltering]=\"true\"\r\n  [allowEditing]=\"false\"\r\n  textAlign=\"Left\"\r\n          headerTextAlign=\"Center\"\r\n  width=\"80\"\r\n  headerTextAlign=\"Center\"\r\n  headerText=\"{{ 'PIG' | translate }}\"\r\n>\r\n  <ng-template #template let-data>\r\n    <ejs-checkbox #checkbox (change)=\"onChangeChecked($event, data)\" [label]=\"data.name\" [checked]=\"data.checked\"></ejs-checkbox>\r\n  </ng-template>\r\n</e-column>\r\n\r\n</e-columns>\r\n</ejs-grid>\r\n",
                styles: [""]
            },] }
];
MultiPigGridComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: PigfarmCoreService },
    { type: AlertifyService },
    { type: TranslateService }
];
MultiPigGridComponent.propDecorators = {
    height: [{ type: Input }],
    type: [{ type: Input }],
    recordGuid: [{ type: Input }],
    penGuid: [{ type: Input }],
    checked: [{ type: Input }],
    onCheckedChange: [{ type: Output, args: ['onCheckedChange',] }],
    pigData: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktcGlnLWdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9tdWx0aS1waWctZ3JpZC9tdWx0aS1waWctZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9BQU8sRUFDTCxXQUFXLEVBR1gsVUFBVSxHQUNYLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBTTVFLE1BQU0sT0FBTyxxQkFBcUI7SUEyQ2hDLFlBQW1DLE9BQU8sRUFDaEMsT0FBMkIsRUFDM0IsUUFBeUIsRUFDekIsU0FBMkI7UUFIRixZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQ2hDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBN0M1QixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2IsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDSyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFHckUsaUJBQVksR0FBRztZQUNiLFNBQVMsRUFBRSxFQUFF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WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VDb25zdGFudHMgfSBmcm9tICcuLi8uLi8uLi9fY29yZS9fY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBEYXRhTWFuYWdlcixcclxuICBRdWVyeSxcclxuICBPRGF0YVY0QWRhcHRvcixcclxuICBVcmxBZGFwdG9yLFxyXG59IGZyb20gXCJAc3luY2Z1c2lvbi9lajItZGF0YVwiO1xyXG5pbXBvcnQgeyBBbGVydGlmeVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9hbGVydGlmeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGlnZmFybUNvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcGlnZmFybS1jb3JlLnNlcnZpY2UnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1tdWx0aS1waWctZ3JpZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL211bHRpLXBpZy1ncmlkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tdWx0aS1waWctZ3JpZC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVBpZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQgLCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGhlaWdodCA9IDMwMDtcclxuICBASW5wdXQoKSB0eXBlID0gJyc7XHJcbiAgQElucHV0KCkgcmVjb3JkR3VpZCA9ICcnO1xyXG4gIEBJbnB1dCgpIHBlbkd1aWQgPSAnJztcclxuICBASW5wdXQoKSBjaGVja2VkID0gJyc7XHJcbiAgQE91dHB1dCgnb25DaGVja2VkQ2hhbmdlJykgb25DaGVja2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIFxyXG4gIHBhZ2VTZXR0aW5ncyA9IHtcclxuICAgIHBhZ2VDb3VudDogMTAsXHJcbiAgICBwYWdlU2l6ZXM6IDIwLFxyXG4gICAgZW5hYmxlUXVlcnlTdHJpbmc6IHRydWUsXHJcbiAgICBwYWdlU2l6ZTogMTAsXHJcbiAgICBjdXJyZW50UGFnZTogMSxcclxuICAgIGVuYWJsZVNjcm9sbDogdHJ1ZSxcclxuICB9O1xyXG4gIHNlYXJjaE9wdGlvbnMgPSB7IGZpZWxkczogWyduYW1lJ10sIG9wZXJhdG9yOiAnY29udGFpbnMnLCBpZ25vcmVDYXNlOiB0cnVlIH07XHJcbiAgbW9kZWw6IGFueTtcclxuICBhbGVydCA9IHtcclxuICAgIHVwZGF0ZU1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5VUERBVEVfTUVTU0FHRSksXHJcbiAgICB1cGRhdGVUaXRsZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLlVQREFURV9USVRMRSksXHJcbiAgICBjcmVhdGVNZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuQ1JFQVRFX01FU1NBR0UpLFxyXG4gICAgY3JlYXRlVGl0bGU6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5DUkVBVEVfVElUTEUpLFxyXG4gICAgZGVsZXRlTWVzc2FnZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLkRFTEVURV9NRVNTQUdFKSxcclxuICAgIGRlbGV0ZVRpdGxlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuREVMRVRFX1RJVExFKSxcclxuICAgIGNhbmNlbE1lc3NhZ2U6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5DQU5DRUxfTUVTU0FHRSksXHJcbiAgICBzZXJ2ZXJFcnJvcjogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLlNFUlZFUl9FUlJPUiksXHJcbiAgICBkZWxldGVkX29rX21zZzogdGhpcy50cmFuc2xhdGUuaW5zdGFudChNZXNzYWdlQ29uc3RhbnRzLkRFTEVURURfT0tfTVNHKSxcclxuICAgIGNyZWF0ZWRfb2tfbXNnOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuQ1JFQVRFRF9PS19NU0cpLFxyXG4gICAgdXBkYXRlZF9va19tc2c6IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoTWVzc2FnZUNvbnN0YW50cy5VUERBVEVEX09LX01TRyksXHJcbiAgICBzeXN0ZW1fZXJyb3JfbXNnOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuU1lTVEVNX0VSUk9SX01TRyksXHJcbiAgICBleGlzdF9tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuRVhJU1RfTUVTU0FHRSksXHJcbiAgICBjaG9vc2VfZmFybV9tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICBNZXNzYWdlQ29uc3RhbnRzLkNIT09TRV9GQVJNX01FU1NBR0VcclxuICAgICksXHJcbiAgICBzZWxlY3Rfb3JkZXJfbWVzc2FnZTogdGhpcy50cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgTWVzc2FnZUNvbnN0YW50cy5TRUxFQ1RfT1JERVJfTUVTU0FHRVxyXG4gICAgKSxcclxuICAgIHllc19tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuWUVTX01TRyksXHJcbiAgICBub19tZXNzYWdlOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KE1lc3NhZ2VDb25zdGFudHMuTk9fTVNHKSxcclxuICB9O1xyXG4gIEBJbnB1dCgpIHBpZ0RhdGE6IGFueTtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxcclxuICAgIHByaXZhdGUgc2VydmljZTogUGlnZmFybUNvcmVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbGVydGlmeTogQWxlcnRpZnlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2VcclxuICApIHsgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIC8vIGlmIChjaGFuZ2VzLnBpZ0RhdGEuY3VycmVudFZhbHVlICE9IGNoYW5nZXMucGlnRGF0YS5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAvLyAgIHRoaXMucGlnRGF0YSA9IGNoYW5nZXMucGlnRGF0YS5jdXJyZW50VmFsdWU7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcbiAgb25DaGFuZ2VDaGVja2VkKGUsIGRhdGEpIHtcclxuICAgIGxldCBjaGVja2VkID0gZS5jaGVja2VkO1xyXG4gICAgdGhpcy5vbkNoZWNrZWRDaGFuZ2UuZW1pdChlKTtcclxuICAgIHRoaXMudG9nZ2xlKGNoZWNrZWQsIGRhdGEuZ3VpZCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGUoY2hlY2tlZCwgcGlnR3VpZCkge1xyXG4gICAgaWYgKGNoZWNrZWQgPT09IGZhbHNlICYmIHRoaXMucmVjb3JkR3VpZCkge1xyXG4gICAgICB0aGlzLm1vZGVsID0ge1xyXG4gICAgICAgIHJlY29yZEd1aWQ6IHRoaXMucmVjb3JkR3VpZCB8fCBcIlwiLFxyXG4gICAgICAgIHBpZ0d1aWQsXHJcbiAgICAgICAgdHlwZTogdGhpcy50eXBlXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc2VydmljZS5yZW1vdmVSZWNvcmQyUGlnKHRoaXMubW9kZWwpLnN1YnNjcmliZShcclxuICAgICAgICAocmVzKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydGlmeS5zdWNjZXNzKHRoaXMuYWxlcnQuZGVsZXRlZF9va19tc2cpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhQnlSb29tKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0aWZ5Lndhcm5pbmcodGhpcy5hbGVydC5zeXN0ZW1fZXJyb3JfbXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hbGVydGlmeS53YXJuaW5nKHRoaXMuYWxlcnQuc3lzdGVtX2Vycm9yX21zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMucmVjb3JkR3VpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB7XHJcbiAgICAgICAgICByZWNvcmRHdWlkOiB0aGlzLnJlY29yZEd1aWQgfHwgXCJcIixcclxuICAgICAgICAgIHBpZ0d1aWQsXHJcbiAgICAgICAgICB0eXBlOiB0aGlzLnR5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5hZGRSZWNvcmQyUGlnKHRoaXMubW9kZWwpLnN1YnNjcmliZShcclxuICAgICAgICAgIChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hbGVydGlmeS5zdWNjZXNzKHRoaXMuYWxlcnQuY3JlYXRlZF9va19tc2cpO1xyXG4gICAgICAgICAgICAgIHRoaXMubG9hZERhdGFCeVJvb20oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLmFsZXJ0aWZ5Lndhcm5pbmcodGhpcy5hbGVydC5zeXN0ZW1fZXJyb3JfbXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0aWZ5Lndhcm5pbmcodGhpcy5hbGVydC5zeXN0ZW1fZXJyb3JfbXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9hZERhdGFCeVJvb20oKSB7XHJcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XHJcbiAgICB0aGlzLnBpZ0RhdGEgPSBuZXcgRGF0YU1hbmFnZXIoe1xyXG4gICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1QZW4vR2V0UGlnc0J5UGVuP3Blbkd1aWQ9JHtcclxuICAgICAgICB0aGlzLnBlbkd1aWQgfHwgXCJcIlxyXG4gICAgICB9JnJlY29yZEd1aWQ9JHt0aGlzLnJlY29yZEd1aWQgfHwgXCJcIn0mdHlwZT0ke3RoaXMudHlwZSB8fCBcIlwifWAsXHJcbiAgICAgIGFkYXB0b3I6IG5ldyBVcmxBZGFwdG9yKCksXHJcbiAgICAgIGhlYWRlcnM6IFt7IGF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gIH1dLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==