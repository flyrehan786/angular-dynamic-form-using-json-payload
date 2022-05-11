import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Types } from 'src/app/enums/Types';
import { IControl } from 'src/app/models/IControl';
import { IDynamicControl } from 'src/app/models/IDynamicControl';
import { IFormData } from 'src/app/models/IFormData';
import { IValidationFailed } from 'src/app/models/IValidationFailed';
@Component({
  selector: 'ng-dy-form',
  templateUrl: './ng-dynamic-form-control.component.html',
  styleUrls: ['./ng-dynamic-form-control.component.css'],
})
export class NgDynamicFormControlComponent implements OnInit {
  /** To enable or disable component logs */
  @Input() debugLogger: string;
  /** Top level heading for form */
  @Input() form_title: string;
  /** Json data for generating form-control (With given format) */
  @Input() input_dynamicControls: IDynamicControl;
  /** This function will be called when user submits a form */
  @Output() onSubmit = new EventEmitter();
  public FORM_ELEMENT = '_ng_df_dynamic_form';
  private DIV_FORM_GROUP = '_ng_df_div';
  private ID_FORM_GROUP = '_ng_df_fg';
  private ID_FORM_CONTROL = '_ng_df_fc';
  private controlCounter = 10;
  private generatedControls: string[] = [];
  private componentEnvironment = {
    validationFailed: {
      border: '2px solid red',
    },
    defaultStyle: {
      border: '1px solid #ced4da',
    },
  };
  title = 'ng-df-dynamic-form';
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let html = ``;
    const formElement: HTMLElement = document.getElementById(this.FORM_ELEMENT);
    if (formElement) {
      const dynamicControls: IDynamicControl = this.input_dynamicControls;
      const controls: IControl[] = dynamicControls.controls;
      controls.forEach((control) => {
        let controlBootstrapColSize = control.bootstrapColSize
          ? control.bootstrapColSize
          : 'col-md-12';
        if (
          control.type === Types.Textbox ||
          control.type === Types.Password ||
          control.type === Types.Datetime
        ) {
          let fieldType = '';
          if (control.type === Types.Textbox) fieldType = Types.Textbox;
          if (control.type === Types.Password) fieldType = Types.Password;
          if (control.type === Types.Datetime) fieldType = Types.Datetime;
          const id = `_ng_df_ctrl_n_${this.controlCounter}`;
          html += `
          <div id="${id}${this.ID_FORM_GROUP}" class="${
            this.DIV_FORM_GROUP
          } form-group ${controlBootstrapColSize} ">
              <label for="">${control.label}</label>
              <input
                id="${id}${this.ID_FORM_CONTROL}"
                type="${fieldType}"
                name="${control.name}"
                value="${control.value}"
                ${control.validators.required ? 'required' : ''}
                _dynamic_control_validators="
                                ${
                                  control.validators.required
                                    ? 'required:true'
                                    : ''
                                }"
                _dynamic_control_regex="${control.validators.regex}"
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
          const id = `_ng_df_ctrl_n_${this.controlCounter}`;
          html += `
          <div id="${id}${this.ID_FORM_GROUP}" class="${
            this.DIV_FORM_GROUP
          } form-group ${controlBootstrapColSize}">
              <label for="">${control.label}</label>
              <select
                id="${id}${this.ID_FORM_CONTROL}"
                name="${control.name}"
                ${control.validators.required ? 'required' : ''}
                _dynamic_control_validators="
                                ${
                                  control.validators.required
                                    ? 'required:true'
                                    : ''
                                }"
                _dynamic_control_regex="${control.validators.regex}"
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
          const id = `_ng_df_ctrl_n_${this.controlCounter}`;
          radioButtonOptions.values.forEach((x) => {
            radioButtons += `
              <input
                class="form-check-input"
                id="${id}${this.ID_FORM_CONTROL}"
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
            <div id="${id}${this.ID_FORM_GROUP}" class="${this.DIV_FORM_GROUP} form-group col-md-4">
            <label class="form-check-label" for="exampleRadios1">
              ${control.label}
            </label>
              <div class="form-check">
                ${radioButtons}
              </div>
            </div>
        `;
          this.controlCounter++;
          this.generatedControls.push(id);
        } else if (control.type === Types.Checkbox) {
          let checkboxes = '';
          const id = `_ng_df_ctrl_n_${this.controlCounter}`;
          checkboxes += `
              <input
                  id="${id}${this.ID_FORM_CONTROL}"
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
                />`;
          html += `
          <div id="${id}${this.ID_FORM_GROUP}" class="${this.DIV_FORM_GROUP} form-group ${controlBootstrapColSize}">
            ${checkboxes}
            <label class="form-check-label" for="">${control.label}</label>
          </div>
        `;
          this.controlCounter++;
          this.generatedControls.push(id);
        } else {
        }
      });
      html += `
        <p>
          <button type="submit" class="mt-3 btn btn-primary">
            Submit
          </button>
        </p>`;
      formElement.innerHTML = html;
    } else this.debug(`No form element found by [id]:${this.FORM_ELEMENT}`);
  }
  /** Publish submitted data to a parent component */
  submit() {
    this.debug('Submit() called');
    const element: HTMLCollectionOf<Element> = document.getElementsByClassName(
      this.DIV_FORM_GROUP
    );
    if (element.length > 0) {
      const extracted = this.extract(element);
      if (extracted.errors.length > 0) {
        this.removeErrorStyles(extracted);
      }
      if (extracted.errors.length > 0) {
        extracted.formIsValid = false;
      } else {
        extracted.formIsValid = true;
        this.removeErrorStyles(extracted);
      }
      this.onSubmit.emit(extracted);
    } else this.debug('No element found');
  }
  /** Analyzing all controls element with specific control type */
  private extract(elements: HTMLCollectionOf<Element>) {
    let extracted: IFormData = { errors: [], data: [] };
    if (this.generatedControls.length === elements.length) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const controlParentDIV = this.generatedControls[i] + this.ID_FORM_GROUP;
        if (element.id === controlParentDIV) {
          const inputElement: HTMLElement = document.getElementById(
            this.generatedControls[i] + this.ID_FORM_CONTROL
          );
          const validators = inputElement.getAttribute(
            '_dynamic_control_validators'
          );
          if (
            inputElement['type'] === 'text' ||
            inputElement['type'] === 'password' ||
            inputElement['type'] === 'datetime-local' ||
            inputElement['type'] === 'select-one'
          ) {
            const splited = validators.split(',');
            const regularExpression = inputElement.getAttribute(
              '_dynamic_control_regex'
            );
            const analyzed: IValidationFailed[] = this.analyze(
              splited,
              inputElement['value'],
              inputElement.getAttribute('name'),
              inputElement.getAttribute('id'),
              regularExpression
            );
            if (analyzed.length > 0) {
              extracted.errors.push(analyzed[0]);
            } else {
              extracted.data.push({
                title: inputElement.getAttribute('name'),
                value: inputElement['value'],
                validated: true,
                id: inputElement.getAttribute('id'),
              });
            }
          } else if (inputElement['type'] === 'radio') {
            const checked = document.querySelector(
              `input[name=${inputElement.getAttribute('name')}]:checked`
            );
            const value = checked ? checked['value'] : undefined;
            const splited = validators.split(',');
            const analyzed: IValidationFailed[] = this.analyze(
              splited,
              value,
              inputElement.getAttribute('name'),
              inputElement.getAttribute('id')
            );
            if (analyzed.length > 0) {
              extracted.errors.push(analyzed[0]);
            } else {
              extracted.data.push({
                title: inputElement.getAttribute('name'),
                value: value,
                validated: true,
                id: inputElement.getAttribute('id'),
              });
            }
          } else if (inputElement['type'] === Types.Checkbox) {
            const checked = inputElement['checked'];
            const splited = validators.split(',');
            const analyzed: IValidationFailed[] = this.analyze(
              splited,
              checked,
              inputElement.getAttribute('name'),
              inputElement.getAttribute('id')
            );
            if (analyzed.length > 0) {
              extracted.errors.push(analyzed[0]);
            } else {
              extracted.data.push({
                title: inputElement.getAttribute('name'),
                value: checked,
                validated: true,
                id: inputElement.getAttribute('id'),
              });
            }
          }
        } else this.debug('Invalid dom-element id');
      }
    } else this.debug('Invalid dynamically-generated-controls info');
    return extracted;
  }
  /**
   * Validating value against all provided validators and regular expression on a specific
   * html control.
   */
  private analyze(
    validators: string[],
    value: string,
    title: string,
    id: string,
    regularExpression?: string
  ) {
    let description: IValidationFailed[] = [];
    if (validators.length > 0) {
      validators.forEach((v) => {
        const trimmed = v.trim();
        const splited = trimmed.split(':');
        if (splited.length === 2) {
          if (JSON.parse(splited[1]) === true) {
            if (value === null || value === undefined || value.length < 1) {
              description.push({
                id: id,
                title: title,
                validatorName: splited[0],
                message: `validation failed. (${splited[0]})`,
              });
            } else {
            }
          }
        }
      });
    } else this.debug(`No validator exist on element with [id]:${id}`);
    // Checking Regular Expression.
    if (regularExpression) {
      const regex = new RegExp(regularExpression);
      const regexResult = regex.test(value);
      if (!regexResult) {
        const index = description.findIndex((x) => x.id === id);
        if (index !== -1) {
          description[index].regex = regularExpression;
          description[index].message += `, regex validation failed.`;
        } else {
          description.push({
            id,
            title,
            regex: regularExpression,
            message: `regex validation failed.`,
          });
        }
      }
    }
    return description;
  }
  /**
   * Removing error styles when form have no errors.
   */
  private removeErrorStyles(e: IFormData) {
    if (e.errors.length > 0) {
      e.data.forEach((x) => {
        document.getElementById(x['id']).style.border =
          this.componentEnvironment.defaultStyle.border;
      });
      e.errors.forEach((x) => {
        const formControlId = x['id'];
        const formControlElement = document.getElementById(formControlId);
        formControlElement.style.border =
          this.componentEnvironment.validationFailed.border;
      });
    } else {
      e.data.forEach((x) => {
        document.getElementById(x['id']).style.border =
          this.componentEnvironment.defaultStyle.border;
      });
    }
  }
  private debug(message: string) {
    if (this.debugLogger) {
      console.log(message);
    } else console.log('[Component-Debug-Logs] Debug Logger is disabled.');
  }
}
