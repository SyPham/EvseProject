import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
import { Component, Input, ViewChild, Output, EventEmitter, Inject, } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
export class SiteDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "site-remote";
        this.placeholder = "";
        this.disabled = false;
        this.enabledLoad = true;
        this.landlordGuid = "";
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
                    .search(e.text, ["siteNo", "siteName"]);
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
        if (this.landlordGuid) {
            this.query.where("landlordGuid", "equal", this.landlordGuid);
        }
        this.data = new DataManager({
            url: `${this.baseUrl}Site/GetDataDropdownlist`,
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
        if (changes["landlordGuid"] && changes["landlordGuid"].currentValue) {
            this.loadData();
        }
        if (changes["enabledLoad"] && changes["enabledLoad"].currentValue == true && !((_a = changes["landlordGuid"]) === null || _a === void 0 ? void 0 : _a.currentValue)) {
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
SiteDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: "app-site-dropdownlist",
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
SiteDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
SiteDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    enabledLoad: [{ type: Input }],
    landlordGuid: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueName: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ["remote",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9zaXRlLWRyb3Bkb3dubGlzdC9zaXRlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUNULE1BQU0sRUFDTixZQUFZLEVBR1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBT3ZELE1BQU0sT0FBTyx5QkFBeUI7SUErQ3BDLFlBQW1DLE9BQU8sRUFBUyxLQUF1QjtRQUF2QyxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUE5Q2pFLE9BQUUsR0FBRyxhQUFhLENBQUM7UUFFbkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNqQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsU0FB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bUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBekZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxtZ0JBQWlEOzthQUVsRDs7OzRDQWdEYyxNQUFNLFNBQUMsS0FBSztZQXREbEIsZ0JBQWdCOzs7aUJBUXRCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3FCQUNMLE1BQU07NEJBQ04sTUFBTTtnQ0FDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhTWFuYWdlciwgUXVlcnksIFVybEFkYXB0b3IgfSBmcm9tIFwiQHN5bmNmdXNpb24vZWoyLWRhdGFcIjtcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIEluamVjdCxcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tIFwiQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zXCI7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXNpdGUtZHJvcGRvd25saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9zaXRlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9zaXRlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2l0ZURyb3Bkb3dubGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpZCA9IFwic2l0ZS1yZW1vdGVcIjtcclxuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBhbnk7XHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5hYmxlZExvYWQgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGxhbmRsb3JkR3VpZCA9IFwiXCI7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVOYW1lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAVmlld0NoaWxkKFwicmVtb3RlXCIpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50O1xyXG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcclxuICBwdWJsaWMgcXVlcnk6IFF1ZXJ5O1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogXCJuYW1lXCIsIHZhbHVlOiBcImd1aWRcIiB9O1xyXG5cclxuICB0YWtlID0gMTAwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHB1YmxpYyBvbk9wZW4oYXJncykge1xyXG4gICAgLy8gbGV0IHN0YXJ0OiBudW1iZXIgPSB0aGlzLnRha2U7XHJcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xyXG4gICAgLy8gbGV0IGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9ICh0aGlzLmRyb3Bkb3duT2JqIGFzIGFueSkubGlzdDtcclxuICAgIC8vIGxpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXHJcbiAgICAvLyAgIGlmICgobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSA+PSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQpIHtcclxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XHJcbiAgICAvLyAgICAgdGhpcy5kYXRhLmV4ZWN1dGVRdWVyeShmaWx0ZXJRdWVyeS5za2lwKHN0YXJ0KS50YWtlKGVuZCkpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgLy8gICAgICAgZW5kICs9IDU7XHJcbiAgICAvLyAgICAgICAvLyBjb25zdCB1bmlxdWUgPSBbLi4ubmV3IFNldChldmVudC5yZXN1bHQubWFwKGl0ZW0gPT4gaXRlbS5ncm91cCkpXTtcclxuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcclxuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUudGV4dCA9PT0gXCJcIikge1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeVxyXG4gICAgICAgIC5jbG9uZSgpXHJcbiAgICAgICAgLnNlYXJjaChlLnRleHQsIFtcInNpdGVOb1wiLCBcInNpdGVOYW1lXCJdKTtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSwgcXVlcnkpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge31cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCwgcHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxyXG4gIG5nT25Jbml0KCkge31cclxuICBsb2FkRGF0YSgpIHtcclxuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKS53aGVyZShcInN0YXR1c1wiLCBcImVxdWFsXCIsIDEpO1xyXG4gICAgaWYgKHRoaXMubGFuZGxvcmRHdWlkKSB7XHJcbiAgICAgIHRoaXMucXVlcnkud2hlcmUoXCJsYW5kbG9yZEd1aWRcIiwgXCJlcXVhbFwiLCB0aGlzLmxhbmRsb3JkR3VpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YU1hbmFnZXIoXHJcbiAgICAgIHtcclxuICAgICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1TaXRlL0dldERhdGFEcm9wZG93bmxpc3RgLFxyXG4gICAgICAgIGFkYXB0b3I6IG5ldyBVcmxBZGFwdG9yKCksXHJcbiAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRoaXMucXVlcnlcclxuICAgICk7XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIC8vIG9ubHkgcnVuIHdoZW4gcHJvcGVydHkgXCJkYXRhXCIgY2hhbmdlZFxyXG4gICAgaWYgKGNoYW5nZXNbXCJzZWxlY3RlZFZhbHVlXCJdKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XHJcbiAgICBpZiAoY2hhbmdlc1tcImxhbmRsb3JkR3VpZFwiXSAmJiBjaGFuZ2VzW1wibGFuZGxvcmRHdWlkXCJdLmN1cnJlbnRWYWx1ZSApIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfSBcclxuICAgIGlmIChjaGFuZ2VzW1wiZW5hYmxlZExvYWRcIl0gJiYgY2hhbmdlc1tcImVuYWJsZWRMb2FkXCJdLmN1cnJlbnRWYWx1ZSA9PSB0cnVlICYmICFjaGFuZ2VzW1wibGFuZGxvcmRHdWlkXCJdPy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBvbkNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlTmFtZS5lbWl0KGFyZ3MuaXRlbURhdGEubmFtZSB8fCBcIlwiKTtcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==