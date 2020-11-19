import { Role, RoleFields, RoleBuilder } from '../entities/role.entity';
import { DAO, DBManager } from './index';


export class DAO_Role extends DAO<Role> {
  
  constructor() {
    super("INSERT INTO roles(id, role) VALUES ($1,$2)",
          "UPDATE roles SET role=$1 WHERE id=$2");
  }

  /**
   * Retourne le nom de la table SQL
   */
  public getTableName = (): string => "roles";

  /**
   * Retourne toutes les propriétés de l'entitée données à l'exeption de son ID
   */
  protected getEntityValues(role: Role) {
    return [
      role.get(RoleFields.id),
      role.get(RoleFields.role),
    ];
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): Role {
    const role : Role = new RoleBuilder()
      .setId(resultSet['id'])
      .setRole(resultSet['role'])
      .build();
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