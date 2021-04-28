import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentYear: number;
  constructor(
    private router: Router
  ) { 
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

  
  routeFunction(route: string): void {
    this.router.navigate([route]);
  }
}
