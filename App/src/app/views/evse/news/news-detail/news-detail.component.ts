import { Component, OnInit } from "@angular/core";
import {
  DataManager,
  Query,
  UrlAdaptor,
  Predicate,
} from "@syncfusion/ej2-data";
import { WebNewsService } from "src/app/_core/_service/evse/web-news.service";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  guid: string;
  item: any;
  baseUrl = environment.apiUrlImage;

  constructor(private webNewsService: WebNewsService, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.loadDetail();
  }
  loadDetail() {
    this.guid = this.activatedRoute.snapshot.params['id'];
    this.webNewsService.getByGuid(this.guid).subscribe(item=> {
      this.item = item;
    })
  }
}
