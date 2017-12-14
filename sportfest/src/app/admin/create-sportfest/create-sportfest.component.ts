import { AreYouSureComponent } from '../../main/are-you-sure/are-you-sure.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SportfestService } from '../../sportfest.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MetaService as MetaApi } from 'sportfest-api';

@Component({
  selector: 'app-create-sportfest',
  templateUrl: './create-sportfest.component.html',
  styleUrls: ['./create-sportfest.component.css']
})
export class CreateSportfestComponent implements OnInit {

  selectedOption: any;
  buttonPressed: number; //0 = sportfest beenden, 1= neues Sportfest

  //TODO Umstellen sobald Schnittstellen vorhanden sind
  constructor(public dialog: MatDialog, private metaApi: MetaApi,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  private beenden() {
    this.metaApi.sportfestPost().subscribe();
    this.openSnackBar("Das aktuelle Sporfest wurde beendet und die Punkte verteilt", "Bestätigen");
  }

  private neuesSportfest() {
    this.metaApi.sportfestDelete().subscribe();
    this.openSnackBar("Ein neues Sporfest wurde angelegt", "Bestätigen");
  }


  openDialog(title: string, button: number): void {
    this.selectedOption = null;

    this.buttonPressed = button;
    let dialogRef = this.dialog.open(AreYouSureComponent, {
      data: { title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      this.handleResults();
    });
  }

  private handleResults() {
    if (this.buttonPressed == 0) { //SF beenden
      if (this.selectedOption == "Confirm")
        this.beenden();
    } else { //SF neu anlegen
      if (this.selectedOption == "Confirm")
        this.neuesSportfest();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }



}
