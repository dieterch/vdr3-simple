import { Component } from '@angular/core';
import { ChannelsComponent } from './channels.component';
import { RecordingsComponent } from './recordings.component';
import * as cfg from  './config';


@Component({
  selector: 'my-app',
  template: `
    <channels></channels>
    <recordings></recordings>
    `
})
export class AppComponent {
 }
