import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class CodeTypeDropdownlistComponent {
    constructor(baseUrl, cd, trans) {
        this.baseUrl = baseUrl;
        this.cd = cd;
        this.trans = trans;
        this.id = "codeType-remote";
        this.placeholder = this.trans.instant("No item");
        this.codeType = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.selectedNameChange = new EventEmitter();
        this.onblurChange = new EventEmitter();
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
    ngAfterViewChecked() {
        this.selectedValue = this.selectedValue || "";
        this.id = this.id || Math.random() + '';
        this.cd.detectChanges();
    }
    ngOnInit() {
        this.query = new Query()
            .addParams("lang", localStorage.getItem('lang'));
        let data = new DataManager({
            url: `${this.baseUrl}CodeType/GetDataDropdownlist?lang=${localStorage.getItem('lang')}&codeType=${this.codeType}`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        });
        data.executeQuery(this.query.sortBy('guid')).then((x) => {
            this.data = x.result.sort((a, b) => +a.guid - +b.guid);
            if (this.data.length > 0) {
                this.firstValue = this.data[0].guid;
            }
        });
    }
    ngOnChanges(changes) {
        if (changes['codeType'] && changes['codeType'].currentValue === 'Employee_Status') {
            if (changes['selectedValue'] && changes['selectedValue'].currentValue) {
                this.selectedValue = changes['selectedValue'].currentValue + '';
            }
        }
    }
    onChange(args) {
        var _a, _b;
        this.change.emit(args);
        this.selectedNameChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.name);
        this.selectedValueChange.emit((_b = args.itemData) === null || _b === void 0 ? void 0 : _b.guid);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
    onblur(e) {
        this.onblurChange.emit(e);
    }
}
CodeTypeDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-code-type-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [showClearButton]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #codeTypeRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
CodeTypeDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: ChangeDetectorRef },
    { type: TranslateService }
];
CodeTypeDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    codeType: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    selectedNameChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['codeTypeRemote',] }],
    onblurChange: [{ type: Output, args: ['onblur',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS10eXBlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL2NvZGUtdHlwZS1kcm9wZG93bmxpc3QvY29kZS10eXBlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTJDLGlCQUFpQixFQUFvQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEwsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPdkQsTUFBTSxPQUFPLDZCQUE2QjtJQXdEeEMsWUFBbUMsT0FBTyxFQUFTLEVBQXFCLEVBQVEsS0FBdUI7UUFBcEUsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVEsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUF2RDlGLE9BQUUsR0FBRyxpQkFBaUIsQ0FBQztRQUV2QixnQkFBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckMsaUJBQVksR0FBRyxJQUFJLFlBQVks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QUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsdWlCQUFzRDs7YUFFdkQ7Ozs0Q0F5RGMsTUFBTSxTQUFDLEtBQUs7WUFqRWtGLGlCQUFpQjtZQUVySCxnQkFBZ0I7OztpQkFRdEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLE1BQU07NEJBQ04sTUFBTTtrQ0FDTixNQUFNO2lDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLGdCQUFnQjsyQkFDMUIsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0NoZWNrZWQgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jb2RlLXR5cGUtZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29kZS10eXBlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29kZS10eXBlLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2RlVHlwZURyb3Bkb3dubGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdDaGVja2VkIHtcclxuICBASW5wdXQoKSBpZCA9IFwiY29kZVR5cGUtcmVtb3RlXCI7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gdGhpcy50cmFucy5pbnN0YW50KFwiTm8gaXRlbVwiKTtcclxuICBASW5wdXQoKSBjb2RlVHlwZSA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZE5hbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAVmlld0NoaWxkKCdjb2RlVHlwZVJlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XHJcbiAgQE91dHB1dCgnb25ibHVyJykgb25ibHVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHB1YmxpYyBkYXRhOiBhbnk7XHJcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XHJcbiAgcHVibGljIHJlbW90ZUZpZWxkczogT2JqZWN0ID0geyB0ZXh0OiAnbmFtZScsIHZhbHVlOiAnZ3VpZCcgfTtcclxuICBcclxuICB0YWtlID0gMTAwO1xyXG4gIHNraXAgPSAwO1xyXG4gIGZpcnN0VmFsdWU6IGFueTtcclxuICBwdWJsaWMgb25PcGVuKGFyZ3MpIHtcclxuICAgIC8vIGxldCBzdGFydDogbnVtYmVyID0gdGhpcy50YWtlO1xyXG4gICAgLy8gbGV0IGVuZDogbnVtYmVyID0gNTtcclxuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XHJcbiAgICAvLyBsaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCxsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQgKVxyXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XHJcblxyXG4gICAgLy8gICAgIGxldCBmaWx0ZXJRdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKTtcclxuICAgIC8vICAgICB0aGlzLmRhdGEuZXhlY3V0ZVF1ZXJ5KGZpbHRlclF1ZXJ5LnNraXAoc3RhcnQpLnRha2UoZW5kKSkudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgc3RhcnQgPSBlbmQ7XHJcbiAgICAvLyAgICAgICBlbmQgKz0gNTtcclxuICAgIC8vICAgICAgIC8vIGNvbnN0IHVuaXF1ZSA9IFsuLi5uZXcgU2V0KGV2ZW50LnJlc3VsdC5tYXAoaXRlbSA9PiBpdGVtLmdyb3VwKSldO1xyXG4gICAgLy8gICAgICAgdGhpcy5kcm9wZG93bk9iai5hZGRJdGVtKGV2ZW50LnJlc3VsdCBhcyB7IFtrZXk6IHN0cmluZ106IE9iamVjdCB9W10pO1xyXG4gICAgLy8gICAgIH0pLmNhdGNoKChlOiBPYmplY3QpID0+IHtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuICB9XHJcbiAgcHVibGljIG9uRmlsdGVyaW5nOiBhbnkgPSAoZTogYW55KSA9PiB7XHJcbiAgICBpZiAoZS50ZXh0ID09PSAnJykge1xyXG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpLnNlYXJjaChlLnRleHQsICduYW1lJyk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxuICAgIGUucmVzdWx0ID0gZS5yZXN1bHQubWFwKHggPT4ge1xyXG4gICAgICBsZXQgbmFtZSA9IHguZ3VpZCA9PT0gXCJcIiA/IHRoaXMudHJhbnMuaW5zdGFudCh4Lm5hbWUpIDogeC5uYW1lO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGd1aWQ6IHguZ3VpZCxcclxuICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XHJcbiAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCBNYXRoLnJhbmRvbSgpICsgJyc7XHJcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKVxyXG5cclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnF1ZXJ5ID0gbmV3IFF1ZXJ5KClcclxuICAgIC5hZGRQYXJhbXMoXCJsYW5nXCIsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5nJykpO1xyXG4gICAgbGV0IGRhdGEgPSBuZXcgRGF0YU1hbmFnZXIoe1xyXG4gICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1Db2RlVHlwZS9HZXREYXRhRHJvcGRvd25saXN0P2xhbmc9JHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFuZycpfSZjb2RlVHlwZT0ke3RoaXMuY29kZVR5cGV9YCxcclxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXHJcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBkYXRhLmV4ZWN1dGVRdWVyeSh0aGlzLnF1ZXJ5LnNvcnRCeSgnZ3VpZCcpKS50aGVuKCh4OiBhbnkpPT4ge1xyXG4gICAgICB0aGlzLmRhdGEgPSB4LnJlc3VsdC5zb3J0KChhLGIpID0+ICthLmd1aWQgLSArYi5ndWlkKTtcclxuICAgICAgaWYgKCB0aGlzLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3RWYWx1ZSA9IHRoaXMuZGF0YVswXS5ndWlkXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBcclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXNbJ2NvZGVUeXBlJ10gJiYgY2hhbmdlc1snY29kZVR5cGUnXS5jdXJyZW50VmFsdWUgPT09ICdFbXBsb3llZV9TdGF0dXMnICkge1xyXG4gICAgICBpZiAoY2hhbmdlc1snc2VsZWN0ZWRWYWx1ZSddICYmIGNoYW5nZXNbJ3NlbGVjdGVkVmFsdWUnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSBjaGFuZ2VzWydzZWxlY3RlZFZhbHVlJ10uY3VycmVudFZhbHVlICsgJydcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xyXG4gICAgdGhpcy5zZWxlY3RlZE5hbWVDaGFuZ2UuZW1pdChhcmdzLml0ZW1EYXRhPy5uYW1lKVxyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQoYXJncy5pdGVtRGF0YT8uZ3VpZClcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG4gIG9uYmx1cihlKSB7XHJcbiAgICB0aGlzLm9uYmx1ckNoYW5nZS5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=