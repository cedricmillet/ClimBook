import { Entity, IEntity, EntityBuilder } from './index';

/**
 * Propriétés de l'entité
 */
export enum RoleFields {
  id = 'id',
  role = 'role',
};

/**
* Classe entité
*/
export class Role extends Entity implements IEntity {
  
 
  /** ----------------------| propriétés de l'entité          */
  protected data = {};
  public fields = RoleFields;

  
  /** ----------------------| getters / setters publics         */
  getId = () => this.data['id'];
  get = (field: RoleFields) => this.data[field];
  set = (field: RoleFields, value: any) => this.data[field] = value;
  getData = () => this.data;
  
  /** ----------------------| methodes spécifiques            */
  
  /**
  * Retourne le role de l'utilisateur
  */
  public getRoleName(): string {
    return this.data[this.fields.role];
  }
  
}


/**
 * Builder
 */
export class RoleBuilder extends Role implements EntityBuilder<Role>  {
  constructor() {
    super();
  }

  public fromDataSet(dataset: any) : Role {
    const e = new Role();
    for (let key in dataset) {
      if (this.fields[key]) e.set(this.fields[key], dataset[key]);
    }
    return e;
  }
}
