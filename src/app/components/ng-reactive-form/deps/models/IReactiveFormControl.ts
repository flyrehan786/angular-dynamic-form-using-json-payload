import { IOptions } from './IOptions';
export interface IReactiveFormControl {
  label: string;
  type: string;
  options: IOptions[];
  regex?: string;
}
