import { ComiteModel } from '../../../../core/models/comite.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteService, HttpResponseModel, NotificationService } from 'src/app/core';

@Component({
  selector: 'app-step-comite',
  templateUrl: './step-comite.component.html',
  styleUrls: ['./step-comite.component.scss']
})
export class StepComiteComponent implements OnInit {

  public loading = true;
  public isUpdate = false;
  public id: string;

  // step
  public current = 0;
  public data: ComiteModel | null = null;
  public abilitar = false;

  constructor(
    private service: ComiteService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotificationService) {
      this.id = this.route.snapshot.params.id;
      if (this.id) {
        this.isUpdate = true;
        this.abilitar = true;
      }
    }

  ngOnInit(): void {
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.loading = false;
  }

  get(): void {
    this.service.get(this.id).subscribe(
      data => {
        this.data = data;
        this.current = 1;
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.isUpdate = false;
      }
    );
  }

  completeRegister(data: ComiteModel): void {
    this.data = data;
    this.id = this.data.Id;
    this.isUpdate = true;
    this.current ++;
  }

  onIndexChange(index: number): void {
    if (this.isUpdate) {
      this.current = index;
    }
  }

  next(data:boolean){
    if(data){
      this.current++;
    }
  }

}
