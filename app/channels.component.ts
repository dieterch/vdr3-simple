import { Component, OnInit } from '@angular/core'
import { Http, Request, RequestMethod } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import * as cfg from  './config';

@Component({
    selector: 'channels',
    template: `
    <ul>
        <li class="gallery" *ngFor="let chan of channels" (click)="this.dostream(chan)">
            <span>{{ chan.name }}</span>
        </li>
    </ul>
    `,
    styles: [`
    ul {
      list-style-type: none;
    }
    .gallery {
        float: left;
        padding: .2em;
    }
    .gallery a, span {
        font-size: 16pt;
        color: black;
        background-color: lightgrey;
        text-decoration: none;
    }
    .gallery span:hover { 
        background-color: yellow;
    }
    `]
})
export class ChannelsComponent implements OnInit {

title = 'VDR3 Channels'
channels;

constructor(private _http: Http, private sanitizer: DomSanitizer) {		
}

ngOnInit() {
    this.getChannels().subscribe(data => {
        this.channels = data.channels;
    });
}

isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

getChannels() {
    let url = cfg._vdrurl + ':8002/channels.json?start=0&limit=61';
    console.log(url);
    return this._http.get(url).map(res => res.json());
}

dostream(chan) {
    var _lurl;
    if (this.isMobile()) {
        // alert("ein Mobilgerät")
        _lurl = "vlc-x-callback://x-callback-url/stream?url=" + cfg._vdrurl + ":3000/" + chan.channel_id;
        window.open(_lurl);       
    } else {
        // alert("kein Mobilgerät")
        _lurl = 'data:audio/x-mpegurl,' + cfg._vdrurl + ":3000/" + chan.channel_id;
        window.open(_lurl);       
    }

}

}
