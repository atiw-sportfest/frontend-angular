import { SportfestService } from '../../sportfest.service';
import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { NutzerApi } from "../../api/api";
import { User, Role } from "../../model/models";

@Component({
  selector: 'app-user-account-control',
  templateUrl: './user-account-control.component.html',
  styleUrls: ['./user-account-control.component.css']
})
export class UserAccountControlComponent implements OnInit {

  users: User[];
  selectedRole: Role;
  username: string = '';
  password: string = 'Atiw2017';

  constructor(private nutzerApi: NutzerApi) { }

  ngOnInit() {//Laden der Seite
    this.users=[];
    this.rollenLaden();
  }

  private rollenLaden() { //Lädt alle im System existierende Benutzer
    this.nutzerApi.userGet().subscribe(data => {
      this.users=data;
    });
  }
  public deleteUser(user: User) {
    // alert('User ' + user.name + ' wird gelöscht!');
    this.nutzerApi.userUidDelete(user.id).subscribe(data=>{
      this.rollenLaden();
    });
  }

  public addUser() {
    if (this.selectedRole && this.username && this.password) {//Benutzername und Rolle wurde gesetzt
      let newUser: User = {
        password : Md5.hashStr(this.password).toString(),
        username: this.username,
        role: this.selectedRole
      };
      this.nutzerApi.userPost(newUser).subscribe(data=>{
          this.rollenLaden();
      });
  }
  }


  public resetPassword(user: User) {//Ausgewählten Benutzer löschen und mit initialpassword erstellen
    user.password = "";
    this.nutzerApi.userUidPost(user.id, user).subscribe(data=>{
      this.rollenLaden();
    });
  }
}
