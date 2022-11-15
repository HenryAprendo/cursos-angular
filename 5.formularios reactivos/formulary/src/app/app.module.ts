import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicModule } from './basic/basic.module';
import { MaterialModule } from './material/material.module';
import { ForbiddenValidatorDirective } from './directives/forbidden-name.directive';


@NgModule({
  declarations: [
    AppComponent,
    ForbiddenValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BasicModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
