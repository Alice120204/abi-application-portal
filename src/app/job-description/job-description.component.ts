import {Component, DoCheck, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JobListing} from "../app.component";
import {Subscription} from "rxjs";
import {finalize, Observable} from "rxjs";
import {FileUpload} from "../file-upload.model";
import {FileUploadService} from "../file-upload.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay'
import {SpinnerService} from "../spinner.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialModule} from "../../material.module";

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css'],

})
export class JobDescriptionComponent implements OnInit, DoCheck {

  inputEmail = new FormControl('', [Validators.required, Validators.email]);
  inputName = new FormControl('', Validators.required);
  inputPhone = new FormControl('', Validators.required);
  commitment = new FormControl('', Validators.required);
  affiliation = new FormControl('', Validators.required);
  englishProf: string = '';
  profBg = new FormControl('', Validators.required);
  armProf = new FormControl('', Validators.required);
  goals = new FormControl('', Validators.required);
  yourMind = new FormControl('', Validators.required);
  futureContact = new FormControl('');
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  lifescitopic = new FormControl('', Validators.required);

  expectations = new FormControl('', Validators.required);
  haveFilledOut = false;

  progSkills: string = '';

  progLanguages = new FormControl('');
  molBio: string = '';
  sciLiterature: string = '';
  dataScience: string = '';
  reporting: string = '';

  plans = new FormControl('', Validators.required);
  motivation = new FormControl('', Validators.required);
  uploadedCV = true;

  cvUrl: string = '';
  uploadFileName:string = '';

  offerings = [];
  keyArray = [];
  will = new FormControl('', Validators.required);
  sweden = new FormControl('', Validators.required);
  users = new FormControl('', Validators.required);

  marketingForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    commitment: this.commitment,
    affiliation: this.affiliation,
    armProf: this.armProf,
    profBg: this.profBg,
    goals: this.goals,
    yourMind: this.yourMind,
    futureContact: this.futureContact
  });
  embleemaForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    progLanguages: this.progLanguages,
    profBg: this.profBg,
    plans: this.plans,
    motivation: this.motivation,
    futureContact: this.futureContact
  });
  sysAdminForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    profBg: this.profBg,
    users: this.users,
    motivation: this.motivation,
    goals: this.goals,
    will: this.will,
    sweden: this.sweden,
    futureContact: this.futureContact
  });

  agenusForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    profBg: this.profBg,
    goals: this.goals,
    expectations: this.expectations,
    lifescitopic: this.lifescitopic,
    futureContact: this.futureContact
  });

  constructor(public dialogRef: MatDialogRef<JobDescriptionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: JobListing,
              public uploadService: FileUploadService,
              private db: AngularFireDatabase,
              private spinner: SpinnerService) {
  }


  ngOnInit(): void {
    this.db.list('Offerings').valueChanges().subscribe(dbo=>{
      for(let i = 0; i< dbo.length; i++){
        // @ts-ignore
        this.offerings.push(dbo[i]);
      }

    });
  }
