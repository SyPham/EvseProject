import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AlertifyService, BaseComponent, UtilitiesService } from 'herr-core';
import { ImagePathConstants } from 'src/app/_core/_constants';
import { Device, ParkingLot, Site } from 'src/app/_core/_model/evse/model';
import { ParkingLotService } from 'src/app/_core/_service/evse/parking-lot.service';
import { environment } from 'src/environments/environment';
declare let $: any;
@Component({
  selector: 'app-parking-lot-action',
  templateUrl: './parking-lot-action.component.html',
  styleUrls: ['./parking-lot-action.component.scss']
})
export class ParkingLotActionComponent  extends BaseComponent implements OnInit {
  @Input() title: string = "ParkingLot_Detail";
  @Input() guid: string | null;
  @Input() site: Site;
  @Output() saveChange = new EventEmitter()
  @Input() device: Device;
  model: ParkingLot
  file: any;
  apiHost = environment.apiUrl.replace('/api/', '');
  noImage = ImagePathConstants.NO_IMAGE;
  constructor(
    private modalService: NgbModal,
    private service: ParkingLotService,
    public translate: TranslateService,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    private utilityService: UtilitiesService,


    ) {
	    super(translate,environment.apiUrl);

     }
  @ViewChild('actionModal') actionModal: TemplateRef<any>;

  ngOnInit() {
  }
  initModel() {
    this.model = {} as ParkingLot;
    this.model.siteGuid = this.site.guid;
    this.guid = null;
  }
  open() {
    if (this.guid) {
      this.service.getByGuid(this.guid).subscribe(data=> {
        this.model = data;
        this.modalService.open(this.actionModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
      })
    } else {
      this.modalService.open(this.actionModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    }
   
	}
  
  close() {
		this.modalService.dismissAll();
	}
  onFileChangeLogo(args) {
    this.file = args.target.files[0];
  }
  ToFormatModel(model: any) {
    for (let key in model) {
      let value = model[key];
      if (value && value instanceof Date) {
        if (key === 'createDate') {
          model[key] = this.datePipe.transform(value, "yyyy/MM/dd HH:mm:ss");
        } else {
          model[key] = this.datePipe.transform(value, "yyyy/MM/dd");
        }
      } else {
        model[key] = value;
      }
    }
    return model;
  }
  create() {
    this.alertify.confirm4(
       this.alert.yes_message,
       this.alert.no_message,
       this.alert.createTitle,
       this.alert.createMessage,
       () => {
         delete this.model['column'];
         delete this.model['index'];
         this.model.deviceGuid = this.device.guid;
         this.service.add(this.ToFormatModel(this.model)).subscribe(
           (res) => {
             if (res.success === true) {
               this.alertify.success(this.alert.created_ok_msg);
               this.saveChange.emit()
               this.close();
             } else {
               this.translate.get(res.message).subscribe((data: string) => {
                 this.alertify.warning(data, true);
               });
             }
 
           },
           (error) => {
             this.alertify.warning(this.alert.system_error_msg);
           }
         );
       }, () => {
         this.alertify.error(this.alert.cancelMessage);
       }
     );
 
   }

   update() {
    this.alertify.confirm4(
       this.alert.yes_message,
       this.alert.no_message,
       this.alert.updateTitle,
       this.alert.updateMessage,
       () => {
         delete this.model['column'];
         delete this.model['index'];
         this.model.deviceGuid = this.device.guid;
         this.service.update(this.ToFormatModel(this.model)).subscribe(
           (res) => {
             if (res.success === true) {
               this.alertify.success(this.alert.updated_ok_msg);
               this.saveChange.emit();
               this.close();
             } else {
               this.alertify.warning(res.message, true);
             }
           },
           (error) => {
             this.alertify.warning(this.alert.system_error_msg);
           }
         );
       }, () => {
         this.alertify.error(this.alert.cancelMessage);
       }
     );
 
   }
   save() {

    if (this.model.id > 0) {
      this.update();
    } else {
      this.create();
    }
  }
}
