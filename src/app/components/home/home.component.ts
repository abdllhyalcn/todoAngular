import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialog } from 'src/app/dialogs/AddTodoDialog/AddTodoDialog';
import TodoRes from 'src/app/models/todoRes';
import UpdateTodoReq from 'src/app/models/UpdateTodoReq';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import signinRes from 'src/app/models/signinResponse';
import UserResponse from 'src/app/models/UserResponse';
import { UserService } from 'src/app/services/user.service';
import { AddUserDialog } from 'src/app/dialogs/addUserDialog/addUserDialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: { beklemede: Array<TodoRes>,
     ertelendi: Array<TodoRes>,
     tamamlandi: Array<TodoRes> }
  ={beklemede:[],ertelendi:[],tamamlandi:[]};

  user: signinRes;

  userResponse: UserResponse[]=[];
  constructor(private todoService: TodoService,
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {
      this.user=authService.getUser();
  }


  ngOnInit() {
    this.getAllTodos()
    if(this.user.roles.includes('ROLE_ADMIN')){
      this.userService.getUsers().subscribe((res:any)=>{
        this.userResponse=res;
      },error=>{
        console.log(error);
      })
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let updatedTodo : UpdateTodoReq={
        todo_id: event.previousContainer.data[event.previousIndex]['id'],
        description: event.previousContainer.data[event.previousIndex]['description'],
        date_todo: event.previousContainer.data[event.previousIndex]['date_todo'],
        status: event.container.id
      }
      this.todoService.updateTodo(updatedTodo)
      .subscribe(next => {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }, error => {
        console.log(error);
        this.openSnackBar("Hata: Todo statüsü değiştirilemedi.", "Tamam");
      })
    }
  }

  addTodo() {
    const dialogRef = this.dialog.open(AddTodoDialog, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(next=>{
      this.getAllTodos();
    })
  }

  getAllTodos() {
    this.data = {beklemede:[],ertelendi:[],tamamlandi:[]};
    this.todoService.getAllTodos()
      .subscribe((response : any ) => {
        response.forEach(element => {
          switch (element.status) {
            case 1:
              this.data.beklemede.push(element)
              break;
            case 2:
              this.data.ertelendi.push(element)
              break;
            case 3:
              this.data.tamamlandi.push(element)
              break;
          }
        });
      }, error => {
        console.log(error);
      });

  }

  removeTodo(id) {
    if (!confirm('Bu maddeyi silmek istediğinize emin misiniz?')) {
      return;
    }
    this.todoService.removeTodo(id)
      .subscribe(next => {
        console.log(next);
        this.getAllTodos();
      }, error => {
        console.log(error);
      })
  }

  signUp(){
    if (!confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      return;
    }
    this.authService.deleteUser();
    this.router.navigate(["login"]);
  }

  addUser(){
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(next=>{
      this.getAllTodos();
    })
  }

  openSnackBar(message: string, action: "Tamam") {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
