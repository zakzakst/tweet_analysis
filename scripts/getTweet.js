//==============================
// ■twitterからツイート情報を取得する
//==============================

// 利用モジュールの取り込み
const fs = require('fs');
const twit = require('twit');

// twitterAPI利用情報
const tw = new twit({
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret:''
});

// 検索文言と検索数を設定
let query = '#プレゼント';
let count = 50;

tw.get('search/tweets', {q: query, count: count},
  function(err, data, response) {
    // 出力用の配列を用意
    let tweets = new Array;

    // 各ツイートの情報を取得
    let items = data['statuses'];
    for(let i = 0; i < items.length; i++) {
      let item = new Object;
      item.date = items[i]['created_at'];
      item.text = items[i]['text'];
      item.user = items[i]['user']['name'];
      // ハッシュタグはテキストを配列の形式にして取得
      let hashtags = items[i]['entities']['hashtags'];
      let hashText = new Array;
      for(let j = 0; j < hashtags.length; j++) {
        hashText.push(hashtags[j]['text']);
      }
      item.hashtags = hashText;
      tweets.push(item);
    }

    // JSONファイルに書き出し
    fs.writeFileSync("dist/tweets.json", JSON.stringify(tweets));
  }
)
