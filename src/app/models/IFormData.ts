export interface IFormData {
  formIsValid?: boolean;
  errors: any[];
  data: IDetails[];
}
interface IDetails {
  id: string;
  title: string;
  value: string;
  validated: boolean;
}
