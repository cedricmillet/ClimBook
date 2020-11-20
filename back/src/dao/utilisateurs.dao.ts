import { UserBuilder, User, UserFields } from '../entities/user.entity';
import { DAO, DBManager } from './index';


export class DAO_Utilisateur extends DAO<User> {
  
  constructor() {
    super(new User(), "utilisateurs");
  }


  /**
   * Retourne toutes les colonnes de l'entitée données à l'exeption de son ID
   */
  protected getEntityValues(e: User) {
    return Object.keys(e.fields).filter(i=>i!='id').map((field) => e.get(e.fields[field]));
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): User {
    const user: User = new UserBuilder().fromDataSet(resultSet);
    return user;
  }

  /**
   * Insérer une entité en BDD
   */
  public async insert(usr: User): Promise<User> {
    this.setPreparedValues(this.getEntityValues(usr));
    return await super.insert(usr);
  }

  /**
   * Mettre à jour une entité (à partir de son ID)
   */
  public async update(usr: User): Promise<number> {
    const valuesWithID = this.getEntityValues(usr).concat(usr.getId());
    this.setPreparedValues(valuesWithID);
    return super.update(usr);
  }

  /**
   * ----------------------------------------------------------------
   *        DAO SPECIFIQUES AUX UTILISATEURS
   * ----------------------------------------------------------------
   */
  public async login(login:string, pass:string): Promise<User|null> {
    const query: string = `SELECT * FROM ${this.getTableName()} WHERE pseudo=$1 AND mdp=crypt($2, mdp) LIMIT 1`;
    const values = [login, pass];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    return result.rows.length==1 ? this.fromResultSet(result.rows[0]) : null;
  }


}