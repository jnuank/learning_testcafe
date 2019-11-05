import "testcafe";
import {Selector} from "testcafe";

// 最初に行くサイトを指定
fixture("Google Search")
    .page("https://www.google.com/");

// グーグルを開いて検索
let testPattern = "Googleで検索できること";
test(testPattern, async (t) => {
    let googleSearchTextArea = Selector(".gLFyf")
    let googleSearchButton   = Selector(".gNO89b")
    // テスト開始
    await t
      // 基本的な検索をしてみる
      .typeText(googleSearchTextArea, "TestCafe")
      .click(googleSearchButton)
      // アサーション。titleタグのテキストがイコールだったらテストOK
      .expect(Selector("title").innerText).eql('TstCafe - Google 検索')
      // 結果をスクショする
      .takeScreenshot(testPattern + '.png')
});

let testPattern2 = "2回続けて検索できること";
test(testPattern2, async (t) => {
    let googleSearchTextArea = Selector(".gLFyf");
    let googleSearchButton   = Selector(".gNO89b");
    let googleSearchButtonNotFirstSite = Selector(".rINcab");

    // テスト開始
    await t
      // -------------------
      // 最初の画面で検索
      // -------------------
			// 検索実施
      .typeText(googleSearchTextArea, "TestCafe selenium")
      .click(googleSearchButton)
      .expect(Selector("title").innerText).eql('TestCafe selenium - Google 検索')
      .takeScreenshot(testPattern2 + '_1.png')

      // -------------------
		  // 検索後の画面で検索条件を変えて検索
      // -------------------
		  // この２行で一度入力欄をクリア
      .click(googleSearchTextArea)
      .pressKey('ctrl+a delete')
			// 検索実施
      .typeText(googleSearchTextArea, "コッペパン カレーパン 比較")
      .click(googleSearchButtonNotFirstSite)
      .expect(Selector("title").innerText).eql('コッペパン カレーパン 比較 - Google 検索')
      .takeScreenshot(testPattern2 + '_2.png')
});
