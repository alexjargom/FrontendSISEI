import { FormGroup } from '@angular/forms';

export class FormCheckService {
  private form!: FormGroup;
  constructor() {}

  // FORCE INIT
  formInit(form: FormGroup): void {
    this.form = form;
  }

  formCheck(): void {
    if (!this.exist()) { return; }
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }

  formIsValid(): boolean {
    this.formCheck();
    if (!this.exist()) { return false; }
    return this.form.valid;
  }

  cleanForm(): void {
    if (!this.exist()) { return; }
    this.form.reset();
  }

  private exist(): boolean {
    return this.form ? true : false;
  }
}
