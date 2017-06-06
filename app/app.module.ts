import { NgModule }      from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { ChannelsComponent } from './channels.component';
import { RecordingsComponent } from './recordings.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, ChannelsComponent, RecordingsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
