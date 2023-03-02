import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from 'src/app/_core/_model/evse/model';
import { SiteService } from 'src/app/_core/_service/evse/site.service';
import { environment } from 'src/environments/environment';
import { ImagePathConstants } from 'src/app/_core/_constants';

@Component({
  selector: 'app-field-screen-detail',
  templateUrl: './field-screen-detail.component.html',
  styleUrls: ['./field-screen-detail.component.scss']
})
export class FieldScreenDetailComponent implements OnInit {
  input: Site = <Site>{}
  baseUrl = environment.apiUrlImage;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;
  areaName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    ) { }

  ngOnInit() {
    const area = this.activatedRoute.snapshot.params.area;
    this.areaName = "";
    if (area === "landlord") {
      this.areaName = "landlord"
    }
    else if (area === "engineer") {
      this.areaName = "engineer"
    }
    
    this.loadDetail();
  }
  loadDetail() {
    const guid = this.activatedRoute.snapshot.params.guid;
    if (guid) {
      this.siteService.getByGuid(guid).subscribe(x=> {
        this.input = x;
      })
    }
    
  }
}
