import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { ListUsersComponent } from './list-users/list-users.component';

import {ListUsersService} from './list-users.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchPipe} from './search.pipe';
import {registerLocaleData} from '@angular/common';
import enlocale from  '@angular/common/locales/en';


registerLocaleData(enlocale, 'en');

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatComponent,
    ListUsersComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ListUsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
