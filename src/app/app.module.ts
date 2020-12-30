import { DragDropModule } from "@angular/cdk/drag-drop";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { 
  MatButtonModule, 
  MatIconModule, 
  MatCheckboxModule, 
  MatInputModule, 
  MatCardModule, 
  MatSnackBarModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatRadioModule, 
  MatSelectModule, 
  MatSlideToggleModule, 
  MatDialogModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AddTodoDialog } from "./dialogs/AddTodoDialog/AddTodoDialog";
import { AddUserDialog } from "./dialogs/AddUserDialog/AddUserDialog";
import { LoginGuard, HomeGuard } from "./LoginGuard";

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
    BrowserAnimationsModule,
    AppRoutingModule,
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
    { provide: 'apiUrl', useValue: 'https://todo-spring-apps.herokuapp.com/api/' },
    LoginGuard, HomeGuard,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
