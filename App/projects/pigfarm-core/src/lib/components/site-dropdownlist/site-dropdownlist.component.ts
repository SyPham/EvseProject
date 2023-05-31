import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Inject,
} from "@angular/core";
import { DropDownListComponent } from "@syncfusion/ej2-angular-dropdowns";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-site-dropdownlist",
  templateUrl: "./site-dropdownlist.component.html",
  styleUrls: ["./site-dropdownlist.component.css"],
})
export class SiteDropdownlistComponent implements OnInit, OnChanges {
  @Input() id = "site-remote";
  @Input() selectedValue: any;
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() enabledLoad = true;
  @Input() landlordGuid = "";
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueName = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild("remote") public dropdownObj: DropDownListComponent;
  public data: DataManager;
  public query: Query;
  public remoteFields: Object = { text: "name", value: "guid" };

  take = 100;
  skip = 0;
  public onOpen(args) {
    // let start: number = this.take;
    // let end: number = 5;
    // let listElement: HTMLElement = (this.dropdownObj as any).list;
    // listElement.addEventListener('scroll', () => {
    //   console.log(listElement.scrollTop + listElement.offsetHeight,listElement.scrollHeight )
    //   if ((listElement.scrollTop + listElement.offsetHeight) >= listElement.scrollHeight) {
    //     let filterQuery = this.dropdownObj.query.clone();
    //     this.data.executeQuery(filterQuery.skip(start).take(end)).then((event: any) => {
    //       start = end;
    //       end += 5;
    //       // const unique = [...new Set(event.result.map(item => item.group))];
    //       this.dropdownObj.addItem(event.result as { [key: string]: Object }[]);
    //     }).catch((e: Object) => {
    //     });
    //   }
    // })
  }
  public onFiltering: any = (e: any) => {
    if (e.text === "") {
      e.updateData(this.data);
    } else {
      const query = this.dropdownObj.query
        .clone()
        .search(e.text, ["siteNo", "siteName"]);
      e.updateData(this.data, query);
    }
  };
  public actionComplete(e: any): void {}
  constructor(@Inject("Env") private baseUrl, public trans: TranslateService) {}
  ngOnInit() {}
  loadData() {
    this.query = new Query().where("status", "equal", 1);
    if (this.landlordGuid) {
      this.query.where("landlordGuid", "equal", this.landlordGuid);
    }
    this.data = new DataManager(
      {
        url: `${this.baseUrl}Site/GetDataDropdownlist`,
        adaptor: new UrlAdaptor(),
        crossDomain: true,
      },
      this.query
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    // only run when property "data" changed
    if (changes["selectedValue"]) {
      this.selectedValueChange.emit(this.selectedValue);
    }

    this.selectedValue = this.selectedValue || "";
    if (changes["landlordGuid"] && changes["landlordGuid"].currentValue ) {
      this.loadData();
    } 
    if (changes["enabledLoad"] && changes["enabledLoad"].currentValue == true && !changes["landlordGuid"]?.currentValue) {
      this.loadData();
    }
  }
  onChange(args) {
    this.change.emit(args);
    this.selectedValueName.emit(args.itemData.name || "");
  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
}
