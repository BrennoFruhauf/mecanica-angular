import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskDirective,
  ],
  providers: [provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
