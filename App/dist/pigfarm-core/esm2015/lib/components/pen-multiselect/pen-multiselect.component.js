import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export class PenMultiselectComponent {
    constructor(baseUrl, trans) {
        this.baseUrl = baseUrl;
        this.trans = trans;
        this.id = "pen-multi";
        this.selectedData = [];
        this.placeholder = "";
        this.roomGuid = "";
        this.disabled = false;
        this.change = new EventEmitter();
        this.ngModelChange = new EventEmitter();
        this.selectedValueChange = new EventEmitter();
        this.onblurChange = new EventEmitter();
        this.popupHeight = '350px';
        this.remoteFields = { text: 'name', value: 'guid' };
        this.take = 10;
        this.skip = 0;
        this.onFiltering = (e) => {
            if (e.text === '') {
                e.updateData(this.data);
            }
            else {
                const query = this.dropdownObj.query.clone().search(e.text, ['penName', 'penNo']);
                e.updateData(this.data, query);
            }
        };
    }
    actionComplete(e) {
        e.result = e.result.filter(x => x.guid != "");
    }
    ngOnInit() {
        this.query = new Query()
            .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
            .where('status', 'equal', 1);
        if (this.roomGuid) {
            this.query.where('roomGuid', 'equal', this.roomGuid);
        }
        this.data = new DataManager({
            url: `${this.baseUrl}Pen/GetDataDropdownlist`,
            adaptor: new UrlAdaptor,
            crossDomain: true,
        }, this.query);
    }
    ngOnChanges(changes) {
    }
    onChange(args) {
        this.change.emit(args);
    }
    onNgModelChange(value) {
        this.ngModelChange.emit(value);
        this.selectedValueChange.emit(value);
    }
}
PenMultiselectComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pen-multiselect',
                template: "<ejs-multiselect\r\n  #penmulti\r\n  [id]=\"id\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  mode=\"CheckBox\"\r\n  [popupHeight]=\"popupHeight\"\r\n  [showDropDownIcon]=\"true\"\r\n  [(ngModel)]=\"selectedData\"\r\n  [disabled]=\"disabled\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  (change)=\"onChange($event)\"\r\n  showSelectAll=\"true\"\r\n></ejs-multiselect>\r\n",
                styles: [""]
            },] }
];
PenMultiselectComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: TranslateService }
];
PenMultiselectComponent.propDecorators = {
    id: [{ type: Input }],
    selectedData: [{ type: Input }],
    placeholder: [{ type: Input }],
    roomGuid: [{ type: Input }],
    disabled: [{ type: Input }],
    change: [{ type: Output }],
    ngModelChange: [{ type: Output }],
    selectedValueChange: [{ type: Output }],
    onblurChange: [{ type: Output, args: ['onblur',] }],
    dropdownObj: [{ type: ViewChild, args: ['penmulti',] }],
    data: [{ type: Input }],
    query: [{ type: Input }],
    popupHeight: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuLW11bHRpc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvcGVuLW11bHRpc2VsZWN0L3Blbi1tdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1SCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU92RCxNQUFNLE9BQU8sdUJBQXVCO0lBOEJsQyxZQUFtQyxPQUFPLEVBQVEsS0FBdUI7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUFRLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBN0JoRSxPQUFFLEdBQUcsV0FBVyxDQUFDO1FBQ2pCLGlCQUFZLEdBQU0sRUFBRSxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3RDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUloRCxnQkFBVyxHQUFHLE9BQU8sQ0FBQztRQUN4QixpQkFBWSxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFRixnQkFBVyxHQUFRLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRTtnQkFDakIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEYsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDO0lBSTBFLENBQUM7SUFIdEUsY0FBYyxDQUFDLENBQU07UUFDMUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdDLFFBQVE7UUFFTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO2FBQ3ZCLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDNUQsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQztZQUMxQixHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyx5QkFBeUI7WUFDN0MsT0FBTyxFQUFFLElBQUksVUFBVTtZQUN2QixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO0lBQ2xDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQTNERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsbWVBQStDOzthQUVoRDs7OzRDQStCYyxNQUFNLFNBQUMsS0FBSztZQXJDbEIsZ0JBQWdCOzs7aUJBUXRCLEtBQUs7MkJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxNQUFNOzRCQUNOLE1BQU07a0NBQ04sTUFBTTsyQkFDTixNQUFNLFNBQUMsUUFBUTswQkFDZixTQUFTLFNBQUMsVUFBVTttQkFDcEIsS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgRGF0YU1hbmFnZXIsIFF1ZXJ5LCBVcmxBZGFwdG9yIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdENvbXBvbmVudCB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXBlbi1tdWx0aXNlbGVjdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Blbi1tdWx0aXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGVuLW11bHRpc2VsZWN0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFBlbk11bHRpc2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGlkID0gXCJwZW4tbXVsdGlcIjtcclxuICBASW5wdXQoKSBzZWxlY3RlZERhdGE6IGFueT1bXTtcclxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgQElucHV0KCkgcm9vbUd1aWQgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBuZ01vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkVmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCdvbmJsdXInKSBvbmJsdXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAVmlld0NoaWxkKCdwZW5tdWx0aScpIHB1YmxpYyBkcm9wZG93bk9iajogRHJvcERvd25MaXN0Q29tcG9uZW50XHJcbiAgQElucHV0KCkgZGF0YTogRGF0YU1hbmFnZXI7XHJcbiAgQElucHV0KCkgcXVlcnk6IFF1ZXJ5IDtcclxuICBASW5wdXQoKSBwb3B1cEhlaWdodCA9ICczNTBweCc7XHJcbiAgcHVibGljIHJlbW90ZUZpZWxkczogT2JqZWN0ID0geyB0ZXh0OiAnbmFtZScsIHZhbHVlOiAnZ3VpZCcgfTtcclxuICBcclxuICB0YWtlID0gMTA7XHJcbiAgc2tpcCA9IDA7XHJcblxyXG4gIHB1YmxpYyBvbkZpbHRlcmluZzogYW55ID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUudGV4dCA9PT0gJycpIHtcclxuICAgICAgZS51cGRhdGVEYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZHJvcGRvd25PYmoucXVlcnkuY2xvbmUoKS5zZWFyY2goZS50ZXh0LCBbJ3Blbk5hbWUnLCAncGVuTm8nXSk7XHJcbiAgICAgIGUudXBkYXRlRGF0YSh0aGlzLmRhdGEsIHF1ZXJ5KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHB1YmxpYyBhY3Rpb25Db21wbGV0ZShlOiBhbnkpOiB2b2lkIHtcclxuICAgIGUucmVzdWx0ID0gZS5yZXN1bHQuZmlsdGVyKHg9PiB4Lmd1aWQgIT0gXCJcIik7XHJcbn1cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFwiRW52XCIpIHByaXZhdGUgYmFzZVVybCxwdWJsaWMgdHJhbnM6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKVxyXG4gICAgLndoZXJlKCdmYXJtR3VpZCcsICdlcXVhbCcsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXJtR3VpZCcpKVxyXG4gICAgLndoZXJlKCdzdGF0dXMnLCAnZXF1YWwnLCAxKTtcclxuICAgIGlmICh0aGlzLnJvb21HdWlkKSB7XHJcbiAgICAgIHRoaXMucXVlcnkud2hlcmUoJ3Jvb21HdWlkJywgJ2VxdWFsJywgdGhpcy5yb29tR3VpZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRhdGEgPSBuZXcgRGF0YU1hbmFnZXIoe1xyXG4gICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH1QZW4vR2V0RGF0YURyb3Bkb3dubGlzdGAsXHJcbiAgICAgIGFkYXB0b3I6IG5ldyBVcmxBZGFwdG9yLFxyXG4gICAgICBjcm9zc0RvbWFpbjogdHJ1ZSxcclxuICAgIH0sIHRoaXMucXVlcnkpO1xyXG4gIH1cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgfVxyXG4gIG9uQ2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuY2hhbmdlLmVtaXQoYXJncyk7XHJcbiAgfVxyXG4gIG9uTmdNb2RlbENoYW5nZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19