import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mono-nest-ng-steam-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.scss'],
})
export class AuthcallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token);
    // save token to local storage and stuff like that
    this.router.navigate(['/']);
  }
}
