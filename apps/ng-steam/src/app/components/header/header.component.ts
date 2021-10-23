import { Component, HostListener, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  providers: [AuthService],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(public authService: AuthService) {}

  @HostListener('window:focus')
  checkLogInStatus() {
    this.checkLogin();
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  login() {
    window.location.href = 'http://localhost:3000/api/v1/auth/steam';
  }

  logout() {
    this.authService.logout();
    this.checkLogin();
  }
}
