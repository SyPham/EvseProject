import { Component, OnInit ,Inject } from '@angular/core';

@Component({
  selector: 'app-record2-room',
  templateUrl: './record2-room.component.html',
  styleUrls: ['./record2-room.component.css']
})
export class Record2RoomComponent implements OnInit {

  constructor(@Inject("Env") private baseUrl,) { }

  ngOnInit() {
  }

}
