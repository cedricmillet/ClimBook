import { UserBuilder, User, UserFields } from '../entities/user.entity';
import { DAO, DBManager } from './index';


export class DAO_Utilisateur extends DAO<User> {
  
  constructor() {
    super("INSERT INTO utilisateurs(id_role,pseudo,mdp,email) VALUES ($1,$2,$3,$4)",
          "UPDATE utilisateurs SET id_role=$1,pseudo=$2,mdp=$3,email=$4 WHERE id=$5");
  }

  /**
   * Retourne le nom de la table SQL
   */
  public getTableName = (): string => "utilisateurs";

  /**
   * Retourne toutes les propriétés de l'entitée données à l'exeption de son ID
   */
  protected getEntityValues(user: User) {
    return [
      user.get(UserFields.roleId),
      user.get(UserFields.pseudo),
      user.get(UserFields.mdp),
      user.get(UserFields.email),
    ];
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): User {
    const user : User = new UserBuilder()
      .setId(resultSet['id'])
      .setRoleId(resultSet['id_role'])
      .setPseudo(resultSet['pseudo'])
      .setMdp(resultSet['mdp'])
      .setEmail(resultSet['email'])
      .build();
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


}