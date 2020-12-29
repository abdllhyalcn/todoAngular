import { Component, Inject, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import AddUserReq from "src/app/models/AddUserReq";
import UpdateUserReq from "src/app/models/UpdateUserReq";
import UserResponse from "src/app/models/UserResponse";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'AddUserDialog',
    templateUrl: './AddUserDialog.html',
    styleUrls: ['./AddUserDialog.scss']
})
export class AddUserDialog implements OnInit {

    selectedUser: UserResponse;
    constructor(
        public dialogRef: MatDialogRef<AddUserDialog>,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data) {
        this.selectedUser = data.user;
    }

    addUserReq: AddUserReq = {
        username: "",
        email: "",
        isAdmin: false,
        password: ""
    };

    btnTitle: string = "Ekle"
    headerTitle: string="Kullanıcı ekle"

    ngOnInit() {
        if (this.selectedUser != null) {
            this.btnTitle = "Güncelle"
            this.headerTitle= "Kullanıcı güncelle"
            this.addUserReq.username = this.selectedUser.username;
            this.addUserReq.email = this.selectedUser.email;
            if (this.selectedUser.roles.includes("ROLE_ADMIN")) {
                this.addUserReq.isAdmin = true;
            }
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        if (this.addUserReq.username == "" || this.addUserReq.email == "" ||
            this.addUserReq.password == "") {
            return;
        }
        if (this.selectedUser != null) {
            const user: UpdateUserReq = {
                user_id: this.selectedUser.id,
                new_username: this.addUserReq.username,
                new_email: this.addUserReq.email,
                new_password: this.addUserReq.password,
                isAdmin: this.addUserReq.isAdmin
            }
            this.userService.updateUser(user)
                .subscribe(res => {
                    this.openSnackBar("Kullanıcı başarıyla güncellendi.", "Tamam");
                    this.dialogRef.close();
                },
                    error => {
                        console.log(error);
                        this.openSnackBar("Hata: Kullanıcı güncellenirken bir hata oluştu.", "Tamam");
                    }
                )
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