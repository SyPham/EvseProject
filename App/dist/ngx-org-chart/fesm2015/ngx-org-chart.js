import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, HostBinding, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

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
class NgxChartNodeComponent {
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
class NgxChartDesignerComponent {
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
    } }, directives: [i1.NgIf, NgxChartNodeComponent, i1.NgClass, i1.NgForOf, NgxChartDesignerComponent], styles: ["[_nghost-%COMP%]{display:flex;align-items:center;flex:1}.ngx-org-vertical[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-org-container[_ngcontent-%COMP%]{display:flex}.ngx-org-org-container-vertical[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-connector[_ngcontent-%COMP%]{flex:1}.ngx-org-connector-container[_ngcontent-%COMP%]{display:flex}.ngx-org-connector-container-horizontal[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-reports[_ngcontent-%COMP%]{display:flex;flex:1}.ngx-org-reports-horizontal[_ngcontent-%COMP%]{flex-direction:column}"] });
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
class NgxOrgChartComponent {
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
    } }, directives: [i1.NgIf, i1.NgForOf, NgxChartDesignerComponent], styles: ["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{display:flex;flex:1}.ngx-org-name[_ngcontent-%COMP%]{font-family:Patua One,cursive}.ngx-org-title[_ngcontent-%COMP%]{font-family:Oswald,sans-serif}.ngx-org-border[_ngcontent-%COMP%]{border-color:#9e9e9e}.ngx-org-box[_ngcontent-%COMP%]{color:#000;width:10em}.ngx-org-self-vertical[_ngcontent-%COMP%]{margin-bottom:2%}"] });
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

class NgxChartNodeModule {
}
/** @nocollapse */ NgxChartNodeModule.ɵfac = function NgxChartNodeModule_Factory(t) { return new (t || NgxChartNodeModule)(); };
/** @nocollapse */ NgxChartNodeModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxChartNodeModule, bootstrap: [NgxChartNodeComponent] });
/** @nocollapse */ NgxChartNodeModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxChartNodeModule, { declarations: [NgxChartNodeComponent], imports: [CommonModule], exports: [NgxChartNodeComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChartNodeModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgxChartNodeComponent
                ],
                imports: [
                    CommonModule
                ],
                bootstrap: [NgxChartNodeComponent],
                exports: [NgxChartNodeComponent]
            }]
    }], null, null); })();

class NgxChartDesignerModule {
}
/** @nocollapse */ NgxChartDesignerModule.ɵfac = function NgxChartDesignerModule_Factory(t) { return new (t || NgxChartDesignerModule)(); };
/** @nocollapse */ NgxChartDesignerModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxChartDesignerModule, bootstrap: [NgxChartDesignerComponent] });
/** @nocollapse */ NgxChartDesignerModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            NgxChartNodeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxChartDesignerModule, { declarations: [NgxChartDesignerComponent], imports: [CommonModule,
        NgxChartNodeModule], exports: [NgxChartDesignerComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChartDesignerModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgxChartDesignerComponent
                ],
                imports: [
                    CommonModule,
                    NgxChartNodeModule
                ],
                bootstrap: [NgxChartDesignerComponent],
                exports: [NgxChartDesignerComponent]
            }]
    }], null, null); })();

class NgxOrgChartModule {
}
/** @nocollapse */ NgxOrgChartModule.ɵfac = function NgxOrgChartModule_Factory(t) { return new (t || NgxOrgChartModule)(); };
/** @nocollapse */ NgxOrgChartModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxOrgChartModule, bootstrap: [NgxOrgChartComponent] });
/** @nocollapse */ NgxOrgChartModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            NgxChartDesignerModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxOrgChartModule, { declarations: [NgxOrgChartComponent], imports: [CommonModule,
        NgxChartDesignerModule], exports: [NgxOrgChartComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxOrgChartModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgxOrgChartComponent
                ],
                imports: [
                    CommonModule,
                    NgxChartDesignerModule
                ],
                bootstrap: [NgxOrgChartComponent],
                exports: [NgxOrgChartComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-org-chart
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxOrgChartComponent, NgxOrgChartModule };
//# sourceMappingURL=ngx-org-chart.js.map
