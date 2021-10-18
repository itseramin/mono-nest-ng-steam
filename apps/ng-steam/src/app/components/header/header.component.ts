import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {}

  login() {
    window.location.href = 'http://localhost:3000/api/v1/auth/steam';
  }
}
