export interface IFormData {
  errors: any[];
  data: IDetails[];
}
interface IDetails {
  title: string,
  value: string,
  validated: boolean
}
