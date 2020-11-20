export interface Entity {
  /** retourne l'id unique de l'entité */
  getId(): number;
  /** retorune toutes les données persistentes de l'entité */
  getData(): any;
}