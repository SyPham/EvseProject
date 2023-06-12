import { EventEmitter } from '@angular/core';
import { INode } from '../node';
import * as i0 from "@angular/core";
export declare class NgxChartDesignerComponent {
    node: INode;
    hasParent: boolean;
    direction: 'vertical' | 'horizontal';
    itemClick: EventEmitter<INode>;
    get hostClass(): "" | "column";
    static ɵfac: i0.ɵɵFactoryDef<NgxChartDesignerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NgxChartDesignerComponent, "ngx-chart-designer", never, { "node": "node"; "hasParent": "hasParent"; "direction": "direction"; }, { "itemClick": "itemClick"; }, never, never>;
}
