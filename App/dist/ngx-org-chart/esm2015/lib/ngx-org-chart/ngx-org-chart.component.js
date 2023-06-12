import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../ngx-chart-designer/ngx-chart-designer.component";
function NgxOrgChartComponent_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵelementStart(2, "ngx-chart-designer", 2);
    i0.ɵɵlistener("itemClick", function NgxOrgChartComponent_div_0_ng_container_1_Template_ngx_chart_designer_itemClick_2_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.itemClick.emit($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const node_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵclassMapInterpolate1("ngx-org-self-", ctx_r1.direction, "");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("node", node_r2)("direction", ctx_r1.direction);
} }
function NgxOrgChartComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, NgxOrgChartComponent_div_0_ng_container_1_Template, 3, 5, "ng-container", 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.nodes);
} }
export class NgxOrgChartComponent {
    constructor() {
        this.hasParent = false;
        this.direction = 'vertical';
        this.itemClick = new EventEmitter();
    }
}
/** @nocollapse */ NgxOrgChartComponent.ɵfac = function NgxOrgChartComponent_Factory(t) { return new (t || NgxOrgChartComponent)(); };
/** @nocollapse */ NgxOrgChartComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxOrgChartComponent, selectors: [["ngx-org-chart"]], inputs: { nodes: "nodes", hasParent: "hasParent", direction: "direction" }, outputs: { itemClick: "itemClick" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "node", "direction", "itemClick"]], template: function NgxOrgChartComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NgxOrgChartComponent_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.nodes == null ? null : ctx.nodes.length);
    } }, directives: [i1.NgIf, i1.NgForOf, i2.NgxChartDesignerComponent], styles: ["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{display:flex;flex:1}.ngx-org-name[_ngcontent-%COMP%]{font-family:Patua One,cursive}.ngx-org-title[_ngcontent-%COMP%]{font-family:Oswald,sans-serif}.ngx-org-border[_ngcontent-%COMP%]{border-color:#9e9e9e}.ngx-org-box[_ngcontent-%COMP%]{color:#000;width:10em}.ngx-org-self-vertical[_ngcontent-%COMP%]{margin-bottom:2%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxOrgChartComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-org-chart',
                templateUrl: './ngx-org-chart.component.html',
                styleUrls: ['./ngx-org-chart.component.scss']
            }]
    }], null, { nodes: [{
            type: Input
        }], hasParent: [{
            type: Input
        }], direction: [{
            type: Input
        }], itemClick: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW9yZy1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtb3JnLWNoYXJ0L3NyYy9saWIvbmd4LW9yZy1jaGFydC9uZ3gtb3JnLWNoYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1vcmctY2hhcnQvc3JjL2xpYi9uZ3gtb3JnLWNoYXJ0L25neC1vcmctY2hhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDQ3JFLDZCQUF5QztJQUN2QywyQkFBd0M7SUFDdEMsNkNBQStGO0lBQXJDLDJNQUFhLDZCQUFzQixJQUFDO0lBQUMsaUJBQXFCO0lBQ3RILGlCQUFNO0lBQ1IsMEJBQWU7Ozs7SUFIUixlQUFrQztJQUFsQyxnRUFBa0M7SUFDakIsZUFBYTtJQUFiLDhCQUFhLCtCQUFBOzs7SUFIdkMsMkJBQTJCO0lBQ3pCLDZGQUllO0lBQ2pCLGlCQUFNOzs7SUFMMkIsZUFBUTtJQUFSLHNDQUFROztBRFF6QyxNQUFNLE9BQU8sb0JBQW9CO0lBTGpDO1FBV0UsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUdsQixjQUFTLEdBQThCLFVBQVUsQ0FBQztRQUV4QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztLQUNqRDs7MkdBWlksb0JBQW9COzRFQUFwQixvQkFBb0I7UUNUakMscUVBTU07O1FBTkEsa0VBQW1COzt1RkRTWixvQkFBb0I7Y0FMaEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsZ0NBQWdDO2dCQUM3QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQzthQUM5QztnQkFJQyxLQUFLO2tCQURKLEtBQUs7WUFJTixTQUFTO2tCQURSLEtBQUs7WUFJTixTQUFTO2tCQURSLEtBQUs7WUFHSSxTQUFTO2tCQUFsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElOb2RlIH0gZnJvbSAnLi4vbm9kZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1vcmctY2hhcnQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtb3JnLWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtb3JnLWNoYXJ0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE9yZ0NoYXJ0Q29tcG9uZW50IHtcclxuXHJcbiAgQElucHV0KClcclxuICBub2RlczogSU5vZGVbXTtcclxuXHJcbiAgQElucHV0KClcclxuICBoYXNQYXJlbnQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KClcclxuICBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgPSAndmVydGljYWwnO1xyXG5cclxuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxJTm9kZT4oKTtcclxufVxyXG4iLCI8ZGl2ICpuZ0lmPVwibm9kZXM/Lmxlbmd0aFwiPlxyXG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG5vZGUgb2Ygbm9kZXNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtb3JnLXNlbGYte3tkaXJlY3Rpb259fVwiPlxyXG4gICAgICA8bmd4LWNoYXJ0LWRlc2lnbmVyIFtub2RlXT1cIm5vZGVcIiBbZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiIChpdGVtQ2xpY2spPVwiaXRlbUNsaWNrLmVtaXQoJGV2ZW50KVwiPjwvbmd4LWNoYXJ0LWRlc2lnbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvZGl2PlxyXG4iXX0=