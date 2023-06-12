import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
export class MakeorderDropdownlistComponent {
    constructor(baseUrl, trans, cd, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.cd = cd;
        this.service = service;
        this.id = "makeorder-remote";
        this.selectedValue = '';
        this.placeholder = "";
        this.pigType = "";
        this.disabled = false;
        this.popupWidth = 'auto';
        this.change = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'orderName', value: 'guid' };
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subscription2) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    ngAfterViewChecked() {
        this.selectedValue = this.selectedValue || "";
        this.cd.detectChanges();
    }
    ngOnInit() {
        if (!this.pigType) {
            this.loadData();
        }
    }
    loadData() {
        this.subscription = this.service.getMakeOrderByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x => {
            this.data = x;
        });
    }
    loadDataByPigType() {
        this.subscription2 = this.service.getMakeOrderByFarmGuidAndPigType(localStorage.getItem('farmGuid'), this.pigType).subscribe(x => {
            this.data = x;
        });
    }
    ngOnChanges(changes) {
        if (changes['selectedValue']) {
            this.selectedValueChange.emit(this.selectedValue);
        }
        if (changes['pigType'] && changes['pigType'].currentValue) {
            this.loadDataByPigType();
        }
    }
    onChange(args) {
        this.change.emit(args);
        this.selectedValueChange.emit(args.value);
    }
}
MakeorderDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-makeorder-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [popupWidth]=\"popupWidth\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
MakeorderDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: ChangeDetectorRef },
    { type: PigfarmCoreService }
];
MakeorderDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    pigType: [{ type: Input }],
    disabled: [{ type: Input }],
    popupWidth: [{ type: Input }],
    change: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['remote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZW9yZGVyLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL21ha2VvcmRlci1kcm9wZG93bmxpc3QvbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLGlCQUFpQixFQUErQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUssT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRdkQsTUFBTSxPQUFPLDhCQUE4QjtJQWdCekMsWUFBbUMsT0FBTyxFQUFRLEtBQXVCLEVBQy9ELEVBQXFCLEVBQ3RCLE9BQTJCO1FBRkQsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQy9ELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBakIzQixPQUFFLEdBQUcsa0JBQWtCLENBQUM7UUFDeEIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsZUFBVSxHQUFHLE1BQU0sQ0FBRTtRQUNwQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztJQU01QixDQUFDO0lBQ3hDLFdBQVc7O1FBQ1QsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxXQUFXLEdBQUc7UUFDakMsTUFBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxXQUFXLEdBQUc7SUFDcEMsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBQ0QsUUFBUTtRQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxFQUFFO1lBQ3BHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBLEVBQUU7WUFDN0gsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0YsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksRUFBRTtZQUMxRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsaVdBQXNEOzthQUV2RDs7OzRDQWlCYyxNQUFNLFNBQUMsS0FBSztZQXpCbEIsZ0JBQWdCO1lBRnFFLGlCQUFpQjtZQUd0RyxrQkFBa0I7OztpQkFTeEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7cUJBQ0wsTUFBTTtrQ0FDTixNQUFNOzBCQUNOLFNBQVMsU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdG9yUmVmLCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFBpZ2Zhcm1Db3JlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1tYWtlb3JkZXItZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYWtlb3JkZXJEcm9wZG93bmxpc3RDb21wb25lbnQgIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0NoZWNrZWQgLCBPbkRlc3Ryb3l7XHJcbiAgQElucHV0KCkgaWQgPSBcIm1ha2VvcmRlci1yZW1vdGVcIjtcclxuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBhbnkgPSAnJztcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgcGlnVHlwZSA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwb3B1cFdpZHRoID0gJ2F1dG8nIDtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAVmlld0NoaWxkKCdyZW1vdGUnKSBwdWJsaWMgZHJvcGRvd25PYmo6IERyb3BEb3duTGlzdENvbXBvbmVudFxyXG4gIHB1YmxpYyBkYXRhOiBhbnk7XHJcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XHJcbiAgcHVibGljIHJlbW90ZUZpZWxkczogT2JqZWN0ID0geyB0ZXh0OiAnb3JkZXJOYW1lJywgdmFsdWU6ICdndWlkJyB9O1xyXG4gIFxyXG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uXHJcbiAgc3Vic2NyaXB0aW9uMjogU3Vic2NyaXB0aW9uXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwscHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwdWJsaWMgc2VydmljZTogUGlnZmFybUNvcmVTZXJ2aWNlKSB7fVxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbjI/LnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xyXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKClcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMucGlnVHlwZSkge1xyXG4gICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGxvYWREYXRhKCkge1xyXG4gICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5nZXRNYWtlT3JkZXJCeUZhcm1HdWlkKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXJtR3VpZCcpKS5zdWJzY3JpYmUoeD0+IHtcclxuICAgICAgdGhpcy5kYXRhID0geDtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBsb2FkRGF0YUJ5UGlnVHlwZSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uMiA9IHRoaXMuc2VydmljZS5nZXRNYWtlT3JkZXJCeUZhcm1HdWlkQW5kUGlnVHlwZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSwgdGhpcy5waWdUeXBlKS5zdWJzY3JpYmUoeD0+IHtcclxuICAgICAgIHRoaXMuZGF0YSA9IHg7XHJcbiAgICAgfSlcclxuICAgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWydzZWxlY3RlZFZhbHVlJ10pIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VzWydwaWdUeXBlJ10gJiYgY2hhbmdlc1sncGlnVHlwZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgIHRoaXMubG9hZERhdGFCeVBpZ1R5cGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgb25DaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KGFyZ3MudmFsdWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19