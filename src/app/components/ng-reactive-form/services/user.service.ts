import { Injectable } from '@angular/core';
import { IReactiveFormControl } from '../deps/models/IReactiveFormControl';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  getReactiveFormControls() {
    let controls: IReactiveFormControl[] = [
      { label: 'firstName', type: 'text', options: [], regex: '' },
      {
        label: 'lastName',
        type: 'dropdown',
        options: [
          { id: 1, value: 1 },
          { id: 2, value: 2 },
          { id: 3, value: 3 },
          { id: 4, value: 4 },
        ],
        regex: '',
      },
      { label: 'email', type: 'text', options: [], regex: '' },
    ];
    return controls;
  }
}
