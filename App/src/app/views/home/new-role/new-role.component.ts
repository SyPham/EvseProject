import { Component, OnInit, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  DataManager,
  Query,
  UrlAdaptor,
  Predicate,
} from "@syncfusion/ej2-data";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss']
})
export class NewRoleComponent implements OnInit {
  news = [];
  baseUrl = environment.apiUrlImage;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadNewsRoleData();
  }
  safeHtml(html) {
   return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  loadNewsRoleData() {
    let query = new Query();
    query.where("type", "equal", "Role");
    new DataManager({
      url: `${environment.apiUrl}WebNews/LoadData?lang=${localStorage.getItem(
        "lang"
      )}`,
      adaptor: new UrlAdaptor(),
    })
      .executeQuery(query.sortBy("sortId"))
      .then((res: any) => {
        var data = res.result.result;
        this.news = data;
      })
      .catch((err) => {});
  }
}
