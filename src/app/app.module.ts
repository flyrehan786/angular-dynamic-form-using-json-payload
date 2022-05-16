import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgDynamicComponent } from './components/ng-dynamic/ng-dynamic.component';
import { UserService } from './components/ng-dynamic/services/user.service';
@NgModule({
  declarations: [AppComponent, NgDynamicComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
