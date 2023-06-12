import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
export class MyCheckboxComponent {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.label = '';
        this.checkedChange = new EventEmitter();
        this.checkedValue = false;
    }
    ngOnChanges(changes) {
        if (this.checked != changes.checked.currentValue) {
            this.checked = changes.checked.currentValue;
            this.checkedValue = this.checked === 1 ? true : false;
        }
        if (changes.checked.firstChange) {
            this.checked = changes.checked.currentValue;
            this.checkedValue = this.checked === 1 ? true : false;
        }
    }
    ngOnInit() {
    }
    onCheckedChange(value) {
        this.checked = value === true ? 1 : 0;
        console.log(this.checked);
        this.checkedChange.emit(this.checked);
    }
}
MyCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-my-checkbox',
                template: "<ejs-checkbox [label]=\"label\" [(ngModel)]=\"checkedValue\" (ngModelChange)=\"onCheckedChange($event)\"></ejs-checkbox>\r\n",
                styles: [""]
            },] }
];
MyCheckboxComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] }
];
MyCheckboxComponent.propDecorators = {
    checked: [{ type: Input }],
    label: [{ type: Input }],
    checkedChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9teS1jaGVja2JveC9teS1jaGVja2JveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9qSCxNQUFNLE9BQU8sbUJBQW1CO0lBSzlCLFlBQW1DLE9BQU87UUFBUCxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBSGpDLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDZixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDbEQsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFDMEIsQ0FBQztJQUNoRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkQ7UUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBRUQsUUFBUTtJQUNSLENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN2QyxDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHdJQUEyQzs7YUFFNUM7Ozs0Q0FNYyxNQUFNLFNBQUMsS0FBSzs7O3NCQUp4QixLQUFLO29CQUNMLEtBQUs7NEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1teS1jaGVja2JveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL215LWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9teS1jaGVja2JveC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE15Q2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgY2hlY2tlZDogYW55O1xyXG4gIEBJbnB1dCgpIGxhYmVsOiBhbnkgPSAnJztcclxuICBAT3V0cHV0KCkgY2hlY2tlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIGNoZWNrZWRWYWx1ZSA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLCkgeyB9XHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2hlY2tlZCAhPSBjaGFuZ2VzLmNoZWNrZWQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tlZCA9IGNoYW5nZXMuY2hlY2tlZC5jdXJyZW50VmFsdWU7XHJcbiAgICAgIHRoaXMuY2hlY2tlZFZhbHVlID0gdGhpcy5jaGVja2VkID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGNoYW5nZXMuY2hlY2tlZC5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLmNoZWNrZWQgPSBjaGFuZ2VzLmNoZWNrZWQuY3VycmVudFZhbHVlO1xyXG4gICAgICB0aGlzLmNoZWNrZWRWYWx1ZSA9IHRoaXMuY2hlY2tlZCA9PT0gMSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuICBvbkNoZWNrZWRDaGFuZ2UodmFsdWUpIHtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlID09PSB0cnVlID8gMSA6IDA7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoZWNrZWQpO1xyXG4gICAgdGhpcy5jaGVja2VkQ2hhbmdlLmVtaXQodGhpcy5jaGVja2VkKVxyXG4gIH1cclxufVxyXG4iXX0=