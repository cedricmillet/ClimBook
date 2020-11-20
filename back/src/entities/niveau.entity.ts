import { Entity, IEntity, EntityBuilder } from './index';

/**
 * Propriétés de l'entité
 */
export enum NiveauFields {
  id = 'id',
  difficulte = 'difficulte',
  nom = 'nom',
  couleur = 'couleur',
};

/**
* Classe entité
*/
export class Niveau extends Entity implements IEntity {
 
  /** ----------------------| propriétés de l'entité          */
  protected data = {};
  public fields = NiveauFields;

  /** ----------------------| getters / setters publics         */
  getId = () => this.data['id'];
  get = (field: NiveauFields) => this.data[field];
  set = (field: NiveauFields, value: any) => this.data[field] = value;
  getData = () => this.data;
  
  /** ----------------------| methodes spécifiques            */ 
  
  
}


/**
 * Builder
 */
export class NiveauBuilder extends Niveau implements EntityBuilder<Niveau>  {
  constructor() { super();  }

  public fromDataSet(dataset: any) : Niveau {
    const e = new Niveau();
    for (let key in dataset) {
      if (this.fields[key]) e.set(this.fields[key], dataset[key]);
    }
    return e;
  }
}
