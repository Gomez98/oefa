import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service'
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  @Output() loged = new EventEmitter<boolean>();
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  constructor(
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }
  loginValidation(): void {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    this.httpService.postRequest('api/v1/employee/login', email).subscribe((response) => {
      let emp = response.data.employee;

      if (emp.email === email && emp.password === password) {
        this.router.navigateByUrl('/management');
        this.httpService.updateLoginStatus(true);
      } else {
        this.emailFormControl.setValue('');
        this.emailFormControl.hasError('required')
        this.passwordFormControl.setValue('');
        this.passwordFormControl.hasError('required')

        this.snackBar.open("Crendenciales erroneas", 'ok', {
          duration: this.durationInSeconds * 1000,
        }
        );

      };

    })


  }
}
