import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgDynamicComponent } from './components/ng-dynamic/ng-dynamic.component';
import { UserService } from './components/ng-dynamic/services/user.service';
import { NgReactiveFormComponent } from './components/ng-reactive-form/ng-reactive-form.component';
@NgModule({
  declarations: [AppComponent, NgDynamicComponent, NgReactiveFormComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
