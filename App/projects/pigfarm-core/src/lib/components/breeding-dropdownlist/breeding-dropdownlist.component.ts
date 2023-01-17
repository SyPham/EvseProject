import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';

@Component({
  selector: 'app-breeding-dropdownlist',
  templateUrl: './breeding-dropdownlist.component.html',
  styleUrls: ['./breeding-dropdownlist.component.scss']
})
export class BreedingDropdownlistComponent implements OnInit, OnChanges {
  @Input() id = "breeding-remote";
  @Input() selectedValue: any;
  @Input() placeholder = "";
  @Input() disabled = false;
  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild('breedingRemote') public dropdownObj: DropDownListComponent
  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 10;
  skip = 0;
  roomGuid = "";
  penGuid: any;
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
    if (e.text === '') {
      e.updateData(this.data);
    } else {
      //const query = this.dropdownObj.query.clone().search(e.text, 'name');
      e.updateData(this.data, new Query().search(e.text, 'name'));
    }
  };
  public actionComplete(e: any): void {
}
  constructor(@Inject("Env") private baseUrl,
    public trans: TranslateService,
    public service: PigfarmCoreService) {}
  ngOnInit() {
    this.service.getBreedingByFarmGuid(localStorage.getItem('farmGuid')).subscribe(x=> {
      this.data = x;
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.selectedValue = this.selectedValue || "";
  }
  onChange(args) {
    this.change.emit(args);
    this.ngModelChange.emit(args.itemData?.guid);
    this.roomGuid = args.itemData?.roomGuid;
    this.penGuid = args.itemData?.penGuid;
    this.selectedValueChange.emit(args.itemData?.guid);

  }
  onNgModelChange(value) {
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
}
