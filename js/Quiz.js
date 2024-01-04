class Quiz {
    /**
     * 
     * @param {string} question
     * @param {string} answer
     * @param {number} solveCount
     * @param {Date} lastSolveDate
     */
    constructor(question, answer, solveCount, lastSolveDate) {
        /** @type {string} */
        this.question = question;
        /** @type {string} */
        this.answer = answer;
        /** @type {number} */
        this.solveCount = solveCount;
        /** @type {Date} */
        this.lastSolveDate = lastSolveDate;
        /** @type {boolean} */
        this.isProtected = false;
    }

    static fromRow(row) {
        return new Quiz(row[0], row[1], 0, null);
    }

    static fromTable(table) {
        return table.map(row => Quiz.fromRow(row));
    }
}

const quizData = localStorage.getItem('quizData');
let quizzes = [];

if(quizData) {
    quizzes = JSON.parse(quizData);
    quizzes.map(quiz => quiz.isProtected = false);
} else {
    let quizTable = [["とにかくやってみよう。\nLet's try a-----.", "anyway"], ["スピーチに続いて、夕食を取った。\nF------- the speech, we had dinner.", "Following"], ["地図を参照してください。\nPlease r--- to the map", "refer"], ["チケットはオンラインで入手可能です。\nTickets are a--- online.", "available"], ["営業部\nthe sales d---", "department"], ["大きな会議室\na large c--- room", "conference"], ["メールによると\nA--- to the mail", "according"], ["女性はおそらく誰ですか。\nWho most l--- is the woman?", "likely"], ["男性は何をすることを申し出ていますか。\nWhat does the man o--- to do?", "offer"], ["新しいオフィス機器\nnew office e---", "equipment"], ["あなたのメールアドレスを提供してください。\nPlease p--- me with your e-mail address", "provide"], ["地元の会社\nl--- businesses", "local"], ["仕事の空き\na job o---", "opening"], ["チケットを購入する\np--- tickets", "purchase"], ["建設プロジェクト\nc--- project", "construction"], ["工場を見学している間\nwhile t---ing the factory", "tour"], ["市場調査\nmarket r---", "research"], ["会議に出席する\na--- a meeting", "attend"], ["配達日を変更する\nchange a d--- date", "delivery"], ["私は最近プリンターを買った。\nI r--- bought a printer.", "recently"], ["加藤さんについて何が示さていますか。\nWhat is i---d about Mr. Kato?", "indicate"], ["ホテルの従業員\nan e--- of a hotel", "employee"], ["追加のスタッフを要請する\nrequest a--- staff", "additional"], ["顧客アンケート調査\na customer s---", "survey"], ["報告書に目を通す\nr--- a report", "review"], ["生産エリア\nthe p--- area", "production"], ["地下鉄の駅近くの便利な場所にある\nconveniently l--- near a subway station", "located"], ["計画の詳細\nd---s of a plan", "detail"], ["入賞者を発表する\na--- the winners", "announce"], ["コンピュータの修理店\na computer r--- shop", "repair"], ["売り上げの増加\nan i--- in sales", "increase"], ["用紙に含まれていないのは何でですか。\nWhat is NOT i---d in the form?", "include"], ["その品は現在在庫切れです。\nThe item is c--- out of stock.", "currently"], ["広告キャンペーン\nan a--- campaign", "advertising"], ["そのサービスには50ドルを請求します。\nWe c--- $50 for the service.", "charge"], ["加藤さんは明日到着する予定だ。\nMr. Kato is e---ed to arrive tomorrow.", "expect"], ["家族経営の会社\na family-owned f---", "firm"], ["顧客を訪問する\nvisit a c---", "client"], ["政府からのお金の支援\nf--- support frim the government", "financial"], ["年次報告書\nan a--- report", "annual"], ["オンラインの支払いをする。\nmake an online p---", "payment"], ["今年の予算\nthis year's b---", "budget"], ["応募書類に記入する\nfill out an a---", "application"], ["契約に署名する前に\nbefore signing a c---", "contract"], ["経営セミナー\na m--- seminar", "management"], ["従業員の成績\nan employee's p---", "performance"], ["最終結果に満足している。\nWe are p--- with the final result.", "pleased"], ["支払いを確認する\nc--- a payment", "confirm"], ["授賞式\na---s ceremony", "award"], ["衣料品店\na c--- store", "clothing"], ["展示されている製品\nproducts on d---", "display"], ["合格した候補者\na successful c---", "candidate"], ["ホテルについて何が述べられていますか。\nWhat is s---d about the hotel?", "state"], ["博物館の展示物\na museum e---", "exhibit"], ["質疑応答の時間\na Q&A s---", "session"], ["値段は変更になる場合があるので、注意してください。\nPlease n--- that prices may change.", "note"], ["注文を処理する\np--- an order", "process"], ["説明書をすべてお読みください。\nPlease read all the i---s", "instruction"], ["会員登録する\nsign up for m---", "membership"], ["旅行代理店\na travel a---", "agency"], ["シアトルに拠点を置く\na Seattle-b--- company", "based"], ["研究施設\na reseach f---", "facility"], ["事前の告知\na--- notice", "advance"], ["委員会に入る\njoin a c---", "committee"], ["そのイベントは成功だった。\nThe event was s---.", "successful"], ["素晴らしいサービス\ne--- service", "excellent"], ["ファッション業界\nthe fashion i---", "industry"], ["延滞料金を払う\npay a late f---", "fee"], ["オファーを受け入れる\na--- an offer", "accept"], ["今度のイベントの準備をする\nprepare for an u--- event", "upcoming"], ["村上春樹の最新の小説\nHaruki Murakami's l--- novel", "latest"], ["レポートを提出する\ns--- a report", "submit"], ["公共の交通機関を利用する\nuse public t---", "transportation"], ["履歴書を送る\nsend a r---", "resume"], ["会社の重役\na company e---", "executive"], ["新たな商品ラインを導入する\ni--- a new line of products", "introduce"], ["以前の経験がない\nhave no p--- experience", "previous"], ["提案に目を通す\nreview a p---", "proposal"], ["オフィス用品\noffice s---s", "supply"], ["履歴書を同封いたします。\nMy resume is e---d", "enclose"], ["返品規定\nreturns p---", "policy"], ["社員研修に登録する\nr--- for employee training", "register"], ["会議の手配をする\na--- a meeting", "arrange"], ["請求書を受け取る\nrevceive a b---", "bill"], ["アシスタントを雇う\nh--- an assistant", "hire"], ["計画を承認する\na--- a plan", "approve"], ["アンケート調査を行う\nc--- a survey", "conduct"], ["あなたとお仕事をする機会\nan o--- to work with you", "opportunity"], ["プロジェクトの締め切り\nthe d--- for the project", "deadline"], ["企業のトレーナー\na c--- trainer", "corporate"], ["3年保証\na three-year w---", "warranty"], ["必要な用紙\nn--- forms", "necessary"], ["ホテルの部屋を予約する\nr--- a room at a hotel", "reserve"], ["地元の住民\nlocal r---s", "resident"], ["新しいロゴを作り出す\nc--- a new logo", "create"], ["～を知らせることができて嬉しい\nWe are happy to i--- you that", "inform"], ["顧客がオンラインで支払うことを可能にする\na--- customers to pay online", "allow"], ["男性はどんな問題について述べていますか。\nWhat problem does the man m---?", "mention"], ["助けていただいて本当に感謝しています。\nI really a--- your help.", "appreciate"], ["交換部品\nr--- parts", "replacement"], ["交通の最新情報\ntraffic u---s", "update"], ["新しい視点をオープンする\nopen a new b---", "branch"], ["有給休暇\np--- leave", "paid"], ["残念なことに、いくつか問題があります。\nU---, there are some problems.", "unfortunately"], ["もとの状態で\nin o--- condition", "original"], ["家賃の値上げ\na r--- increase", "rent"], ["社内文書を書く\nwrite a m---", "memo"], ["旅行かばんを買い求める\nshop for l---", "luggage"], ["新聞の編集者\na newspaper e---", "editor"], ["美術展\nan art e---", "exhibition"], ["トップの会社\na l--- company", "leading"], ["組織を率いる\nlead an o---", "organization"], ["ニューアルバムを発売する\nr--- a new album", "release"], ["期間限定で\nfor a l--- time", "limited"], ["通常の手続き\na normal p---", "procedure"], ["経験豊かなエンジニア\nan e--- engineer", "experienced"], ["全社員\nall company p---", "personnel"], ["人気本の著者\nthe a--- of a popular book", "author"], ["従業員の福利厚生\nemployee b---s", "benefit"], ["一点に集中する\nf--- on one point", "focus"], ["セミナーに参加する\np--- in the workshop", "participate"], ["問題の原因\nthe c--- of the problem", "cause"], ["ジャーナリズムの学位\na d--- in journalism", "degree"], ["ウェブサイトから直接購入する\npurchase d--- from a Web site", "directly"], ["テレビ番組の司会者\nthe h--- of a television show", "host"], ["その分野の専門家\nan e--- in the field", "expert"], ["我々はあなたの知識に感心した。\nWe were i---ed by your knowledge.", "impress"], ["主に鋼鉄業界で働く\nwork m--- in the steel industry", "mainly"], ["提案を行う\nmake s---s", "suggestion"], ["納入業者との関係\nrelationships with s---s", "supplier"], ["重要な書類\nan important d---", "document"], ["従業員に規制に関して再確認する\nr--- employees about the policy", "remind"], ["作業員は制服の着用を求められます。\nWorkers are r---d to wear uniforms.", "require"], ["営業担当者\na sales r---", "representative"], ["梱包エリア\nthe p--- area", "packaging"], ["職務内容の説明\na job d---", "description"], ["不動産の管理人\na p--- manager", "property"], ["内線4649にお電話ください。\nCall me at e--- 4649.", "extension"], ["仕事について問い合わせる\ni--- about a job", "inquire"], ["商品を陳列する\ndisplay m---", "merchandise"], ["非常に成功しているビジネス\na h--- successful business", "highly"], ["そのキャンペーンは成功という結果になった。\nThe campaign r---ed in success.", "result"], ["ご支援ありがとうございます。\nThank you for your a---.", "assistance"], ["従業員がイベントに参加することを奨励します。\nEmployees are e---d to attend the event.", "encourage"], ["会社の一人一人の個人\neach i--- in the company", "individual"], ["研究所に入るとき\nwhen entering the l---", "laboratory"], ["日本での勤務を検討する\nc--- working in Japan", "consider"], ["本社をボストンに移転する\nmove the h--- to Boston", "headquarters"], ["注文を出荷する準備が出来ました。\nWe are ready to s--- your order.", "ship"], ["商業ビル\nc--- buildings", "commercial"], ["医療機器\na medical d---", "device"], ["このお知らせはだれに向けられていますか。\nFor whom is the notice i---?", "intended"], ["製品パンフレット\na product b---", "brochure"], ["速達郵便で\nby express m---", "mail"], ["私はパートタイムで働くほうが好きです。\nI p--- to work part-time.", "prefer"], ["お手紙へのご返事です。\nI'm writing in r--- to your letter.", "response"], ["その地域の会社\ncompanies in the r---", "region"], ["ミュージアムへの寄付\nd---s to a museum", "donation"], ["第３四半期\nthe third q---", "quarter"], ["賃貸契約書\na rental a---", "agreement"], ["科学の専門誌\na scientific j---", "journal"], ["書類を配布する\nd--- a document", "distribute"], ["見込み客\np--- customers", "potential"], ["アポを予定変更する。\nr--- an appointment", "reschedule"], ["契約を更新する\nr--- a contract", "renew"], ["倉庫から出荷する\nship from a w---", "warehouse"], ["全額返金\na full r---", "refund"], ["聞き手は何をするよう勧められていますか。\nWhat are listeners a---d to do?", "advise"], ["チケットは即売り切れた。\nThe tickets sold out i---.", "immediately"], ["市議会\nthe city c---", "council"], ["その番組は通常土曜日に放送される。\nThe program is usually b--- on Saturdays.", "broadcast"], ["私は従業員の研修を担当している。\nI am r--- for training employees.", "responsible"], ["時間の無駄遣いを避ける\na--- wasting time", "avoid"], ["効果的な広告キャンペーン\ne--- advertising campaigns", "effective"], ["招待状を受け取る\nreceive an i---", "invitation"], ["値段を下げる\nr--- prices", "reduce"], ["乗り物を駐車する\npark a v---", "vehicle"], ["エネルギーの効率的な使用\ne--- use of energy", "efficient"], ["自動車メーカー\na car m---", "manufacturer"], ["快適な部屋とフレンドリーなスタッフ\nc--- rooms and friendly staff", "comfortable"], ["正しい住所\nthe c--- address", "correct"], ["中心街のレストラン\nd--- restaurants", "downtown"], ["支払い方法\nthe m--- of payment", "method"], ["全スタッフ\nthe e--- staff", "entire"], ["広範囲のサービス\na wide r--- of services", "range"], ["美しい環境にあるホテル\na hotel in a beautiful s---", "setting"], ["ご不便をおかけしますことをお詫びします。\nWe a--- for the inconvenience.", "apologize"], ["インターネットの頻繁な使用\nf--- use of the Internet", "frequent"], ["テックスの営業マネージャーへの昇進\nTex's p--- to sales manager", "promotion"], ["あなたのご注文に関して\nr--- your order", "regarding"], ["臨時雇いの従業員\nt--- workers", "temporary"], ["伝統的なイタリア料理\nt--- Italian dishes", "traditional"], ["メンバーは入場無料です。\nA--- is free for all members.", "admission"], ["その部屋には50人が入る。\nThe room can f--- 50 people.", "fit"], ["照会先に連絡を取る。\ncontact a r---", "reference"], ["配送状況\nshipment s---", "status"], ["燃料のコスト\nf--- costs", "fuel"], ["2年近く\nn--- two years", "nearly"], ["昼食のために社員食堂に集まる\nmeet in the c--- for lunch", "cafeteria"], ["製品の売り方を決定する\nd--- how to sell the product", "determine"]];
    quizzes = Quiz.fromTable(quizTable);
}

addEventListener('beforeunload', () => {
    localStorage.setItem('quizData', JSON.stringify(quizzes));
});

function getRandomQuiz() {
    const unsolvedQuizzes = quizzes.filter(quiz => quiz.lastSolveDate === null || new Date(quiz.lastSolveDate) < new Date(new Date(new Date().setDate(new Date().getDate() - 3 ** Math.max(quiz.solveCount - 1, 0))).setHours(0, 0, 0, 0)));
    if (unsolvedQuizzes.length > 0) {
        console.log(`unsolvedQuizzes: ${unsolvedQuizzes.length}`);
        return unsolvedQuizzes[Math.floor(Math.random() * unsolvedQuizzes.length)];
    }
    const wrongQuizzes = quizzes.filter(quiz => quiz.solveCount === 0);
    if (wrongQuizzes.length > 0) {
        console.log(`wrongQuizzes: ${wrongQuizzes.length}`);
        return wrongQuizzes[Math.floor(Math.random() * wrongQuizzes.length)];
    }
    quizzes.map(quiz => quiz.isProtected = true);
    console.log(`quizzes: ${quizzes.length}`);
    return quizzes[Math.floor(Math.random() * quizzes.length)];
}