/**
 * Classe entité
 */
export class User {
  
  public password: string;
  public name: string;

  constructor(name: string, pass: string) {
    this.password = pass;
    this.name = name;
  }

  public verifyPassword() : boolean {
    return true;
  }
}

/**
 * Classe utilitaire
 */
export class Users {
  public find(credentials): User {
    return new User("cedric", "1234");
  }
}