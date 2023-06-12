import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
export declare class VersionCheckService {
    private http;
    private cookieService;
    private currentHash;
    constructor(http: HttpClient, cookieService: CookieService);
    /**
    * Checks in every set frequency the version of frontend application
    * @param url
    * @param {number} frequency - in milliseconds, defaults to 30 minutes
    */
    initVersionCheck(url: any, frequency?: number): void;
    /**
    * Will do the call and check if the hash has changed or not
    * @param url
    */
    private checkVersion;
    /**
    * Checks if hash has changed.
    * This file has the JS hash, if it is a different one than in the version.json
    * we are dealing with version change
    * @param currentHash
    * @param newHash
    * @returns {boolean}
    */
    private hasHashChanged;
}
