import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  getReactiveFormControl() {
    return [
      { label: 'firstName', type: 'text', options: [], regex: '' },
      {
        label: 'gender',
        type: 'dropdown',
        options: [
          { id: 1, value: 1 },
          { id: 2, value: 2 },
        ],
        regex: '',
      },
    ];
  }
}
