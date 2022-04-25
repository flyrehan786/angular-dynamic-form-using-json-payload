import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Types } from 'src/app/enums/Types';
import { IControl } from 'src/app/models/IControl';
import { IDynamicControl } from 'src/app/models/IDynamicControl';
import { IFormData } from 'src/app/models/IFormData';
import { IValidationFailed } from 'src/app/models/IValidationFailed';
@Component({
  selector: 'ng-dynamic-form-control',
  templateUrl: './ng-dynamic-form-control.component.html',
  styleUrls: ['./ng-dynamic-form-control.component.css'],
})
export class NgDynamicFormControlComponent implements OnInit {
  @Input() input_dynamicControls: IDynamicControl;
  @Output() onSubmit = new EventEmitter();
  public _FORM_ELEMENT = '_df-dynamic-form'; // Form Id;
  private _DIV_FORM_GROUP = '_df_div'; // DIV
  private _ID_FORM_GROUP = '_df_fg'; // Form Group
  private _ID_FORM_CONTROL = '_df_fc'; // Form Control
  private controlCounter = 10;
  private generatedControls: string[] = [];
  title = 'df-dynamic-form';
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let html = ``;
    const formElement: HTMLElement = document.getElementById(
      this._FORM_ELEMENT
    );
    if (formElement) {
      const dynamicControls: IDynamicControl = this.input_dynamicControls;
      const controls: IControl[] = dynamicControls.controls;
      controls.forEach((control) => {
        if (control.type === Types.Textbox) {
          const id = `_df_control_n_${this.controlCounter}`;
          html += `
          <div id="${id}${this._ID_FORM_GROUP}" class="${
            this._DIV_FORM_GROUP
          } form-group col-md-4">
              <label for="">${control.label}</label>
              <input
                id="${id}${this._ID_FORM_CONTROL}"
                type="text"
                name="${control.name}"
                ${control.validators.required ? 'required' : ''}
                _dynamic_control_validators="
                                ${
                                  control.validators.required
                                    ? 'required:true'
                                    : ''
                                }"
                class="form-control">
          </div>
        `;
          this.controlCounter++;
          this.generatedControls.push(id);
        } else if (control.type === Types.Dropdown) {
          let options = '<option value="" selected>Select</option>';
          const dropdownOptions = control.dropdownOptions;
          dropdownOptions.forEach((x) => {
            options += `<option value=${x.value}>${x.key}</option>`;
          });
          const id = `_df_control_n_${this.controlCounter}`;
          html += `
          <div id="${id}${this._ID_FORM_GROUP}" class="${
            this._DIV_FORM_GROUP
          } form-group col-md-4">
              <label for="">${control.label}</label>
              <select
                id="${id}${this._ID_FORM_CONTROL}"
                name="${control.name}"
                ${control.validators.required ? 'required' : ''}
                _dynamic_control_validators="
                                ${
                                  control.validators.required
                                    ? 'required:true'
                                    : ''
                                }"
                class="form-control"
              >
              ${options}
              </select>
          </div>
      `;
          this.controlCounter++;
          this.generatedControls.push(id);
        } else if (control.type === Types.Radio) {
          let radioButtons = '';
          const radioButtonOptions = control.radioButtonOptions;
          const id = `_df_control_n_${this.controlCounter}`;
          radioButtonOptions.values.forEach((x) => {
            radioButtons += `
              <input
                id="${id}${this._ID_FORM_CONTROL}"
                type='radio' 
                name=${control.name} 
                value=${x.value} 
                ${control.validators.required ? 'required' : ''}
                _dynamic_control_validators="
                                  ${
                                    control.validators.required
                                      ? 'required:true'
                                      : ''
                                  }"
              /> ${x.key} <br />
            `;
          });
          html += `
          <div id="${id}${this._ID_FORM_GROUP}" class="${this._DIV_FORM_GROUP} form-group col-md-4">
              <label for="">${control.label}</label>
              <br />
              ${radioButtons}
          </div>
        `;
          this.controlCounter++;
          this.generatedControls.push(id);
        } else if (control.type === Types.Checkbox) {
          let checkboxes = '';
          const id = `_df_control_n_${this.controlCounter}`;
            checkboxes += `
              <input
                id="${id}${this._ID_FORM_CONTROL}"
                type='checkbox' 
                name=${control.name} 
                value=${control.value} 
                ${control.validators.required ? 'required' : ''}
                _dynamic_control_validators="
                                  ${
                                    control.validators.required
                                      ? 'required:true'
                                      : ''
                                  }"
              /> ${control.label} <br />
            `;
          html += `
          <div id="${id}${this._ID_FORM_GROUP}" class="${this._DIV_FORM_GROUP} form-group col-md-4">
              <label for="">${control.label}</label>
              <br />
              ${checkboxes}
          </div>
        `;
          this.controlCounter++;
          this.generatedControls.push(id);
        } else {
        }
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
    if (element.length > 0) this.onSubmit.emit(this.extract(element));
    else console.log('No element found.');
  }
  private extract(elements: HTMLCollectionOf<Element>) {
    let extracted: IFormData = { error: [], data: [] };
    if (this.generatedControls.length === elements.length) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const controlParentDIV =
          this.generatedControls[i] + this._ID_FORM_GROUP;
        if (element.id === controlParentDIV) {
          const inputElement: HTMLElement = document.getElementById(
            this.generatedControls[i] + this._ID_FORM_CONTROL
          );
          const validators = inputElement.getAttribute(
            '_dynamic_control_validators'
          );
          if (
            inputElement['type'] === 'text' ||
            inputElement['type'] === 'select-one'
          ) {
            const splited = validators.split(',');
            const analyzed: IValidationFailed[] = this.analyze(
              splited,
              inputElement['value'],
              inputElement.getAttribute('name')
            );
            if (analyzed.length > 0) {
              extracted.error.push(analyzed);
            } else {
              extracted.data.push({
                title: inputElement.getAttribute('name'),
                value: inputElement['value'],
                validated: true,
              });
            }
          } else if (inputElement['type'] === 'radio') {
            const checked = document.querySelector(
              `input[name=${inputElement.getAttribute('name')}]:checked`
            );
            const value = (checked ) ? checked['value'] : undefined;
            const splited = validators.split(',');
            const analyzed: IValidationFailed[] = this.analyze(
              splited,
              value,
              inputElement.getAttribute('name')
            );
            if (analyzed.length > 0) {
              extracted.error.push(analyzed);
            } else {
              extracted.data.push({
                title: inputElement.getAttribute('name'),
                value: value,
                validated: true,
              });
            }
          } else if (inputElement['type'] === 'checkbox') {
            const checked = inputElement['checked'];
            const splited = validators.split(',');
            const analyzed: IValidationFailed[] = this.analyze(
              splited,
              checked,
              inputElement.getAttribute('name')
            );
            if (analyzed.length > 0) {
              extracted.error.push(analyzed);
            } else {
              extracted.data.push({
                title: inputElement.getAttribute('name'),
                value: checked,
                validated: true,
              });
            }

          }
        } else console.log('Invalid dom-element id');
      }
    } else console.log('Invalid dynamically-generated-controls info');
    return extracted;
  }
  private analyze(validators: string[], value: string, title: string) {
    let description: IValidationFailed[] = [];
    if (validators.length > 0) {
      validators.forEach((v) => {
        const trimmed = v.trim();
        const splited = trimmed.split(':');
        if (splited.length === 2) {
          if (JSON.parse(splited[1]) === true) {
            if (value === null || value === undefined || value.length < 1) {
              description.push({
                title: title,
                validatorName: splited[0],
                message: `validation failed. (${splited[0]})`,
              });
            } else {
            }
          }
        }
      });
    } else console.log('validator length is < 1');
    return description;
  }
}
