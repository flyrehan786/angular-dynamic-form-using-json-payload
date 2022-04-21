import { Injectable } from '@angular/core';
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
          label: 'First Name',
          name: 'firstName',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
          label: 'Last Name',
          name: 'lastName',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
          label: 'Email',
          name: 'email',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
          label: 'Phone',
          name: 'phone',
          value: '',
          validators: {
            required: true,
            regex: ''
          },
        },
        {
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
