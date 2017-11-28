import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SportfestService } from '../../sportfest.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  @Output() pwCancel = new EventEmitter<any>();
  @Output() pwSave = new EventEmitter<any>();

  recent: string;
  new: string;
  newSubmit: string;
  initPw: boolean = false;

  recentInvalid = false;
  msgRecentInvalid = 'Falsches Passwort';
  newNotEqual = false;
  msgNewNotEqual = 'Passwörter sind nicht identisch!';

  constructor(private sfService: SportfestService) { }

  ngOnInit() {
  }

  public cancel() {
    this.pwCancel.emit();
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
      this.pwSave.emit();
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
      if(newEncrypt == Md5.hashStr('Atiw2017')){
        this.msgNewNotEqual='Passwort ist initial Passwort!';
      }else{
        this.msgNewNotEqual='Passwörter sind nicht identisch!';
      }
    }
    return valid;
  }

  public setInitPw(init: boolean) {
    this.initPw = init;
  }
  public keypress(event: any) {
    if (event.keyCode == 13) { // Enter gedrückt
      this.save();
    }
  }
}