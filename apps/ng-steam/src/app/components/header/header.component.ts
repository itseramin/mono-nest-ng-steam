import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  providers: [AuthService],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    window.location.href = 'http://localhost:3000/api/v1/auth/steam';
  }

  logout() {
    this.authService.logout();
  }
}
