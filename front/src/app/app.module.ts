import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localept, 'pt');

import { AppComponent } from './app.component';
import { HttpUtilService } from 'src/services/service';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		HttpModule,
		HttpClientModule,
		NgbModule
  ],
  providers: [
		HttpUtilService,
    { provide: LOCALE_ID, useValue: 'pt' }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
