import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from "@angular/router";
import { StatusConstants } from '../../_core/_constants';
import { FunctionSystem } from '../../_core/models/application-user';
export declare abstract class BaseComponent {
    translate: TranslateService;
    url: string;
    statusConts: StatusConstants;
    isodsExport: boolean;
    pageSettings: any;
    globalLang: string;
    skip: number;
    take: number;
    functionName: string;
    printBy: string;
    audit: any;
    sortOptions: {
        columns: {
            field: string;
            direction: string;
        }[];
    };
    isAdmin: boolean;
    baseUrl: string;
    alert: {
        updateMessage: any;
        updateTitle: any;
        createMessage: any;
        createTitle: any;
        deleteMessage: any;
        deleteTitle: any;
        cancelMessage: any;
        serverError: any;
        deleted_ok_msg: any;
        created_ok_msg: any;
        updated_ok_msg: any;
        system_error_msg: any;
        exist_message: any;
        choose_farm_message: any;
        select_order_message: any;
        yes_message: any;
        no_message: any;
    };
    validationGrid: {
        requireField: string;
        textLength: string;
    };
    functions: FunctionSystem[];
    editSettingsTree: {
        allowEditing: boolean;
        allowAdding: boolean;
        allowDeleting: boolean;
        newRowPosition: string;
        mode: string;
    };
    editSettings: {
        showDeleteConfirmDialog: boolean;
        allowEditing: boolean;
        allowAdding: boolean;
        allowDeleting: boolean;
        mode: string;
    };
    toolbarOptions: any[];
    toolbarOptionsTree: string[];
    contextMenuItems: {
        text: string;
        iconCss: string;
        target: string;
        id: string;
    }[];
    protected Permission(route: ActivatedRoute): void;
    protected PermissionForTreeGrid(route: ActivatedRoute): void;
    protected makeAction(input: string): string[];
    protected makeActionTreeGrid(input: string): string[];
    constructor(translate: TranslateService, url: string);
    convertDate(data: any): any;
    average: (nums: any) => number;
    total: (nums: any) => any;
    visibledApply(model: any): boolean;
    visibledAgree(model: any): boolean;
    visibledReject(model: any): boolean;
    visibledExecute(model: any): boolean;
    visibledInventory(model: any): boolean;
    visibledFinance(model: any): boolean;
    disabledApplyReason(model: any): boolean;
    disabledAgreeReason(model: any): boolean;
    disabledRejectReason(model: any): boolean;
}
