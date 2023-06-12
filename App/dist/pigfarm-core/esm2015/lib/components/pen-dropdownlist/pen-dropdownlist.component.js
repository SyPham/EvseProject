import { __awaiter } from "tslib";
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services/pigfarm-core.service';
export class PenDropdownlistComponent {
    constructor(baseUrl, trans, service) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.service = service;
        this.id = "pen-remote";
        this.placeholder = this.trans.instant("No Item");
        this.roomGuid = "";
        this.disabled = false;
        this.popupWidth = 300;
        this.enabledLoad = true;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.selectedNameChange = new EventEmitter();
        this.onblurChange = new EventEmitter();
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 1000;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.search(e.text, ['penName', 'penNo']);
                e.updateData(this.data, query);
            }
        };
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
    ngOnInit() {
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield this.service.getPensByFarmGuidOrRoomGuid(localStorage.getItem("farmGuid"), this.roomGuid).toPromise();
            // this.query = new Query()
            //   .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
            //   .where('status', 'equal', 1);
            //   if (this.roomGuid) {
            //     this.query.where('roomGuid', 'equal', this.roomGuid);
            //   }
            // this.data = new DataManager({
            //   url: `${this.baseUrl}Pen/GetDataDropdownlist`,
            //   adaptor: new UrlAdaptor,
            //   crossDomain: true,
            // }, this.query.sortBy('penNo'));
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedValue = this.selectedValue || "";
            if (this.dropdownObj && !this.selectedValue) {
                this.dropdownObj.value = null;
            }
            if (changes['enabledLoad'] && changes.enabledLoad.currentValue) {
                yield this.loadData();
                this.selectedValue = (_a = changes['selectedValue']) === null || _a === void 0 ? void 0 : _a.currentValue;
            }
            if (changes['roomGuid'] && changes.roomGuid.currentValue) {
                yield this.loadData();
                this.selectedValue = (_b = changes['selectedValue']) === null || _b === void 0 ? void 0 : _b.currentValue;
            }
        });
    }
    onChange(args) {
        var _a, _b, _c, _d;
        this.penGuidName = (_a = args.itemData) === null || _a === void 0 ? void 0 : _a.name;
        this.selectedNameChange.emit(((_b = args.itemData) === null || _b === void 0 ? void 0 : _b.name) || '');
        this.selectedValueChange.emit((_c = args.itemData) === null || _c === void 0 ? void 0 : _c.guid);
        this.ngModelChange.emit((_d = args.itemData) === null || _d === void 0 ? void 0 : _d.guid);
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
PenDropdownlistComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pen-dropdownlist',
                template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #penRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n</ejs-dropdownlist>",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
PenDropdownlistComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService },
    { type: PigfarmCoreService }
];
PenDropdownlistComponent.propDecorators = {
    id: [{ type: Input }],
    selectedValue: [{ type: Input }],
    placeholder: [{ type: Input }],
    roomGuid: [{ type: Input }],
    disabled: [{ type: Input }],
    popupWidth: [{ type: Input }],
    enabledLoad: [{ type: Input }],
    predicate: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    selectedNameChange: [{ type: Output }],
    onblurChange: [{ type: Output, args: ['onblur',] }],
    dropdownObj: [{ type: ViewChild, args: ['penRemote',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuLWRyb3Bkb3dubGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWdmYXJtLWNvcmUvc3JjL2xpYi9jb21wb25lbnRzL3Blbi1kcm9wZG93bmxpc3QvcGVuLWRyb3Bkb3dubGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFPNUUsTUFBTSxPQUFPLHdCQUF3QjtJQXdDbkMsWUFBbUMsT0FBTyxFQUNqQyxLQUF1QixFQUN2QixPQUEyQjtRQUZELFlBQU8sR0FBUCxPQUFPLENBQUE7UUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUF6QzNCLE9BQUUsR0FBRyxZQUFZLENBQUM7UUFFbEIsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixlQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBRWxCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlDLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDckMsaUJBQVksR0FBRyxJQUFJ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QUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksS0FBSSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxPQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsQ0FBQztRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7OztZQWpHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsbWVBQWdEOzthQUVqRDs7OzRDQXlDYyxNQUFNLFNBQUMsS0FBSztZQWpEbEIsZ0JBQWdCO1lBRWhCLGtCQUFrQjs7O2lCQVF4QixLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7cUJBQ0wsTUFBTTs0QkFDTixNQUFNO2tDQUNOLE1BQU07aUNBQ04sTUFBTTsyQkFDTixNQUFNLFNBQUMsUUFBUTswQkFDZixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFNYW5hZ2VyLCBRdWVyeSwgVXJsQWRhcHRvciB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1kYXRhJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgLEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RDb21wb25lbnQgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFByZWRpY2F0ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWdyaWRzJztcclxuaW1wb3J0IHsgUGlnZmFybUNvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvcGlnZmFybS1jb3JlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtcGVuLWRyb3Bkb3dubGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Blbi1kcm9wZG93bmxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Blbi1kcm9wZG93bmxpc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGVuRHJvcGRvd25saXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGlkID0gXCJwZW4tcmVtb3RlXCI7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogYW55O1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gdGhpcy50cmFucy5pbnN0YW50KFwiTm8gSXRlbVwiKTtcclxuICBASW5wdXQoKSByb29tR3VpZCA9IFwiXCI7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICBASW5wdXQoKSBwb3B1cFdpZHRoID0gMzAwO1xyXG4gIEBJbnB1dCgpIGVuYWJsZWRMb2FkID0gdHJ1ZTtcclxuICBASW5wdXQoKSBwcmVkaWNhdGU6IFByZWRpY2F0ZSB8IG51bGw7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWROYW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgnb25ibHVyJykgb25ibHVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQFZpZXdDaGlsZCgncGVuUmVtb3RlJykgcHVibGljIGRyb3Bkb3duT2JqOiBEcm9wRG93bkxpc3RDb21wb25lbnRcclxuICBwdWJsaWMgZGF0YTogYW55O1xyXG4gIHB1YmxpYyBwZW5HdWlkTmFtZTogYW55O1xyXG4gIHB1YmxpYyBxdWVyeTogUXVlcnkgO1xyXG4gIHB1YmxpYyByZW1vdGVGaWVsZHM6IE9iamVjdCA9IHsgdGV4dDogJ25hbWUnLCB2YWx1ZTogJ2d1aWQnIH07XHJcbiAgXHJcbiAgdGFrZSA9IDEwMDA7XHJcbiAgc2tpcCA9IDA7XHJcbiBcclxuICBwdWJsaWMgb25GaWx0ZXJpbmc6IGFueSA9IChlOiBhbnkpID0+IHtcclxuICAgIGlmIChlLnRleHQgPT09ICcnKSB7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmRyb3Bkb3duT2JqLnF1ZXJ5LnNlYXJjaChlLnRleHQsIFsncGVuTmFtZScsICdwZW5ObyddKTtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSwgcXVlcnkpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcHVibGljIGFjdGlvbkNvbXBsZXRlKGU6IGFueSk6IHZvaWQge1xyXG4gICAgZS5yZXN1bHQgPSBlLnJlc3VsdC5tYXAoeCA9PiB7XHJcbiAgICAgIGxldCBuYW1lID0geC5ndWlkID09PSBcIlwiID8gdGhpcy50cmFucy5pbnN0YW50KHgubmFtZSkgOiB4Lm5hbWU7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZ3VpZDogeC5ndWlkLFxyXG4gICAgICAgIG5hbWU6IG5hbWVcclxuICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLFxyXG4gICAgcHVibGljIHRyYW5zOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHVibGljIHNlcnZpY2U6IFBpZ2Zhcm1Db3JlU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG4gIFxyXG4gICBhc3luYyBsb2FkRGF0YSgpIHtcclxuICAgIHRoaXMuZGF0YSA9IGF3YWl0IHRoaXMuc2VydmljZS5nZXRQZW5zQnlGYXJtR3VpZE9yUm9vbUd1aWQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJmYXJtR3VpZFwiKSwgdGhpcy5yb29tR3VpZCkudG9Qcm9taXNlKCk7XHJcblxyXG4gICAgLy8gdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpXHJcbiAgICAvLyAgIC53aGVyZSgnZmFybUd1aWQnLCAnZXF1YWwnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFybUd1aWQnKSlcclxuICAgIC8vICAgLndoZXJlKCdzdGF0dXMnLCAnZXF1YWwnLCAxKTtcclxuICAgIC8vICAgaWYgKHRoaXMucm9vbUd1aWQpIHtcclxuICAgIC8vICAgICB0aGlzLnF1ZXJ5LndoZXJlKCdyb29tR3VpZCcsICdlcXVhbCcsIHRoaXMucm9vbUd1aWQpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB0aGlzLmRhdGEgPSBuZXcgRGF0YU1hbmFnZXIoe1xyXG4gICAgLy8gICB1cmw6IGAke3RoaXMuYmFzZVVybH1QZW4vR2V0RGF0YURyb3Bkb3dubGlzdGAsXHJcbiAgICAvLyAgIGFkYXB0b3I6IG5ldyBVcmxBZGFwdG9yLFxyXG4gICAgLy8gICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgIC8vIH0sIHRoaXMucXVlcnkuc29ydEJ5KCdwZW5ObycpKTtcclxuICB9XHJcbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlIHx8IFwiXCI7XHJcbiAgICBpZih0aGlzLmRyb3Bkb3duT2JqICYmICF0aGlzLnNlbGVjdGVkVmFsdWUpIHtcclxuICAgICAgdGhpcy5kcm9wZG93bk9iai52YWx1ZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1snZW5hYmxlZExvYWQnXSAmJiBjaGFuZ2VzLmVuYWJsZWRMb2FkLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGNoYW5nZXNbJ3NlbGVjdGVkVmFsdWUnXT8uY3VycmVudFZhbHVlXHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlc1sncm9vbUd1aWQnXSAmJiBjaGFuZ2VzLnJvb21HdWlkLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGNoYW5nZXNbJ3NlbGVjdGVkVmFsdWUnXT8uY3VycmVudFZhbHVlXHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uQ2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMucGVuR3VpZE5hbWUgPSBhcmdzLml0ZW1EYXRhPy5uYW1lXHJcbiAgICB0aGlzLnNlbGVjdGVkTmFtZUNoYW5nZS5lbWl0KGFyZ3MuaXRlbURhdGE/Lm5hbWUgfHwgJycpXHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdChhcmdzLml0ZW1EYXRhPy5ndWlkKTtcclxuICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KGFyZ3MuaXRlbURhdGE/Lmd1aWQpO1xyXG4gICAgdGhpcy5jaGFuZ2UuZW1pdChhcmdzKTtcclxuICB9XHJcbiAgb25OZ01vZGVsQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG4gIG9uYmx1cihlKSB7XHJcbiAgICB0aGlzLm9uYmx1ckNoYW5nZS5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=