import { Component, OnInit } from '@angular/core';
import { ImagePathConstants } from 'src/app/_core/_constants';
import { LandlordService } from 'src/app/_core/_service/evse/landlord.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank-account-finish-screen',
  templateUrl: './bank-account-finish-screen.component.html',
  styleUrls: ['./bank-account-finish-screen.component.css']
})
export class BankAccountFinishScreenComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user_landlord'))
  input: any;
  apiHost = environment.apiUrlImage;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;

  constructor(private landlordService: LandlordService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.landlordService.getBankAccountByLandlordGuid(this.user.guid).subscribe(input => {
      this.input = input;
      console.log(input)
    })
  }

}
