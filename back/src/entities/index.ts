/**
 * Interface implantée par toutes les entités
 */
export interface IEntity {
  /** retourne l'id unique de l'entité */
  getId(): number;
  /** retourne toutes les données persistentes de l'entité */
  getData(): any;
}

/**
 * Entité persistente en BDD
 */
export abstract class Entity implements IEntity {
  protected data = {};
  public abstract getId(): number;
  public abstract get(field: string) : any;
  public abstract set(field: string, value: any) : void;
  public abstract getData();
  public abstract fields;


  public setCustom(customField: string, customData: any) {
    this.data[customField] = customData;
  }
}

/**
 * Builder d'entité
 */
export abstract class EntityBuilder<Builder extends Entity> {
  public abstract fromDataSet(dataset): Entity;
}

/*
  Exemple de build:

  const dataset = { "id": 12, difficulte: "superadmin", nom: "kldf", couleur:"violet" };
  const builder = new NiveauBuilder().fromDataSet(dataset);
  console.log(builder)
*/
