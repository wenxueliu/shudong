"use strict";


function Set() {
    this.values = {};//集合数据保存对象的属性值
    this.length = 0; //集合中值的个数
    this.add.apply(this, arguments);//把所有的参数添加到集合
};

Set.prototype.add = function () {
    for (var i = 0, len = arguments.length; i < len; i++) {
        var val = arguments[i];
        var str = Set._valToStr(val);//转换为字符串
        if (!this.values.hasOwnProperty(str)) { //如果不在集合中,将字符串和值对应起来,集合中的长度+1
            this.values[str] = val;
            this.length++;
        }
    }
};

Set.prototype.get = function (index) {
    if (isNaN(parseFloat(index)) || !isFinite(index) || index >= this.length)  {
        return undefined;
    }
    for (var s in this.values) { //集合中所有的字符串
        if (this.values.hasOwnProperty(s)) {
            if (index == 0)
            return this.values[s];
            index–;
        }
    }
    return this;//支持链式调用
};


//集合中删除元素
Set.prototype.remove = function () {
    for (var i = 0, len = arguments.length ; i < len; i++) {
        var str = Set._valToStr(arguments[i]);
        if (this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.length–;
        }
    }
    return this;//返回this为了支持链式调用
};

//是否包含某个值
Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._valToStr(value));
};

//返回集合的长度
Set.prototype.size = function () {
    return this.length;
};

//在指定的上下文遍历集合中的所有元素
Set.prototype.foreach = function (f, context) {
    for (var s in this.values) { //集合中所有的字符串
        if (this.values.hasOwnProperty(s)) { //去掉继承而来的属性
            f.call(context, this.values[s]);
        }
    }
};

//比较两个Set是否相等
Set.prototype.equals = function (that) {
    if (this == that) {
         return true;
    }
    //如果that 对象不是一个集合,它和this不相等,使用instanceof 使这个方法可以应用于Set的任何子类
    //注意null和undefined两个值是无法用于instanceof 运算的
    if (!(that instanceof Set))  {
        return false;
    }
    if (this.size() != that.size())  {
        return false;
    }
    try {
        this.foreach(function (v) { if (!(that.contains(v))) throw false; });
    } catch (e) {
        if (e === false)  {
            return false;
        }
        throw e;
    }
};

//私有函数(通常使用_开始),用来将任意js的值和字符串对应
Set._valToStr = function (value) {
    switch (value) {
        case undefined:
            return “undefined”;
        case null:
            return “null”;
        case true:
            return “true”;
        case false:
            return “false”;
        default:
            switch (typeof value) {
                case “number”: //数字带有number前缀
                    return “number” + value;
                case “string”://字符串带有string前缀
                    return “string” + value;
                default:
                    return “@” + objectId(value);
        }
    }
    //对任意对象,都返回一个字符串,针对不同的对象,此函数返回不同的字符串,对于同一个对象多次调用,总是返回相同的字符串
    //为了做到这一点,给对象o创建一个属性,在ES5中这个属性不可枚举且是只读的
    function objectId(o) {
        var prop = “|objectid|”;//私有属性,存放id
        if (!o.hasOwnProperty(prop)) {
            o[prop] = Set._valToStr.next++;
        }
        return o[prop];
    };
};

Set._valToStr.next = 0;//初始化id的值

//TODO 解析抛出异常,处理
var Music = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		//目前 userId 就是钱包地址
		this.userId = this.userId;
		this.musicId = obj.musicId;
		this.provider = obj.provider;
		this.name = obj.name;
	}
};

DictItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var YueTing = function () {
    LocalContractStorage.defineMapProperty(this, "users", {
        parse: function (text) {
            return new Music(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });

    LocalContractStorage.defineMapProperty(this, "musics", {
        parse: function (text) {
            return new Music(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });

    LocalContractStorage.defineMapProperty(this, "likes", {
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
        // todo
    },

    //增加用户
    add_user: function(userId, value) {
        key = userId.trim();
        if (key == "") {
            key = Blockchain.transaction.from;
        }
        value = value.trim();
        if (key === "" || value === "") {
            throw new Error("empty key / value");
        }
        /*
        if (value.length > 64 || key.length > 64){
            throw new Error("key / value exceed limit length")
        }
        */

        var userInfo = this.users.get(key);
        if (userInfo) {
            throw new Error("user has exists");
        }

        var music = new Music(value);

        var myMusics = new Set();
        myMusics.add(music);

        var allMusics = this.musics.get("musics");
        if (allMusics == null) {
            allMusics = new Set();
        }
        allMusics.add(music);

        //这样点赞的时候直接添加即可
        this.likes.put(key, new Set());
        this.musics.put("musics", allMusics);
        this.uses.put(key, myMusics);
    }

    //获取用户信息
    get_user: function(userId) {
        key = key.trim();
        if (key == "") {
            key = Blockchain.transaction.from;
        }
        if (key === ""){
            throw new Error("empty key");
        }
        return this.users.get(key)
    }

    //用户添加音乐, 同时添加到用户和全局音乐表中
    add_musics: function(userId, value) {
        key = userId.trim();
        value = value.trim();
        if (key == "") {
            key = Blockchain.transaction.from;
        }
        if (key === "" || value === ""){
            throw new Error("empty key / value");
        }
        /*
        if (value.length > 64 || key.length > 64){
            throw new Error("key / value exceed limit length")
        }
        */

        var music = new Music(value)

        var myMusics = this.users.get(userId);
        myMusics.add(music);

        var allMusics = this.musics.get("musics")
        allMusics.add(music);

        this.uses.put(key, myMusics);
        this.musics.put("musics", allMusics);
    }

    get_likes: function (userId) {
        key = userId.trim();
        if (key == "") {
            key = Blockchain.transaction.from;
        }
        if (key === "") {
            throw new Error("empty key");
        }
        return this.likes.get(key)
    }

    add_likes: function (userId, value) {
        key = userId.trim();
        if (key == "") {
            key = Blockchain.transaction.from;
        }
        value = value.trim();
        if (key === "" || value === ""){
            throw new Error("empty key / value");
        }
        /*
        if (value.length > 64 || key.length > 64){
            throw new Error("key / value exceed limit length")
        }
        */

        var user = this.users.get(key);
        if (!user) {
            throw new Error("user does not exists");
        }

        var music = new Music(value);

        var myLikes = this.likes.get(key);
        //这里由于是  set 不需要检查重复添加问题
        myLikes.add(music);
        this.likes.put(key, myLikes);
    }
};

module.exports = YueTing;
