import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, 
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule
  } from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HomeGuard, LoginGuard } from './LoginGuard';
import { AddTodoDialog } from './dialogs/AddTodoDialog/AddTodoDialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    AboutComponent,
    NotFoundComponent,
    AddTodoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    DragDropModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [
    AddTodoDialog,
  ],
  providers: [
    {provide:'apiUrl',useValue:'http://localhost:8082/api/'},
    LoginGuard, HomeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
