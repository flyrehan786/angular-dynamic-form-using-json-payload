export interface IFormData {
  errors: any[];
  data: IDetails[];
}
interface IDetails {
  id: string,
  title: string,
  value: string,
  validated: boolean
}
