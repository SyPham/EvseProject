import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from "@angular/router";
import { FunctionSystem } from '../../_core/models/application-user';
export declare abstract class BaseDetailComponent {
    translate: TranslateService;
    url: string;
    globalLang: string;
    skip: number;
    take: number;
    functionName: string;
    printBy: string;
    audit: any;
    baseUrl: string;
    alert: {
        updateMessage: string;
        updateTitle: string;
        createMessage: string;
        createTitle: string;
        deleteMessage: string;
        deleteTitle: string;
        cancelMessage: string;
        serverError: string;
        deleted_ok_msg: string;
        created_ok_msg: string;
        updated_ok_msg: string;
        system_error_msg: string;
        exist_message: string;
        choose_farm_message: string;
        select_order_message: string;
        yes_message: string;
        no_message: string;
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
    getAlertTranslator(): void;
}
