import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-ng-reactive-form',
  templateUrl: './ng-reactive-form.component.html',
  styleUrls: ['./ng-reactive-form.component.css'],
})
export class NgReactiveFormComponent implements OnInit {
  formData: any[] = [
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
    { label: 'email' },
  ];
  address: boolean = false;
  contactForm: FormGroup;
  constructor() {
    this.setSettings(this.formData);
  }
  setSettings(formData, address?: boolean) {
    let form = {};
    for (let i = 0; i < this.formData.length; i++) {
      form[formData[i]['label']] = new FormControl('');
    }
    this.contactForm = new FormGroup(form);
  }
  ngOnInit(): void {}
  validateFormControl(controlName: string) {
    let control = this.contactForm.get('firstName');
    console.log('dynamic reactive form control');
    console.log(control);
  }
}
