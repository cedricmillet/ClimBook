import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ecran-progression',
  templateUrl: './ecran-progression.component.html',
  styleUrls: ['./ecran-progression.component.css']
})
export class EcranProgressionComponent implements OnInit {
  dernieresAscensions = [];


  canvas: any;
  ctx: any;

  constructor(private api : ApiService, private user: UserService) { }
  
  ngOnInit(): void {

    this.laodProgression();

  }

  async laodProgression() {
    const uid: number = this.user.data.id;
    const url = this.api.get_uri(`/progression/${uid}`);
    this.dernieresAscensions = <any>await this.api.http_get(url);
    console.log(this.dernieresAscensions)
    this.loadGraphDernieresAscensions();
  }


  loadGraphDernieresAscensions() {
    
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['USA', 'Spain', 'Italy', 'France', 'Germany', 'UK', 'Turkey', 'Iran', 'China', 'Russia', 'Brazil', 'Belgium', 'Canada', 'Netherlands', 'Switzerland', 'India', 'Portugal', 'Peru', 'Ireland', 'Sweden'],
        datasets: [{
          label: 'Total cases.',
          data: [886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773, 50036, 42797, 42110, 35729, 28496, 23502, 22353, 20914, 17607, 16755],
          backgroundColor: ['red', , , , , , , , 'orange'],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: false,
        display: true
      }
    });
  }

}
