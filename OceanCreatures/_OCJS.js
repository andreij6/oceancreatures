"use strict";

var _OC = {};

_OC.Creatures = [];

_OC.Creature = function () {
    this.name       = name;
    this.ocean      = ocean;
    this.picture    = picture;
};

_OC.baseUrl = "https://ocean-creatures.firebaseio.com/";

_OC.Add = function () {
    var name    = document.getElementById("").value;
    var ocean   = document.getElementById("").value;
    var picture = document.getElementById("").value;
    
    _OC.Post(new _OC.Creature(name, ocean, picture));

    name    = " ";
    ocean   = " ";
    picture = " ";
};

_OC.Post = function (creature) {
    var request = new XMLHttpRequest();

    request.open("Post", _OC.baseUrl + ".json", true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            _OC.Get();
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERRRRRRR on POST");
    };
    request.send(JSON.stringify(creature));
};

_OC.Get = function () {
    var request = new XMLHttpRequest();
    request.open("GET", _OC.baseUrl + ".json", true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            _OC.Creatures = [];
            var data = JSON.parse(this.response);
            for (var i in data) {
                data[i].key = i;
                _OC.Creatures.push(data[i]);
            }
            console.log(this.response);
            _OC.Redraw();
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERRR on GET")
    }

    request.send();
};

_OC.Redraw = function () {
    _OC.sortCreatures();
    var holder = "";
    for (var s in _OC.Creatures) {
        holder += _OC.Creatures[s].name +
            "$" + _OC.Creatures[s].ocean
            + "<button onclick='_OC.Delete(\"" + _OC.Creatures[s].key + "\")'>Delete</button><br/>";
    }
    document.getElementById('creatureList').innerHTML = holder;
};

_OC.Delete = function (key) {
    var request = new XMLHttpRequest();
    request.open("DELETE", _OC.baseUrl + key + ".json", true);
    request.onload = function () {

        if (this.status >= 200 && this.status < 400) {

            _OC.Get();
        }
        else {
            console.log(this.response);
        }
    };
    request.onerror = function () {
        console.log("Com ERRRRRRR on POST");
    };
    request.send();
};

_OC.Update = function () {

};





