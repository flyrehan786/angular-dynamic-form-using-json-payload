import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { NgDynamicFormControlComponent } from './components/ng-dynamic-form-control/ng-dynamic-form-control.component';
@NgModule({
  declarations: [
    AppComponent,
    NgDynamicFormControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
