import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  providers: [ApiService],
  selector: 'mono-nest-ng-steam-sell',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  items: any;
  constructor(public apiService: ApiService) {}

  async ngOnInit(): Promise<any> {
    this.items = await this.apiService.getInventory();
  }
}
