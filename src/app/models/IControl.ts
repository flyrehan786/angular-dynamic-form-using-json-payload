import { IValidator } from "./IValidator";
import { Types } from "../enums/Types";
import { IDropdownOption } from "./IDropdownOption";
export interface IControl {
  type: Types
  label: string;
  name: string;
  value: string;
  dropdownOptions?: IDropdownOption[],
  validators: IValidator;
}


