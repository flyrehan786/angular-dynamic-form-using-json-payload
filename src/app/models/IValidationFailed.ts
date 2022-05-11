export interface IValidationFailed {
  id: string;
  title: string;
  validatorName?: string;
  regex?: string;
  message: string;
}
