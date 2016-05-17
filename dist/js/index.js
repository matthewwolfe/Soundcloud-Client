'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
    function Core() {
        _classCallCheck(this, Core);
    }

    _createClass(Core, [{
        key: 'get',
        value: function get(url, callback) {
            var xmlhttp;

            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        callback(JSON.parse(xmlhttp.responseText));
                    }
                }
            };

            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }, {
        key: 'post',
        value: function post(url, data, callback) {
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }

            data = query.join('&');

            var xmlhttp;

            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }

            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        callback(JSON.parse(xmlhttp.responseText));
                    }
                }
            };

            xmlhttp.send(data);
        }
    }]);

    return Core;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundcloudAPI = function (_Core) {
    _inherits(SoundcloudAPI, _Core);

    function SoundcloudAPI(callback) {
        _classCallCheck(this, SoundcloudAPI);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SoundcloudAPI).call(this));

        _this.clientID = '173bf9df509c48cf53b70c83eaf5cbbd';
        _this.clientSecret = '7ddbd6fcdc2d313abfb65758c751486e';
        _this.baseUrl = 'https://api.soundcloud.com';

        _this.userAuthCode = _this.getAuthCode();

        var that = _this;

        _this.getToken(function (response) {
            that.userToken = response;
            callback();
        });
        return _this;
    }

    _createClass(SoundcloudAPI, [{
        key: 'getAuthCode',
        value: function getAuthCode() {
            var url = window.location.href;
            return url.substring(url.indexOf('=') + 1);
        }
    }, {
        key: 'getToken',
        value: function getToken(callback) {
            var url = this.baseUrl + '/oauth2/token';

            var data = {
                'client_id': this.clientID,
                'client_secret': this.clientSecret,
                'grant_type': 'authorization_code',
                'redirect_uri': 'my-app://callback.html',
                'code': this.userAuthCode
            };

            this.post(url, data, function (response) {
                callback(response);
            });
        }
    }, {
        key: 'getMe',
        value: function getMe(callback) {
            var url = this.baseUrl + '/me?oauth_token=' + this.userToken.access_token;

            this.get(url, function (response) {
                callback(response);
            });
        }
    }]);

    return SoundcloudAPI;
}(Core);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function Track(id, name) {
	_classCallCheck(this, Track);

	this.id = id;
	this.name = name;
};