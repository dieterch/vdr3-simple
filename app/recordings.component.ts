import { Component, OnInit } from '@angular/core'
import { Http, Request, RequestMethod } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import * as cfg from  './config';

@Component({
    selector: 'recordings',
    template: `
    <ul>
        <li class="gallery" *ngFor="let rec of recordings" (click)="this.dostream(rec)">
            <span>{{ rec.event_title }}</span>
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
        background-color: lightblue;
    }
    `]
})
export class RecordingsComponent implements OnInit {

title = 'VDR3 Recordings'
recordings;

constructor(private _http: Http, private sanitizer: DomSanitizer) {		
}

ngOnInit() {
    this.getRecordings().subscribe(data => {
        this.recordings = data.recordings;
    });
}

isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

getRecordings() {
    let url = cfg._vdrurl + ':8002/recordings.json?start=0&limit=0';
    console.log(url);
    return this._http.get(url).map(res => res.json());
}

dostream(rec) {
    var _lurl;
    if (this.isMobile()) {
        // alert("ein Mobilgerät")
        _lurl = "vlc-x-callback://x-callback-url/stream?url=" + cfg._vdrurl + ":3000/" + rec.inode + '.rec.ts';
        window.open(_lurl);       
    } else {
        // alert("kein Mobilgerät")
        _lurl = 'data:audio/x-mpegurl,' + cfg._vdrurl + ":3000/" + rec.inode + '.rec.ts';
        ;
        window.open(_lurl);       
    }

}

}
