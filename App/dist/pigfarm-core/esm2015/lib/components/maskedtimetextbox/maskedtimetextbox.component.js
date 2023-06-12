import { ChangeDetectorRef, Component, EventEmitter, Input, Output, Inject } from '@angular/core';
export class MaskedtimetextboxComponent {
    constructor(baseUrl, cdRef) {
        this.baseUrl = baseUrl;
        this.cdRef = cdRef;
        this.disabled = true;
        this.selectedValue = "";
        this.id = Math.random();
        this.selectedValueChange = new EventEmitter();
        this.onblurChange = new EventEmitter();
    }
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
    ngOnInit() {
    }
    onChange(args) {
        var _a;
        this.selectedValue = args.value || "";
        if (((_a = this.selectedValue) === null || _a === void 0 ? void 0 : _a.length) === 4) {
            let array = this.selectedValue.split('');
            this.selectedValue = `${array[0]}${array[1]}:${array[2]}${array[3]}`;
        }
        this.selectedValueChange.emit(this.selectedValue);
    }
    onblur(e) {
        this.onblurChange.emit(e);
    }
}
MaskedtimetextboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-maskedtimetextbox',
                template: "<ejs-maskedtextbox\r\n  [id]=\"id\"\r\n  [enabled]=\"disabled\"\r\n  (blur)='onblur($event)'\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  mask=\"[0-2][0-9]:[0-5][0-9]\"\r\n></ejs-maskedtextbox>\r\n",
                styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
            },] }
];
MaskedtimetextboxComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: ChangeDetectorRef }
];
MaskedtimetextboxComponent.propDecorators = {
    disabled: [{ type: Input }],
    selectedValue: [{ type: Input }],
    selectedValueChange: [{ type: Output }],
    onblurChange: [{ type: Output, args: ['onblur',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza2VkdGltZXRleHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9tYXNrZWR0aW1ldGV4dGJveC9tYXNrZWR0aW1ldGV4dGJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzVILE1BQU0sT0FBTywwQkFBMEI7SUFNckMsWUFBbUMsT0FBTyxFQUFTLEtBQXVCO1FBQXZDLFlBQU8sR0FBUCxPQUFPLENBQUE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUxqRSxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQzVCLE9BQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDVCx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3RDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUNxQixDQUFDO0lBQy9FLGtCQUFrQjtRQUVoQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCxRQUFRO0lBQ1IsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFJOztRQUNYLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLE1BQU0sTUFBSyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxLQUFLLEdBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7O1lBNUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw2T0FBaUQ7O2FBRWxEOzs7NENBT2MsTUFBTSxTQUFDLEtBQUs7WUFiQSxpQkFBaUI7Ozt1QkFRekMsS0FBSzs0QkFDTCxLQUFLO2tDQUVMLE1BQU07MkJBQ04sTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1tYXNrZWR0aW1ldGV4dGJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hc2tlZHRpbWV0ZXh0Ym94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYXNrZWR0aW1ldGV4dGJveC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hc2tlZHRpbWV0ZXh0Ym94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkIHtcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IHRydWU7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZSA9IFwiXCI7XHJcbiAgaWQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgnb25ibHVyJykgb25ibHVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwscHJpdmF0ZSBjZFJlZjpDaGFuZ2VEZXRlY3RvclJlZikgeyB9XHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKClcclxuICB7XHJcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgfVxyXG4gIG9uQ2hhbmdlKGFyZ3MpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGFyZ3MudmFsdWUgfHwgXCJcIjtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkVmFsdWU/Lmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICBsZXQgYXJyYXkgPSAgdGhpcy5zZWxlY3RlZFZhbHVlLnNwbGl0KCcnKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gYCR7YXJyYXlbMF19JHthcnJheVsxXX06JHthcnJheVsyXX0ke2FycmF5WzNdfWA7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVmFsdWUpO1xyXG4gIH1cclxuICBvbmJsdXIoZSkge1xyXG4gICAgdGhpcy5vbmJsdXJDaGFuZ2UuZW1pdChlKTtcclxuICB9XHJcbn1cclxuIl19