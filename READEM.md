
越听

## 概要设计

### 界面

导航栏
1. 我的
2. 音乐广场
3. 搜索

用户可以点击音乐广场，听别人的音乐，也可以从搜索栏搜索
音乐，添加到自己的音乐列表中

### 交互

#### 我的

1. 当用户登录的时候， 从 nas 存储获取根据用户钱包地址获取 musicId 列表
2. 根据 musicId 从 java 服务器端获取对应歌曲的信息
3. 如果用户没有相关音乐，显示为空。

#### 音乐广场

用户点击音乐广场，从 nas  随机获取 N(比如 100) 条记录。 可以点击
换一换，重新获取一批音乐列表

随机算法参加智能合约部分

用户可以给某些自己喜欢的音乐点赞，点赞的时候，会发送 nas 币给
歌曲拥有者

#### 搜索

用户从搜索可以根据任意关键词搜索，搜索结果出来之后，可以选择将某些
音乐添加到我的音乐列表中


#### 智能合约

users   key: 用户钱包地址; value: musicsid 列表

musics  key: "musics"; value:  "userId+provider+musicid" 的列表，
如果 userId 不传递，就认为是钱包发送者的钱包地址 id

~~shards : key: "sharding"; value : 为一个数字，保存有多少个 musics
每个增加一个 musics 就加 1。~~

~~在智能合约里面包含多个 musics  的 hash 表, 每个 musics 200 条. 因此，musics 在智能合约的存储方式应该是
1 ：1-200
2 ：201-400
3 : 401-600
这样避免音乐过多导致存储压力。~~

当用户点击音乐广场的时候， 按照如下伪代码获取音乐添加到音乐广场中

randomRange(musics.get("musics), num)

随机取出 num 个歌曲

~~算法伪代码
shard_index = Random(shards["sharding"])
musics = get("musics_" + shard_index)
RandomRange(musics, 50) 随机取出 50 首歌~~

根据 music 从 java 服务器获取 musicId 对应的其他信息。
展示出来。

TODO ：基于用户点赞音乐和用户过去听的记录结合机器学习中的相关算法进行
推荐。  让用户听到她想听的，让分享者收到更丰厚的收益。

likes :  key: userdi;  value: 点赞的 music 列表，格式与 musics 一样。

智能合约相关部分 js 代码，参考 resources/static/shudong/js 下面的 

* nebulas.js 其中包括创建账号相关
* sendNas.js 其中包括发送 nas 相关
* contract.js 包括部署智能合约，这部分不暴露给用户
* viewValletInfo 查看钱包信息

### 用户管理

GET 请求，根据用户钱包地址查找所有音乐列表

POST 请求，根据用户钱包地址，将音乐 id 添加到用户钱包地址对应的 nas 存储
把音乐添加到用户钱包地址的同时，也要添加对应的 id 到 musics 中。


### 音乐服务

### tencent 音乐服务

从以下页面可以查看所有支持的 RestFul 接口，如果自己运行起来，可以测试。

http://localhost:8080/swagger-ui.html

#### 搜索歌曲, 可以是歌名，歌手等等

GET http://localhost:8080/api/search/关键词?provider=tencent&limit=10

Header : Accept: application/json

* provider 目前不关注，保留 tencent 即可。
* limit 显示返回条数。

根据关键词从获取匹配关键词的音乐列表，返回的  json 中包含音乐的图片地址和
音频地址，只要添加 img  audio 标签即可显示图片和播放音频。 此外，还包括
音乐的时长(sec)，名字，歌手等信息。 见下。

当用户添加添加的时候，就将 id 添加到用户相关的存储里面即可。参考
智能合约部分。

[
  {
    "id": "202773258",
    "title": "追光者",
    "comment": "",
    "singer": "岑宁儿",
    "duration": 235,
    "pictureURL": "https://y.gtimg.cn/music/photo_new/T002R300x300M000001qHmKU29WX7K.jpg?max_age=2592000",
    "streamURL": "http://dl.stream.qqmusic.qq.com/C400003a0mEj1ljBv5.m4a?vkey=E505272D082EF159D110D9FC570117920731939C5827F1EC1B05A79087C8AF5B91DC78EAEDBEA8E0433FA0589E2918346D83702DE6437732&guid=6612300644&uin=0&fromtag=66",
    "songMid": "0006V3BG48q1uP",
    "mediaMid": "003a0mEj1ljBv5"
  },
  {
    "id": "204298820",
    "title": "追光者 (Live)",
    "comment": "",
    "singer": "汪苏泷",
    "duration": 249,
    "pictureURL": "https://y.gtimg.cn/music/photo_new/T002R300x300M000001OJP0R3NGeiF.jpg?max_age=2592000",
    "streamURL": "http://dl.stream.qqmusic.qq.com/C400003Dkq9H0cAsTb.m4a?vkey=3589790CD086F34B31FB0670A56D9A9C9EBF4CCB5DE3784A19222519D4F59D64A91B2E1F8632444B85D65E735F49C773EF2E61D19919AB8B&guid=6612300644&uin=0&fromtag=66",
    "songMid": "000ICVgQ04O81o",
    "mediaMid": "003Dkq9H0cAsTb"
  }
]

TODO

增加评论：让用户对该歌曲进行描述，以吸引别人关注。

#### 获取音乐信息

GET http://localhost:8080/api/musics 音乐ID?provider=netease

Header : Accept: application/json,

返回如下信息

{
  "id": "202773258",
  "title": "追光者",
  "comment": "",
  "singer": "岑宁儿",
  "duration": 235,
  "pictureURL": "https://y.gtimg.cn/music/photo_new/T002R300x300M000001qHmKU29WX7K.jpg?max_age=2592000",
  "streamURL": "http://dl.stream.qqmusic.qq.com/C400003a0mEj1ljBv5.m4a?vkey=D64FE2EDE22BC1AE00B92D0B369AE34BDA23D9D947C1D15702BC06EA4CC12E9B20608C09BFB46EF599ACB9B3620C249D5AD5E90AFD281F6E&guid=6612300644&uin=0&fromtag=66",
  "songMid": "0006V3BG48q1uP",
  "mediaMid": "003a0mEj1ljBv5"
}

### netease 音乐服务

TODO

### xiami 音乐服务

TODO

### kugou 音乐服务

TODO

