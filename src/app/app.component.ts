
import { environment } from 'src/environments/environment';
import { Logger } from './core/logger.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { showLoader } from './shared/settings/utilities';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public lottieConfig: AnimationOptions;
  private anim: any;
  private animationSpeed = 1;

  constructor(public router: Router) {
      this.loaderRouter();
      this.lottieConfig = {
        path: 'assets/animations/load1.json',
        autoplay: true,
        loop: true,
      };
  }

  ngOnInit(): void {
    if (environment.production) {
      Logger.enableProductionMode();
    }
    log.debug('init app');
  }

  loaderRouter(): void {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        showLoader();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        showLoader(false);
      }
    });
  }

  handleAnimation(anim: AnimationItem): void {
    this.anim = anim;
    this.anim.setSpeed(1.5);
  }
}
