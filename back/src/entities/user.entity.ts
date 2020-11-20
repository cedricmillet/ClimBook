import { string } from '@tsed/schema';
import { Entity } from './index';
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { Role } from './role.entity';
import { DAO_Role } from '../dao/roles.dao';

export enum UserFields {
  id = 'id',
  roleId = 'roleId',
  pseudo = 'pseudo',
  mdp = 'mdp',
  email = 'email',
};

/**
* Classe entité
*/
export class User implements Entity {
  
  /** ----------------------| propriétés de l'entité          */
  //protected id: number;
  protected data = {};
  private role: Role;
  
  /** ----------------------| getters / setters publics         */
  getId = () => this.data['id'];
  get = (field: UserFields) => this.data[field];
  set = (field: UserFields, value: any) => this.data[field] = value;
  getData = () => this.data;
  
  /** ----------------------| methodes spécifiques            */
  
  /**
  * Retourne le role de l'utilisateur
  */
  public async getRole(): Promise<Role> {
    const roleId: number = this.get(UserFields.roleId);
    const role: Role = await new DAO_Role().getById(roleId);
    return role;
  }
  
}


export class UserBuilder extends User {
  private builderData : {field:string, value:any}[] = [];

  constructor() {
    super();
  }

  /** !!! build !!! */
  public build() : User {
    const user = new User();
    this.builderData.forEach(prop => user.set(UserFields[prop.field], prop.value));
    return user;
  }

  /** propriétés de l'entité */
  public setId(id: number) {
    this.builderData.push({
      field: UserFields.id,
      value: id
    });
    return this;
  }
  public setEmail(email: string): UserBuilder {
    this.builderData.push({
      field: UserFields.email,
      value: email
    });
    return this;
  }
  public setPseudo(pseudo:string) {
    this.builderData.push({
      field: UserFields.pseudo,
      value: pseudo
    });
    return this;
  }
  public setMdp(mdp:string) {
    this.builderData.push({
      field: UserFields.mdp,
      value: mdp
    });
    return this;
  }
  public setRoleId(roleId: number) {
    this.builderData.push({
      field: UserFields.roleId,
      value: roleId
    });
    return this;
  }
  
  
}

/**
* Classe utilitaire
*/
export class Users {
  
  public static async login(login: string, pass: string): Promise<User> {
    const user = await new DAO_Utilisateur().login(login, pass);
    return user;
  }
}