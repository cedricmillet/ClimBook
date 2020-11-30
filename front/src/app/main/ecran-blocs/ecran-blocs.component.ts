import { Component, OnInit } from '@angular/core';
import { VoieService } from '../../services/voie.service';
@Component({
  selector: 'app-ecran-blocs',
  templateUrl: './ecran-blocs.component.html',
  styleUrls: ['./ecran-blocs.component.css']
})
export class EcranBlocsComponent implements OnInit {

  public filters = [
    {key: 'idasc', name: 'Les plus récent'},
    {key: 'easy', name: 'Les plus faciles'},
  ];

  public voies;
  selectedBlock = null;
  selectedBlockClassement = [];
  selectedBlockAvg = null;

  constructor(private blocService: VoieService) { }

  ngOnInit(): void {
    this.refreshBlockList();
  }

  async refreshBlockList() {
    this.voies = await this.blocService.getAll();
    console.log(">> ", this.voies)
  }


  async selectBloc(bloc) {
    this.selectedBlock = bloc;
    this.selectedBlockClassement = null;
    this.selectedBlockAvg = null;

    this.selectedBlockAvg = await this.blocService.getTempsmoyen(bloc.id);
    this.selectedBlockClassement = await this.blocService.getBestGrimp(bloc.id);
  }
}
