import { Query } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
export class BreedingDropdownlistComponent {
    constructor(baseUrl, trans, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.service = service;
        this.id = "breeding-remote";
        this.placeholder = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 10;
        this.skip = 0;
        this.roomGuid = "";
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                //const query = this.dropdownObj.query.clone().search(e.text, 'name');
                e.updateData(this.data, new Query().search(e.text, 'name'));
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
        this.service.getBreedingByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x => {
            this.data = x;
        });
    }
    ngOnChanges(changes) {
        this.selectedValue = this.selectedValue || "";
    }
    onChange(args) {
        var _a, _b, _c, _d;
        this.change.emit(args);
        this.ngModelChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.guid);
        this.roomGuid = (_b = args.itemData) === null || _b === void 0 ? void 0 : _b.roomGuid;
        this.penGuid = (_c = args.itemData) === null || _c === void 0 ? void 0 : _c.penGuid;
        this.selectedValueChange.emit((_d = args.itemData) === null || _d === void 0 ? void 0 : _d.guid);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
}
BreedingDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-breeding-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"'No Item' | translate\"\r\n  #breedingRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [showClearButton]=\"true\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
            },] }
];
BreedingDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: PigfarmCoreService }
];
BreedingDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: ['breedingRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlZWRpbmctZHJvcGRvd25saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvYnJlZWRpbmctZHJvcGRvd25saXN0L2JyZWVkaW5nLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFlLEtBQUssRUFBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPdkQsTUFBTSxPQUFPLDZCQUE2QjtJQThDeEMsWUFBbUMsT0FBTyxFQUNqQyxLQUF1QixFQUN2QixPQUEyQjtRQUZELFlBQU8sR0FBUCxPQUFPLENBQUE7UUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUEvQzNCLE9BQUUsR0FBRyxpQkFBaUIsQ0FBQztRQUV2QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSWpELGlCQUFZLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULGFBQVEsR0FBRyxFQUFFLENBQUM7UUFxQlAsZ0JBQVcsR0FBUSxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLHNFQUFzRTtnQkFDdEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM3RDtRQUNILENBQUMsQ0FBQztJQUtxQyxDQUFDO0lBL0JqQyxNQUFNLENBQUMsSUFBSTtRQUNoQixpQ0FBaUM7UUFDakMsdUJBQXVCO1FBQ3ZCLGlFQUFpRTtRQUNqRSxpREFBaUQ7UUFDakQsNEZBQTRGO1FBQzVGLDBGQUEwRjtRQUUxRix3REFBd0Q7UUFDeEQsdUZBQXVGO1FBQ3ZGLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsOEVBQThFO1FBQzlFLCtFQUErRTtRQUMvRSxnQ0FBZ0M7UUFDaEMsVUFBVTtRQUNWLE1BQU07UUFDTixLQUFLO0lBQ1AsQ0FBQztJQVNNLGNBQWMsQ0FBQyxDQUFNO0lBQzlCLENBQUM7SUFJQyxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxFQUFFO1lBQ2hGLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTs7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksT0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxTQUFHLElBQUksQ0FBQyxRQUFRLDBDQUFFLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxTQUFHLElBQUksQ0FBQyxRQUFRLDBDQUFFLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxPQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxDQUFDO0lBRXJELENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQXpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsNGhCQUFxRDs7YUFFdEQ7Ozs0Q0ErQ2MsTUFBTSxTQUFDLEtBQUs7WUF0RGxCLGdCQUFnQjtZQUNoQixrQkFBa0I7OztpQkFReEIsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxNQUFNOzRCQUNOLE1BQU07a0NBQ04sTUFBTTswQkFDTixTQUFTLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdENvbXBvbmVudCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgUGlnZmFybUNvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYnJlZWRpbmctZHJvcGRvd25saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYnJlZWRpbmctZHJvcGRvd25saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9icmVlZGluZy1kcm9wZG93bmxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnJlZWRpbmdEcm9wZG93bmxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaWQgPSBcImJyZWVkaW5nLXJlbW90ZVwiO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IGFueTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBWaWV3Q2hpbGQoJ2JyZWVkaW5nUmVtb3RlJykgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XHJcbiAgXHJcbiAgdGFrZSA9IDEwO1xyXG4gIHNraXAgPSAwO1xyXG4gIHJvb21HdWlkID0gXCJcIjtcclxuICBwZW5HdWlkOiBhbnk7XHJcbiAgcHVibGljIG9uT3BlbihhcmdzKSB7XHJcbiAgICAvLyBsZXQgc3RhcnQ6IG51bWJlciA9IHRoaXMudGFrZTtcclxuICAgIC8vIGxldCBlbmQ6IG51bWJlciA9IDU7XHJcbiAgICAvLyBsZXQgbGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gKHRoaXMuZHJvcGRvd25PYmogYXMgYW55KS5saXN0O1xyXG4gICAgLy8gbGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQsbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IClcclxuICAgIC8vICAgaWYgKChsaXN0RWxlbWVudC5zY3JvbGxUb3AgKyBsaXN0RWxlbWVudC5vZmZzZXRIZWlnaHQpID49IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCkge1xyXG5cclxuICAgIC8vICAgICBsZXQgZmlsdGVyUXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCk7XHJcbiAgICAvLyAgICAgdGhpcy5kYXRhLmV4ZWN1dGVRdWVyeShmaWx0ZXJRdWVyeS5za2lwKHN0YXJ0KS50YWtlKGVuZCkpLnRoZW4oKGV2ZW50OiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgLy8gICAgICAgZW5kICs9IDU7XHJcbiAgICAvLyAgICAgICAvLyBjb25zdCB1bmlxdWUgPSBbLi4ubmV3IFNldChldmVudC5yZXN1bHQubWFwKGl0ZW0gPT4gaXRlbS5ncm91cCkpXTtcclxuICAgIC8vICAgICAgIHRoaXMuZHJvcGRvd25PYmouYWRkSXRlbShldmVudC5yZXN1bHQgYXMgeyBba2V5OiBzdHJpbmddOiBPYmplY3QgfVtdKTtcclxuICAgIC8vICAgICB9KS5jYXRjaCgoZTogT2JqZWN0KSA9PiB7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL2NvbnN0IHF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpLnNlYXJjaChlLnRleHQsICduYW1lJyk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIG5ldyBRdWVyeSgpLnNlYXJjaChlLnRleHQsICduYW1lJykpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge1xyXG59XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwsXHJcbiAgICBwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwdWJsaWMgc2VydmljZTogUGlnZmFybUNvcmVTZXJ2aWNlKSB7fVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZXJ2aWNlLmdldEJyZWVkaW5nQnlGYXJtR3VpZChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSkuc3Vic2NyaWJlKHg9PiB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IHg7XHJcbiAgICB9KVxyXG4gIH1cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWUgfHwgXCJcIjtcclxuICB9XHJcbiAgb25DaGFuZ2UoYXJncykge1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KGFyZ3MuaXRlbURhdGE/Lmd1aWQpO1xyXG4gICAgdGhpcy5yb29tR3VpZCA9IGFyZ3MuaXRlbURhdGE/LnJvb21HdWlkO1xyXG4gICAgdGhpcy5wZW5HdWlkID0gYXJncy5pdGVtRGF0YT8ucGVuR3VpZDtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KGFyZ3MuaXRlbURhdGE/Lmd1aWQpO1xyXG5cclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==