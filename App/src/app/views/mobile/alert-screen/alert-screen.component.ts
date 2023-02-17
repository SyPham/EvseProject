import { User2MessageService } from 'src/app/_core/_service/evse/user2-message.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataManager, UrlAdaptor ,Query } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alert-screen',
  templateUrl: './alert-screen.component.html',
  styleUrls: ['./alert-screen.component.scss']
})
export class AlertScreenComponent implements OnInit {
  dataSource: any;
  user = JSON.parse(localStorage.getItem('user_landlord'))

  constructor(
    private user2MessageService: User2MessageService,
  ) { }

  ngOnInit() {
    this.loadData()
  }
  loadData() {
    const accessToken = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    new DataManager({
      url: `${environment.apiUrl}User2Message/LoadData?lang=${lang}`,
      adaptor: new UrlAdaptor,
      headers: [{ authorization: `Bearer ${accessToken}` }]
    }).executeQuery(new Query().where('userGuid', 'equal', this.user?.guid)).then(x=> {
    this.dataSource = x['result'].result
    });
}
}
