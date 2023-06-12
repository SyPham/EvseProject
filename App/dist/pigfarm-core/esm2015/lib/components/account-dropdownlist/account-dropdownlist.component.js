import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class AccountDropdownlistComponent {
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
                const query = this.dropdownObj.query.clone().search(e.text, 'name');
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
            let name = x.guid === "" ? this.trans.instant(x.name) : x.name;
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
            url: `${this.baseUrl}XAccount/GetDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
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
AccountDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-account-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #xacccountRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
AccountDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
AccountDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['xacccountRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9hY2NvdW50LWRyb3Bkb3dubGlzdC9hY2NvdW50LWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sNEJBQTRCO0lBbUR2QyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBbERoRSxPQUFFLEdBQUcsa0JBQWtCLENBQUM7UUFFeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlqRCxpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFHLEdBQUcsQ0FBQztRQUNYLFNBQUksR0FBRyxDQUFDLENBQUM7UUFvQkYsZ0JBQVcsR0FBUSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUM7SUFVMEUsQ0FBQztJQXBDdEUsTUFBTSxDQUFDLElBQUk7UUFDaEIsaUNBQWlDO1FBQ2pDLHVCQUF1QjtRQUN2QixpRUFBaUU7UUFDakUsaURBQWlEO1FBQ2pELDRGQUE0RjtRQUM1RiwwRkFBMEY7UUFFMUYsd0RBQXdEO1FBQ3hELHVGQUF1RjtRQUN2RixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLDhFQUE4RTtRQUM5RSwrRUFBK0U7UUFDL0UsZ0NBQWdDO1FBQ2hDLFVBQVU7UUFDVixNQUFNO1FBQ04sS0FBSztJQUNQLENBQUM7SUFTTSxjQUFjLENBQUMsQ0FBTTtRQUMxQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDL0QsT0FBTztnQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUMsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7YUFDdkIsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyw4QkFBOEI7WUFDbEQsT0FBTyxFQUFFLElBQUksVUFBVTtZQUN2QixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBM0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQywwZ0JBQW9EOzthQUVyRDs7OzRDQW9EYyxNQUFNLFNBQUMsS0FBSztZQTFEbEIsZ0JBQWdCOzs7aUJBUXRCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBEYXRhTWFuYWdlciwgUXVlcnksIFVybEFkYXB0b3IgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZGF0YSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYWNjb3VudC1kcm9wZG93bmxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hY2NvdW50LWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYWNjb3VudC1kcm9wZG93bmxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWNjb3VudERyb3Bkb3dubGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpZCA9IFwieGFjY2NvdW50LXJlbW90ZVwiO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ3hhY2Njb3VudFJlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XHJcbiAgcHVibGljIGRhdGE6IERhdGFNYW5hZ2VyO1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XHJcbiAgXHJcbiAgdGFrZSA9IDEwMDtcclxuICBza2lwID0gMDtcclxuICBwdWJsaWMgb25PcGVuKGFyZ3MpIHtcclxuICAgIC8vIGxldCBzdGFydDogbnVtYmVyID0gdGhpcy50YWtlO1xyXG4gICAgLy8gbGV0IGVuZDogbnVtYmVyID0gNTtcclxuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XHJcbiAgICAvLyBsaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCxsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQgKVxyXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XHJcblxyXG4gICAgLy8gICAgIGxldCBmaWx0ZXJRdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKTtcclxuICAgIC8vICAgICB0aGlzLmRhdGEuZXhlY3V0ZVF1ZXJ5KGZpbHRlclF1ZXJ5LnNraXAoc3RhcnQpLnRha2UoZW5kKSkudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAvLyAgICAgICBlbmQgKz0gNTtcclxuICAgIC8vICAgICAgIC8vIGNvbnN0IHVuaXF1ZSA9IFsuLi5uZXcgU2V0KGV2ZW50LnJlc3VsdC5tYXAoaXRlbSA9PiBpdGVtLmdyb3VwKSldO1xyXG4gICAgLy8gICAgICAgdGhpcy5kcm9wZG93bk9iai5hZGRJdGVtKGV2ZW50LnJlc3VsdCBhcyB7IFtrZXk6IHN0cmluZ106IE9iamVjdCB9W10pO1xyXG4gICAgLy8gICAgIH0pLmNhdGNoKChlOiBPYmplY3QpID0+IHtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuICB9XHJcbiAgcHVibGljIG9uRmlsdGVyaW5nOiBhbnkgPSAoZTogYW55KSA9PiB7XHJcbiAgICBpZiAoZS50ZXh0ID09PSAnJykge1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpLnNlYXJjaChlLnRleHQsICduYW1lJyk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxuICAgIGUucmVzdWx0ID0gZS5yZXN1bHQubWFwKHggPT4ge1xyXG4gICAgICBsZXQgbmFtZSA9IHguZ3VpZCA9PT0gXCJcIiA/IHRoaXMudHJhbnMuaW5zdGFudCh4Lm5hbWUpIDogeC5uYW1lO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGd1aWQ6IHguZ3VpZCxcclxuICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gbmV3IFF1ZXJ5KClcclxuICAgIC53aGVyZSgnc3RhdHVzJywgJ2VxdWFsJywgMSk7XHJcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YU1hbmFnZXIoe1xyXG4gICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1YQWNjb3VudC9HZXREYXRhRHJvcGRvd25saXN0YCxcclxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXHJcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgfSwgdGhpcy5xdWVyeSk7XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xyXG4gIH1cclxuICBvbkNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xyXG4gIH1cclxuICBvbk5nTW9kZWxDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19