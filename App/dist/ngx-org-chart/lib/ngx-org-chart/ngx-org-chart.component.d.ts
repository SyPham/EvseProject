import { EventEmitter } from '@angular/core';
import { INode } from '../node';
import * as i0 from "@angular/core";
export declare class NgxOrgChartComponent {
    nodes: INode[];
    hasParent: boolean;
    direction: 'vertical' | 'horizontal';
    itemClick: EventEmitter<INode>;
    static ɵfac: i0.ɵɵFactoryDef<NgxOrgChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<NgxOrgChartComponent, "ngx-org-chart", never, { "nodes": "nodes"; "hasParent": "hasParent"; "direction": "direction"; }, { "itemClick": "itemClick"; }, never, never>;
}
