import { string } from '@tsed/schema';
import { Entity } from './index';
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';

export enum RoleFields {
  id = 'id',
  role = 'role',
};

/**
* Classe entité
*/
export class Role implements Entity {
  
  /** ----------------------| propriétés de l'entité          */
  //protected id: number;
  protected data = {};
  protected enumFields = RoleFields;
  
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
    return this.data[RoleFields.role];
  }
  
}


export class RoleBuilder extends Role {
  private builderData : {field:string, value:any}[] = [];
  
  constructor() {
    super();
  }

  /** !!! build !!! */
  public build() : Role {
    const user = new Role();
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
  public setRole(role: string) {
    this.builderData.push({
      field: this.enumFields.role,
      value: role
    });
    return this;
  }  
  
}