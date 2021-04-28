import { Component, AfterViewChecked } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const PR: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'funwithalgo';

  public ngAfterViewChecked(): any {
    PR.prettyPrint();
  }


  constructor(
    private router: Router
  ) {
    
  }
}
