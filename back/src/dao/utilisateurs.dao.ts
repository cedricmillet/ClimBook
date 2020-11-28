import { Roles } from '../entities/role.entity';
import { UserBuilder, User, UserFields } from '../entities/user.entity';
import { DAO, DBManager } from './index';


export class DAO_Utilisateur extends DAO<User> {
  
  constructor() {
    super(new User(), "utilisateurs");
  }


  /**
   * Retourne toutes les propriétés de l'entitée données à l'exeption de son ID
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
    const query: string = `SELECT * FROM ${this.getTableName()} WHERE (pseudo=$1 AND mdp=crypt($2, mdp)) OR (email=$1 AND mdp=crypt($2, mdp)) LIMIT 1`;
    const values = [login, pass];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    return result.rows.length==1 ? this.fromResultSet(result.rows[0]) : null;
  }
  
  public async register(data, role="client"): Promise<boolean | null> {
    const clientRole = await Roles.getRoleByName(role);
    if (!clientRole) throw "utilisateur.dao - Impossible de trouver le role cible";

    const query: string = `INSERT INTO ${this.getTableName()} (id_role,pseudo,mdp,email,isabonne) VALUES ($1,$2,crypt($3, gen_salt('bf')),$4,$5)`;
    const values = [clientRole.getId(), data.pseudo, data.mdp, data.email, data.isabonne];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    console.log(result)
    return result.rowCount == 1 ? true : false;
  }


  public async updatePassword(userId:number, newPassword:string): Promise<boolean | null> {
    const query: string = `UPDATE ${this.getTableName()} SET mdp=crypt($1, gen_salt('bf')) WHERE id=$2`;
    const values = [newPassword, userId];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    console.log(result)
    return result.rowCount == 1 ? true : false;
  }


  public async getByFieldValuePair(field:string, value:any) {
    return await super.getByFieldValuePair(field, value);
  }

}