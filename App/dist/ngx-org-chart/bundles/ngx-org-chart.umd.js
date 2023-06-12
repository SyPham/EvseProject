(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-org-chart', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ngx-org-chart"] = {}, global.ng.core, global.ng.common));
})(this, (function (exports, i0, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    function NgxChartNodeComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelement(0, "div", 5);
        }
        if (rf & 2) {
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵpropertyInterpolate1("ngClass", "ngx-org-connector-", ctx_r0.direction, "");
        }
    }
    var _c0 = function (a0) { return { "background-image": a0 }; };
    function NgxChartNodeComponent_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelement(0, "div", 6);
        }
        if (rf & 2) {
            var ctx_r1 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("ngStyle", i0__namespace.ɵɵpureFunction1(1, _c0, "url('" + (ctx_r1.node == null ? null : ctx_r1.node.image) + "')"));
        }
    }
    function NgxChartNodeComponent_div_8_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelement(0, "div", 5);
        }
        if (rf & 2) {
            var ctx_r2 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵpropertyInterpolate1("ngClass", "ngx-org-connector-", ctx_r2.direction, "");
        }
    }
    var NgxChartNodeComponent = /** @class */ (function () {
        function NgxChartNodeComponent() {
            this.hasParent = false;
            this.direction = 'vertical';
            this.itemClick = new i0.EventEmitter();
        }
        return NgxChartNodeComponent;
    }());
    /** @nocollapse */ NgxChartNodeComponent.ɵfac = function NgxChartNodeComponent_Factory(t) { return new (t || NgxChartNodeComponent)(); };
    /** @nocollapse */ NgxChartNodeComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: NgxChartNodeComponent, selectors: [["ngx-chart-node"]], inputs: { node: "node", hasParent: "hasParent", direction: "direction" }, outputs: { itemClick: "itemClick" }, decls: 9, vars: 6, consts: [["class", "ngx-org-border", 3, "ngClass", 4, "ngIf"], [1, "ngx-org-box", "ngx-org-border", "ngx-org-background", 3, "ngClass", "click"], ["class", "ngx-org-image ngx-org-border", 3, "ngStyle", 4, "ngIf"], [1, "ngx-org-name"], [1, "ngx-org-title"], [1, "ngx-org-border", 3, "ngClass"], [1, "ngx-org-image", "ngx-org-border", 3, "ngStyle"]], template: function NgxChartNodeComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵtemplate(0, NgxChartNodeComponent_div_0_Template, 1, 1, "div", 0);
                i0__namespace.ɵɵelementStart(1, "div", 1);
                i0__namespace.ɵɵlistener("click", function NgxChartNodeComponent_Template_div_click_1_listener() { return ctx.itemClick.emit(ctx.node); });
                i0__namespace.ɵɵtemplate(2, NgxChartNodeComponent_div_2_Template, 1, 3, "div", 2);
                i0__namespace.ɵɵelementStart(3, "div");
                i0__namespace.ɵɵelementStart(4, "div", 3);
                i0__namespace.ɵɵtext(5);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementStart(6, "div", 4);
                i0__namespace.ɵɵtext(7);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵtemplate(8, NgxChartNodeComponent_div_8_Template, 1, 1, "div", 0);
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngIf", ctx.hasParent);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngClass", ctx.node == null ? null : ctx.node.cssClass);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngIf", ctx.node == null ? null : ctx.node.image);
                i0__namespace.ɵɵadvance(3);
                i0__namespace.ɵɵtextInterpolate(ctx.node == null ? null : ctx.node.name);
                i0__namespace.ɵɵadvance(2);
                i0__namespace.ɵɵtextInterpolate(ctx.node == null ? null : ctx.node.title);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngIf", ctx.node == null ? null : ctx.node.childs == null ? null : ctx.node.childs.length);
            }
        }, directives: [i1__namespace.NgIf, i1__namespace.NgClass, i1__namespace.NgStyle], styles: [".ngx-org-box[_ngcontent-%COMP%], [_nghost-%COMP%]{display:flex;align-items:center}.ngx-org-box[_ngcontent-%COMP%]{cursor:pointer}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxChartNodeComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-chart-node',
                        templateUrl: './ngx-chart-node.component.html',
                        styleUrls: ['./ngx-chart-node.component.scss']
                    }]
            }], null, { node: [{
                    type: i0.Input
                }], hasParent: [{
                    type: i0.Input
                }], direction: [{
                    type: i0.Input
                }], itemClick: [{
                    type: i0.Output
                }] });
    })();

    function NgxChartDesignerComponent_ngx_chart_node_0_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "ngx-chart-node", 2);
            i0__namespace.ɵɵlistener("itemClick", function NgxChartDesignerComponent_ngx_chart_node_0_Template_ngx_chart_node_itemClick_0_listener($event) { i0__namespace.ɵɵrestoreView(_r3_1); var ctx_r2 = i0__namespace.ɵɵnextContext(); return ctx_r2.itemClick.emit($event); });
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵpropertyInterpolate1("ngClass", "ngx-org-", ctx_r0.direction, "");
            i0__namespace.ɵɵproperty("node", ctx_r0.node)("hasParent", ctx_r0.hasParent)("direction", ctx_r0.direction);
        }
    }
    function NgxChartDesignerComponent_div_1_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r9_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementContainerStart(0);
            i0__namespace.ɵɵelementStart(1, "div", 5);
            i0__namespace.ɵɵelementStart(2, "div", 6);
            i0__namespace.ɵɵelement(3, "div", 7);
            i0__namespace.ɵɵelement(4, "div", 8);
            i0__namespace.ɵɵelement(5, "div", 7);
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementStart(6, "ngx-chart-designer", 9);
            i0__namespace.ɵɵlistener("itemClick", function NgxChartDesignerComponent_div_1_ng_container_1_Template_ngx_chart_designer_itemClick_6_listener($event) { i0__namespace.ɵɵrestoreView(_r9_1); var ctx_r8 = i0__namespace.ɵɵnextContext(2); return ctx_r8.itemClick.emit($event); });
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var childNode_r5 = ctx.$implicit;
            var isFirst_r6 = ctx.first;
            var isLast_r7 = ctx.last;
            var ctx_r4 = i0__namespace.ɵɵnextContext(2);
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵpropertyInterpolate1("ngClass", "ngx-org-org-container-", ctx_r4.direction, "");
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵpropertyInterpolate1("ngClass", "ngx-org-connector-container-", ctx_r4.direction, "");
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵstyleProp("border-color", isFirst_r6 ? "transparent" : "");
            i0__namespace.ɵɵadvance(2);
            i0__namespace.ɵɵstyleProp("border-color", isLast_r7 ? "transparent" : "");
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("node", childNode_r5)("hasParent", true)("direction", ctx_r4.direction);
        }
    }
    function NgxChartDesignerComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "div", 3);
            i0__namespace.ɵɵtemplate(1, NgxChartDesignerComponent_div_1_ng_container_1_Template, 7, 9, "ng-container", 4);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵpropertyInterpolate1("ngClass", "ngx-org-reports-", ctx_r1.direction, "");
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("ngForOf", ctx_r1.node == null ? null : ctx_r1.node.childs);
        }
    }
    var NgxChartDesignerComponent = /** @class */ (function () {
        function NgxChartDesignerComponent() {
            this.hasParent = false;
            this.direction = 'vertical';
            this.itemClick = new i0.EventEmitter();
        }
        Object.defineProperty(NgxChartDesignerComponent.prototype, "hostClass", {
            get: function () {
                return this.direction === 'vertical' ? 'column' : '';
            },
            enumerable: false,
            configurable: true
        });
        return NgxChartDesignerComponent;
    }());
    /** @nocollapse */ NgxChartDesignerComponent.ɵfac = function NgxChartDesignerComponent_Factory(t) { return new (t || NgxChartDesignerComponent)(); };
    /** @nocollapse */ NgxChartDesignerComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: NgxChartDesignerComponent, selectors: [["ngx-chart-designer"]], hostVars: 2, hostBindings: function NgxChartDesignerComponent_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0__namespace.ɵɵstyleProp("flex-direction", ctx.hostClass);
            }
        }, inputs: { node: "node", hasParent: "hasParent", direction: "direction" }, outputs: { itemClick: "itemClick" }, decls: 2, vars: 2, consts: [[3, "ngClass", "node", "hasParent", "direction", "itemClick", 4, "ngIf"], ["class", "ngx-org-reports", 3, "ngClass", 4, "ngIf"], [3, "ngClass", "node", "hasParent", "direction", "itemClick"], [1, "ngx-org-reports", 3, "ngClass"], [4, "ngFor", "ngForOf"], [1, "ngx-org-org-container", 3, "ngClass"], [1, "ngx-org-connector-container", 3, "ngClass"], [1, "ngx-org-connector", "ngx-org-border"], [1, "ngx-org-border"], [3, "node", "hasParent", "direction", "itemClick"]], template: function NgxChartDesignerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵtemplate(0, NgxChartDesignerComponent_ngx_chart_node_0_Template, 1, 4, "ngx-chart-node", 0);
                i0__namespace.ɵɵtemplate(1, NgxChartDesignerComponent_div_1_Template, 2, 2, "div", 1);
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngIf", ctx.node);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngIf", ctx.node == null ? null : ctx.node.childs == null ? null : ctx.node.childs.length);
            }
        }, directives: [i1__namespace.NgIf, NgxChartNodeComponent, i1__namespace.NgClass, i1__namespace.NgForOf, NgxChartDesignerComponent], styles: ["[_nghost-%COMP%]{display:flex;align-items:center;flex:1}.ngx-org-vertical[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-org-container[_ngcontent-%COMP%]{display:flex}.ngx-org-org-container-vertical[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-connector[_ngcontent-%COMP%]{flex:1}.ngx-org-connector-container[_ngcontent-%COMP%]{display:flex}.ngx-org-connector-container-horizontal[_ngcontent-%COMP%]{flex-direction:column}.ngx-org-reports[_ngcontent-%COMP%]{display:flex;flex:1}.ngx-org-reports-horizontal[_ngcontent-%COMP%]{flex-direction:column}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxChartDesignerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-chart-designer',
                        templateUrl: './ngx-chart-designer.component.html',
                        styleUrls: ['./ngx-chart-designer.component.scss']
                    }]
            }], null, { node: [{
                    type: i0.Input
                }], hasParent: [{
                    type: i0.Input
                }], direction: [{
                    type: i0.Input
                }], itemClick: [{
                    type: i0.Output
                }], hostClass: [{
                    type: i0.HostBinding,
                    args: ['style.flex-direction']
                }] });
    })();

    function NgxOrgChartComponent_div_0_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementContainerStart(0);
            i0__namespace.ɵɵelementStart(1, "div");
            i0__namespace.ɵɵelementStart(2, "ngx-chart-designer", 2);
            i0__namespace.ɵɵlistener("itemClick", function NgxOrgChartComponent_div_0_ng_container_1_Template_ngx_chart_designer_itemClick_2_listener($event) { i0__namespace.ɵɵrestoreView(_r4_1); var ctx_r3 = i0__namespace.ɵɵnextContext(2); return ctx_r3.itemClick.emit($event); });
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementEnd();
            i0__namespace.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var node_r2 = ctx.$implicit;
            var ctx_r1 = i0__namespace.ɵɵnextContext(2);
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵclassMapInterpolate1("ngx-org-self-", ctx_r1.direction, "");
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("node", node_r2)("direction", ctx_r1.direction);
        }
    }
    function NgxOrgChartComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "div");
            i0__namespace.ɵɵtemplate(1, NgxOrgChartComponent_div_0_ng_container_1_Template, 3, 5, "ng-container", 1);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵproperty("ngForOf", ctx_r0.nodes);
        }
    }
    var NgxOrgChartComponent = /** @class */ (function () {
        function NgxOrgChartComponent() {
            this.hasParent = false;
            this.direction = 'vertical';
            this.itemClick = new i0.EventEmitter();
        }
        return NgxOrgChartComponent;
    }());
    /** @nocollapse */ NgxOrgChartComponent.ɵfac = function NgxOrgChartComponent_Factory(t) { return new (t || NgxOrgChartComponent)(); };
    /** @nocollapse */ NgxOrgChartComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: NgxOrgChartComponent, selectors: [["ngx-org-chart"]], inputs: { nodes: "nodes", hasParent: "hasParent", direction: "direction" }, outputs: { itemClick: "itemClick" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], [3, "node", "direction", "itemClick"]], template: function NgxOrgChartComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵtemplate(0, NgxOrgChartComponent_div_0_Template, 2, 1, "div", 0);
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngIf", ctx.nodes == null ? null : ctx.nodes.length);
            }
        }, directives: [i1__namespace.NgIf, i1__namespace.NgForOf, NgxChartDesignerComponent], styles: ["body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{display:flex;flex:1}.ngx-org-name[_ngcontent-%COMP%]{font-family:Patua One,cursive}.ngx-org-title[_ngcontent-%COMP%]{font-family:Oswald,sans-serif}.ngx-org-border[_ngcontent-%COMP%]{border-color:#9e9e9e}.ngx-org-box[_ngcontent-%COMP%]{color:#000;width:10em}.ngx-org-self-vertical[_ngcontent-%COMP%]{margin-bottom:2%}"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxOrgChartComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-org-chart',
                        templateUrl: './ngx-org-chart.component.html',
                        styleUrls: ['./ngx-org-chart.component.scss']
                    }]
            }], null, { nodes: [{
                    type: i0.Input
                }], hasParent: [{
                    type: i0.Input
                }], direction: [{
                    type: i0.Input
                }], itemClick: [{
                    type: i0.Output
                }] });
    })();

    var NgxChartNodeModule = /** @class */ (function () {
        function NgxChartNodeModule() {
        }
        return NgxChartNodeModule;
    }());
    /** @nocollapse */ NgxChartNodeModule.ɵfac = function NgxChartNodeModule_Factory(t) { return new (t || NgxChartNodeModule)(); };
    /** @nocollapse */ NgxChartNodeModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: NgxChartNodeModule, bootstrap: [NgxChartNodeComponent] });
    /** @nocollapse */ NgxChartNodeModule.ɵinj = i0__namespace.ɵɵdefineInjector({ imports: [[
                i1.CommonModule
            ]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(NgxChartNodeModule, { declarations: [NgxChartNodeComponent], imports: [i1.CommonModule], exports: [NgxChartNodeComponent] }); })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxChartNodeModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxChartNodeComponent
                        ],
                        imports: [
                            i1.CommonModule
                        ],
                        bootstrap: [NgxChartNodeComponent],
                        exports: [NgxChartNodeComponent]
                    }]
            }], null, null);
    })();

    var NgxChartDesignerModule = /** @class */ (function () {
        function NgxChartDesignerModule() {
        }
        return NgxChartDesignerModule;
    }());
    /** @nocollapse */ NgxChartDesignerModule.ɵfac = function NgxChartDesignerModule_Factory(t) { return new (t || NgxChartDesignerModule)(); };
    /** @nocollapse */ NgxChartDesignerModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: NgxChartDesignerModule, bootstrap: [NgxChartDesignerComponent] });
    /** @nocollapse */ NgxChartDesignerModule.ɵinj = i0__namespace.ɵɵdefineInjector({ imports: [[
                i1.CommonModule,
                NgxChartNodeModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(NgxChartDesignerModule, { declarations: [NgxChartDesignerComponent], imports: [i1.CommonModule,
                NgxChartNodeModule], exports: [NgxChartDesignerComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxChartDesignerModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxChartDesignerComponent
                        ],
                        imports: [
                            i1.CommonModule,
                            NgxChartNodeModule
                        ],
                        bootstrap: [NgxChartDesignerComponent],
                        exports: [NgxChartDesignerComponent]
                    }]
            }], null, null);
    })();

    var NgxOrgChartModule = /** @class */ (function () {
        function NgxOrgChartModule() {
        }
        return NgxOrgChartModule;
    }());
    /** @nocollapse */ NgxOrgChartModule.ɵfac = function NgxOrgChartModule_Factory(t) { return new (t || NgxOrgChartModule)(); };
    /** @nocollapse */ NgxOrgChartModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: NgxOrgChartModule, bootstrap: [NgxOrgChartComponent] });
    /** @nocollapse */ NgxOrgChartModule.ɵinj = i0__namespace.ɵɵdefineInjector({ imports: [[
                i1.CommonModule,
                NgxChartDesignerModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(NgxOrgChartModule, { declarations: [NgxOrgChartComponent], imports: [i1.CommonModule,
                NgxChartDesignerModule], exports: [NgxOrgChartComponent] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgxOrgChartModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgxOrgChartComponent
                        ],
                        imports: [
                            i1.CommonModule,
                            NgxChartDesignerModule
                        ],
                        bootstrap: [NgxOrgChartComponent],
                        exports: [NgxOrgChartComponent]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of ngx-org-chart
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxOrgChartComponent = NgxOrgChartComponent;
    exports.NgxOrgChartModule = NgxOrgChartModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-org-chart.umd.js.map
