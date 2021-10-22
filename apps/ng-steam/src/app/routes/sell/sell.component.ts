import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  providers: [HttpService],
  selector: 'mono-nest-ng-steam-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  items: any;
  constructor(public httpService: HttpService) {}

  async ngOnInit(): Promise<any> {
    this.items = await this.httpService.getInventory();
  }
}
