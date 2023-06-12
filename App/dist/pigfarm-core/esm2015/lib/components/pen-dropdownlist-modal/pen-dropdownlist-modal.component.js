import { __awaiter } from "tslib";
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
export class PenDropdownlistModalComponent {
    constructor(baseUrl, trans, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.service = service;
        this.id = "pen-remote";
        this.placeholder = this.trans.instant("No Item");
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 10;
        this.skip = 0;
        this.roomGuid = '';
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.search(e.text, ['penName', 'penNo']);
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
            let name = x.id === 0 ? this.trans.instant(x.name) : x.name;
            return {
                guid: x.guid,
                name: name
            };
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadData();
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.service.getPensByFarmGuidOrRoomGuid(localStorage.getItem("farmGuid"), this.roomGuid).toPromise();
            this.data = data;
            // this.query = new Query()
            //   .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
            //   .where('status', 'equal', 1);
            //   if (this.roomGuid) {
            //     this.query.where('roomGuid', 'equal', this.roomGuid);
            //   }
            // this.data = new DataManager({
            //   url: `${this.baseUrl}Pen/GetDataDropdownlist`,
            //   adaptor: new UrlAdaptor,
            //   crossDomain: true,
            // }, this.query.sortBy('penNo'));
        });
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
PenDropdownlistModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pen-dropdownlist-modal',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #penRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
PenDropdownlistModalComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: PigfarmCoreService }
];
PenDropdownlistModalComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['penRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuLWRyb3Bkb3dubGlzdC1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL3Blbi1kcm9wZG93bmxpc3QtbW9kYWwvcGVuLWRyb3Bkb3dubGlzdC1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPdkQsTUFBTSxPQUFPLDZCQUE2QjtJQW9EMUMsWUFBbUMsT0FBTyxFQUNqQyxLQUF1QixFQUN2QixPQUEyQjtRQUZELFlBQU8sR0FBUCxPQUFPLENBQUE7UUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFyRHpCLE9BQUUsR0FBRyxZQUFZLENBQUM7UUFFbEIsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsU0FBSSxHQUFHLENBQUMsQ0FBQztR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Q0wsS0FBSztxQkFDTCxNQUFNOzRCQUNOLE1BQU07a0NBQ04sTUFBTTswQkFDTixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBEYXRhTWFuYWdlciwgUXVlcnksIFVybEFkYXB0b3IgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZGF0YSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBQaWdmYXJtQ29yZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1wZW4tZHJvcGRvd25saXN0LW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcGVuLWRyb3Bkb3dubGlzdC1tb2RhbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGVuLWRyb3Bkb3dubGlzdC1tb2RhbC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQZW5Ecm9wZG93bmxpc3RNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpZCA9IFwicGVuLXJlbW90ZVwiO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IHRoaXMudHJhbnMuaW5zdGFudChcIk5vIEl0ZW1cIik7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ3BlblJlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XHJcbiAgcHVibGljIGRhdGE6IERhdGFNYW5hZ2VyO1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XHJcbiAgXHJcbiAgdGFrZSA9IDEwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHJvb21HdWlkID0gJyc7XHJcbiAgcHVibGljIG9uT3BlbihhcmdzKSB7XHJcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcclxuICAgIC8vIGxldCBlbmQ6IG51bWJlciA9IDU7XHJcbiAgICAvLyBsZXQgbGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gKHRoaXMuZHJvcGRvd25PYmogYXMgYW55KS5saXN0O1xyXG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQsbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IClcclxuICAgIC8vICAgaWYgKChsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQpID49IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCkge1xyXG5cclxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XHJcbiAgICAvLyAgICAgdGhpcy5kYXRhLmV4ZWN1dGVRdWVyeShmaWx0ZXJRdWVyeS5za2lwKHN0YXJ0KS50YWtlKGVuZCkpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgLy8gICAgICAgZW5kICs9IDU7XHJcbiAgICAvLyAgICAgICAvLyBjb25zdCB1bmlxdWUgPSBbLi4ubmV3IFNldChldmVudC5yZXN1bHQubWFwKGl0ZW0gPT4gaXRlbS5ncm91cCkpXTtcclxuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcclxuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuc2VhcmNoKGUudGV4dCwgWydwZW5OYW1lJywgJ3Blbk5vJ10pO1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhLCBxdWVyeSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwdWJsaWMgYWN0aW9uQ29tcGxldGUoZTogYW55KTogdm9pZCB7XHJcbiAgICBlLnJlc3VsdCA9IGUucmVzdWx0Lm1hcCh4ID0+IHtcclxuICAgICAgbGV0IG5hbWUgPSB4LmlkID09PSAwID8gdGhpcy50cmFucy5pbnN0YW50KHgubmFtZSkgOiB4Lm5hbWU7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3VpZDogeC5ndWlkLFxyXG4gICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5jb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxcclxuICBwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgcHVibGljIHNlcnZpY2U6IFBpZ2Zhcm1Db3JlU2VydmljZVxyXG4gICkge1xyXG5cclxufVxyXG5cclxuYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xyXG59XHJcblxyXG5hc3luYyBsb2FkRGF0YSgpIHtcclxuICBjb25zdCBkYXRhPSAgYXdhaXQgdGhpcy5zZXJ2aWNlLmdldFBlbnNCeUZhcm1HdWlkT3JSb29tR3VpZChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZhcm1HdWlkXCIpLCB0aGlzLnJvb21HdWlkKS50b1Byb21pc2UoKTtcclxuICB0aGlzLmRhdGEgPSBkYXRhXHJcblxyXG5cclxuICAvLyB0aGlzLnF1ZXJ5ID0gbmV3IFF1ZXJ5KClcclxuICAvLyAgIC53aGVyZSgnZmFybUd1aWQnLCAnZXF1YWwnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSlcclxuICAvLyAgIC53aGVyZSgnc3RhdHVzJywgJ2VxdWFsJywgMSk7XHJcbiAgLy8gICBpZiAodGhpcy5yb29tR3VpZCkge1xyXG4gIC8vICAgICB0aGlzLnF1ZXJ5LndoZXJlKCdyb29tR3VpZCcsICdlcXVhbCcsIHRoaXMucm9vbUd1aWQpO1xyXG4gIC8vICAgfVxyXG4gIC8vIHRoaXMuZGF0YSA9IG5ldyBEYXRhTWFuYWdlcih7XHJcbiAgLy8gICB1cmw6IGAke3RoaXMuYmFzZVVybH1QZW4vR2V0RGF0YURyb3Bkb3dubGlzdGAsXHJcbiAgLy8gICBhZGFwdG9yOiBuZXcgVXJsQWRhcHRvcixcclxuICAvLyAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gIC8vIH0sIHRoaXMucXVlcnkuc29ydEJ5KCdwZW5ObycpKTtcclxufVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xyXG4gIH1cclxuICBvbkNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xyXG4gIH1cclxuICBvbk5nTW9kZWxDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19