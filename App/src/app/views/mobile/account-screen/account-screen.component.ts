import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePathConstants } from 'src/app/_core/_constants';
import { LandlordService } from 'src/app/_core/_service/evse/landlord.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.component.html',
  styleUrls: ['./account-screen.component.css']
})
export class AccountScreenComponent implements OnInit {
  user: any = {} as any
  input: any;
  apiHost = environment.apiUrlImage;
  noImage = ImagePathConstants.NO_IMAGE_ACTION_COMPONENT;
  areaName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private landlordService: LandlordService
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