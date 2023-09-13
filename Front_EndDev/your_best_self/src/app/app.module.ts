import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CompCompartidosModule } from './comp-compartidos/comp-compartidos.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CompCompartidosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
