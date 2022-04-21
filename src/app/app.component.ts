import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IControl } from './models/IControl';
import { IDynamicControl } from './models/IDynamicControl';
import { IValidationFailed } from './models/IValidationFailed';
import { IFormData } from './models/IFormData';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public  _FORM_ELEMENT  = '_df-dynamic-form' // Form Id;
  private _DIV_FORM_GROUP = '_df_div';  // DIV
  private _ID_FORM_GROUP  = '_df_fg';   // Form Group
  private _ID_FORM_CONTROL  = '_df_fc'; // Form Control
  private controlCounter = 10;
  private generatedControls: string[] = [];
  title = 'df-dynamic-form';
  constructor(private service: UserService) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let html = ``;
    const formElement: HTMLElement = document.getElementById(
      this._FORM_ELEMENT
    );
    if (formElement) {
      const dynamicControls: IDynamicControl = this.service.getDynamicControl();
      const controls: IControl[] = dynamicControls.controls;
      controls.forEach((control) => {
        const id = `_df_control_n_${this.controlCounter}`;
        html += `
        <div id="${id}${this._ID_FORM_GROUP}" class="${this._DIV_FORM_GROUP} form-group">
             <label for="">${control.label}</label>
             <input
               id="${id}${this._ID_FORM_CONTROL}"
               type="text"
               name="${control.name}"
               ${control.validators.required ? 'required' : ''}
               _dynamic_control_validators="
                              ${control.validators.required  ? 'required:true'  : ''}"
               class="form-control">
        </div>
      `;
      this.controlCounter++;
      this.generatedControls.push(id);
    });
      html += `
        <button type="submit" class="mt-3 btn btn-primary">
          Submit
        </button>`;
      formElement.innerHTML = html;
    } else console.log('No form element found.');
  }
  submit() {
    const element: HTMLCollectionOf<Element> = document.getElementsByClassName(
      this._DIV_FORM_GROUP
    );
    if (element.length > 0) {
      let extracted: IFormData = this.extract(element);
      if(extracted.error.length > 0) {
        console.log('Form Validation Failed.');
        console.log(extracted.error);
      } else console.log('Form Validation Succesfull.')
    }
    else console.log('No element found.');
  }
  private extract(elements: HTMLCollectionOf<Element>) {
    let extracted:IFormData = { error: [], data: [] };
    if(this.generatedControls.length === elements.length) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const controlParentDIV = this.generatedControls[i] + this._ID_FORM_GROUP;
        if(element.id === controlParentDIV) {
          const inputElement: HTMLElement = document.getElementById(this.generatedControls[i] + this._ID_FORM_CONTROL);
          const validators = inputElement.getAttribute('_dynamic_control_validators');
          const splited = validators.split(',');
          const analyzed: IValidationFailed[] = this.analyze(splited, inputElement['value'], inputElement.getAttribute('name'));
          if(analyzed.length > 0) {
            extracted.error.push(analyzed);
          } else {
            extracted.data.push({
              title: inputElement.getAttribute('name'),
              value: inputElement['value'],
              validated: true
            })
          }
        } else console.log('Invalid dom-element id')
      }
    } else console.log('Invalid dynamically-generated-controls info');

    return extracted;
  }
  private analyze(validators: string[], value: string, title: string) {
    let description: IValidationFailed[] = []
    if(validators.length > 0) {
      validators.forEach(v => {
        const trimmed = v.trim();
        const splited = trimmed.split(':');
        if(splited.length === 2) {
          if(JSON.parse(splited[1]) === true) {
            if(value.length < 1) {
              description.push({
                title: title,
                validatorName: splited[0],
                message: `validation failed. (${splited[0]})`
              });
            } else {}
          }
        }
      });
    } else console.log('validator length is < 1');
    return description;
  }
}
