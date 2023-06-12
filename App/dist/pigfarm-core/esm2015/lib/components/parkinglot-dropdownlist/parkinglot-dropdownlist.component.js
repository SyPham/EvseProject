import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
import { Component, Input, ViewChild, Output, EventEmitter, Inject, } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
export class ParkinglotDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "site-remote";
        this.placeholder = "";
        this.disabled = false;
        this.enabledLoad = true;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueName = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: "name", value: "guid" };
        this.take = 100;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === "") {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query
                    .clone()
                    .search(e.text, ["parkingLotNo", "parkingLotName"]);
                e.updateData(this.data, query);
            }
        };
    }
    onOpen(args) {
        // let start: number = this.take;
        // let end: number = 5;
        // let listElement: HTMLElement = (this.dropdownObj as any).list;
        // listElement.addEventListener('scroll', () => {
        //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
        //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
        //     let filterQuery = this.dropdownObj.query.clone();
        //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
        //       start = end;
        //       end += 5;
        //       // const unique = [...new Set(event.result.map(item => item.group))];
        //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
        //     }).catch((e: Object) => {
        //     });
        //   }
        // })
    }
    actionComplete(e) { }
    ngOnInit() { }
    loadData() {
        this.query = new Query().where("status", "equal", 1);
        if (this.siteGuid) {
            this.query.where("siteGuid", "equal", this.siteGuid);
        }
        this.data = new DataManager({
            url: `${this.baseUrl}ParkingLot/GetDataDropdownlist`,
            adaptor: new UrlAdaptor(),
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
        var _a;
        // only run when property "data" changed
        if (changes["selectedValue"]) {
            this.selectedValueChange.emit(this.selectedValue);
        }
        this.selectedValue = this.selectedValue || "";
        if (changes["siteGuid"] && changes["siteGuid"].currentValue) {
            this.loadData();
        }
        if (changes["enabledLoad"] && changes["enabledLoad"].currentValue == true && !((_a = changes["siteGuid"]) === null || _a === void 0 ? void 0 : _a.currentValue)) {
            this.loadData();
        }
    }
    onChange(args) {
        this.change.emit(args);
        this.selectedValueName.emit(args.itemData.name || "");
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
}
ParkinglotDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: "app-parkinglot-dropdownlist",
                template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
ParkinglotDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
ParkinglotDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    siteGuid: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    enabledLoad: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueName: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ["remote",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFya2luZ2xvdC1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9wYXJraW5nbG90LWRyb3Bkb3dubGlzdC9wYXJraW5nbG90LWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBR1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT3ZELE1BQU0sT0FBTywrQkFBK0I7SUErQzFDLFlBQW1DLE9BQU8sRUFBUyxLQUF1QjtRQUF2QyxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUE5Q2pFLE9BQUUsR0FBRyxhQUFhLENBQUM7UUFHbkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNsQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsU0FBSSxHQUFHLENB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LElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUF4RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLDZkQUF1RDs7YUFFeEQ7Ozs0Q0FnRGMsTUFBTSxTQUFDLEtBQUs7WUF0RGxCLGdCQUFnQjs7O2lCQVF0QixLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxNQUFNOzRCQUNOLE1BQU07Z0NBQ04sTUFBTTtrQ0FDTixNQUFNOzBCQUNOLFNBQVMsU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSBcIkBzeW5jZnVzaW9uL2VqMi1kYXRhXCI7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgSW5qZWN0LFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSBcIkBzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3duc1wiO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJhcHAtcGFya2luZ2xvdC1kcm9wZG93bmxpc3RcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYXJraW5nbG90LWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vcGFya2luZ2xvdC1kcm9wZG93bmxpc3QuY29tcG9uZW50LnNjc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIFBhcmtpbmdsb3REcm9wZG93bmxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlkID0gXCJzaXRlLXJlbW90ZVwiO1xuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHNpdGVHdWlkOiBhbnk7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlZExvYWQgPSB0cnVlO1xuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlTmFtZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAVmlld0NoaWxkKFwicmVtb3RlXCIpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50O1xuICBwdWJsaWMgZGF0YTogRGF0YU1hbmFnZXI7XG4gIHB1YmxpYyBxdWVyeTogUXVlcnk7XG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogXCJuYW1lXCIsIHZhbHVlOiBcImd1aWRcIiB9O1xuXG4gIHRha2UgPSAxMDA7XG4gIHNraXAgPSAwO1xuICBwdWJsaWMgb25PcGVuKGFyZ3MpIHtcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XG4gICAgLy8gICAgIGxldCBmaWx0ZXJRdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKTtcbiAgICAvLyAgICAgdGhpcy5kYXRhLmV4ZWN1dGVRdWVyeShmaWx0ZXJRdWVyeS5za2lwKHN0YXJ0KS50YWtlKGVuZCkpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcbiAgICAvLyAgICAgICBzdGFydCA9IGVuZDtcbiAgICAvLyAgICAgICBlbmQgKz0gNTtcbiAgICAvLyAgICAgICAvLyBjb25zdCB1bmlxdWUgPSBbLi4ubmV3IFNldChldmVudC5yZXN1bHQubWFwKGl0ZW0gPT4gaXRlbS5ncm91cCkpXTtcbiAgICAvLyAgICAgICB0aGlzLmRyb3Bkb3duT2JqLmFkZEl0ZW0oZXZlbnQucmVzdWx0IGFzIHsgW2tleTogc3RyaW5nXTogT2JqZWN0IH1bXSk7XG4gICAgLy8gICAgIH0pLmNhdGNoKChlOiBPYmplY3QpID0+IHtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgfVxuICBwdWJsaWMgb25GaWx0ZXJpbmc6IGFueSA9IChlOiBhbnkpID0+IHtcbiAgICBpZiAoZS50ZXh0ID09PSBcIlwiKSB7XG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5XG4gICAgICAgIC5jbG9uZSgpXG4gICAgICAgIC5zZWFyY2goZS50ZXh0LCBbXCJwYXJraW5nTG90Tm9cIiwgXCJwYXJraW5nTG90TmFtZVwiXSk7XG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhLCBxdWVyeSk7XG4gICAgfVxuICB9O1xuICBwdWJsaWMgYWN0aW9uQ29tcGxldGUoZTogYW55KTogdm9pZCB7fVxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCwgcHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuICBuZ09uSW5pdCgpIHt9XG4gIGxvYWREYXRhKCkge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKS53aGVyZShcInN0YXR1c1wiLCBcImVxdWFsXCIsIDEpO1xuICAgIGlmICh0aGlzLnNpdGVHdWlkKSB7XG4gICAgICB0aGlzLnF1ZXJ5LndoZXJlKFwic2l0ZUd1aWRcIiwgXCJlcXVhbFwiLCB0aGlzLnNpdGVHdWlkKTtcbiAgICB9XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKFxuICAgICAge1xuICAgICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1QYXJraW5nTG90L0dldERhdGFEcm9wZG93bmxpc3RgLFxuICAgICAgICBhZGFwdG9yOiBuZXcgVXJsQWRhcHRvcigpLFxuICAgICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnF1ZXJ5XG4gICAgKTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gb25seSBydW4gd2hlbiBwcm9wZXJ0eSBcImRhdGFcIiBjaGFuZ2VkXG4gICAgaWYgKGNoYW5nZXNbXCJzZWxlY3RlZFZhbHVlXCJdKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcbiAgICBpZiAoY2hhbmdlc1tcInNpdGVHdWlkXCJdICYmIGNoYW5nZXNbXCJzaXRlR3VpZFwiXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbXCJlbmFibGVkTG9hZFwiXSAmJiBjaGFuZ2VzW1wiZW5hYmxlZExvYWRcIl0uY3VycmVudFZhbHVlID09IHRydWUgJiYgIWNoYW5nZXNbXCJzaXRlR3VpZFwiXT8uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICB9XG4gIG9uQ2hhbmdlKGFyZ3MpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZU5hbWUuZW1pdChhcmdzLml0ZW1EYXRhLm5hbWUgfHwgXCJcIik7XG4gIH1cbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxufVxuIl19