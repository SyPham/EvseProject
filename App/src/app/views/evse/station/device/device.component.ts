import { Component, Input, OnInit } from '@angular/core';
import { ParkingLot, Site } from 'src/app/_core/_model/evse/model';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  @Input() packingLot: ParkingLot
  @Input() site: Site

  constructor() { }

  ngOnInit() {
  }

}
