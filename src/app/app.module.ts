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
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  } from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeGuard, LoginGuard } from './LoginGuard';
import { AddTodoDialog } from './dialogs/AddTodoDialog/AddTodoDialog';
import { AddUserDialog } from './dialogs/addUserDialog/AddUserDialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    AddTodoDialog,
    AddUserDialog
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [
    AddTodoDialog, AddUserDialog
  ],
  providers: [
    {provide:'apiUrl',useValue:'https://todo-spring-apps.herokuapp.com/api/'},
    LoginGuard, HomeGuard,
    MatDatepickerModule,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
