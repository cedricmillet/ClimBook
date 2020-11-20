import { Entity } from './index';
import { DAO_Voie } from '../dao/voies.dao';

export enum VoieFields {
  id = 'id',
  id_niveau = 'id_niveau',
  datev = 'datev',
  nom = 'nom'
};

/**
* Classe entité
*/
export class Voie implements Entity {
  
  /** ----------------------| propriétés de l'entité          */
  //protected id: number;
  protected data = {};
  protected enumFields = VoieFields;
  
  /** ----------------------| getters / setters publics         */
  getId = () => this.data['id'];
  get = (field: VoieFields) => this.data[field];
  set = (field: VoieFields, value: any) => this.data[field] = value;
  getData = () => this.data;
  
  /** ----------------------| methodes spécifiques            */
  
  public getIdNiveau(): number {
    return this.data[this.enumFields.id_niveau];
  }
  public getDate(): string {
    return this.data[this.enumFields.datev];
  }
  public getNom(): string {
    return this.data[this.enumFields.nom];
  }
  
}


export class VoieBuilder extends Voie {
  private builderData : {field:string, value:any}[] = [];
  
  constructor() {
    super();
  }

  /** !!! build !!! */
  public build() : Voie {
    const user = new Voie();
    this.builderData.forEach(prop => user.set(this.enumFields[prop.field], prop.value));
    return user;
  }

  /** propriétés de l'entité */
  public setId(id: number) {
    this.builderData.push({
      field: this.enumFields.id,
      value: id
    });
    return this;
  }  
  public setIdNiveau(idNiv: number) {
    this.builderData.push({
      field: this.enumFields.id_niveau,
      value: idNiv
    });
    return this;
  }
  public setDate(datev: string) {
    this.builderData.push({
      field: this.enumFields.datev,
      value: datev
    });
    return this;
  }
  public setNom(nom: string) {
    this.builderData.push({
      field: this.enumFields.nom,
      value: nom
    });
    return this;
  }
  
}