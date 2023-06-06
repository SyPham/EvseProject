import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService } from '@pigfarm-core';
import { DataManager, Query, UrlAdaptor, Predicate } from '@syncfusion/ej2-data';
import { AccountContractService } from 'src/app/_core/_service/account-contract.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-contract',
  templateUrl: './account-contract.component.html',
  styleUrls: ['./account-contract.component.scss']
})
export class AccountContractComponent implements OnInit, OnChanges {
  accountContacts = [];
  countyDataSource: any;
  siteDataSource: any;
  deviceDataSource: any;
  @Input() accountGuid = "";
  @Input() role = "";
  visibleDevices: boolean = false;
  constructor(
    private service: AccountContractService,
    private alertify: AlertifyService,
    public translate: TranslateService,

  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountGuid'] && changes['accountGuid'].currentValue != changes['accountGuid'].previousValue) {
      this.loadData();
    }
    if (changes['role'] && changes['role'].currentValue) {
      this.visibleDevices = this.role == "Investor"
    }
    
  }

  ngOnInit() {
    this.loadDataSource();
  }
  // Nếu là Investor thì load contry trước

  // Nếu là Landlord thì load site
  loadDataSource() {
      this.countyDataSource =  new DataManager({
        url: `${environment.apiUrl}County/GetDataDropdownlist`,
        adaptor: new UrlAdaptor(),
        headers: [{ authorization: `Bearer ${localStorage.getItem("token")}` }],
      });
  }
  loadData() {
    let query = new Query().where("accountGuid", "equal", this.accountGuid);
   new DataManager({
      url: `${environment.apiUrl}AccountContract/GetDataDropdownlist`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${localStorage.getItem("token")}` }],
    }).executeQuery(query)
    .then((x: any) => {
      console.log(x);
      this.accountContacts = x.result;
    });
  }
  addRow() {
    let item = {
      siteGuid: this.site?.guid,
      siteGuidName: this.site?.siteName,
      countyGuid: this.county?.countyId,
      countyGuidName:  this.county?.countyName,
      deviceGuid: this.device?.guid,
      deviceGuidName: this.device?.deviceName,
      file: null,
      accountGuid: this.accountGuid,
    };
    this.add(item);
    //this.accountContacts.push(item)
  }
  add(item) {
   
    this.service.insertForm(item).subscribe(x=> {
      this.alertify.success(this.translate.instant("Add account contract successfully"))

      this.reset();
      this. loadData();
    })
  }
  reset() {
    this.site = {}
    this.device = {}
    this.county = {}

    this.siteGuid = null
    this.deviceGuid = null
    this.countyGuid = null
  }
  update(item) {
    this.service.updateForm(item).subscribe(x=> {
      this.alertify.success(this.translate.instant("Upload file successfully"))
      this. loadData();
    })
  }
  changeFile(e, item) {
    const file = e.target.files[0]
    let model = {...item}
    model.file = file;
    this.update(model);
  }
onClick(i) {
  let id = 'selectedFile_'+ i;
  document.getElementById(id).click();
}
  deleteRow(i, data) {
    this.service.delete(data.id).subscribe(x=> {
      this.alertify.success(this.translate.instant("Delete account contract successfully"))

      this. loadData();
    });
    // this.accountContacts.splice(i,1);
  }
  site;
  county;
  device;
  siteGuid;
  deviceGuid;
  countyGuid;
  onChange(type, e) {
    console.log(type, e)
    let data = e.itemData;
    if (type === "Site") {
      this.site = data;
      this.loadDeviceDataSourceBySiteGuid(e.value);
    }
    if (type === "County") {
      this.county = data;
      this.loadSiteDataSourceByCountyGuid(e.value);
    }
    if (type === "Device") {
      this.device = data;
    }
  }

 
  loadDeviceDataSourceBySiteGuid(siteGuid) {
   this.deviceQuery = new Query().where("siteGuid", "equal", siteGuid);
    this.deviceDataSource =  new DataManager({
      url: `${environment.apiUrl}Device/GetDataDropdownlist`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${localStorage.getItem("token")}` }],
    }, this.deviceQuery);
  }
  siteQuery = new Query();
  deviceQuery = new Query();
  loadSiteDataSourceByCountyGuid(countyGuid) {
    this.siteQuery = new Query();
    this.siteQuery.where("countyGuid", "equal", countyGuid);
    this.siteDataSource =  new DataManager({
      url: `${environment.apiUrl}Site/GetDataDropdownlist`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${localStorage.getItem("token")}` }],
    }, this.siteQuery)
  }
}
