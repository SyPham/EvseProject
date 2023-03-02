import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import { environment } from "src/environments/environment";
import { ImagePathConstants } from "src/app/_core/_constants";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"],
})
export class FieldComponent implements OnInit {
  dataSource: any;
  baseUrl = environment.apiUrlImage;
  user = {} as any;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;
  areaName: string;

  constructor(
    private activatedRoute: ActivatedRoute

  ) {}

  ngOnInit() {
    const area = this.activatedRoute.snapshot.params.area;
    this.areaName = "";
    if (area === "landlord") {
      this.areaName = "landlord"
    }
    else if (area === "engineer") {
      this.areaName = "engineer"
    }
    this.user = JSON.parse(localStorage.getItem(`user_${this.areaName}`))
    this.loadData();
  }
  loadData() {
    const accessToken = localStorage.getItem("token");
    const lang = localStorage.getItem("lang");
    new DataManager({
      url: `${environment.apiUrl}Site/LoadData?lang=${lang}`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    })
      .executeQuery(new Query().where("landlordGuid", "equal", this.user?.guid))
      .then((x) => {
        this.dataSource = x["result"].result;
      });
  }
}
