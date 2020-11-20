import { DAO, DBManager } from './index';
import { Voie, VoieBuilder, VoieFields } from '../entities/voie.entity';
import { Niveau, NiveauBuilder } from '../entities/niveau.entity';


export class DAO_Niveau extends DAO<Niveau> {
  
  constructor() {
    super(new Niveau(), "niveaux");
  }

  /**
   * Retourne toutes les colonnes de l'entitée données à l'exeption de son ID
   */
  protected getEntityValues(e: Niveau) {
    return Object.keys(e.fields).filter(i=>i!='id').map((field) => e.get(e.fields[field]));
  }

  /**
   * Retourne l'entité à partir d'un jeu de réponse SQL
   * @param resultSet jeu de réponse SQL
   */
  protected fromResultSet(resultSet: any): Niveau {
    const e = new NiveauBuilder().fromDataSet(resultSet);
    return e;
  }

  /**
   * Insérer une entité en BDD
   */
  public async insert(e: Niveau): Promise<Niveau> {
    this.setPreparedValues(this.getEntityValues(e));
    return await super.insert(e);
  }

  /**
   * Mettre à jour une entité (à partir de son ID)
   */
  public async update(e: Niveau): Promise<number> {
    const valuesWithID = this.getEntityValues(e).concat(e.getId());
    this.setPreparedValues(valuesWithID);
    return super.update(e);
  }

}