import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private _snackBar: MatSnackBar, private router: Router) {
  }
  username: string = "";
  password: string = "";

  ngOnInit(): void {

  }

  loginReq() {
    const singin = {
      username: this.username,
      password: this.password
    }

    this.authService.loginReq(singin).subscribe(res => {
      this.authService.saveUser(res);
      this.openSnackBar("Giriş başarılı.", "Tamam");
      setTimeout(() => this.router.navigate(['/home']), 2000);
    }, error => {
      this.openSnackBar("Hata: Girdiğiniz bilgileri kontrol ediniz!", "Tamam");
    })
  }

  openSnackBar(message: string, action: "Tamam") {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

