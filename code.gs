/**
 * 電力特調 - 後端邏輯中心
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('電力特調 - 小小實驗室')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function mixEnergy(battery, bulb) {
  let result = "";
  let emoji = "";
  
  // 判定組合邏輯
  if (battery === "串聯" && bulb === "並聯") {
    result = "「超級閃亮特調！」愛迪生喝了一口，眼睛亮得像探照燈！他大喊：「喔喔喔！這電力強到可以看到外星人啦！」";
    emoji = "🤩⚡";
  } else if (battery === "並聯" && bulb === "串聯") {
    result = "「微弱螢火蟲特調...」愛迪生喝完打了個哈欠，額頭只有一點點紅光。他說：「助手，這電力太弱了，我連牙刷都動不了。」";
    emoji = "💤🪫";
  } else if (battery === "串聯" && bulb === "串聯") {
    result = "「普通亮度特調」愛迪生點了點頭。他說：「不錯喔，這是一杯四平八穩的果汁，雖然不刺激但很安全！」";
    emoji = "💡😊";
  } else if (battery === "並聯" && bulb === "並聯") {
    result = "「持久續航特調」愛迪生喝完後非常有精神，雖然燈泡沒特別亮，但他可以連續跳舞三天三夜不休息！";
    emoji = "🔋💃";
  } else {
    // 預留錯誤或特殊狀況處理
    result = "「喔歐！短路啦！」杯子冒煙了！愛迪生的臉黑青一片。他咳嗽說：「咳咳... 雖然失敗了，但再來一次一定行！」";
    emoji = "💥😵";
  }
  
  return { text: result, icon: emoji };
}
