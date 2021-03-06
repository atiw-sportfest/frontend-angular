import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { SportfestService } from '../../sportfest.service';
import { Md5 } from 'ts-md5/dist/md5';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  recent: string;
  new: string;
  newSubmit: string;
  initPw: boolean = false;

  recentInvalid = false;
  msgRecentInvalid = 'Falsches Passwort';
  newNotEqual = false;
  msgNewNotEqual = 'Passwörter sind nicht identisch!';

  constructor(private sfService: SportfestService, public thisDialogRef: MatDialogRef<PasswordChangeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initPw = this.data.initPw;
  }

  public cancel() {
    this.thisDialogRef.close("Cancel");
  }
  public save() {
    if (!this.recent)
      this.recent = 'Atiw2017';
    let oldEncrypt = Md5.hashStr(this.recent);
    let newEncrypt = Md5.hashStr(this.new);
    if (this.inputsValid()) {
      this.sfService.changePassword(oldEncrypt, newEncrypt).subscribe((data) => {
        console.log(data);
      },
        (err) => {
          console.error('GET-Service "changePassword()" not reachable.');
        });
      sessionStorage.setItem('init', 'false');
      this.thisDialogRef.close("Save");
    }
  }
  private inputsValid() {
    // Verschlüsseln
    let recentEncrypt = Md5.hashStr(this.recent);
    let newEncrypt = Md5.hashStr(this.new);
    let newSubmitEncrypt = Md5.hashStr(this.newSubmit);

    let valid = true;
    if (newEncrypt && newSubmitEncrypt && (newEncrypt === newSubmitEncrypt) && newEncrypt != Md5.hashStr('Atiw2017')) {
      this.newNotEqual = false;
    } else {
      valid = false;
      this.newNotEqual = true;
      if (newEncrypt == Md5.hashStr('Atiw2017')) {
        this.msgNewNotEqual = 'Passwort ist initial Passwort!';
      } else {
        this.msgNewNotEqual = 'Passwörter sind nicht identisch!';
      }
    }
    return valid;
  }

  public keypress(event: any) {
    if (event.keyCode == 13) { // Enter gedrückt
      this.save();
    }
  }
}