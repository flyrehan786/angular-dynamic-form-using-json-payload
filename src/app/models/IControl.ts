import { IValidator } from "./IValidator";

export interface IControl {
  label: string;
  name: string;
  value: string;
  validators: IValidator;
}
