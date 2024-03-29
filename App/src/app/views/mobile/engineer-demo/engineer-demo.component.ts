
import { DomSanitizer } from '@angular/platform-browser';
import {
  DataManager,
  Query,
  UrlAdaptor,
  Predicate,
} from "@syncfusion/ej2-data";
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engineer-demo',
  templateUrl: './engineer-demo.component.html',
  styleUrls: ['./engineer-demo.component.scss']
})
export class EngineerDemoComponent implements OnInit {
link: any;
baseUrl = environment.apiUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadConfig();
  }
  loadConfig() {
    let query = new Query();
    const accessToken = localStorage.getItem("token");
    let predicate: Predicate = new Predicate("type", "equal", "Engineer_Youtube");

    query.where(predicate).sortBy("sort");

    new DataManager({
      url: `${this.baseUrl}SystemConfig/GetDataDropdownlist`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    })
      .executeQuery(query)
      .then((x: any) => {
        this.link = x.result.length > 0 ? this.URL(x.result[0].link) : null;
      });
  }
  URL(url) {
    if (url) {
      if (url.includes("?")=== false) {
        url = url + '?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1'
      }
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
