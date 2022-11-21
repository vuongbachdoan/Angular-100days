import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/user.injectable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
