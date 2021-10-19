import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  providers: [HttpService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    console.log(await this.httpService.getAllUser());
  }
}
