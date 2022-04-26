import { IValidator } from "./IValidator";
import { Types } from "../enums/Types";
import { IDropdownOption } from "./IDropdownOption";
import { IRadioButtonOptions } from "./IRadioButtonOptions";
export interface IControl {
  type: Types
  label: string;
  name: string;
  value: string;
  dropdownOptions?: IDropdownOption[],
  radioButtonOptions?: IRadioButtonOptions,
  bootstrapColSize?: string,
  validators: IValidator,
}


