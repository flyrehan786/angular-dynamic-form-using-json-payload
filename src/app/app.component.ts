import { Component, OnInit } from '@angular/core';
import { IFormData } from './components/ng-dynamic/deps/models/IFormData';
import { UserService } from './components/ng-dynamic/services/user.service';
import { UserService as rfUserService } from './components/ng-reactive-form/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'df-dynamic-form';
  constructor(
    public service: UserService,
    public reactiveFormService: rfUserService
  ) {}
  ngOnInit(): void {}
  onFormSubmit(event: IFormData) {
    if (event.formIsValid === false) {
      alert('Invalid form submitted.');
      console.log(event);
    } else console.log(event);
  }
}
