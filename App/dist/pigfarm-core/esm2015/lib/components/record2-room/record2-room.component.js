import { Component, Inject } from '@angular/core';
export class Record2RoomComponent {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    ngOnInit() {
    }
}
Record2RoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-record2-room',
                template: "<p>\r\n  record2-room works!\r\n</p>\r\n",
                styles: [""]
            },] }
];
Record2RoomComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkMi1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvcmVjb3JkMi1yb29tL3JlY29yZDItcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPMUQsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUFtQyxPQUFPO1FBQVAsWUFBTyxHQUFQLE9BQU8sQ0FBQTtJQUFLLENBQUM7SUFFaEQsUUFBUTtJQUNSLENBQUM7OztZQVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvREFBNEM7O2FBRTdDOzs7NENBR2MsTUFBTSxTQUFDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1yZWNvcmQyLXJvb20nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWNvcmQyLXJvb20uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3JlY29yZDItcm9vbS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlY29yZDJSb29tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChcIkVudlwiKSBwcml2YXRlIGJhc2VVcmwsKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=