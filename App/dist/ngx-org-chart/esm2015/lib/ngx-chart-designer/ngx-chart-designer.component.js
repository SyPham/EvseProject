import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../ngx-chart-node/ngx-chart-node.component";
function NgxChartDesignerComponent_ngx_chart_node_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ngx-chart-node", 2);
    i0.ɵɵlistener("itemClick", function NgxChartDesignerComponent_ngx_chart_node_0_Template_ngx_chart_node_itemClick_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.itemClick.emit($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("ngClass", "ngx-org-", ctx_r0.direction, "");
    i0.ɵɵproperty("node", ctx_r0.node)("hasParent", ctx_r0.hasParent)("direction", ctx_r0.direction);
} }
function NgxChartDesignerComponent_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵelementStart(2, "div", 6);
    i0.ɵɵelement(3, "div", 7);
    i0.ɵɵelement(4, "div", 8);
    i0.ɵɵelement(5, "div", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "ngx-chart-designer", 9);
    i0.ɵɵlistener("itemClick", function NgxChartDesignerComponent_div_1_ng_container_1_Template_ngx_chart_designer_itemClick_6_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.itemClick.emit($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childNode_r5 = ctx.$implicit;
    const isFirst_r6 = ctx.first;
    const isLast_r7 = ctx.last;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("ngClass", "ngx-org-org-container-", ctx_r4.direction, "");
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("ngClass", "ngx-org-connector-container-", ctx_r4.direction, "");
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("border-color", isFirst_r6 ? "transparent" : "");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("border-color", isLast_r7 ? "transparent" : "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("node", childNode_r5)("hasParent", true)("direction", ctx_r4.direction);
} }
function NgxChartDesignerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, NgxChartDesignerComponent_div_1_ng_container_1_Template, 7, 9, "ng-container", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("ngClass", "ngx-org-reports-", ctx_r1.direction, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.node == null ? null : ctx_r1.node.childs);
} }
export class NgxChartDesignerComponent {
    constructor() {
        this.hasParent = false;
        this.direction = 'vertical';
        this.itemClick = new EventEmitter();
    }
    get hostClass() {
        return this.direction === 'vertical' ? 'column' : '';
    }
}
/** @nocollapse */ NgxChartDesignerComponent.ɵfac = function NgxChartDesignerComponent_Factory(t) { return new (t || NgxChartDesignerComponent)(); };
/** @nocollapse */ NgxChartDesignerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxChartDesignerComponent, selectors: [["ngx-chart-designer"]], hostVars: 2, hostBindings: function NgxChartDesignerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("flex-direction", ctx.hostClass);
    } }, inputs: { node: "node", hasParent: "hasParent", direction: "direction" }, outputs: { itemClick: "itemClick" }, decls: 2, vars: 2, consts: [[3, "ngClass", "node", "hasParent", "direction", "itemClick", 4, "ngIf"], ["class", "ngx-org-reports", 3, "ngClass", 4, "ngIf"], [3, "ngClass", "node", "hasParent", "direction", "itemClick"], [1, "ngx-org-reports", 3, "ngClass"], [4, "ngFor", "ngForOf"], [1, "ngx-org-org-container", 3, "ngClass"], [1, "ngx-org-connector-container", 3, "ngClass"], [1, "ngx-org-connector", "ngx-org-border"], [1, "ngx-org-border"], [3, "node", "hasParent", "direction", "itemClick"]], template: function NgxChartDesignerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NgxChartDesignerComponent_ngx_chart_node_0_Template, 1, 4, "ngx-chart-node", 0);
        i0.ɵɵtemplate(1, NgxChartDesignerComponent_div_1_Template, 2, 2, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.node);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.node == null ? null : ctx.node.childs == null ? null : ctx.node.childs.length);
    } }, directives: [i1.NgIf, i2.NgxChartNodeComponent, i1.NgClass, i1.NgForOf, NgxChartDesignerComponent], styles: ["[_nghost-%COMP%]{display:flex;align-items:center;flex:1}.ngx-org-vertical[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-org-container[_ngcontent-%COMP%]{display:flex}.ngx-org-org-container-vertical[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-connector[_ngcontent-%COMP%]{flex:1}.ngx-org-connector-container[_ngcontent-%COMP%]{display:flex}.ngx-org-connector-container-horizontal[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-reports[_ngcontent-%COMP%]{display:flex;flex:1}.ngx-org-reports-horizontal[_ngcontent-%COMP%]{flex-direction:column}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChartDesignerComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-chart-designer',
                templateUrl: './ngx-chart-designer.component.html',
                styleUrls: ['./ngx-chart-designer.component.scss']
            }]
    }], null, { node: [{
            type: Input
        }], hasParent: [{
            type: Input
        }], direction: [{
            type: Input
        }], itemClick: [{
            type: Output
        }], hostClass: [{
            type: HostBinding,
            args: ['style.flex-direction']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0LWRlc2lnbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1vcmctY2hhcnQvc3JjL2xpYi9uZ3gtY2hhcnQtZGVzaWduZXIvbmd4LWNoYXJ0LWRlc2lnbmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1vcmctY2hhcnQvc3JjL2xpYi9uZ3gtY2hhcnQtZGVzaWduZXIvbmd4LWNoYXJ0LWRlc2lnbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUNBcEYseUNBQytEO0lBQXJDLHVNQUFhLDZCQUFzQixJQUFDO0lBQzlELGlCQUFpQjs7O0lBRlksc0VBQStCO0lBQUMsa0NBQWEsK0JBQUEsK0JBQUE7Ozs7SUFLeEUsNkJBQXVGO0lBQ3JGLDhCQUFpRjtJQUMvRSw4QkFBNkY7SUFDM0YseUJBQW9HO0lBQ3BHLHlCQUFrQztJQUNsQyx5QkFBbUc7SUFDckcsaUJBQU07SUFDTiw2Q0FBdUg7SUFBckMsZ05BQWEsNkJBQXNCLElBQUM7SUFDdEgsaUJBQXFCO0lBQ3ZCLGlCQUFNO0lBQ1IsMEJBQWU7Ozs7OztJQVRSLGVBQTZDO0lBQTdDLG9GQUE2QztJQUMzQyxlQUFtRDtJQUFuRCwwRkFBbUQ7SUFDUixlQUErQztJQUEvQywrREFBK0M7SUFFL0MsZUFBOEM7SUFBOUMsOERBQThDO0lBRTFFLGVBQWtCO0lBQWxCLG1DQUFrQixtQkFBQSwrQkFBQTs7O0lBUjVDLDhCQUFrRztJQUNoRyxrR0FVZTtJQUNqQixpQkFBTTs7O0lBWjRCLDhFQUF1QztJQUNuQyxlQUFpQjtJQUFqQix5RUFBaUI7O0FESXZELE1BQU0sT0FBTyx5QkFBeUI7SUFMdEM7UUFXRSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLGNBQVMsR0FBOEIsVUFBVSxDQUFDO1FBRXhDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO0tBTWpEO0lBSkMsSUFDSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7cUhBaEJVLHlCQUF5QjtpRkFBekIseUJBQXlCOzs7UUNUdEMsZ0dBRWlCO1FBRWpCLDBFQVlNOztRQWhCVywrQkFBVTtRQUlyQixlQUEwQjtRQUExQix3R0FBMEI7aUZES25CLHlCQUF5Qjt1RkFBekIseUJBQXlCO2NBTHJDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxTQUFTLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQzthQUNuRDtnQkFJQyxJQUFJO2tCQURILEtBQUs7WUFJTixTQUFTO2tCQURSLEtBQUs7WUFJTixTQUFTO2tCQURSLEtBQUs7WUFHSSxTQUFTO2tCQUFsQixNQUFNO1lBR0gsU0FBUztrQkFEWixXQUFXO21CQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSU5vZGUgfSBmcm9tICcuLi9ub2RlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0LWRlc2lnbmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWNoYXJ0LWRlc2lnbmVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtY2hhcnQtZGVzaWduZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4Q2hhcnREZXNpZ25lckNvbXBvbmVudCB7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgbm9kZTogSU5vZGU7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgaGFzUGFyZW50ID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZGlyZWN0aW9uOiAndmVydGljYWwnIHwgJ2hvcml6b250YWwnID0gJ3ZlcnRpY2FsJztcclxuXHJcbiAgQE91dHB1dCgpIGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8SU5vZGU+KCk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKVxyXG4gIGdldCBob3N0Q2xhc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyAnY29sdW1uJyA6ICcnO1xyXG4gIH1cclxufVxyXG4iLCI8bmd4LWNoYXJ0LW5vZGUgKm5nSWY9XCJub2RlXCIgbmdDbGFzcz1cIm5neC1vcmcte3tkaXJlY3Rpb259fVwiIFtub2RlXT1cIm5vZGVcIiBbaGFzUGFyZW50XT1cImhhc1BhcmVudFwiXHJcbiAgW2RpcmVjdGlvbl09XCJkaXJlY3Rpb25cIiAoaXRlbUNsaWNrKT1cIml0ZW1DbGljay5lbWl0KCRldmVudClcIj5cclxuPC9uZ3gtY2hhcnQtbm9kZT5cclxuXHJcbjxkaXYgKm5nSWY9XCJub2RlPy5jaGlsZHM/Lmxlbmd0aFwiIG5nQ2xhc3M9XCJuZ3gtb3JnLXJlcG9ydHMte3tkaXJlY3Rpb259fVwiIGNsYXNzPVwibmd4LW9yZy1yZXBvcnRzXCI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGROb2RlIG9mIG5vZGU/LmNoaWxkczsgZmlyc3QgYXMgaXNGaXJzdDsgbGFzdCBhcyBpc0xhc3RcIj5cclxuICAgIDxkaXYgbmdDbGFzcz1cIm5neC1vcmctb3JnLWNvbnRhaW5lci17e2RpcmVjdGlvbn19XCIgY2xhc3M9XCJuZ3gtb3JnLW9yZy1jb250YWluZXJcIj5cclxuICAgICAgPGRpdiBuZ0NsYXNzPVwibmd4LW9yZy1jb25uZWN0b3ItY29udGFpbmVyLXt7ZGlyZWN0aW9ufX1cIiBjbGFzcz1cIm5neC1vcmctY29ubmVjdG9yLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtb3JnLWNvbm5lY3RvciBuZ3gtb3JnLWJvcmRlclwiIFtzdHlsZS5ib3JkZXItY29sb3JdPVwiaXNGaXJzdD8ndHJhbnNwYXJlbnQnOicnXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC1vcmctYm9yZGVyXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC1vcmctY29ubmVjdG9yIG5neC1vcmctYm9yZGVyXCIgW3N0eWxlLmJvcmRlci1jb2xvcl09XCJpc0xhc3Q/J3RyYW5zcGFyZW50JzonJ1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPG5neC1jaGFydC1kZXNpZ25lciBbbm9kZV09XCJjaGlsZE5vZGVcIiBbaGFzUGFyZW50XT1cInRydWVcIiBbZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiIChpdGVtQ2xpY2spPVwiaXRlbUNsaWNrLmVtaXQoJGV2ZW50KVwiPlxyXG4gICAgICA8L25neC1jaGFydC1kZXNpZ25lcj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L2Rpdj5cclxuIl19