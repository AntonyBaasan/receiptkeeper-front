import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ImageDropComponent } from 'src/app/shared/image-drop/image-drop.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepicker, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { ReceiptDetectionResult } from 'src/app/model/receipt-detection-result.model';

import { Record } from '../../models/record.model';
import { FormControl } from '@angular/forms';
import { TextutilsService } from 'src/app/services/textutils.service';
import { ImagedetectorService } from 'src/app/services/imagedetector.service';
import { DateUtilsService } from 'src/app/services/date-utils.service';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css']
})
export class RecordEditComponent implements OnInit {

  @ViewChild(ImageDropComponent) imageDropComponentRef: ImageDropComponent;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  record: Record;
  receiptDetectionResult: ReceiptDetectionResult;
  title = 'New';

  fileToUpload: File = null;
  isDetecting = false;
  detectedMessage = '';
  detectedText = '';
  today = new FormControl(new Date());
  // 0 - Upload image, 1 - Edit
  selectedTab = new FormControl(0);

  constructor(
    private textUtilsService: TextutilsService,
    private imagedetectorService: ImagedetectorService,
    public dialogRef: MatDialogRef<RecordEditComponent>,
    public dateUtilsService: DateUtilsService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.record = this.data.record;
    this.title = this.record.id ? 'Edit' : 'New';
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileToUpload = this.imageDropComponentRef.getFile();

    if (!this.fileToUpload) {
      console.log('No file to upload!');
      return;
    }
    this.isDetecting = true;
    this.executeDetection(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
        console.log(data);
        this.detectedMessage = data.message;
        this.detectedText = data.result.text;
        this.receiptDetectionResult = this.recognizeReceipt(data.result.text);
        this.record = this.convertDetectionToRecord(
          this.record,
          this.receiptDetectionResult
        );
      },
      error => {
        console.log(error);
        this.snackBar.open('Something went wrong!', '', { duration: 3000 });
      },
      () => {
        setTimeout(() => {
          this.isDetecting = false;
        }, 0);
      }
    );
  }

  convertDetectionToRecord(
    record: Record,
    rdr: ReceiptDetectionResult
  ): Record {
    if (rdr.title[0]) {
      record.title = rdr.title[0];
    }
    if (rdr.date[0]) {
      record.date = rdr.date[0];
    }
    if (rdr.total[0]) {
      record.total = rdr.total[0];
    }

    return record;
  }

  executeDetection(file: File) {
    // if (isDevMode()) {
    //   return this.imagedetectorService.detectFileFake(file);
    // }

    return this.imagedetectorService.detectFile(file);
  }

  recognizeReceipt(text: string): ReceiptDetectionResult {
    const result = this.textUtilsService.convertToLines(text);
    const receipt = this.textUtilsService.stringLinesToReceipt(result);
    return receipt;
  }

  noImage() {
    this.selectedTab.setValue(1);
  }

  saveReceipt(record: Record) {
    // return this.receiptService.save(receipt).subscribe(
    //   () => {
    //     this.dialogRef.close();

    //     this.dialogRef.close({
    //       action: this.receipt.id ? 'Update' : 'AddNew',
    //       payload: receipt
    //     });
    //   },
    //   error => {
    //     this.snackBar.open('Something went wrong!', '', { duration: 3000 });
    //   }
    // );
  }

  onCancel() {
    this.dialogRef.close({ action: 'Cancel' });
  }

  imageChanged() {
    this.uploadFileToActivity();
  }

  dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.record.date = event.value;
  }

  convertDateToForm(date: Date) {
    return this.dateUtilsService.convertDateToForm(date);
  }

}
