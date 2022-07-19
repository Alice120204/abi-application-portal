import {Component, DoCheck, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUpload} from "../file-upload.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploadService} from "../file-upload.service";
import {SpinnerService} from "../spinner.service";
import {Subscription} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {LetterUploadService} from "../letter-upload.service";

export interface DialogData{
  id: string;
}

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit,DoCheck {
  inputEmail = new FormControl('', [Validators.required, Validators.email]);
  inputName = new FormControl('', Validators.required);
  inputPhone = new FormControl('', Validators.required);
  commitment = new FormControl('', Validators.required);
  affiliation = new FormControl('', Validators.required);
  opportunity = new FormControl('', Validators.required);
  englishProf: string = '';
  isClicked = false;
  uploadedLetter = false;
  public subscription: Subscription | undefined;
  profBg = new FormControl('', Validators.required);
  armProf: string = '';
  goals = new FormControl('', Validators.required);
  yourMind = new FormControl('', Validators.required);
  futureContact = new FormControl('');
  selectedFiles?: FileList;
  selectedLetters?: FileList;
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
  keyArray = [];
  plans = new FormControl('', Validators.required);
  motivation = new FormControl('', Validators.required);
  uploadedCV = true;
  will = new FormControl('', Validators.required);
  sweden = new FormControl('', Validators.required);
  users = new FormControl('', Validators.required);
  whyUs = new FormControl('', Validators.required);
  timeCommitment = new FormControl('', Validators.required);
  previousEx = new FormControl('');
  changes = new FormControl('');
  degree = new FormControl('');
  backgroundField: string = '';
  choiceProg: string = '';
  otherOpportunity: string = '';
  experiencePapers = new FormControl('', Validators.required);
  dedicate: string = '';
  benefit = new FormControl('', Validators.required);
  best = new FormControl('', Validators.required);
  bootAttend = new FormControl('', Validators.required);
  laptop = new FormControl('', Validators.required);
  topicsInterested = new FormControl('');
  otherBG: string = '';
  otherProg: string = '';
  otherdedicate: string = '';
  whyBI = new FormControl('', Validators.required);
  anythingElse = new FormControl('');
  cvUrl: string = '';
  letterUrl: string = '';
  uploadFileName: string = '';
  uploadLetterName: string = '';


  marketingForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    profBg: this.profBg,
    goals: this.goals,
    whyUs: this.whyUs,
    opportunity: this.opportunity,
    previousEx: this.previousEx,
    changes: this.changes
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
  adminForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    profBg: this.profBg,
    motivation: this.motivation,
    timeCommitment: this.timeCommitment,
    plans: this.plans,
    futureContact: this.futureContact,
    opportunity: this.opportunity
  });
  mmForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    profBg: this.profBg,
    motivation: this.motivation,
    opportunity: this.opportunity
  });
  vivanForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    profBg: this.profBg,
    motivation: this.motivation,
    plans: this.plans,
    futureContact: this.futureContact
  });
  omicssForm = new FormGroup({
    inputName: this.inputName,
    inputEmail: this.inputEmail,
    inputPhone: this.inputPhone,
    affiliation: this.affiliation,
    degree: this.degree,
    experiencePapers: this.experiencePapers,
    topicsInterested: this.topicsInterested,
    whyBI: this.whyBI,
    profBg: this.profBg,
    futureContact: this.futureContact,
    opportunity: this.opportunity,
    benefit: this.benefit,
    plans: this.plans,
    best: this.best,
    bootAttend: this.bootAttend,
    laptop: this.laptop,
    anythingElse: this.anythingElse
  });
  isPushed = false;


  constructor(
    public dialogRef: MatDialogRef<ApplicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private uploadService: FileUploadService,
    private spinner: SpinnerService,
    private db: AngularFireDatabase,
    private letterService: LetterUploadService,) {
  }

  ngOnInit(): void {
    console.log(this.data.id);
  }

  ngDoCheck(): void {
    let temp = false;
    if (this.data.id == '20220415') {
      let controls = Object.keys(this.marketingForm.controls);
      for (let i = 0; i < controls.length; i++) {
        // this.marketingForm.controls[controls[i]].dirty &&
        if (this.marketingForm.controls[controls[i]].value != '\n' && this.marketingForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }

    } else if (this.data.id == '20220116' || this.data.id == '20220117') {
      let controls = Object.keys(this.embleemaForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.embleemaForm.controls[controls[i]].value != '\n' && this.embleemaForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }
    } else if (this.data.id == '20220614_') {
      let controls = Object.keys(this.omicssForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.omicssForm.controls[controls[i]].value != '\n' && this.omicssForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }
    } else if (this.data.id == '20220418_' || this.data.id == '20220419_' || this.data.id == '20220420_') {
      let controls = Object.keys(this.mmForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.mmForm.controls[controls[i]].value != '\n' && this.mmForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }
    } else if (this.data.id == '20220302') {
      let controls = Object.keys(this.sysAdminForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.sysAdminForm.controls[controls[i]].value != '\n' && this.sysAdminForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }
    } else if (this.data.id == '20220640') {
      // console.log(this.cvUrl);
      let controls = Object.keys(this.vivanForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.vivanForm.controls[controls[i]].value != '\n' && this.vivanForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL || this.letterService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }
    } else if (this.data.id == '20220641') {
      // console.log(this.cvUrl);
      let controls = Object.keys(this.adminForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.adminForm.controls[controls[i]].value != '\n' && this.adminForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }
    } else if (this.data.id == '20220301' || this.data.id == '20220415') {
      let controls = Object.keys(this.agenusForm.controls);
      for (let i = 0; i < controls.length; i++) {
        if (this.agenusForm.controls[controls[i]].value != '\n' && this.agenusForm.controls[controls[i]].value != '' && this.uploadService.haveFetchedURL) {
          temp = true;
        } else {
          temp = false;
        }
      }

    }
    if (temp) {
      this.haveFilledOut = true;
    }
  }

  getErrorMessage() {
    if (this.inputEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.inputEmail.hasError('email') ? 'Not a valid email' : '';
  }

  selectLetter(event: any): void {
    this.selectedLetters = event.target.files;
    if (this.selectedLetters) {
      // @ts-ignore
      this.uploadLetterName = this.selectedLetters.item(0).name;
      // @ts-ignore
      const file: File | null = this.selectedLetters.item(0);
      this.uploadedLetter = true;
      this.selectedLetters = undefined;

      if (file) {
        this.uploadedLetter = true;
        this.currentFileUpload = new FileUpload(file);
        this.letterService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  selectFile(event: any): void {
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
    if (this.data.id == '20220117' || this.data.id == '20220116') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);

      }
    } else if (this.data.id == '20220301') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220418_') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220418_' || this.data.id == '20220419_') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220415') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220614_') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220302') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220640') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    } else if (this.data.id == '20220641') {
      if (this.haveFilledOut) {
        this.spinner.spin$.next(true);
        setTimeout(() => {
          this.haveFilledOut = true;
          this.spinner.stopSpinner();
        }, 7000);
      }
    }

  }

  submitApplication() {
    this.isClicked = true;
    this.isPushed = false;
    this.cvUrl = this.uploadService.fileUpload;
    this.letterUrl = this.letterService.fileUpload;
    if (this.haveFilledOut) {


      //
      if (this.data.id == '20220117' || this.data.id == '20220116') {
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL) {
          // @ts-ignore
          this.db.list('Applications/' + this.data.id + '/wwww_Responses')
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
          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220415') {
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL) {
          // @ts-ignore
          this.db.list('Applications/' + this.data.id + '/wwww_Responses')
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
              ['Armenian Proficiency']: this.armProf,
              ['Why ABI']: this.whyUs.value,
              ['How you found out about this opportunity']: this.opportunity.value,
              ['Previous Work Examples']: this.previousEx.value,
              ['Proposed Changes']: this.changes.value
            });

          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220641') {
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL) {
          // @ts-ignore
          this.db.list('Applications/' + this.data.id + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['Professional Background']: this.profBg.value,
              CV: this.cvUrl,
              ['Future Contact']: this.futureContact.value,
              Plans: this.plans.value,
              Motivation: this.motivation.value,
              ['Time Commitment']: this.timeCommitment.value,
              ['How you found out about this opportunity']: this.opportunity.value,
            });

          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220614_') {
        // @ts-ignore
        this.db.list('Applications/' + this.data.id + '/wwww_Responses')
          .push({
            Name: this.inputName.value,
            Email: this.inputEmail.value,
            Phone: this.inputPhone.value,
            Affiliation: this.affiliation.value,
            ['Last Degree Acquired']: this.degree.value,
            ['Background Field']: this.backgroundField,
            ['Other Background Field']: this.otherBG,
            ['English Proficiency']: this.englishProf,
            ['Programming Language of Choice']: this.choiceProg,
            ['Other Programming Language of Choice']: this.otherProg,
            ['Experience Reading Papers']: this.experiencePapers.value,
            ['Paper Topics Interested']: this.topicsInterested.value,
            ['Why Bioinformatics']: this.whyBI.value,
            ['Professional and Educational Background']: this.profBg.value,
            CV: this.cvUrl,
            ['Future Contact']: this.futureContact.value,
            Benefit: this.benefit.value,
            Plans: this.plans.value,
            ['What are you best at']: this.best.value,
            ['Time Dedication']: this.dedicate,
            ['Other Time Dedication']: this.otherdedicate,
            ['Attend Bootcamp?']: this.bootAttend.value,
            Laptop: this.laptop.value,
            ['How you found out about this opportunity']: this.opportunity.value,
            ['Other Opportunity']: this.otherOpportunity,
            ['Anything Else']: this.anythingElse.value,
          });
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL && this.isClicked == true) {
          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220302') {
        // @ts-ignore
        this.db.list('Applications/' + this.data.id + '/wwww_Responses')
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
            ['Supercomputers in Sweden and Germany']: this.sweden.value,
            Motivation: this.motivation.value,
            ['Willingness to Learn']: this.will.value
          });
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL && this.isClicked == true) {
          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220301') {
        // @ts-ignore
        this.db.list('Applications/' + this.data.id + '/wwww_Responses')
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
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL && this.isClicked == true) {
          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220640') {
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL && this.letterService.haveFetchedURL && this.isClicked == true && this.cvUrl != '' && this.letterUrl!='') {
          // @ts-ignore
          this.db.list('Applications/' + this.data.id + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['Professional Background']: this.profBg.value,
              Plans: this.plans.value,
              CV: this.cvUrl,
              Motivation: this.motivation.value,
              Letter: this.letterUrl,
              ['English Proficiency']: this.englishProf,
              ['Future Contact']: this.futureContact.value
            });

          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else if (this.data.id == '20220418_' || this.data.id == '20220419_' || this.data.id == '20220420_') {
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL && this.isClicked == true) {
          // @ts-ignore
          this.db.list('Applications/' + this.data.id + '/wwww_Responses')
            .push({
              Name: this.inputName.value,
              Email: this.inputEmail.value,
              Phone: this.inputPhone.value,
              Affiliation: this.affiliation.value,
              ['Professional Background']: this.profBg.value,
              Motivation: this.motivation.value,
              CV: this.cvUrl,
              ['How you found out about this opportunity']: this.opportunity.value,
              ['Future Contact']: this.futureContact.value
            });

          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      } else {
        // @ts-ignore
        this.db.list('Applications/' + this.data.id + '/wwww_Responses')
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
        this.isPushed = true;
        if (this.isPushed == true && this.uploadService.haveFetchedURL && this.isClicked == true) {
          alert('Your application has successfully been submitted to ABI. You will receive an Email confirmation shortly. If you have not received an email from us, please write to info@abi.am');
        }
      }
    }
  }


  onNoClick(): void {
    this.isPushed=false;
    this.haveFilledOut = false;
     this.dialogRef.close();
  }
}
