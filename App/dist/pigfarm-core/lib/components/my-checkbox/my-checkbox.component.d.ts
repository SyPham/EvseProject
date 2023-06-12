import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class MyCheckboxComponent implements OnInit, OnChanges {
    private baseUrl;
    checked: any;
    label: any;
    checkedChange: EventEmitter<any>;
    checkedValue: boolean;
    constructor(baseUrl: any);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    onCheckedChange(value: any): void;
}
