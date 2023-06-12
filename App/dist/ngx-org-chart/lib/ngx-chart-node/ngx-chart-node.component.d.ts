import { EventEmitter } from '@angular/core';
import { INode } from '../node';
import * as i0 from "@angular/core";
export declare class NgxChartNodeComponent {
    node: INode;
    hasParent: boolean;
    direction: 'vertical' | 'horizontal';
    itemClick: EventEmitter<INode>;
    static ɵfac: i0.ɵɵFactoryDef<NgxChartNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NgxChartNodeComponent, "ngx-chart-node", never, { "node": "node"; "hasParent": "hasParent"; "direction": "direction"; }, { "itemClick": "itemClick"; }, never, never>;
}
