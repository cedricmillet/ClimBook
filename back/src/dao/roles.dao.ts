import { Role, RoleFields, RoleBuilder } from '../entities/role.entity';
import { DAO, DBManager } from './index';


export class DAO_Role extends DAO<Role> {
  
  constructor() {
    super(new Role(), "roles");
  }

  /**
   * Retourne toutes les colonnes de l'entitée données à l'exeption de son ID
   */
  public getEntityValues(e: Role) {
    return Object.keys(e.fields).filter(i=>i!='id').map((field) => e.get(e.fields[field]));
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): Role {
    const role: Role = new RoleBuilder().fromDataSet(resultSet);
    return role;
  }

  /**
   * Insérer une entité en BDD
   */
  public async insert(e: Role): Promise<Role> {
    this.setPreparedValues(this.getEntityValues(e));
    return await super.insert(e);
  }

  /**
   * Mettre à jour une entité (à partir de son ID)
   */
  public async update(e: Role): Promise<number> {
    const valuesWithID = this.getEntityValues(e).concat(e.getId());
    this.setPreparedValues(valuesWithID);
    return super.update(e);
  }
}