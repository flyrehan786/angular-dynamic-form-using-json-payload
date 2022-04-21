import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IControl } from 'src/app/models/IControl';
import { IDynamicControl } from 'src/app/models/IDynamicControl';
import { IFormData } from 'src/app/models/IFormData';
import { IValidationFailed } from 'src/app/models/IValidationFailed';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ng-dynamic-form-control',
  templateUrl: './ng-dynamic-form-control.component.html',
  styleUrls: ['./ng-dynamic-form-control.component.css']
})
export class NgDynamicFormControlComponent implements OnInit {
  @Input() input_dynamicControls: IDynamicControl;
  @Output() onSubmit = new EventEmitter();
  public  _FORM_ELEMENT  = '_df-dynamic-form' // Form Id;
  private _DIV_FORM_GROUP = '_df_div';        // DIV
  private _ID_FORM_GROUP  = '_df_fg';         // Form Group
  private _ID_FORM_CONTROL  = '_df_fc';       // Form Control
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
    if (element.length > 0) this.onSubmit.emit(this.extract(element));
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