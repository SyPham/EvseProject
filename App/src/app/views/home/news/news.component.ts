import { Component, OnInit } from "@angular/core";
import {
  DataManager,
  Query,
  UrlAdaptor,
  Predicate,
} from "@syncfusion/ej2-data";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  news = [];
  baseUrl = environment.apiUrlImage;

  constructor() {}

  ngOnInit(): void {
    this.loadNewsData();
  }
  loadNewsData() {
    let query = new Query();
    query.where("type", "equal", "News");
    new DataManager({
      url: `${environment.apiUrl}WebNews/LoadData?lang=${localStorage.getItem(
        "lang"
      )}`,
      adaptor: new UrlAdaptor(),
    })
      .executeQuery(query.sortBy("sortId"))
      .then((res: any) => {
        var data = res.result.result;
        if (data.length > 0) {
          for (var i = 0; i < data.length; i += 3) {
            this.news.push(data.slice(i, i + 3));
          }
        }
      })
      .catch((err) => {});
  }
}
