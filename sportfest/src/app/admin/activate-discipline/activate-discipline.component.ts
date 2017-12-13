import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SportfestService } from '../../sportfest.service';
import { Disziplin, DisziplinService as DisziplinApi } from 'sportfest-api';

@Component({
  selector: 'app-activate-discipline',
  templateUrl: './activate-discipline.component.html',
  styleUrls: ['./activate-discipline.component.css']
})
export class ActivateDisciplineComponent implements OnInit {

  disziplinen: Disziplin[] = [];

  constructor(private disziplinApi: DisziplinApi,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.disziplinLaden();
  }

  public disziplinLaden() {
    this.disziplinApi.disziplinGet().subscribe((data: Disziplin[]) => {
      this.disziplinen = data;
      if (!this.disziplinen) {
        this.disziplinen = [];
      }
      this.disziplinen.forEach(element => {
        if (element.regeln == null) {
          element.regeln = "";
        }
      });
    },
      (err) => {
        console.error('GET-Service "disziplinNEU()" not reachable.');
      });
  }

  public save(dis: Disziplin) {
    this.disziplinApi.disziplinDidPost(dis.id, dis).subscribe(data => {
    },
      (err) => {
        console.error('POST-Service "disziplinAendernNEU()" not reachable.');
      });
  }

  public editDiscipline(dis: Disziplin) {
    this.router.navigate(['/createDisciplineNew/' + dis.id]);
  }

  public deleteDiscipline(dis: Disziplin) {
    this.disziplinApi.disziplinDidDelete(dis.id).subscribe(
      (data) => {
        console.log(data);
        this.disziplinLaden();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
