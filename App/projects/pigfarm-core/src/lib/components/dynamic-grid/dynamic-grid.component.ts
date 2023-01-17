import { Component, OnInit ,Inject } from '@angular/core';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit {

  constructor(@Inject("Env") private baseUrl,) { }

  ngOnInit() {
  }

}
