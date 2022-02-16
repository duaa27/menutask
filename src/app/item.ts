import { Subitem } from "./subitem";

export interface Item {
  id: number;
  link: string;
  name: string;
  subitems:Subitem[]
}
