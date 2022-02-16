import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {MatSpinner} from "@angular/material/progress-spinner";
import {Subject} from "rxjs";
import {map, scan} from "rxjs/operators";
// @ts-ignore
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SpinnerService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();
  spin$ :Subject<boolean> = new Subject();
  private spinnerTopRef: any;
  constructor(
    private overlay: Overlay,
  ) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1 ),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if(res === 1){ this.showSpinner() }
          else if( res == 0 ){
            this.spinnerTopRef.hasAttached() ? this.stopSpinner(): null;
          }
        })
  }
  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    })
  }
  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner))
  }
  stopSpinner() {
    this.spinnerRef.detach();
  }
}
