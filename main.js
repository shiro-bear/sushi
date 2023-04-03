let ans = ['スタート', 'たこ', 'さんま', 'たまご', 'なっとうまき', 'さーもん', 'のどぐろ', 'きんめだい', 'まぐろ', 'いくら', 'ひらめ'];
let inputimage = ['11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '110.png'];
//let ans = ['スタート', 'すいか', 'きんぎょ', 'ちきゅう', 'かま', 'もくし', 'どくろ', 'てんし', 'かい'];
//let inputimage = ['21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', '28.png'];
//let ans = ['スタート', 'くれーぷ', 'ぱふぇ', 'すふれ', 'ちーずけーき', 'あいすくりーむ', 'ぷりん', 'ぱんなこった', 'てぃらみす', 'ばばろあ', 'ぱい'];
//let inputimage = ['31.png', '32.png', '33.png', '34.png', '35.png', '36.png', '37.png', '38.png', '39.png', '310.png'];
let score = 0;
//swiper設定
var swiper = new Swiper('.infinite-slider', {
    //loop: true,
    loopedSlides: 2,
    slidesPerView: "auto",
    speed: 12000,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    on: {
        //問題が通り過ぎたら次へ
        slideChange: function () {
            //始まる前は無限ループ
            if (count == 0 && swiper.activeIndex == 4) {
                swiper.slideTo(0, 1);
            }
            if (count != 0 && swiper.activeIndex == 4) {
                next();
            }
        },
    }
})

var btn = document.getElementById('exe_botan');

// Enterキー押下時、送信処理が実行する
window.document.onkeydown = function (event) {
    if (event.key === 'Enter') {
        buttonClick();
    }
}

//ボタン設定
let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', buttonClick);
//クリック時各スライドに表示
function buttonClick() {
    if (document.getElementById('nameText').value == ans[count]) {
        next();
        score++;
        document.getElementById("score").innerText = score - 1;
    }
    document.getElementById("nameText").value = '';
}

//次の問題へ
var count = 0;
function next() {
    var rid = document.getElementById('riddle');
    if (count == 0) {
        rid.src = inputimage[count];
        startStop()
    }
    else if (count < inputimage.length) {
        rid.src = inputimage[count];
    } else {
        rid.src = 'normal.png';
        startStop();
    }
    count++;
    swiper.update();
    swiper.slideTo(0, 1);

    //swiper.removeAllSlides();
    //swiper.appendSlide('<div class="swiper-slide"><img src="1.png" alt="lifethings"></div>');
    //infiniteSlider.appendSlide('<div class="swiper-slide"><img src="1.png" alt="lifethings"></div>');
    //infiniteSlider.appendSlide('<div class="swiper-slide"><img src="1.png" alt="lifethings"></div>');
    //var rid = document.getElementById('riddle');
    //rid.src = inputimage[count];
}



//プログラムそのままお借りしました
// -------------------------------------------------------------------------
// stopWatch.js ストップウォッチプログラム
//
//		1970年1月1日からの経過時間（ミリ秒単位）を使っている
//
// 					created at 2014-06-26 on torisky.com
// -------------------------------------------------------------------------

var mode;					// ストップウォッチのモード	RUN/STOP
var startTime;				// スタートした時刻
var nowTime;				// ストップした時刻
var addTime;				// 経過時間（ストップウォッチ再開時に加算する）
var millisec;					// 1000分の1秒
var sec100;					// 100分の1秒
var sec;						// 秒
var min;						// 分
var hour;					// 時
var gmt;						// タイムゾーンのオフセット値
//	例）GMT+0900 なら 標準時より9時間後をさしているので-9する
var timerId;					// タイマー

/*
 * 定数
 */
var RUN = 1;				// 動作中
var STOP = 0;				// 停止中

/*
 * ストップウォッチのリセット
 */
function resetStopWatch() {
    mode = STOP;
    addTime = 0;
    millisec = sec100 = sec = min = hour = 0;
    gmt = new Date().getTimezoneOffset() / 60;	// 戻り値は分のため60で割る
    document.getElementById("time").innerHTML = "00:00:00.00";
}

/*
 * ボタン処理
 */
function startStop() {
    switch (mode) {
        case STOP:		// スタートを押したとき
            mode = RUN;
            timerId = setTimeout(runStopWatch, 10);

            // スタート時刻を設定（ストップウォッチが進んでいれば加算）
            startTime = new Date().getTime();
            addTime = (hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000 + millisec);
            startTime -= addTime;
            break;

        case RUN:		// ストップを押したとき
            mode = STOP;
            clearTimeout(timerId);
            drawTime();
    }
}

/*
 * 時間表示
 */
function drawTime() {
    var strTime = "";
    var strSec100, strSec, strMin, strHour;

    // 数値を文字に変換及び2桁表示設定
    strSec100 = "" + sec100;
    if (strSec100.length < 2) {
        strSec100 = "0" + strSec100;
    }
    strSec = "" + sec;
    if (strSec.length < 2) {
        strSec = "0" + strSec;
    }
    strMin = "" + min;
    if (strMin.length < 2) {
        strMin = "0" + strMin;
    }
    strHour = "" + hour;
    if (strHour.length < 2) {
        strHour = "0" + strHour;
    }
    // 表示形式を設定
    strTime = strHour + ":" + strMin + ":" + strSec + "." + strSec100;
    document.getElementById("time").innerHTML = strTime;
}

/*
 * 時間計測
 */
function runStopWatch() {
    // スタートからの差分をとる
    nowTime = new Date().getTime();
    diff = new Date(nowTime - startTime);
    // ミリ秒、100分の1秒、秒、分、時を設定
    millisec = diff.getMilliseconds();
    sec100 = Math.floor(millisec / 10);
    sec = diff.getSeconds();
    min = diff.getMinutes();
    hour = diff.getHours() + gmt;	// タイムゾーンのオフセットを考慮する

    drawTime();			// 時間表示
    timerId = setTimeout(runStopWatch, 10);
}

/*
 * 実行時の処理
 */
window.onload = function () {
    resetStopWatch();
    document.getElementById('length').innerText = inputimage.length;
}
