import { BarnDropdownlistComponent } from '../lib/components/barn-dropdownlist/barn-dropdownlist.component';
import { AreaDropdownlistComponent } from '../lib/components/area-dropdownlist/area-dropdownlist.component';
import { PenMultiselectComponent } from '../lib/components/pen-multiselect/pen-multiselect.component';
import { FeedDropdownlistComponent } from '../lib/components/feed-dropdownlist/feed-dropdownlist.component';
import { FarmDropdownlistComponent } from '../lib/components/farm-dropdownlist/farm-dropdownlist.component';
import { PigDropdownlistComponent } from '../lib/components/pig-dropdownlist/pig-dropdownlist.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComboBoxModule, DropDownListModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PenDropdownlistComponent } from '../lib/components/pen-dropdownlist/pen-dropdownlist.component';
import { CodeTypeDropdownlistComponent } from '../lib/components/code-type-dropdownlist/code-type-dropdownlist.component';
import { MaterialDropdownlistComponent } from '../lib/components/material-dropdownlist/material-dropdownlist.component';
import { MaskedtimetextboxComponent } from '../lib/components/maskedtimetextbox/maskedtimetextbox.component';
import { MaskedTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { TranslateModule } from '@ngx-translate/core';
import { DiseaseDropdownlistComponent } from '../lib/components/disease-dropdownlist/disease-dropdownlist.component';
import { MedicineDropdownlistComponent } from '../lib/components/medicine-dropdownlist/medicine-dropdownlist.component';
import { BomDropdownlistComponent } from '../lib/components/bom-dropdownlist/bom-dropdownlist.component';
import { CustomerDropdownlistComponent } from '../lib/components/customer-dropdownlist/customer-dropdownlist.component';
import { VectorControlDropdownlistComponent } from '../lib/components/vector-control-dropdownlist/vector-control-dropdownlist.component';
import { DisinfectionDropdownlistComponent } from '../lib/components/disinfection-dropdownlist/disinfection-dropdownlist.component';
import { RoomDropdownlistComponent } from '../lib/components/room-dropdownlist/room-dropdownlist.component';
import { CullingTankDropdownlistComponent } from '../lib/components/culling-tank-dropdownlist/culling-tank-dropdownlist.component';
import { PenDropdownlistModalComponent } from '../lib/components/pen-dropdownlist-modal/pen-dropdownlist-modal.component';
import { MyCheckboxComponent } from '../lib/components/my-checkbox/my-checkbox.component';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { ThingDropdownlistComponent } from '../lib/components/thing-dropdownlist/thing-dropdownlist.component';
import { AccountDropdownlistComponent } from '../lib/components/account-dropdownlist/account-dropdownlist.component';
import { MultiPigGridComponent } from '../lib/components/multi-pig-grid/multi-pig-grid.component';
import { EditService, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { Record2PenComponent } from '../lib/components/record2-pen/record2-pen.component';
import { Record2RoomComponent } from '../lib/components/record2-room/record2-room.component';
import { MakeorderDropdownlistComponent } from '../lib/components/makeorder-dropdownlist/makeorder-dropdownlist.component';
import { SelectedpigGridComponent } from '../lib/components/selectedpig-grid/selectedpig-grid.component';
import { TreatmentDropdownlistComponent } from '../lib/components/treatment-dropdownlist/treatment-dropdownlist.component';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { MakeorderDropdownlistToolbarComponent } from '../lib/components/makeorder-dropdownlist-toolbar/makeorder-dropdownlist-toolbar.component';
import { XaccountGroupComponent } from '../lib/components/xaccount-group/xaccount-group.component';
import { RecordsaleDropdownlistComponent } from '../lib/components/recordsale-dropdownlist/recordsale-dropdownlist.component';
import { DynamicGridComponent } from '../lib/components/dynamic-grid/dynamic-grid.component';
import { SemenDropdownlistComponent } from '../lib/components/semen-dropdownlist/semen-dropdownlist.component';
import { BreedingDropdownlistComponent } from '../lib/components/breeding-dropdownlist/breeding-dropdownlist.component';
import { BreedingDropdownlistToolbarComponent } from '../lib/components/breeding-dropdownlist-toolbar/breeding-dropdownlist-toolbar.component';
import { CustomerDropdownlistToolbarComponent } from '../lib/components/customer-dropdownlist-toolbar/customer-dropdownlist-toolbar.component';
import { UploadMultiDocumentComponent } from '../lib/components/upload-multi-document/upload-multi-document.component';
import { Breeding2SowinDropdownlistComponent } from '../lib/components/breeding2-sowin-dropdownlist/breeding2-sowin-dropdownlist.component';
import { AlertifyService, PigfarmCoreService } from '../services';
import { RecordSaleDropdownlistComponent, BoarTestingDropdownlistComponent, BomBoarDropdownlistComponent, BomGiltDropdownlistComponent, GiltinMakeorderDropdownlistComponent, UploadDocumentComponent } from './components';
import { CommonModule } from '@angular/common';
import { GiltInDropdownlistComponent } from './components/gilt-in-dropdownlist/gilt-in-dropdownlist.component';
import { DeviceDropdownlistComponent } from './components/device-component.ts/device-dropdownlist.component';
import { SiteDropdownlistComponent } from './components/site-component.ts/site-dropdownlist.component';
const commponents = [
  PigDropdownlistComponent,
  PenDropdownlistComponent,
  RoomDropdownlistComponent,
  CodeTypeDropdownlistComponent,
  FarmDropdownlistComponent,
  FeedDropdownlistComponent,
  MaterialDropdownlistComponent,
  MaskedtimetextboxComponent,
  DiseaseDropdownlistComponent,
  MedicineDropdownlistComponent,
  BomDropdownlistComponent,
  CustomerDropdownlistComponent,
  VectorControlDropdownlistComponent,
  DisinfectionDropdownlistComponent,
  CullingTankDropdownlistComponent,
  PenDropdownlistModalComponent,
  MyCheckboxComponent,
  ThingDropdownlistComponent,
  AccountDropdownlistComponent,
  MultiPigGridComponent,
  Record2RoomComponent,
  Record2PenComponent,
  PenMultiselectComponent,
  MakeorderDropdownlistComponent,
  AreaDropdownlistComponent,
  BarnDropdownlistComponent,
  SelectedpigGridComponent,
  TreatmentDropdownlistComponent,
  MakeorderDropdownlistToolbarComponent,
  XaccountGroupComponent,
  RecordsaleDropdownlistComponent,
  SemenDropdownlistComponent,
  BreedingDropdownlistComponent,
  DynamicGridComponent,
  BreedingDropdownlistToolbarComponent,
  CustomerDropdownlistToolbarComponent,
  UploadMultiDocumentComponent,
  Breeding2SowinDropdownlistComponent,
  UploadDocumentComponent,
  GiltInDropdownlistComponent,
  BoarTestingDropdownlistComponent,
  GiltinMakeorderDropdownlistComponent,
  BomBoarDropdownlistComponent,
  BomGiltDropdownlistComponent,
  RecordSaleDropdownlistComponent,
  SiteDropdownlistComponent,
  DeviceDropdownlistComponent
]

@NgModule({
  declarations: [
    ...commponents,
  ],
  imports: [
    DropDownListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaskedTextBoxModule,
    CheckBoxAllModule,
    TranslateModule,
    GridAllModule,
    MultiSelectAllModule,
    DatePickerAllModule,
    ComboBoxModule,
    UploaderModule,
  ],
  exports: [
    ...commponents,
    
  ],
  providers: [
    EditService,
    PigfarmCoreService,
    AlertifyService
  ]
})
export class PigfarmCoreModule { 
  static forRoot(environment: any): ModuleWithProviders<PigfarmCoreModule> {
    return {
      ngModule: PigfarmCoreModule,
      providers: [
        EditService,
        PigfarmCoreService,
        AlertifyService,
        {provide: 'Env', useValue: environment}
      ]
    }
  }
}