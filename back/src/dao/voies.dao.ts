import { DAO, DBManager } from './index';
import { Voie, VoieBuilder, VoieFields } from '../entities/voie.entity';


export class DAO_Voie extends DAO<Voie> {
  
  constructor() {
    super("INSERT INTO voies(id_niveau,datev,nom) VALUES ($1,$2,$3)",
          "UPDATE voies SET id_niveau=$1,datev=$2,nom=$3 WHERE id=$4");
  }

  /**
   * Retourne le nom de la table SQL
   */
  public getTableName = (): string => "voies";

  /**
   * Retourne toutes les propriétés de l'entitée données à l'exeption de son ID
   */
  protected getEntityValues(e: Voie) {
    return [
      e.get(VoieFields.id_niveau),
      e.get(VoieFields.datev),
      e.get(VoieFields.nom)
    ];
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): Voie {
    const e = new VoieBuilder()
      .setId(resultSet['id'])
      .setIdNiveau(resultSet['id_niveau'])
      .setDate(resultSet['datev'])
      .setNom(resultSet['nom'])
      .build();
    return e;
  }

  /**
   * Insérer une entité en BDD
   */
  public async insert(e: Voie): Promise<Voie> {
    this.setPreparedValues(this.getEntityValues(e));
    return await super.insert(e);
  }

  /**
   * Mettre à jour une entité (à partir de son ID)
   */
  public async update(e: Voie): Promise<number> {
    const valuesWithID = this.getEntityValues(e).concat(e.getId());
    this.setPreparedValues(valuesWithID);
    return super.update(e);
  }


}