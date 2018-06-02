"use strict";

//let apiList = [
//    { chainId: 1, name: "Mainnet", url: "https://mainnet.nebulas.io" },
//    { chainId: 1001, name: "Testnet", url: "https://testnet.nebulas.io" },
//    { chainId: 100, name: "Local Nodes", url: "http://192.168.1.102:8685"}
//];

//var url = "http://192.168.1.102:8685"
//var chainId = 100
var url = "https://mainnet.nebulas.io"
var chainId = 1
var smart_contract_address = "n1uEE7BBeVbhtgZgeh6koPrD3wutP7g4P5N"

function validate(selector) {
    var nebulas = require("nebulas"),
        mRules = {
            eqgt0: function (s) { return s > -1; },
            gt0: function (s) { return s > 0; },
            lengthEq35: function (s) { return s.length == 35; },
            lengthEq64: function (s) { return s.length == 64; },
            lengthGt8: function (s) { return s.length > 8; },
            number: function (s) {
                try {
                    nebulas.Utils.toBigNumber(s);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            required: function (s) { return s.length != 0; }
        };

    selector || (selector = "body");

    // or use focusin/focusout, see
    // https://stackoverflow.com/questions/9577971/focus-and-blur-jquery-events-not-bubbling
    $(selector).on({
        blur: onBlur,
        focus: onFocus
    }, "[data-validate-order-matters]");

    return validateAll;

    function onBlur(e) {
        // https://stackoverflow.com/questions/121499/when-a-blur-event-occurs-how-can-i-find-out-which-element-focus-went-to
        // Oriol
        //
        // rel = element currently has focus, validate when
        // - rel is falsy, many cases here, just validate anyway
        // - rel is child of selector
        var rel = e.relatedTarget;

        if (!rel || $(selector).find(rel).length)
            validateAll();
    }

    function validateAll() {
        var ret = true;

        // doubt - remove all invalid state?
        $("[data-validate-order-matters]").removeClass("invalid").popover("hide");

        $(selector).find("[data-validate-order-matters]").each(function (i, o) {
            var $o = $(o), arr, i, len,
                s = $o.data("validate-order-matters");

            if (s) for (arr = s.match(/\S+/g) || [], i = 0, len = arr.length; i < len; ++i) //TODO: 加上if，for括号
                if (mRules[arr[i]]) {
                    if (!mRules[arr[i]](o.value)) {
                        $o.addClass("invalid");

                        // only show popover for first invalid input
                        if (ret) {
                            ret = false;
                            $o.data("index", arr[i]);

                            $o.popover({
                                container: "body",
                                content: function () { return i18n.run($("<div><span data-i18n=validate/" + $(this).data("index") + "></span></div>")).html(); },
                                html: true,
                                placement: "auto",
                                trigger: "manual"
                            })
                                .popover("show");

                            setTimeout(function () {
                                // unlike parameterless scrollIntoView() call, this call has no visual effect if called synchronously, don't know why
                                isOnScreen(o) || o.scrollIntoView({ behavior: "smooth" });
                            });
                        }
                        break;
                    }
                } else
                    console.log("validateAll - unknown rule -", arr[i] + ", ignored");
        });

        return ret;
    }

    function onFocus() {
        validateAll();
        $(this).removeClass("invalid").popover("hide");
    }
}


var nebulas = require("nebulas"),
    Account = nebulas.Account,
    Utils = nebulas.Utils,
    neb = new nebulas.Neb(),
    globalParams = {
        account: null
    },
    balance_my,

validateTab3 = uiBlock.validate("#tab3");
//neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io/"));
neb.setRequest(new nebulas.HttpRequest(url));

uiBlock.insert({
    //footer: ".footer",
    //header: ".header",
    //iconAddress: ".icon-address",
    //logoMain: ".logo-main",
    //numberComma: ".number-comma",
    selectWalletFile: [".select-wallet-file", onUnlockFile]
});


function query(args) {
    //validateTab3() && innerCall(args, function (params) {
    console.log("begin to call nas api")
    return innerCall(args, function (params) {
        var ret
        console.dir(params)
        return neb.api
            .call({

                from: params.from,
                to: params.to,
                value: params.value,
                nonce: params.nonce,
                gasPrice: params.gasPrice,
                gasLimit: params.gasLimit,
                contract: params.contract
            })
            .then(function (resp) {
                if (resp.execute_err && resp.execute_err !== "") {
                    console.log("调用智能合约失败")
                    return resp
                } else {
                    console.log("调用智能合约成功")
                    console.log(resp)
                    return resp
                }
            })
            .catch(function (err) {
                console.log("调用智能合约失败 " + JSON.stringify(err))
            });
    });
}


function onCallTest(args, callback) {
    //validateTab3() && innerCall(args, function (params) {
    console.log("begin to call nas api")
    return innerCall(args, function (params) {
        var ret
        console.dir(params)
        neb.api
            .call({

                from: params.from,
                to: params.to,
                value: params.value,
                nonce: params.nonce,
                gasPrice: params.gasPrice,
                gasLimit: params.gasLimit,
                contract: params.contract
            })
            .then(function (resp) {
                if (resp.execute_err && resp.execute_err !== "") {
                    console.log("调用智能合约失败")
                    return callback(resp)
                } else {
                    console.log("调用智能合约成功")
                    return callback(resp)
                }
            })
            .catch(function (err) {
                console.log("调用智能合约失败 " + JSON.stringify(err))
            });
    });
}

function onCall(args, callback) {

    console.dir(playerReaddata("account")["account"])
    //globalParams.account = playerReaddata("account")["account"]
    innerCall(args, function (params) {
        //chain
        console.dir(globalParams.account)
        console.dir(params)
        var gTx = new nebulas.Transaction(parseInt(chainId),
            globalParams.account,
            params.to, params.value, params.nonce, params.gasPrice, params.gasLimit, params.contract);

        console.log("begin to sign transaction")
        gTx.signTransaction();

        neb.api
            .sendRawTransaction(gTx.toProtoString())
            .then(function (resp) {
                console.log(JSON.stringify(resp));
            })
            .catch(function (err) {
                console.log(JSON.stringify(err));
            });
    });
}

function onUnlockFile(swf, fileJson, account, password) {
    var balance_nas, state,
        fromAddr = account.getAddressString(),
        $tab = $(swf).closest(".tab");

    $(".modal.loading").modal("show");

    try {
        account.fromKey(fileJson, password);
        globalParams.account = account;
        playerRemovedata("account")
        playerSavedata("account", {"fileJson": fileJson, "password": password})

        var f = playerReaddata("account")["fileJson"]
        var p = playerReaddata("account")["password"]
        var a = Account.fromAddress(f.address)
        a.fromKey(f, p)

        playerSavedata("userId", {"userId": fromAddr})

        $("#unlock").hide();
        $("#send").show();

        neb.api.gasPrice()
            .then(function (resp) {
                return neb.api.getAccountState(fromAddr);
            })
            .then(function (resp) {
                var balance = nebulas.Unit.fromBasic(resp.balance, "nas");
                balance_my = balance
                $(".modal.loading").modal("hide");

                var user_callback = function(resp) {
                    if (resp.execute_err == "") {
                        if (resp.result == "false") {
                            console.log("user doesn't exist")
                            var create_user_callback = function(resp) {
                                if (resp.execute_err == "") {
                                    ret = JSON.parse(resp.result)
                                    //goto the index
                                    window.location.href="index";
                                } else {
                                    //refresh
                                    window.location.reload();
                                }
                            }

                            createUser(fromAddr, fromAddr, create_user_callback)
                        } else {
                            console.log("user exist")
                            //goto the index
                            window.location.href="index";
                        }
                    } else {
                        //refresh
                        conosole.log(resp.execute_err)
                        window.location.reload();
                    }
                }
                userIsExist(fromAddr, user_callback)
            })
            .catch(function (e) {
                // this catches e thrown by nebulas.js!neb
                console.log("error: ", e.message)

                bootbox.dialog({
                    backdrop: true,
                    onEscape: true,
                    message: i18n.apiErrorToText(e.message),
                    size: "large",
                    title: "Error"
                });

                $(".modal.loading").modal("hide");
            });
    } catch (e) {
        // this catches e thrown by nebulas.js!account

        bootbox.dialog({
            backdrop: true,
            onEscape: true,
            message: localSave.getItem("lang") == "en" ? e : "keystore 文件错误, 或者密码错误",
            size: "large",
            title: "Error"
        });

        $(".modal.loading").modal("hide");
    }
}

function innerCall(params, callback) {
    /*
    let params = {
        from = ,
        to = ,
        gasLimit =
        gasPrice =
        value =
        call_function =
        args =

    };
    */
    let ret = {}

    var acc = playerReaddata("account")
    var fileJson = acc["fileJson"]
    var passwd = acc["password"]
    var account = Account.fromAddress(fileJson.address)
    account = account.fromKey(fileJson, passwd)
    //account = JSON.parse(playerReaddata("account")["account"])
    globalParams.account = account
    //没想到这行代码这么重要！汗
    globalParams.account.getAddressString()

    ret.from = params.from;
    ret.to = params.to

    // prepare to
    if (!Account.isValidAddress(params.to)) {
        console.log("目的地址不合法")
        return;
    }

    // prepare gasLimit
    let gasLimit = Utils.toBigNumber(0);
    try {
        gasLimit = Utils.toBigNumber(params.gasLimit);
    } catch (err) {
        console.log(err);
    }
    if (gasLimit.cmp(Utils.toBigNumber(0)) <= 0) {
        console.log("gasLimit 必须大于 0");
        return;
    }
    ret.gasLimit = gasLimit.toNumber();

    // prepare gasPrice
    let gasPrice = Utils.toBigNumber(0);
    try {
        gasPrice = Utils.toBigNumber(params.gasPrice);
    } catch (err) {
        console.log(err);
    }
    if (gasPrice.cmp(Utils.toBigNumber(0)) <= 0) {
        console.log("gasPrice 必须大于 0");
        return;
    }
    ret.gasPrice = gasPrice.toNumber();

    // prepare value
    let value = Utils.toBigNumber(0);
    try {
        value = nebulas.Unit.toBasic(Utils.toBigNumber(params.value), "nas");
    } catch (err) {
        console.log(err);
    }
    if (value.cmp(Utils.toBigNumber(0)) < 0) {
        // TODO 添加提示value输入不对
        console.log("invalid value");
        return;
    }
    ret.value = value.toNumber();

    // prepare contract
    ret.contract = {
        "function": params.call_function,
        "args": params.call_args
    };

    var resp
    // prepare nonce
    // needs refresh data on every 'test' and 'commit' call, because data update may slow,
    // you can get different result by hit 'test' multiple times
    return neb.api.getAccountState(ret.from).then(function (resp) {
        var balance = nebulas.Unit.fromBasic(resp.balance, "nas");
        ret.nonce = parseInt(resp.nonce) + 1;
        console.log("account state")
        console.log(ret)
        return callback(ret);
    }).catch(function (err) {
        console.log("prepare nonce error: " + err);
        //bootbox.dialog({
        //    backdrop: true,
        //    onEscape: true,
        //    message: i18n.apiErrorToText(err.message),
        //    size: "large",
        //    title: "Error"
        //});
    });
}


function getLike(userId, callback) {
    var musics

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "getLike",
        call_args : "[\"" + userId + "\"]"
    }
    return onCallTest(args, callback)
}

function addLike(userId, musicId, musicName, provider, callback) {
    var profile = {
        "userId" : userId,
        "musicId" : musicId,
        "name": musicName,
        "provider": provider
    }

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "addLike",
        call_args : "[\"" + userId + "\"" + "," + JSON.stringify(JSON.stringify(profile)) + "]"
    }
    onCall(args, callback)
}

