
https://github.com/nebulasio/wiki/blob/master/smart_contract.md
https://mp.weixin.qq.com/s/3XmJB4W_5gsObD6jfrPDnw

### couter.js

n1xN8ndQXC8NMbR7QVvKT2GaJtMRJ8MKRE2
073b7b7a4c74af0f98b7eb508e0ec0fcb0da691ea181ec69d1e28e6738b63351

### map.js

966fe09b2adcbc028d6c4bdbfe1c326d6856ae7291e9cb736f43c5429e9f8451
n1e8cSRCcZB9UVEmXx41bos9Cvs4A1XsjQJ

set ["m1", "{\"userId\": \"m1\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx\"}"]

set ["m2", "{\"userId\": \"m2\", \"musicId\":\"2\",  \"provider\":\"tencent\", \"name\":\"lwx2\"}"]

get ["m1"]

get ["m2"]

### map1.js

01aed23f37f1d9a7fe93e191b147418b00813f1431f216975a4557dc82c41f97
n22fTBtejSiWf31eb5gQ4ZkgzwddnDAwAKD

### yueting.js

#### 版本1

e45412120a5b2977cbb7ef93a7b358da62ed2b8f84aafc2cdd399787f1ce9ee1
n1wsgbCNRPouBLuG8TpUmGRbGcNEsiRXLFF

getUser  获取用户数

addUser 增加用户数

addMusic 设置某个用户的音乐

合约参数部分(浏览器钱包)

例1

["m1", "{\"userId\": \"m1\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx\"}"]

例2

["m2", "{\"userId\": \"m2\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx\"}"]

注：以下两种方式都不可行
["m1", '{"userId": "m1", "musicId":"1",  "provider":"tencent", "name":"lwx"}']
["m1", "{'userId': 'm1', 'musicId':'1',  'provider':'tencent', 'name':'lwx'}"]


getMusic  获取某个用户的音乐 ["m1"] ["m2"]


#### 版本2

2f80b547bf7e76c081d585eb86d74db8964183562d9591ae5681cee9a709b019
n1jCCWZ4quQUwG4V9Do1DehfWe6mqF6Z3mf

addUser 增加用户 如: ["m1"], ["m2"]

getUser 获取用户信息 如: ["m1"], ["m2"]

getMusic  获取某个用户的音乐 ["m1"] ["m2"]

getLike  获取某个用户点赞的音乐 ["m1"] ["m2"]

addMusic 设置某个用户的音乐

合约参数部分(浏览器钱包)

例1

["m1", "{\"userId\": \"m1\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx\"}"]

例2

["m2", "{\"userId\": \"m2\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx\"}"]

注：以下两种方式都不可行
["m1", '{"userId": "m1", "musicId":"1",  "provider":"tencent", "name":"lwx"}']
["m1", "{'userId': 'm1', 'musicId':'1',  'provider':'tencent', 'name':'lwx'}"]


addLike 设置某个用户的音乐

合约参数部分(浏览器钱包)

例1

["m1", "{\"userId\": \"m1\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx1\"}"]

["m1", "{\"userId\": \"m1\", \"musicId\":\"2\",  \"provider\":\"tencent\", \"name\":\"lwx2\"}"]

例2

["m2", "{\"userId\": \"m2\", \"musicId\":\"1\",  \"provider\":\"tencent\", \"name\":\"lwx1\"}"]

["m2", "{\"userId\": \"m2\", \"musicId\":\"2\",  \"provider\":\"tencent\", \"name\":\"lwx2\"}"]


#### 版本3

ad8d9929de13efcaff4f3b72c84a608368d50a675b1dcc39b810171208fe6950
n1yrdX3jFvaiSLCaoQaiWj6RpQn8FJpHFDD

isExist ["m1"]   {"result":"false","execute_err":"","estimate_gas":"20191"}

isExist ["m2"]   {"result":"false","execute_err":"","estimate_gas":"20191"}

addUser ["m1"]   {"result":"1","execute_err":"","estimate_gas":"20381"}

addUser ["m1"]   {"result":"Error: user undefined exist","execute_err":"Call: Error: user undefined exist","estimate_gas":"20256"}

addUser ["m2"]   {"result":"false","execute_err":"","estimate_gas":"20191"}

getUser ["m2"]   {"result":"{\"index\":1,\"musics\":{},\"likes\":{}}","execute_err":"","estimate_gas":"20284"}


### 主网

4bd54af1e9a702a5f9f0dcd29306233d3d29514e72290741305500b517299b02
n1uEE7BBeVbhtgZgeh6koPrD3wutP7g4P5N


### 给合约账号发送币导致如下异常

```
ERRO[2018-05-21T16:21:18Z] V8 Exception:
_contract_runner.js:5
                                                                        __instance["accept"].apply(__instance, JSON.parse("[]"));
                                                                                             ^
TypeError: Cannot read property 'apply' of undefined
    at _contract_runner.js:5:31  file=logger.go func=nvm.V8Log line=32
```


```
ERRO[2018-05-22T04:19:13Z] V8 Exception:
_contract_runner.js:5
                                                                        __instance["set"].apply(__instance, JSON.parse("[\"m1\",\"{\\\"userId\\\": \\\"m1\\\", \\\"musicId\\\":\\\"1\\\",  \\\"provider\\\":\\\"tencent\\\", \\\"name\\\":\\\"lwx1\\\"}\"]"));
                                                                                          ^
TypeError: Cannot read property 'apply' of undefined
    at _contract_runner.js:5:28  file=logger.go func=nvm.V8Log line=32
```



