import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  providers: [ApiService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any = {
    username: 'username',
    steamPfp:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg',
    steamId64: '789574XXXXXXX',
  };
  constructor(public apiService: ApiService) {}

  async ngOnInit(): Promise<any> {
    this.user = await this.apiService.getUserProfile();
  }
}