ngDoCheck() : void {
    if(this.data.jobTitle=='Marketing Manager'){
      if(this.marketingForm.valid && this.uploadService.haveFetchedURL){
        this.haveFilledOut=true;
      }
    } else if (this.data.listingTitle=='Quality assurance pipeline development and automation for gene therapy applications'){
      if(this.embleemaForm.valid && this.uploadService.haveFetchedURL){
        this.haveFilledOut=true;
      }
    } else if (this.data.listingTitle=='Linux System Administration'){
      if(this.sysAdminForm.valid && this.uploadService.haveFetchedURL){
        this.haveFilledOut=true;
      }
    } else if (this.data.listingTitle=='Systems Biology of Tumor Metastases'){
      if(this.agenusForm.valid && this.uploadService.haveFetchedURL){
        this.haveFilledOut=true;
      }
    }

}

  getErrorMessage() {
    if (this.inputEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.inputEmail.hasError('email') ? 'Not a valid email' : '';
  }
  selectFile(event: any): void{
    this.selectedFiles = event.target.files;
    // @ts-ignore
    if (this.selectedFiles) {
      // @ts-ignore
      this.uploadFileName = this.selectedFiles.item(0).name;
      // @ts-ignore
      const file: File | null = this.selectedFiles.item(0);
      this.uploadedCV = true;
      this.selectedFiles = undefined;

      if (file) {
        this.uploadedCV = true;
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    if(this.data.listingTitle=='Quality assurance pipeline development and automation for gene therapy applications'){
      if(this.embleemaForm.valid) {
        this.spinner.spin$.next(true);
        setTimeout(()=> {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);

      }
    } else if(this.data.listingTitle=='Systems Biology of Tumor Metastases'){
      if(this.agenusForm.valid){
        this.spinner.spin$.next(true);
        setTimeout(()=> {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000 );
      }
    } else if (this.data.listingTitle=='Management of ABI Marketing Campaigns'){
      if(this.marketingForm.valid){
        this.spinner.spin$.next(true);
        setTimeout(()=> {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.listingTitle=='Linux System Administration'){
      if(this.sysAdminForm.valid){
        this.spinner.spin$.next(true);
        setTimeout(()=> {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    }

  }
  submitApplication() {
    this.cvUrl = this.uploadService.fileUpload;
    if(this.uploadService.haveFetchedURL) {
      let idx = this.data.index;
      this.keyArray = this.data.keys;
        //
        if(this.keyArray[idx]!='20220301' && this.keyArray[idx] != '20220302' && this.keyArray[idx] != '20220215'){
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[idx].toString() + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['English Proficiency']: this.englishProf,
              ['Programming Skills']: this.progSkills,
              ['Skills in Molecular Biology']: this.molBio,
              ['Skills in Scientific Literature']: this.sciLiterature,
              ['Skills in Data Science']: this.dataScience,
              ['Skills in Reporting']: this.reporting,
              ['Professional Background']: this.profBg.value,
              ['Plans for the Future']: this.plans.value,
              Motivation: this.motivation.value,
              CV: this.cvUrl,
              ['Future Contact']: this.futureContact.value
            });
          alert('Your application has successfully been submitted to ABI.');
        } else if (this.keyArray[idx] == '20220215'){
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[idx].toString() + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['Professional Background']: this.profBg.value,
              CV: this.cvUrl,
              ['Future Contact']: this.futureContact.value,
              Goals: this.goals.value,
              ['English Proficiency']: this.englishProf,
              ['Time Availability']: this.commitment.value,
              ['Your Mind']: this.yourMind.value
            });
          alert('Your application has successfully been submitted to ABI.')
        } else if (this.keyArray[idx] == '20220302'){
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[idx].toString() + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['Professional Background']: this.profBg.value,
              ['Experience with Users']: this.users.value,
              CV: this.cvUrl,
              ['Future Contact']: this.futureContact.value,
              Goals: this.goals.value,
              ['English Proficiency']: this.englishProf,
              ['Supercomputers in Sweden and Germany']: this.sweden.value,
              Motivation: this.motivation.value,
              ['Willingness to Learn']: this.will.value
            });
          alert('Your application has successfully been submitted to ABI.')
        } else if (this.keyArray[idx] == '20220301') {
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[idx].toString() + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['Professional Background']: this.profBg.value,
              Goals: this.goals.value,
              CV: this.cvUrl,
              ['English Proficiency']: this.englishProf,
              Expectations: this.expectations.value,
              ['Topic in Life Science']: this.lifescitopic.value,
              ['Future Contact']: this.futureContact.value
            });
          alert('Your application has successfully been submitted to ABI.');
        }
        else
        {
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[idx].toString() + '/wwww_Responses')
            .push({
              Name: this.inputName,
              Email: this.inputEmail,
              Affiliation: this.affiliation,
              Phone: this.inputPhone,
              ['Professional Background']: this.profBg,
              Motivation: this.motivation,
              CV: this.cvUrl,
              ['Future Contact']: this.futureContact
            });
          alert('Your application has successfully been submitted to ABI.');
        }
    }
    else {
      alert('There was an error submitting your application. Make sure you have filled it out correctly, and try again.');
    }
      }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
