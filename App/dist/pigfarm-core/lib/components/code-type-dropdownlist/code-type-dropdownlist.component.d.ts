import { Query } from '@syncfusion/ej2-data';
import { OnInit, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
export declare class CodeTypeDropdownlistComponent implements OnInit, OnChanges, AfterViewChecked {
    private baseUrl;
    private cd;
    trans: TranslateService;
    id: string;
    selectedValue: any;
    placeholder: any;
    codeType: string;
    disabled: boolean;
    change: EventEmitter<any>;
    ngModelChange: EventEmitter<any>;
    selectedValueChange: EventEmitter<any>;
    selectedNameChange: EventEmitter<any>;
    dropdownObj: DropDownListComponent;
    onblurChange: EventEmitter<any>;
    data: any;
    query: Query;
    remoteFields: Object;
    take: number;
    skip: number;
    firstValue: any;
    onOpen(args: any): void;
    onFiltering: any;
    actionComplete(e: any): void;
    constructor(baseUrl: any, cd: ChangeDetectorRef, trans: TranslateService);
    ngAfterViewChecked(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onChange(args: any): void;
    onNgModelChange(value: any): void;
    onblur(e: any): void;
}
