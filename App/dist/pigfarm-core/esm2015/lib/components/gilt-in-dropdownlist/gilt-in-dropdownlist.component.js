import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class GiltInDropdownlistComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "giltin-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'inOutNo', value: 'guid' };
        this.take = 10;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['inOutNo']);
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
            url: `${this.baseUrl}GiltIn/GetDataDropdownlist`,
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
GiltInDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-gilt-in-dropdownlist',
                template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #giltinRemote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
GiltInDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
GiltInDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['giltinRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lsdC1pbi1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9naWx0LWluLWRyb3Bkb3dubGlzdC9naWx0LWluLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sMkJBQTJCO0lBNkN0QyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBNUNoRSxPQUFFLEdBQUcsZUFBZSxDQUFDO1FBRXJCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3hDLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFJakQsaUJBQVksR0FBVyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRWpFLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBb0JGLGdCQUFXLEdBQVEsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO2dCQUNqQixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsQ0FBQztJQUkwRSxDQUFDO0lBOUJ0RSxNQUFNLENBQUMsSUFBSTtRQUNoQixpQ0FBaUM7UUFDakMsdUJBQXVCO1FBQ3ZCLGlFQUFpRTtRQUNqRSxpREFBaUQ7UUFDakQsNEZBQTRGO1FBQzVGLDBGQUEwRjtRQUUxRix3REFBd0Q7UUFDeEQsdUZBQXVGO1FBQ3ZGLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsOEVBQThFO1FBQzlFLCtFQUErRTtRQUMvRSxnQ0FBZ0M7UUFDaEMsVUFBVTtRQUNWLE1BQU07UUFDTixLQUFLO0lBQ1AsQ0FBQztJQVNNLGNBQWMsQ0FBQyxDQUFNO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVDLFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO2FBQ3ZCLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDMUIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sNEJBQTRCO1lBQ2hELE9BQU8sRUFBRSxJQUFJLFVBQVU7WUFDdkIsV0FBVyxFQUFFLElBQUk7U0FDbEIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQXRFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsbWVBQW9EOzthQUVyRDs7OzRDQThDYyxNQUFNLFNBQUMsS0FBSztZQXBEbEIsZ0JBQWdCOzs7aUJBUXRCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07MEJBQ04sU0FBUyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhTWFuYWdlciwgUXVlcnksIFVybEFkYXB0b3IgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItZGF0YSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZ2lsdC1pbi1kcm9wZG93bmxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ2lsdC1pbi1kcm9wZG93bmxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9naWx0LWluLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdpbHRJbkRyb3Bkb3dubGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaWQgPSBcImdpbHRpbi1yZW1vdGVcIjtcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQFZpZXdDaGlsZCgnZ2lsdGluUmVtb3RlJykgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcbiAgcHVibGljIGRhdGE6IERhdGFNYW5hZ2VyO1xuICBwdWJsaWMgcXVlcnk6IFF1ZXJ5IDtcbiAgcHVibGljIHJlbW90ZUZpZWxkczogT2JqZWN0ID0geyB0ZXh0OiAnaW5PdXRObycsIHZhbHVlOiAnZ3VpZCcgfTtcbiAgXG4gIHRha2UgPSAxMDtcbiAgc2tpcCA9IDA7XG4gIHB1YmxpYyBvbk9wZW4oYXJncykge1xuICAgIC8vIGxldCBzdGFydDogbnVtYmVyID0gdGhpcy50YWtlO1xuICAgIC8vIGxldCBlbmQ6IG51bWJlciA9IDU7XG4gICAgLy8gbGV0IGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9ICh0aGlzLmRyb3Bkb3duT2JqIGFzIGFueSkubGlzdDtcbiAgICAvLyBsaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQsbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IClcbiAgICAvLyAgIGlmICgobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSA+PSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQpIHtcblxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XG4gICAgLy8gICAgIHRoaXMuZGF0YS5leGVjdXRlUXVlcnkoZmlsdGVyUXVlcnkuc2tpcChzdGFydCkudGFrZShlbmQpKS50aGVuKChldmVudDogYW55KSA9PiB7XG4gICAgLy8gICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgLy8gICAgICAgZW5kICs9IDU7XG4gICAgLy8gICAgICAgLy8gY29uc3QgdW5pcXVlID0gWy4uLm5ldyBTZXQoZXZlbnQucmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uZ3JvdXApKV07XG4gICAgLy8gICAgICAgdGhpcy5kcm9wZG93bk9iai5hZGRJdGVtKGV2ZW50LnJlc3VsdCBhcyB7IFtrZXk6IHN0cmluZ106IE9iamVjdCB9W10pO1xuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cbiAgcHVibGljIG9uRmlsdGVyaW5nOiBhbnkgPSAoZTogYW55KSA9PiB7XG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKS5zZWFyY2goZS50ZXh0LCBbJ2luT3V0Tm8nXSk7XG4gICAgICBlLnVwZGF0ZURhdGEodGhpcy5kYXRhLCBxdWVyeSk7XG4gICAgfVxuICB9O1xuICBwdWJsaWMgYWN0aW9uQ29tcGxldGUoZTogYW55KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coZSk7XG59XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLHB1YmxpYyB0cmFuczogVHJhbnNsYXRlU2VydmljZSkge31cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpXG4gICAgLndoZXJlKCdzdGF0dXMnLCAnbGVzc3RoYW4nLCA5OSlcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YU1hbmFnZXIoe1xuICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9R2lsdEluL0dldERhdGFEcm9wZG93bmxpc3RgLFxuICAgICAgYWRhcHRvcjogbmV3IFVybEFkYXB0b3IsXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcbiAgICB9LCB0aGlzLnF1ZXJ5KTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2codGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcbiAgfVxuICBvbkNoYW5nZShhcmdzKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcbiAgfVxuICBvbk5nTW9kZWxDaGFuZ2UodmFsdWUpIHtcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG59XG4iXX0=