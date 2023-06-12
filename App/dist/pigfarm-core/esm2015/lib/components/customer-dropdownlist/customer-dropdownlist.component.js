import { DataManager, Query, UrlAdaptor, Predicate } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class CustomerDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "customer-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 1000;
        this.skip = 0;
        this.onFiltering = (e) => {
            let query = new Query();
            //frame the query based on search string with filter type.
            let predicate = new Predicate('name', 'contains', e.text);
            predicate = predicate.or('no', 'contains', e.text);
            query = (e.text != "") ? query.where(predicate) : query;
            //pass the filter data source, filter query to updateData method.
            e.updateData(this.data, query);
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
    actionComplete(e) {
        console.log(e);
    }
    ngOnInit() {
        this.query = new Query();
        new DataManager({
            url: `${this.baseUrl}Customer/GetCustomersSP`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }).executeQuery(this.query).then((x) => {
            this.data = x.result;
        });
    }
    ngOnChanges(changes) {
        console.log('Customer/GetCustomersSP', this.selectedValue);
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
CustomerDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-customer-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #customerRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
CustomerDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
CustomerDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['customerRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZHJvcGRvd25saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvY3VzdG9tZXItZHJvcGRvd25saXN0L2N1c3RvbWVyLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNdkQsTUFBTSxPQUFPLDZCQUE2QjtJQThDeEMsWUFBbUMsT0FBTyxFQUFRLEtBQXVCO1FBQXRDLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFBUSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQTdDaEUsT0FBRSxHQUFHLGlCQUFpQixDQUFDO1FBRXZCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFJakQsaUJBQVksR0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRTlELFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBb0JGLGdCQUFXLEdBQVEsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3hCLDBEQUEwRDtZQUMxRCxJQUFJLFNBQVMsR0FBYyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRSxTQUFTLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDeEQsaUVBQWlFO1lBQ2pFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUM7SUFJMEUsQ0FBQztJQS9CdEUsTUFBTSxDQUFDLElBQUk7UUFDaEIsaUNBQWlDO1FBQ2pDLHVCQUF1QjtRQUN2QixpRUFBaUU7UUFDakUsaURBQWlEO1FBQ2pELDRGQUE0RjtRQUM1RiwwRkFBMEY7UUFFMUYsd0RBQXdEO1FBQ3hELHVGQUF1RjtRQUN2RixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLDhFQUE4RTtRQUM5RSwrRUFBK0U7UUFDL0UsZ0NBQWdDO1FBQ2hDLFVBQVU7UUFDVixNQUFNO1FBQ04sS0FBSztJQUNQLENBQUM7SUFVTSxjQUFjLENBQUMsQ0FBTTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFQyxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3hCLElBQUksV0FBVyxDQUFDO1lBQ2QsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8seUJBQXlCO1lBQzdDLE9BQU8sRUFBRSxJQUFJLFVBQVU7WUFDdkIsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTs7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxPQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxDQUFDO0lBRXJELENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQTFFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsbWRBQXFEOzthQUV0RDs7OzRDQStDYyxNQUFNLFNBQUMsS0FBSztZQXBEbEIsZ0JBQWdCOzs7aUJBT3RCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciwgUHJlZGljYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdENvbXBvbmVudCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtY3VzdG9tZXItZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItZHJvcGRvd25saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jdXN0b21lci1kcm9wZG93bmxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJEcm9wZG93bmxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaWQgPSBcImN1c3RvbWVyLXJlbW90ZVwiO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2N1c3RvbWVyUmVtb3RlJykgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XHJcbiAgXHJcbiAgdGFrZSA9IDEwMDA7XHJcbiAgc2tpcCA9IDA7XHJcbiAgcHVibGljIG9uT3BlbihhcmdzKSB7XHJcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcclxuICAgIC8vIGxldCBlbmQ6IG51bWJlciA9IDU7XHJcbiAgICAvLyBsZXQgbGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gKHRoaXMuZHJvcGRvd25PYmogYXMgYW55KS5saXN0O1xyXG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQsbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IClcclxuICAgIC8vICAgaWYgKChsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQpID49IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCkge1xyXG5cclxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XHJcbiAgICAvLyAgICAgdGhpcy5kYXRhLmV4ZWN1dGVRdWVyeShmaWx0ZXJRdWVyeS5za2lwKHN0YXJ0KS50YWtlKGVuZCkpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgLy8gICAgICAgZW5kICs9IDU7XHJcbiAgICAvLyAgICAgICAvLyBjb25zdCB1bmlxdWUgPSBbLi4ubmV3IFNldChldmVudC5yZXN1bHQubWFwKGl0ZW0gPT4gaXRlbS5ncm91cCkpXTtcclxuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcclxuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XHJcbiAgICAvL2ZyYW1lIHRoZSBxdWVyeSBiYXNlZCBvbiBzZWFyY2ggc3RyaW5nIHdpdGggZmlsdGVyIHR5cGUuXHJcbiAgICBsZXQgcHJlZGljYXRlOiBQcmVkaWNhdGUgPSBuZXcgUHJlZGljYXRlKCduYW1lJywgJ2NvbnRhaW5zJywgZS50ZXh0KTtcclxuICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS5vcignbm8nLCAnY29udGFpbnMnLCBlLnRleHQpO1xyXG4gICAgcXVlcnkgPSAoZS50ZXh0ICE9IFwiXCIpID8gcXVlcnkud2hlcmUocHJlZGljYXRlKSA6IHF1ZXJ5O1xyXG4gICAgLy9wYXNzIHRoZSBmaWx0ZXIgZGF0YSBzb3VyY2UsIGZpbHRlciBxdWVyeSB0byB1cGRhdGVEYXRhIG1ldGhvZC5cclxuICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKGUpO1xyXG59XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwscHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpXHJcbiAgICBuZXcgRGF0YU1hbmFnZXIoe1xyXG4gICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1DdXN0b21lci9HZXRDdXN0b21lcnNTUGAsXHJcbiAgICAgIGFkYXB0b3I6IG5ldyBVcmxBZGFwdG9yLFxyXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgIH0pLmV4ZWN1dGVRdWVyeSh0aGlzLnF1ZXJ5KS50aGVuKCh4OiBhbnkpPT4ge1xyXG4gICAgICB0aGlzLmRhdGEgPSB4LnJlc3VsdFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdDdXN0b21lci9HZXRDdXN0b21lcnNTUCcsIHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcclxuICB9XHJcbiAgb25DaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KGFyZ3MuaXRlbURhdGE/Lmd1aWQpO1xyXG5cclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==