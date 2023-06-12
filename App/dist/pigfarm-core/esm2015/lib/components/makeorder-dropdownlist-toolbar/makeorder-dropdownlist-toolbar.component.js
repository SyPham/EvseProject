import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
export class MakeorderDropdownlistToolbarComponent {
    constructor(baseUrl, trans, cd, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.cd = cd;
        this.service = service;
        this.id = "makeorder-remote";
        this.selectedValue = '';
        this.placeholder = "";
        this.popupWidth = '350px';
        this.popupHeight = '200px';
        this.disabled = false;
        this.change = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'orderName', value: 'guid' };
    }
    ngAfterViewChecked() {
        this.selectedValue = this.selectedValue || "";
        this.cd.detectChanges();
    }
    ngOnInit() {
        this.service.getMakeOrderByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x => {
            this.data = x;
        });
    }
    ngOnChanges(changes) {
        if (changes['selectedValue']) {
            this.selectedValueChange.emit(this.selectedValue);
        }
    }
    onChange(args) {
        this.change.emit(args);
        this.selectedValueChange.emit(args.value);
    }
}
MakeorderDropdownlistToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-makeorder-dropdownlist-toolbar',
                template: "<ejs-combobox\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [popupWidth]='popupWidth'\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-combobox>\r\n",
                styles: [""]
            },] }
];
MakeorderDropdownlistToolbarComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: ChangeDetectorRef },
    { type: PigfarmCoreService }
];
MakeorderDropdownlistToolbarComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    popupWidth: [{ type: Input }],
    popupHeight: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['remote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZW9yZGVyLWRyb3Bkb3dubGlzdC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC10b29sYmFyL21ha2VvcmRlci1kcm9wZG93bmxpc3QtdG9vbGJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLGlCQUFpQixFQUFvQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakssT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPdkQsTUFBTSxPQUFPLHFDQUFxQztJQWVoRCxZQUFtQyxPQUFPLEVBQVEsS0FBdUIsRUFDL0QsRUFBcUIsRUFDdEIsT0FBMkI7UUFGRCxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVEsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDL0QsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFoQjNCLE9BQUUsR0FBRyxrQkFBa0IsQ0FBQztRQUN4QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQVEsT0FBTyxDQUFDO1FBQzFCLGdCQUFXLEdBQUMsT0FBTyxDQUFDO1FBQ3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlqRCxpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFLNUIsQ0FBQztJQUN4QyxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxFQUFFO1lBQ2pGLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7OztZQXhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsdVZBQThEOzthQUUvRDs7OzRDQWdCYyxNQUFNLFNBQUMsS0FBSztZQXZCbEIsZ0JBQWdCO1lBRnFFLGlCQUFpQjtZQUd0RyxrQkFBa0I7OztpQkFReEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTtrQ0FDTixNQUFNOzBCQUNOLFNBQVMsU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0NoZWNrZWQgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFBpZ2Zhcm1Db3JlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW1ha2VvcmRlci1kcm9wZG93bmxpc3QtdG9vbGJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21ha2VvcmRlci1kcm9wZG93bmxpc3QtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC10b29sYmFyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1ha2VvcmRlckRyb3Bkb3dubGlzdFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcbiAgQElucHV0KCkgaWQgPSBcIm1ha2VvcmRlci1yZW1vdGVcIjtcclxuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBhbnkgPSAnJztcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgcG9wdXBXaWR0aDogYW55ID0gJzM1MHB4JztcclxuICBASW5wdXQoKSBwb3B1cEhlaWdodD0nMjAwcHgnO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQFZpZXdDaGlsZCgncmVtb3RlJykgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ29yZGVyTmFtZScsIHZhbHVlOiAnZ3VpZCcgfTtcclxuICBcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwscHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwdWJsaWMgc2VydmljZTogUGlnZmFybUNvcmVTZXJ2aWNlKSB7fVxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xyXG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKClcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlcnZpY2UuZ2V0TWFrZU9yZGVyQnlGYXJtR3VpZChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSkuc3Vic2NyaWJlKHg9PiB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IHg7XHJcbiAgICB9KVxyXG4gIH1cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlc1snc2VsZWN0ZWRWYWx1ZSddKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uQ2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoYXJncyk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdChhcmdzLnZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==