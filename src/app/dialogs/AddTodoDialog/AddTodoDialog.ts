import { Component } from "@angular/core";
import { MatDatepicker, MatSnackBar } from "@angular/material";
import { MatDialogRef } from "@angular/material/dialog";
import AddTodoReq from "src/app/models/AddTodoReq";
import TodoService from "src/app/services/todo.service";

@Component({
    selector: 'AddTodoDialog',
    templateUrl: './AddTodoDialog.html',
    styleUrls: ['./AddTodoDialog.scss']
})
export default class AddTodoDialog {

    minDate: Date = new Date();

    constructor(
        public dialogRef: MatDialogRef<AddTodoDialog>,
        private todoService: TodoService,
        private _snackBar: MatSnackBar,) { }

    addTodoReq: AddTodoReq = {
        description: null,
        date_todo: null,
        status: "1"
    };

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        if (this.addTodoReq.date_todo == null || this.addTodoReq.description == null) {
            return;
        }
        this.todoService.addTodo(this.addTodoReq)
            .subscribe(res => {
                this.openSnackBar("Todo başarıyla eklendi.");
                this.dialogRef.close();
            },
                error => {
                    console.log(error);
                    this.openSnackBar("Hata: Todo eklerken bir hata oluştu.");
                }
            )
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, "Tamam", {
            duration: 2000,
        });
    }

}