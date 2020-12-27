import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialog } from 'src/app/dialogs/AddTodoDialog/AddTodoDialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data={pendings:[],inProgress:[],done:[]}

  constructor(private todoService:TodoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  ngOnInit() {
  this.getAllTodos()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateTodo();
  }

  addTodo(todo){
    const dialogRef = this.dialog.open(AddTodoDialog, {
      width: '500px',
      
    });
  /*  const obj={todo:todo.value}
    this.todoService.addTodo(obj)
    .subscribe(next=>{
     // this.openSnackBar(next.message);
      todo.value='';
      this.getAllTodos()
    },error=>{
      console.log(error);
    });*/
  }

  getAllTodos(){
    /*this.todoService.getAllTodos()
    .subscribe(next=>{
      Object.keys(next).forEach(key=>{
        this.data[key]=next[key];
      })
    },error=>{
      console.log(error);
    });*/
  }

  updateTodo(){
    this.todoService.updateTodo(this.data)
    .subscribe(next=>{
      console.log(next);
    }, error=>{
      console.log(error);
    })
  }
  
  removeTodo(id){
    if(!confirm('Bu maddeyi silmek istediğinize emin misiniz?')){
      return;
    }
    this.todoService.removeTodo(id)
    .subscribe(next=>{
      console.log(next);
      this.getAllTodos();
    },error=>{
      console.log(error);
    })
  }

  openSnackBar(message: string, action: "Tamam") {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  

}
