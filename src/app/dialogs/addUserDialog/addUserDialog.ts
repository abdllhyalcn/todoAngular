import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { MatDialogRef } from "@angular/material/dialog";
import AddUserReq from "src/app/models/AddUserReq";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'AddUserDialog',
    templateUrl: './AddUserDialog.html',
    styleUrls: ['./AddUserDialog.scss']
})
export class AddUserDialog {

    constructor(
        public dialogRef: MatDialogRef<AddUserDialog>,
        private userService: UserService,
        private _snackBar: MatSnackBar,) { }

    addUserReq: AddUserReq = {
        username: "",
        email: "",
        isAdmin: false,
        password: ""
    };

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        if (this.addUserReq.username == "" || this.addUserReq.email == "" ||
         this.addUserReq.password=="" ) {
            return;
        }
        this.userService.addUser(this.addUserReq)
            .subscribe(res => {
                this.openSnackBar("Kullanıcı başarıyla eklendi.", "Tamam");
                this.dialogRef.close();
            },
                error => {
                    console.log(error);
                    this.openSnackBar("Hata: Kullanıcı eklerken bir hata oluştu.", "Tamam");
                }
            )
    }

    openSnackBar(message: string, action: "Tamam") {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }

}