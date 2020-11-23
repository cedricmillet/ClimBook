import { Exception } from "@tsed/exceptions";
import * as chalk from "chalk";
import { config } from "../cfg/config";
import { Entity } from '../entities/index';
const { Pool, Client } = require('pg'); // https://node-postgres.com/features/queries

/**
 * Classe abstraite, parent de toutes les DAO
 * A pour role d'autoconstruire les requetes INSERT,UPDATE,DELETE..
 */
export abstract class DAO<E extends Entity> {
  protected persistQuery: string;
  protected updateQuery: string;
  private nextQueryValues: (string | number)[] = [];

  /** */
  tableName: string;
  entityInstance: Entity;

  constructor(ent: Entity, tableName: string) {
    this.entityInstance = ent;
    this.tableName = tableName;
    this.generateQueries();
  }

  public getTableName = (): string => this.tableName;

  /**
   * Autogénère les requetes de persistence
   */
  private generateQueries(): void {
    /*if (e.fields.filter(f => f == 'id').length != 1)
      throw new Error(`colonne id manquante - Impossible de générer la DAO de l'entité ${JSON.stringify(e)}`);*/
    /** recup des colonnes de la table */
    const fields: string[] = Object.keys(this.entityInstance.fields).filter(i => i != 'id');
    const values: string[] = fields.map((field, i) => `$${i + 1}`);
    const table: string = this.tableName;
    /** contruction des requetes */
    const q = {
      persists: `INSERT INTO ${table}(${fields.join(',')}) VALUES (${values.join(',')})`,
      update: `UPDATE ${table} SET ${fields.map((field,i)=> `${field}=$${i+1}`).join(',')} WHERE id=$${fields.length+1}`
    }
    /** mise à jour */
    this.persistQuery = q.persists;
    this.updateQuery = q.update;
  }
  
  /**
   * Retourne une ligne par son id dans la table
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
   * Retourne toutes les lignes de la table
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
   * Insérer une ligne dans sa table
   * Retourne l'id de la ligne insérée
   */
  public async insert(e : E): Promise<E> {
    try {
      const query: string = `${this.persistQuery} RETURNING id`;
      const values = this.nextQueryValues;
      console.log(`${query} / ${values}`)
      const pool = DBManager.getPool();
      const result = await pool.query(query, values);
      const insertId = result.rows[0].id;
      return await this.getById(insertId);
    } catch (err) {
      throw new Error("AbstractDAO error = "+ err);
    }
  }

  /**
   * Mettre à jour une ligne à l'aide de son id
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
   * Supprimer une ligne (id)
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


  public async getByFieldValuePair(field:string, value:string) : Promise<Entity> {
    const query: string = `SELECT * FROM ${this.getTableName()} WHERE ${field}=$1 LIMIT 1`;
    const values = [value];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    return result.rows.length==1 ? this.fromResultSet(result.rows[0]) : null;
  }


  protected setPreparedValues = (valuesArr: (string|number)[]) => this.nextQueryValues = valuesArr;

  /** Methodes des classes enfants */
  protected abstract fromResultSet(resultSet: any): E;
  protected abstract getEntityValues(e: E) : any[];
}


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