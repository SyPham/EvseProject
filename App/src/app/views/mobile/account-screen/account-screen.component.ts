import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.component.html',
  styleUrls: ['./account-screen.component.css']
})
export class AccountScreenComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'))

  constructor() { }

  ngOnInit(): void {
  }

}