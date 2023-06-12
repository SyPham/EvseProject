import { HttpClient } from '@angular/common/http';
export declare class UtilitiesService {
    private http;
    constructor(http: HttpClient);
    UnflatteringForLeftMenu: (arr: any[]) => any[];
    UnflatteringForTree: (arr: any[]) => any[];
    MakeSeoTitle(input: string): string;
    ToFormData(formValue: any): FormData;
    checkExistHost(url: any): boolean;
    checkValidImage(data: any): boolean;
}
