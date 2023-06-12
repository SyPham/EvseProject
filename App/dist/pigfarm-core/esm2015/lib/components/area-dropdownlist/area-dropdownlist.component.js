import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class AreaDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "area-remote";
        this.placeholder = "";
        this.disabled = false;
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
                const query = this.dropdownObj.query.clone().search(e.text, ['areaName', 'areaNo']);
                e.updateData(this.data, query);
            }
        };
    }
    onOarea(args) {
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
        this.query = new Query()
            .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
            .where('status', 'equal', 1);
        this.data = new DataManager({
            url: `${this.baseUrl}Area/GetDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query.sortBy('areaNo'));
    }
    ngOnChanges(changes) {
        this.selectedValue = this.selectedValue || "";
        if (changes['selectedValue']) {
            if ((changes === null || changes === void 0 ? void 0 : changes.selectedValue.currentValue) != (changes === null || changes === void 0 ? void 0 : changes.selectedValue.previousValue) && !(changes === null || changes === void 0 ? void 0 : changes.selectedValue.firstChange)) {
                this.ngModelChange.emit(this.selectedValue);
                this.selectedValueChange.emit(this.selectedValue);
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
AreaDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-area-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #areaRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
AreaDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
AreaDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['areaRemote',] }],
    onblurChange: [{ type: Output, args: ['onblur',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9hcmVhLWRyb3Bkb3dubGlzdC9hcmVhLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLE9BQU8seUJBQXlCO0lBcURwQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBcERoRSxPQUFFLEdBQUcsYUFBYSxDQUFDO1FBRW5CLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFdEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWxELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsU0FBSSxHQUFHLENBQUMsQ0FBQztRQW9CRixnQkFBVyxHQUFRLENBQUMsQ0FBTSxFQUFFLEVBQUU7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QztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7O1lBekZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxxZ0JBQWlEOzthQUVsRDs7OzRDQXNEYyxNQUFNLFNBQUMsS0FBSztZQTNEbEIsZ0JBQWdCOzs7aUJBT3RCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLFlBQVk7MkJBQ3RCLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdENvbXBvbmVudCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXJlYS1kcm9wZG93bmxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcmVhLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXJlYS1kcm9wZG93bmxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcmVhRHJvcGRvd25saXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGlkID0gXCJhcmVhLXJlbW90ZVwiO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2FyZWFSZW1vdGUnKSBwdWJsaWMgZHJvcGRvd25PYmo6IERyb3BEb3duTGlzdENvbXBvbmVudFxyXG4gIEBPdXRwdXQoJ29uYmx1cicpIG9uYmx1ckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBwdWJsaWMgZGF0YTogRGF0YU1hbmFnZXI7XHJcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XHJcbiAgcHVibGljIHJlbW90ZUZpZWxkczogT2JqZWN0ID0geyB0ZXh0OiAnbmFtZScsIHZhbHVlOiAnZ3VpZCcgfTtcclxuICBcclxuICB0YWtlID0gMTAwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHB1YmxpYyBvbk9hcmVhKGFyZ3MpIHtcclxuICAgIC8vIGxldCBzdGFydDogbnVtYmVyID0gdGhpcy50YWtlO1xyXG4gICAgLy8gbGV0IGVuZDogbnVtYmVyID0gNTtcclxuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XHJcbiAgICAvLyBsaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCxsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQgKVxyXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XHJcblxyXG4gICAgLy8gICAgIGxldCBmaWx0ZXJRdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKTtcclxuICAgIC8vICAgICB0aGlzLmRhdGEuZXhlY3V0ZVF1ZXJ5KGZpbHRlclF1ZXJ5LnNraXAoc3RhcnQpLnRha2UoZW5kKSkudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAvLyAgICAgICBlbmQgKz0gNTtcclxuICAgIC8vICAgICAgIC8vIGNvbnN0IHVuaXF1ZSA9IFsuLi5uZXcgU2V0KGV2ZW50LnJlc3VsdC5tYXAoaXRlbSA9PiBpdGVtLmdyb3VwKSldO1xyXG4gICAgLy8gICAgICAgdGhpcy5kcm9wZG93bk9iai5hZGRJdGVtKGV2ZW50LnJlc3VsdCBhcyB7IFtrZXk6IHN0cmluZ106IE9iamVjdCB9W10pO1xyXG4gICAgLy8gICAgIH0pLmNhdGNoKChlOiBPYmplY3QpID0+IHtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuICB9XHJcbiAgcHVibGljIG9uRmlsdGVyaW5nOiBhbnkgPSAoZTogYW55KSA9PiB7XHJcbiAgICBpZiAoZS50ZXh0ID09PSAnJykge1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpLnNlYXJjaChlLnRleHQsIFsnYXJlYU5hbWUnLCAnYXJlYU5vJ10pO1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhLCBxdWVyeSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBwdWJsaWMgYWN0aW9uQ29tcGxldGUoZTogYW55KTogdm9pZCB7XHJcbiAgICBlLnJlc3VsdCA9IGUucmVzdWx0Lm1hcCh4ID0+IHtcclxuICAgICAgbGV0IG5hbWUgPSB4LmlkID09PSAwID8gdGhpcy50cmFucy5pbnN0YW50KHgubmFtZSkgOiB4Lm5hbWU7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3VpZDogeC5ndWlkLFxyXG4gICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLHB1YmxpYyB0cmFuczogVHJhbnNsYXRlU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpXHJcbiAgICAud2hlcmUoJ2Zhcm1HdWlkJywgJ2VxdWFsJywgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhcm1HdWlkJykpXHJcbiAgICAud2hlcmUoJ3N0YXR1cycsICdlcXVhbCcsIDEpO1xyXG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcclxuICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9QXJlYS9HZXREYXRhRHJvcGRvd25saXN0YCxcclxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXHJcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgfSwgdGhpcy5xdWVyeS5zb3J0QnkoJ2FyZWFObycpKTtcclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XHJcbiAgICBpZiAoY2hhbmdlc1snc2VsZWN0ZWRWYWx1ZSddKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VzPy5zZWxlY3RlZFZhbHVlLmN1cnJlbnRWYWx1ZSAhPSBjaGFuZ2VzPy5zZWxlY3RlZFZhbHVlLnByZXZpb3VzVmFsdWUgJiYgIWNoYW5nZXM/LnNlbGVjdGVkVmFsdWUuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgb25DaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG4gIG9uYmx1cihlKSB7XHJcbiAgICB0aGlzLm9uYmx1ckNoYW5nZS5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=