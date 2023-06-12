import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class BoarTestingDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "boartesting-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'guid', value: 'guid' };
        this.take = 10;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['guid']);
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
        console.log(e);
    }
    ngOnInit() {
        this.query = new Query()
            .where('status', 'lessthan', 99);
        this.data = new DataManager({
            url: `${this.baseUrl}BoarTesting/GetDataDropdownlist`,
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
BoarTestingDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-boar-testing-dropdownlist',
                template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #giltinRemote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                styles: [""]
            },] }
];
BoarTestingDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
BoarTestingDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['boartestingRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hci10ZXN0aW5nLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL2JvYXItdGVzdGluZy1kcm9wZG93bmxpc3QvYm9hci10ZXN0aW5nLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sZ0NBQWdDO0lBNkMzQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBNUNoRSxPQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFFMUIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlqRCxpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFNBQUksR0FBRyxDQUFDLENBQUM7UUFvQkYsZ0JBQVcsR0FBUSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDO0lBSTBFLENBQUM7SUE5QnRFLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLGlDQUFpQztRQUNqQyx1QkFBdUI7UUFDdkIsaUVBQWlFO1FBQ2pFLGlEQUFpRDtRQUNqRCw0RkFBNEY7UUFDNUYsMEZBQTBGO1FBRTFGLHdEQUF3RDtRQUN4RCx1RkFBdUY7UUFDdkYscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQiw4RUFBOEU7UUFDOUUsK0VBQStFO1FBQy9FLGdDQUFnQztRQUNoQyxVQUFVO1FBQ1YsTUFBTTtRQUNOLEtBQUs7SUFDUCxDQUFDO0lBU00sY0FBYyxDQUFDLENBQU07UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUMsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7YUFDdkIsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxpQ0FBaUM7WUFDckQsT0FBTyxFQUFFLElBQUksVUFBVTtZQUN2QixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBdEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxtZUFBeUQ7O2FBRTFEOzs7NENBOENjLE1BQU0sU0FBQyxLQUFLO1lBcERsQixnQkFBZ0I7OztpQkFRdEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxNQUFNOzRCQUNOLE1BQU07a0NBQ04sTUFBTTswQkFDTixTQUFTLFNBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWJvYXItdGVzdGluZy1kcm9wZG93bmxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vYm9hci10ZXN0aW5nLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JvYXItdGVzdGluZy1kcm9wZG93bmxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvYXJUZXN0aW5nRHJvcGRvd25saXN0Q29tcG9uZW50ICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaWQgPSBcImJvYXJ0ZXN0aW5nLXJlbW90ZVwiO1xuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBhbnk7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAVmlld0NoaWxkKCdib2FydGVzdGluZ1JlbW90ZScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XG4gIHB1YmxpYyBkYXRhOiBEYXRhTWFuYWdlcjtcbiAgcHVibGljIHF1ZXJ5OiBRdWVyeSA7XG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ2d1aWQnLCB2YWx1ZTogJ2d1aWQnIH07XG4gIFxuICB0YWtlID0gMTA7XG4gIHNraXAgPSAwO1xuICBwdWJsaWMgb25PcGVuKGFyZ3MpIHtcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xuICAgIC8vIGxldCBsaXN0RWxlbWVudDogSFRNTEVsZW1lbnQgPSAodGhpcy5kcm9wZG93bk9iaiBhcyBhbnkpLmxpc3Q7XG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXG4gICAgLy8gICBpZiAoKGxpc3RFbGVtZW50LnNjcm9sbFRvcCArIGxpc3RFbGVtZW50Lm9mZnNldEhlaWdodCkgPj0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSB7XG5cbiAgICAvLyAgICAgbGV0IGZpbHRlclF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpO1xuICAgIC8vICAgICB0aGlzLmRhdGEuZXhlY3V0ZVF1ZXJ5KGZpbHRlclF1ZXJ5LnNraXAoc3RhcnQpLnRha2UoZW5kKSkudGhlbigoZXZlbnQ6IGFueSkgPT4ge1xuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgIC8vICAgICAgIGVuZCArPSA1O1xuICAgIC8vICAgICAgIC8vIGNvbnN0IHVuaXF1ZSA9IFsuLi5uZXcgU2V0KGV2ZW50LnJlc3VsdC5tYXAoaXRlbSA9PiBpdGVtLmdyb3VwKSldO1xuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcbiAgICAvLyAgICAgfSkuY2F0Y2goKGU6IE9iamVjdCkgPT4ge1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuICB9XG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xuICAgIGlmIChlLnRleHQgPT09ICcnKSB7XG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCkuc2VhcmNoKGUudGV4dCwgWydndWlkJ10pO1xuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSwgcXVlcnkpO1xuICAgIH1cbiAgfTtcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGUpO1xufVxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxuICAgIC53aGVyZSgnc3RhdHVzJywgJ2xlc3N0aGFuJywgOTkpXG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKHtcbiAgICAgIHVybDogYCR7dGhpcy5iYXNlVXJsfUJvYXJUZXN0aW5nL0dldERhdGFEcm9wZG93bmxpc3RgLFxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICB9LCB0aGlzLnF1ZXJ5KTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcbiAgfVxuICBvbkNoYW5nZShhcmdzKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcbiAgfVxuICBvbk5nTW9kZWxDaGFuZ2UodmFsdWUpIHtcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG59XG4iXX0=