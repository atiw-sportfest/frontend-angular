import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { SportfestService } from '../../sportfest.service';
import { Md5 } from 'ts-md5/dist/md5';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NutzerService, User, NewPassword } from 'sportfest-api';

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

  constructor(private nutzerService: NutzerService, public thisDialogRef: MatDialogRef<PasswordChangeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.initPw = this.data.initPw;
    } else {
      this.initPw = false;
    }


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
      let pwChange: NewPassword = {
        oldPassword: Md5.hashStr(this.recent).toString(),
        newPassword: newEncrypt
      }
      this.nutzerService.userPasswordPost(pwChange).subscribe(success => {
        console.log(success);
        sessionStorage.setItem('init', 'false');
        this.thisDialogRef.close("Save");
        this.recentInvalid = false;
      }, error => {
        console.log(error);
        this.recentInvalid = true;

      });
    }
  }
  private inputIsValid(): boolean {
    this.newNotEqual = false;
    // Verschlüsseln
    let newEncrypt = Md5.hashStr(this.new);
    let newSubmitEncrypt = Md5.hashStr(this.newSubmit);

    let valid = true;
    if (!(newEncrypt && newSubmitEncrypt && (newEncrypt.toString() == newSubmitEncrypt.toString()))) {
      valid = false;
      this.newNotEqual = true;
    }
    return valid;
  }

  public keypress(event: any) {
    if (event.keyCode == 13) { // Enter gedrückt
      this.save();
    }
  }
}
