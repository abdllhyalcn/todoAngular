import { Component } from "@angular/core";
import { MatDatepicker, MatSnackBar } from "@angular/material";
import { MatDialogRef } from "@angular/material/dialog";
import AddTodoReq from "src/app/models/AddTodoReq";
import { TodoService } from "src/app/services/todo.service";

@Component({
    selector: 'AddTodoDialog',
    templateUrl: './AddTodoDialog.html',
    styleUrls: ['./AddTodoDialog.scss']
})
export class AddTodoDialog {

    constructor(
        public dialogRef: MatDialogRef<AddTodoDialog>,
        private todoService: TodoService,
        private _snackBar: MatSnackBar,) { }

    addTodoReq: AddTodoReq = {
        description: null,
        date_todo: null,
        status: "0"
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
                this.openSnackBar("Todo başarıyla eklendi.", "Tamam");
                this.dialogRef.close();
            },
                error => {
                    console.log(error);
                    this.openSnackBar("Hata: Todo eklerken bir hata oluştu.", "Tamam");
                }
            )
    }

    openSnackBar(message: string, action: "Tamam") {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }

}