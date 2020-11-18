import { UserBuilder, User } from '../entities/user.entity';
import { DAO, DBManager } from './index';


export class DAO_Utilisateur extends DAO<User> {
  
  constructor() {
    super("INSERT INTO utilisateurs(id_role,pseudo,mdp,email) VALUES ($1,$2,$3,$4)",
          "UPDATE utilisateurs SET id_role=$1,pseudo=$2,mdp=$3,email=$4 WHERE id=$5");
  }

  public getTableName = (): string => "utilisateurs";

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

  /** ok */
  public async insert(usr: User): Promise<number> {
    this.setPreparedValues([
      usr.getRoleId(),
      usr.getPseudo(),
      usr.getMdp(), /** à hacher par la suite.... */
      usr.getEmail()
    ]);
    return super.insert(usr);
  }

  /** a tester */
  public async update(usr: User): Promise<number> {
    this.setPreparedValues([
      usr.getRoleId(),
      usr.getPseudo(),
      usr.getMdp(), /** à hacher par la suite.... */
      usr.getEmail(),
      usr.getId()
    ]);
    return super.update(usr);
  }


}