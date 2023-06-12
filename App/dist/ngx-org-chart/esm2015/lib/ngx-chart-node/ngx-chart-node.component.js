import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function NgxChartNodeComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("ngClass", "ngx-org-connector-", ctx_r0.direction, "");
} }
const _c0 = function (a0) { return { "background-image": a0 }; };
function NgxChartNodeComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(1, _c0, "url('" + (ctx_r1.node == null ? null : ctx_r1.node.image) + "')"));
} }
function NgxChartNodeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 5);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate1("ngClass", "ngx-org-connector-", ctx_r2.direction, "");
} }
export class NgxChartNodeComponent {
    constructor() {
        this.hasParent = false;
        this.direction = 'vertical';
        this.itemClick = new EventEmitter();
    }
}
/** @nocollapse */ NgxChartNodeComponent.ɵfac = function NgxChartNodeComponent_Factory(t) { return new (t || NgxChartNodeComponent)(); };
/** @nocollapse */ NgxChartNodeComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgxChartNodeComponent, selectors: [["ngx-chart-node"]], inputs: { node: "node", hasParent: "hasParent", direction: "direction" }, outputs: { itemClick: "itemClick" }, decls: 9, vars: 6, consts: [["class", "ngx-org-border", 3, "ngClass", 4, "ngIf"], [1, "ngx-org-box", "ngx-org-border", "ngx-org-background", 3, "ngClass", "click"], ["class", "ngx-org-image ngx-org-border", 3, "ngStyle", 4, "ngIf"], [1, "ngx-org-name"], [1, "ngx-org-title"], [1, "ngx-org-border", 3, "ngClass"], [1, "ngx-org-image", "ngx-org-border", 3, "ngStyle"]], template: function NgxChartNodeComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NgxChartNodeComponent_div_0_Template, 1, 1, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵlistener("click", function NgxChartNodeComponent_Template_div_click_1_listener() { return ctx.itemClick.emit(ctx.node); });
        i0.ɵɵtemplate(2, NgxChartNodeComponent_div_2_Template, 1, 3, "div", 2);
        i0.ɵɵelementStart(3, "div");
        i0.ɵɵelementStart(4, "div", 3);
        i0.ɵɵtext(5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 4);
        i0.ɵɵtext(7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(8, NgxChartNodeComponent_div_8_Template, 1, 1, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasParent);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.node == null ? null : ctx.node.cssClass);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.node == null ? null : ctx.node.image);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate(ctx.node == null ? null : ctx.node.name);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.node == null ? null : ctx.node.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.node == null ? null : ctx.node.childs == null ? null : ctx.node.childs.length);
    } }, directives: [i1.NgIf, i1.NgClass, i1.NgStyle], styles: [".ngx-org-box[_ngcontent-%COMP%], [_nghost-%COMP%]{display:flex;align-items:center}.ngx-org-box[_ngcontent-%COMP%]{cursor:pointer}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChartNodeComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-chart-node',
                templateUrl: './ngx-chart-node.component.html',
                styleUrls: ['./ngx-chart-node.component.scss']
            }]
    }], null, { node: [{
            type: Input
        }], hasParent: [{
            type: Input
        }], direction: [{
            type: Input
        }], itemClick: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoYXJ0LW5vZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW9yZy1jaGFydC9zcmMvbGliL25neC1jaGFydC1ub2RlL25neC1jaGFydC1ub2RlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1vcmctY2hhcnQvc3JjL2xpYi9uZ3gtY2hhcnQtbm9kZS9uZ3gtY2hhcnQtbm9kZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0lDQXZFLHlCQUE4Rjs7O0lBQXpGLGdGQUF5Qzs7OztJQUU1Qyx5QkFFTTs7O0lBREosdUhBQThEOzs7SUFPbEUseUJBQXlHOzs7SUFBcEcsZ0ZBQXlDOztBREQ5QyxNQUFNLE9BQU8scUJBQXFCO0lBTGxDO1FBV0UsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUdsQixjQUFTLEdBQThCLFVBQVUsQ0FBQztRQUV4QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztLQUNqRDs7NkdBWlkscUJBQXFCOzZFQUFyQixxQkFBcUI7UUNUbEMsc0VBQThGO1FBQzlGLDhCQUFxSDtRQUEvQiwrRkFBUyw0QkFBb0IsSUFBQztRQUNsSCxzRUFFTTtRQUNOLDJCQUFLO1FBQ0gsOEJBQTBCO1FBQUEsWUFBYztRQUFBLGlCQUFNO1FBQzlDLDhCQUEyQjtRQUFBLFlBQWU7UUFBQSxpQkFBTTtRQUNsRCxpQkFBTTtRQUNSLGlCQUFNO1FBQ04sc0VBQXlHOztRQVZsQyxvQ0FBZTtRQUNqRixlQUEwQjtRQUExQixxRUFBMEI7UUFDdkIsZUFBaUI7UUFBakIsK0RBQWlCO1FBSUssZUFBYztRQUFkLDZEQUFjO1FBQ2IsZUFBZTtRQUFmLDhEQUFlO1FBR3lCLGVBQTBCO1FBQTFCLHdHQUEwQjs7dUZERHBGLHFCQUFxQjtjQUxqQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7YUFDL0M7Z0JBSUMsSUFBSTtrQkFESCxLQUFLO1lBSU4sU0FBUztrQkFEUixLQUFLO1lBSU4sU0FBUztrQkFEUixLQUFLO1lBR0ksU0FBUztrQkFBbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJTm9kZSB9IGZyb20gJy4uL25vZGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnQtbm9kZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1jaGFydC1ub2RlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtY2hhcnQtbm9kZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hDaGFydE5vZGVDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKVxyXG4gIG5vZGU6IElOb2RlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGhhc1BhcmVudCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyA9ICd2ZXJ0aWNhbCc7XHJcblxyXG4gIEBPdXRwdXQoKSBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPElOb2RlPigpO1xyXG59XHJcbiIsIjxkaXYgbmdDbGFzcz1cIm5neC1vcmctY29ubmVjdG9yLXt7ZGlyZWN0aW9ufX1cIiBjbGFzcz1cIm5neC1vcmctYm9yZGVyXCIgKm5nSWY9XCJoYXNQYXJlbnRcIj48L2Rpdj5cclxuPGRpdiBbbmdDbGFzc109XCJub2RlPy5jc3NDbGFzc1wiIGNsYXNzPVwibmd4LW9yZy1ib3ggbmd4LW9yZy1ib3JkZXIgbmd4LW9yZy1iYWNrZ3JvdW5kXCIgKGNsaWNrKT1cIml0ZW1DbGljay5lbWl0KG5vZGUpXCI+XHJcbiAgPGRpdiAqbmdJZj1cIm5vZGU/LmltYWdlXCIgY2xhc3M9XCJuZ3gtb3JnLWltYWdlIG5neC1vcmctYm9yZGVyXCJcclxuICAgIFtuZ1N0eWxlXT1cInsgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKFxcJycrIG5vZGU/LmltYWdlKydcXCcpJ31cIj5cclxuICA8L2Rpdj5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC1vcmctbmFtZVwiPnt7bm9kZT8ubmFtZX19PC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LW9yZy10aXRsZVwiPnt7bm9kZT8udGl0bGV9fTwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBuZ0NsYXNzPVwibmd4LW9yZy1jb25uZWN0b3Ite3tkaXJlY3Rpb259fVwiIGNsYXNzPVwibmd4LW9yZy1ib3JkZXJcIiAqbmdJZj1cIm5vZGU/LmNoaWxkcz8ubGVuZ3RoXCI+PC9kaXY+XHJcbiJdfQ==