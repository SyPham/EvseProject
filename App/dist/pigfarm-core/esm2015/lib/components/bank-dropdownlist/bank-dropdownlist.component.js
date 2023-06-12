import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class BankDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "landlord-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueName = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'bankName', value: 'guid' };
        this.take = 100;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['bankNo', 'bankName']);
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
        this.query = new Query();
        this.data = new DataManager({
            url: `${this.baseUrl}Bank/GetDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
        // only run when property "data" changed
        if (changes['selectedValue']) {
            this.selectedValueChange.emit(this.selectedValue);
        }
        this.selectedValue = this.selectedValue || "";
    }
    onChange(args) {
        this.change.emit(args);
        this.selectedValueName.emit(args.itemData.name || '');
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
}
BankDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-bank-dropdownlist',
                template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
BankDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
BankDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueName: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['remote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuay1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9iYW5rLWRyb3Bkb3dubGlzdC9iYW5rLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLE9BQU8seUJBQXlCO0lBNkNwQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBNUNoRSxPQUFFLEdBQUcsaUJBQWlCLENBQUM7UUFFdkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUVsRSxTQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsU0FBSSxHQUFHLENBQUMsQ0FBQztRQW9CRixnQkFBVyxHQUFRLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRTtnQkFDakIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkYsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDO0lBRzBFLENBQUM7SUE3QnRFLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLGlDQUFpQztRQUNqQyx1QkFBdUI7UUFDdkIsaUVBQWlFO1FBQ2pFLGlEQUFpRDtRQUNqRCw0RkFBNEY7UUFDNUYsMEZBQTBGO1FBRTFGLHdEQUF3RDtRQUN4RCx1RkFBdUY7UUFDdkYscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQiw4RUFBOEU7UUFDOUUsK0VBQStFO1FBQy9FLGdDQUFnQztRQUNoQyxVQUFVO1FBQ1YsTUFBTTtRQUNOLEtBQUs7SUFDUCxDQUFDO0lBU00sY0FBYyxDQUFDLENBQU07SUFDOUIsQ0FBQztJQUVDLFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTywwQkFBMEI7WUFDOUMsT0FBTyxFQUFFLElBQUksVUFBVTtZQUN2QixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQy9CLHdDQUF3QztRQUN4QyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBQ0QsZUFBZSxDQUFDLEtBQUs7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUF6RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDZkQUFpRDs7YUFFbEQ7Ozs0Q0E4Q2MsTUFBTSxTQUFDLEtBQUs7WUFuRGxCLGdCQUFnQjs7O2lCQU90QixLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLE1BQU07NEJBQ04sTUFBTTtnQ0FDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyb3BEb3duTGlzdENvbXBvbmVudCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYmFuay1kcm9wZG93bmxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFuay1kcm9wZG93bmxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iYW5rLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQmFua0Ryb3Bkb3dubGlzdENvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlkID0gXCJsYW5kbG9yZC1yZW1vdGVcIjtcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVOYW1lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBWaWV3Q2hpbGQoJ3JlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ2JhbmtOYW1lJywgdmFsdWU6ICdndWlkJyB9O1xuICBcbiAgdGFrZSA9IDEwMDtcbiAgc2tpcCA9IDA7XG4gIHB1YmxpYyBvbk9wZW4oYXJncykge1xuICAgIC8vIGxldCBzdGFydDogbnVtYmVyID0gdGhpcy50YWtlO1xuICAgIC8vIGxldCBlbmQ6IG51bWJlciA9IDU7XG4gICAgLy8gbGV0IGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9ICh0aGlzLmRyb3Bkb3duT2JqIGFzIGFueSkubGlzdDtcbiAgICAvLyBsaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQsbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IClcbiAgICAvLyAgIGlmICgobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSA+PSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQpIHtcblxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XG4gICAgLy8gICAgIHRoaXMuZGF0YS5leGVjdXRlUXVlcnkoZmlsdGVyUXVlcnkuc2tpcChzdGFydCkudGFrZShlbmQpKS50aGVuKChldmVudDogYW55KSA9PiB7XG4gICAgLy8gICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgLy8gICAgICAgZW5kICs9IDU7XG4gICAgLy8gICAgICAgLy8gY29uc3QgdW5pcXVlID0gWy4uLm5ldyBTZXQoZXZlbnQucmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uZ3JvdXApKV07XG4gICAgLy8gICAgICAgdGhpcy5kcm9wZG93bk9iai5hZGRJdGVtKGV2ZW50LnJlc3VsdCBhcyB7IFtrZXk6IHN0cmluZ106IE9iamVjdCB9W10pO1xuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbiAgcHVibGljIG9uRmlsdGVyaW5nOiBhbnkgPSAoZTogYW55KSA9PiB7XG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKS5zZWFyY2goZS50ZXh0LCBbJ2JhbmtObycsJ2JhbmtOYW1lJ10pO1xuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSwgcXVlcnkpO1xuICAgIH1cbiAgfTtcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge1xufVxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxuICAgIHRoaXMuZGF0YSA9IG5ldyBEYXRhTWFuYWdlcih7XG4gICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1CYW5rL0dldERhdGFEcm9wZG93bmxpc3RgLFxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICB9LCB0aGlzLnF1ZXJ5KTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgIC8vIG9ubHkgcnVuIHdoZW4gcHJvcGVydHkgXCJkYXRhXCIgY2hhbmdlZFxuICAgICBpZiAoY2hhbmdlc1snc2VsZWN0ZWRWYWx1ZSddKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICAgICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xuICB9XG4gIG9uQ2hhbmdlKGFyZ3MpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZU5hbWUuZW1pdChhcmdzLml0ZW1EYXRhLm5hbWUgfHwgJycpXG4gIH1cbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxufVxuIl19