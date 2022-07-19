import {Component, DoCheck, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JobListing} from "../../app.component";
import {Subscription} from "rxjs";
import {finalize, Observable} from "rxjs";
import {FileUpload} from "../../file-upload.model";
import {FileUploadService} from "../../file-upload.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay'
import {SpinnerService} from "../../spinner.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {ActivatedRoute} from "@angular/router";
import {ApplicationFormComponent} from "../../application-form/application-form.component";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css'],

})
export class JobDescriptionComponent implements OnInit{
  // @Input() id: any;
  id: any;
  @Input('index') index: string = '';
  jobData = [{
    appDeadline: '',
    duration: '',
    employer: '',
    format: '',
    jobTitle: '',
    listingTitle: '',
    qualifications: '',
    wHours: '',
    w_Image: '',
    w_Visible: '',
    ww_Description: '',
    ww_Status: '',
    www_Tasks: '',
    wwww_Renumeration: '',
  }];
  jobDataArray = [];
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
  qualifications = [];
  tasks = [];
  offerings = [];
  keyArray = [];
  finApplicationId = '';
  will = new FormControl('', Validators.required);
  sweden = new FormControl('', Validators.required);
  users = new FormControl('', Validators.required);

   routeKeys = {
    ['communications-&-marketing-manager-2204']: '20220415',
    ['system-administrator-2203']: '20220302',
    ['bioinformatics-researcher-2203']: '20220301',
    ['bioinformatician-life-scientist-2201']: '20220117',
    ['software-engineer-2201']: '20220116',
    ['computational-analysis-of-telomere-sequences-in-cell-free-dna-2204']: '20220418_',
     ['d3.js-for-a-gene-editing-application-2204']: '20220419_',
     ['understanding-vulnerability-in-als-using-multi-omics-2204']: '20220420_',
     ['omics-summer-school-2022-2206']: '20220614_',
     ['data-scientist,-biostatistician,-bioinformatician-2206']: '20220640',
     ['administrative-assistant-2206']: '20220641'
  };

  public subscription: Subscription | undefined;

  constructor(public uploadService: FileUploadService,
              private db: AngularFireDatabase,
              private spinner: SpinnerService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private meta: Meta) {
    route.params.subscribe(params =>{
      this.id = params['id'];
    });
    this.meta.updateTag({property: 'og:image', content: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_University_of_Heidelberg.svg/440px-Logo_University_of_Heidelberg.svg.png'})
  }


  ngOnInit(): void {

    // @ts-ignore
    let applicationId = this.routeKeys[this.id];

    this.db.list('Applications/' + applicationId).valueChanges()
      .subscribe(res=>{

          // @ts-ignore
          this.jobData[0] = res;

        let temp = this.jobData[0];
        Object.keys(this.jobData[0]).map(index => {
          //@ts-ignore
          this.jobDataArray.push(temp[index]);
          return this.jobDataArray;
        });
        if(this.jobDataArray.length >14){
          this.jobDataArray.splice(-1);
        }
        temp = this.jobDataArray[6];
        if(this.jobDataArray[6]!='' || this.jobDataArray[6] !=null && this.jobDataArray[4]!='OMICS Summer School 2022'){
          Object.keys(this.jobDataArray[6]).map(index => {
            //@ts-ignore
            this.qualifications.push(temp[index]);
            return this.qualifications;
          });
        }
        temp = this.jobDataArray[12];
        if(this.jobDataArray[12]!=' '){
          Object.keys(this.jobDataArray[12]).map(index => {
            //@ts-ignore
            this.tasks.push(temp[index]);
            return this.tasks;
          });
        }
      });
    if(!applicationId.includes('_') && this.jobDataArray[4]!='Communications & marketing manager' && this.jobDataArray[4]!='OMICS Summer School 2022'){
      this.db.list('Offerings').valueChanges().subscribe(dbo=>{
        for(let i = 0; i< dbo.length; i++){
          // @ts-ignore
          this.offerings.push(dbo[i]);
        }
      });
    }

  }
  openForm(){
    //@ts-ignore
    let applicationId = this.routeKeys[this.id];
    this.dialog.open(ApplicationFormComponent, {
      width: '700px',
      data:{
        id: applicationId
      },
      autoFocus: false
    })
  }


}
