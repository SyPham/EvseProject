import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class TreatmentDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "treatmentMaster-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.popupWidth = '350px';
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 1000;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, 'name');
                e.updateData(this.data, query);
            }
        };
    }
    actionComplete(e) {
        console.log(e);
    }
    ngOnInit() {
        this.query = new Query();
        this.data = new DataManager({
            url: `${this.baseUrl}TreatmentMaster/GetDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
        this.selectedValue = this.selectedValue || "";
    }
    onChange(args) {
        var _a;
        this.change.emit(args);
        this.selectedValueChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.guid);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
}
TreatmentDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-treatment-dropdownlist',
                template: "<ejs-dropdownlist\r\n[(ngModel)]=\"selectedValue\"\r\n(change)=\"onChange($event)\"\r\n[allowFiltering]=\"true\"\r\n#treatmentTemplate\r\n[dataSource]=\"data\"\r\n[fields]=\"remoteFields\"\r\n[query]=\"query\"\r\n[popupWidth]='popupWidth'\r\n(actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
TreatmentDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
TreatmentDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    popupWidth: [{ type: Input }],
    dropdownObj: [{ type: ViewChild, args: ['treatmentMasterRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlYXRtZW50LWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL3RyZWF0bWVudC1kcm9wZG93bmxpc3QvdHJlYXRtZW50LWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sOEJBQThCO0lBMkJ6QyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBMUJoRSxPQUFFLEdBQUcsd0JBQXdCLENBQUM7UUFFOUIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMvQyxlQUFVLEdBQVEsT0FBTyxDQUFDO1FBSTVCLGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNGLGdCQUFXLEdBQVEsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO2dCQUNqQixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDO0lBSTBFLENBQUM7SUFIdEUsY0FBYyxDQUFDLENBQU07UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUMsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDO1lBQzFCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLHFDQUFxQztZQUN6RCxPQUFPLEVBQUUsSUFBSSxVQUFVO1lBQ3ZCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQUk7O1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksT0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBQ0QsZUFBZSxDQUFDLEtBQUs7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLDZVQUFzRDs7YUFFdkQ7Ozs0Q0E0QmMsTUFBTSxTQUFDLEtBQUs7WUFsQ2xCLGdCQUFnQjs7O2lCQVF0QixLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLE1BQU07NEJBQ04sTUFBTTtrQ0FDTixNQUFNO3lCQUNOLEtBQUs7MEJBQ0wsU0FBUyxTQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC10cmVhdG1lbnQtZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdHJlYXRtZW50LWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdHJlYXRtZW50LWRyb3Bkb3dubGlzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVhdG1lbnREcm9wZG93bmxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGlkID0gXCJ0cmVhdG1lbnRNYXN0ZXItcmVtb3RlXCI7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQElucHV0KCkgcG9wdXBXaWR0aDogYW55ID0gJzM1MHB4JztcclxuICBAVmlld0NoaWxkKCd0cmVhdG1lbnRNYXN0ZXJSZW1vdGUnKSBwdWJsaWMgZHJvcGRvd25PYmo6IERyb3BEb3duTGlzdENvbXBvbmVudFxyXG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcclxuICBwdWJsaWMgcXVlcnk6IFF1ZXJ5IDtcclxuICBwdWJsaWMgcmVtb3RlRmllbGRzOiBPYmplY3QgPSB7IHRleHQ6ICduYW1lJywgdmFsdWU6ICdndWlkJyB9O1xyXG4gIFxyXG4gIHRha2UgPSAxMDAwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKS5zZWFyY2goZS50ZXh0LCAnbmFtZScpO1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhLCBxdWVyeSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwdWJsaWMgYWN0aW9uQ29tcGxldGUoZTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhlKTtcclxufVxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLHB1YmxpYyB0cmFuczogVHJhbnNsYXRlU2VydmljZSkge31cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxyXG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcclxuICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9VHJlYXRtZW50TWFzdGVyL0dldERhdGFEcm9wZG93bmxpc3RgLFxyXG4gICAgICBhZGFwdG9yOiBuZXcgVXJsQWRhcHRvcixcclxuICAgICAgY3Jvc3NEb21haW46IHRydWUsXHJcbiAgICB9LCB0aGlzLnF1ZXJ5KTtcclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XHJcbiAgfVxyXG4gIG9uQ2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoYXJncyk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdChhcmdzLml0ZW1EYXRhPy5ndWlkKVxyXG4gIH1cclxuICBvbk5nTW9kZWxDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19