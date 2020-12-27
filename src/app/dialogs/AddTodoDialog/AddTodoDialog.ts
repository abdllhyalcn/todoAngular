import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'AddTodoDialog',
    templateUrl: './AddTodoDialog.html',
    styleUrls: ['./AddTodoDialog.scss']
})
export class AddTodoDialog {

    constructor(
        public dialogRef: MatDialogRef<AddTodoDialog>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}