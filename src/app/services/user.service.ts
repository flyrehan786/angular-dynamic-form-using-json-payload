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
            regex: ''
          },
        },
        {
          type: Types.Textbox,
          label: 'Last Name',
          name: 'lastName',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
          type: Types.Textbox,
          label: 'Email',
          name: 'email',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
          type: Types.Textbox,
          label: 'Phone',
          name: 'phone',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
          type: Types.Textbox,
          label: 'Address',
          name: 'address',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
      ],
    };
    return _controls;
  }
}
