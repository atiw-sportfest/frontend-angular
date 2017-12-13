import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { SportfestService } from '../../sportfest.service';
import { Md5 } from 'ts-md5/dist/md5';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MetaService as MetaApi, User } from 'sportfest-api';

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

  constructor(private metApi: MetaApi, public thisDialogRef: MatDialogRef<PasswordChangeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.initPw=false;
    //this.initPw = this.data.initPw;
  }

  public cancel() {
    this.thisDialogRef.close("Cancel");
  }
  public save() {
    let newEncrypt = Md5.hashStr(this.new).toString();
    if (this.inputIsValid()) {
      let user: User = {
        username: sessionStorage.getItem('username'),
        password: newEncrypt
      }
      this.metApi.authenticatePost(user).subscribe(success => {
        sessionStorage.setItem('init', 'false');
        this.thisDialogRef.close("Save");
      }, error => {
        this.msgNewNotEqual = 'Altes Passwort ist falsch!';
      });
    }
  }
  private inputIsValid(): boolean {
    // Verschlüsseln
    let recentEncrypt = Md5.hashStr(this.recent);
    let newEncrypt = Md5.hashStr(this.new);
    let newSubmitEncrypt = Md5.hashStr(this.newSubmit);

    let valid = true;
    if (!(newEncrypt && newSubmitEncrypt && (newEncrypt === newSubmitEncrypt))) {
      valid = false;
      this.msgNewNotEqual = 'Passwörter sind nicht identisch!';
    }
    return valid;
  }

  public keypress(event: any) {
    if (event.keyCode == 13) { // Enter gedrückt
      this.save();
    }
  }
}
