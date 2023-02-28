import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePathConstants } from 'src/app/_core/_constants';
import { Site } from 'src/app/_core/_model/evse/model';
import { SiteService } from 'src/app/_core/_service/evse/site.service';
import { environment } from 'src/environments/environment';
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";

@Component({
  selector: 'app-report-error',
  templateUrl: './report-error.component.html',
  styleUrls: ['./report-error.component.scss']
})
export class ReportErrorComponent implements OnInit {
  input: Site = <Site>{}
  baseUrl = environment.apiUrlImage;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;
  dataSource: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    ) { }

  ngOnInit() {
    this.loadDetail();
  }
  loadDetail() {
    const guid = this.activatedRoute.snapshot.params.guid;
    if (guid) {
      this.siteService.getByGuid(guid).subscribe(x=> {
        this.input = x;
    this.loadData();

      })
    }
    
  }

  loadData() {
    const accessToken = localStorage.getItem("token");
    const lang = localStorage.getItem("lang");
    new DataManager({
      url: `${environment.apiUrl}Device/LoadData?lang=${lang}`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    })
      .executeQuery(new Query().where("siteGuid", "equal", this.input?.guid))
      .then((x) => {
        this.dataSource = x["result"].result;
      });
  }
}
