import { Injectable } from '@angular/core';
import { Types } from '../enums/Types';
import { IDynamicControl } from '../models/IDynamicControl';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  getDynamicControl() {
    // Assume that this JSON data is comming from server.
    const _controls: IDynamicControl = {
      formTitle: "User Registration",
      controls: [
        {
          type: Types.Dropdown,
          label: 'Dropdown',
          name: 'firstName',
          value: '',
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
          radioButtonOptions: {
              values: [
                { key: "Male" ,  value: '0' },
                { key: "Female", value: '1' },
                { key: "Other",  value: '2' },
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
          validators: {
            required: true,
            regex: '',
          },
        },
        {
          type: Types.Textbox,
          label: 'Address',
          name: 'address',
          value: '',
          validators: {
            required: true,
            regex: '',
          },
        },
      ],
    };
    return _controls;
  }
}
