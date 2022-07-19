import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {MatDialog} from "@angular/material/dialog";
import {JobDescriptionComponent} from "./home/job-description/job-description.component";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Title} from "@angular/platform-browser";
import { Meta } from '@angular/platform-browser';
import {JobModel} from "./job.model";

export interface JobListing {
  id: number;
  listingTitle: string;
  jobTitle: string;
  appDeadline: string;
  description: string;
  employer: string;
  duration: string;
  format: string;
  qualifications: any;
  index: number;
  w_Visible: boolean;
  wHours: string;
  wStatus: string;
  tasks: string;
  keys: [];
  w_Image: string;
  renumeration: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @Input() i: any;
  keyArray = [];
  destroyed = new Subject<void>();
  currentScreenSize: string | undefined;

  openPositions: Array <any> = [
    {listingTitle: '',
     jobTitle: '',
     appDeadline: '',
      description: '',
     employer: '',
     duration: '',
     format: '',
     qualifications: {},
    w_Image: '',
    w_Visible: false,
    wHours: '',
    wStatus: '',
    tasks: {},
    keys: [],
    renumeration: ''},
    {listingTitle: '',
      jobTitle: '',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      duration: '6 months',
      format: 'paid internship',
      qualifications: ['Excellent knowledge of Molecular Biology/Molecular Genetics (priority) or Chemistry/Physics',
               'Basic programming and statistics skills',
               'Good writing/reporting skills',
               'High level of English proficiency',
               'Ability to learn quickly, easily read and comprehend scientific literature, motivation to learn bioinformatics',
               'Good communication skills',
               'Responsibility and time management'],
    w_Image: ''},
    {listingTitle: 'Systems biology analysis of liver metastases',
      jobTitle: 'Bioinformatics Researcher',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      duration: '6 months',
      format: 'paid internship',
      qualifications: ['Excellent knowledge of Molecular/Cancer Biology and Genomics',
              'Ability to read and comprehend scientific papers, extract data',
              'Experience with spreadsheet editors',
              'Beginner/intermediate programming skills in R (preferable) or Python',
              'Desired familiarity with genomic databases (NCBI, UCSC,GEO)']},
    {listingTitle: 'Linux System Administrator',
      jobTitle: 'System Administrator',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      format: 'part-time/full-time',
      qualifications: ['Experience working with Linux OS, command-line and shell',
              'Experience with installation of software for various user groups',
              'Experience with SLURM resource distribution system',
              'Good command of English',
              'Good communication skills']},
    {listingTitle: 'Linux System Administrator',
      jobTitle: 'System Administrator',
      appDeadline: 'DD/MM/YYYY',
      employer: 'ABI + a US-based company',
      format: 'part-time/full-time',
      qualifications: ['Experience working with Linux OS, command-line and shell',
        'Experience with installation of software for various user groups',
        'Experience with SLURM resource distribution system',
        'Good command of English',
        'Good communication skills']}
  ];
  reversedArr = [];
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver, public dialog: MatDialog, private db: AngularFireDatabase, private titleService: Title, private metaTagService: Meta) {

    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Armenian Bioinformatics Institute, Job Application Portal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Armenian Bioinformatics Institute' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-02-07', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    this.setTitle('ABI Application Portal');
    this.db.list('Applications').snapshotChanges().subscribe(res => {
      for (let i=0; i<res.length; i++){
        // @ts-ignore
        this.keyArray.push(res[i].key);
      }
      this.keyArray.reverse();
      this.db.list('Applications').valueChanges().subscribe(res=>{
        for(let i = 0; i<res.length; i++){
          // @ts-ignore
          this.db.list('Applications/' + this.keyArray[i].toString()).valueChanges()
            .subscribe((val: Array<any>)=> {
              // @ts-ignore
              this.openPositions[i].appDeadline = val[0].toString();
              // @ts-ignore
              this.openPositions[i].duration = val[1].toString();
              // @ts-ignore
              this.openPositions[i].employer = val[2].toString();
              // @ts-ignore
              this.openPositions[i].format = val[3].toString();
              // @ts-ignore
              this.openPositions[i].jobTitle = val[4];
              // @ts-ignore
              this.openPositions[i].listingTitle = val[5];
              // @ts-ignore
              this.openPositions[i].qualifications = val[6];
              // @ts-ignore
              this.openPositions[i].w_Image = val[8];
              // @ts-ignore
              this.openPositions[i].w_Visible = val[9];
              // @ts-ignore
              this.openPositions[i].wHours = val[7];
              // @ts-ignore
              this.openPositions[i].description = val[10];
              // @ts-ignore
              this.openPositions[i].wStatus = val[11];
              // @ts-ignore
              this.openPositions[i].tasks = val[12];
              // @ts-ignore
              this.openPositions[i].renumeration = val[13];
            });
        }
        // this.openPositions = this.openPositions.slice().reverse();
      });
    });



  }

  openDialog(index:number): void{
    console.log(this.reversedArr);
    let idx = index;
    const temp = this.openPositions[idx].qualifications;
    let taskArr: any[] = [];
    if(this.openPositions[idx].tasks !=''){
      const tasks = this.openPositions[idx].tasks;
      // @ts-ignore
      Object.keys(tasks).map(index => {
        //@ts-ignore
        taskArr.push(tasks[index]);
        return taskArr;
      })
    }

    let arr: any[] = [];
    Object.keys(temp).map(index => {
      //@ts-ignore
      arr.push(temp[index]);
      return arr;
    });
    this.dialog.open(JobDescriptionComponent, {
      width: '700px',
      data: {listingTitle: this.openPositions[idx].listingTitle,
            jobTitle: this.openPositions[idx].jobTitle,
        qualifications: arr,
        employer: this.openPositions[idx].employer,
        duration: this.openPositions[idx].duration,
        appDeadline: this.openPositions[idx].appDeadline,
      format: this.openPositions[idx].format,
      index: idx,
      wHours: this.openPositions[idx].wHours,
        wStatus: this.openPositions[idx].wStatus,
        description: this.openPositions[idx].description,
      tasks: taskArr,
      keys: this.keyArray,
      renumeration: this.openPositions[idx].renumeration},
      autoFocus: false
    });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
