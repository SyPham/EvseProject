import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export class VersionCheckService {
    constructor(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        // this will be replaced by actual hash post-build.js
        this.currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
        //console.log(this.currentHash)
    }
    /**
    * Checks in every set frequency the version of frontend application
    * @param url
    * @param {number} frequency - in milliseconds, defaults to 30 minutes
    */
    initVersionCheck(url, frequency = 1000 * 60 * 30) {
        setInterval(() => {
            this.checkVersion(url);
        }, frequency);
        this.checkVersion(url);
    }
    /**
    * Will do the call and check if the hash has changed or not
    * @param url
    */
    checkVersion(url) {
        // timestamp these requests to invalidate caches
        this.http.get(url + '?t=' + new Date().getTime())
            .subscribe((response) => {
            // console.log('current Hash',this.currentHash);
            const hash = response.hash;
            //  console.log('new Hash',hash);
            const hashChanged = this.hasHashChanged(this.currentHash, hash);
            // If new version, do something
            // console.log('If new version, do something',hashChanged);
            if (hashChanged) {
                // console.log(`There is a new update version ${response.version}` + ' current Hash',this.currentHash);
                localStorage.setItem('version', response.version);
                this.currentHash = hash;
                // this.cookieService.deleteAll('/');
                window.location.reload();
                // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
                // for an example: location.reload();
            }
            this.currentHash = hash;
            // store the new hash so we wouldn't trigger versionChange again
            // only necessary in case you did not force refresh
        }, (err) => {
            console.error(err, 'Could not get version');
        });
    }
    /**
    * Checks if hash has changed.
    * This file has the JS hash, if it is a different one than in the version.json
    * we are dealing with version change
    * @param currentHash
    * @param newHash
    * @returns {boolean}
    */
    hasHashChanged(currentHash, newHash) {
        if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
            return false;
        }
        return currentHash !== newHash;
    }
}
VersionCheckService.decorators = [
    { type: Injectable }
];
VersionCheckService.ctorParameters = () => [
    { type: HttpClient },
    { type: CookieService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi1jaGVjay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGlnZmFybS1jb3JlL3NyYy9zZXJ2aWNlcy92ZXJzaW9uLWNoZWNrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsWUFDVSxJQUFnQixFQUNoQixhQUE0QjtRQUQ1QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBSnRDLHFEQUFxRDtRQUM3QyxnQkFBVyxHQUFHLGlDQUFpQyxDQUFDO1FBS3BELCtCQUErQjtJQUNoQyxDQUFDO0lBQ0o7Ozs7TUFJRTtJQUNLLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQ3JELFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7TUFHRTtJQUNNLFlBQVksQ0FBQyxHQUFHO1FBQ3RCLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDOUMsU0FBUyxDQUNSLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDakIsZ0RBQWdEO1lBQy9DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0IsaUNBQWlDO1lBQy9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRSwrQkFBK0I7WUFDaEMsMkRBQTJEO1lBRTFELElBQUksV0FBVyxFQUFFO2dCQUNoQix1R0FBdUc7Z0JBQ3RHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUUsQ0FBQTtnQkFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLHFDQUFxQztnQkFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDekIsc0RBQXNEO2dCQUN0RCxxQ0FBcUM7YUFDdEM7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixnRUFBZ0U7WUFDaEUsbURBQW1EO1FBQ3JELENBQUMsRUFDRCxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFDRDs7Ozs7OztNQU9FO0lBQ00sY0FBYyxDQUFDLFdBQVcsRUFBRSxPQUFPO1FBQ3pDLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxLQUFLLGlDQUFpQyxFQUFFO1lBQ3JFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLFdBQVcsS0FBSyxPQUFPLENBQUM7SUFDakMsQ0FBQzs7O1lBcEVGLFVBQVU7OztZQURGLFVBQVU7WUFGVixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmVyc2lvbkNoZWNrU2VydmljZSB7XHJcbiAgLy8gdGhpcyB3aWxsIGJlIHJlcGxhY2VkIGJ5IGFjdHVhbCBoYXNoIHBvc3QtYnVpbGQuanNcclxuICBwcml2YXRlIGN1cnJlbnRIYXNoID0gJ3t7UE9TVF9CVUlMRF9FTlRFUlNfSEFTSF9IRVJFfX0nO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5jdXJyZW50SGFzaClcclxuICAgICB9XHJcbiAgLyoqXHJcbiAgKiBDaGVja3MgaW4gZXZlcnkgc2V0IGZyZXF1ZW5jeSB0aGUgdmVyc2lvbiBvZiBmcm9udGVuZCBhcHBsaWNhdGlvblxyXG4gICogQHBhcmFtIHVybFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IGZyZXF1ZW5jeSAtIGluIG1pbGxpc2Vjb25kcywgZGVmYXVsdHMgdG8gMzAgbWludXRlc1xyXG4gICovXHJcbiAgcHVibGljIGluaXRWZXJzaW9uQ2hlY2sodXJsLCBmcmVxdWVuY3kgPSAxMDAwICogNjAgKiAzMCkge1xyXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNoZWNrVmVyc2lvbih1cmwpO1xyXG4gICAgfSwgZnJlcXVlbmN5KTtcclxuICAgIHRoaXMuY2hlY2tWZXJzaW9uKHVybCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogV2lsbCBkbyB0aGUgY2FsbCBhbmQgY2hlY2sgaWYgdGhlIGhhc2ggaGFzIGNoYW5nZWQgb3Igbm90XHJcbiAgKiBAcGFyYW0gdXJsXHJcbiAgKi9cclxuICBwcml2YXRlIGNoZWNrVmVyc2lvbih1cmwpIHtcclxuICAgIC8vIHRpbWVzdGFtcCB0aGVzZSByZXF1ZXN0cyB0byBpbnZhbGlkYXRlIGNhY2hlc1xyXG4gICAgdGhpcy5odHRwLmdldCh1cmwgKyAnP3Q9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjdXJyZW50IEhhc2gnLHRoaXMuY3VycmVudEhhc2gpO1xyXG4gICAgICAgICAgY29uc3QgaGFzaCA9IHJlc3BvbnNlLmhhc2g7XHJcbiAgICAgICAgLy8gIGNvbnNvbGUubG9nKCduZXcgSGFzaCcsaGFzaCk7XHJcbiAgICAgICAgICBjb25zdCBoYXNoQ2hhbmdlZCA9IHRoaXMuaGFzSGFzaENoYW5nZWQodGhpcy5jdXJyZW50SGFzaCwgaGFzaCk7XHJcbiAgICAgICAgICAvLyBJZiBuZXcgdmVyc2lvbiwgZG8gc29tZXRoaW5nXHJcbiAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdJZiBuZXcgdmVyc2lvbiwgZG8gc29tZXRoaW5nJyxoYXNoQ2hhbmdlZCk7XHJcblxyXG4gICAgICAgICAgaWYgKGhhc2hDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFRoZXJlIGlzIGEgbmV3IHVwZGF0ZSB2ZXJzaW9uICR7cmVzcG9uc2UudmVyc2lvbn1gICsgJyBjdXJyZW50IEhhc2gnLHRoaXMuY3VycmVudEhhc2gpO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmVyc2lvbicsIHJlc3BvbnNlLnZlcnNpb24gKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIYXNoID0gaGFzaDtcclxuICAgICAgICAgICAgLy8gdGhpcy5jb29raWVTZXJ2aWNlLmRlbGV0ZUFsbCgnLycpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIC8vIEVOVEVSIFlPVVIgQ09ERSBUTyBETyBTT01FVEhJTkcgVVBPTiBWRVJTSU9OIENIQU5HRVxyXG4gICAgICAgICAgICAvLyBmb3IgYW4gZXhhbXBsZTogbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIYXNoID0gaGFzaDtcclxuICAgICAgICAgIC8vIHN0b3JlIHRoZSBuZXcgaGFzaCBzbyB3ZSB3b3VsZG4ndCB0cmlnZ2VyIHZlcnNpb25DaGFuZ2UgYWdhaW5cclxuICAgICAgICAgIC8vIG9ubHkgbmVjZXNzYXJ5IGluIGNhc2UgeW91IGRpZCBub3QgZm9yY2UgcmVmcmVzaFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIsICdDb3VsZCBub3QgZ2V0IHZlcnNpb24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQ2hlY2tzIGlmIGhhc2ggaGFzIGNoYW5nZWQuXHJcbiAgKiBUaGlzIGZpbGUgaGFzIHRoZSBKUyBoYXNoLCBpZiBpdCBpcyBhIGRpZmZlcmVudCBvbmUgdGhhbiBpbiB0aGUgdmVyc2lvbi5qc29uXHJcbiAgKiB3ZSBhcmUgZGVhbGluZyB3aXRoIHZlcnNpb24gY2hhbmdlXHJcbiAgKiBAcGFyYW0gY3VycmVudEhhc2hcclxuICAqIEBwYXJhbSBuZXdIYXNoXHJcbiAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAqL1xyXG4gIHByaXZhdGUgaGFzSGFzaENoYW5nZWQoY3VycmVudEhhc2gsIG5ld0hhc2gpIHtcclxuICAgIGlmICghY3VycmVudEhhc2ggfHwgY3VycmVudEhhc2ggPT09ICd7e1BPU1RfQlVJTERfRU5URVJTX0hBU0hfSEVSRX19Jykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEhhc2ggIT09IG5ld0hhc2g7XHJcbiAgfVxyXG59XHJcbiJdfQ==