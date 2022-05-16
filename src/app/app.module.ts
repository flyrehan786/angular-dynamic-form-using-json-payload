import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { NgDynamicComponent } from './components/ng-dynamic/ng-dynamic.component';
@NgModule({
  declarations: [AppComponent, NgDynamicComponent],
  imports: [BrowserModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
