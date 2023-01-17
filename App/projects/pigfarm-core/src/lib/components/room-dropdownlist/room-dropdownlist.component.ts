import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef, AfterViewChecked ,Inject } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TranslateService } from '@ngx-translate/core';
import { PigfarmCoreService } from '../../../services';

@Component({
  selector: 'app-room-dropdownlist',
  templateUrl: './room-dropdownlist.component.html',
  styleUrls: ['./room-dropdownlist.component.css']
})
export class RoomDropdownlistComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() id = "room-remote";
  @Input() barnGuid: any;
  @Input() makeOrderGuid: any;
  @Input() selectedValue: any;
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() autoload = true;

  @Output() change = new EventEmitter<any>();
  @Output() ngModelChange = new EventEmitter<any>();
  @Output() selectedValueChange = new EventEmitter<any>();
  @ViewChild(DropDownListComponent) public dropdownObj: DropDownListComponent
  @Output('onblur') onblurChange = new EventEmitter<any>();

  public data: any;
  public query: Query ;
  public remoteFields: Object = { text: 'name', value: 'guid' };
  
  take = 100;
  roomGuidName: any;
  skip = 0;
  public onOroom(args) {
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
      const query = this.dropdownObj.query.clone().search(e.text, ['roomName', 'roomNo']);
      e.updateData(this.data, query);
    }
  };
  public actionComplete(e: any): void {
    e.result = e.result.map(x => {
      let name = x.id === 0 ? this.trans.instant(x.name) : x.name;
      return {
        guid: x.guid,
        name: name
      }
    })
}
  constructor(@Inject("Env") private baseUrl,public trans: TranslateService,
    private cd: ChangeDetectorRef,
    public service: PigfarmCoreService) {
    }
  ngAfterViewChecked(): void {
  }

  ngOnInit() {
    if(this.autoload) {
      this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(x=> {
        this.data = x;
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedValue === "" && this.dropdownObj) {
      this.dropdownObj.value = null;
      this.cd.detectChanges()
    }
    if (changes['selectedValue'] && changes['selectedValue'].currentValue) {
     setTimeout(() => {
      this.selectedValue = changes['selectedValue'].currentValue;
     }, 0);

    }
    if (changes['barnGuid']) {
      this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(x=> {
        this.data = x;
      })
    }
    if (changes['makeOrderGuid']) {
      this.service.getRoomsByFarmGuid(localStorage.getItem('farmGuid'), this.barnGuid || "", this.makeOrderGuid || '').subscribe(x=> {
        this.data = x;
      })
    }
  }
  onChange(args) {
    this.change.emit(args);
    this.roomGuidName = args.itemData?.name;
    this.selectedValueChange.emit(args.itemData?.guid);
    this.ngModelChange.emit(args.itemData?.guid);

    
  }
  onNgModelChange(value) {
    
    this.ngModelChange.emit(value);
    this.selectedValueChange.emit(value);
  }
  onblur(e) {
    

    this.onblurChange.emit(e);
  }
}
