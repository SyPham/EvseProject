import { AfterViewChecked, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
export declare class MaskedtimetextboxComponent implements OnInit, AfterViewChecked {
    private baseUrl;
    private cdRef;
    disabled: boolean;
    selectedValue: string;
    id: number;
    selectedValueChange: EventEmitter<any>;
    onblurChange: EventEmitter<any>;
    constructor(baseUrl: any, cdRef: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    ngOnInit(): void;
    onChange(args: any): void;
    onblur(e: any): void;
}
