import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.metaService.addTags([
      { charset: 'UTF-8' },
      { name: 'author', content: 'Benjamin Hera' },
      {
        name: 'description',
        content:
          "Benjamin's full stack web application with Steam API integration.",
      },
      { name: 'robots', content: 'index, follow' },
    ]);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data: { title: string }) => {
          this.titleService.setTitle(data.title);
        });
      });
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
