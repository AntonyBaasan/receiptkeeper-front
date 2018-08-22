import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsShellComponent } from './container/records-shell/records-shell.component';
import { RecordsRoutingModule } from './records-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ImportMaterialModule } from '../importmaterial/importmaterial.module';
import { RecordListComponent } from './presentation/record-list/record-list.component';
import { RecordButtonsComponent } from './presentation/record-buttons/record-buttons.component';
import { RecordFilterComponent } from './presentation/record-filter/record-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecordsRoutingModule,
    ImportMaterialModule,
    SharedModule,
  ],
  declarations: [
    RecordsShellComponent,
    RecordListComponent,
    RecordButtonsComponent,
    RecordFilterComponent,
  ]
})
export class RecordsModule { }
