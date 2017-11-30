import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DisziplinNEU } from '../../interfaces';
import { SportfestService } from '../../sportfest.service';

@Component({
  selector: 'app-activate-discipline',
  templateUrl: './activate-discipline.component.html',
  styleUrls: ['./activate-discipline.component.css']
})
export class ActivateDisciplineComponent implements OnInit {

  disziplinen: DisziplinNEU[]=[];

  constructor(private sfService: SportfestService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.disziplinLaden();
  }
  
  public disziplinLaden(){
    this.sfService.disziplinenNEU().subscribe((data: DisziplinNEU[]) => {
        this.disziplinen=data;
        if (!this.disziplinen) {
          this.disziplinen = [];
        }
        this.disziplinen.forEach(element => {
        if(element.regel==null){
        element.regel={script:""};
         }
      });
      },
      (err) => {
        console.error('GET-Service "disziplinNEU()" not reachable.');
      });
  }
  
  public save(dis:DisziplinNEU) {
    this.sfService.disziplinAendernNEU(dis).subscribe(data => {
        
      },
      (err) => {
        console.error('POST-Service "disziplinAendernNEU()" not reachable.');
      });
  }
  
  public editDiscipline(dis: DisziplinNEU) {
    this.router.navigate(['/createDisciplineNew/' + dis.id]);
  }
  
  public deleteDiscipline(dis: DisziplinNEU) {
    this.sfService.disziplinLoeschen(dis.id).subscribe(
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
