import { NotificationService } from './../../../core/services/notification.service';
import { FormCheckService } from './../../../core/services/form-check.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials, HttpResponseModel } from 'src/app/core/models';
import { UserService } from 'src/app/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public validateForm!: FormGroup;
  public passwordVisible = false;
  constructor(private fb: FormBuilder, private userS: UserService, private formCheck: FormCheckService,
              private notify: NotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      User: [null, [Validators.required]],
      Password: [null, [Validators.required]]
    });
    this.formCheck.formInit(this.validateForm);
  }

  submitForm(): void {
    this.formCheck.formCheck();
    if (!this.formCheck.formIsValid()) { return; }
    const credentials = this.validateForm.value as Credentials;
    this.userS.login(credentials).subscribe(
        data => this.notify.succesMessage(`Bienvenido: ${credentials.User}`) ,
        (err: HttpResponseModel) => {
          this.notify.errorNotification(err.Mensaje)
        }
      );
  }
}
