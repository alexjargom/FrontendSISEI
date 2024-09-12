import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
// import { VgCoreModule } from 'videogular2/coverage'
// import { VgCoreModule } from 'videogular2/compiled/core';
// import { VgControlsModule } from 'videogular2/compiled/controls';
// import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
// import { VgBufferingModule } from 'videogular2/compiled/buffering';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { VerMaterialComponent } from './ver-material/ver-material.component';
import { SharedModule } from 'src/app/shared';
// import { VgAPI } from 'videogular2/core';
// import {SingleMediaPlayer} from './single-media-player';

@NgModule({
  declarations: [VerMaterialComponent],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SharedModule
    // SingleMediaPlayer,
  ],
  providers:[
    // VgAPI
  ]
})
export class MaterialModule { }
