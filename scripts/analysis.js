//==============================
// ■ツイートに使用されている文言の使用頻度を分析
//==============================

// 利用モジュールの取り込み
let fs = require('fs');
let Mecab = require('mecab-lite');
let mecab = new Mecab();

// サイト情報の読み込み
let tweetFilePath = 'dist/tweets.json';
const tweetJson = fs.readFileSync(tweetFilePath, {encoding: 'utf-8'});
const tweetObj = JSON.parse(tweetJson);

// ツイートテキストを分析して出力
let mergeText = '';
let mergeHashtag = '';
for(let i = 0; i < tweetObj.length; i++) {
  mergeText += tweetObj[i]['text'];
  mergeHashtag += tweetObj[i]['hashtags'].join(',');
}
mecab.parse(mergeText, function(err, items) {
  mecabToJson(items, 'text');
});
mecab.parse(mergeHashtag, function(err, items) {
  mecabToJson(items, 'hashtag');
});

function mecabToJson(items, elName) {
  let words = {};
  for(let i in items) {
    let it = items[i];
    let w = it[0];
    let h = it[1];
    if(h != '名詞' && h != '動詞' && h != '形容詞') continue;
    if(words[w] == undefined) {
      words[w] = 1;
    } else {
      words[w]++;
    }
  }
  let list = [];
  for(let key in words) {
    list.push({
      "word": key,
      "nums": words[key]
    });
  }
  list.sort(function(a, b) {
    return b.nums - a.nums;
  });

  // JSONファイルへ書き込み
  let listJson = JSON.stringify(list);
  let savePath = 'dist/analysis/' + elName + '.json';
  fs.writeFileSync(savePath, listJson);
  console.log('ファイル書き出し完了：' + elName);
}
