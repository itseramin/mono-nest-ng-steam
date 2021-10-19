import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  providers: [AuthService],
  selector: 'mono-nest-ng-steam-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.scss'],
})
export class AuthcallbackComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token);
    this.authService.setSession(token);
    this.router.navigate(['/']);
  }
}
