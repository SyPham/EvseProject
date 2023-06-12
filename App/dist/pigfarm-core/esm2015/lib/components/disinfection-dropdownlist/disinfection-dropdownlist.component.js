import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class DisinfectionDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "disinfection-remote";
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
                const query = this.dropdownObj.query.clone().search(e.text, ['disinfectionNo', 'disinfectionName']);
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
    }
    ngOnInit() {
        this.query = new Query()
            .where('status', 'equal', 1);
        this.data = new DataManager({
            url: `${this.baseUrl}Disinfection/GetDataDropdownlist`,
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
DisinfectionDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-disinfection-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #disinfectionRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
DisinfectionDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
DisinfectionDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['disinfectionRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaW5mZWN0aW9uLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL2Rpc2luZmVjdGlvbi1kcm9wZG93bmxpc3QvZGlzaW5mZWN0aW9uLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8saUNBQWlDO0lBNEM1QyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBM0NoRSxPQUFFLEdBQUcscUJBQXFCLENBQUM7UUFFM0IsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlqRCxpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFNBQUksR0FBRyxDQUFDLENBQUM7UUFvQkYsZ0JBQVcsR0FBUSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDaEM7UUFDSCxDQUFDLENBQUM7SUFHMEUsQ0FBQztJQTdCdEUsTUFBTSxDQUFDLElBQUk7UUFDaEIsaUNBQWlDO1FBQ2pDLHVCQUF1QjtRQUN2QixpRUFBaUU7UUFDakUsaURBQWlEO1FBQ2pELDRGQUE0RjtRQUM1RiwwRkFBMEY7UUFFMUYsd0RBQXdEO1FBQ3hELHVGQUF1RjtRQUN2RixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLDhFQUE4RTtRQUM5RSwrRUFBK0U7UUFDL0UsZ0NBQWdDO1FBQ2hDLFVBQVU7UUFDVixNQUFNO1FBQ04sS0FBSztJQUNQLENBQUM7SUFTTSxjQUFjLENBQUMsQ0FBTTtJQUM5QixDQUFDO0lBRUMsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7YUFDdkIsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxrQ0FBa0M7WUFDdEQsT0FBTyxFQUFFLElBQUksVUFBVTtZQUN2QixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBcEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QywrZ0JBQXlEOzthQUUxRDs7OzRDQTZDYyxNQUFNLFNBQUMsS0FBSztZQW5EbEIsZ0JBQWdCOzs7aUJBUXRCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1kaXNpbmZlY3Rpb24tZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGlzaW5mZWN0aW9uLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGlzaW5mZWN0aW9uLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIERpc2luZmVjdGlvbkRyb3Bkb3dubGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpZCA9IFwiZGlzaW5mZWN0aW9uLXJlbW90ZVwiO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2Rpc2luZmVjdGlvblJlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XHJcbiAgcHVibGljIGRhdGE6IERhdGFNYW5hZ2VyO1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XHJcbiAgXHJcbiAgdGFrZSA9IDEwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHB1YmxpYyBvbk9wZW4oYXJncykge1xyXG4gICAgLy8gbGV0IHN0YXJ0OiBudW1iZXIgPSB0aGlzLnRha2U7XHJcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xyXG4gICAgLy8gbGV0IGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9ICh0aGlzLmRyb3Bkb3duT2JqIGFzIGFueSkubGlzdDtcclxuICAgIC8vIGxpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXHJcbiAgICAvLyAgIGlmICgobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSA+PSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQpIHtcclxuXHJcbiAgICAvLyAgICAgbGV0IGZpbHRlclF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpO1xyXG4gICAgLy8gICAgIHRoaXMuZGF0YS5leGVjdXRlUXVlcnkoZmlsdGVyUXVlcnkuc2tpcChzdGFydCkudGFrZShlbmQpKS50aGVuKChldmVudDogYW55KSA9PiB7XHJcbiAgICAvLyAgICAgICBzdGFydCA9IGVuZDtcclxuICAgIC8vICAgICAgIGVuZCArPSA1O1xyXG4gICAgLy8gICAgICAgLy8gY29uc3QgdW5pcXVlID0gWy4uLm5ldyBTZXQoZXZlbnQucmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uZ3JvdXApKV07XHJcbiAgICAvLyAgICAgICB0aGlzLmRyb3Bkb3duT2JqLmFkZEl0ZW0oZXZlbnQucmVzdWx0IGFzIHsgW2tleTogc3RyaW5nXTogT2JqZWN0IH1bXSk7XHJcbiAgICAvLyAgICAgfSkuY2F0Y2goKGU6IE9iamVjdCkgPT4ge1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KVxyXG4gIH1cclxuICBwdWJsaWMgb25GaWx0ZXJpbmc6IGFueSA9IChlOiBhbnkpID0+IHtcclxuICAgIGlmIChlLnRleHQgPT09ICcnKSB7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCkuc2VhcmNoKGUudGV4dCwgWydkaXNpbmZlY3Rpb25ObycsJ2Rpc2luZmVjdGlvbk5hbWUnXSk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxufVxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLHB1YmxpYyB0cmFuczogVHJhbnNsYXRlU2VydmljZSkge31cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxyXG4gICAgLndoZXJlKCdzdGF0dXMnLCAnZXF1YWwnLCAxKTtcclxuICAgIHRoaXMuZGF0YSA9IG5ldyBEYXRhTWFuYWdlcih7XHJcbiAgICAgIHVybDogYCR7dGhpcy5iYXNlVXJsfURpc2luZmVjdGlvbi9HZXREYXRhRHJvcGRvd25saXN0YCxcclxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXHJcbiAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxyXG4gICAgfSwgdGhpcy5xdWVyeSk7XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xyXG4gIH1cclxuICBvbkNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xyXG4gIH1cclxuICBvbk5nTW9kZWxDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19