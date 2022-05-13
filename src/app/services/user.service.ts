import { Injectable } from '@angular/core';
import { Types } from '../components/ng-dynamic-form-control/deps/enums/Types';
import { IDynamicControl } from '../components/ng-dynamic-form-control/deps/models/IDynamicControl';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  getDynamicControl() {
    // Assume that this JSON data is comming from server.
    const _controls: IDynamicControl = {
      formTitle: 'Dynamic Form',
      controls: [
        {
          type: Types.Dropdown,
          label: 'Dropdown',
          name: 'firstName',
          value: '',
          bootstrapColSize: 'col-md-4',
          dropdownOptions: [
            { key: 'Option1', value: '0' },
            { key: 'Option2', value: '1' },
            { key: 'Option3', value: '2' },
            { key: 'Option4', value: '3' },
          ],
          validators: {
            required: true,
            regex: '',
          },
        },
        {
          type: Types.Radio,
          label: 'Gender',
          name: 'Gender',
          value: '',
          bootstrapColSize: 'col-md-4',
          radioButtonOptions: {
            values: [
              { key: 'Male', value: '0' },
              { key: 'Female', value: '1' },
              { key: 'Other', value: '2' },
            ],
          },
          validators: {
            required: true,
            regex: '',
          },
        },
        {
          type: Types.Checkbox,
          label: 'Subscribe to news-letters',
          name: 'news-letters',
          value: '0',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: '',
          },
        },
        {
          type: Types.Checkbox,
          label: 'Subscribe To Mailing List',
          name: 'mailing-list',
          value: '0',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: '',
          },
        },
        {
          type: Types.Checkbox,
          label: 'Subscribe To Mailing List',
          name: 'mailing-list',
          value: '0',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: '',
          },
        },
        {
          type: Types.Textbox,
          label: 'Phone',
          name: 'phone',
          value: '',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: '^[0-9]{3}$',
          },
        },
        {
          type: Types.Textbox,
          label: 'Address',
          name: 'address',
          value: '',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: 'Address Regular Expression',
          },
        },
        {
          type: Types.Password,
          label: 'Password',
          name: 'password',
          value: '',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: 'Password Regular Expression',
          },
        },
        {
          type: Types.Datetime,
          label: 'BirthDate',
          name: 'birthdate',
          value: '',
          bootstrapColSize: 'col-md-4',
          validators: {
            required: true,
            regex: 'Birthdata Regular Expression',
          },
        },
      ],
    };
    return _controls;
  }
}
