import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponseModel } from 'src/app/core';
import { PlanAnualService } from 'src/app/core/http/planAnual/plan-anual.service';
import { TypeFileDetail } from 'src/app/core/models/detailFile.model';
import { PlanAnualModel } from 'src/app/core/models/plan-anual.model';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-file-plan',
  templateUrl: './file-plan.component.html',
  styleUrls: ['./file-plan.component.scss']
})
export class FilePlanComponent implements OnInit {
  private id: string;

  private file: File | null = null;
  urlFile = '';
  typeDetailFile = TypeFileDetail.UPLOAD_SIMPLE_FILE;
  loading = true;
  isUpdate = false;
  data: PlanAnualModel | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PlanAnualService,
    private notify: NotificationService) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isUpdate = true;
    }
  }

  ngOnInit(): void {
    if (this.isUpdate) {
      // this.get();
      return;
    }
    this.loading = false;
  }

  setFile(file: File): void {
    this.file = file;
  }
  
  saveFile(event:any){
  }
}
