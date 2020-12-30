import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import TodoService from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import AddTodoDialog from 'src/app/dialogs/AddTodoDialog/AddTodoDialog';
import TodoRes from 'src/app/models/TodoRes';
import UpdateTodoReq from 'src/app/models/UpdateTodoReq';
import AuthService from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import SigninRes from 'src/app/models/SigninRes';
import UserRes from 'src/app/models/UserRes';
import UserService from 'src/app/services/user.service';
import AddUserDialog from 'src/app/dialogs/AddUserDialog/AddUserDialog';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {

  data: {
    beklemede: Array<TodoRes>,
    ertelendi: Array<TodoRes>,
    tamamlandi: Array<TodoRes>
  }
    = { beklemede: [], ertelendi: [], tamamlandi: [] };

  user: SigninRes;

  userResponse: UserRes[] = [];

  selectedUser: UserRes;

  adminMod: boolean = false;

  selectedUserSwitch: boolean = false;

  constructor(private todoService: TodoService,
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {
    this.user = authService.getUser();
  }

  ngOnInit() {
    this.loadTodos()
    if (this.user.roles.includes('ROLE_ADMIN')) {
      this.adminMod = true;
      this.getUsers();
    }
  }

  contentFormat = (item: TodoRes): string => {
    return item.description + ' : ' + new Date(item.date_todo).toLocaleDateString();
  }

  selectionChange(event) {
    this.loadTodos()
  }

  loadTodos() {
    if (this.selectedUserSwitch) {
      this.getUserTodos();
    } else {
      this.getAllTodos();
    }
  }

  getAllTodos() {
    this.data = this.todoService.getAllTodos()
  }

  getUserTodos() {
    this.data = this.todoService.getUserTodos(this.selectedUser.id);
  }

  addTodo() {
    const dialogRef = this.dialog.open(AddTodoDialog, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(next => {
      this.loadTodos();
    })
  }

  removeTodo(id: number) {
    if (this.selectedUserSwitch) {
      this.openSnackBar("Başka kullanıcı Todo'ları düzenlenemez!")
      return;
    }
    if (!confirm('Bu maddeyi silmek istediğinize emin misiniz?')) {
      return;
    }
    this.todoService.removeTodo(id)
      .subscribe(next => {
        this.loadTodos();
      }, error => {
        console.log(error);
      })
  }

  signOut() {
    if (!confirm('Çıkış yapmak istediğinize emin misiniz?')) {
      return;
    }
    this.authService.deleteUser();
    this.router.navigate(["login"]);
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.userResponse = res;
      this.selectedUser = res[0]
    }, error => {
      console.log(error);
    })
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserDialog, {
      data: {
        user: null
      },
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(next => {
      this.getUsers();
    })
  }

  updateUser() {
    const dialogRef = this.dialog.open(AddUserDialog, {
      data: {
        user: this.selectedUser
      },
      width: "300px"
    });
    dialogRef.afterClosed().subscribe(next => {
      this.getUsers();
    })
  }

  deleteUser() {
    if (!confirm(this.selectedUser.username + ' kullanıcısını silmek istediğinize emin misiniz?')) {
      return;
    }
    this.userService.deleteUser(this.selectedUser.id)
      .subscribe(next => {
        this.openSnackBar("Kullanıcı başarıyla silindi");
        this.getUsers();
        this.loadTodos();
      }, error => {
        console.log(error);
      })
  }

  toggle(event: MatSlideToggleChange) {
    this.selectedUserSwitch = event.checked;
    this.loadTodos()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Tamam", {
      duration: 2000,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.selectedUserSwitch) {
      this.openSnackBar("Başka kullanıcı Todo'ları düzenlenemez!");
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let updatedTodo: UpdateTodoReq = {
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
          this.openSnackBar("Hata: Todo statüsü değiştirilemedi.");
        })
    }
  }


}
