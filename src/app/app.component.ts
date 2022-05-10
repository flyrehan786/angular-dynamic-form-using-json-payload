import { Component, OnInit } from '@angular/core';
import { IFormData } from './models/IFormData';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'df-dynamic-form';
  constructor(public service: UserService) {}
  onFormSubmit(event: IFormData) {
    if (event.formIsValid === false) alert('Invalid form submitted.');
    else console.log(event);
  }
}
