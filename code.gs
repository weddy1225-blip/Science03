function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('微光調飲室：傳奇店長版')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getAIDialog(customerName, demand, playerChoice, isCorrect) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) return "（店長正在低頭擦拭酒杯，似乎沒聽到你說話...）";

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const systemPrompt = `
    你是「微光調飲室」的傳奇店長，正在指導一個四年級的小學徒。
    當前顧客：${customerName}
    顧客需求：${demand}
    學徒選擇：${playerChoice === 'series' ? '串聯' : '並聯'}
    結果：${isCorrect ? "成功調配" : "配方出錯"}
    
    【店長口吻規則】
    1. 幽默、專業、帶一點前輩的嚴厲但充滿慈愛。
    2. 字數約 80 字。
    3. 如果成功，請稱讚學徒對電路的直覺（例如：這電力流動得像詩一樣）。
    4. 如果失敗，請用生動的比喻指正（例如：這杯喝起來像短路的電池，苦澀得讓人想叫救護車）。
    5. 必須提到電路原理（串聯分壓/並聯分流）但要讓四年級生聽得懂。
  `;

  try {
    const response = UrlFetchApp.fetch(apiUrl, {
      method: 'post', contentType: 'application/json',
      payload: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
    });
    return JSON.parse(response.getContentText()).candidates[0].content.parts[0].text;
  } catch (e) {
    return isCorrect ? "這杯調得真有靈魂！電流節奏抓得很準。" : "哎呀，這杯的味道有點「斷路」了，再去練習看看！";
  }
}
