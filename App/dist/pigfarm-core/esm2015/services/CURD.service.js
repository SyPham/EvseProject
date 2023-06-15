import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { UtilitiesService } from "../services";
import { BaseService } from "./base.service";
export class CURDService extends BaseService {
    //#endregion
    //#region Ctor
    constructor(env, http, entity, utilitiesService) {
        super();
        this.env = env;
        this.http = http;
        this.entity = entity;
        this.utilitiesService = utilitiesService;
        this.audits = ["updateDate", "createDate", "deleteDate", "lastLoginDate"];
        this.base = this.env;
        //#region Field
        this._sharedHeaders = new HttpHeaders();
        this._sharedHeaders = this._sharedHeaders.set("Content-Type", "application/json");
    }
    //#endregion
    //#region LoadData
    getAll() {
        return this.http
            .get(`${this.base}${this.entity}/getall`, {})
            .pipe(catchError(this.handleError));
    }
    getById(id) {
        return this.http
            .get(`${this.base}${this.entity}/getById?id=${id}`, {})
            .pipe(catchError(this.handleError));
    }
    //#endregion
    //#region Action
    insertWithFormData(model) {
        const params = this.utilitiesService.ToFormData(model);
        return this.http
            .post(`${this.base}${this.entity}/insert`, params)
            .pipe(catchError(this.handleError));
    }
    updateWithFormData(model) {
        const params = this.utilitiesService.ToFormData(model);
        return this.http
            .put(`${this.base}${this.entity}/update`, params)
            .pipe(catchError(this.handleError));
    }
    add(model) {
        for (const audit of this.audits) {
            let value2 = model[audit];
            if (value2 instanceof Date) {
                model[audit] = `${value2.toLocaleDateString()} ${value2.toLocaleTimeString("en-GB")}`;
            }
        }
        return this.http.post(`${this.base}${this.entity}/add`, model);
    }
    addRange(model) {
        for (const audit of this.audits) {
            for (const ml of model) {
                let value2 = model[audit];
                if (value2 instanceof Date) {
                    model[audit] = `${value2.toLocaleDateString()} ${value2.toLocaleTimeString("en-GB")}`;
                }
            }
        }
        return this.http
            .post(`${this.base}${this.entity}/addRange`, model)
            .pipe(catchError(this.handleError));
    }
    updateRange(model) {
        for (const audit of this.audits) {
            for (const ml of model) {
                let value2 = model[audit];
                if (value2 instanceof Date) {
                    model[audit] = `${value2.toLocaleDateString()} ${value2.toLocaleTimeString("en-GB")}`;
                }
            }
        }
        return this.http
            .put(`${this.base}${this.entity}/updateRange`, model)
            .pipe(catchError(this.handleError));
    }
    update(model) {
        for (const audit of this.audits) {
            let value2 = model[audit];
            if (value2 instanceof Date) {
                model[audit] = `${value2.toLocaleDateString()} ${value2.toLocaleTimeString("en-GB")}`;
            }
        }
        return this.http.put(`${this.base}${this.entity}/update`, model);
    }
    updatestatus(id) {
        return this.http
            .put(`${this.base}${this.entity}/updatestatus?id=${id}`, {})
            .pipe(catchError(this.handleError));
    }
    delete(id) {
        return this.http.delete(`${this.base}${this.entity}/delete?id=${id}`);
    }
    deleterange(ids) {
        let query = "";
        for (const id of ids) {
            query += `id=${id}&`;
        }
        return this.http
            .delete(`${this.base}${this.entity}/deleterange?${query}`)
            .pipe(catchError(this.handleError));
    }
    //#endregion
    getAudit(id) {
        return this.http.get(`${this.base}${this.entity}/GetAudit?id=${id}`, {});
    }
    downloadODSFile(model) {
        const params = this.utilitiesService.ToFormData(model);
        return this.http.post(`${this.base}Files/ExcelExportToDOS`, params, {
            responseType: "blob",
            observe: "response",
        });
    }
    downloadExcelFile(recordGuid) {
        return this.http.get(`${this.base}Files/DownloadTemplateFile?recordGuid=${recordGuid}`, {
            responseType: "blob",
            observe: "response",
        });
    }
    excelExportRecordSale(p) {
        return this.http.post(`${this.base}Files/ExcelExportRecordSale`, p, {
            responseType: "blob",
            observe: "response",
        });
    }
    downloadBlob(data, fileName, mimeType) {
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
    }
}
CURDService.decorators = [
    { type: Injectable }
];
CURDService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ["Env",] }] },
    { type: HttpClient },
    { type: String, decorators: [{ type: Inject, args: [String,] }] },
    { type: UtilitiesService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1VSRC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9zZXJ2aWNlcy9DVVJELnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQXNCN0MsTUFBTSxPQUFPLFdBQWUsU0FBUSxXQUFXO0lBTzdDLFlBQVk7SUFDWixjQUFjO0lBQ2QsWUFDMkIsR0FBRyxFQUNsQixJQUFnQixFQUNBLE1BQWMsRUFDOUIsZ0JBQWtDO1FBRTVDLEtBQUssRUFBRSxDQUFDO1FBTGlCLFFBQUcsR0FBSCxHQUFHLENBQUE7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNBLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDOUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVo5QyxXQUFNLEdBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUzRCxTQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUUxQixlQUFlO1FBQ0wsbUJBQWMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBVTNDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQzNDLGNBQWMsRUFDZCxrQkFBa0IsQ0FDbkIsQ0FBQztJQUNKLENBQUM7SUFDRCxZQUFZO0lBRVosa0JBQWtCO0lBQ2xCLE1BQU07UUFD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QztZQUNULE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBaExGLFVBQVU7Ozs0Q0FXTixNQUFNLFNBQUMsS0FBSztZQXZDUixVQUFVO3lDQXlDZCxNQUFNLFNBQUMsTUFBTTtZQXBDVCxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlQ29uc3RhbnRzIH0gZnJvbSBcIi4uL19jb3JlL19jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgVXRpbGl0aWVzU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xyXG5cclxuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9iYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSBcIi4uL19jb3JlL21vZGVscy9hcHBsaWNhdGlvbi11c2VyXCI7XHJcbi8vI3JlZ2lvblxyXG4vLyBDb3B5cmlnaHQgSGVucnkgUGhhbVxyXG4vLyNlbmRyZWdpb25cclxuZXhwb3J0IGludGVyZmFjZSBJQ1VSRFNlcnZpY2U8VD4ge1xyXG4gIGdldEFsbCgpOiBPYnNlcnZhYmxlPFRbXT47XHJcbiAgZ2V0QnlJZChpZCk6IE9ic2VydmFibGU8VD47XHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBBY3Rpb25cclxuICBpbnNlcnRXaXRoRm9ybURhdGEobW9kZWw6IFQpOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD47XHJcbiAgdXBkYXRlV2l0aEZvcm1EYXRhKG1vZGVsOiBUKTogT2JzZXJ2YWJsZTxPcGVyYXRpb25SZXN1bHQ+O1xyXG5cclxuICBhZGQobW9kZWw6IFQpOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD47XHJcbiAgdXBkYXRlKG1vZGVsOiBUKTogT2JzZXJ2YWJsZTxPcGVyYXRpb25SZXN1bHQ+O1xyXG4gIGRlbGV0ZShpZDogYW55KTogT2JzZXJ2YWJsZTxPcGVyYXRpb25SZXN1bHQ+O1xyXG4gIGRlbGV0ZXJhbmdlKGlkczogb2JqZWN0W10pOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD47XHJcbiAgY2hhbmdlVmFsdWUobWVzc2FnZTogTWVzc2FnZUNvbnN0YW50cyk7XHJcbiAgZ2V0QXVkaXQoaWQpOiBPYnNlcnZhYmxlPGFueT47XHJcbn1cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ1VSRFNlcnZpY2U8VD4gZXh0ZW5kcyBCYXNlU2VydmljZSBpbXBsZW1lbnRzIElDVVJEU2VydmljZTxUPiB7XHJcbiAgYXVkaXRzID0gW1widXBkYXRlRGF0ZVwiLCBcImNyZWF0ZURhdGVcIiwgXCJkZWxldGVEYXRlXCIsIFwibGFzdExvZ2luRGF0ZVwiXTtcclxuXHJcbiAgcHJvdGVjdGVkIGJhc2UgPSB0aGlzLmVudjtcclxuXHJcbiAgLy8jcmVnaW9uIEZpZWxkXHJcbiAgcHJvdGVjdGVkIF9zaGFyZWRIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgLy8jZW5kcmVnaW9uXHJcbiAgLy8jcmVnaW9uIEN0b3JcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoXCJFbnZcIikgcHJvdGVjdGVkIGVudixcclxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdChTdHJpbmcpIHByb3RlY3RlZCBlbnRpdHk6IHN0cmluZyxcclxuICAgIHByb3RlY3RlZCB1dGlsaXRpZXNTZXJ2aWNlOiBVdGlsaXRpZXNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fc2hhcmVkSGVhZGVycyA9IHRoaXMuX3NoYXJlZEhlYWRlcnMuc2V0KFxyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiLFxyXG4gICAgICBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgKTtcclxuICB9XHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIC8vI3JlZ2lvbiBMb2FkRGF0YVxyXG4gIGdldEFsbCgpOiBPYnNlcnZhYmxlPFRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PFRbXT4oYCR7dGhpcy5iYXNlfSR7dGhpcy5lbnRpdHl9L2dldGFsbGAsIHt9KVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcclxuICB9XHJcbiAgZ2V0QnlJZChpZCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PFQ+KGAke3RoaXMuYmFzZX0ke3RoaXMuZW50aXR5fS9nZXRCeUlkP2lkPSR7aWR9YCwge30pXHJcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpO1xyXG4gIH1cclxuICAvLyNlbmRyZWdpb25cclxuXHJcbiAgLy8jcmVnaW9uIEFjdGlvblxyXG4gIGluc2VydFdpdGhGb3JtRGF0YShtb2RlbDogVCk6IE9ic2VydmFibGU8T3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnV0aWxpdGllc1NlcnZpY2UuVG9Gb3JtRGF0YShtb2RlbCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0PE9wZXJhdGlvblJlc3VsdD4oYCR7dGhpcy5iYXNlfSR7dGhpcy5lbnRpdHl9L2luc2VydGAsIHBhcmFtcylcclxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSk7XHJcbiAgfVxyXG4gIHVwZGF0ZVdpdGhGb3JtRGF0YShtb2RlbDogVCk6IE9ic2VydmFibGU8T3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnV0aWxpdGllc1NlcnZpY2UuVG9Gb3JtRGF0YShtb2RlbCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wdXQ8T3BlcmF0aW9uUmVzdWx0PihgJHt0aGlzLmJhc2V9JHt0aGlzLmVudGl0eX0vdXBkYXRlYCwgcGFyYW1zKVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGFkZChtb2RlbDogVCk6IE9ic2VydmFibGU8T3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICBmb3IgKGNvbnN0IGF1ZGl0IG9mIHRoaXMuYXVkaXRzKSB7XHJcbiAgICAgIGxldCB2YWx1ZTIgPSBtb2RlbFthdWRpdF07XHJcbiAgICAgIGlmICh2YWx1ZTIgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgbW9kZWxbYXVkaXRdID0gYCR7KHZhbHVlMiBhcyBEYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoKX0gJHsoXHJcbiAgICAgICAgICB2YWx1ZTIgYXMgRGF0ZVxyXG4gICAgICAgICkudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tR0JcIil9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PE9wZXJhdGlvblJlc3VsdD4oXHJcbiAgICAgIGAke3RoaXMuYmFzZX0ke3RoaXMuZW50aXR5fS9hZGRgLFxyXG4gICAgICBtb2RlbFxyXG4gICAgKTtcclxuICB9XHJcbiAgYWRkUmFuZ2UobW9kZWw6IFRbXSk6IE9ic2VydmFibGU8T3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICBmb3IgKGNvbnN0IGF1ZGl0IG9mIHRoaXMuYXVkaXRzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgbWwgb2YgbW9kZWwpIHtcclxuICAgICAgICBsZXQgdmFsdWUyID0gbW9kZWxbYXVkaXRdO1xyXG4gICAgICAgIGlmICh2YWx1ZTIgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICBtb2RlbFthdWRpdF0gPSBgJHsodmFsdWUyIGFzIERhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZygpfSAkeyhcclxuICAgICAgICAgICAgdmFsdWUyIGFzIERhdGVcclxuICAgICAgICAgICkudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tR0JcIil9YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3Q8T3BlcmF0aW9uUmVzdWx0PihgJHt0aGlzLmJhc2V9JHt0aGlzLmVudGl0eX0vYWRkUmFuZ2VgLCBtb2RlbClcclxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSk7XHJcbiAgfVxyXG4gIHVwZGF0ZVJhbmdlKG1vZGVsOiBUW10pOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgZm9yIChjb25zdCBhdWRpdCBvZiB0aGlzLmF1ZGl0cykge1xyXG4gICAgICBmb3IgKGNvbnN0IG1sIG9mIG1vZGVsKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlMiA9IG1vZGVsW2F1ZGl0XTtcclxuICAgICAgICBpZiAodmFsdWUyIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgICAgbW9kZWxbYXVkaXRdID0gYCR7KHZhbHVlMiBhcyBEYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoKX0gJHsoXHJcbiAgICAgICAgICAgIHZhbHVlMiBhcyBEYXRlXHJcbiAgICAgICAgICApLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLUdCXCIpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wdXQ8T3BlcmF0aW9uUmVzdWx0PihgJHt0aGlzLmJhc2V9JHt0aGlzLmVudGl0eX0vdXBkYXRlUmFuZ2VgLCBtb2RlbClcclxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSk7XHJcbiAgfVxyXG4gIHVwZGF0ZShtb2RlbDogVCk6IE9ic2VydmFibGU8T3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICBmb3IgKGNvbnN0IGF1ZGl0IG9mIHRoaXMuYXVkaXRzKSB7XHJcbiAgICAgIGxldCB2YWx1ZTIgPSBtb2RlbFthdWRpdF07XHJcbiAgICAgIGlmICh2YWx1ZTIgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgbW9kZWxbYXVkaXRdID0gYCR7KHZhbHVlMiBhcyBEYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoKX0gJHsoXHJcbiAgICAgICAgICB2YWx1ZTIgYXMgRGF0ZVxyXG4gICAgICAgICkudG9Mb2NhbGVUaW1lU3RyaW5nKFwiZW4tR0JcIil9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8T3BlcmF0aW9uUmVzdWx0PihcclxuICAgICAgYCR7dGhpcy5iYXNlfSR7dGhpcy5lbnRpdHl9L3VwZGF0ZWAsXHJcbiAgICAgIG1vZGVsXHJcbiAgICApO1xyXG4gIH1cclxuICB1cGRhdGVzdGF0dXMoaWQ6IFQpOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucHV0PE9wZXJhdGlvblJlc3VsdD4oXHJcbiAgICAgICAgYCR7dGhpcy5iYXNlfSR7dGhpcy5lbnRpdHl9L3VwZGF0ZXN0YXR1cz9pZD0ke2lkfWAsXHJcbiAgICAgICAge31cclxuICAgICAgKVxyXG4gICAgICAucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcclxuICB9XHJcbiAgZGVsZXRlKGlkOiBhbnkpOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8T3BlcmF0aW9uUmVzdWx0PihcclxuICAgICAgYCR7dGhpcy5iYXNlfSR7dGhpcy5lbnRpdHl9L2RlbGV0ZT9pZD0ke2lkfWBcclxuICAgICk7XHJcbiAgfVxyXG4gIGRlbGV0ZXJhbmdlKGlkczogb2JqZWN0W10pOiBPYnNlcnZhYmxlPE9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgbGV0IHF1ZXJ5ID0gXCJcIjtcclxuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XHJcbiAgICAgIHF1ZXJ5ICs9IGBpZD0ke2lkfSZgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZGVsZXRlPE9wZXJhdGlvblJlc3VsdD4oXHJcbiAgICAgICAgYCR7dGhpcy5iYXNlfSR7dGhpcy5lbnRpdHl9L2RlbGV0ZXJhbmdlPyR7cXVlcnl9YFxyXG4gICAgICApXHJcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgLy8jZW5kcmVnaW9uXHJcblxyXG4gIGdldEF1ZGl0KGlkKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxUPihgJHt0aGlzLmJhc2V9JHt0aGlzLmVudGl0eX0vR2V0QXVkaXQ/aWQ9JHtpZH1gLCB7fSk7XHJcbiAgfVxyXG5cclxuICBkb3dubG9hZE9EU0ZpbGUobW9kZWwpIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMudXRpbGl0aWVzU2VydmljZS5Ub0Zvcm1EYXRhKG1vZGVsKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmJhc2V9RmlsZXMvRXhjZWxFeHBvcnRUb0RPU2AsIHBhcmFtcywge1xyXG4gICAgICByZXNwb25zZVR5cGU6IFwiYmxvYlwiLFxyXG4gICAgICBvYnNlcnZlOiBcInJlc3BvbnNlXCIsXHJcbiAgICB9KTtcclxuICB9XHJcbiAgZG93bmxvYWRFeGNlbEZpbGUocmVjb3JkR3VpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5iYXNlfUZpbGVzL0Rvd25sb2FkVGVtcGxhdGVGaWxlP3JlY29yZEd1aWQ9JHtyZWNvcmRHdWlkfWAsIHtcclxuICAgICAgcmVzcG9uc2VUeXBlOiBcImJsb2JcIixcclxuICAgICAgb2JzZXJ2ZTogXCJyZXNwb25zZVwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGV4Y2VsRXhwb3J0UmVjb3JkU2FsZShwOiB7cGlnczogYW55W119KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5iYXNlfUZpbGVzL0V4Y2VsRXhwb3J0UmVjb3JkU2FsZWAsIHAsIHtcclxuICAgICAgcmVzcG9uc2VUeXBlOiBcImJsb2JcIixcclxuICAgICAgb2JzZXJ2ZTogXCJyZXNwb25zZVwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGRvd25sb2FkQmxvYihkYXRhLCBmaWxlTmFtZSwgbWltZVR5cGUpIHtcclxuICAgIHZhciBibG9iLCB1cmw7XHJcbiAgICBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7XHJcbiAgICAgIHR5cGU6IG1pbWVUeXBlLFxyXG4gICAgfSk7XHJcbiAgICB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgIHZhciBhO1xyXG4gICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgYS5ocmVmID0gdXJsO1xyXG4gICAgYS5kb3dubG9hZCA9IGZpbGVOYW1lO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcclxuICAgIGEuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmVcIjtcclxuICAgIGEuY2xpY2soKTtcclxuICAgIGEucmVtb3ZlKCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9XHJcbn1cclxuIl19