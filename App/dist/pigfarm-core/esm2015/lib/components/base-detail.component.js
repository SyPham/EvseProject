import { ActionConstant, MessageConstants } from '../../_core/_constants';
export class BaseDetailComponent {
    constructor(translate, url) {
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
    Permission(route) {
        const functionCode = route.snapshot.data.functionCode;
        this.functions = JSON.parse(localStorage.getItem('functions')).filter(x => x.functionCode === functionCode) || [];
        for (const item of this.functions) {
            const toolbarOptions = [];
            for (const action of item.childrens) {
                const optionItem = this.makeAction(action.code);
                toolbarOptions.push(...optionItem.filter(Boolean));
            }
            toolbarOptions.push('Search');
            const uniqueOptionItem = toolbarOptions.filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });
            this.toolbarOptions = uniqueOptionItem;
        }
    }
    PermissionForTreeGrid(route) {
        this.contextMenuItems = [];
        this.functions = JSON.parse(localStorage.getItem('functions'));
        for (const item of this.functions) {
            if (route.snapshot.data.functionCode.includes(item.functionCode)) {
                const toolbarOptionsTree = [];
                for (const action of item.childrens) {
                    const optionItem = this.makeActionTreeGrid(action.code);
                    toolbarOptionsTree.push(...optionItem.filter(Boolean));
                }
                toolbarOptionsTree.push(...['Search',
                    'ExpandAll',
                    'CollapseAll',
                    'ExcelExport']);
                const uniqueOptionItem = toolbarOptionsTree.filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                });
                this.toolbarOptionsTree = uniqueOptionItem;
                break;
            }
        }
    }
    // Đổi action code thanh action của ej2-grid
    makeAction(input) {
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
    }
    makeActionTreeGrid(input) {
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
    }
    getAlertTranslator() {
        this.translate.get(this.alert.updateMessage).subscribe((res) => {
            if (res) {
                this.alert.updateMessage = res;
            }
        });
        this.translate.get(this.alert.updateTitle).subscribe((res) => {
            if (res) {
                this.alert.updateTitle = res;
            }
        });
        this.translate.get(this.alert.createMessage).subscribe((res) => {
            if (res) {
                this.alert.createMessage = res;
            }
        });
        this.translate.get(this.alert.createTitle).subscribe((res) => {
            if (res) {
                this.alert.createTitle = res;
            }
        });
        this.translate.get(this.alert.deleteMessage).subscribe((res) => {
            if (res) {
                this.alert.deleteMessage = res;
            }
        });
        this.translate.get(this.alert.deleteTitle).subscribe((res) => {
            if (res) {
                this.alert.deleteTitle = res;
            }
        });
        this.translate.get(this.alert.serverError).subscribe((res) => {
            if (res) {
                this.alert.serverError = res;
            }
        });
        this.translate.get(this.alert.cancelMessage).subscribe((res) => {
            if (res) {
                this.alert.cancelMessage = res;
            }
        });
        this.translate.get(this.alert.choose_farm_message).subscribe((res) => {
            if (res) {
                this.alert.choose_farm_message = res;
            }
        });
        this.translate.get(this.validationGrid.requireField).subscribe((res) => {
            if (res) {
                this.validationGrid.requireField = res;
            }
        });
        this.translate.get(this.validationGrid.textLength).subscribe((res) => {
            if (res) {
                this.validationGrid.textLength = res;
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9saWIvY29tcG9uZW50cy9iYXNlLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzFFLE1BQU0sT0FBZ0IsbUJBQW1CO0lBZ0p2QyxZQUFtQixTQUEyQixFQUFTLEdBQVc7UUFBL0MsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBL0lsRSxlQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUlWLFlBQU8sR0FBRyxFQUFFLENBQUE7UUFDWixVQUFLLEdBQUc7WUFDTixhQUFhLEVBQUUsZ0JBQWdCLENBQUMsY0FBYztZQUM5QyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtZQUMxQyxhQUFhLEVBQUMsZ0JBQWdCLENBQUMsY0FBYztZQUM3QyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtZQUMxQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsY0FBYztZQUM5QyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtZQUMxQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsY0FBYztZQUM5QyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtZQUMxQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsY0FBYztZQUMvQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsY0FBYztZQUMvQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsY0FBYztZQUMvQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxnQkFBZ0I7WUFDbkQsYUFBYSxFQUFFLGdC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S0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDM0UsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7YUFDdEM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDN0UsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzNFLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aW9uQ29uc3RhbnQsIE1lc3NhZ2VDb25zdGFudHMgfSBmcm9tICcuLi8uLi9fY29yZS9fY29uc3RhbnRzJztcclxuaW1wb3J0IHsgRnVuY3Rpb25TeXN0ZW0gfSBmcm9tICcuLi8uLi9fY29yZS9tb2RlbHMvYXBwbGljYXRpb24tdXNlcic7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURldGFpbENvbXBvbmVudCB7XHJcbiAgZ2xvYmFsTGFuZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYW5nJyk7XHJcbiAgc2tpcCA9IDA7XHJcbiAgdGFrZSA9IDEwO1xyXG4gIGZ1bmN0aW9uTmFtZTogc3RyaW5nO1xyXG4gIHByaW50Qnk6IHN0cmluZztcclxuICBhdWRpdDogYW55O1xyXG4gIGJhc2VVcmwgPSAnJ1xyXG4gIGFsZXJ0ID0ge1xyXG4gICAgdXBkYXRlTWVzc2FnZTogTWVzc2FnZUNvbnN0YW50cy5VUERBVEVfTUVTU0FHRSxcclxuICAgIHVwZGF0ZVRpdGxlOiBNZXNzYWdlQ29uc3RhbnRzLlVQREFURV9USVRMRSxcclxuICAgIGNyZWF0ZU1lc3NhZ2U6TWVzc2FnZUNvbnN0YW50cy5DUkVBVEVfTUVTU0FHRSxcclxuICAgIGNyZWF0ZVRpdGxlOiBNZXNzYWdlQ29uc3RhbnRzLkNSRUFURV9USVRMRSxcclxuICAgIGRlbGV0ZU1lc3NhZ2U6IE1lc3NhZ2VDb25zdGFudHMuREVMRVRFX01FU1NBR0UsXHJcbiAgICBkZWxldGVUaXRsZTogTWVzc2FnZUNvbnN0YW50cy5ERUxFVEVfVElUTEUsXHJcbiAgICBjYW5jZWxNZXNzYWdlOiBNZXNzYWdlQ29uc3RhbnRzLkNBTkNFTF9NRVNTQUdFLFxyXG4gICAgc2VydmVyRXJyb3I6IE1lc3NhZ2VDb25zdGFudHMuU0VSVkVSX0VSUk9SLFxyXG4gICAgZGVsZXRlZF9va19tc2c6IE1lc3NhZ2VDb25zdGFudHMuREVMRVRFRF9PS19NU0csXHJcbiAgICBjcmVhdGVkX29rX21zZzogTWVzc2FnZUNvbnN0YW50cy5DUkVBVEVEX09LX01TRyxcclxuICAgIHVwZGF0ZWRfb2tfbXNnOiBNZXNzYWdlQ29uc3RhbnRzLlVQREFURURfT0tfTVNHLFxyXG4gICAgc3lzdGVtX2Vycm9yX21zZzogTWVzc2FnZUNvbnN0YW50cy5TWVNURU1fRVJST1JfTVNHLFxyXG4gICAgZXhpc3RfbWVzc2FnZTogTWVzc2FnZUNvbnN0YW50cy5FWElTVF9NRVNTQUdFLFxyXG4gICAgY2hvb3NlX2Zhcm1fbWVzc2FnZTogTWVzc2FnZUNvbnN0YW50cy5DSE9PU0VfRkFSTV9NRVNTQUdFLFxyXG4gICAgc2VsZWN0X29yZGVyX21lc3NhZ2U6IE1lc3NhZ2VDb25zdGFudHMuU0VMRUNUX09SREVSX01FU1NBR0UsXHJcbiAgICB5ZXNfbWVzc2FnZTogTWVzc2FnZUNvbnN0YW50cy5ZRVNfTVNHLFxyXG4gICAgbm9fbWVzc2FnZTogTWVzc2FnZUNvbnN0YW50cy5OT19NU0csXHJcbiAgfTtcclxuICB2YWxpZGF0aW9uR3JpZCA9IHtcclxuICAgIHJlcXVpcmVGaWVsZDonVGhpcyBmaWVsZCBpcyByZXF1aXJlLicsXHJcbiAgICB0ZXh0TGVuZ3RoOiAnVGV4dCBMZW5ndGgnLFxyXG4gIH07XHJcbiAgXHJcbiAgZnVuY3Rpb25zOiBGdW5jdGlvblN5c3RlbVtdO1xyXG4gIGVkaXRTZXR0aW5nc1RyZWUgPSB7IGFsbG93RWRpdGluZzogZmFsc2UsIGFsbG93QWRkaW5nOiBmYWxzZSwgYWxsb3dEZWxldGluZzogZmFsc2UsIG5ld1Jvd1Bvc2l0aW9uOiAnQ2hpbGQnLCBtb2RlOiAnUm93JyB9O1xyXG4gIGVkaXRTZXR0aW5ncyA9IHsgc2hvd0RlbGV0ZUNvbmZpcm1EaWFsb2c6IGZhbHNlLCBhbGxvd0VkaXRpbmc6IGZhbHNlLCBhbGxvd0FkZGluZzogZmFsc2UsIGFsbG93RGVsZXRpbmc6IGZhbHNlLCBtb2RlOiAnTm9ybWFsJyB9O1xyXG4gIHRvb2xiYXJPcHRpb25zID0gWydFeGNlbEV4cG9ydCcsICdBZGQnLCAnRWRpdCcsICdEZWxldGUnLCAnQ2FuY2VsJywgJ1NlYXJjaCddIGFzIGFueVtdO1xyXG4gIHRvb2xiYXJPcHRpb25zVHJlZSA9IFtcclxuICAnQWRkJyxcclxuICAnRGVsZXRlJyxcclxuICAnU2VhcmNoJyxcclxuICAnRXhwYW5kQWxsJyxcclxuICAnQ29sbGFwc2VBbGwnLFxyXG4gICdFeGNlbEV4cG9ydCdcclxuICBdO1xyXG4gIGNvbnRleHRNZW51SXRlbXMgPSBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdBZGQgQ2hpbGQnLFxyXG4gICAgICBpY29uQ3NzOiAnIGUtaWNvbnMgZS1hZGQnLFxyXG4gICAgICB0YXJnZXQ6ICcuZS1jb250ZW50JyxcclxuICAgICAgaWQ6ICdBZGQtU3ViLUl0ZW0nXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiAnRGVsZXRlJyxcclxuICAgICAgaWNvbkNzczogJyBlLWljb25zIGUtZGVsZXRlJyxcclxuICAgICAgdGFyZ2V0OiAnLmUtY29udGVudCcsXHJcbiAgICAgIGlkOiAnRGVsZXRlT0MnXHJcbiAgICB9XHJcbiAgXTtcclxuICBwcm90ZWN0ZWQgUGVybWlzc2lvbihyb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIGNvbnN0IGZ1bmN0aW9uQ29kZSA9IHJvdXRlLnNuYXBzaG90LmRhdGEuZnVuY3Rpb25Db2RlO1xyXG4gICAgdGhpcy5mdW5jdGlvbnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmdW5jdGlvbnMnKSkuZmlsdGVyKHggPT4geC5mdW5jdGlvbkNvZGUgPT09IGZ1bmN0aW9uQ29kZSkgfHwgW107XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5mdW5jdGlvbnMpIHtcclxuICAgICAgICBjb25zdCB0b29sYmFyT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIGl0ZW0uY2hpbGRyZW5zKSB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb25JdGVtID0gdGhpcy5tYWtlQWN0aW9uKGFjdGlvbi5jb2RlKTtcclxuICAgICAgICAgIHRvb2xiYXJPcHRpb25zLnB1c2goLi4ub3B0aW9uSXRlbS5maWx0ZXIoQm9vbGVhbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0b29sYmFyT3B0aW9ucy5wdXNoKCdTZWFyY2gnKTtcclxuICAgICAgICBjb25zdCB1bmlxdWVPcHRpb25JdGVtID0gdG9vbGJhck9wdGlvbnMuZmlsdGVyKChlbGVtLCBpbmRleCwgc2VsZikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50b29sYmFyT3B0aW9ucyA9IHVuaXF1ZU9wdGlvbkl0ZW07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBQZXJtaXNzaW9uRm9yVHJlZUdyaWQocm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICB0aGlzLmNvbnRleHRNZW51SXRlbXMgPSBbXTtcclxuICAgIHRoaXMuZnVuY3Rpb25zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnVuY3Rpb25zJykpO1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuZnVuY3Rpb25zKSB7XHJcbiAgICAgIGlmIChyb3V0ZS5zbmFwc2hvdC5kYXRhLmZ1bmN0aW9uQ29kZS5pbmNsdWRlcyhpdGVtLmZ1bmN0aW9uQ29kZSkpIHtcclxuICAgICAgICBjb25zdCB0b29sYmFyT3B0aW9uc1RyZWUgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGFjdGlvbiBvZiBpdGVtLmNoaWxkcmVucykge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uSXRlbSA9IHRoaXMubWFrZUFjdGlvblRyZWVHcmlkKGFjdGlvbi5jb2RlKTtcclxuICAgICAgICAgIHRvb2xiYXJPcHRpb25zVHJlZS5wdXNoKC4uLm9wdGlvbkl0ZW0uZmlsdGVyKEJvb2xlYW4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9vbGJhck9wdGlvbnNUcmVlLnB1c2goLi4uWydTZWFyY2gnLFxyXG4gICAgICAgICAgJ0V4cGFuZEFsbCcsXHJcbiAgICAgICAgICAnQ29sbGFwc2VBbGwnLFxyXG4gICAgICAgICAgJ0V4Y2VsRXhwb3J0J10pO1xyXG4gICAgICAgIGNvbnN0IHVuaXF1ZU9wdGlvbkl0ZW0gPSB0b29sYmFyT3B0aW9uc1RyZWUuZmlsdGVyKChlbGVtLCBpbmRleCwgc2VsZikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50b29sYmFyT3B0aW9uc1RyZWUgPSB1bmlxdWVPcHRpb25JdGVtO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIMSQ4buVaSBhY3Rpb24gY29kZSB0aGFuaCBhY3Rpb24gY+G7p2EgZWoyLWdyaWRcclxuICBwcm90ZWN0ZWQgbWFrZUFjdGlvbihpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgc3dpdGNoIChpbnB1dCkge1xyXG4gICAgICBjYXNlIEFjdGlvbkNvbnN0YW50LkNSRUFURTpcclxuICAgICAgICB0aGlzLmVkaXRTZXR0aW5ncy5hbGxvd0FkZGluZyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIFsnQWRkJ107XHJcbiAgICAgIGNhc2UgQWN0aW9uQ29uc3RhbnQuRURJVDpcclxuICAgICAgICB0aGlzLmVkaXRTZXR0aW5ncy5hbGxvd0VkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIGNhc2UgQWN0aW9uQ29uc3RhbnQuREVMRVRFOlxyXG4gICAgICAgIHRoaXMuZWRpdFNldHRpbmdzLmFsbG93RGVsZXRpbmcgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIGNhc2UgQWN0aW9uQ29uc3RhbnQuRVhDRUxfRVhQT1JUOlxyXG4gICAgICAgIHJldHVybiBbJ0V4Y2VsRXhwb3J0J107XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG1ha2VBY3Rpb25UcmVlR3JpZChpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgc3dpdGNoIChpbnB1dCkge1xyXG4gICAgICBjYXNlIEFjdGlvbkNvbnN0YW50LkVYQ0VMX0VYUE9SVDpcclxuICAgICAgICByZXR1cm4gWydFeGNlbEV4cG9ydCddO1xyXG4gICAgICBjYXNlIEFjdGlvbkNvbnN0YW50LkNSRUFURTpcclxuICAgICAgICB0aGlzLmVkaXRTZXR0aW5nc1RyZWUuYWxsb3dBZGRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVJdGVtcy5wdXNoKHtcclxuICAgICAgICAgIHRleHQ6ICdBZGQgQ2hpbGQnLFxyXG4gICAgICAgICAgaWNvbkNzczogJyBlLWljb25zIGUtYWRkJyxcclxuICAgICAgICAgIHRhcmdldDogJy5lLWNvbnRlbnQnLFxyXG4gICAgICAgICAgaWQ6ICdBZGQtU3ViLUl0ZW0nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFsnQWRkJ107XHJcbiAgICAgIGNhc2UgQWN0aW9uQ29uc3RhbnQuRURJVDpcclxuICAgICAgICB0aGlzLmVkaXRTZXR0aW5nc1RyZWUuYWxsb3dFZGl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWRdO1xyXG4gICAgICBjYXNlIEFjdGlvbkNvbnN0YW50LkRFTEVURTpcclxuICAgICAgICB0aGlzLmVkaXRTZXR0aW5nc1RyZWUuYWxsb3dEZWxldGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVJdGVtcy5wdXNoKHtcclxuICAgICAgICAgIHRleHQ6ICdEZWxldGUnLFxyXG4gICAgICAgICAgaWNvbkNzczogJyBlLWljb25zIGUtZGVsZXRlJyxcclxuICAgICAgICAgIHRhcmdldDogJy5lLWNvbnRlbnQnLFxyXG4gICAgICAgICAgaWQ6ICdEZWxldGVPQydcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gW3VuZGVmaW5lZF07XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIFt1bmRlZmluZWRdO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwdWJsaWMgdXJsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYmFzZVVybCA9IHVybDtcclxuICAgIHRoaXMuZ2V0QWxlcnRUcmFuc2xhdG9yKCk7XHJcbiAgfVxyXG4gIGdldEFsZXJ0VHJhbnNsYXRvcigpIHtcclxuICAgIHRoaXMudHJhbnNsYXRlLmdldCh0aGlzLmFsZXJ0LnVwZGF0ZU1lc3NhZ2UpLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMuYWxlcnQudXBkYXRlTWVzc2FnZSA9IHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQodGhpcy5hbGVydC51cGRhdGVUaXRsZSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy5hbGVydC51cGRhdGVUaXRsZSA9IHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQodGhpcy5hbGVydC5jcmVhdGVNZXNzYWdlKS5zdWJzY3JpYmUoKHJlczogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICB0aGlzLmFsZXJ0LmNyZWF0ZU1lc3NhZ2UgPSByZXM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy50cmFuc2xhdGUuZ2V0KHRoaXMuYWxlcnQuY3JlYXRlVGl0bGUpLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMuYWxlcnQuY3JlYXRlVGl0bGUgPSByZXM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy50cmFuc2xhdGUuZ2V0KHRoaXMuYWxlcnQuZGVsZXRlTWVzc2FnZSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy5hbGVydC5kZWxldGVNZXNzYWdlID0gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMudHJhbnNsYXRlLmdldCh0aGlzLmFsZXJ0LmRlbGV0ZVRpdGxlKS5zdWJzY3JpYmUoKHJlczogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICB0aGlzLmFsZXJ0LmRlbGV0ZVRpdGxlID0gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQodGhpcy5hbGVydC5zZXJ2ZXJFcnJvcikuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy5hbGVydC5zZXJ2ZXJFcnJvciA9IHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQodGhpcy5hbGVydC5jYW5jZWxNZXNzYWdlKS5zdWJzY3JpYmUoKHJlczogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICB0aGlzLmFsZXJ0LmNhbmNlbE1lc3NhZ2UgPSByZXM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy50cmFuc2xhdGUuZ2V0KHRoaXMuYWxlcnQuY2hvb3NlX2Zhcm1fbWVzc2FnZSkuc3Vic2NyaWJlKChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy5hbGVydC5jaG9vc2VfZmFybV9tZXNzYWdlID0gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnRyYW5zbGF0ZS5nZXQodGhpcy52YWxpZGF0aW9uR3JpZC5yZXF1aXJlRmllbGQpLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkdyaWQucmVxdWlyZUZpZWxkID0gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMudHJhbnNsYXRlLmdldCh0aGlzLnZhbGlkYXRpb25HcmlkLnRleHRMZW5ndGgpLnN1YnNjcmliZSgocmVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkdyaWQudGV4dExlbmd0aCA9IHJlcztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==