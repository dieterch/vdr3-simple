"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
require("rxjs/add/operator/map");
var cfg = require("./config");
var ChannelsComponent = (function () {
    function ChannelsComponent(_http, sanitizer) {
        this._http = _http;
        this.sanitizer = sanitizer;
        this.title = 'VDR3 Channels';
    }
    ChannelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getChannels().subscribe(function (data) {
            _this.channels = data.channels;
        });
    };
    ChannelsComponent.prototype.isMobile = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(navigator.userAgent);
    };
    ChannelsComponent.prototype.getChannels = function () {
        var url = cfg._vdrurl + ':8002/channels.json?start=0&limit=0';
        console.log(url);
        return this._http.get(url).map(function (res) { return res.json(); });
    };
    ChannelsComponent.prototype.dostream = function (chan) {
        var _lurl;
        if (this.isMobile()) {
            // alert("ein Mobilgerät")
            _lurl = "vlc-x-callback://x-callback-url/stream?url=" + cfg._vdrurl + ":3000/" + chan.channel_id;
            window.open(_lurl);
        }
        else {
            // alert("kein Mobilgerät")
            _lurl = 'data:audio/x-mpegurl,' + cfg._vdrurl + ":3000/" + chan.channel_id;
            window.open(_lurl);
        }
    };
    return ChannelsComponent;
}());
ChannelsComponent = __decorate([
    core_1.Component({
        selector: 'channels',
        template: "\n    <ul>\n        <li class=\"gallery\" *ngFor=\"let chan of channels\" (click)=\"this.dostream(chan)\">\n            <span>{{ chan.name }}</span>\n        </li>\n    </ul>\n    ",
        styles: ["\n    ul {\n      list-style-type: none;\n    }\n    .gallery {\n        float: left;\n        padding: .2em;\n    }\n    .gallery a, span {\n        font-size: 16pt;\n        color: black;\n        background-color: lightgrey;\n        text-decoration: none;\n    }\n    "]
    }),
    __metadata("design:paramtypes", [http_1.Http, platform_browser_1.DomSanitizer])
], ChannelsComponent);
exports.ChannelsComponent = ChannelsComponent;
//# sourceMappingURL=channels.component.js.map