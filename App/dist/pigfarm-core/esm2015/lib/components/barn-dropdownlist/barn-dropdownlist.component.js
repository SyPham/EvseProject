import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class BarnDropdownlistComponent {
    constructor(baseUrl, cd, trans) {
        this.baseUrl = baseUrl;
        this.cd = cd;
        this.trans = trans;
        this.id = "barn-remote";
        this.placeholder = "";
        this.disabled = false;
        this.autoload = true;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.onblurChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 100;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['barnName', 'barnNo']);
                e.updateData(this.data, query);
            }
        };
    }
    onObarn(args) {
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
    ngAfterViewChecked() {
        this.selectedValue = this.selectedValue || "";
        this.cd.detectChanges();
    }
    ngOnInit() {
        if (this.autoload) {
            this.query = new Query()
                .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                .where('status', 'equal', 1);
            this.data = new DataManager({
                url: `${this.baseUrl}Barn/GetDataDropdownlist`,
                adaptor: new UrlAdaptor,
                crossDomain: true,
            }, this.query.sortBy('barnNo'));
        }
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty("selectedValue")) {
            if ((changes === null || changes === void 0 ? void 0 : changes.selectedValue.currentValue) != (changes === null || changes === void 0 ? void 0 : changes.selectedValue.previousValue) && !(changes === null || changes === void 0 ? void 0 : changes.selectedValue.firstChange)) {
                this.ngModelChange.emit(this.selectedValue);
                this.selectedValueChange.emit(this.selectedValue);
            }
        }
        if (changes.hasOwnProperty("areaGuid")) {
            if ((changes === null || changes === void 0 ? void 0 : changes.areaGuid.currentValue) != (changes === null || changes === void 0 ? void 0 : changes.areaGuid.previousValue)) {
                this.query = new Query()
                    .skip(this.skip)
                    .take(this.take)
                    .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                    .where('status', 'equal', 1)
                    .where('areaGuid', 'equal', this.areaGuid);
                this.data = new DataManager({
                    url: `${this.baseUrl}Barn/GetDataDropdownlist`,
                    adaptor: new UrlAdaptor,
                    crossDomain: true,
                }, this.query.sortBy('barnNo'));
            }
        }
    }
    onChange(args) {
        this.change.emit(args);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
    onblur(e) {
        this.onblurChange.emit(e);
    }
}
BarnDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-barn-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #barnRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
BarnDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: ChangeDetectorRef },
    { type: TranslateService }
];
BarnDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    areaGuid: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    autoload: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['barnRemote',] }],
    onblurChange: [{ type: Output, args: ['onblur',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFybi1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9iYXJuLWRyb3Bkb3dubGlzdC9iYXJuLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQThDLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqSyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLE9BQU8seUJBQXlCO0lBd0RwQyxZQUFtQyxPQUFPLEVBQVMsRUFBcUIsRUFBUSxLQUF1QjtRQUFwRSxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBUSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQXZEOUYsT0FBRSxHQUFHLGFBQWEsQ0FBQztRQUluQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDZixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV0QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFJbEQsaUJBQVksR0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRTlELFNBQUksR0FB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QWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLENBQUM7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7WUFsSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLHFnQkFBaUQ7O2FBRWxEOzs7NENBeURjLE1BQU0sU0FBQyxLQUFLO1lBaEVxRixpQkFBaUI7WUFFeEgsZ0JBQWdCOzs7aUJBT3RCLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUVMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLE1BQU07NEJBQ04sTUFBTTtrQ0FDTixNQUFNOzBCQUNOLFNBQVMsU0FBQyxZQUFZOzJCQUN0QixNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEFmdGVyVmlld0NoZWNrZWQsIENoYW5nZURldGVjdG9yUmVmICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1iYXJuLWRyb3Bkb3dubGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhcm4tZHJvcGRvd25saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9iYXJuLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhcm5Ecm9wZG93bmxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcbiAgQElucHV0KCkgaWQgPSBcImJhcm4tcmVtb3RlXCI7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xyXG4gIEBJbnB1dCgpIGFyZWFHdWlkOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGF1dG9sb2FkID0gdHJ1ZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2Jhcm5SZW1vdGUnKSBwdWJsaWMgZHJvcGRvd25PYmo6IERyb3BEb3duTGlzdENvbXBvbmVudFxyXG4gIEBPdXRwdXQoJ29uYmx1cicpIG9uYmx1ckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBwdWJsaWMgZGF0YTogRGF0YU1hbmFnZXI7XHJcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XHJcbiAgcHVibGljIHJlbW90ZUZpZWxkczogT2JqZWN0ID0geyB0ZXh0OiAnbmFtZScsIHZhbHVlOiAnZ3VpZCcgfTtcclxuICBcclxuICB0YWtlID0gMTAwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHB1YmxpYyBvbk9iYXJuKGFyZ3MpIHtcclxuICAgIC8vIGxldCBzdGFydDogbnVtYmVyID0gdGhpcy50YWtlO1xyXG4gICAgLy8gbGV0IGVuZDogbnVtYmVyID0gNTtcclxuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XHJcbiAgICAvLyBsaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCxsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQgKVxyXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XHJcblxyXG4gICAgLy8gICAgIGxldCBmaWx0ZXJRdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKTtcclxuICAgIC8vICAgICB0aGlzLmRhdGEuZXhlY3V0ZVF1ZXJ5KGZpbHRlclF1ZXJ5LnNraXAoc3RhcnQpLnRha2UoZW5kKSkudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAvLyAgICAgICBlbmQgKz0gNTtcclxuICAgIC8vICAgICAgIC8vIGNvbnN0IHVuaXF1ZSA9IFsuLi5uZXcgU2V0KGV2ZW50LnJlc3VsdC5tYXAoaXRlbSA9PiBpdGVtLmdyb3VwKSldO1xyXG4gICAgLy8gICAgICAgdGhpcy5kcm9wZG93bk9iai5hZGRJdGVtKGV2ZW50LnJlc3VsdCBhcyB7IFtrZXk6IHN0cmluZ106IE9iamVjdCB9W10pO1xyXG4gICAgLy8gICAgIH0pLmNhdGNoKChlOiBPYmplY3QpID0+IHtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuICB9XHJcbiAgcHVibGljIG9uRmlsdGVyaW5nOiBhbnkgPSAoZTogYW55KSA9PiB7XHJcbiAgICBpZiAoZS50ZXh0ID09PSAnJykge1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpLnNlYXJjaChlLnRleHQsIFsnYmFybk5hbWUnLCAnYmFybk5vJ10pO1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhLCBxdWVyeSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwdWJsaWMgYWN0aW9uQ29tcGxldGUoZTogYW55KTogdm9pZCB7XHJcbiAgICBlLnJlc3VsdCA9IGUucmVzdWx0Lm1hcCh4ID0+IHtcclxuICAgICAgbGV0IG5hbWUgPSB4LmlkID09PSAwID8gdGhpcy50cmFucy5pbnN0YW50KHgubmFtZSkgOiB4Lm5hbWU7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3VpZDogeC5ndWlkLFxyXG4gICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLHB1YmxpYyB0cmFuczogVHJhbnNsYXRlU2VydmljZSkge31cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcclxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKHRoaXMuYXV0b2xvYWQpIHtcclxuICAgICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpXHJcbiAgICAgIC53aGVyZSgnZmFybUd1aWQnLCAnZXF1YWwnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSlcclxuICAgICAgLndoZXJlKCdzdGF0dXMnLCAnZXF1YWwnLCAxKTtcclxuICAgICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcclxuICAgICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1CYXJuL0dldERhdGFEcm9wZG93bmxpc3RgLFxyXG4gICAgICAgIGFkYXB0b3I6IG5ldyBVcmxBZGFwdG9yLFxyXG4gICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgICB9LCB0aGlzLnF1ZXJ5LnNvcnRCeSgnYmFybk5vJykpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoXCJzZWxlY3RlZFZhbHVlXCIpKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VzPy5zZWxlY3RlZFZhbHVlLmN1cnJlbnRWYWx1ZSAhPSBjaGFuZ2VzPy5zZWxlY3RlZFZhbHVlLnByZXZpb3VzVmFsdWUgJiYgIWNoYW5nZXM/LnNlbGVjdGVkVmFsdWUuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICB9XHJcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShcImFyZWFHdWlkXCIpKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VzPy5hcmVhR3VpZC5jdXJyZW50VmFsdWUgIT0gY2hhbmdlcz8uYXJlYUd1aWQucHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxyXG4gICAgICAgIC5za2lwKHRoaXMuc2tpcClcclxuICAgICAgICAudGFrZSh0aGlzLnRha2UpXHJcbiAgICAgICAgLndoZXJlKCdmYXJtR3VpZCcsICdlcXVhbCcsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXJtR3VpZCcpKVxyXG4gICAgICAgIC53aGVyZSgnc3RhdHVzJywgJ2VxdWFsJywgMSlcclxuICAgICAgICAud2hlcmUoJ2FyZWFHdWlkJywgJ2VxdWFsJywgdGhpcy5hcmVhR3VpZCk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcclxuICAgICAgICAgIHVybDogYCR7dGhpcy5iYXNlVXJsfUJhcm4vR2V0RGF0YURyb3Bkb3dubGlzdGAsXHJcbiAgICAgICAgICBhZGFwdG9yOiBuZXcgVXJsQWRhcHRvcixcclxuICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgICAgIH0sIHRoaXMucXVlcnkuc29ydEJ5KCdiYXJuTm8nKSk7XHJcbiAgICAgIH1cclxuICAgICB9XHJcblxyXG5cclxuICB9XHJcbiAgb25DaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG4gIG9uYmx1cihlKSB7XHJcbiAgICB0aGlzLm9uYmx1ckNoYW5nZS5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=