function delLike(userId, musicId) {
    var user_callback = function(resp) {
        if (resp.execute_err == "") {
            ret = JSON.parse(resp.result)
        } else {
            conosole.log(resp.execute_err)
        }
    }

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "delLike",
        call_args : "[\"" + userId + "\"" + ", \"" + musicId + "\"]"
    }
    onCall(args, user_callback)
}


function delMusic(userId, musicId) {
    var user_callback = function(resp) {
        if (resp.execute_err == "") {
            ret = JSON.parse(resp.result)
        } else {
            conosole.log(resp.execute_err)
        }
    }

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "delMusic",
        call_args : "[\"" + userId + "\"" + ", \"" + musicId + "\"]"
    }
    onCall(args, user_callback)
}

function addMusic(userId, musicId, musicName, provider, callback) {

    var profile = {
        "userId" : userId,
        "musicId" : musicId,
        "name": musicName,
        "provider": provider
    }

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "addMusic",
        call_args : "[\"" + userId + "\"" + "," + JSON.stringify(JSON.stringify(profile)) + "]"
    }
    onCall(args, callback)
}

function getMusic(userId) {
    var myId = playerReaddata("userId")["userId"]
    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "getMusic",
        call_args : "[\"" + userId + "\"]"
    }
    return query(args).then(function(resp) {
        if (resp.execute_err == "") {
            var ret = JSON.parse(resp["result"])
            return ret
        } else {
            throw new Error("getMusic: " + resp.execute_err);
        }
    }).catch(function(error) {
        console.log("get music", error)
    })
}

