import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../ng-dynamic/services/user.service';
@Component({
  selector: 'app-ng-reactive-form',
  templateUrl: './ng-reactive-form.component.html',
  styleUrls: ['./ng-reactive-form.component.css'],
})
export class NgReactiveFormComponent implements OnInit {
  // This should be coming from api.
  data: any[] = [];
  address: boolean = false;
  form: FormGroup;
  constructor(private service: UserService) {
    this.data = this.service.getReactiveFormControls();
    this.setSettings(this.data);
  }
  setSettings(data) {
    let form = {};
    for (let i = 0; i < this.data.length; i++) {
      form[data[i]['label']] = new FormControl('');
    }
    this.form = new FormGroup(form);
    console.log(this.form);
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
