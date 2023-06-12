import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
export class GiltinMakeorderDropdownlistComponent {
    constructor(baseUrl, trans, cd, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.cd = cd;
        this.service = service;
        this.id = "makeorder2-remote";
        this.selectedValue = '';
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.giltInGuidChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
    }
    ngOnDestroy() {
    }
    ngAfterViewChecked() {
        this.selectedValue = this.selectedValue || "";
        this.cd.detectChanges();
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.query = new Query()
            .where('farmGuid', 'equal', localStorage.getItem('farmGuid'));
        this.data = new DataManager({
            url: `${this.baseUrl}GiltIn/LoadDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
    }
    onChange(args) {
        var _a;
        this.change.emit(args);
        this.giltInGuidChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.giltInGuid);
        this.selectedValueChange.emit(args.value);
    }
}
GiltinMakeorderDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-giltin-makeorder-dropdownlist',
                template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(value)]=\"selectedValue\"\n  (change)=\"onChange($event)\"\n  [allowFiltering]=\"true\"\n  [enabled]=\"!disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n\n>\n\n</ejs-dropdownlist>\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
GiltinMakeorderDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: ChangeDetectorRef },
    { type: PigfarmCoreService }
];
GiltinMakeorderDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    giltInGuidChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['remote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lsdGluLW1ha2VvcmRlci1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9naWx0aW4tbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC9naWx0aW4tbWFrZW9yZGVyLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLGlCQUFpQixFQUErQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUssT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRdkQsTUFBTSxPQUFPLG9DQUFvQztJQWEvQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUIsRUFDL0QsRUFBcUIsRUFDdEIsT0FBMkI7UUFGRCxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVEsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDL0QsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFkM0IsT0FBRSxHQUFHLG1CQUFtQixDQUFDO1FBQ3pCLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzQyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUl2QixDQUFDO0lBQ3hDLFdBQVc7SUFFWCxDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0lBQ0QsUUFBUTtRQUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNoQixDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7YUFDdkIsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDMUIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sNkJBQTZCO1lBQ2pELE9BQU8sRUFBRSxJQUFJLFVBQVU7WUFDdkIsV0FBVyxFQUFFLElBQUk7U0FDbEIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtJQUdsQyxDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQUk7O1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksT0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxVQUFVLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7WUFqREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQ0FBbUM7Z0JBQzdDLG9TQUE2RDs7YUFFOUQ7Ozs0Q0FjYyxNQUFNLFNBQUMsS0FBSztZQXRCbEIsZ0JBQWdCO1lBRnFFLGlCQUFpQjtZQUd0RyxrQkFBa0I7OztpQkFTeEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxNQUFNOytCQUNOLE1BQU07a0NBQ04sTUFBTTswQkFDTixTQUFTLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95ICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyb3BEb3duTGlzdENvbXBvbmVudCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBQaWdmYXJtQ29yZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWdpbHRpbi1tYWtlb3JkZXItZHJvcGRvd25saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dpbHRpbi1tYWtlb3JkZXItZHJvcGRvd25saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2lsdGluLW1ha2VvcmRlci1kcm9wZG93bmxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdpbHRpbk1ha2VvcmRlckRyb3Bkb3dubGlzdENvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3Q2hlY2tlZCAsIE9uRGVzdHJveXtcbiAgQElucHV0KCkgaWQgPSBcIm1ha2VvcmRlcjItcmVtb3RlXCI7XG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueSA9ICcnO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGdpbHRJbkd1aWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQFZpZXdDaGlsZCgncmVtb3RlJykgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcbiAgcHVibGljIGRhdGE6IGFueTtcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XG4gIFxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHVibGljIHNlcnZpY2U6IFBpZ2Zhcm1Db3JlU2VydmljZSkge31cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICBcbiAgfVxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XG4gICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKClcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgIHRoaXMubG9hZERhdGEoKVxuICB9XG4gIGxvYWREYXRhKCkge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxuICAgIC53aGVyZSgnZmFybUd1aWQnLCAnZXF1YWwnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSk7XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcbiAgICAgIHVybDogYCR7dGhpcy5iYXNlVXJsfUdpbHRJbi9Mb2FkRGF0YURyb3Bkb3dubGlzdGAsXG4gICAgICBhZGFwdG9yOiBuZXcgVXJsQWRhcHRvcixcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgIH0sIHRoaXMucXVlcnkpO1xuICB9XG4gXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgIFxuICAgXG4gIH1cbiAgb25DaGFuZ2UoYXJncykge1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoYXJncyk7XG4gICAgdGhpcy5naWx0SW5HdWlkQ2hhbmdlLmVtaXQoYXJncy5pdGVtRGF0YT8uZ2lsdEluR3VpZClcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdChhcmdzLnZhbHVlKTtcbiAgfVxuXG59XG4iXX0=