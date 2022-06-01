import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { UserService } from '../ng-dynamic/services/user.service';
import { IReactiveFormControl } from '../ng-reactive-form/deps/models/IReactiveFormControl';
@Component({
  selector: 'app-ng-reactive-form',
  templateUrl: './ng-reactive-form.component.html',
  styleUrls: ['./ng-reactive-form.component.css'],
})
export class NgReactiveFormComponent implements OnInit {
  // This should be coming from api.
  data: IReactiveFormControl[] = [];
  address: boolean = false;
  form: FormGroup;
  constructor(private service: UserService) {
    this.data = this.service.getReactiveFormControls();
    this.setSettings(this.data);
  }
  setSettings(data) {
    let form = {};
    for (let i = 0; i < this.data.length; i++) {
      if (data[i]['regex'].length > 0) {
        const regex: string = data[i]['regex'];
        form[data[i]['label']] = new FormControl('', [
          Validators.required,
          Validators.pattern(regex),
        ]);
      } else form[data[i]['label']] = new FormControl('', Validators.required);
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
