import { Injectable } from '@angular/core';
import {delay, Observable, of} from "../../node_modules/rxjs/dist/types";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }
  canActivate(id: string): Observable<boolean> {
      this.router.navigate(["positions/" + id]);
    return of(false);
  }
}
