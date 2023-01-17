import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@pigfarm-core';
import { AlertifyService } from 'src/app/_core/_service/alertify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pregnancy-room',
  templateUrl: './pregnancy-room.component.html',
  styleUrls: ['./pregnancy-room.component.css']
})
export class PregnancyRoomComponent extends BaseComponent implements OnInit {
  data: any;
  toolbarOptions = [];
  active = 0;
  constructor(
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private datePipe: DatePipe,
    public translate: TranslateService,
  ) {
	    super(translate,environment.apiUrl);
    }

  ngOnInit() {
  }
  toolbarClick(e) {}
  dataBound() {}
  odsExport() {}
}