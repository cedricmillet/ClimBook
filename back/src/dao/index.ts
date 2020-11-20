import * as chalk from "chalk";
import { Entity } from "../entities";
import { config } from "../cfg/config";
const { Pool, Client } = require('pg'); // https://node-postgres.com/features/queries

export class DBManager {

  private static pool;
  private static dbCredentials = {
    host: process.env.API_DB_HOST || config.DB.HOST,
    port: process.env.API_DB_PORT || config.DB.PORT,
    user: process.env.API_DB_USER || config.DB.USER,
    password: process.env.API_DB_PASS || config.DB.PASS,
    database: process.env.API_DB_DATABASE || config.DB.DATABASE
  }
  
  /**
   * Etablir la connexion DB
   */
  public static connect(): Promise<boolean> {
    return new Promise((res, reject) => {
      this.pool = new Pool(this.dbCredentials);
      this.pool.connect()
        .then(() => {
          console.log(chalk.inverse.green("CONNEXION DATABASE : SUCCESS"))
          res(true)
        })
        .catch((err) => {
          this.pool = null;
          console.log(chalk.inverse.red("CONNEXION DATABASE : ERROR : ", err));
          reject(new Error("Erreur connexion database : " + err.stack));
        })
    });
  }

  /**
   * Retourne le pool DB commun
   */
  public static getPool() {
    if (!this.pool) throw "Veuillez etablir une connexion valide à la db avant de recuperer un pool de connexion.";
    return this.pool;
  }
}



export abstract class DAO<E extends Entity> {
  readonly persistQuery: string;
  readonly updateQuery: string;
  private nextQueryValues: (string|number)[] = [];

  constructor(persistQuery: string, updateQuery: string) {
    this.persistQuery = persistQuery;
    this.updateQuery = updateQuery;
  }

  
  /**
   * Retourne une entité par son id
   */
  public async getById(id:number, returnsEntity:boolean=true): Promise<E> {
    try {
      const query: string = `SELECT * FROM ${this.getTableName()} WHERE id=$1`;
      const values = [id];
      const pool = DBManager.getPool();
      const result = await pool.query(query, values);
      if (returnsEntity)
        return <E>this.resultSet2Entities(result.rows[0]);
      else return result.rows[0];
    } catch (err) {
      throw new Error("AbstractDAO error = "+err);
    }
  }

  /**
   * Retourne toutes les entités de la table
   */
  public async getAll(returnsEntity:boolean=true): Promise<E[]> {
    try {
      const q: string = `SELECT * FROM ${this.getTableName()}`;
      const pool = DBManager.getPool();
      const result = await pool.query(q);
      if (returnsEntity)
        return <E[]>this.resultSet2Entities(result.rows);
      else return result.rows;
    } catch (err) {
      throw new Error("AbstractDAO error = "+err);
    }
  }

  /**
   * Insérer une entité dasn sa table
   * Retourne l'id de la ligne insérée
   */
  public async insert(e : E): Promise<E> {
    try {
      const query: string = `${this.persistQuery} RETURNING id`;
      const values = this.nextQueryValues;
      const pool = DBManager.getPool();
      const result = await pool.query(query, values);
      const insertId = result.rows[0].id;
      return await this.getById(insertId);
    } catch (err) {
      throw new Error("AbstractDAO error = "+ err);
    }
  }

  /**
   * Insérer une entité dasn sa table
   * Retourne l'id de la ligne insérée
   */
  public async update(e : E): Promise<any> {
    try {
      const query: string = this.updateQuery;
      const values = this.nextQueryValues;
      const pool = DBManager.getPool();
      const result = await pool.query(query, values);
      return result;
    } catch (err) {
      throw new Error("AbstractDAO error = "+ err);
    }
  }

  /**
   * Supprimer une entité
   */
  public async delete(id : number): Promise<boolean> {
    try {
      const query: string = `DELETE FROM ${this.getTableName()} WHERE id=$1`;
      const values = [id];
      const pool = DBManager.getPool();
      const result = await pool.query(query, values);
      return result.rowCount==1;
    } catch (err) {
      throw new Error("AbstractDAO error = "+ err);
    }
  }


  /**
   * Convertir un jeu de résultat BDD en une instance d'entité valide
   * @param resultSet 
   */
  private resultSet2Entities(resultSet) : E|E[] {
    if (!resultSet) return null;
    if (!(resultSet instanceof Array)) return this.fromResultSet(resultSet);
  
    const entityArray: E[] = resultSet.map((singleRSet) => {
      if (!(singleRSet instanceof Array)) return <E>this.resultSet2Entities(singleRSet);
      else throw new Error('resultSet2Entities() tableaux entites a 2 dimensions non implemente.');
    });
    
    return entityArray;
  }

  
  protected setPreparedValues = (valuesArr: (string|number)[]) => this.nextQueryValues = valuesArr;

  /** Methodes des classes enfants */
  public abstract getTableName(): string;
  protected abstract fromResultSet(resultSet: any): E;
  protected abstract getEntityValues(e: E) : any[];
}

