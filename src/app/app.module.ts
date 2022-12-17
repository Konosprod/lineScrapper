import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainWindowComponent } from './main-window/main-window.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { GridItemComponent } from './grid-view/grid-item/grid-item.component';
import { ConfirmComponent } from './confirm/confirm.component';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    UserInputsComponent,
    GridViewComponent,
    GridItemComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
