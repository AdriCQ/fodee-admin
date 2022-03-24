import { DataBase } from 'src/types';

export interface IEvent extends DataBase {
  date: string;
  title: string;
  description: string;
  enable: boolean | number;
}
