import { Component, Inject } from '@angular/core';
export class DynamicGridComponent {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    ngOnInit() {
    }
}
DynamicGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-dynamic-grid',
                template: "<p>\r\n  dynamic-grid works!\r\n</p>\r\n",
                styles: [""]
            },] }
];
DynamicGridComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpZ2Zhcm0tY29yZS9zcmMvbGliL2NvbXBvbmVudHMvZHluYW1pYy1ncmlkL2R5bmFtaWMtZ3JpZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPMUQsTUFBTSxPQUFPLG9CQUFvQjtJQUUvQixZQUFtQyxPQUFPO1FBQVAsWUFBTyxHQUFQLE9BQU8sQ0FBQTtJQUFLLENBQUM7SUFFaEQsUUFBUTtJQUNSLENBQUM7OztZQVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixvREFBNEM7O2FBRTdDOzs7NENBR2MsTUFBTSxTQUFDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAsSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1keW5hbWljLWdyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWdyaWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2R5bmFtaWMtZ3JpZC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJFbnZcIikgcHJpdmF0ZSBiYXNlVXJsLCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19