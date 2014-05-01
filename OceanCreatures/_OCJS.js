"use strict";

var _OC = {};

_OC.Creatures = [];

_OC.Creature = function (name, ocean, picture) {
    this.name       = name;
    this.ocean      = ocean;
    this.picture    = picture;
};

_OC.baseUrl = ["https://ocean-creatures.firebaseio.com/", "https://ocean-creatures-2.firebaseio.com/"];


_OC.Add = function () {
    var name    = document.getElementById("name").value;
    var ocean   = document.getElementById("ocean").value;
    var picture = document.getElementById("picture").value;
    
    _OC.Post(new _OC.Creature(name, ocean, picture));

    document.getElementById("name").value       = "";
    document.getElementById("ocean").value      = "";
    document.getElementById("picture").value    = "";
};

_OC.Post = function (creature) {
    var dbOne = document.getElementById("DbOne");
    var dbTwo = document.getElementById("Dbtwo");
    var db;

    if (dbOne.checked) { db = 0; }
    else { db = 1; }

    var request = new XMLHttpRequest();
    
    request.open("Post", _OC.baseUrl[db] + ".json", true);

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
    var dbOne = document.getElementById("DbOne");
    var dbTwo = document.getElementById("Dbtwo");
    var db;

    if (dbOne.checked) { db = 0; }
    else { db = 1; }

    var request = new XMLHttpRequest();
    request.open("GET", _OC.baseUrl[db] + ".json", true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            _OC.Creatures = [];

            var data = JSON.parse(this.response);
            for (var i in data) {
                data[i].key = i;
                _OC.Creatures.push(data[i]);
            }
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
        holder += _OC.Creatures[s].name + " "
            +_OC.Creatures[s].ocean + " <img src="
            +_OC.Creatures[s].picture + ">"
            + "<button onclick='_OC.Delete(\"" + _OC.Creatures[s].key + "\")'>Delete</button><br/>"
            + "<button onclick='_OC.Edit(\"" + _OC.Creatures[s].key + "\")'>Edit</button><br/> " ;
    }
    document.getElementById('creatureList').innerHTML = holder;
};

_OC.Delete = function (key) {
    var dbOne = document.getElementById("DbOne");
    var dbTwo = document.getElementById("Dbtwo");
    var db;

    if (dbOne.checked) { db = 0; }
    else { db = 1; }

    var request = new XMLHttpRequest();
    request.open("DELETE", _OC.baseUrl[db] + key + ".json", true);
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
    var request = new XMLHttpRequest();
    var key = document.getElementById("currentKey").value;
    var name = document.getElementById("name").value;
    var ocean = document.getElementById("ocean").value;
    var picture = document.getElementById("picture").value;

    var creature = new _OC.Creature(name, ocean, picture);

    request.open("PUT", _OC.baseUrl + key + ".json", true);
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

    request.send(JSON.stringify(creature));
};

_OC.Edit = function (key) {
    var creature = document.getElementById("update");
    creature.removeAttribute("class");

    var nameInput      = document.getElementById("name"); 
    var oceanInput     = document.getElementById("ocean");
    var pictureInput = document.getElementById("picture");
    var currentKey = document.getElementById("currentKey");

    
    for (var x in _OC.Creatures) {
        if (_OC.Creatures[x].key === key) {
            nameInput.value = _OC.Creatures[x].name;
            oceanInput.value = _OC.Creatures[x].ocean;
            pictureInput.value = _OC.Creatures[x].picture;
            currentKey.value = key;
        }
    }



};

_OC.sortCreatures = function () {

};

_OC.changeGet = function () {
    _OC.Creatures = [];
    _OC.Get();
};

_OC.Get();



