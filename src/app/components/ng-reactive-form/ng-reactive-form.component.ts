import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-ng-reactive-form',
  templateUrl: './ng-reactive-form.component.html',
  styleUrls: ['./ng-reactive-form.component.css'],
})
export class NgReactiveFormComponent implements OnInit {
  // This should be coming from api.
  data: any[] = [
    { label: 'firstName', type: 'text', options: [] },
    {
      label: 'lastName',
      type: 'dropdown',
      options: [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
      ],
    },
    { label: 'email', type: 'text', options: [] },
  ];
  address: boolean = false;
  form: FormGroup;
  constructor() {
    this.setSettings(this.data);
  }
  setSettings(data) {
    let form = {};
    for (let i = 0; i < this.data.length; i++) {
      form[data[i]['label']] = new FormControl('');
    }
    this.form = new FormGroup(form);
  }
  ngOnInit(): void {}
  validateFormControl(controlName: string) {
    let control = this.form.get(controlName);
    console.log('dynamic reactive form control');
    console.log(control);
  }
  onSubmit() {
    console.log('Form Submitted.');
    console.log(this.form.value);
  }
}
