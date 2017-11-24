import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Disziplin } from '../../interfaces';
import { SportfestService } from '../../sportfest.service';

@Component({
  selector: 'app-activate-discipline',
  templateUrl: './activate-discipline.component.html',
  styleUrls: ['./activate-discipline.component.css']
})
export class ActivateDisciplineComponent implements OnInit {

  disziplinen: Disziplin[]=[];

  constructor(private sfService: SportfestService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.disziplinLaden();
  }
  
  public disziplinLaden(){
    this.sfService.disziplinen().subscribe((data: Disziplin[]) => {
        this.disziplinen=data;
        if (!this.disziplinen) {
          this.disziplinen = [];
        }
        this.disziplinen.forEach(element => {
        if(element.regeln==null){
        element.regeln=[];
         }
      });
      },
      (err) => {
        console.error('GET-Service "disziplin()" not reachable.');
      });
  }
  
  public save(dis:Disziplin) {
    this.sfService.disziplinAendern(dis.did, dis).subscribe(data => {
        
      },
      (err) => {
        console.error('POST-Service "disziplinAendern()" not reachable.');
      });
  }
  
  public editDiscipline(dis: Disziplin) {
    this.router.navigate(['/createDisciplineNew/' + dis.did]);
  }
  
  public deleteDiscipline(dis: Disziplin) {
    this.sfService.deleteDisziplin(dis.did).subscribe(
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
