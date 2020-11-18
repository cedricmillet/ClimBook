import { Entity } from './index';

/**
* Classe entité
*/
export class User implements Entity {
  
  /** ----------------------| propriétés de l'entité          */
  protected id: number;
  protected roleId: number;
  protected pseudo: string;
  protected mdp: string;
  protected email: string;
  
  /** ----------------------| getters publics                 */
  getId = () => this.id;
  getRoleId = () => this.roleId;
  getEmail = () => this.email;
  getPseudo = () => this.pseudo;
  getMdp = () => this.mdp;
  
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

  
  constructor() {
    super();
  }

  /** propriétés de l'entité */
  public setId(id: number) {
    super.id = id;
    return this;
  }
  public setEmail(email: string) {
    this.email = email;
    return this;
  }
  public setPseudo(pseudo:string) {
    this.pseudo = pseudo;
    return this;
  }
  public setMdp(mdp:string) {
    this.mdp = mdp;
    return this;
  }
  public setRoleId(roleId: number) {
    this.roleId = roleId;
    return this;
  }
  
  /** !!! build !!! */
  public build() : User {
    return <User>this;
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