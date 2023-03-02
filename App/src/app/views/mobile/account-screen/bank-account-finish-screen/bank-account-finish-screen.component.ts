import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePathConstants } from 'src/app/_core/_constants';
import { LandlordService } from 'src/app/_core/_service/evse/landlord.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank-account-finish-screen',
  templateUrl: './bank-account-finish-screen.component.html',
  styleUrls: ['./bank-account-finish-screen.component.css']
})
export class BankAccountFinishScreenComponent implements OnInit {
  user: any = {} as any
  input: any;
  apiHost = environment.apiUrlImage;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;
  areaName: string;

  constructor(
    private landlordService: LandlordService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const area = this.activatedRoute.snapshot.params.area;
    this.areaName = "";
    if (area === "landlord") {
      this.areaName = "landlord"
    }
    else if (area === "engineer") {
      this.areaName = "engineer"
    }
    this.user = JSON.parse(localStorage.getItem(`user_${this.areaName}`))

    this.loadData();
  }
  loadData() {
    this.landlordService.getBankAccountByLandlordGuid(this.user.guid).subscribe(input => {
      this.input = input;
      console.log(input)
    })
  }

}
