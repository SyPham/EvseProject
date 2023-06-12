import { Component, Input, ViewChild, Output, EventEmitter, ChangeDetectorRef, Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';
export class RoomDropdownlistComponent {
    constructor(baseUrl, trans, cd, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.cd = cd;
        this.service = service;
        this.id = "room-remote";
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
                const query = this.dropdownObj.query.clone().search(e.text, ['roomName', 'roomNo']);
                e.updateData(this.data, query);
            }
        };
    }
    onOroom(args) {
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
    }
    ngOnInit() {
        if (this.autoload) {
            this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(x => {
                this.data = x;
            });
        }
    }
    ngOnChanges(changes) {
        if (this.selectedValue === "" && this.dropdownObj) {
            this.dropdownObj.value = null;
            this.cd.detectChanges();
        }
        if (changes['selectedValue'] && changes['selectedValue'].currentValue) {
            setTimeout(() => {
                this.selectedValue = changes['selectedValue'].currentValue;
            }, 0);
        }
        if (changes['barnGuid']) {
            this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(x => {
                this.data = x;
            });
        }
        if (changes['makeOrderGuid']) {
            this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(x => {
                this.data = x;
            });
        }
    }
    onChange(args) {
        var _a, _b, _c;
        this.change.emit(args);
        this.roomGuidName = (_a = args.itemData) === null || _a === void 0 ? void 0 : _a.name;
        this.selectedValueChange.emit((_b = args.itemData) === null || _b === void 0 ? void 0 : _b.guid);
        this.ngModelChange.emit((_c = args.itemData) === null || _c === void 0 ? void 0 : _c.guid);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
    onblur(e) {
        this.onblurChange.emit(e);
    }
}
RoomDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-room-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #roomRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
RoomDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: ChangeDetectorRef },
    { type: PigfarmCoreService }
];
RoomDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    barnGuid: [{ type: Input }],
    makeOrderGuid: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    autoload: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    dropdownObj: [{ type: ViewChild, args: [DropDownListComponent,] }],
    onblurChange: [{ type: Output, args: ['onblur',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS1kcm9wZG93bmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9yb29tLWRyb3Bkb3dubGlzdC9yb29tLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTJDLGlCQUFpQixFQUFvQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPdkQsTUFBTSxPQUFPLHlCQUF5QjtJQTBEcEMsWUFBbUMsT0FBTyxFQUFRLEtBQXVCLEVBQy9ELEVBQXFCLEVBQ3RCLE9BQTJCO1FBRkQsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQy9ELE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBM0QzQixPQUFFLEdBQUcsYUFBYSxDQUFDO1FBSW5CLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUVmLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXRDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUlsRCxpQkFBWSxH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LENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7OztZQXJIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMscVhBQWlEOzthQUVsRDs7OzRDQTJEYyxNQUFNLFNBQUMsS0FBSztZQWxFbEIsZ0JBQWdCO1lBRm9GLGlCQUFpQjtZQUdySCxrQkFBa0I7OztpQkFReEIsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFFTCxNQUFNOzRCQUNOLE1BQU07a0NBQ04sTUFBTTswQkFDTixTQUFTLFNBQUMscUJBQXFCOzJCQUMvQixNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBBZnRlclZpZXdDaGVja2VkICxJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJvcERvd25MaXN0Q29tcG9uZW50IH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBQaWdmYXJtQ29yZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1yb29tLWRyb3Bkb3dubGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Jvb20tZHJvcGRvd25saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yb29tLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJvb21Ecm9wZG93bmxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcbiAgQElucHV0KCkgaWQgPSBcInJvb20tcmVtb3RlXCI7XHJcbiAgQElucHV0KCkgYmFybkd1aWQ6IGFueTtcclxuICBASW5wdXQoKSBtYWtlT3JkZXJHdWlkOiBhbnk7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGF1dG9sb2FkID0gdHJ1ZTtcclxuXHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAVmlld0NoaWxkKERyb3BEb3duTGlzdENvbXBvbmVudCkgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcclxuICBAT3V0cHV0KCdvbmJsdXInKSBvbmJsdXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHVibGljIGRhdGE6IGFueTtcclxuICBwdWJsaWMgcXVlcnk6IFF1ZXJ5IDtcclxuICBwdWJsaWMgcmVtb3RlRmllbGRzOiBPYmplY3QgPSB7IHRleHQ6ICduYW1lJywgdmFsdWU6ICdndWlkJyB9O1xyXG4gIFxyXG4gIHRha2UgPSAxMDA7XHJcbiAgcm9vbUd1aWROYW1lOiBhbnk7XHJcbiAgc2tpcCA9IDA7XHJcbiAgcHVibGljIG9uT3Jvb20oYXJncykge1xyXG4gICAgLy8gbGV0IHN0YXJ0OiBudW1iZXIgPSB0aGlzLnRha2U7XHJcbiAgICAvLyBsZXQgZW5kOiBudW1iZXIgPSA1O1xyXG4gICAgLy8gbGV0IGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCA9ICh0aGlzLmRyb3Bkb3duT2JqIGFzIGFueSkubGlzdDtcclxuICAgIC8vIGxpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgIC8vICAgY29uc29sZS5sb2cobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodCApXHJcbiAgICAvLyAgIGlmICgobGlzdEVsZW1lbnQuc2Nyb2xsVG9wICsgbGlzdEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSA+PSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQpIHtcclxuXHJcbiAgICAvLyAgICAgbGV0IGZpbHRlclF1ZXJ5ID0gdGhpcy5kcm9wZG93bk9iai5xdWVyeS5jbG9uZSgpO1xyXG4gICAgLy8gICAgIHRoaXMuZGF0YS5leGVjdXRlUXVlcnkoZmlsdGVyUXVlcnkuc2tpcChzdGFydCkudGFrZShlbmQpKS50aGVuKChldmVudDogYW55KSA9PiB7XHJcbiAgICAvLyAgICAgICBzdGFydCA9IGVuZDtcclxuICAgIC8vICAgICAgIGVuZCArPSA1O1xyXG4gICAgLy8gICAgICAgLy8gY29uc3QgdW5pcXVlID0gWy4uLm5ldyBTZXQoZXZlbnQucmVzdWx0Lm1hcChpdGVtID0+IGl0ZW0uZ3JvdXApKV07XHJcbiAgICAvLyAgICAgICB0aGlzLmRyb3Bkb3duT2JqLmFkZEl0ZW0oZXZlbnQucmVzdWx0IGFzIHsgW2tleTogc3RyaW5nXTogT2JqZWN0IH1bXSk7XHJcbiAgICAvLyAgICAgfSkuY2F0Y2goKGU6IE9iamVjdCkgPT4ge1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KVxyXG4gIH1cclxuICBwdWJsaWMgb25GaWx0ZXJpbmc6IGFueSA9IChlOiBhbnkpID0+IHtcclxuICAgIGlmIChlLnRleHQgPT09ICcnKSB7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LmNsb25lKCkuc2VhcmNoKGUudGV4dCwgWydyb29tTmFtZScsICdyb29tTm8nXSk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxuICAgIGUucmVzdWx0ID0gZS5yZXN1bHQubWFwKHggPT4ge1xyXG4gICAgICBsZXQgbmFtZSA9IHguaWQgPT09IDAgPyB0aGlzLnRyYW5zLmluc3RhbnQoeC5uYW1lKSA6IHgubmFtZTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBndWlkOiB4Lmd1aWQsXHJcbiAgICAgICAgbmFtZTogbmFtZVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG59XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwscHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwdWJsaWMgc2VydmljZTogUGlnZmFybUNvcmVTZXJ2aWNlKSB7XHJcbiAgICB9XHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZih0aGlzLmF1dG9sb2FkKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZS5nZXRSb29tc0J5RmFybUd1aWQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhcm1HdWlkJyksIHRoaXMuYmFybkd1aWQgfHwgXCJcIiwgdGhpcy5tYWtlT3JkZXJHdWlkIHx8ICcnKS5zdWJzY3JpYmUoeD0+IHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB4O1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRWYWx1ZSA9PT0gXCJcIiAmJiB0aGlzLmRyb3Bkb3duT2JqKSB7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25PYmoudmFsdWUgPSBudWxsO1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKVxyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ3NlbGVjdGVkVmFsdWUnXSAmJiBjaGFuZ2VzWydzZWxlY3RlZFZhbHVlJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGNoYW5nZXNbJ3NlbGVjdGVkVmFsdWUnXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgfSwgMCk7XHJcblxyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXNbJ2Jhcm5HdWlkJ10pIHtcclxuICAgICAgdGhpcy5zZXJ2aWNlLmdldFJvb21zQnlGYXJtR3VpZChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSwgdGhpcy5iYXJuR3VpZCB8fCBcIlwiLCB0aGlzLm1ha2VPcmRlckd1aWQgfHwgJycpLnN1YnNjcmliZSh4PT4ge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHg7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snbWFrZU9yZGVyR3VpZCddKSB7XHJcbiAgICAgIHRoaXMuc2VydmljZS5nZXRSb29tc0J5RmFybUd1aWQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhcm1HdWlkJyksIHRoaXMuYmFybkd1aWQgfHwgXCJcIiwgdGhpcy5tYWtlT3JkZXJHdWlkIHx8ICcnKS5zdWJzY3JpYmUoeD0+IHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB4O1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBvbkNoYW5nZShhcmdzKSB7XHJcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGFyZ3MpO1xyXG4gICAgdGhpcy5yb29tR3VpZE5hbWUgPSBhcmdzLml0ZW1EYXRhPy5uYW1lO1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQoYXJncy5pdGVtRGF0YT8uZ3VpZCk7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdChhcmdzLml0ZW1EYXRhPy5ndWlkKTtcclxuXHJcbiAgICBcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICBcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcclxuICB9XHJcbiAgb25ibHVyKGUpIHtcclxuICAgIFxyXG5cclxuICAgIHRoaXMub25ibHVyQ2hhbmdlLmVtaXQoZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==