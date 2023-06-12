import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class XaccountGroupComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "xacccount-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 100;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, 'groupName');
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
    actionComplete(e) {
        e.result = e.result.map(x => {
            let name = x.guid === "" ? this.trans.instant(x.groupName) : x.groupName;
            return {
                guid: x.guid,
                name: name
            };
        });
    }
    ngOnInit() {
        this.query = new Query()
            .where('status', 'equal', 1);
        this.data = new DataManager({
            url: `${this.baseUrl}XAccountGroup/GetDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
        console.log(this.selectedValue);
        this.selectedValue = this.selectedValue || "";
    }
    onChange(args) {
        this.change.emit(args);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
}
XaccountGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-xaccount-group',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #xacccountRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
XaccountGroupComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
XaccountGroupComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['xacccountRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGFjY291bnQtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy94YWNjb3VudC1ncm91cC94YWNjb3VudC1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sc0JBQXNCO0lBbURqQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBbERoRSxPQUFFLEdBQUcsa0JBQWtCLENBQUM7UUFFeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlqRCxpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFHLEdBQUcsQ0FBQztRQUNYLFNBQUksR0FBRyxDQUFDLENBQUM7UUFvQkYsZ0JBQVcsR0FBUSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUM7SUFVMEUsQ0FBQztJQXBDdEUsTUFBTSxDQUFDLElBQUk7UUFDaEIsaUNBQWlDO1FBQ2pDLHVCQUF1QjtRQUN2QixpRUFBaUU7UUFDakUsaURBQWlEO1FBQ2pELDRGQUE0RjtRQUM1RiwwRkFBMEY7UUFFMUYsd0RBQXdEO1FBQ3hELHVGQUF1RjtRQUN2RixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLDhFQUE4RTtRQUM5RSwrRUFBK0U7UUFDL0UsZ0NBQWdDO1FBQ2hDLFVBQVU7UUFDVixNQUFNO1FBQ04sS0FBSztJQUNQLENBQUM7SUFTTSxjQUFjLENBQUMsQ0FBTTtRQUMxQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDekUsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUMsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7YUFDdkIsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxtQ0FBbUM7WUFDdkQsT0FBTyxFQUFFLElBQUksVUFBVTtZQUN2QixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw0Z0JBQThDOzthQUUvQzs7OzRDQW9EYyxNQUFNLFNBQUMsS0FBSztZQTFEbEIsZ0JBQWdCOzs7aUJBUXRCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBEYXRhTWFuYWdlciwgUXVlcnksIFVybEFkYXB0b3IgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZGF0YSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAteGFjY291bnQtZ3JvdXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi94YWNjb3VudC1ncm91cC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4veGFjY291bnQtZ3JvdXAuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgWGFjY291bnRHcm91cENvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaWQgPSBcInhhY2Njb3VudC1yZW1vdGVcIjtcclxuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBhbnk7XHJcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAVmlld0NoaWxkKCd4YWNjY291bnRSZW1vdGUnKSBwdWJsaWMgZHJvcGRvd25PYmo6IERyb3BEb3duTGlzdENvbXBvbmVudFxyXG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcclxuICBwdWJsaWMgcXVlcnk6IFF1ZXJ5IDtcclxuICBwdWJsaWMgcmVtb3RlRmllbGRzOiBPYmplY3QgPSB7IHRleHQ6ICduYW1lJywgdmFsdWU6ICdndWlkJyB9O1xyXG4gIFxyXG4gIHRha2UgPSAxMDA7XHJcbiAgc2tpcCA9IDA7XHJcbiAgcHVibGljIG9uT3BlbihhcmdzKSB7XHJcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcclxuICAgIC8vIGxldCBlbmQ6IG51bWJlciA9IDU7XHJcbiAgICAvLyBsZXQgbGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gKHRoaXMuZHJvcGRvd25PYmogYXMgYW55KS5saXN0O1xyXG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQsbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IClcclxuICAgIC8vICAgaWYgKChsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQpID49IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCkge1xyXG5cclxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XHJcbiAgICAvLyAgICAgdGhpcy5kYXRhLmV4ZWN1dGVRdWVyeShmaWx0ZXJRdWVyeS5za2lwKHN0YXJ0KS50YWtlKGVuZCkpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgLy8gICAgICAgZW5kICs9IDU7XHJcbiAgICAvLyAgICAgICAvLyBjb25zdCB1bmlxdWUgPSBbLi4ubmV3IFNldChldmVudC5yZXN1bHQubWFwKGl0ZW0gPT4gaXRlbS5ncm91cCkpXTtcclxuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcclxuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKS5zZWFyY2goZS50ZXh0LCAnZ3JvdXBOYW1lJyk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxuICAgIGUucmVzdWx0ID0gZS5yZXN1bHQubWFwKHggPT4ge1xyXG4gICAgICBsZXQgbmFtZSA9IHguZ3VpZCA9PT0gXCJcIiA/IHRoaXMudHJhbnMuaW5zdGFudCh4Lmdyb3VwTmFtZSkgOiB4Lmdyb3VwTmFtZTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBndWlkOiB4Lmd1aWQsXHJcbiAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwscHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpXHJcbiAgICAud2hlcmUoJ3N0YXR1cycsICdlcXVhbCcsIDEpO1xyXG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcclxuICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9WEFjY291bnRHcm91cC9HZXREYXRhRHJvcGRvd25saXN0YCxcclxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXHJcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgfSwgdGhpcy5xdWVyeSk7XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcclxuICB9XHJcbiAgb25DaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==