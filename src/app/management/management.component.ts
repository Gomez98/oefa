import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
  }
  logout(): void{
    this.router.navigateByUrl('/hero');
    this.httpService.updateLoginStatus(false);
  }

}
