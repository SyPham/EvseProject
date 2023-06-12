(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@syncfusion/ej2-data'), require('@ngx-translate/core'), require('@syncfusion/ej2-angular-dropdowns'), require('@angular/forms'), require('@syncfusion/ej2-angular-inputs'), require('ngx-cookie-service'), require('@syncfusion/ej2-angular-buttons'), require('@syncfusion/ej2-angular-grids'), require('@syncfusion/ej2-angular-calendars'), require('@syncfusion/ej2-popups'), require('@syncfusion/ej2-base'), require('@angular/common'), require('@syncfusion/ej2-angular-richtexteditor')) :
    typeof define === 'function' && define.amd ? define('@pigfarm-core', ['exports', '@angular/common/http', '@angular/core', 'rxjs', 'rxjs/operators', '@syncfusion/ej2-data', '@ngx-translate/core', '@syncfusion/ej2-angular-dropdowns', '@angular/forms', '@syncfusion/ej2-angular-inputs', 'ngx-cookie-service', '@syncfusion/ej2-angular-buttons', '@syncfusion/ej2-angular-grids', '@syncfusion/ej2-angular-calendars', '@syncfusion/ej2-popups', '@syncfusion/ej2-base', '@angular/common', '@syncfusion/ej2-angular-richtexteditor'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["pigfarm-core"] = {}, global.ng.common.http, global.ng.core, global.rxjs, global.rxjs.operators, global["@syncfusion/ej2-data"], global["@ngx-translate/core"], global["@syncfusion/ej2-angular-dropdowns"], global.ng.forms, global["@syncfusion/ej2-angular-inputs"], global["ngx-cookie-service"], global["@syncfusion/ej2-angular-buttons"], global["@syncfusion/ej2-angular-grids"], global["@syncfusion/ej2-angular-calendars"], global["@syncfusion/ej2-popups"], global["@syncfusion/ej2-base"], global.ng.common, global.ej2AngularRichtexteditor));
})(this, (function (exports, i1, i0, rxjs, operators, ej2Data, i1$1, ej2AngularDropdowns, forms, ej2AngularInputs, ngxCookieService, ej2AngularButtons, ej2AngularGrids, ej2AngularCalendars, ej2Popups, ej2Base, common, ej2AngularRichtexteditor) { 'use strict';

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

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    var PigfarmCoreService = /** @class */ (function () {
        function PigfarmCoreService(http, base) {
            this.http = http;
            this.base = base;
            this.recordSource = new rxjs.BehaviorSubject({});
            this.currentRecordEarTag = this.recordSource.asObservable();
            this.recordLabelSource = new rxjs.BehaviorSubject(null);
            this.currentRecordLabel = this.recordLabelSource.asObservable();
        }
        PigfarmCoreService.prototype.changeRecordEarTag = function (farm) {
            this.recordSource.next(farm);
        };
        PigfarmCoreService.prototype.changLable = function (value) {
            this.recordLabelSource.next(value);
        };
        PigfarmCoreService.prototype.getBreedingByFarmGuid = function (farmGuid) {
            return this.http.get(this.base + "Breeding/GetBreedingByFarmGuid?farmGuid=" + farmGuid, {});
        };
        PigfarmCoreService.prototype.getMakeOrderByFarmGuid = function (farmGuid) {
            return this.http.get(this.base + "MakeOrder/GetMakeOrderByFarmGuid?farmGuid=" + farmGuid, {});
        };
        PigfarmCoreService.prototype.getMakeOrderByFarmGuidAndPigType = function (farmGuid, pigType) {
            return this.http.get(this.base + "MakeOrder/GetMakeOrderByFarmGuidAndPigType?farmGuid=" + farmGuid + "&pigType=" + pigType, {});
        };
        PigfarmCoreService.prototype.removeRecord2Pig = function (model) {
            return this.http
                .post(this.base + "Record/RemoveRecord2Pen", model)
                .pipe(operators.catchError(this.handleError));
        };
        PigfarmCoreService.prototype.addRecord2Pig = function (model) {
            return this.http
                .post(this.base + "Record/AddRecord2Pen", model)
                .pipe(operators.catchError(this.handleError));
        };
        PigfarmCoreService.prototype.getPensByFarmGuidOrRoomGuid = function (farmGuid, roomGuid) {
            return this.http.get(this.base + "Pen/getPensByFarmGuidOrRoomGuid?farmGuid=" + farmGuid + "&roomGuid=" + roomGuid, {});
        };
        PigfarmCoreService.prototype.getByFarmGuid = function (farmGuid) {
            return this.http.get(this.base + "RecordSale/GetByFarmGuid?farmGuid=" + farmGuid, {});
        };
        PigfarmCoreService.prototype.getRoomsByFarmGuid = function (farmGuid, barnGuid, makeOrderGuid) {
            return this.http.get(this.base + "Room/GetRoomsByFarmGuid?farmGuid=" + farmGuid + "&barnGuid=" + barnGuid + "&makeOrderGuid=" + makeOrderGuid, {});
        };
        PigfarmCoreService.prototype.getBreeding2SowInByBreedingGuid = function (breedingGuid) {
            return this.http.get(this.base + "Breeding/GetBreeding2SowInByBreedingGuid?breedingGuid=" + breedingGuid, {});
        };
        PigfarmCoreService.prototype.handleError = function (errorResponse) {
            if (errorResponse instanceof i1.HttpErrorResponse) {
                if (errorResponse.status === 401) {
                    return rxjs.throwError(errorResponse.statusText);
                }
                var applicationError = errorResponse.headers.get('Application-Error');
                if (applicationError) {
                    console.error(applicationError);
                    return rxjs.throwError(applicationError);
                }
                var serverError = errorResponse.error;
                var modalStateErrors = '';
                if (serverError && typeof serverError === 'object') {
                    for (var key in serverError) {
                        if (serverError[key]) {
                            modalStateErrors += serverError[key] + '\n';
                        }
                    }
                }
                return rxjs.throwError(modalStateErrors || serverError || 'Server Error');
            }
        };
        return PigfarmCoreService;
    }());
    PigfarmCoreService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function PigfarmCoreService_Factory() { return new PigfarmCoreService(i0__namespace.ɵɵinject(i1__namespace.HttpClient), i0__namespace.ɵɵinject("Env")); }, token: PigfarmCoreService, providedIn: "root" });
    PigfarmCoreService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: "root",
                },] }
    ];
    PigfarmCoreService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] }
    ]; };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var BarnDropdownlistComponent = /** @class */ (function () {
        function BarnDropdownlistComponent(baseUrl, cd, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.cd = cd;
            this.trans = trans;
            this.id = "barn-remote";
            this.placeholder = "";
            this.disabled = false;
            this.autoload = true;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['barnName', 'barnNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        BarnDropdownlistComponent.prototype.onObarn = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BarnDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        BarnDropdownlistComponent.prototype.ngAfterViewChecked = function () {
            this.selectedValue = this.selectedValue || "";
            this.cd.detectChanges();
        };
        BarnDropdownlistComponent.prototype.ngOnInit = function () {
            if (this.autoload) {
                this.query = new ej2Data.Query()
                    .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                    .where('status', 'equal', 1);
                this.data = new ej2Data.DataManager({
                    url: this.baseUrl + "Barn/GetDataDropdownlist",
                    adaptor: new ej2Data.UrlAdaptor,
                    crossDomain: true,
                }, this.query.sortBy('barnNo'));
            }
        };
        BarnDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            if (changes.hasOwnProperty("selectedValue")) {
                if ((changes === null || changes === void 0 ? void 0 : changes.selectedValue.currentValue) != (changes === null || changes === void 0 ? void 0 : changes.selectedValue.previousValue) && !(changes === null || changes === void 0 ? void 0 : changes.selectedValue.firstChange)) {
                    this.ngModelChange.emit(this.selectedValue);
                    this.selectedValueChange.emit(this.selectedValue);
                }
            }
            if (changes.hasOwnProperty("areaGuid")) {
                if ((changes === null || changes === void 0 ? void 0 : changes.areaGuid.currentValue) != (changes === null || changes === void 0 ? void 0 : changes.areaGuid.previousValue)) {
                    this.query = new ej2Data.Query()
                        .skip(this.skip)
                        .take(this.take)
                        .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                        .where('status', 'equal', 1)
                        .where('areaGuid', 'equal', this.areaGuid);
                    this.data = new ej2Data.DataManager({
                        url: this.baseUrl + "Barn/GetDataDropdownlist",
                        adaptor: new ej2Data.UrlAdaptor,
                        crossDomain: true,
                    }, this.query.sortBy('barnNo'));
                }
            }
        };
        BarnDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        BarnDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        BarnDropdownlistComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return BarnDropdownlistComponent;
    }());
    BarnDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-barn-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #barnRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    BarnDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i0.ChangeDetectorRef },
        { type: i1$1.TranslateService }
    ]; };
    BarnDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        areaGuid: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        autoload: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['barnRemote',] }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }]
    };

    var AreaDropdownlistComponent = /** @class */ (function () {
        function AreaDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "area-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['areaName', 'areaNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        AreaDropdownlistComponent.prototype.onOarea = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        AreaDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        AreaDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Area/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query.sortBy('areaNo'));
        };
        AreaDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
            if (changes['selectedValue']) {
                if ((changes === null || changes === void 0 ? void 0 : changes.selectedValue.currentValue) != (changes === null || changes === void 0 ? void 0 : changes.selectedValue.previousValue) && !(changes === null || changes === void 0 ? void 0 : changes.selectedValue.firstChange)) {
                    this.ngModelChange.emit(this.selectedValue);
                    this.selectedValueChange.emit(this.selectedValue);
                }
            }
        };
        AreaDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        AreaDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        AreaDropdownlistComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return AreaDropdownlistComponent;
    }());
    AreaDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-area-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #areaRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    AreaDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    AreaDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['areaRemote',] }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }]
    };

    var PenMultiselectComponent = /** @class */ (function () {
        function PenMultiselectComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "pen-multi";
            this.selectedData = [];
            this.placeholder = "";
            this.roomGuid = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.popupHeight = '350px';
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['penName', 'penNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        PenMultiselectComponent.prototype.actionComplete = function (e) {
            e.result = e.result.filter(function (x) { return x.guid != ""; });
        };
        PenMultiselectComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                .where('status', 'equal', 1);
            if (this.roomGuid) {
                this.query.where('roomGuid', 'equal', this.roomGuid);
            }
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Pen/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        PenMultiselectComponent.prototype.ngOnChanges = function (changes) {
        };
        PenMultiselectComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        PenMultiselectComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return PenMultiselectComponent;
    }());
    PenMultiselectComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-pen-multiselect',
                    template: "<ejs-multiselect\r\n  #penmulti\r\n  [id]=\"id\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  mode=\"CheckBox\"\r\n  [popupHeight]=\"popupHeight\"\r\n  [showDropDownIcon]=\"true\"\r\n  [(ngModel)]=\"selectedData\"\r\n  [disabled]=\"disabled\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  (change)=\"onChange($event)\"\r\n  showSelectAll=\"true\"\r\n></ejs-multiselect>\r\n",
                    styles: [""]
                },] }
    ];
    PenMultiselectComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    PenMultiselectComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedData: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        roomGuid: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }],
        dropdownObj: [{ type: i0.ViewChild, args: ['penmulti',] }],
        data: [{ type: i0.Input }],
        query: [{ type: i0.Input }],
        popupHeight: [{ type: i0.Input }]
    };

    var FeedDropdownlistComponent = /** @class */ (function () {
        function FeedDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "feed-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['feedName', 'feedNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        FeedDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        FeedDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        FeedDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Feed/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        FeedDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        FeedDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        FeedDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return FeedDropdownlistComponent;
    }());
    FeedDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-feed-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #feedRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    FeedDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    FeedDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['feedRemote',] }]
    };

    var FarmDropdownlistComponent = /** @class */ (function () {
        function FarmDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "farm-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        FarmDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        FarmDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        FarmDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Farm/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        FarmDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        FarmDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        FarmDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return FarmDropdownlistComponent;
    }());
    FarmDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-farm-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #farmRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    FarmDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    FarmDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['farmRemote',] }]
    };

    var PigDropdownlistComponent = /** @class */ (function () {
        function PigDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "pig-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 1000;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        PigDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        PigDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        PigDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .skip(this.skip)
                .take(this.take)
                .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Pig/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        PigDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        PigDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        PigDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return PigDropdownlistComponent;
    }());
    PigDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-pig-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"'No Item' | translate\"\r\n  #pigRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  [showClearButton]=\"true\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group.e-control-wrapper{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    PigDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    PigDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['pigRemote',] }]
    };

    var PenDropdownlistComponent = /** @class */ (function () {
        function PenDropdownlistComponent(baseUrl, trans, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.service = service;
            this.id = "pen-remote";
            this.placeholder = this.trans.instant("No Item");
            this.roomGuid = "";
            this.disabled = false;
            this.popupWidth = 300;
            this.enabledLoad = true;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.selectedNameChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 1000;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.search(e.text, ['penName', 'penNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        PenDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.guid === "" ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        PenDropdownlistComponent.prototype.ngOnInit = function () {
        };
        PenDropdownlistComponent.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _e = this;
                            return [4 /*yield*/, this.service.getPensByFarmGuidOrRoomGuid(localStorage.getItem("farmGuid"), this.roomGuid).toPromise()];
                        case 1:
                            _e.data = _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PenDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            this.selectedValue = this.selectedValue || "";
                            if (this.dropdownObj && !this.selectedValue) {
                                this.dropdownObj.value = null;
                            }
                            if (!(changes['enabledLoad'] && changes.enabledLoad.currentValue)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.loadData()];
                        case 1:
                            _e.sent();
                            this.selectedValue = (_a = changes['selectedValue']) === null || _a === void 0 ? void 0 : _a.currentValue;
                            _e.label = 2;
                        case 2:
                            if (!(changes['roomGuid'] && changes.roomGuid.currentValue)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.loadData()];
                        case 3:
                            _e.sent();
                            this.selectedValue = (_b = changes['selectedValue']) === null || _b === void 0 ? void 0 : _b.currentValue;
                            _e.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        PenDropdownlistComponent.prototype.onChange = function (args) {
            var _a, _b, _c, _d;
            this.penGuidName = (_a = args.itemData) === null || _a === void 0 ? void 0 : _a.name;
            this.selectedNameChange.emit(((_b = args.itemData) === null || _b === void 0 ? void 0 : _b.name) || '');
            this.selectedValueChange.emit((_c = args.itemData) === null || _c === void 0 ? void 0 : _c.guid);
            this.ngModelChange.emit((_d = args.itemData) === null || _d === void 0 ? void 0 : _d.guid);
            this.change.emit(args);
        };
        PenDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        PenDropdownlistComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return PenDropdownlistComponent;
    }());
    PenDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-pen-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #penRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n</ejs-dropdownlist>",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    PenDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: PigfarmCoreService }
    ]; };
    PenDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        roomGuid: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        popupWidth: [{ type: i0.Input }],
        enabledLoad: [{ type: i0.Input }],
        predicate: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        selectedNameChange: [{ type: i0.Output }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }],
        dropdownObj: [{ type: i0.ViewChild, args: ['penRemote',] }]
    };

    var CodeTypeDropdownlistComponent = /** @class */ (function () {
        function CodeTypeDropdownlistComponent(baseUrl, cd, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.cd = cd;
            this.trans = trans;
            this.id = "codeType-remote";
            this.placeholder = this.trans.instant("No item");
            this.codeType = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.selectedNameChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        CodeTypeDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        CodeTypeDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.guid === "" ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        CodeTypeDropdownlistComponent.prototype.ngAfterViewChecked = function () {
            this.selectedValue = this.selectedValue || "";
            this.id = this.id || Math.random() + '';
            this.cd.detectChanges();
        };
        CodeTypeDropdownlistComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.query = new ej2Data.Query()
                .addParams("lang", localStorage.getItem('lang'));
            var data = new ej2Data.DataManager({
                url: this.baseUrl + "CodeType/GetDataDropdownlist?lang=" + localStorage.getItem('lang') + "&codeType=" + this.codeType,
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            });
            data.executeQuery(this.query.sortBy('guid')).then(function (x) {
                _this.data = x.result.sort(function (a, b) { return +a.guid - +b.guid; });
                if (_this.data.length > 0) {
                    _this.firstValue = _this.data[0].guid;
                }
            });
        };
        CodeTypeDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            if (changes['codeType'] && changes['codeType'].currentValue === 'Employee_Status') {
                if (changes['selectedValue'] && changes['selectedValue'].currentValue) {
                    this.selectedValue = changes['selectedValue'].currentValue + '';
                }
            }
        };
        CodeTypeDropdownlistComponent.prototype.onChange = function (args) {
            var _a, _b;
            this.change.emit(args);
            this.selectedNameChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.name);
            this.selectedValueChange.emit((_b = args.itemData) === null || _b === void 0 ? void 0 : _b.guid);
        };
        CodeTypeDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        CodeTypeDropdownlistComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return CodeTypeDropdownlistComponent;
    }());
    CodeTypeDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-code-type-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [showClearButton]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #codeTypeRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    CodeTypeDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i0.ChangeDetectorRef },
        { type: i1$1.TranslateService }
    ]; };
    CodeTypeDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        codeType: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        selectedNameChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['codeTypeRemote',] }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }]
    };

    var MaterialDropdownlistComponent = /** @class */ (function () {
        function MaterialDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "material-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        MaterialDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        MaterialDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        MaterialDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Material/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        MaterialDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        MaterialDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        MaterialDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return MaterialDropdownlistComponent;
    }());
    MaterialDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-material-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #materialRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    MaterialDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    MaterialDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['materialRemote',] }]
    };

    var MaskedtimetextboxComponent = /** @class */ (function () {
        function MaskedtimetextboxComponent(baseUrl, cdRef) {
            this.baseUrl = baseUrl;
            this.cdRef = cdRef;
            this.disabled = true;
            this.selectedValue = "";
            this.id = Math.random();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
        }
        MaskedtimetextboxComponent.prototype.ngAfterViewChecked = function () {
            this.cdRef.detectChanges();
        };
        MaskedtimetextboxComponent.prototype.ngOnInit = function () {
        };
        MaskedtimetextboxComponent.prototype.onChange = function (args) {
            var _a;
            this.selectedValue = args.value || "";
            if (((_a = this.selectedValue) === null || _a === void 0 ? void 0 : _a.length) === 4) {
                var array = this.selectedValue.split('');
                this.selectedValue = "" + array[0] + array[1] + ":" + array[2] + array[3];
            }
            this.selectedValueChange.emit(this.selectedValue);
        };
        MaskedtimetextboxComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return MaskedtimetextboxComponent;
    }());
    MaskedtimetextboxComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-maskedtimetextbox',
                    template: "<ejs-maskedtextbox\r\n  [id]=\"id\"\r\n  [enabled]=\"disabled\"\r\n  (blur)='onblur($event)'\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  mask=\"[0-2][0-9]:[0-5][0-9]\"\r\n></ejs-maskedtextbox>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    MaskedtimetextboxComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i0.ChangeDetectorRef }
    ]; };
    MaskedtimetextboxComponent.propDecorators = {
        disabled: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        selectedValueChange: [{ type: i0.Output }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }]
    };

    var DiseaseDropdownlistComponent = /** @class */ (function () {
        function DiseaseDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "disease-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['name', 'no']);
                    e.updateData(_this.data, query);
                }
            };
        }
        DiseaseDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        DiseaseDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        DiseaseDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Disease/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query.sortBy("no"));
        };
        DiseaseDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        DiseaseDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        DiseaseDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return DiseaseDropdownlistComponent;
    }());
    DiseaseDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-disease-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #diseaseRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    DiseaseDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    DiseaseDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['diseaseRemote',] }]
    };

    var MedicineDropdownlistComponent = /** @class */ (function () {
        function MedicineDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "medicine-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueName = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['medicineNo', 'medicineName', 'medicineType']);
                    e.updateData(_this.data, query);
                }
            };
        }
        MedicineDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        MedicineDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        MedicineDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Medicine/GetDataDropdownlistByLang?lang=" + localStorage.getItem('lang'),
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        MedicineDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            // only run when property "data" changed
            if (changes['selectedValue']) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            this.selectedValue = this.selectedValue || "";
        };
        MedicineDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueName.emit(args.itemData.name || '');
        };
        MedicineDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return MedicineDropdownlistComponent;
    }());
    MedicineDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-medicine-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    MedicineDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    MedicineDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueName: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var BomDropdownlistComponent = /** @class */ (function () {
        function BomDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "bom-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        BomDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BomDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        BomDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .skip(this.skip)
                .take(this.take)
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Bom/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        BomDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        BomDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        BomDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BomDropdownlistComponent;
    }());
    BomDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-bom-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #bomRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    BomDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    BomDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['bomRemote',] }]
    };

    var CustomerDropdownlistComponent = /** @class */ (function () {
        function CustomerDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "customer-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 1000;
            this.skip = 0;
            this.onFiltering = function (e) {
                var query = new ej2Data.Query();
                //frame the query based on search string with filter type.
                var predicate = new ej2Data.Predicate('name', 'contains', e.text);
                predicate = predicate.or('no', 'contains', e.text);
                query = (e.text != "") ? query.where(predicate) : query;
                //pass the filter data source, filter query to updateData method.
                e.updateData(_this.data, query);
            };
        }
        CustomerDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        CustomerDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        CustomerDropdownlistComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.query = new ej2Data.Query();
            new ej2Data.DataManager({
                url: this.baseUrl + "Customer/GetCustomersSP",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }).executeQuery(this.query).then(function (x) {
                _this.data = x.result;
            });
        };
        CustomerDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log('Customer/GetCustomersSP', this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        CustomerDropdownlistComponent.prototype.onChange = function (args) {
            var _a;
            this.change.emit(args);
            this.selectedValueChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.guid);
        };
        CustomerDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return CustomerDropdownlistComponent;
    }());
    CustomerDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-customer-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #customerRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    CustomerDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    CustomerDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['customerRemote',] }]
    };

    var VectorControlDropdownlistComponent = /** @class */ (function () {
        function VectorControlDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "vectorControl-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        VectorControlDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        VectorControlDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        VectorControlDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "VectorControl/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        VectorControlDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        VectorControlDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueChange.emit(args.itemData.guid);
        };
        VectorControlDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        VectorControlDropdownlistComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return VectorControlDropdownlistComponent;
    }());
    VectorControlDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-vector-control-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  #vectorControlremote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (blur)='onblur($event)'\r\n></ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    VectorControlDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    VectorControlDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['vectorControlRemote',] }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }]
    };

    var DisinfectionDropdownlistComponent = /** @class */ (function () {
        function DisinfectionDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "disinfection-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['disinfectionNo', 'disinfectionName']);
                    e.updateData(_this.data, query);
                }
            };
        }
        DisinfectionDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        DisinfectionDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        DisinfectionDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Disinfection/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        DisinfectionDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        DisinfectionDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        DisinfectionDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return DisinfectionDropdownlistComponent;
    }());
    DisinfectionDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-disinfection-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #disinfectionRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    DisinfectionDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    DisinfectionDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['disinfectionRemote',] }]
    };

    var AlertifyService = /** @class */ (function () {
        function AlertifyService(trans) {
            this.trans = trans;
            this.$swal = Swal;
            this.Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: function (toast) {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
        }
        AlertifyService.prototype.showLoading = function (timer) {
            var _this = this;
            if (timer === void 0) { timer = 2000; }
            {
                Swal({
                    title: this.trans.instant('Now loading'),
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timer: timer,
                    onOpen: function () {
                        Swal.showLoading();
                    }
                }).then(function () { }, function (dismiss) {
                    if (dismiss === 'timer') {
                        Swal({
                            title: _this.trans.instant('Finished!'),
                            type: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
            }
        };
        AlertifyService.prototype.confirm = function (title, message, okCallback) {
            var _this = this;
            Swal.fire({
                title: title,
                // text: message,
                html: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: this.trans.instant('Yes'),
                cancelButtonText: this.trans.instant('No!')
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(_this.trans.instant('Cancelled'), _this.trans.instant('Your imaginary file is safe :)'), _this.trans.instant('error'));
                }
            });
        };
        AlertifyService.prototype.errorConfirm = function (title, message, okCallback) {
            Swal.fire({
                title: title,
                text: message,
                icon: 'warning',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: this.trans.instant('Yes'),
            }).then(function (result) {
                okCallback();
            });
        };
        AlertifyService.prototype.confirm2 = function (title, message, okCallback, cancelCallback) {
            Swal.fire({
                title: title,
                html: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: this.trans.instant('Yes'),
                cancelButtonText: this.trans.instant('No!')
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    cancelCallback();
                }
            });
        };
        AlertifyService.prototype.confirm4 = function (confirmButtonText, cancelButtonText, title, message, okCallback, cancelCallback, icon) {
            if (confirmButtonText === void 0) { confirmButtonText = 'Yes'; }
            if (cancelButtonText === void 0) { cancelButtonText = 'No'; }
            if (icon === void 0) { icon = 'warning'; }
            Swal.fire({
                title: title,
                html: message,
                icon: icon,
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    cancelCallback();
                }
            });
        };
        AlertifyService.prototype.deleteConfirm = function (confirmButtonText, cancelButtonText, title, message, okCallback, cancelCallback) {
            if (confirmButtonText === void 0) { confirmButtonText = 'Yes'; }
            if (cancelButtonText === void 0) { cancelButtonText = 'No'; }
            Swal.fire({
                title: title,
                html: message,
                icon: 'question',
                iconHtml: '<i class="fa fa-exclamation" aria-hidden="true"></i>',
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    cancelCallback();
                }
            });
        };
        AlertifyService.prototype.confirm5 = function (confirmButtonText, cancelButtonText, title, message, okCallback, cancelCallback) {
            if (confirmButtonText === void 0) { confirmButtonText = 'Yes'; }
            if (cancelButtonText === void 0) { cancelButtonText = 'No'; }
            Swal.fire({
                title: title,
                html: message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    cancelCallback();
                }
            });
        };
        AlertifyService.prototype.confirm3 = function (title, message, confirmButtonText, cancelButtonText, okCallback, cancelCallback) {
            Swal.fire({
                title: title,
                html: message,
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
                allowOutsideClick: false
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    cancelCallback();
                }
            });
        };
        AlertifyService.prototype.valid = function (title, message) {
            var _this = this;
            return new Promise(function (res, rejects) {
                Swal.fire({
                    title: title,
                    text: message,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: _this.trans.instant('Yes'),
                    cancelButtonText: _this.trans.instant('No')
                }).then(function (result) {
                    if (result.value) {
                        res(true);
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        rejects(false);
                    }
                });
            });
        };
        AlertifyService.prototype.validation = function (title, message) {
            Swal.fire(title, message, 'warning');
        };
        AlertifyService.prototype.success = function (message, noToast) {
            if (!noToast) {
                this.Toast.fire({
                    icon: 'success',
                    title: message
                });
            }
            else {
                Swal.fire(this.trans.instant('Successfully!'), message, 'success');
            }
        };
        AlertifyService.prototype.errorBackToLogin = function (message, btnText, callBack, showCancelButton, errorCallBack) {
            if (showCancelButton === void 0) { showCancelButton = false; }
            if (errorCallBack === void 0) { errorCallBack = function () { }; }
            Swal.fire({
                text: message,
                icon: 'error',
                showCancelButton: showCancelButton,
                allowOutsideClick: false,
                confirmButtonText: "<i class=\"fa fa-backward\"></i> " + this.trans.instant(btnText),
                cancelButtonText: this.trans.instant('No') || 'No'
            }).then(function (result) {
                if (result.value) {
                    callBack();
                }
                else {
                    errorCallBack();
                }
            });
        };
        AlertifyService.prototype.error = function (message, noToast) {
            if (!noToast) {
                this.Toast.fire({
                    icon: 'error',
                    title: message
                });
            }
            else {
                Swal.fire(this.trans.instant('Error!'), message, 'error');
            }
        };
        AlertifyService.prototype.warning = function (message, noToast) {
            if (!noToast) {
                this.Toast.fire({
                    icon: 'warning',
                    title: message
                });
            }
            else {
                Swal.fire(this.trans.instant('Warning!'), message, 'warning');
            }
        };
        AlertifyService.prototype.message = function (message, noToast) {
            if (!noToast) {
                this.Toast.fire({
                    icon: 'info',
                    title: message
                });
            }
            else {
                Swal.fire(this.trans.instant('Info!'), message, 'info');
            }
        };
        AlertifyService.prototype.messagePreventClosed = function (message, okCallback) {
            Swal.fire({
                html: message,
                icon: 'info',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: this.trans.instant('Confirm'),
                cancelButtonText: this.trans.instant('No!')
            }).then(function (result) {
                if (result.value) {
                    okCallback();
                }
            });
        };
        return AlertifyService;
    }());
    AlertifyService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AlertifyService_Factory() { return new AlertifyService(i0__namespace.ɵɵinject(i1__namespace$1.TranslateService)); }, token: AlertifyService, providedIn: "root" });
    AlertifyService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    AlertifyService.ctorParameters = function () { return [
        { type: i1$1.TranslateService }
    ]; };

    var BaseService = /** @class */ (function () {
        function BaseService() {
            this.valueSource = new rxjs.BehaviorSubject(null);
            this.currentValue = this.valueSource.asObservable();
        }
        BaseService.prototype.handleError = function (errorResponse) {
            if (errorResponse instanceof i1.HttpErrorResponse) {
                if (errorResponse.status === 401) {
                    return rxjs.throwError(errorResponse.statusText);
                }
                var applicationError = errorResponse.headers.get('Application-Error');
                if (applicationError) {
                    console.error(applicationError);
                    return rxjs.throwError(applicationError);
                }
                var serverError = errorResponse.error;
                var modalStateErrors = '';
                if (serverError && typeof serverError === 'object') {
                    for (var key in serverError) {
                        if (serverError[key]) {
                            modalStateErrors += serverError[key] + '\n';
                        }
                    }
                }
                return rxjs.throwError(modalStateErrors || serverError || 'Server Error');
            }
        };
        BaseService.prototype.changeValue = function (message) {
            this.valueSource.next(message);
        };
        return BaseService;
    }());

    var VersionCheckService = /** @class */ (function () {
        function VersionCheckService(http, cookieService) {
            this.http = http;
            this.cookieService = cookieService;
            // this will be replaced by actual hash post-build.js
            this.currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
            //console.log(this.currentHash)
        }
        /**
        * Checks in every set frequency the version of frontend application
        * @param url
        * @param {number} frequency - in milliseconds, defaults to 30 minutes
        */
        VersionCheckService.prototype.initVersionCheck = function (url, frequency) {
            var _this = this;
            if (frequency === void 0) { frequency = 1000 * 60 * 30; }
            setInterval(function () {
                _this.checkVersion(url);
            }, frequency);
            this.checkVersion(url);
        };
        /**
        * Will do the call and check if the hash has changed or not
        * @param url
        */
        VersionCheckService.prototype.checkVersion = function (url) {
            var _this = this;
            // timestamp these requests to invalidate caches
            this.http.get(url + '?t=' + new Date().getTime())
                .subscribe(function (response) {
                // console.log('current Hash',this.currentHash);
                var hash = response.hash;
                //  console.log('new Hash',hash);
                var hashChanged = _this.hasHashChanged(_this.currentHash, hash);
                // If new version, do something
                // console.log('If new version, do something',hashChanged);
                if (hashChanged) {
                    // console.log(`There is a new update version ${response.version}` + ' current Hash',this.currentHash);
                    localStorage.setItem('version', response.version);
                    _this.currentHash = hash;
                    // this.cookieService.deleteAll('/');
                    window.location.reload();
                    // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
                    // for an example: location.reload();
                }
                _this.currentHash = hash;
                // store the new hash so we wouldn't trigger versionChange again
                // only necessary in case you did not force refresh
            }, function (err) {
                console.error(err, 'Could not get version');
            });
        };
        /**
        * Checks if hash has changed.
        * This file has the JS hash, if it is a different one than in the version.json
        * we are dealing with version change
        * @param currentHash
        * @param newHash
        * @returns {boolean}
        */
        VersionCheckService.prototype.hasHashChanged = function (currentHash, newHash) {
            if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
                return false;
            }
            return currentHash !== newHash;
        };
        return VersionCheckService;
    }());
    VersionCheckService.decorators = [
        { type: i0.Injectable }
    ];
    VersionCheckService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: ngxCookieService.CookieService }
    ]; };

    var UtilitiesService = /** @class */ (function () {
        function UtilitiesService(http) {
            this.http = http;
            this.UnflatteringForLeftMenu = function (arr) {
                var map = {};
                var roots = [];
                for (var i = 0; i < arr.length; i++) {
                    var node = arr[i];
                    node.children = [];
                    map[node.id] = i; // use map to look-up the parents
                    if (node.parentId !== null) {
                        delete node.children;
                        arr[map[node.parentId]].children.push(node);
                    }
                    else {
                        roots.push(node);
                    }
                }
                return roots;
            };
            this.UnflatteringForTree = function (arr) {
                var map = {};
                var roots = [];
                var node = {
                    data: {
                        id: '',
                        parentId: ''
                    },
                    expanded: true,
                    children: []
                };
                for (var i = 0; i < arr.length; i += 1) {
                    map[arr[i].id] = i; // initialize the map
                    arr[i].data = arr[i]; // initialize the data
                    arr[i].children = []; // initialize the children
                }
                // tslint:disable-next-line:prefer-for-of
                for (var i = 0; i < arr.length; i += 1) {
                    node = arr[i];
                    if (node.data.parentId !== null && arr[map[node.data.parentId]] !== undefined) {
                        arr[map[node.data.parentId]].children.push(node);
                    }
                    else {
                        roots.push(node);
                    }
                }
                return roots;
            };
        }
        UtilitiesService.prototype.MakeSeoTitle = function (input) {
            if (input === undefined || input === '') {
                return '';
            }
            // Đổi chữ hoa thành chữ thường
            var slug = input.toLowerCase();
            // Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            // Xóa các ký tự đặt biệt
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            // Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, '-');
            // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            // Xóa các ký tự gạch ngang ở đầu và cuối
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            return slug;
        };
        UtilitiesService.prototype.ToFormData = function (formValue) {
            var e_1, _a;
            var formData = new FormData();
            try {
                for (var _b = __values(Object.keys(formValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var value = formValue[key];
                    var value2 = void 0;
                    if (value) {
                        value2 = value;
                        if (value2 instanceof Date) {
                            value2 = value2.toLocaleDateString() + " " + value2.toLocaleTimeString('en-GB');
                        }
                        formData.append(key, value);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return formData;
        };
        UtilitiesService.prototype.checkExistHost = function (url) {
            var check = new RegExp("^(http|https)://", "i").test(url);
            return check;
        };
        UtilitiesService.prototype.checkValidImage = function (data) {
            var valid = new RegExp(".(?:jpg|gif|png)", "g").test(data);
            return valid;
        };
        return UtilitiesService;
    }());
    UtilitiesService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function UtilitiesService_Factory() { return new UtilitiesService(i0__namespace.ɵɵinject(i1__namespace.HttpClient)); }, token: UtilitiesService, providedIn: "root" });
    UtilitiesService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    UtilitiesService.ctorParameters = function () { return [
        { type: i1.HttpClient }
    ]; };

    // export * from './CURD.service';

    var RoomDropdownlistComponent = /** @class */ (function () {
        function RoomDropdownlistComponent(baseUrl, trans, cd, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.cd = cd;
            this.service = service;
            this.id = "room-remote";
            this.placeholder = "";
            this.disabled = false;
            this.autoload = true;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['roomName', 'roomNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        RoomDropdownlistComponent.prototype.onOroom = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        RoomDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        RoomDropdownlistComponent.prototype.ngAfterViewChecked = function () {
        };
        RoomDropdownlistComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.autoload) {
                this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(function (x) {
                    _this.data = x;
                });
            }
        };
        RoomDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (this.selectedValue === "" && this.dropdownObj) {
                this.dropdownObj.value = null;
                this.cd.detectChanges();
            }
            if (changes['selectedValue'] && changes['selectedValue'].currentValue) {
                setTimeout(function () {
                    _this.selectedValue = changes['selectedValue'].currentValue;
                }, 0);
            }
            if (changes['barnGuid']) {
                this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(function (x) {
                    _this.data = x;
                });
            }
            if (changes['makeOrderGuid']) {
                this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(function (x) {
                    _this.data = x;
                });
            }
        };
        RoomDropdownlistComponent.prototype.onChange = function (args) {
            var _a, _b, _c;
            this.change.emit(args);
            this.roomGuidName = (_a = args.itemData) === null || _a === void 0 ? void 0 : _a.name;
            this.selectedValueChange.emit((_b = args.itemData) === null || _b === void 0 ? void 0 : _b.guid);
            this.ngModelChange.emit((_c = args.itemData) === null || _c === void 0 ? void 0 : _c.guid);
        };
        RoomDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        RoomDropdownlistComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return RoomDropdownlistComponent;
    }());
    RoomDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-room-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #roomRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    RoomDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: i0.ChangeDetectorRef },
        { type: PigfarmCoreService }
    ]; };
    RoomDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        barnGuid: [{ type: i0.Input }],
        makeOrderGuid: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        autoload: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: [ej2AngularDropdowns.DropDownListComponent,] }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }]
    };

    var CullingTankDropdownlistComponent = /** @class */ (function () {
        function CullingTankDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "cullingTank-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['cullingTankName', 'cullingTankNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        CullingTankDropdownlistComponent.prototype.onOcullingTank = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        CullingTankDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        CullingTankDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('farmGuid', 'equal', localStorage.getItem('farmGuid'))
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "CullingTank/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        CullingTankDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        CullingTankDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        CullingTankDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return CullingTankDropdownlistComponent;
    }());
    CullingTankDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-culling-tank-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #cullingTankRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    CullingTankDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    CullingTankDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['cullingTankRemote',] }]
    };

    var PenDropdownlistModalComponent = /** @class */ (function () {
        function PenDropdownlistModalComponent(baseUrl, trans, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.service = service;
            this.id = "pen-remote";
            this.placeholder = this.trans.instant("No Item");
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.roomGuid = '';
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.search(e.text, ['penName', 'penNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        PenDropdownlistModalComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        PenDropdownlistModalComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        PenDropdownlistModalComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadData()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PenDropdownlistModalComponent.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.service.getPensByFarmGuidOrRoomGuid(localStorage.getItem("farmGuid"), this.roomGuid).toPromise()];
                        case 1:
                            data = _a.sent();
                            this.data = data;
                            return [2 /*return*/];
                    }
                });
            });
        };
        PenDropdownlistModalComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        PenDropdownlistModalComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        PenDropdownlistModalComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return PenDropdownlistModalComponent;
    }());
    PenDropdownlistModalComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-pen-dropdownlist-modal',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #penRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    PenDropdownlistModalComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: PigfarmCoreService }
    ]; };
    PenDropdownlistModalComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['penRemote',] }]
    };

    var MyCheckboxComponent = /** @class */ (function () {
        function MyCheckboxComponent(baseUrl) {
            this.baseUrl = baseUrl;
            this.label = '';
            this.checkedChange = new i0.EventEmitter();
            this.checkedValue = false;
        }
        MyCheckboxComponent.prototype.ngOnChanges = function (changes) {
            if (this.checked != changes.checked.currentValue) {
                this.checked = changes.checked.currentValue;
                this.checkedValue = this.checked === 1 ? true : false;
            }
            if (changes.checked.firstChange) {
                this.checked = changes.checked.currentValue;
                this.checkedValue = this.checked === 1 ? true : false;
            }
        };
        MyCheckboxComponent.prototype.ngOnInit = function () {
        };
        MyCheckboxComponent.prototype.onCheckedChange = function (value) {
            this.checked = value === true ? 1 : 0;
            console.log(this.checked);
            this.checkedChange.emit(this.checked);
        };
        return MyCheckboxComponent;
    }());
    MyCheckboxComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-my-checkbox',
                    template: "<ejs-checkbox [label]=\"label\" [(ngModel)]=\"checkedValue\" (ngModelChange)=\"onCheckedChange($event)\"></ejs-checkbox>\r\n",
                    styles: [""]
                },] }
    ];
    MyCheckboxComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] }
    ]; };
    MyCheckboxComponent.propDecorators = {
        checked: [{ type: i0.Input }],
        label: [{ type: i0.Input }],
        checkedChange: [{ type: i0.Output }]
    };

    var ThingDropdownlistComponent = /** @class */ (function () {
        function ThingDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "thing-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        ThingDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        ThingDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        ThingDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .skip(this.skip)
                .take(this.take)
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Thing/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        ThingDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        ThingDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        ThingDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return ThingDropdownlistComponent;
    }());
    ThingDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-thing-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #thingRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    ThingDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    ThingDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['thingRemote',] }]
    };

    var AccountDropdownlistComponent = /** @class */ (function () {
        function AccountDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "xacccount-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        AccountDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        AccountDropdownlistComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.guid === "" ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        AccountDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "XAccount/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        AccountDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        AccountDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        AccountDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return AccountDropdownlistComponent;
    }());
    AccountDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-account-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #xacccountRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    AccountDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    AccountDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['xacccountRemote',] }]
    };

    var StatusConstants = /** @class */ (function () {
        function StatusConstants() {
            this.Default = 1;
            this.Agree = 2;
            this.Execute = 3;
            this.Close = 3;
            this.Reject = 5;
            this.Delete = -1;
        }
        return StatusConstants;
    }());
    var SystemConstant = /** @class */ (function () {
        function SystemConstant() {
        }
        return SystemConstant;
    }());
    SystemConstant.ROOT_LEVEL = 1;
    SystemConstant.BUILDING_LEVEL = 2;
    SystemConstant.LINE_LEVEL = 3;
    var BOM_TAB_Constant = /** @class */ (function () {
        function BOM_TAB_Constant() {
        }
        return BOM_TAB_Constant;
    }());
    BOM_TAB_Constant.Move = 'Move';
    BOM_TAB_Constant.Feeding = 'Feeding';
    BOM_TAB_Constant.Immunization = 'Immunization';
    BOM_TAB_Constant.Treatment = 'Treatment';
    BOM_TAB_Constant.Disinfection = 'Disinfection';
    BOM_TAB_Constant.VectorControl = 'VectorControl';
    var BIO_SECURITY_TAB_Constant = /** @class */ (function () {
        function BIO_SECURITY_TAB_Constant() {
        }
        return BIO_SECURITY_TAB_Constant;
    }());
    BIO_SECURITY_TAB_Constant.Detail = 'Detail';
    BIO_SECURITY_TAB_Constant.Pen = 'Pen';
    BIO_SECURITY_TAB_Constant.Pig = 'Pig';
    BIO_SECURITY_TAB_Constant.Record = 'Record';
    var INVENTORY_TAB_Constant = /** @class */ (function () {
        function INVENTORY_TAB_Constant() {
        }
        return INVENTORY_TAB_Constant;
    }());
    INVENTORY_TAB_Constant.Detail = 'Detail';
    INVENTORY_TAB_Constant.ChangeThing = 'Change Thing';
    INVENTORY_TAB_Constant.ChangeMaterial = 'Change Material';
    INVENTORY_TAB_Constant.Scrap = 'Scrapn';
    var ACCEPTANCE_TAB_Constant = /** @class */ (function () {
        function ACCEPTANCE_TAB_Constant() {
        }
        return ACCEPTANCE_TAB_Constant;
    }());
    ACCEPTANCE_TAB_Constant.Detail = 'Detail';
    ACCEPTANCE_TAB_Constant.Check = 'Check';
    ACCEPTANCE_TAB_Constant.CheckIn = 'Check In';
    ACCEPTANCE_TAB_Constant.Inspection = 'Inspection';
    var BIO_SECURITY_MASTER_PIG_TYPE_Constant = /** @class */ (function () {
        function BIO_SECURITY_MASTER_PIG_TYPE_Constant() {
        }
        return BIO_SECURITY_MASTER_PIG_TYPE_Constant;
    }());
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Sow = 'Sow';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Boar = 'Boar';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.NewBoar = 'New Boar';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Gilt = 'Gilt';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Suckling = 'Suckling';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Pig = 'Pig';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Finisher = 'Finisher';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Nursery = 'Nursery';
    BIO_SECURITY_MASTER_PIG_TYPE_Constant.Grower = 'Grower';
    var REPAIR_TAB_Constant = /** @class */ (function () {
        function REPAIR_TAB_Constant() {
        }
        return REPAIR_TAB_Constant;
    }());
    REPAIR_TAB_Constant.Detail = 'Detail';
    REPAIR_TAB_Constant.Record = 'Record';
    var SALE_ORDER_TAB_Constant = /** @class */ (function () {
        function SALE_ORDER_TAB_Constant() {
        }
        return SALE_ORDER_TAB_Constant;
    }());
    SALE_ORDER_TAB_Constant.Detail = 'Detail';
    SALE_ORDER_TAB_Constant.CheckOut = 'Check Out';
    var REQUISITION_TAB_Constant = /** @class */ (function () {
        function REQUISITION_TAB_Constant() {
        }
        return REQUISITION_TAB_Constant;
    }());
    REQUISITION_TAB_Constant.Detail = 'Detail';
    REQUISITION_TAB_Constant.Feed = 'Feed';
    REQUISITION_TAB_Constant.Material = 'Material';
    REQUISITION_TAB_Constant.Medicine = 'Medicine';
    REQUISITION_TAB_Constant.Thing = 'Thing';
    var PIG_DISEASE_TAB_Constant = /** @class */ (function () {
        function PIG_DISEASE_TAB_Constant() {
        }
        return PIG_DISEASE_TAB_Constant;
    }());
    PIG_DISEASE_TAB_Constant.Culling = 'Culling';
    PIG_DISEASE_TAB_Constant.Detail = 'Detail';
    var PIG_HOUSE_CLEANING_TAB_Constant = /** @class */ (function () {
        function PIG_HOUSE_CLEANING_TAB_Constant() {
        }
        return PIG_HOUSE_CLEANING_TAB_Constant;
    }());
    PIG_HOUSE_CLEANING_TAB_Constant.Plan = 'Plan';
    PIG_HOUSE_CLEANING_TAB_Constant.Detail = 'Detail';
    var PIG_FARM_VECTOR_TAB_Constant = /** @class */ (function () {
        function PIG_FARM_VECTOR_TAB_Constant() {
        }
        return PIG_FARM_VECTOR_TAB_Constant;
    }());
    PIG_FARM_VECTOR_TAB_Constant.Plan = 'Plan';
    PIG_FARM_VECTOR_TAB_Constant.Detail = 'Detail';
    var PIG_SETTING_TAB_Constant = /** @class */ (function () {
        function PIG_SETTING_TAB_Constant() {
        }
        return PIG_SETTING_TAB_Constant;
    }());
    PIG_SETTING_TAB_Constant.Code = 'Code';
    PIG_SETTING_TAB_Constant.Detail = 'Detail';
    PIG_SETTING_TAB_Constant.Testing = 'Testing';
    PIG_SETTING_TAB_Constant.Genetic = 'Genetic';
    PIG_SETTING_TAB_Constant.Pedigree = 'Pedigree';
    var RECORD_TAB_Constant = /** @class */ (function () {
        function RECORD_TAB_Constant() {
        }
        return RECORD_TAB_Constant;
    }());
    RECORD_TAB_Constant.Detail = 'Detail';
    RECORD_TAB_Constant.Move = 'Move';
    RECORD_TAB_Constant.Feeding = 'Feeding';
    RECORD_TAB_Constant.Death = 'Death';
    RECORD_TAB_Constant.Culling = 'Culling';
    RECORD_TAB_Constant.EarTag = 'EarTag';
    RECORD_TAB_Constant.Weighing = 'Weighing';
    var MessageConstants = /** @class */ (function () {
        function MessageConstants() {
        }
        return MessageConstants;
    }());
    MessageConstants.SYSTEM_ERROR_MSG = 'An error occurred while connecting to the server';
    MessageConstants.CONFIRM_LOCK_MSG = 'Are you sure you want to lock this account?';
    MessageConstants.CONFIRM_UNLOCK_MSG = 'Are you sure you want to unlock this account?';
    MessageConstants.CONFIRM_LOCK_STATUS_MSG = 'Are you sure you want to lock this record?';
    MessageConstants.CONFIRM_UNLOCK_STATUS_MSG = 'Are you sure you want to unlock this record?';
    MessageConstants.CONFIRM_STATUS_TITLE_MSG = 'Lock/Unlock record?';
    MessageConstants.CONFIRM_FEEDBACK_STATUS_MSG = 'Are you sure you want to reply to this message??';
    MessageConstants.CONFIRM_UNFEEDBACK_STATUS_MSG = 'Are you sure you want to change the status of this message??';
    MessageConstants.CONFIRM_FEEDBACK_STATUS_TITLE_MSG = 'Reply/Unresponsive to mail?';
    MessageConstants.CONFIRM_DELETE_MSG = 'Are you sure you want to delete this record?';
    MessageConstants.CONFIRM_DELETE_RANGE_MSG = 'Are you sure you want to delete these records?';
    MessageConstants.CONFIRM_LOCK_TITLE_MSG = 'Lock/Unlock account?';
    MessageConstants.CONFIRM_TITLE_MSG = 'Delete record?';
    MessageConstants.CONFIRM_DELETE_RANGE_TITLE_MSG = 'Delete multiple records?';
    MessageConstants.CONFIRM_PAY_MSG = 'Are you sure you want to pay this?';
    MessageConstants.CONFIRM_SET_DEFAULT_MSG = 'Are you sure you want to default to this record?';
    MessageConstants.CONFIRM_SET_IS_HOME_MSG = 'Are you sure you want to display this record on the homepage?';
    MessageConstants.CONFIRM_SET_NOT_IS_HOME_MSG = 'Are you sure you want to undisplay this record on the homepage?';
    MessageConstants.CONFIRM_PUBLISH_POST = 'Are you sure you want to publish this article??';
    MessageConstants.LOGIN_AGAIN_MSG = 'Your login session is over. Please login again.';
    MessageConstants.CREATED_OK_MSG = 'Create Successfully';
    MessageConstants.UPDATED_OK_MSG = 'Update successfully';
    MessageConstants.DELETED_OK_MSG = 'Delete successfully';
    MessageConstants.LOCKED_OK_MSG = 'Locked successfully';
    MessageConstants.UNLOCKED_OK_MSG = 'Unlock successfully';
    MessageConstants.SET_DEFAULT_OK_MSG = 'Default set success';
    MessageConstants.SET_IS_HOME_OK_MSG = 'Set homepage display successfully';
    MessageConstants.SET_NOT_IS_HOME_OK_MSG = 'Successfully undisplaying homepage';
    MessageConstants.FORBIDDEN = 'You are blocked from accessing';
    MessageConstants.CANNOT_EDIT_MULTIPLE = 'You cannot edit more than 1 record.';
    MessageConstants.NOT_CHOOSE_ANY_RECORD = 'You must select at least one record.';
    MessageConstants.UPLOAD_OK_MSG = 'Upload successful';
    MessageConstants.REQUIRED_ERROR_MSG = 'Data cannot be empty';
    MessageConstants.RELOAD_MENU = 'Reload menu';
    MessageConstants.SELECT_RECORD = 'Please select at least 1 record to delete!';
    MessageConstants.SEND_MAIL_OK_MSG = 'Email was sent. Please check your email';
    MessageConstants.SEND_MAIL_FAILED_MSG = 'Failure sending email error!';
    MessageConstants.CREATE_TITLE = 'Create record';
    MessageConstants.CREATE_MESSAGE = 'Are you sure you want to create this record?';
    MessageConstants.UPDATE_TITLE = 'Update record';
    MessageConstants.UPDATE_MESSAGE = 'Are you sure you want to update this record?';
    MessageConstants.DELETE_TITLE = 'Delete record';
    MessageConstants.DELETE_MESSAGE = 'Are you sure you want to delete this record?';
    MessageConstants.CANCEL_MESSAGE = 'Your data is safe!';
    MessageConstants.SERVER_ERROR = 'Server Error!';
    MessageConstants.EXIST_MESSAGE = 'The key already exist!';
    MessageConstants.EXIST_USERNAME_MESSAGE = 'The username already exist!';
    MessageConstants.CHOOSE_FARM_MESSAGE = 'Please choose a farm!';
    MessageConstants.SELECT_ORDER_MESSAGE = 'Please select a order!';
    MessageConstants.VALID_CHANGE_PASSWORD_MSG = "The new password and confirm password are empty!";
    MessageConstants.CONFIRM_CHANGE_PASSWORD_MSG = "Password and Confirm Password Validation";
    MessageConstants.YES_MSG = "Yes";
    MessageConstants.NO_MSG = "No";
    var ActionConstants = /** @class */ (function () {
        function ActionConstants() {
        }
        return ActionConstants;
    }());
    ActionConstants.ADD = 'add';
    ActionConstants.EDIT = 'edit';
    ActionConstants.VIEW = 'getall';
    ActionConstants.DELETE_RANGE = 'deleterange';
    ActionConstants.DELETE = 'delete';
    ActionConstants.EDIT_TITLE = 'Edit';
    ActionConstants.ADD_TITLE = 'Add new';
    ActionConstants.Add = 'add';
    ActionConstants.Edit = 'edit';
    var ImagePathConstants = /** @class */ (function () {
        function ImagePathConstants() {
        }
        return ImagePathConstants;
    }());
    ImagePathConstants.NO_IMAGE = '/assets/images/default-avatar-male.png';
    ImagePathConstants.NO_IMAGE_COMPONENT = '/assets/images/pages/content-img-4.jpg';
    ImagePathConstants.NO_IMAGE_ACTION_COMPONENT = '/assets/images/no-image.png';
    var SystemConfigConst = /** @class */ (function () {
        function SystemConfigConst() {
        }
        return SystemConfigConst;
    }());
    SystemConfigConst.Order_Amount = "ORDER_AMOUNT";
    SystemConfigConst.Order = "Order";
    SystemConfigConst.Pig_NO = "ID_NO";
    SystemConfigConst.Pig = "Pig";
    SystemConfigConst.GrowDays = "GrowDays";
    SystemConfigConst.Finisher = "Finisher";
    SystemConfigConst.Grower = "Grower";
    SystemConfigConst.Nursry = "Nursery";
    SystemConfigConst.Sucking = "Suckling";
    SystemConfigConst.Sale = "Sale";

    var RoleConstant = /** @class */ (function () {
        function RoleConstant() {
        }
        return RoleConstant;
    }());
    RoleConstant.ADMIN = 1;
    RoleConstant.SUPER_ADMIN = 8;
    RoleConstant.SUPERVISOR = 2;
    RoleConstant.STAFF = 3;
    RoleConstant.WORKER = 4;
    RoleConstant.DISPATCHER = 6;

    var ActionConstant = /** @class */ (function () {
        function ActionConstant() {
        }
        return ActionConstant;
    }());
    ActionConstant.CREATE = 'Add';
    ActionConstant.EDIT = 'Edit';
    ActionConstant.DELETE = 'Delete';
    ActionConstant.VIEW = 'Read';
    ActionConstant.APPROVAL = 'APPROVAL';
    ActionConstant.EXCEL_EXPORT = 'ExcelExport';
    ActionConstant.EXCEL_IMPORT = 'EXCEL_IMPORT';
    ActionConstant.PRINT = 'PRINT';
    ActionConstant.DONE = 'DONE';
    ActionConstant.FINISH = 'FINISH';
    ActionConstant.RELEASE = 'RELEASE';
    ActionConstant.REJECT = 'REJECT';
    ActionConstant.CLONE = 'CLONE';

    var MultiPigGridComponent = /** @class */ (function () {
        function MultiPigGridComponent(baseUrl, service, alertify, translate) {
            this.baseUrl = baseUrl;
            this.service = service;
            this.alertify = alertify;
            this.translate = translate;
            this.height = 300;
            this.type = '';
            this.recordGuid = '';
            this.penGuid = '';
            this.checked = '';
            this.onCheckedChange = new i0.EventEmitter();
            this.pageSettings = {
                pageCount: 10,
                pageSizes: 20,
                enableQueryString: true,
                pageSize: 10,
                currentPage: 1,
                enableScroll: true,
            };
            this.searchOptions = { fields: ['name'], operator: 'contains', ignoreCase: true };
            this.alert = {
                updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
                updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
                createMessage: this.translate.instant(MessageConstants.CREATE_MESSAGE),
                createTitle: this.translate.instant(MessageConstants.CREATE_TITLE),
                deleteMessage: this.translate.instant(MessageConstants.DELETE_MESSAGE),
                deleteTitle: this.translate.instant(MessageConstants.DELETE_TITLE),
                cancelMessage: this.translate.instant(MessageConstants.CANCEL_MESSAGE),
                serverError: this.translate.instant(MessageConstants.SERVER_ERROR),
                deleted_ok_msg: this.translate.instant(MessageConstants.DELETED_OK_MSG),
                created_ok_msg: this.translate.instant(MessageConstants.CREATED_OK_MSG),
                updated_ok_msg: this.translate.instant(MessageConstants.UPDATED_OK_MSG),
                system_error_msg: this.translate.instant(MessageConstants.SYSTEM_ERROR_MSG),
                exist_message: this.translate.instant(MessageConstants.EXIST_MESSAGE),
                choose_farm_message: this.translate.instant(MessageConstants.CHOOSE_FARM_MESSAGE),
                select_order_message: this.translate.instant(MessageConstants.SELECT_ORDER_MESSAGE),
                yes_message: this.translate.instant(MessageConstants.YES_MSG),
                no_message: this.translate.instant(MessageConstants.NO_MSG),
            };
        }
        MultiPigGridComponent.prototype.ngOnChanges = function (changes) {
            // if (changes.pigData.currentValue != changes.pigData.previousValue) {
            //   this.pigData = changes.pigData.currentValue;
            // }
        };
        MultiPigGridComponent.prototype.ngOnInit = function () {
        };
        MultiPigGridComponent.prototype.onChangeChecked = function (e, data) {
            var checked = e.checked;
            this.onCheckedChange.emit(e);
            this.toggle(checked, data.guid);
        };
        MultiPigGridComponent.prototype.toggle = function (checked, pigGuid) {
            var _this = this;
            if (checked === false && this.recordGuid) {
                this.model = {
                    recordGuid: this.recordGuid || "",
                    pigGuid: pigGuid,
                    type: this.type
                };
                this.service.removeRecord2Pig(this.model).subscribe(function (res) {
                    if (res.success === true) {
                        _this.alertify.success(_this.alert.deleted_ok_msg);
                        _this.loadDataByRoom();
                    }
                    else {
                        _this.alertify.warning(_this.alert.system_error_msg);
                    }
                }, function (error) {
                    _this.alertify.warning(_this.alert.system_error_msg);
                });
            }
            else {
                if (this.recordGuid) {
                    this.model = {
                        recordGuid: this.recordGuid || "",
                        pigGuid: pigGuid,
                        type: this.type
                    };
                    this.service.addRecord2Pig(this.model).subscribe(function (res) {
                        if (res.success === true) {
                            _this.alertify.success(_this.alert.created_ok_msg);
                            _this.loadDataByRoom();
                        }
                        else {
                            _this.alertify.warning(_this.alert.system_error_msg);
                        }
                    }, function (error) {
                        _this.alertify.warning(_this.alert.system_error_msg);
                    });
                }
            }
        };
        MultiPigGridComponent.prototype.loadDataByRoom = function () {
            var accessToken = localStorage.getItem("token");
            this.pigData = new ej2Data.DataManager({
                url: this.baseUrl + "Pen/GetPigsByPen?penGuid=" + (this.penGuid || "") + "&recordGuid=" + (this.recordGuid || "") + "&type=" + (this.type || ""),
                adaptor: new ej2Data.UrlAdaptor(),
                headers: [{ authorization: "Bearer " + accessToken }],
            });
        };
        return MultiPigGridComponent;
    }());
    MultiPigGridComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-multi-pig-grid',
                    template: "<ejs-grid\r\n#piggrid\r\nid=\"pig-grid\"\r\n[dataSource]=\"pigData\"\r\n[enableInfiniteScrolling]=\"true\"\r\n[allowPaging]=\"false\"\r\n[pageSettings]=\"pageSettings\"\r\n[searchSettings]=\"searchOptions\"\r\n[toolbar]=\"['Search']\"\r\n[height]=\"height + 'px'\"\r\ngridLines=\"Both\"\r\n>\r\n<e-columns>\r\n<e-column\r\n  field=\"name\"\r\n  [allowSorting]=\"false\"\r\n  [allowSearching]=\"false\"\r\n  [allowGrouping]=\"false\"\r\n  [allowFiltering]=\"true\"\r\n  [allowEditing]=\"false\"\r\n  textAlign=\"Left\"\r\n          headerTextAlign=\"Center\"\r\n  width=\"80\"\r\n  headerTextAlign=\"Center\"\r\n  headerText=\"{{ 'PIG' | translate }}\"\r\n>\r\n  <ng-template #template let-data>\r\n    <ejs-checkbox #checkbox (change)=\"onChangeChecked($event, data)\" [label]=\"data.name\" [checked]=\"data.checked\"></ejs-checkbox>\r\n  </ng-template>\r\n</e-column>\r\n\r\n</e-columns>\r\n</ejs-grid>\r\n",
                    styles: [""]
                },] }
    ];
    MultiPigGridComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: PigfarmCoreService },
        { type: AlertifyService },
        { type: i1$1.TranslateService }
    ]; };
    MultiPigGridComponent.propDecorators = {
        height: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        recordGuid: [{ type: i0.Input }],
        penGuid: [{ type: i0.Input }],
        checked: [{ type: i0.Input }],
        onCheckedChange: [{ type: i0.Output, args: ['onCheckedChange',] }],
        pigData: [{ type: i0.Input }]
    };

    var Record2PenComponent = /** @class */ (function () {
        function Record2PenComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "pen2-remote";
            this.placeholder = "";
            this.roomGuid = false;
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.onblurChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['penName', 'penNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        Record2PenComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        Record2PenComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.id === 0 ? _this.trans.instant(x.name) : x.name;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        Record2PenComponent.prototype.ngOnInit = function () {
        };
        Record2PenComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        Record2PenComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        Record2PenComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        Record2PenComponent.prototype.onblur = function (e) {
            this.onblurChange.emit(e);
        };
        return Record2PenComponent;
    }());
    Record2PenComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-record2-pen',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #pen2Remote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n  (blur)='onblur($event)'\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    Record2PenComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    Record2PenComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        roomGuid: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        onblurChange: [{ type: i0.Output, args: ['onblur',] }],
        dropdownObj: [{ type: i0.ViewChild, args: ['pen2Remote',] }],
        data: [{ type: i0.Input }],
        query: [{ type: i0.Input }]
    };

    var Record2RoomComponent = /** @class */ (function () {
        function Record2RoomComponent(baseUrl) {
            this.baseUrl = baseUrl;
        }
        Record2RoomComponent.prototype.ngOnInit = function () {
        };
        return Record2RoomComponent;
    }());
    Record2RoomComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-record2-room',
                    template: "<p>\r\n  record2-room works!\r\n</p>\r\n",
                    styles: [""]
                },] }
    ];
    Record2RoomComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] }
    ]; };

    var MakeorderDropdownlistComponent = /** @class */ (function () {
        function MakeorderDropdownlistComponent(baseUrl, trans, cd, service) {
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.cd = cd;
            this.service = service;
            this.id = "makeorder-remote";
            this.selectedValue = '';
            this.placeholder = "";
            this.pigType = "";
            this.disabled = false;
            this.popupWidth = 'auto';
            this.change = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'orderName', value: 'guid' };
        }
        MakeorderDropdownlistComponent.prototype.ngOnDestroy = function () {
            var _a, _b;
            (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            (_b = this.subscription2) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        };
        MakeorderDropdownlistComponent.prototype.ngAfterViewChecked = function () {
            this.selectedValue = this.selectedValue || "";
            this.cd.detectChanges();
        };
        MakeorderDropdownlistComponent.prototype.ngOnInit = function () {
            if (!this.pigType) {
                this.loadData();
            }
        };
        MakeorderDropdownlistComponent.prototype.loadData = function () {
            var _this = this;
            this.subscription = this.service.getMakeOrderByFarmGuid(localStorage.getItem('farmGuid')).subscribe(function (x) {
                _this.data = x;
            });
        };
        MakeorderDropdownlistComponent.prototype.loadDataByPigType = function () {
            var _this = this;
            this.subscription2 = this.service.getMakeOrderByFarmGuidAndPigType(localStorage.getItem('farmGuid'), this.pigType).subscribe(function (x) {
                _this.data = x;
            });
        };
        MakeorderDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            if (changes['selectedValue']) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            if (changes['pigType'] && changes['pigType'].currentValue) {
                this.loadDataByPigType();
            }
        };
        MakeorderDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueChange.emit(args.value);
        };
        return MakeorderDropdownlistComponent;
    }());
    MakeorderDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-makeorder-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [popupWidth]=\"popupWidth\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    MakeorderDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: i0.ChangeDetectorRef },
        { type: PigfarmCoreService }
    ]; };
    MakeorderDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        pigType: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        popupWidth: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var SelectedpigGridComponent = /** @class */ (function () {
        function SelectedpigGridComponent(baseUrl, trans, cd, service) {
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.cd = cd;
            this.service = service;
            this.pigName = 'Gilt';
            this.selectedPigDataSource = [];
            this.recordNextDataSource = ["CullingSale", "Chemical", "Buried"];
            this.recordNext2DataSource = ["CullingSale", "Chemical", "Buried"];
            this.searchOptions = { fields: ["name"], operator: "contains", ignoreCase: true };
            this.avgWeightChange = new i0.EventEmitter();
            this.totalWeightChange = new i0.EventEmitter();
            this.avgAmountChange = new i0.EventEmitter();
            this.totalAmountChange = new i0.EventEmitter();
            this.selectedPigDataSourceChange = new i0.EventEmitter();
            this.maleAvgWeightChange = new i0.EventEmitter();
            this.maleTotalWeightChange = new i0.EventEmitter();
            this.maleTotalSelectedChange = new i0.EventEmitter();
            this.femaleAvgWeightChange = new i0.EventEmitter();
            this.femaleTotalWeightChange = new i0.EventEmitter();
            this.femaleTotalSelectedChange = new i0.EventEmitter();
            this.visibleNextRoom = false;
            this.visibleNextPen = false;
            this.visibleNext2 = false;
            this.visibleButton = false;
            this.visibleNext = true;
            this.visibleAmount = true;
            this.visibleDisease = true;
            this.visibleWeight = true;
            this.visibleValue = false;
            this.visiblePigSex = false;
            this.visibleSourceGuid = false;
            this.visibleSource1Guid = false;
            this.visibleSource2Guid = false;
            this.visibleSource3Guid = false;
            this.visibleSemenConcentration = false;
            this.visibleSemenVolume = false;
            this.visibleMalformationRate = false;
            this.visiblePig = true;
            this.visibleRfid = false;
            this.valueLabel = "";
            this.pigLabel = "Pig";
            this.next1Label = "Next1";
            this.next2Label = "Next2";
            this.editSettingsPig = {
                showDeleteConfirmDialog: false,
                allowEditing: true,
                allowAdding: true,
                allowDeleting: true,
                mode: "Normal",
            };
            this.subscription = new rxjs.Subscription();
            this.average = function (nums, length) {
                if (nums.length > 0) {
                    return nums.reduce(function (a, b) { return a + b; }) / length;
                }
                return 0;
            };
            this.total = function (nums) {
                if (nums.length > 0) {
                    return nums.reduce(function (a, b) { return a + b; });
                }
                return 0;
            };
            var user = JSON.parse(localStorage.getItem("user"));
            var pageSize = Number(user === null || user === void 0 ? void 0 : user.pageSizeSettingValue) || 10;
            var pageSizesTemp = (user === null || user === void 0 ? void 0 : user.pageSizeSettingList) || ["5", "10", "12", "20"];
            var pageSizes = pageSizesTemp.map(function (x) { return +x; });
            this.pageSettings = {
                pageSizes: pageSizes,
                enableQueryString: true,
                pageSize: pageSize,
                currentPage: 1,
                enableScroll: true,
            };
        }
        SelectedpigGridComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        SelectedpigGridComponent.prototype.ngAfterViewInit = function () {
            var e_1, _q;
            var _this = this;
            var buttons = document.getElementsByClassName("btn");
            try {
                for (var _r = __values(Array.from(buttons)), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var button = _s.value;
                    button.addEventListener("click", function () {
                        var _a;
                        (_a = _this.grid) === null || _a === void 0 ? void 0 : _a.endEdit();
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_q = _r.return)) _q.call(_r);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        SelectedpigGridComponent.prototype.ngOnChanges = function (changes) {
            if (changes["selectedPigDataSource"]) {
                this.caculator();
                this.cd.detectChanges();
            }
        };
        SelectedpigGridComponent.prototype.created = function () {
            var _this = this;
            this.subscription.add(this.service.currentRecordLabel.subscribe(function (data) {
                if (data) {
                    _this.valueLabel = data;
                    _this.grid.refreshHeader();
                }
            }));
        };
        SelectedpigGridComponent.prototype.ngOnInit = function () {
            this.totalAmount = 0;
            this.totalWeight = 0;
            this.avgWeight = 0;
            this.femaleTotalWeight = 0;
            this.maleTotalWeight = 0;
            this.maleAvgWeight = 0;
            this.maleAvgWeight = 0;
        };
        SelectedpigGridComponent.prototype.actionBeginPig = function (e) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            if (e.action === "edit" && e.requestType === "save") {
                if (this.diseaseItem) {
                    e.data.recordDisease = (_a = this.diseaseItem) === null || _a === void 0 ? void 0 : _a.guid;
                    e.data.recordDiseaseName = (_b = this.diseaseItem) === null || _b === void 0 ? void 0 : _b.name;
                }
                if (this.recordNextItem) {
                    e.data.recordNext = (_c = this.recordNextItem) === null || _c === void 0 ? void 0 : _c.guid;
                    e.data.recordNextName = (_d = this.recordNextItem) === null || _d === void 0 ? void 0 : _d.name;
                }
                if (this.recordNext2Item) {
                    e.data.recordNext2 = (_e = this.recordNext2Item) === null || _e === void 0 ? void 0 : _e.guid;
                    e.data.recordNext2Name = (_f = this.recordNext2Item) === null || _f === void 0 ? void 0 : _f.name;
                }
                if (this.nextRoomItem) {
                    e.data.nextRoom = (_g = this.nextRoomItem) === null || _g === void 0 ? void 0 : _g.guid;
                    e.data.nextRoomName = (_h = this.nextRoomItem) === null || _h === void 0 ? void 0 : _h.name;
                }
                var index = e.rowIndex;
                if (index !== -1) {
                    this.selectedPigDataSource[index].rfid = e.data.rfid;
                    this.selectedPigDataSource[index].recordValue = e.data.recordValue;
                    this.selectedPigDataSource[index].recordAmount = e.data.recordAmount;
                    this.selectedPigDataSource[index].recordWeight = e.data.recordWeight;
                    this.selectedPigDataSource[index].sourceGuid = e.data.sourceGuid;
                    this.selectedPigDataSource[index].source1Guid = e.data.source1Guid;
                    this.selectedPigDataSource[index].source2Guid = e.data.source2Guid;
                    this.selectedPigDataSource[index].source3Guid = e.data.source3Guid;
                    this.selectedPigDataSource[index].semenConcentration = e.data.semenConcentration;
                    this.selectedPigDataSource[index].semenVolume = e.data.semenVolume;
                    this.selectedPigDataSource[index].malformationRate = e.data.malformationRate;
                    this.selectedPigDataSource[index].recordNext = (_j = this.recordNextItem) === null || _j === void 0 ? void 0 : _j.guid;
                    this.selectedPigDataSource[index].recordNext2 = (_k = this.recordNext2Item) === null || _k === void 0 ? void 0 : _k.guid;
                    this.selectedPigDataSource[index].recordNextName = (_l = this.recordNextItem) === null || _l === void 0 ? void 0 : _l.name;
                    this.selectedPigDataSource[index].recordNext2Name = (_m = this.recordNext2Item) === null || _m === void 0 ? void 0 : _m.name;
                    this.selectedPigDataSource[index].nextRoomName = (_o = this.nextRoomItem) === null || _o === void 0 ? void 0 : _o.name;
                    this.selectedPigDataSource[index].nextPenName = (_p = this.nextPenItem) === null || _p === void 0 ? void 0 : _p.name;
                    this.cd.detectChanges();
                    this.caculator();
                }
            }
        };
        SelectedpigGridComponent.prototype.onChangeRecordNext = function (e, data) {
            var _a, _b, _c, _d;
            if (e.isInteracted) {
                data.recordNext = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
                data.recordNextName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
                this.recordNextItem = e.itemData;
                this.recordNextndex = this.selectedPigDataSource.findIndex(function (obj) { return obj.pigGuid === data.pigGuid; });
                if (this.recordNextndex !== -1) {
                    this.selectedPigDataSource[this.recordNextndex].recordNext = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                    this.selectedPigDataSource[this.recordNextndex].recordNextName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                    this.cd.detectChanges();
                }
            }
        };
        SelectedpigGridComponent.prototype.onChangeRecordNext2 = function (e, data) {
            var _a, _b, _c, _d;
            if (e.isInteracted) {
                data.recordNext2 = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
                data.recordNext2Name = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
                this.recordNext2Item = e.itemData;
                this.recordNextndex2 = this.selectedPigDataSource.findIndex(function (obj) { return obj.pigGuid === data.pigGuid; });
                if (this.recordNextndex2 !== -1) {
                    this.selectedPigDataSource[this.recordNextndex2].recordNext2 = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                    this.selectedPigDataSource[this.recordNextndex2].recordNext2Name = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                    this.cd.detectChanges();
                }
            }
        };
        SelectedpigGridComponent.prototype.onChangePigSex = function (e, data) {
            var _a, _b, _c, _d;
            if (e.isInteracted) {
                data.pigSex = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
                data.pigSexName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
                this.pigSexItem = e.itemData;
                this.pigSexIndex = this.selectedPigDataSource.findIndex(function (obj) { return obj.pigGuid === data.pigGuid; });
                if (this.pigSexIndex !== -1) {
                    this.selectedPigDataSource[this.pigSexIndex].pigSex = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                    this.selectedPigDataSource[this.pigSexIndex].pigSexName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                    this.cd.detectChanges();
                }
            }
        };
        SelectedpigGridComponent.prototype.onChangeDisease = function (e, data) {
            var _a, _b, _c, _d;
            if (e.isInteracted) {
                data.recordDisease = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
                data.recordDiseaseName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
                this.diseaseItem = e.itemData;
                this.index = this.selectedPigDataSource.findIndex(function (obj) { return obj.pigGuid === data.pigGuid; });
                if (this.index !== -1) {
                    this.selectedPigDataSource[this.index].recordDisease = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                    this.selectedPigDataSource[this.index].recordDiseaseName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                    // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
                    this.cd.detectChanges();
                }
            }
        };
        SelectedpigGridComponent.prototype.onChangeNextRoom = function (e, data) {
            var _a, _b, _c, _d;
            if (e.isInteracted) {
                data.nextRoom = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
                data.nextRoomName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
                this.nextRoomItem = e.itemData;
                var index = this.selectedPigDataSource.findIndex(function (obj) { return obj.nextRoom === data.nextRoom; });
                if (index !== -1) {
                    this.selectedPigDataSource[index].nextRoom = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                    this.selectedPigDataSource[index].nextRoomName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                    // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
                    this.cd.detectChanges();
                }
            }
        };
        SelectedpigGridComponent.prototype.onChangeNextPen = function (e, data) {
            var _a, _b, _c, _d;
            if (e.isInteracted) {
                data.nextPen = (_a = e.itemData) === null || _a === void 0 ? void 0 : _a.guid;
                data.nextPenName = (_b = e.itemData) === null || _b === void 0 ? void 0 : _b.name;
                this.nextPenItem = e.itemData;
                var index = this.selectedPigDataSource.findIndex(function (obj) { return obj.nextPen === data.nextPen; });
                if (index !== -1) {
                    this.selectedPigDataSource[index].nextPen = (_c = e.itemData) === null || _c === void 0 ? void 0 : _c.guid;
                    this.selectedPigDataSource[index].nextPenName = (_d = e.itemData) === null || _d === void 0 ? void 0 : _d.name;
                    // this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
                    this.cd.detectChanges();
                }
            }
        };
        SelectedpigGridComponent.prototype.caculator = function () {
            var weights = this.selectedPigDataSource
                .filter(function (x) { return x.recordWeight > 0; })
                .map(function (x) { return x.recordWeight; });
            var amounts = this.selectedPigDataSource
                .filter(function (x) { return x.recordAmount > 0; })
                .map(function (x) { return x.recordAmount; });
            var length = this.selectedPigDataSource.length;
            this.avgWeight = +this.average(weights, length).toFixed(0);
            this.avgAmount = +this.average(amounts, length).toFixed(0);
            this.totalWeight = +this.total(weights).toFixed(0);
            this.totalAmount = +this.total(amounts).toFixed(0);
            var maleWeights = this.selectedPigDataSource
                .filter(function (x) { return x.pigSex == "1"; })
                .map(function (x) { return x.recordWeight; });
            var femaleWeights = this.selectedPigDataSource
                .filter(function (x) { return x.pigSex !== "1"; })
                .map(function (x) { return x.recordWeight; });
            var femalelength = femaleWeights.length;
            this.femaleAvgWeight = +this.average(femaleWeights, femalelength).toFixed(0);
            this.femaleTotalWeight = +this.total(femaleWeights).toFixed(0);
            this.femaleTotalSelected = femalelength;
            this.femaleAvgWeightChange.emit(this.femaleAvgWeight);
            this.femaleTotalWeightChange.emit(this.femaleTotalWeight);
            this.femaleTotalSelectedChange.emit(this.femaleTotalSelected);
            var malelength = maleWeights.length;
            this.maleAvgWeight = +this.average(maleWeights, malelength).toFixed(0);
            this.maleTotalWeight = +this.total(maleWeights).toFixed(0);
            this.maleTotalSelected = malelength;
            this.maleAvgWeightChange.emit(this.maleAvgWeight);
            this.maleTotalWeightChange.emit(this.maleTotalWeight);
            this.maleTotalSelectedChange.emit(this.maleTotalSelected);
            this.selectedPigDataSourceChange.emit(this.selectedPigDataSource);
            this.avgAmountChange.emit(this.avgAmount);
            this.avgWeightChange.emit(this.avgWeight);
            this.totalAmountChange.emit(this.totalAmount);
            this.totalWeightChange.emit(this.totalWeight);
            this.cd.detectChanges();
        };
        return SelectedpigGridComponent;
    }());
    SelectedpigGridComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "app-selectedpig-grid",
                    template: "<ejs-grid\r\n          #grid\r\n          id=\"grid-detail\"\r\n          [dataSource]=\"selectedPigDataSource\"\r\n          [enableInfiniteScrolling]=\"true\"\r\n          [allowPaging]=\"false\"\r\n          [pageSettings]=\"pageSettings\"\r\n          [editSettings]=\"editSettingsPig\"\r\n          [searchSettings]=\"searchOptions\"\r\n          (actionBegin)=\"actionBeginPig($event)\"\r\n          (created)=\"created()\"\r\n          [toolbar]=\"['Search']\"\r\n          [height]=\"300 + 'px'\"\r\n          gridLines=\"Both\"\r\n        >\r\n          <e-columns>\r\n            <e-column\r\n              field=\"name\"\r\n              [allowSorting]=\"false\"\r\n              [visible]=\"visiblePig\"\r\n\r\n              [allowSearching]=\"false\"\r\n              [allowGrouping]=\"false\"\r\n              [allowFiltering]=\"false\"\r\n              [allowEditing]=\"false\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ pigName | translate }}\"\r\n            >\r\n            </e-column>\r\n            \r\n\r\n            <e-column\r\n            field=\"pigSexName\"\r\n            [visible]=\"visiblePigSex\"\r\n            [allowEditing]=\"false\"\r\n            textAlign=\"Left\"\r\n            headerTextAlign=\"Center\"\r\n            headerText=\"{{ 'PigSex' | translate }}\"\r\n          >\r\n          </e-column>\r\n\r\n          <e-column\r\n          field=\"rfid\"\r\n          [visible]=\"visibleRfid\"\r\n          textAlign=\"Left\"\r\n          [validationRules]=\" {maxLength: 40 }\"\r\n          headerTextAlign=\"Center\"\r\n          headerText=\"{{ 'RFID' | translate }}\"\r\n        >\r\n        </e-column>\r\n            <e-column\r\n              field=\"recordValue\"\r\n              [visible]=\"visibleValue\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n            >\r\n            <ng-template #headerTemplate let-data>\r\n              <span class=\"e-headertext\" >{{valueLabel}}</span>\r\n          </ng-template>\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordAmount\"\r\n              [visible]=\"visibleAmount\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              editType=\"numericEdit\"\r\n              headerText=\"{{ 'Amount' | translate }}\"\r\n            >\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordWeight\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              [visible]=\"visibleWeight\"\r\n              editType=\"numericEdit\"\r\n              headerText=\"{{ 'Weight' | translate }}\"\r\n            >\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordDiseaseName\"\r\n              [visible]=\"visibleDisease\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ 'Disease' | translate }}\"\r\n            >\r\n            <ng-template #editTemplate let-data>\r\n              <app-disease-dropdownlist [(selectedValue)]=\"data.recordDisease\" (change)=\"onChangeDisease($event,data)\">\r\n              </app-disease-dropdownlist>\r\n            </ng-template>\r\n            <ng-template #template let-data>\r\n              {{ data.recordDiseaseName }}\r\n            </ng-template>\r\n            </e-column>\r\n            <e-column\r\n              field=\"recordNext\"\r\n              [visible]=\"visibleNext\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ next1Label | translate }}\"\r\n            >\r\n            <ng-template #editTemplate let-data>\r\n              <app-code-type-dropdownlist\r\n              id=\"recordNext\"\r\n              [codeType]=\"codeType\"\r\n              (change)=\"onChangeRecordNext($event, data)\"\r\n              [(selectedValue)]=\"data.recordNext\"\r\n            >\r\n            </app-code-type-dropdownlist>\r\n            </ng-template>\r\n            <ng-template #template let-data>\r\n              {{ data.recordNextName | translate }}\r\n            </ng-template>\r\n            </e-column>\r\n\r\n            <e-column\r\n              field=\"recordNext2\"\r\n              [visible]=\"visibleNext2\"\r\n              textAlign=\"Left\"\r\n              headerTextAlign=\"Center\"\r\n              headerText=\"{{ next2Label | translate }}\"\r\n            >\r\n            <ng-template #editTemplate let-data>\r\n              <app-code-type-dropdownlist\r\n              id=\"recordNext2\"\r\n              [codeType]=\"codeType2\"\r\n              (change)=\"onChangeRecordNext2($event, data)\"\r\n              [(selectedValue)]=\"data.recordNext2\"\r\n            >\r\n            </app-code-type-dropdownlist>\r\n            </ng-template>\r\n            <ng-template #template let-data>\r\n              {{ data.recordNext2Name | translate }}\r\n            </ng-template>\r\n            </e-column>\r\n\r\n            <e-column\r\n            field=\"nextRoom\"\r\n            [visible]=\"visibleNextRoom\"\r\n            textAlign=\"Left\"\r\n            headerTextAlign=\"Center\"\r\n            headerText=\"{{ 'NextRoom' | translate }}\"\r\n          >\r\n          <ng-template #editTemplate let-data>\r\n            <app-room-dropdownlist\r\n            id=\"nextRoom\"\r\n            (change)=\"onChangeNextRoom($event, data)\"\r\n            [(selectedValue)]=\"data.nextRoom\"\r\n          >\r\n          </app-room-dropdownlist>\r\n          </ng-template>\r\n          <ng-template #template let-data>\r\n            {{ data.nextRoomName | translate }}\r\n          </ng-template>\r\n          </e-column>\r\n\r\n          \r\n          <e-column\r\n          field=\"nextPen\"\r\n          [visible]=\"visibleNextPen\"\r\n          textAlign=\"Left\"\r\n          headerTextAlign=\"Center\"\r\n          headerText=\"{{ 'NextPen' | translate }}\"\r\n        >\r\n        <ng-template #editTemplate let-data>\r\n          <app-pen-dropdownlist\r\n          id=\"nextPen\"\r\n          (change)=\"onChangeNextPen($event, data)\"\r\n          [(selectedValue)]=\"data.nextPen\"\r\n        >\r\n        </app-pen-dropdownlist>\r\n        </ng-template>\r\n        <ng-template #template let-data>\r\n          {{ data.nextPenName | translate }}\r\n        </ng-template>\r\n        </e-column>\r\n\r\n\r\n        <e-column\r\n        field=\"sourceGuid\"\r\n        textAlign=\"Left\"\r\n        headerTextAlign=\"Center\"\r\n        [validationRules]=' { maxLength: 40 }'\r\n        [visible]=\"visibleSourceGuid\"\r\n        headerText=\"{{ 'SourceGuid' | translate }}\"\r\n      >\r\n      </e-column>\r\n      <e-column\r\n      field=\"source1Guid\"\r\n      [validationRules]=' { maxLength: 40 }'\r\n      textAlign=\"Left\"\r\n      headerTextAlign=\"Center\"\r\n      [visible]=\"visibleSource1Guid\"\r\n      headerText=\"{{ 'Source1Guid' | translate }}\"\r\n    >\r\n    </e-column>\r\n\r\n\r\n      <e-column\r\n      field=\"source2Guid\"\r\n      [validationRules]=' { maxLength: 40 }'\r\n      textAlign=\"Left\"\r\n      headerTextAlign=\"Center\"\r\n      [visible]=\"visibleSource2Guid\"\r\n      headerText=\"{{ 'Source2Guid' | translate }}\"\r\n    >\r\n    </e-column>\r\n\r\n\r\n      <e-column\r\n      field=\"source3Guid\"\r\n      [validationRules]=' { maxLength: 40 }'\r\n      textAlign=\"Left\"\r\n      headerTextAlign=\"Center\"\r\n      [visible]=\"visibleSource3Guid\"\r\n      headerText=\"{{ 'Source3Guid' | translate }}\"\r\n    >\r\n    </e-column>\r\n\r\n    <e-column\r\n    field=\"semenConcentration \"\r\n    textAlign=\"Left\"\r\n    headerTextAlign=\"Center\"\r\n    [visible]=\"visibleSemenConcentration\"\r\n    editType=\"numericEdit\"\r\n    headerText=\"{{ 'SemenConcentration ' | translate }}\"\r\n  >\r\n  </e-column>\r\n\r\n\r\n    <e-column\r\n    field=\"semenVolume\"\r\n    textAlign=\"Left\"\r\n    headerTextAlign=\"Center\"\r\n    [visible]=\"visibleSemenVolume\"\r\n    editType=\"numericEdit\"\r\n    headerText=\"{{ 'Source2Guid' | translate }}\"\r\n  >\r\n  </e-column>\r\n\r\n\r\n    <e-column\r\n    field=\"malformationRate\"\r\n    textAlign=\"Left\"\r\n    headerTextAlign=\"Center\"\r\n    [visible]=\"visibleMalformationRate\"\r\n    editType=\"numericEdit\"\r\n    [edit]=\"{ params: { decimals: 2, min: 0, max: 0.9 } }\"\r\n    headerText=\"{{ 'MalformationRate' | translate }}\"\r\n  >\r\n  </e-column>\r\n\r\n\r\n          </e-columns>\r\n        </ejs-grid>\r\n",
                    providers: [ej2AngularGrids.EditService],
                    styles: [""]
                },] }
    ];
    SelectedpigGridComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: i0.ChangeDetectorRef },
        { type: PigfarmCoreService }
    ]; };
    SelectedpigGridComponent.propDecorators = {
        pigName: [{ type: i0.Input }],
        selectedPigDataSource: [{ type: i0.Input }],
        recordNextDataSource: [{ type: i0.Input }],
        recordNext2DataSource: [{ type: i0.Input }],
        grid: [{ type: i0.ViewChild, args: ["grid",] }],
        avgWeightChange: [{ type: i0.Output }],
        totalWeightChange: [{ type: i0.Output }],
        avgAmountChange: [{ type: i0.Output }],
        totalAmountChange: [{ type: i0.Output }],
        selectedPigDataSourceChange: [{ type: i0.Output }],
        maleAvgWeightChange: [{ type: i0.Output }],
        maleTotalWeightChange: [{ type: i0.Output }],
        maleTotalSelectedChange: [{ type: i0.Output }],
        femaleAvgWeightChange: [{ type: i0.Output }],
        femaleTotalWeightChange: [{ type: i0.Output }],
        femaleTotalSelectedChange: [{ type: i0.Output }],
        visibleNextRoom: [{ type: i0.Input }],
        visibleNextPen: [{ type: i0.Input }],
        visibleNext2: [{ type: i0.Input }],
        visibleButton: [{ type: i0.Input }],
        visibleNext: [{ type: i0.Input }],
        visibleAmount: [{ type: i0.Input }],
        visibleDisease: [{ type: i0.Input }],
        visibleWeight: [{ type: i0.Input }],
        visibleValue: [{ type: i0.Input }],
        visiblePigSex: [{ type: i0.Input }],
        visibleSourceGuid: [{ type: i0.Input }],
        visibleSource1Guid: [{ type: i0.Input }],
        visibleSource2Guid: [{ type: i0.Input }],
        visibleSource3Guid: [{ type: i0.Input }],
        visibleSemenConcentration: [{ type: i0.Input }],
        visibleSemenVolume: [{ type: i0.Input }],
        visibleMalformationRate: [{ type: i0.Input }],
        visiblePig: [{ type: i0.Input }],
        visibleRfid: [{ type: i0.Input }],
        valueLabel: [{ type: i0.Input }],
        pigLabel: [{ type: i0.Input }],
        next1Label: [{ type: i0.Input }],
        next2Label: [{ type: i0.Input }],
        avgWeight: [{ type: i0.Input }],
        totalWeight: [{ type: i0.Input }],
        totalAmount: [{ type: i0.Input }],
        avgAmount: [{ type: i0.Input }],
        codeType: [{ type: i0.Input }],
        codeType2: [{ type: i0.Input }],
        maleAvgWeight: [{ type: i0.Input }],
        maleTotalWeight: [{ type: i0.Input }],
        maleTotalSelected: [{ type: i0.Input }],
        femaleAvgWeight: [{ type: i0.Input }],
        femaleTotalWeight: [{ type: i0.Input }],
        femaleTotalSelected: [{ type: i0.Input }]
    };

    var TreatmentDropdownlistComponent = /** @class */ (function () {
        function TreatmentDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "treatmentMaster-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.popupWidth = '350px';
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 1000;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        TreatmentDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        TreatmentDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query();
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "TreatmentMaster/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        TreatmentDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        TreatmentDropdownlistComponent.prototype.onChange = function (args) {
            var _a;
            this.change.emit(args);
            this.selectedValueChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.guid);
        };
        TreatmentDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return TreatmentDropdownlistComponent;
    }());
    TreatmentDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-treatment-dropdownlist',
                    template: "<ejs-dropdownlist\r\n[(ngModel)]=\"selectedValue\"\r\n(change)=\"onChange($event)\"\r\n[allowFiltering]=\"true\"\r\n#treatmentTemplate\r\n[dataSource]=\"data\"\r\n[fields]=\"remoteFields\"\r\n[query]=\"query\"\r\n[popupWidth]='popupWidth'\r\n(actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    TreatmentDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    TreatmentDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        popupWidth: [{ type: i0.Input }],
        dropdownObj: [{ type: i0.ViewChild, args: ['treatmentMasterRemote',] }]
    };

    var MakeorderDropdownlistToolbarComponent = /** @class */ (function () {
        function MakeorderDropdownlistToolbarComponent(baseUrl, trans, cd, service) {
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.cd = cd;
            this.service = service;
            this.id = "makeorder-remote";
            this.selectedValue = '';
            this.placeholder = "";
            this.popupWidth = '350px';
            this.popupHeight = '200px';
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'orderName', value: 'guid' };
        }
        MakeorderDropdownlistToolbarComponent.prototype.ngAfterViewChecked = function () {
            this.selectedValue = this.selectedValue || "";
            this.cd.detectChanges();
        };
        MakeorderDropdownlistToolbarComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getMakeOrderByFarmGuid(localStorage.getItem('farmGuid')).subscribe(function (x) {
                _this.data = x;
            });
        };
        MakeorderDropdownlistToolbarComponent.prototype.ngOnChanges = function (changes) {
            if (changes['selectedValue']) {
                this.selectedValueChange.emit(this.selectedValue);
            }
        };
        MakeorderDropdownlistToolbarComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueChange.emit(args.value);
        };
        return MakeorderDropdownlistToolbarComponent;
    }());
    MakeorderDropdownlistToolbarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-makeorder-dropdownlist-toolbar',
                    template: "<ejs-combobox\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [popupWidth]='popupWidth'\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-combobox>\r\n",
                    styles: [""]
                },] }
    ];
    MakeorderDropdownlistToolbarComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: i0.ChangeDetectorRef },
        { type: PigfarmCoreService }
    ]; };
    MakeorderDropdownlistToolbarComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        popupWidth: [{ type: i0.Input }],
        popupHeight: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var XaccountGroupComponent = /** @class */ (function () {
        function XaccountGroupComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "xacccount-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'groupName');
                    e.updateData(_this.data, query);
                }
            };
        }
        XaccountGroupComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        XaccountGroupComponent.prototype.actionComplete = function (e) {
            var _this = this;
            e.result = e.result.map(function (x) {
                var name = x.guid === "" ? _this.trans.instant(x.groupName) : x.groupName;
                return {
                    guid: x.guid,
                    name: name
                };
            });
        };
        XaccountGroupComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "XAccountGroup/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        XaccountGroupComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        XaccountGroupComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        XaccountGroupComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return XaccountGroupComponent;
    }());
    XaccountGroupComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-xaccount-group',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #xacccountRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    XaccountGroupComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    XaccountGroupComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['xacccountRemote',] }]
    };

    var RecordsaleDropdownlistComponent = /** @class */ (function () {
        function RecordsaleDropdownlistComponent(baseUrl, trans, cd, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.cd = cd;
            this.service = service;
            this.id = "recordsale-remote";
            this.selectedValue = '';
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['name', 'no']);
                    e.updateData(_this.data, query);
                }
            };
        }
        RecordsaleDropdownlistComponent.prototype.ngAfterViewChecked = function () {
            this.selectedValue = this.selectedValue || "";
            this.cd.detectChanges();
        };
        RecordsaleDropdownlistComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getByFarmGuid(localStorage.getItem('farmGuid')).subscribe(function (x) {
                _this.data = x;
            });
        };
        RecordsaleDropdownlistComponent.prototype.ngOnChanges = function (changes) {
        };
        RecordsaleDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueChange.emit(args.value);
        };
        return RecordsaleDropdownlistComponent;
    }());
    RecordsaleDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-recordsale-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    RecordsaleDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: i0.ChangeDetectorRef },
        { type: PigfarmCoreService }
    ]; };
    RecordsaleDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var DynamicGridComponent = /** @class */ (function () {
        function DynamicGridComponent(baseUrl) {
            this.baseUrl = baseUrl;
        }
        DynamicGridComponent.prototype.ngOnInit = function () {
        };
        return DynamicGridComponent;
    }());
    DynamicGridComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-dynamic-grid',
                    template: "<p>\r\n  dynamic-grid works!\r\n</p>\r\n",
                    styles: [""]
                },] }
    ];
    DynamicGridComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] }
    ]; };

    var SemenDropdownlistComponent = /** @class */ (function () {
        function SemenDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "semen-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['semenName', 'semenNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        SemenDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        SemenDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        SemenDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Semen/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        SemenDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        SemenDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        SemenDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return SemenDropdownlistComponent;
    }());
    SemenDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-semen-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #semenRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    SemenDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    SemenDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['semenRemote',] }]
    };

    var BreedingDropdownlistComponent = /** @class */ (function () {
        function BreedingDropdownlistComponent(baseUrl, trans, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.service = service;
            this.id = "breeding-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.roomGuid = "";
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    //const query = this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, new ej2Data.Query().search(e.text, 'name'));
                }
            };
        }
        BreedingDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BreedingDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        BreedingDropdownlistComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getBreedingByFarmGuid(localStorage.getItem('farmGuid')).subscribe(function (x) {
                _this.data = x;
            });
        };
        BreedingDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
        };
        BreedingDropdownlistComponent.prototype.onChange = function (args) {
            var _a, _b, _c, _d;
            this.change.emit(args);
            this.ngModelChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.guid);
            this.roomGuid = (_b = args.itemData) === null || _b === void 0 ? void 0 : _b.roomGuid;
            this.penGuid = (_c = args.itemData) === null || _c === void 0 ? void 0 : _c.penGuid;
            this.selectedValueChange.emit((_d = args.itemData) === null || _d === void 0 ? void 0 : _d.guid);
        };
        BreedingDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BreedingDropdownlistComponent;
    }());
    BreedingDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-breeding-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"'No Item' | translate\"\r\n  #breedingRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [showClearButton]=\"true\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    BreedingDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: PigfarmCoreService }
    ]; };
    BreedingDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['breedingRemote',] }]
    };

    var BreedingDropdownlistToolbarComponent = /** @class */ (function () {
        function BreedingDropdownlistToolbarComponent(baseUrl, trans, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.service = service;
            this.popupWidth = '350px';
            this.popupHeight = '200px';
            this.id = "breeding-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        BreedingDropdownlistToolbarComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BreedingDropdownlistToolbarComponent.prototype.actionComplete = function (e) {
        };
        BreedingDropdownlistToolbarComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getBreedingByFarmGuid(localStorage.getItem('farmGuid')).subscribe(function (x) {
                _this.data = x;
            });
        };
        BreedingDropdownlistToolbarComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        BreedingDropdownlistToolbarComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        BreedingDropdownlistToolbarComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BreedingDropdownlistToolbarComponent;
    }());
    BreedingDropdownlistToolbarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-breeding-dropdownlist-toolbar',
                    template: "<ejs-combobox\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (change)=\"onChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"'No Item' | translate\"\r\n  #remote\r\n  [popupWidth]='popupWidth'\r\n  [dataSource]=\"data\"\r\n  [showClearButton]=\"true\"\r\n  [fields]=\"remoteFields\"\r\n\r\n>\r\n\r\n</ejs-combobox>\r\n",
                    styles: [""]
                },] }
    ];
    BreedingDropdownlistToolbarComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: PigfarmCoreService }
    ]; };
    BreedingDropdownlistToolbarComponent.propDecorators = {
        popupWidth: [{ type: i0.Input }],
        popupHeight: [{ type: i0.Input }],
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['breedingRemote',] }]
    };

    var CustomerDropdownlistToolbarComponent = /** @class */ (function () {
        function CustomerDropdownlistToolbarComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "customer-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 1000;
            this.skip = 0;
            this.onFiltering = function (e) {
                var query = new ej2Data.Query();
                //frame the query based on search string with filter type.
                var predicate = new ej2Data.Predicate('name', 'contains', e.text);
                predicate = predicate.or('no', 'contains', e.text);
                query = (e.text != "") ? query.where(predicate) : query;
                //pass the filter data source, filter query to updateData method.
                e.updateData(_this.data, query);
            };
        }
        CustomerDropdownlistToolbarComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        CustomerDropdownlistToolbarComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        CustomerDropdownlistToolbarComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.query = new ej2Data.Query();
            new ej2Data.DataManager({
                url: this.baseUrl + "Customer/GetCustomersSP",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }).executeQuery(this.query).then(function (x) {
                _this.data = x.result;
            });
        };
        CustomerDropdownlistToolbarComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        CustomerDropdownlistToolbarComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        CustomerDropdownlistToolbarComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return CustomerDropdownlistToolbarComponent;
    }());
    CustomerDropdownlistToolbarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-customer-dropdownlist-toolbar',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #customerRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [""]
                },] }
    ];
    CustomerDropdownlistToolbarComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    CustomerDropdownlistToolbarComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['customerRemote',] }]
    };

    var UploadMultiDocumentComponent = /** @class */ (function () {
        function UploadMultiDocumentComponent(baseUrl, alertify, cd, http, translate) {
            this.baseUrl = baseUrl;
            this.alertify = alertify;
            this.cd = cd;
            this.http = http;
            this.translate = translate;
            this.allowExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
            this.filesName = [];
            this.filesDetails = [];
            this.filesList = [];
            this.allowedExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
            this.multiple = false;
            this.autoUpload = true;
            this.enabled = true;
            this.files = [];
            this.showFile = false;
            this.alert = {
                updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
                updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
                createMessage: this.translate.instant(MessageConstants.CREATE_MESSAGE),
                createTitle: this.translate.instant(MessageConstants.CREATE_TITLE),
                deleteMessage: this.translate.instant(MessageConstants.DELETE_MESSAGE),
                deleteTitle: this.translate.instant(MessageConstants.DELETE_TITLE),
                cancelMessage: this.translate.instant(MessageConstants.CANCEL_MESSAGE),
                serverError: this.translate.instant(MessageConstants.SERVER_ERROR),
                deleted_ok_msg: this.translate.instant(MessageConstants.DELETED_OK_MSG),
                created_ok_msg: this.translate.instant(MessageConstants.CREATED_OK_MSG),
                updated_ok_msg: this.translate.instant(MessageConstants.UPDATED_OK_MSG),
                system_error_msg: this.translate.instant(MessageConstants.SYSTEM_ERROR_MSG),
                exist_message: this.translate.instant(MessageConstants.EXIST_MESSAGE),
                choose_farm_message: this.translate.instant(MessageConstants.CHOOSE_FARM_MESSAGE),
                select_order_message: this.translate.instant(MessageConstants.SELECT_ORDER_MESSAGE),
                yes_message: this.translate.instant(MessageConstants.YES_MSG),
                no_message: this.translate.instant(MessageConstants.NO_MSG),
            };
        }
        UploadMultiDocumentComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.path = {
                saveUrl: "" + this.baseUrl + this.controlerName + "/Save?id=" + this.id,
                removeUrl: "" + this.baseUrl + this.controlerName + "/remove?id=" + this.id,
            };
            this.dropElement = document.getElementsByClassName("control-section")[0];
            if (ej2Base.Browser.isDevice) {
                document.getElementById("dropimage").style.padding = "0px 10%";
            }
            document.getElementById("browse").onclick = function () {
                document
                    .getElementsByClassName("e-file-select-wrap")[0]
                    .querySelector("button")
                    .click();
                return false;
            };
            document.getElementById("clearbtn").onclick = function () {
                if (!_this.dropElement.querySelector("ul")) {
                    return;
                }
                ej2Base.detach(_this.dropElement.querySelector("ul"));
                _this.filesList = [];
                _this.filesDetails = [];
                _this.filesName = [];
                if (_this.dropElement
                    .querySelector("#dropArea")
                    .classList.contains("e-spinner-pane")) {
                    ej2Popups.hideSpinner(_this.dropElement.querySelector("#dropArea"));
                    ej2Base.detach(_this.dropElement.querySelector(".e-spinner-pane"));
                }
            };
            document.getElementById("uploadbtn").onclick = function () {
                if (_this.dropElement.querySelector("ul") &&
                    _this.filesDetails.length > 0) {
                    _this.uploadObj.upload(_this.filesDetails, true);
                }
            };
        };
        UploadMultiDocumentComponent.prototype.onSelect = function (args) {
            if (!this.dropElement.querySelector("li")) {
                this.filesDetails = [];
            }
            if (ej2Base.isNullOrUndefined(document.getElementById("dropArea").querySelector(".e-upload-files"))) {
                this.parentElement = ej2Base.createElement("ul", { className: "e-upload-files" });
                document
                    .getElementsByClassName("e-upload")[0]
                    .appendChild(this.parentElement);
            }
            var validFiles = this.validateFiles(args, this.filesDetails);
            if (validFiles.length === 0) {
                args.cancel = true;
                return;
            }
            for (var i = 0; i < validFiles.length; i++) {
                this.formSelectedData(validFiles[i], this);
            }
            this.filesDetails = this.filesDetails.concat(validFiles);
            args.cancel = true;
        };
        UploadMultiDocumentComponent.prototype.validateFiles = function (args, viewedFiles) {
            var e_1, _a, e_2, _b, e_3, _c;
            var modifiedFiles = [];
            var validFiles = [];
            var isModified = false;
            if (args.event.type === "drop") {
                isModified = true;
                var allImages = ["png", "jpg", "jpeg"];
                var files_4 = args.filesData;
                try {
                    for (var files_1 = __values(files_4), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                        var file = files_1_1.value;
                        if (allImages.indexOf(file.type) !== -1) {
                            modifiedFiles.push(file);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            var files = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
            if (this.filesName.length > 0) {
                try {
                    for (var files_2 = __values(files), files_2_1 = files_2.next(); !files_2_1.done; files_2_1 = files_2.next()) {
                        var file = files_2_1.value;
                        if (this.filesName.indexOf(file.name) === -1) {
                            this.filesName.push(file.name);
                            validFiles.push(file);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (files_2_1 && !files_2_1.done && (_b = files_2.return)) _b.call(files_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                try {
                    for (var files_3 = __values(files), files_3_1 = files_3.next(); !files_3_1.done; files_3_1 = files_3.next()) {
                        var file = files_3_1.value;
                        this.filesName.push(file.name);
                        validFiles.push(file);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (files_3_1 && !files_3_1.done && (_c = files_3.return)) _c.call(files_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            return validFiles;
        };
        UploadMultiDocumentComponent.prototype.formSelectedData = function (file, proxy) {
            var liEle = ej2Base.createElement("li", {
                className: "e-upload-file-list",
                attrs: { "data-file-name": file.name },
            });
            var imageTag = ej2Base.createElement("IMG", {
                className: "upload-image",
                attrs: { alt: "Image" },
            });
            var wrapper = ej2Base.createElement("span", { className: "wrapper" });
            wrapper.appendChild(imageTag);
            liEle.appendChild(wrapper);
            liEle.appendChild(ej2Base.createElement("div", {
                className: "name file-name",
                innerHTML: file.name,
                attrs: { title: file.name },
            }));
            liEle.appendChild(ej2Base.createElement("div", {
                className: "file-size",
                innerHTML: proxy.uploadObj.bytesToSize(file.size),
            }));
            var clearbtn;
            var uploadbtn;
            clearbtn = ej2Base.createElement("span", {
                id: "removeIcon",
                className: "e-icons e-file-remove-btn",
                attrs: { title: "Remove" },
            });
            ej2Base.EventHandler.add(clearbtn, "click", this.removeFiles, proxy);
            liEle.setAttribute("title", "Ready to Upload");
            uploadbtn = ej2Base.createElement("span", {
                className: "e-upload-icon e-icons e-file-remove-btn",
                attrs: { title: "Upload" },
            });
            uploadbtn.setAttribute("id", "iconUpload");
            ej2Base.EventHandler.add(uploadbtn, "click", this.uploadFile, proxy);
            var progressbarContainer;
            progressbarContainer = ej2Base.createElement("progress", {
                className: "progressbar",
                id: "progressBar",
                attrs: { value: "0", max: "100" },
            });
            liEle.appendChild(clearbtn);
            liEle.appendChild(uploadbtn);
            liEle.appendChild(progressbarContainer);
            this.readURL(liEle, file);
            document.querySelector(".e-upload-files").appendChild(liEle);
            proxy.filesList.push(liEle);
        };
        UploadMultiDocumentComponent.prototype.uploadFile = function (args) {
            this.uploadObj.upload([
                this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)],
            ], true);
        };
        UploadMultiDocumentComponent.prototype.removeFiles = function (args) {
            var removeFile = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)];
            var statusCode = removeFile.statusCode;
            if (statusCode === "2" || statusCode === "1") {
                this.uploadObj.remove(removeFile, true);
                this.uploadObj.element.value = "";
            }
            var index = this.filesList.indexOf(args.currentTarget.parentElement);
            this.filesList.splice(index, 1);
            this.filesDetails.splice(index, 1);
            this.filesName.splice(this.filesName.indexOf(removeFile.name), 1);
            if (statusCode !== "2") {
                ej2Base.detach(args.currentTarget.parentElement);
            }
        };
        UploadMultiDocumentComponent.prototype.onFileUpload = function (args) {
            var li = document
                .getElementById("dropArea")
                .querySelector('[data-file-name="' + args.file.name + '"]');
            var iconEle = li.querySelector("#iconUpload");
            iconEle.style.cursor = "not-allowed";
            iconEle.classList.add("e-uploaded");
            ej2Base.EventHandler.remove(li.querySelector("#iconUpload"), "click", this.uploadFile);
            var progressValue = Math.round((args.e.loaded / args.e.total) * 100);
            if (!isNaN(progressValue) && li.querySelector(".progressbar")) {
                li.getElementsByTagName("progress")[0].value = progressValue;
            }
        };
        UploadMultiDocumentComponent.prototype.onUploadSuccess = function (args) {
            var _this = this;
            var spinnerElement = document.getElementById("dropArea");
            var li = document
                .getElementById("dropArea")
                .querySelector('[data-file-name="' + args.file.name + '"]');
            if (li && !ej2Base.isNullOrUndefined(li.querySelector(".progressbar"))) {
                li.querySelector(".progressbar").style.visibility =
                    "hidden";
            }
            if (args.operation === "upload") {
                ej2Base.EventHandler.remove(li.querySelector("#iconUpload"), "click", this.uploadFile);
                li.setAttribute("title", args.e.currentTarget.statusText);
                li.querySelector(".file-name").style.color = "green";
                li.querySelector(".e-icons").onclick = function () {
                    _this.generateSpinner(_this.dropElement.querySelector("#dropArea"));
                };
            }
            else {
                if (!ej2Base.isNullOrUndefined(li)) {
                    ej2Base.detach(li);
                }
                if (!ej2Base.isNullOrUndefined(spinnerElement)) {
                    ej2Popups.hideSpinner(spinnerElement);
                    ej2Base.detach(spinnerElement.querySelector(".e-spinner-pane"));
                }
            }
            li.querySelector("#removeIcon").removeAttribute(".e-file-remove-btn");
            li.querySelector("#removeIcon").setAttribute("class", "e-icons e-file-delete-btn");
        };
        UploadMultiDocumentComponent.prototype.generateSpinner = function (targetElement) {
            ej2Popups.createSpinner({ target: targetElement, width: "25px" });
            ej2Popups.showSpinner(targetElement);
        };
        UploadMultiDocumentComponent.prototype.onUploadFailed = function (args) {
            var li = document
                .getElementById("dropArea")
                .querySelector('[data-file-name="' + args.file.name + '"]');
            li.querySelector(".file-name").style.color = "red";
            li.setAttribute("title", args.e.currentTarget.statusText);
            if (args.operation === "upload") {
                ej2Base.EventHandler.remove(li.querySelector("#iconUpload"), "click", this.uploadFile);
                li.querySelector(".progressbar").style.visibility =
                    "hidden";
            }
        };
        UploadMultiDocumentComponent.prototype.readURL = function (li, args) {
            var preview = li.querySelector(".upload-image");
            var file = args.rawFile;
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        };
        UploadMultiDocumentComponent.prototype.onFileRemove = function (args) {
            args.postRawFile = false;
        };
        return UploadMultiDocumentComponent;
    }());
    UploadMultiDocumentComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "app-upload-multi-document",
                    template: "<div class=\"control-section\">\r\n  <div class=\"col-12\">\r\n      <div class=\"control_wrapper\">\r\n          <div class='imagepreview'>\r\n              <div id='dropArea' style='height: auto'>\r\n                  <span id='dropimage'> {{ 'Drop image (.doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png) files here or' | translate}} <a href=\"\" id='browse'><u>{{'Browse' | translate}}</u></a> </span>\r\n                  <ejs-uploader #previewupload id='previewfileupload' [asyncSettings]='path'\r\n                  [multiple]=\"multiple\"\r\n                  [asyncSettings]=\"path\"\r\n                  [autoUpload]=\"autoUpload\"\r\n                  [enabled]=\"enabled\"\r\n                  [dropArea]='dropElement' [allowedExtensions]='allowExtensions' (selected)='onSelect($event)'\r\n                      (success)='onUploadSuccess($event)' (progress)='onFileUpload($event)' (failure)='onUploadFailed($event)' (removing)='onFileRemove($event)'>\r\n                  </ejs-uploader>\r\n              </div>\r\n          </div>\r\n      </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [".control_wrapper .imagepreview{max-width:505px;margin:auto}.e-upload{float:none}.imagepreview .e-file-select-wrap{display:none}.imagepreview .e-upload{border:none;margin-top:10px;width:100%}.imagepreview #dropimage{font-size:14px}.e-bigger .imagepreview #dropimage{font-size:15px}.imagepreview #dropArea{border:1px dashed #c3c3cc;position:relative;text-align:center;padding:15px 0 5px;display:block;width:100%;overflow:hidden}.e-bigger .imagepreview #dropArea{padding:20px 0 10px}.imagepreview #dropArea .e-upload .e-upload-files{text-align:initial;border-top:none}.imagepreview #dropArea .e-upload-files .e-file-delete-btn.e-icons,.imagepreview #dropArea .e-upload-files .e-file-remove-btn.e-icons{top:120px;background-color:#fff;border-radius:50%;font-size:12px;left:80px}.imagepreview #dropArea .e-upload-files li .e-file-remove-btn.e-icons.e-upload-icon{font-size:14px;left:20px}.imagepreview #dropArea .e-upload-files li:hover .e-icons{visibility:visible}.imagepreview #dropArea .e-upload-files li .e-icons{visibility:hidden}@font-face{font-family:Uploader_Icon;src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmoZcPvgAAAcgAAABAaGVhZBLQTSUAAADQAAAANmhoZWEINQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQAgAAAAAAHAAAAABm1heHABDgAdAAABCAAAACBuYW1lQySinQAAAggAAAIxcG9zdLfl0usAAAQ8AAAAMgABAAAEAAAAAFwEAAAAAAAD2AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAA2vKJUF8PPPUACwQAAAAAANftBBgAAAAA1+0EGAAAAAAD2AP4AAAACAACAAAAAAAAAAEAAAACABEAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAIAAAAAIAAAAAA9gD+AAHABAAADchESMVITUjEzM3ETMRFzMBKAOwPvzMPp1mtUC1Zv7FCAF6vb0BO7X+EAHwtQE7AAAAABIA3gABAAAAAAAAAAEAAAABAAAAAAABAAgAAQABAAAAAAACAAcACQABAAAAAAADAAgAEAABAAAAAAAEAAgAGAABAAAAAAAFAAsAIAABAAAAAAAGAAgAKwABAAAAAAAKACwAMwABAAAAAAALABIAXwADAAEECQAAAAIAcQADAAEECQABABAAcwADAAEECQACAA4AgwADAAEECQADABAAkQADAAEECQAEABAAoQADAAEECQAFABYAsQADAAEECQAGABAAxwADAAEECQAKAFgA1wADAAEECQALACQBLyBVcGxvYWRlclJlZ3VsYXJVcGxvYWRlclVwbG9hZGVyVmVyc2lvbiAxLjBVcGxvYWRlckZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAVQBwAGwAbwBhAGQAZQByAFIAZQBnAHUAbABhAHIAVQBwAGwAbwBhAGQAZQByAFUAcABsAG8AYQBkAGUAcgBWAGUAcgBzAGkAbwBuACAAMQAuADAAVQBwAGwAbwBhAGQAZQByAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAFMAeQBuAGMAZgB1AHMAaQBvAG4AIABNAGUAdAByAG8AIABTAHQAdQBkAGkAbwB3AHcAdwAuAHMAeQBuAGMAZgB1AHMAaQBvAG4ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBAgEDAAhVcGxvYWRlcgAAAAA=) format(\"truetype\");font-weight:400;font-style:normal}.imagepreview #dropArea .e-upload .e-upload-files .e-icons.e-upload-icon{font-family:Uploader_Icon;speak:none;font-size:16px;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.imagepreview #dropArea .e-upload .e-upload-files .e-icons.e-upload-icon:before{content:\"\\e700\"}.imagepreview #dropArea .e-upload .e-upload-files .e-icons:not(.e-uploaded):hover{background-color:#e6e6e6;border-color:#adadad;color:#333}.bootstrap5-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.bootstrap-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.fabric-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.material-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons,.tailwind-dark .imagepreview #dropArea .e-upload .e-upload-files .e-icons{color:#333}.highcontrast .imagepreview #dropArea .e-upload-files .e-file-delete-btn.e-icons,.highcontrast .imagepreview #dropArea .e-upload-files .e-file-remove-btn.e-icons{background-color:#ffd939}.highcontrast .imagepreview #dropArea .e-upload .e-upload-files .e-file-delete-btn.e-icons:before,.highcontrast .imagepreview #dropArea .e-upload .e-upload-files .e-file-remove-btn.e-icons:before{color:#000}.imagepreview #dropArea .e-upload .e-upload-files .e-upload-file-list{border:0;display:inline-block;width:165px}.imagepreview .upload-image{width:150px;height:150px;display:inline-flex;background-size:contain;margin:7px;text-align:center;line-height:10;border-radius:5px}.imagepreview .upload-image:after{content:\"\";position:absolute;top:6px;left:6px;width:inherit;height:inherit;background:#d3d3d3 url(http://via.placeholder.com/300?text=Loading...) no-repeat 50%;color:transparent;border-radius:5px}.bootstrap5-dark .imagepreview div.file-name,.bootstrap-dark .imagepreview div.file-name,.fabric-dark .imagepreview div.file-name,.fluent-dark .imagepreview div.file-name,.highcontrast .imagepreview div.file-name,.material-dark .imagepreview div.file-name,.tailwind-dark .imagepreview div.file-name{color:#fff}.imagepreview div.file-name{color:rgba(0,0,0,.87);font-size:14px;padding:3px 10px;overflow:hidden;text-overflow:ellipsis;width:90%;white-space:nowrap}.highcontrast .imagepreview div.file-size{color:#fff}.imagepreview div.file-size{font-size:13px;padding:3px 10px;overflow:hidden}.imagepreview .progressbar{background:#ff4081;border:none;border-radius:10px;height:4px;margin-left:7px;width:90%;top:-60px;position:relative}.bootstrap5 .imagepreview .progressbar,.bootstrap5-dark .imagepreview .progressbar,.fluent-dark .imagepreview .progressbar,.tailwind-dark .imagepreview .progressbar,.tailwind .imagepreview .progressbar{top:-70px}.imagepreview #dropArea progress{border:none;background:#fff}.bootstrap5-dark .imagepreview #dropArea progress,.bootstrap-dark .imagepreview #dropArea progress,.fabric-dark .imagepreview #dropArea progress,.highcontrast .imagepreview #dropArea progress,.material-dark .imagepreview #dropArea progress,.tailwind-dark .imagepreview #dropArea progress{border:none;background:#000}.imagepreview progress::-webkit-progress-bar{border:none;background-color:#fff}.highcontrast .imagepreview progress::-webkit-progress-bar{border:none;background-color:#000}.imagepreview progress::-webkit-progress-value,.material .imagepreview progress::-webkit-progress-value{border-radius:2px;background-color:#ff4081}.bootstrap .imagepreview progress::-webkit-progress-value{border-radius:2px;background-color:#1f496e}.fabric .imagepreview progress::-webkit-progress-value{background-color:#1763ff;border-radius:2px;top:-66px}.highcontrast .imagepreview progress::-webkit-progress-value{background-color:#ffd939;border-radius:2px}.imagepreview progress::-moz-progress-bar,.material .imagepreview progress::-moz-progress-bar{border-radius:2px;background-color:#ff4081}.bootstrap .imagepreview progress::-moz-progress-bar{border-radius:2px;background-color:#1f496e}.fabric .imagepreview progress::-moz-progress-bar{background-color:#1763ff;border-radius:2px;top:-66px}.highcontrast .imagepreview progress::-moz-progress-bar{background-color:#ffd939;border-radius:2px}.imagepreview #dropimage a,.material .imagepreview #dropimage a{color:#ff4081}.fabric .imagepreview #dropimage a{color:#1763ff}.bootstrap .imagepreview #dropimage a{color:#1f496e}.highcontrast .imagepreview #dropimage a{color:#ffd939}.material-dark .imagepreview #dropimage a{color:#56a4fd}.fabric-dark .imagepreview #dropimage a{color:#0074cc}.bootstrap-dark .imagepreview #dropimage a{color:#0070f0}.bootstrap5-dark .imagepreview #dropimage a{color:#0d6efd}.tailwind-dark .imagepreview #dropimage a{color:#22d3ee}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.e-bigger .imagepreview #dropArea .e-upload .e-upload-files .e-file-remove-btn.e-icons,.imagepreview #dropArea .e-upload .e-upload-files .e-file-remove-btn.e-icons{padding:18px 25px 18px 12px}}"]
                },] }
    ];
    UploadMultiDocumentComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: AlertifyService },
        { type: i0.ChangeDetectorRef },
        { type: i1.HttpClient },
        { type: i1$1.TranslateService }
    ]; };
    UploadMultiDocumentComponent.propDecorators = {
        uploadObj: [{ type: i0.ViewChild, args: ["previewupload",] }],
        path: [{ type: i0.Input }],
        allowedExtensions: [{ type: i0.Input }],
        id: [{ type: i0.Input }],
        multiple: [{ type: i0.Input }],
        autoUpload: [{ type: i0.Input }],
        enabled: [{ type: i0.Input }],
        service: [{ type: i0.Input }],
        files: [{ type: i0.Input }],
        controlerName: [{ type: i0.Input }]
    };

    var Breeding2SowinDropdownlistComponent = /** @class */ (function () {
        function Breeding2SowinDropdownlistComponent(baseUrl, trans, service) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.service = service;
            this.id = "breeding-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        Breeding2SowinDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        Breeding2SowinDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        Breeding2SowinDropdownlistComponent.prototype.ngOnInit = function () {
        };
        Breeding2SowinDropdownlistComponent.prototype.loadData = function () {
            var _this = this;
            this.service.getBreeding2SowInByBreedingGuid(this.breedingGuid || '').subscribe(function (x) {
                _this.data = x;
            });
        };
        Breeding2SowinDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            this.selectedValue = this.selectedValue || "";
            if (changes['breedingGuid']) {
                this.loadData();
            }
        };
        Breeding2SowinDropdownlistComponent.prototype.onChange = function (args) {
            var _a, _b, _c, _d;
            this.roomGuid = (_a = args.itemData) === null || _a === void 0 ? void 0 : _a.roomGuid;
            this.penGuid = (_b = args.itemData) === null || _b === void 0 ? void 0 : _b.penGuid;
            this.change.emit(args);
            this.ngModelChange.emit((_c = args.itemData) === null || _c === void 0 ? void 0 : _c.guid);
            this.selectedValueChange.emit((_d = args.itemData) === null || _d === void 0 ? void 0 : _d.guid);
        };
        Breeding2SowinDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return Breeding2SowinDropdownlistComponent;
    }());
    Breeding2SowinDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-breeding2-sowin-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(value)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [enabled]=\"!disabled\"\r\n  [placeholder]=\"'No Item' | translate\"\r\n  #breedingRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [showClearButton]=\"true\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    Breeding2SowinDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: PigfarmCoreService }
    ]; };
    Breeding2SowinDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        breedingGuid: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['breedingRemote',] }]
    };

    var UploadDocumentComponent = /** @class */ (function () {
        function UploadDocumentComponent(baseUrl, alertify, cd, http, translate) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.alertify = alertify;
            this.cd = cd;
            this.http = http;
            this.translate = translate;
            this.allowedExtensions = ".doc, .xls, .xlsx, .pdf, .odt, .odf, .jpg, .gif, .png";
            this.multiple = false;
            this.autoUpload = true;
            this.enabled = true;
            this.files = [];
            this.showFile = false;
            this.showImgFile = false;
            this.alert = {
                updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
                updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
                createMessage: this.translate.instant(MessageConstants.CREATE_MESSAGE),
                createTitle: this.translate.instant(MessageConstants.CREATE_TITLE),
                deleteMessage: this.translate.instant(MessageConstants.DELETE_MESSAGE),
                deleteTitle: this.translate.instant(MessageConstants.DELETE_TITLE),
                cancelMessage: this.translate.instant(MessageConstants.CANCEL_MESSAGE),
                serverError: this.translate.instant(MessageConstants.SERVER_ERROR),
                deleted_ok_msg: this.translate.instant(MessageConstants.DELETED_OK_MSG),
                created_ok_msg: this.translate.instant(MessageConstants.CREATED_OK_MSG),
                updated_ok_msg: this.translate.instant(MessageConstants.UPDATED_OK_MSG),
                system_error_msg: this.translate.instant(MessageConstants.SYSTEM_ERROR_MSG),
                exist_message: this.translate.instant(MessageConstants.EXIST_MESSAGE),
                choose_farm_message: this.translate.instant(MessageConstants.CHOOSE_FARM_MESSAGE),
                select_order_message: this.translate.instant(MessageConstants.SELECT_ORDER_MESSAGE),
                yes_message: this.translate.instant(MessageConstants.YES_MSG),
                no_message: this.translate.instant(MessageConstants.NO_MSG),
            };
            this.allImages = ['.jpg', '.gif', '.png'];
            this.onUploadSuccess = function (args) {
                _this.getFileInfo();
                _this.uploadObj.clearAll();
            };
        }
        UploadDocumentComponent.prototype.ngOnChanges = function (changes) {
            if (changes['service'] && changes.service.currentValue) {
                this.initialUploader();
                this.cd.detectChanges();
            }
        };
        UploadDocumentComponent.prototype.ngAfterViewInit = function () {
            // this.initialUploader();
            // this.cd.detectChanges();
        };
        UploadDocumentComponent.prototype.ngOnInit = function () { };
        UploadDocumentComponent.prototype.beforeUpload = function (args) {
            args.statusText = args.response.statusText;
        };
        UploadDocumentComponent.prototype.initialUploader = function () {
            if (!this.path) {
                this.path = {
                    saveUrl: "" + this.baseUrl + this.controlerName + "/Save?id=" + this.id,
                    removeUrl: "" + this.baseUrl + this.controlerName + "/remove?id=" + this.id,
                };
            }
            this.downloadUrl = "" + this.baseUrl + this.controlerName + "/Download?id=" + this.id;
            this.getFileInfo();
        };
        UploadDocumentComponent.prototype.getFileInfo = function () {
            var _this = this;
            this.service.getFilesById(this.id).subscribe(function (file) {
                if (file.name !== "") {
                    _this.files = [file];
                    _this.file = file;
                    _this.showFile = true;
                    _this.showImgFile = _this.allImages.indexOf(file.type) !== -1;
                }
                else {
                    _this.files = null;
                    _this.file = null;
                    _this.showFile = false;
                    _this.showImgFile = false;
                    _this.uploadObj.refresh();
                }
            }, function (error) {
                _this.files = null;
                _this.file = null;
                _this.showFile = false;
                _this.uploadObj.refresh();
            });
        };
        UploadDocumentComponent.prototype.onSelected = function (args) {
            args.filesData.splice(5);
            var filesData = args.filesData;
            var allFiles = filesData.concat(args.filesData);
            if (allFiles.length > 5) {
                for (var i = 0; i < allFiles.length; i++) {
                    if (allFiles.length > 5) {
                        allFiles.shift();
                    }
                }
                args.filesData = allFiles;
                args.modifiedFilesData = args.filesData;
            }
            this.showFile = args.filesData.length > 0;
            if (this.showFile) {
                this.showImgFile = this.allImages.indexOf(this.showFile[0].type) !== -1;
            }
            args.isModified = true;
        };
        UploadDocumentComponent.prototype.onFileRemove = function (args) {
            args.postRawFile = false;
        };
        UploadDocumentComponent.prototype.removeFile = function () {
            this.remove();
        };
        UploadDocumentComponent.prototype.remove = function () {
            var _this = this;
            this.alertify.confirm4(this.alert.yes_message, this.alert.no_message, this.alert.deleteTitle, this.alert.deleteMessage, function () {
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "" + _this.baseUrl + _this.controlerName + "/remove?id=" + _this.id);
                ajax.onload = function () {
                    _this.getFileInfo();
                    _this.alertify.success(_this.alert.deleted_ok_msg);
                };
                ajax.send();
            }, function () {
                _this.alertify.error(_this.alert.cancelMessage);
            });
        };
        UploadDocumentComponent.prototype.download = function () {
            var downloadLink = document.createElement("a");
            downloadLink.href = this.downloadUrl;
            downloadLink.setAttribute("download", this.file.name);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        };
        return UploadDocumentComponent;
    }());
    UploadDocumentComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "app-upload-document",
                    template: "<ejs-uploader\r\n  [allowedExtensions]=\"allowedExtensions\"\r\n  (selected)=\"onSelected($event)\"\r\n  #defaultupload\r\n  id=\"defaultfileupload\"\r\n  (failure)=\"beforeUpload($event)\"\r\n  [multiple]=\"multiple\"\r\n  [asyncSettings]=\"path\"\r\n  [autoUpload]=\"autoUpload\"\r\n  [enabled]=\"enabled\"\r\n  (success)=\"onUploadSuccess($event)\"\r\n  (removing)=\"onFileRemove($event)\"\r\n>\r\n</ejs-uploader>\r\n\r\n<div *ngIf=\"showFile\">\r\n  <ul class=\"list-group\">\r\n    <li\r\n      class=\"list-group-item d-flex justify-content-between align-items-center\"\r\n      style=\"color: green\"\r\n    >\r\n      <div *ngIf=\"!showImgFile\">\r\n        {{ file?.name }}\r\n      </div>\r\n      <div class=\"text-center\" *ngIf=\"showImgFile\">\r\n        <img [src]=\"downloadUrl\" class=\"rounded\" alt=\"{{ file?.name }}\">\r\n      </div>\r\n      <div>\r\n        <button class=\"btn btn-sm btn-primary\" (click)=\"download()\">\r\n          <i\r\n          class=\"fa fa-file-download mx-2\"\r\n          style=\"cursor: pointer\"\r\n        ></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-danger\" (click)=\"removeFile()\" *ngIf=\"enabled\">\r\n        <i class=\"fa fa-trash\" style=\"cursor: pointer\" ></i>\r\n        </button>\r\n\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</div>\r\n",
                    styles: [".a{cursor:pointer}"]
                },] }
    ];
    UploadDocumentComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: AlertifyService },
        { type: i0.ChangeDetectorRef },
        { type: i1.HttpClient },
        { type: i1$1.TranslateService }
    ]; };
    UploadDocumentComponent.propDecorators = {
        uploadObj: [{ type: i0.ViewChild, args: [ej2AngularInputs.UploaderComponent,] }],
        path: [{ type: i0.Input }],
        allowedExtensions: [{ type: i0.Input }],
        id: [{ type: i0.Input }],
        multiple: [{ type: i0.Input }],
        autoUpload: [{ type: i0.Input }],
        enabled: [{ type: i0.Input }],
        service: [{ type: i0.Input }],
        files: [{ type: i0.Input }],
        controlerName: [{ type: i0.Input }]
    };

    var BaseComponent = /** @class */ (function () {
        function BaseComponent(translate, url) {
            var _a;
            this.translate = translate;
            this.url = url;
            this.statusConts = new StatusConstants();
            this.isodsExport = true;
            this.globalLang = localStorage.getItem('lang');
            this.skip = 0;
            this.take = 10;
            this.sortOptions = { columns: [{ field: 'estDate', direction: 'Descending' }, { field: 'id', direction: 'Descending' }] };
            this.isAdmin = ((_a = JSON.parse(localStorage.getItem('user'))) === null || _a === void 0 ? void 0 : _a.groupCode) === 'ADMIN';
            this.baseUrl = '';
            this.alert = {
                updateMessage: this.translate.instant(MessageConstants.UPDATE_MESSAGE),
                updateTitle: this.translate.instant(MessageConstants.UPDATE_TITLE),
                createMessage: this.translate.instant(MessageConstants.CREATE_MESSAGE),
                createTitle: this.translate.instant(MessageConstants.CREATE_TITLE),
                deleteMessage: this.translate.instant(MessageConstants.DELETE_MESSAGE),
                deleteTitle: this.translate.instant(MessageConstants.DELETE_TITLE),
                cancelMessage: this.translate.instant(MessageConstants.CANCEL_MESSAGE),
                serverError: this.translate.instant(MessageConstants.SERVER_ERROR),
                deleted_ok_msg: this.translate.instant(MessageConstants.DELETED_OK_MSG),
                created_ok_msg: this.translate.instant(MessageConstants.CREATED_OK_MSG),
                updated_ok_msg: this.translate.instant(MessageConstants.UPDATED_OK_MSG),
                system_error_msg: this.translate.instant(MessageConstants.SYSTEM_ERROR_MSG),
                exist_message: this.translate.instant(MessageConstants.EXIST_MESSAGE),
                choose_farm_message: this.translate.instant(MessageConstants.CHOOSE_FARM_MESSAGE),
                select_order_message: this.translate.instant(MessageConstants.SELECT_ORDER_MESSAGE),
                yes_message: this.translate.instant(MessageConstants.YES_MSG),
                no_message: this.translate.instant(MessageConstants.NO_MSG),
            };
            this.validationGrid = {
                requireField: 'This field is require.',
                textLength: 'Text Length',
            };
            this.editSettingsTree = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Child', mode: 'Row' };
            this.editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
            this.toolbarOptions = ['ExcelExport', 'Add', 'Edit', 'Delete', 'Cancel', 'Search'];
            this.toolbarOptionsTree = [
                'Add',
                'Delete',
                'Search',
                'ExpandAll',
                'CollapseAll',
                'ExcelExport'
            ];
            this.contextMenuItems = [
                {
                    text: 'Add Child',
                    iconCss: ' e-icons e-add',
                    target: '.e-content',
                    id: 'Add-Sub-Item'
                },
                {
                    text: 'Delete',
                    iconCss: ' e-icons e-delete',
                    target: '.e-content',
                    id: 'DeleteOC'
                }
            ];
            this.average = function (nums) {
                if (nums.length === 0)
                    return 0;
                if (nums.length > 0 && nums) {
                    nums = nums.filter(function (e) { return e !== null; });
                    if (nums.length === 0)
                        return 0;
                    return nums.reduce(function (a, b) { return (a + b); }) / nums.length;
                }
                return 0;
            };
            this.total = function (nums) {
                if (nums.length === 0)
                    return 0;
                if (nums.length > 0 && nums) {
                    nums = nums.filter(function (e) { return e !== null; });
                    if (nums.length === 0)
                        return 0;
                    return nums.reduce(function (a, b) { return (a + b); });
                }
                return 0;
            };
            this.baseUrl = url;
            var user = JSON.parse(localStorage.getItem('user'));
            var pageSize = Number(user === null || user === void 0 ? void 0 : user.pageSizeSettingValue) || 10;
            var pageSizesTemp = (user === null || user === void 0 ? void 0 : user.pageSizeSettingList) || ['5', '10', '12', '20'];
            var pageSizes = pageSizesTemp.map(function (x) {
                if (isNaN(+x))
                    return x;
                return +x;
            });
            this.pageSettings = { pageSizes: pageSizes, enableQueryString: true, pageSize: pageSize, currentPage: 1, enableScroll: true };
            this.take = this.pageSettings.pageSize;
        }
        BaseComponent.prototype.Permission = function (route) {
            var e_1, _b, e_2, _c;
            var functionCode = route.snapshot.data.functionCode;
            this.functions = JSON.parse(localStorage.getItem('functions')).filter(function (x) { return x.functionCode === functionCode; }) || [];
            try {
                for (var _d = __values(this.functions), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    var toolbarOptions = [];
                    try {
                        for (var _f = (e_2 = void 0, __values(item.childrens)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var action = _g.value;
                            var optionItem = this.makeAction(action.code);
                            toolbarOptions.push.apply(toolbarOptions, __spread(optionItem.filter(Boolean)));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    toolbarOptions.push('Search');
                    var uniqueOptionItem = toolbarOptions.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });
                    this.toolbarOptions = uniqueOptionItem;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        BaseComponent.prototype.PermissionForTreeGrid = function (route) {
            var e_3, _b, e_4, _c;
            this.contextMenuItems = [];
            this.functions = JSON.parse(localStorage.getItem('functions'));
            try {
                for (var _d = __values(this.functions), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    if (route.snapshot.data.functionCode.includes(item.functionCode)) {
                        var toolbarOptionsTree = [];
                        try {
                            for (var _f = (e_4 = void 0, __values(item.childrens)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var action = _g.value;
                                var optionItem = this.makeActionTreeGrid(action.code);
                                toolbarOptionsTree.push.apply(toolbarOptionsTree, __spread(optionItem.filter(Boolean)));
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        toolbarOptionsTree.push.apply(toolbarOptionsTree, __spread(['Search',
                            'ExpandAll',
                            'CollapseAll',
                            'ExcelExport']));
                        var uniqueOptionItem = toolbarOptionsTree.filter(function (elem, index, self) {
                            return index === self.indexOf(elem);
                        });
                        this.toolbarOptionsTree = uniqueOptionItem;
                        break;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        // Đổi action code thanh action của ej2-grid
        BaseComponent.prototype.makeAction = function (input) {
            switch (input) {
                case ActionConstant.CREATE:
                    this.editSettings.allowAdding = true;
                    return ['Add'];
                case ActionConstant.EDIT:
                    this.editSettings.allowEditing = false;
                    return [];
                case ActionConstant.DELETE:
                    this.editSettings.allowDeleting = false;
                    return [];
                case ActionConstant.EXCEL_EXPORT:
                    return ['ExcelExport'];
                default:
                    return [undefined];
            }
        };
        BaseComponent.prototype.makeActionTreeGrid = function (input) {
            switch (input) {
                case ActionConstant.EXCEL_EXPORT:
                    return ['ExcelExport'];
                case ActionConstant.CREATE:
                    this.editSettingsTree.allowAdding = true;
                    this.contextMenuItems.push({
                        text: 'Add Child',
                        iconCss: ' e-icons e-add',
                        target: '.e-content',
                        id: 'Add-Sub-Item'
                    });
                    return ['Add'];
                case ActionConstant.EDIT:
                    this.editSettingsTree.allowEditing = false;
                    return [undefined];
                case ActionConstant.DELETE:
                    this.editSettingsTree.allowDeleting = false;
                    this.contextMenuItems.push({
                        text: 'Delete',
                        iconCss: ' e-icons e-delete',
                        target: '.e-content',
                        id: 'DeleteOC'
                    });
                    return [undefined];
                default:
                    return [undefined];
            }
        };
        BaseComponent.prototype.convertDate = function (data) {
            if (data instanceof Date) {
                return data.toLocaleDateString();
            }
            return data;
        };
        BaseComponent.prototype.visibledApply = function (model) {
            return !(model.id > 0) || !model.applyDate;
        };
        BaseComponent.prototype.visibledAgree = function (model) {
            return model.id > 0 && !model.agreeGuid && model.status === this.statusConts.Default;
        };
        BaseComponent.prototype.visibledReject = function (model) {
            return model.id > 0 && (model.status === this.statusConts.Agree || model.status === this.statusConts.Default);
        };
        BaseComponent.prototype.visibledExecute = function (model) {
            return model.id > 0 && (model.status === this.statusConts.Agree || model.status === this.statusConts.Default);
        };
        BaseComponent.prototype.visibledInventory = function (model) {
            return model.id > 0 && (model.status === this.statusConts.Agree || model.status === this.statusConts.Default);
        };
        BaseComponent.prototype.visibledFinance = function (model) {
            return model.id > 0 && (model.status === this.statusConts.Agree || model.status === this.statusConts.Default);
        };
        BaseComponent.prototype.disabledApplyReason = function (model) {
            return model.id > 0;
        };
        BaseComponent.prototype.disabledAgreeReason = function (model) {
            return model.status === this.statusConts.Agree || model.status === this.statusConts.Execute || model.status === this.statusConts.Reject;
        };
        BaseComponent.prototype.disabledRejectReason = function (model) {
            return model.status === this.statusConts.Agree || model.status === this.statusConts.Execute || model.status === this.statusConts.Reject;
        };
        return BaseComponent;
    }());

    var BaseDetailComponent = /** @class */ (function () {
        function BaseDetailComponent(translate, url) {
            this.translate = translate;
            this.url = url;
            this.globalLang = localStorage.getItem('lang');
            this.skip = 0;
            this.take = 10;
            this.baseUrl = '';
            this.alert = {
                updateMessage: MessageConstants.UPDATE_MESSAGE,
                updateTitle: MessageConstants.UPDATE_TITLE,
                createMessage: MessageConstants.CREATE_MESSAGE,
                createTitle: MessageConstants.CREATE_TITLE,
                deleteMessage: MessageConstants.DELETE_MESSAGE,
                deleteTitle: MessageConstants.DELETE_TITLE,
                cancelMessage: MessageConstants.CANCEL_MESSAGE,
                serverError: MessageConstants.SERVER_ERROR,
                deleted_ok_msg: MessageConstants.DELETED_OK_MSG,
                created_ok_msg: MessageConstants.CREATED_OK_MSG,
                updated_ok_msg: MessageConstants.UPDATED_OK_MSG,
                system_error_msg: MessageConstants.SYSTEM_ERROR_MSG,
                exist_message: MessageConstants.EXIST_MESSAGE,
                choose_farm_message: MessageConstants.CHOOSE_FARM_MESSAGE,
                select_order_message: MessageConstants.SELECT_ORDER_MESSAGE,
                yes_message: MessageConstants.YES_MSG,
                no_message: MessageConstants.NO_MSG,
            };
            this.validationGrid = {
                requireField: 'This field is require.',
                textLength: 'Text Length',
            };
            this.editSettingsTree = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Child', mode: 'Row' };
            this.editSettings = { showDeleteConfirmDialog: false, allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Normal' };
            this.toolbarOptions = ['ExcelExport', 'Add', 'Edit', 'Delete', 'Cancel', 'Search'];
            this.toolbarOptionsTree = [
                'Add',
                'Delete',
                'Search',
                'ExpandAll',
                'CollapseAll',
                'ExcelExport'
            ];
            this.contextMenuItems = [
                {
                    text: 'Add Child',
                    iconCss: ' e-icons e-add',
                    target: '.e-content',
                    id: 'Add-Sub-Item'
                },
                {
                    text: 'Delete',
                    iconCss: ' e-icons e-delete',
                    target: '.e-content',
                    id: 'DeleteOC'
                }
            ];
            this.baseUrl = url;
            this.getAlertTranslator();
        }
        BaseDetailComponent.prototype.Permission = function (route) {
            var e_1, _a, e_2, _b;
            var functionCode = route.snapshot.data.functionCode;
            this.functions = JSON.parse(localStorage.getItem('functions')).filter(function (x) { return x.functionCode === functionCode; }) || [];
            try {
                for (var _c = __values(this.functions), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    var toolbarOptions = [];
                    try {
                        for (var _e = (e_2 = void 0, __values(item.childrens)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var action = _f.value;
                            var optionItem = this.makeAction(action.code);
                            toolbarOptions.push.apply(toolbarOptions, __spread(optionItem.filter(Boolean)));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    toolbarOptions.push('Search');
                    var uniqueOptionItem = toolbarOptions.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });
                    this.toolbarOptions = uniqueOptionItem;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        BaseDetailComponent.prototype.PermissionForTreeGrid = function (route) {
            var e_3, _a, e_4, _b;
            this.contextMenuItems = [];
            this.functions = JSON.parse(localStorage.getItem('functions'));
            try {
                for (var _c = __values(this.functions), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    if (route.snapshot.data.functionCode.includes(item.functionCode)) {
                        var toolbarOptionsTree = [];
                        try {
                            for (var _e = (e_4 = void 0, __values(item.childrens)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var action = _f.value;
                                var optionItem = this.makeActionTreeGrid(action.code);
                                toolbarOptionsTree.push.apply(toolbarOptionsTree, __spread(optionItem.filter(Boolean)));
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        toolbarOptionsTree.push.apply(toolbarOptionsTree, __spread(['Search',
                            'ExpandAll',
                            'CollapseAll',
                            'ExcelExport']));
                        var uniqueOptionItem = toolbarOptionsTree.filter(function (elem, index, self) {
                            return index === self.indexOf(elem);
                        });
                        this.toolbarOptionsTree = uniqueOptionItem;
                        break;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        // Đổi action code thanh action của ej2-grid
        BaseDetailComponent.prototype.makeAction = function (input) {
            switch (input) {
                case ActionConstant.CREATE:
                    this.editSettings.allowAdding = true;
                    return ['Add'];
                case ActionConstant.EDIT:
                    this.editSettings.allowEditing = false;
                    return [];
                case ActionConstant.DELETE:
                    this.editSettings.allowDeleting = false;
                    return [];
                case ActionConstant.EXCEL_EXPORT:
                    return ['ExcelExport'];
                default:
                    return [undefined];
            }
        };
        BaseDetailComponent.prototype.makeActionTreeGrid = function (input) {
            switch (input) {
                case ActionConstant.EXCEL_EXPORT:
                    return ['ExcelExport'];
                case ActionConstant.CREATE:
                    this.editSettingsTree.allowAdding = true;
                    this.contextMenuItems.push({
                        text: 'Add Child',
                        iconCss: ' e-icons e-add',
                        target: '.e-content',
                        id: 'Add-Sub-Item'
                    });
                    return ['Add'];
                case ActionConstant.EDIT:
                    this.editSettingsTree.allowEditing = false;
                    return [undefined];
                case ActionConstant.DELETE:
                    this.editSettingsTree.allowDeleting = false;
                    this.contextMenuItems.push({
                        text: 'Delete',
                        iconCss: ' e-icons e-delete',
                        target: '.e-content',
                        id: 'DeleteOC'
                    });
                    return [undefined];
                default:
                    return [undefined];
            }
        };
        BaseDetailComponent.prototype.getAlertTranslator = function () {
            var _this = this;
            this.translate.get(this.alert.updateMessage).subscribe(function (res) {
                if (res) {
                    _this.alert.updateMessage = res;
                }
            });
            this.translate.get(this.alert.updateTitle).subscribe(function (res) {
                if (res) {
                    _this.alert.updateTitle = res;
                }
            });
            this.translate.get(this.alert.createMessage).subscribe(function (res) {
                if (res) {
                    _this.alert.createMessage = res;
                }
            });
            this.translate.get(this.alert.createTitle).subscribe(function (res) {
                if (res) {
                    _this.alert.createTitle = res;
                }
            });
            this.translate.get(this.alert.deleteMessage).subscribe(function (res) {
                if (res) {
                    _this.alert.deleteMessage = res;
                }
            });
            this.translate.get(this.alert.deleteTitle).subscribe(function (res) {
                if (res) {
                    _this.alert.deleteTitle = res;
                }
            });
            this.translate.get(this.alert.serverError).subscribe(function (res) {
                if (res) {
                    _this.alert.serverError = res;
                }
            });
            this.translate.get(this.alert.cancelMessage).subscribe(function (res) {
                if (res) {
                    _this.alert.cancelMessage = res;
                }
            });
            this.translate.get(this.alert.choose_farm_message).subscribe(function (res) {
                if (res) {
                    _this.alert.choose_farm_message = res;
                }
            });
            this.translate.get(this.validationGrid.requireField).subscribe(function (res) {
                if (res) {
                    _this.validationGrid.requireField = res;
                }
            });
            this.translate.get(this.validationGrid.textLength).subscribe(function (res) {
                if (res) {
                    _this.validationGrid.textLength = res;
                }
            });
        };
        return BaseDetailComponent;
    }());

    var GiltInDropdownlistComponent = /** @class */ (function () {
        function GiltInDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "giltin-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'inOutNo', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['inOutNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        GiltInDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        GiltInDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        GiltInDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'lessthan', 99);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "GiltIn/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        GiltInDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        GiltInDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        GiltInDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return GiltInDropdownlistComponent;
    }());
    GiltInDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-gilt-in-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #giltinRemote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    GiltInDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    GiltInDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['giltinRemote',] }]
    };

    var BoarTestingDropdownlistComponent = /** @class */ (function () {
        function BoarTestingDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "boartesting-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'guid', value: 'guid' };
            this.take = 10;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['guid']);
                    e.updateData(_this.data, query);
                }
            };
        }
        BoarTestingDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BoarTestingDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        BoarTestingDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'lessthan', 99);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "BoarTesting/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        BoarTestingDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        BoarTestingDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        BoarTestingDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BoarTestingDropdownlistComponent;
    }());
    BoarTestingDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-boar-testing-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #giltinRemote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [""]
                },] }
    ];
    BoarTestingDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    BoarTestingDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['boartestingRemote',] }]
    };

    var GiltinMakeorderDropdownlistComponent = /** @class */ (function () {
        function GiltinMakeorderDropdownlistComponent(baseUrl, trans, cd, service) {
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.cd = cd;
            this.service = service;
            this.id = "makeorder2-remote";
            this.selectedValue = '';
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.giltInGuidChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
        }
        GiltinMakeorderDropdownlistComponent.prototype.ngOnDestroy = function () {
        };
        GiltinMakeorderDropdownlistComponent.prototype.ngAfterViewChecked = function () {
            this.selectedValue = this.selectedValue || "";
            this.cd.detectChanges();
        };
        GiltinMakeorderDropdownlistComponent.prototype.ngOnInit = function () {
            this.loadData();
        };
        GiltinMakeorderDropdownlistComponent.prototype.loadData = function () {
            this.query = new ej2Data.Query()
                .where('farmGuid', 'equal', localStorage.getItem('farmGuid'));
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "GiltIn/LoadDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        GiltinMakeorderDropdownlistComponent.prototype.ngOnChanges = function (changes) {
        };
        GiltinMakeorderDropdownlistComponent.prototype.onChange = function (args) {
            var _a;
            this.change.emit(args);
            this.giltInGuidChange.emit((_a = args.itemData) === null || _a === void 0 ? void 0 : _a.giltInGuid);
            this.selectedValueChange.emit(args.value);
        };
        return GiltinMakeorderDropdownlistComponent;
    }());
    GiltinMakeorderDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-giltin-makeorder-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(value)]=\"selectedValue\"\n  (change)=\"onChange($event)\"\n  [allowFiltering]=\"true\"\n  [enabled]=\"!disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    GiltinMakeorderDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService },
        { type: i0.ChangeDetectorRef },
        { type: PigfarmCoreService }
    ]; };
    GiltinMakeorderDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        giltInGuidChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var BomGiltDropdownlistComponent = /** @class */ (function () {
        function BomGiltDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "BomGilt-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        BomGiltDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BomGiltDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        BomGiltDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .skip(this.skip)
                .take(this.take)
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "BomGilt/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        BomGiltDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        BomGiltDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        BomGiltDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BomGiltDropdownlistComponent;
    }());
    BomGiltDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-bom-gilt-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #BomGiltRemote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    BomGiltDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    BomGiltDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['BomGiltRemote',] }]
    };

    var BomBoarDropdownlistComponent = /** @class */ (function () {
        function BomBoarDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "BomBoar-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, 'name');
                    e.updateData(_this.data, query);
                }
            };
        }
        BomBoarDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BomBoarDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        BomBoarDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .skip(this.skip)
                .take(this.take)
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "BomBoar/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        BomBoarDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        BomBoarDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        BomBoarDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BomBoarDropdownlistComponent;
    }());
    BomBoarDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-bom-boar-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #BomBoarRemote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    BomBoarDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    BomBoarDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['BomBoarRemote',] }]
    };

    var RecordSaleDropdownlistComponent = /** @class */ (function () {
        function RecordSaleDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "record-sale-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'salesOrderName', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['salesOrderName', 'salesOrderNo']);
                    e.updateData(_this.data, query);
                }
            };
        }
        RecordSaleDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        RecordSaleDropdownlistComponent.prototype.actionComplete = function (e) {
            console.log(e);
        };
        RecordSaleDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query();
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "RecordSale/GetDataDropdownlist?lang=" + localStorage.getItem('lang') + "&farmGuid=" + localStorage.getItem('farmGuid'),
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        RecordSaleDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            console.log(this.selectedValue);
            this.selectedValue = this.selectedValue || "";
        };
        RecordSaleDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
        };
        RecordSaleDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return RecordSaleDropdownlistComponent;
    }());
    RecordSaleDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-record-sale-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #recordSaleRemote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px!important;padding:3px!important}"]
                },] }
    ];
    RecordSaleDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    RecordSaleDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['recordSaleRemote',] }]
    };

    var ParkinglotDropdownlistComponent = /** @class */ (function () {
        function ParkinglotDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "site-remote";
            this.placeholder = "";
            this.disabled = false;
            this.enabledLoad = true;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueName = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: "name", value: "guid" };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === "") {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query
                        .clone()
                        .search(e.text, ["parkingLotNo", "parkingLotName"]);
                    e.updateData(_this.data, query);
                }
            };
        }
        ParkinglotDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        ParkinglotDropdownlistComponent.prototype.actionComplete = function (e) { };
        ParkinglotDropdownlistComponent.prototype.ngOnInit = function () { };
        ParkinglotDropdownlistComponent.prototype.loadData = function () {
            this.query = new ej2Data.Query().where("status", "equal", 1);
            if (this.siteGuid) {
                this.query.where("siteGuid", "equal", this.siteGuid);
            }
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "ParkingLot/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor(),
                crossDomain: true,
            }, this.query);
        };
        ParkinglotDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            var _a;
            // only run when property "data" changed
            if (changes["selectedValue"]) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            this.selectedValue = this.selectedValue || "";
            if (changes["siteGuid"] && changes["siteGuid"].currentValue) {
                this.loadData();
            }
            if (changes["enabledLoad"] && changes["enabledLoad"].currentValue == true && !((_a = changes["siteGuid"]) === null || _a === void 0 ? void 0 : _a.currentValue)) {
                this.loadData();
            }
        };
        ParkinglotDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueName.emit(args.itemData.name || "");
        };
        ParkinglotDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return ParkinglotDropdownlistComponent;
    }());
    ParkinglotDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "app-parkinglot-dropdownlist",
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    ParkinglotDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    ParkinglotDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        siteGuid: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        enabledLoad: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueName: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ["remote",] }]
    };

    var LandlordDropdownlistComponent = /** @class */ (function () {
        function LandlordDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "landlord-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueName = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'landLordName', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['landLordNo', 'landLordName']);
                    e.updateData(_this.data, query);
                }
            };
        }
        LandlordDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        LandlordDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        LandlordDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Landlord/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        LandlordDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            // only run when property "data" changed
            if (changes['selectedValue']) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            this.selectedValue = this.selectedValue || "";
        };
        LandlordDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueName.emit(args.itemData.name || '');
        };
        LandlordDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return LandlordDropdownlistComponent;
    }());
    LandlordDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-landlord-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    LandlordDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    LandlordDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueName: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var PigfarmRichtexteditorComponent = /** @class */ (function () {
        function PigfarmRichtexteditorComponent() {
        }
        PigfarmRichtexteditorComponent.prototype.ngOnInit = function () {
        };
        return PigfarmRichtexteditorComponent;
    }());
    PigfarmRichtexteditorComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'pigfarm-richtexteditor',
                    template: "<ejs-richtexteditor #defaultRTE id='defaultRTE'>\n  <ng-template #valueTemplate>\n      <p>The Rich Text Editor component is WYSIWYG (\"what you see is what you get\") editor\n      that provides the best user experience to create and update the content.\n      Users can format their content using standard toolbar commands.</p>\n\n      <p><b>Key features:</b></p>\n\n      <ul><li><p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p></li>\n      <li><p>Capable of handling markdown editing.</p></li>\n      <li><p>Contains a modular library to load the necessary functionality on demand.</p></li>\n      <li><p>Provides a fully customizable toolbar.</p></li>\n      <li><p>Provides HTML view to edit the source directly for developers.</p></li>\n      <li><p>Supports third-party library integration.</p></li>\n      <li><p>Allows preview of modified content before saving it.</p></li>\n      <li><p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p></li>\n      <li><p>Contains undo/redo manager.</p></li>\n      <li><p>Creates bulleted and numbered lists.</p></li>\n      </ul>\n  </ng-template>\n  </ejs-richtexteditor>",
                    styles: [""]
                },] }
    ];
    PigfarmRichtexteditorComponent.ctorParameters = function () { return []; };

    var BankDropdownlistComponent = /** @class */ (function () {
        function BankDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "landlord-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueName = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'bankName', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['bankNo', 'bankName']);
                    e.updateData(_this.data, query);
                }
            };
        }
        BankDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        BankDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        BankDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query();
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Bank/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        BankDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            // only run when property "data" changed
            if (changes['selectedValue']) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            this.selectedValue = this.selectedValue || "";
        };
        BankDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueName.emit(args.itemData.name || '');
        };
        BankDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return BankDropdownlistComponent;
    }());
    BankDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-bank-dropdownlist',
                    template: "<ejs-dropdownlist\n  [id]=\"id\"\n  [(ngModel)]=\"selectedValue\"\n  (filtering)=\"onFiltering($event)\"\n  (change)=\"onChange($event)\"\n  (ngModelChange)=\"onNgModelChange($event)\"\n  [allowFiltering]=\"true\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n  #remote\n  [dataSource]=\"data\"\n  [fields]=\"remoteFields\"\n  [query]=\"query\"\n  (open)=\"onOpen($event)\"\n  (actionComplete)=\"actionComplete($event)\"\n\n>\n\n</ejs-dropdownlist>\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    BankDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    BankDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueName: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var DeviceDropdownlistComponent = /** @class */ (function () {
        function DeviceDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "device-remote";
            this.placeholder = "";
            this.disabled = false;
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueName = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: 'name', value: 'guid' };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === '') {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query.clone().search(e.text, ['deviceNo', 'deviceName']);
                    e.updateData(_this.data, query);
                }
            };
        }
        DeviceDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        DeviceDropdownlistComponent.prototype.actionComplete = function (e) {
        };
        DeviceDropdownlistComponent.prototype.ngOnInit = function () {
            this.query = new ej2Data.Query()
                .where('status', 'equal', 1);
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Device/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor,
                crossDomain: true,
            }, this.query);
        };
        DeviceDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            // only run when property "data" changed
            if (changes['selectedValue']) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            this.selectedValue = this.selectedValue || "";
        };
        DeviceDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueName.emit(args.itemData.name || '');
        };
        DeviceDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return DeviceDropdownlistComponent;
    }());
    DeviceDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-device-dropdownlist',
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    DeviceDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    DeviceDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueName: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ['remote',] }]
    };

    var SiteDropdownlistComponent = /** @class */ (function () {
        function SiteDropdownlistComponent(baseUrl, trans) {
            var _this = this;
            this.baseUrl = baseUrl;
            this.trans = trans;
            this.id = "site-remote";
            this.placeholder = "";
            this.disabled = false;
            this.enabledLoad = true;
            this.landlordGuid = "";
            this.change = new i0.EventEmitter();
            this.ngModelChange = new i0.EventEmitter();
            this.selectedValueName = new i0.EventEmitter();
            this.selectedValueChange = new i0.EventEmitter();
            this.remoteFields = { text: "name", value: "guid" };
            this.take = 100;
            this.skip = 0;
            this.onFiltering = function (e) {
                if (e.text === "") {
                    e.updateData(_this.data);
                }
                else {
                    var query = _this.dropdownObj.query
                        .clone()
                        .search(e.text, ["siteNo", "siteName"]);
                    e.updateData(_this.data, query);
                }
            };
        }
        SiteDropdownlistComponent.prototype.onOpen = function (args) {
            // let start: number = this.take;
            // let end: number = 5;
            // let listElement: HTMLElement = (this.dropdownObj as any).list;
            // listElement.addEventListener('scroll', () => {
            //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
            //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
            //     let filterQuery = this.dropdownObj.query.clone();
            //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
            //       start = end;
            //       end += 5;
            //       // const unique = [...new Set(event.result.map(item => item.group))];
            //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
            //     }).catch((e: Object) => {
            //     });
            //   }
            // })
        };
        SiteDropdownlistComponent.prototype.actionComplete = function (e) { };
        SiteDropdownlistComponent.prototype.ngOnInit = function () { };
        SiteDropdownlistComponent.prototype.loadData = function () {
            this.query = new ej2Data.Query().where("status", "equal", 1);
            if (this.landlordGuid) {
                this.query.where("landlordGuid", "equal", this.landlordGuid);
            }
            this.data = new ej2Data.DataManager({
                url: this.baseUrl + "Site/GetDataDropdownlist",
                adaptor: new ej2Data.UrlAdaptor(),
                crossDomain: true,
            }, this.query);
        };
        SiteDropdownlistComponent.prototype.ngOnChanges = function (changes) {
            var _a;
            // only run when property "data" changed
            if (changes["selectedValue"]) {
                this.selectedValueChange.emit(this.selectedValue);
            }
            this.selectedValue = this.selectedValue || "";
            if (changes["landlordGuid"] && changes["landlordGuid"].currentValue) {
                this.loadData();
            }
            if (changes["enabledLoad"] && changes["enabledLoad"].currentValue == true && !((_a = changes["landlordGuid"]) === null || _a === void 0 ? void 0 : _a.currentValue)) {
                this.loadData();
            }
        };
        SiteDropdownlistComponent.prototype.onChange = function (args) {
            this.change.emit(args);
            this.selectedValueName.emit(args.itemData.name || "");
        };
        SiteDropdownlistComponent.prototype.onNgModelChange = function (value) {
            this.ngModelChange.emit(value);
            this.selectedValueChange.emit(value);
        };
        return SiteDropdownlistComponent;
    }());
    SiteDropdownlistComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: "app-site-dropdownlist",
                    template: "<ejs-dropdownlist\r\n  [id]=\"id\"\r\n  [(ngModel)]=\"selectedValue\"\r\n  (filtering)=\"onFiltering($event)\"\r\n  (change)=\"onChange($event)\"\r\n  (ngModelChange)=\"onNgModelChange($event)\"\r\n  [allowFiltering]=\"true\"\r\n  [disabled]=\"disabled\"\r\n  [placeholder]=\"placeholder\"\r\n  #remote\r\n  [dataSource]=\"data\"\r\n  [fields]=\"remoteFields\"\r\n  [query]=\"query\"\r\n  (open)=\"onOpen($event)\"\r\n  (actionComplete)=\"actionComplete($event)\"\r\n\r\n>\r\n\r\n</ejs-dropdownlist>\r\n",
                    styles: [".e-input-group{box-shadow:.5px .5px 1px;padding:3px}"]
                },] }
    ];
    SiteDropdownlistComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1$1.TranslateService }
    ]; };
    SiteDropdownlistComponent.propDecorators = {
        id: [{ type: i0.Input }],
        selectedValue: [{ type: i0.Input }],
        placeholder: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        enabledLoad: [{ type: i0.Input }],
        landlordGuid: [{ type: i0.Input }],
        change: [{ type: i0.Output }],
        ngModelChange: [{ type: i0.Output }],
        selectedValueName: [{ type: i0.Output }],
        selectedValueChange: [{ type: i0.Output }],
        dropdownObj: [{ type: i0.ViewChild, args: ["remote",] }]
    };

    var commponents = [
        PigDropdownlistComponent,
        PenDropdownlistComponent,
        RoomDropdownlistComponent,
        CodeTypeDropdownlistComponent,
        FarmDropdownlistComponent,
        FeedDropdownlistComponent,
        MaterialDropdownlistComponent,
        MaskedtimetextboxComponent,
        DiseaseDropdownlistComponent,
        MedicineDropdownlistComponent,
        BomDropdownlistComponent,
        CustomerDropdownlistComponent,
        VectorControlDropdownlistComponent,
        DisinfectionDropdownlistComponent,
        CullingTankDropdownlistComponent,
        PenDropdownlistModalComponent,
        MyCheckboxComponent,
        ThingDropdownlistComponent,
        AccountDropdownlistComponent,
        MultiPigGridComponent,
        Record2RoomComponent,
        Record2PenComponent,
        PenMultiselectComponent,
        MakeorderDropdownlistComponent,
        AreaDropdownlistComponent,
        BarnDropdownlistComponent,
        SelectedpigGridComponent,
        TreatmentDropdownlistComponent,
        MakeorderDropdownlistToolbarComponent,
        XaccountGroupComponent,
        RecordsaleDropdownlistComponent,
        SemenDropdownlistComponent,
        BreedingDropdownlistComponent,
        DynamicGridComponent,
        BreedingDropdownlistToolbarComponent,
        CustomerDropdownlistToolbarComponent,
        UploadMultiDocumentComponent,
        Breeding2SowinDropdownlistComponent,
        UploadDocumentComponent,
        GiltInDropdownlistComponent,
        BoarTestingDropdownlistComponent,
        GiltinMakeorderDropdownlistComponent,
        BomBoarDropdownlistComponent,
        BomGiltDropdownlistComponent,
        RecordSaleDropdownlistComponent,
        SiteDropdownlistComponent,
        DeviceDropdownlistComponent,
        PigfarmRichtexteditorComponent,
        LandlordDropdownlistComponent,
        BankDropdownlistComponent,
        ParkinglotDropdownlistComponent
    ];
    var PigfarmCoreModule = /** @class */ (function () {
        function PigfarmCoreModule() {
        }
        PigfarmCoreModule.forRoot = function (environment) {
            return {
                ngModule: PigfarmCoreModule,
                providers: [
                    ej2AngularGrids.EditService,
                    PigfarmCoreService,
                    AlertifyService,
                    { provide: 'Env', useValue: environment }
                ]
            };
        };
        return PigfarmCoreModule;
    }());
    PigfarmCoreModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: __spread(commponents),
                    imports: [
                        ej2AngularDropdowns.DropDownListModule,
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        ej2AngularInputs.MaskedTextBoxModule,
                        ej2AngularButtons.CheckBoxAllModule,
                        i1$1.TranslateModule,
                        ej2AngularGrids.GridAllModule,
                        ej2AngularDropdowns.MultiSelectAllModule,
                        ej2AngularCalendars.DatePickerAllModule,
                        ej2AngularDropdowns.ComboBoxModule,
                        ej2AngularInputs.UploaderModule,
                        ej2AngularRichtexteditor.RichTextEditorAllModule,
                    ],
                    exports: __spread(commponents),
                    providers: [
                        ej2AngularGrids.EditService,
                        PigfarmCoreService,
                        AlertifyService
                    ]
                },] }
    ];

    var CURDService = /** @class */ (function (_super) {
        __extends(CURDService, _super);
        //#endregion
        //#region Ctor
        function CURDService(env, http, entity, utilitiesService) {
            var _this = _super.call(this) || this;
            _this.env = env;
            _this.http = http;
            _this.entity = entity;
            _this.utilitiesService = utilitiesService;
            _this.audits = ["updateDate", "createDate", "deleteDate", "lastLoginDate"];
            _this.base = _this.env;
            //#region Field
            _this._sharedHeaders = new i1.HttpHeaders();
            _this._sharedHeaders = _this._sharedHeaders.set("Content-Type", "application/json");
            return _this;
        }
        //#endregion
        //#region LoadData
        CURDService.prototype.getAll = function () {
            return this.http
                .get("" + this.base + this.entity + "/getall", {})
                .pipe(operators.catchError(this.handleError));
        };
        CURDService.prototype.getById = function (id) {
            return this.http
                .get("" + this.base + this.entity + "/getById?id=" + id, {})
                .pipe(operators.catchError(this.handleError));
        };
        //#endregion
        //#region Action
        CURDService.prototype.insertWithFormData = function (model) {
            var params = this.utilitiesService.ToFormData(model);
            return this.http
                .post("" + this.base + this.entity + "/insert", params)
                .pipe(operators.catchError(this.handleError));
        };
        CURDService.prototype.updateWithFormData = function (model) {
            var params = this.utilitiesService.ToFormData(model);
            return this.http
                .put("" + this.base + this.entity + "/update", params)
                .pipe(operators.catchError(this.handleError));
        };
        CURDService.prototype.add = function (model) {
            var e_1, _a;
            try {
                for (var _b = __values(this.audits), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var audit = _c.value;
                    var value2 = model[audit];
                    if (value2 instanceof Date) {
                        model[audit] = value2.toLocaleDateString() + " " + value2.toLocaleTimeString("en-GB");
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.http.post("" + this.base + this.entity + "/add", model);
        };
        CURDService.prototype.addRange = function (model) {
            var e_2, _a, e_3, _b;
            try {
                for (var _c = __values(this.audits), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var audit = _d.value;
                    try {
                        for (var model_1 = (e_3 = void 0, __values(model)), model_1_1 = model_1.next(); !model_1_1.done; model_1_1 = model_1.next()) {
                            var ml = model_1_1.value;
                            var value2 = model[audit];
                            if (value2 instanceof Date) {
                                model[audit] = value2.toLocaleDateString() + " " + value2.toLocaleTimeString("en-GB");
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (model_1_1 && !model_1_1.done && (_b = model_1.return)) _b.call(model_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return this.http
                .post("" + this.base + this.entity + "/addRange", model)
                .pipe(operators.catchError(this.handleError));
        };
        CURDService.prototype.updateRange = function (model) {
            var e_4, _a, e_5, _b;
            try {
                for (var _c = __values(this.audits), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var audit = _d.value;
                    try {
                        for (var model_2 = (e_5 = void 0, __values(model)), model_2_1 = model_2.next(); !model_2_1.done; model_2_1 = model_2.next()) {
                            var ml = model_2_1.value;
                            var value2 = model[audit];
                            if (value2 instanceof Date) {
                                model[audit] = value2.toLocaleDateString() + " " + value2.toLocaleTimeString("en-GB");
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (model_2_1 && !model_2_1.done && (_b = model_2.return)) _b.call(model_2);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return this.http
                .put("" + this.base + this.entity + "/updateRange", model)
                .pipe(operators.catchError(this.handleError));
        };
        CURDService.prototype.update = function (model) {
            var e_6, _a;
            try {
                for (var _b = __values(this.audits), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var audit = _c.value;
                    var value2 = model[audit];
                    if (value2 instanceof Date) {
                        model[audit] = value2.toLocaleDateString() + " " + value2.toLocaleTimeString("en-GB");
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return this.http.put("" + this.base + this.entity + "/update", model);
        };
        CURDService.prototype.updatestatus = function (id) {
            return this.http
                .put("" + this.base + this.entity + "/updatestatus?id=" + id, {})
                .pipe(operators.catchError(this.handleError));
        };
        CURDService.prototype.delete = function (id) {
            return this.http.delete("" + this.base + this.entity + "/delete?id=" + id);
        };
        CURDService.prototype.deleterange = function (ids) {
            var e_7, _a;
            var query = "";
            try {
                for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                    var id = ids_1_1.value;
                    query += "id=" + id + "&";
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return this.http
                .delete("" + this.base + this.entity + "/deleterange?" + query)
                .pipe(operators.catchError(this.handleError));
        };
        //#endregion
        CURDService.prototype.getAudit = function (id) {
            return this.http.get("" + this.base + this.entity + "/GetAudit?id=" + id, {});
        };
        CURDService.prototype.downloadODSFile = function (model) {
            var params = this.utilitiesService.ToFormData(model);
            return this.http.post(this.base + "Files/ExcelExportToDOS", params, {
                responseType: "blob",
                observe: "response",
            });
        };
        CURDService.prototype.downloadExcelFile = function (recordGuid) {
            return this.http.get(this.base + "Files/DownloadTemplateFile?recordGuid=" + recordGuid, {
                responseType: "blob",
                observe: "response",
            });
        };
        CURDService.prototype.excelExportRecordSale = function (p) {
            return this.http.post(this.base + "Files/ExcelExportRecordSale", p, {
                responseType: "blob",
                observe: "response",
            });
        };
        CURDService.prototype.downloadBlob = function (data, fileName, mimeType) {
            var blob, url;
            blob = new Blob([data], {
                type: mimeType,
            });
            url = window.URL.createObjectURL(blob);
            var a;
            a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.style = "display: none";
            a.click();
            a.remove();
            setTimeout(function () {
                return window.URL.revokeObjectURL(url);
            }, 1000);
        };
        return CURDService;
    }(BaseService));
    CURDService.decorators = [
        { type: i0.Injectable }
    ];
    CURDService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: ["Env",] }] },
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Inject, args: [String,] }] },
        { type: UtilitiesService }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AccountDropdownlistComponent = AccountDropdownlistComponent;
    exports.AlertifyService = AlertifyService;
    exports.AreaDropdownlistComponent = AreaDropdownlistComponent;
    exports.BankDropdownlistComponent = BankDropdownlistComponent;
    exports.BarnDropdownlistComponent = BarnDropdownlistComponent;
    exports.BaseComponent = BaseComponent;
    exports.BaseDetailComponent = BaseDetailComponent;
    exports.BaseService = BaseService;
    exports.BoarTestingDropdownlistComponent = BoarTestingDropdownlistComponent;
    exports.BomBoarDropdownlistComponent = BomBoarDropdownlistComponent;
    exports.BomDropdownlistComponent = BomDropdownlistComponent;
    exports.BomGiltDropdownlistComponent = BomGiltDropdownlistComponent;
    exports.Breeding2SowinDropdownlistComponent = Breeding2SowinDropdownlistComponent;
    exports.BreedingDropdownlistComponent = BreedingDropdownlistComponent;
    exports.BreedingDropdownlistToolbarComponent = BreedingDropdownlistToolbarComponent;
    exports.CURDService = CURDService;
    exports.CodeTypeDropdownlistComponent = CodeTypeDropdownlistComponent;
    exports.CullingTankDropdownlistComponent = CullingTankDropdownlistComponent;
    exports.CustomerDropdownlistComponent = CustomerDropdownlistComponent;
    exports.CustomerDropdownlistToolbarComponent = CustomerDropdownlistToolbarComponent;
    exports.DeviceDropdownlistComponent = DeviceDropdownlistComponent;
    exports.DiseaseDropdownlistComponent = DiseaseDropdownlistComponent;
    exports.DisinfectionDropdownlistComponent = DisinfectionDropdownlistComponent;
    exports.DynamicGridComponent = DynamicGridComponent;
    exports.FarmDropdownlistComponent = FarmDropdownlistComponent;
    exports.FeedDropdownlistComponent = FeedDropdownlistComponent;
    exports.GiltInDropdownlistComponent = GiltInDropdownlistComponent;
    exports.GiltinMakeorderDropdownlistComponent = GiltinMakeorderDropdownlistComponent;
    exports.LandlordDropdownlistComponent = LandlordDropdownlistComponent;
    exports.MakeorderDropdownlistComponent = MakeorderDropdownlistComponent;
    exports.MakeorderDropdownlistToolbarComponent = MakeorderDropdownlistToolbarComponent;
    exports.MaskedtimetextboxComponent = MaskedtimetextboxComponent;
    exports.MaterialDropdownlistComponent = MaterialDropdownlistComponent;
    exports.MedicineDropdownlistComponent = MedicineDropdownlistComponent;
    exports.MultiPigGridComponent = MultiPigGridComponent;
    exports.MyCheckboxComponent = MyCheckboxComponent;
    exports.ParkinglotDropdownlistComponent = ParkinglotDropdownlistComponent;
    exports.PenDropdownlistComponent = PenDropdownlistComponent;
    exports.PenDropdownlistModalComponent = PenDropdownlistModalComponent;
    exports.PenMultiselectComponent = PenMultiselectComponent;
    exports.PigDropdownlistComponent = PigDropdownlistComponent;
    exports.PigfarmCoreModule = PigfarmCoreModule;
    exports.PigfarmCoreService = PigfarmCoreService;
    exports.PigfarmRichtexteditorComponent = PigfarmRichtexteditorComponent;
    exports.Record2PenComponent = Record2PenComponent;
    exports.Record2RoomComponent = Record2RoomComponent;
    exports.RecordSaleDropdownlistComponent = RecordSaleDropdownlistComponent;
    exports.RecordsaleDropdownlistComponent = RecordsaleDropdownlistComponent;
    exports.RoomDropdownlistComponent = RoomDropdownlistComponent;
    exports.SelectedpigGridComponent = SelectedpigGridComponent;
    exports.SemenDropdownlistComponent = SemenDropdownlistComponent;
    exports.SiteDropdownlistComponent = SiteDropdownlistComponent;
    exports.ThingDropdownlistComponent = ThingDropdownlistComponent;
    exports.TreatmentDropdownlistComponent = TreatmentDropdownlistComponent;
    exports.UploadDocumentComponent = UploadDocumentComponent;
    exports.UploadMultiDocumentComponent = UploadMultiDocumentComponent;
    exports.UtilitiesService = UtilitiesService;
    exports.VectorControlDropdownlistComponent = VectorControlDropdownlistComponent;
    exports.XaccountGroupComponent = XaccountGroupComponent;
    exports["ɵa"] = PigfarmCoreService;
    exports["ɵb"] = UploadDocumentComponent;
    exports["ɵc"] = BoarTestingDropdownlistComponent;
    exports["ɵd"] = GiltinMakeorderDropdownlistComponent;
    exports["ɵe"] = BomBoarDropdownlistComponent;
    exports["ɵf"] = BomGiltDropdownlistComponent;
    exports["ɵg"] = RecordSaleDropdownlistComponent;
    exports["ɵh"] = AlertifyService;
    exports["ɵi"] = UtilitiesService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pigfarm-core.umd.js.map
