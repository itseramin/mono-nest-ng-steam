import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  providers: [HttpService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: any;

  constructor(public httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    let is = await this.httpService.getInventory();
    this.items = is;
  }
}
