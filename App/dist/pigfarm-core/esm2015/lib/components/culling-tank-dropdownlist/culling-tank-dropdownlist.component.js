import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class CullingTankDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "cullingTank-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 10;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['cullingTankName', 'cullingTankNo']);
                e.updateData(this.data, query);
            }
        };
    }
    onOcullingTank(args) {
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
            url: `${this.baseUrl}CullingTank/GetDataDropdownlist`,
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
CullingTankDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-culling-tank-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #cullingTankRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
CullingTankDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
CullingTankDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['cullingTankRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VsbGluZy10YW5rLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL2N1bGxpbmctdGFuay1kcm9wZG93bmxpc3QvY3VsbGluZy10YW5rLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sZ0NBQWdDO0lBbUQzQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBbERoRSxPQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFFMUIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlqRCxpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFNBQUksR0FBRyxDQUFDLENBQUM7UUFvQkYsZ0JBQVcsR0FBUSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25DLElBQUks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eSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jdWxsaW5nLXRhbmstZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY3VsbGluZy10YW5rLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY3VsbGluZy10YW5rLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDdWxsaW5nVGFua0Ryb3Bkb3dubGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpZCA9IFwiY3VsbGluZ1RhbmstcmVtb3RlXCI7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQFZpZXdDaGlsZCgnY3VsbGluZ1RhbmtSZW1vdGUnKSBwdWJsaWMgZHJvcGRvd25PYmo6IERyb3BEb3duTGlzdENvbXBvbmVudFxyXG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcclxuICBwdWJsaWMgcXVlcnk6IFF1ZXJ5IDtcclxuICBwdWJsaWMgcmVtb3RlRmllbGRzOiBPYmplY3QgPSB7IHRleHQ6ICduYW1lJywgdmFsdWU6ICdndWlkJyB9O1xyXG4gIFxyXG4gIHRha2UgPSAxMDtcclxuICBza2lwID0gMDtcclxuICBwdWJsaWMgb25PY3VsbGluZ1RhbmsoYXJncykge1xyXG4gICAgLy8gbGV0IHN0YXJ0OiBudW1iZXIgPSB0aGlzLnRha2U7XHJcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xyXG4gICAgLy8gbGV0IGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9ICh0aGlzLmRyb3Bkb3duT2JqIGFzIGFueSkubGlzdDtcclxuICAgIC8vIGxpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXHJcbiAgICAvLyAgIGlmICgobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSA+PSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQpIHtcclxuXHJcbiAgICAvLyAgICAgbGV0IGZpbHRlclF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpO1xyXG4gICAgLy8gICAgIHRoaXMuZGF0YS5leGVjdXRlUXVlcnkoZmlsdGVyUXVlcnkuc2tpcChzdGFydCkudGFrZShlbmQpKS50aGVuKChldmVudDogYW55KSA9PiB7XHJcbiAgICAvLyAgICAgICBzdGFydCA9IGVuZDtcclxuICAgIC8vICAgICAgIGVuZCArPSA1O1xyXG4gICAgLy8gICAgICAgLy8gY29uc3QgdW5pcXVlID0gWy4uLm5ldyBTZXQoZXZlbnQucmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uZ3JvdXApKV07XHJcbiAgICAvLyAgICAgICB0aGlzLmRyb3Bkb3duT2JqLmFkZEl0ZW0oZXZlbnQucmVzdWx0IGFzIHsgW2tleTogc3RyaW5nXTogT2JqZWN0IH1bXSk7XHJcbiAgICAvLyAgICAgfSkuY2F0Y2goKGU6IE9iamVjdCkgPT4ge1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KVxyXG4gIH1cclxuICBwdWJsaWMgb25GaWx0ZXJpbmc6IGFueSA9IChlOiBhbnkpID0+IHtcclxuICAgIGlmIChlLnRleHQgPT09ICcnKSB7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCkuc2VhcmNoKGUudGV4dCwgWydjdWxsaW5nVGFua05hbWUnLCAnY3VsbGluZ1RhbmtObyddKTtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSwgcXVlcnkpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge1xyXG4gICAgZS5yZXN1bHQgPSBlLnJlc3VsdC5tYXAoeCA9PiB7XHJcbiAgICAgIGxldCBuYW1lID0geC5pZCA9PT0gMCA/IHRoaXMudHJhbnMuaW5zdGFudCh4Lm5hbWUpIDogeC5uYW1lO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGd1aWQ6IHguZ3VpZCxcclxuICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxyXG4gICAgLndoZXJlKCdmYXJtR3VpZCcsICdlcXVhbCcsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXJtR3VpZCcpKVxyXG4gICAgLndoZXJlKCdzdGF0dXMnLCAnZXF1YWwnLCAxKTtcclxuICAgIHRoaXMuZGF0YSA9IG5ldyBEYXRhTWFuYWdlcih7XHJcbiAgICAgIHVybDogYCR7dGhpcy5iYXNlVXJsfUN1bGxpbmdUYW5rL0dldERhdGFEcm9wZG93bmxpc3RgLFxyXG4gICAgICBhZGFwdG9yOiBuZXcgVXJsQWRhcHRvcixcclxuICAgICAgY3Jvc3NEb21haW46IHRydWUsXHJcbiAgICB9LCB0aGlzLnF1ZXJ5KTtcclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XHJcbiAgfVxyXG4gIG9uQ2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoYXJncyk7XHJcbiAgfVxyXG4gIG9uTmdNb2RlbENoYW5nZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gIH1cclxufVxyXG4iXX0=