function createUser(userId, walletAddr, callback) {

    console.log("begin to create user")
    var profile = {
        "userId" : userId,
        "name": "default",
        "walletAddr" : walletAddr
    }

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "addUser",
        call_args : "[\"" + userId + "\"" + "," + JSON.stringify(JSON.stringify(profile)) + "]"
    }
    onCall(args, callback)
}

function userIsExist(userId, callback) {

    var args = {
        from :  userId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "isExist",
        call_args : "[\"" + userId + "\"]"
    }
    console.log("check user exist")
    return onCallTest(args, callback)
}

function userSize() {
    var myId = playerReaddata("userId")["userId"]
    var args = {
        from :  myId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "userSize",
        call_args : ""
    }
    console.log("user size")
    return query(args)
}

function allUsers(limit, offset) {
    var myId = playerReaddata("userId")["userId"]
    var args = {
        from :  myId,
        to :  smart_contract_address,
        gasLimit : "200000",
        gasPrice : "1000000",
        value : "0",
        call_function : "AllUsers",
        call_args : "[" + limit + ", " + offset + "]"
    }
    return query(args)
}


// 保存本地存储信息
function playerSavedata(key, data) {
    key = 'YueTing_' + key;    // 添加前缀，防止串用
    data = JSON.stringify(data);

    // 存储，IE6~7 不支持HTML5本地存储
    if (window.localStorage) {
        window.localStorage.setItem(key, data);
    }
}

// 读取本地存储信息
function playerReaddata(key) {
    if(!window.localStorage) return '';
    key = 'YueTing_' + key;
    return JSON.parse(localStorage.getItem(key));
}

function playerRemovedata(key) {
    if(!window.localStorage) return '';
    key = 'YueTing_' + key;
    return window.localStorage.removeItem(key);
}

