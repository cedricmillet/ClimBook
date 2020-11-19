import { string } from '@tsed/schema';
import { Entity } from './index';

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
  
  /** ----------------------| getters / setters publics         */
  getId = () => this.data['id'];
  get = (field: UserFields) => this.data[field];
  set = (field: UserFields, value: any) => this.data[field] = value;
  
  /** ----------------------| methodes spécifiques            */
  
  /**
  * Retourne le role de l'utilisateur
  */
  public getRole(): string {
    return "admin";
  }
  
  /**
  * Vérifie que le mot de passe haché stocké en bdd correspond à un mdp donné en clair
  * @param password Mot de passe en clair
  */
  public verifyPassword(password:string) : boolean {
    return true;
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
  
  public static find(login: string, pass: string): Promise<User> {
    return new Promise((res, reject) => {
      // reject(new Error("Introuvable"))
      res(new User());
    });
  }
  
  public static findByID(userID: number) {
    return new User();
  }
  
  /**
  * 
  * @param sessionData 
  */
  public static fromSession(sessionData: any) : User {
    if (!sessionData.id) return null;
    return Users.findByID(sessionData.id);
  }
}