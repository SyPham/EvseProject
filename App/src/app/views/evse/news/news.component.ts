import { Component, OnInit } from "@angular/core";
import {
  DataManager,
  Query,
  UrlAdaptor,
  Predicate,
} from "@syncfusion/ej2-data";
import { WebNewsService } from "src/app/_core/_service/evse/web-news.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-news2',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class News2Component implements OnInit {
  news = [];
  baseUrl = environment.apiUrlImage;

  constructor(private webNewsService: WebNewsService) {}

  ngOnInit(): void {
    this.loadNewsData();
  }

  loadNewsData() {
    this.webNewsService.getWebNews().subscribe(x=> {
      this.news = x;
    })
    
  }
}
