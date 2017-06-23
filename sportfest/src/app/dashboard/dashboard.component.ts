import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
l: any;

  teilnehmer = [
    {
      name: 'FS161',
      value: 12,
      rang:1
    },
    {
      name: 'FV151',
      value: 12.5,
      rang:1
    },
    {
      name: 'FS152',
      value: 1,
      rang:1
    },
    {
      name: 'FS151',
      value: 123,
      rang:1
    },
    {
      name: 'FI152',
      value: 111,
      rang:1
    },
    {
      name: 'FI151',
      value: 12.5,
      rang:1
    }
  ];

  sorieterteTeilehmer: any;


  constructor(private router: Router) { }

  ngOnInit() {
    this.sortByRang(); 
    let i = 0;

    this.l = this.teilnehmer.length;
    while(i < this.l){
      this.teilnehmer[i].rang = i + 1;
      i++;
    }
    this.sorieterteTeilehmer=this.teilnehmer;
  }

  public sortByRang(){
    this.teilnehmer = this.teilnehmer.sort((n1,n2)=>{
      if(n1.value>n2.value){
        return -1;
      }
      if(n1.value<n2.value){
        return 1;
      }

      if(n1.value==n2.value){
        if(n1.name>n2.name){
          return 1;
        }

        if(n1.name<n2.name){
          return -1;
        }
      }
      return 0;
    });
  }

public sortByRangRev(){
    this.teilnehmer = this.teilnehmer.sort((n1,n2)=>{
      if(n1.value>n2.value){
        return 1;
      }
      if(n1.value<n2.value){
        return -1;
      }

      if(n1.value==n2.value){
        if(n1.name>n2.name){
          return -1;
        }

        if(n1.name<n2.name){
          return 1;
        }
      }
      return 0;
    });
  }


  public sortByKlasse(){
    this.teilnehmer = this.teilnehmer.sort((n1,n2)=>{
      if(n1.name>n2.name){
        return -1;
      }
      if(n1.name<n2.name){
        return 1;
      }
      return 0;
    });
  }

  public sortByKlasseRev(){
      this.teilnehmer = this.teilnehmer.sort((n1,n2)=>{
      if(n1.name>n2.name){
        return 1;
      }
      if(n1.name<n2.name){
        return -1;
      }
      return 0;
    });
  }

}
