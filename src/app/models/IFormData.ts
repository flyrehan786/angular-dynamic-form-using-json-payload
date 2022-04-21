export interface IFormData {
  error: any[];
  data: IDetails[];
}
interface IDetails {
  title: string,
  value: string,
  validated: boolean
}
