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

    var newCreature = new _OC.Creature(name, ocean, picture);
};

_OC.Post = function () { };

_OC.Get = function () { };

_OC.Redraw = function () { };

_OC.Delete = function () { };

_OC.Update = function () { };





