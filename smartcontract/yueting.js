'use strict';

var Music = function(text) {
	if (text) {
		var obj = JSON.parse(text)
		this.userId = obj.userId
		this.musicId = obj.musicId
		this.provider = obj.provider
		this.name = obj.name
	}
};

Music.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};


var YueTing = function () {
    LocalContractStorage.defineMapProperty(this, "musics", {
        parse: function (text) {
          return new Music(text);
        },
        stringify: function (o) {
          return o.toString();
        }
    });
};

YueTing.prototype = {
    init: function () {
        LocalContractStorage.set("users_num", 0);
    },

    addUser: function () {
        var num = LocalContractStorage.get("users_num");
        num += 1
        LocalContractStorage.set("users_num", num);
        if (num > 1000000) {
            throw new Error("not more user support")
        }
        return num
    },

    getUser: function () {
        var num = LocalContractStorage.get("users_num");
        return num
    },

    delUser: function () {
        var result = LocalContractStorage.set("users_num", 0);
        return result
    },

    getMusic: function (userId) {
        return this.musics.get(userId)
    },

    addMusic: function (userId, music) {
        this.musics.put(userId, music)
        return this.musics.get(userId)
    }
};

module.exports = YueTing;

