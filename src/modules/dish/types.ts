import { DataBase } from 'src/types';

export interface IDish extends DataBase {
  name: string;
  category: string;
  description: string;
  sell_price: number;
  feature: boolean;
  image: string;
}
