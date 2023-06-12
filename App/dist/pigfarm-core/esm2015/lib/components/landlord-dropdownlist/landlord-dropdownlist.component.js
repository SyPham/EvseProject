import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class LandlordDropdownlistComponent {
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
        this.remoteFields = { text: 'landLordName', value: 'guid' };
        this.take = 100;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['landLordNo', 'landLordName']);
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
            url: `${this.baseUrl}Landlord/GetDataDropdownlist`,
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
LandlordDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-landlord-dropdownlist',
                template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
LandlordDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
LandlordDropdownlistComponent.propDecorators = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGxvcmQtZHJvcGRvd25saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvbGFuZGxvcmQtZHJvcGRvd25saXN0L2xhbmRsb3JkLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU12RCxNQUFNLE9BQU8sNkJBQTZCO0lBNkN4QyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBNUNoRSxPQUFFLEdBQUcsaUJBQWlCLENBQUM7UUFFdkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUV0RSxTQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ1gsU0FBSSxHQUFHLENBQUMsQ0FBQztRQW9CRixnQkFBVyxHQUFRLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRTtnQkFDakIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDM0YsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDO0lBRzBFLENBQUM7SUE3QnRFLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLGlDQUFpQztRQUNqQyx1QkFBdUI7UUFDdkIsaUVBQWlFO1FBQ2pFLGlEQUFpRDtRQUNqRCw0RkFBNEY7UUFDNUYsMEZBQTBGO1FBRTFGLHdEQUF3RDtRQUN4RCx1RkFBdUY7UUFDdkYscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQiw4RUFBOEU7UUFDOUUsK0VBQStFO1FBQy9FLGdDQUFnQztRQUNoQyxVQUFVO1FBQ1YsTUFBTTtRQUNOLEtBQUs7SUFDUCxDQUFDO0lBU00sY0FBYyxDQUFDLENBQU07SUFDOUIsQ0FBQztJQUVDLFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO2FBQ3ZCLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDMUIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sOEJBQThCO1lBQ2xELE9BQU8sRUFBRSxJQUFJLFVBQVU7WUFDdkIsV0FBVyxFQUFFLElBQUk7U0FDbEIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUMvQix3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDakQ7UUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyw2ZEFBcUQ7O2FBRXREOzs7NENBOENjLE1BQU0sU0FBQyxLQUFLO1lBbkRsQixnQkFBZ0I7OztpQkFPdEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxNQUFNOzRCQUNOLE1BQU07Z0NBQ04sTUFBTTtrQ0FDTixNQUFNOzBCQUNOLFNBQVMsU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1sYW5kbG9yZC1kcm9wZG93bmxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGFuZGxvcmQtZHJvcGRvd25saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGFuZGxvcmQtZHJvcGRvd25saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMYW5kbG9yZERyb3Bkb3dubGlzdENvbXBvbmVudCAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlkID0gXCJsYW5kbG9yZC1yZW1vdGVcIjtcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVOYW1lID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBWaWV3Q2hpbGQoJ3JlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ2xhbmRMb3JkTmFtZScsIHZhbHVlOiAnZ3VpZCcgfTtcbiAgXG4gIHRha2UgPSAxMDA7XG4gIHNraXAgPSAwO1xuICBwdWJsaWMgb25PcGVuKGFyZ3MpIHtcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XG5cbiAgICAvLyAgICAgbGV0IGZpbHRlclF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpO1xuICAgIC8vICAgICB0aGlzLmRhdGEuZXhlY3V0ZVF1ZXJ5KGZpbHRlclF1ZXJ5LnNraXAoc3RhcnQpLnRha2UoZW5kKSkudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgIC8vICAgICAgIGVuZCArPSA1O1xuICAgIC8vICAgICAgIC8vIGNvbnN0IHVuaXF1ZSA9IFsuLi5uZXcgU2V0KGV2ZW50LnJlc3VsdC5tYXAoaXRlbSA9PiBpdGVtLmdyb3VwKSldO1xuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcbiAgICAvLyAgICAgfSkuY2F0Y2goKGU6IE9iamVjdCkgPT4ge1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xuICAgIGlmIChlLnRleHQgPT09ICcnKSB7XG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCkuc2VhcmNoKGUudGV4dCwgWydsYW5kTG9yZE5vJywnbGFuZExvcmROYW1lJ10pO1xuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSwgcXVlcnkpO1xuICAgIH1cbiAgfTtcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge1xufVxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxuICAgIC53aGVyZSgnc3RhdHVzJywgJ2VxdWFsJywgMSk7XG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcbiAgICAgIHVybDogYCR7dGhpcy5iYXNlVXJsfUxhbmRsb3JkL0dldERhdGFEcm9wZG93bmxpc3RgLFxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICB9LCB0aGlzLnF1ZXJ5KTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgIC8vIG9ubHkgcnVuIHdoZW4gcHJvcGVydHkgXCJkYXRhXCIgY2hhbmdlZFxuICAgICBpZiAoY2hhbmdlc1snc2VsZWN0ZWRWYWx1ZSddKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICAgICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZSB8fCBcIlwiO1xuICB9XG4gIG9uQ2hhbmdlKGFyZ3MpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZU5hbWUuZW1pdChhcmdzLml0ZW1EYXRhLm5hbWUgfHwgJycpXG4gIH1cbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxufVxuIl19