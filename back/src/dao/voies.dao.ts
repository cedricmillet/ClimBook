import { DAO, DBManager } from './index';
import { Voie, VoieBuilder, VoieFields } from '../entities/voie.entity';


export class DAO_Voie extends DAO<Voie> {
  
  constructor() {
    super(new Voie(), "voies");
  }

  /**
   * Retourne toutes les colonnes de l'entitée données à l'exeption de son ID
   */
  protected getEntityValues(e: Voie) {
    return Object.keys(e.fields).filter(i=>i!='id').map((field) => e.get(e.fields[field]));
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): Voie {
    const e = new VoieBuilder().fromDataSet(resultSet);
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