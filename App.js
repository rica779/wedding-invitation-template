import { useState, useEffect, useRef } from "react";

// ================================================================
// ▼▼▼ サイト設定 — ここだけ書き換えればOK ▼▼▼
// ================================================================
// ================================================================
// ▼▼▼ 納品時カスタマイズエリア — ここだけ書き換えればOK ▼▼▼
// ================================================================
const SITE_CONFIG = {

  // ── 新郎新婦の名前 ──────────────────────────────────────────
  groomName:         "Kenji",               // 新郎 名（英語Hero表示用）
  groomFullNameJa:   "田中 健司",           // 新郎 フルネーム（日本語）
  groomFullNameEn:   "Kenji Tanaka",        // 新郎 フルネーム（英語・ローマ字）

  brideName:         "Yuki",               // 新婦 名（英語Hero表示用）
  brideFullNameJa:   "山田 由紀",          // 新婦 フルネーム（日本語）
  brideFullNameEn:   "Yuki Yamada",        // 新婦 フルネーム（英語・ローマ字）

  // ── 日程 ────────────────────────────────────────────────────
  date:              "2025年10月12日（日）", // 日本語表記
  dateEn:            "Sunday, October 12, 2025", // 英語表記

  // ── 会場 ────────────────────────────────────────────────────
  venue:             "ヒルトン東京",        // 会場名（日本語）
  venueEn:           "Hilton Tokyo",        // 会場名（英語）
  venueSubEn:        "HILTON TOKYO · SHINJUKU", // Hero下部サブテキスト（英語）
  venueAddress:      "〒163-1003\n東京都新宿区西新宿6-6-2\nTEL: 03-3344-5111", // 住所（日本語）
  venueAddressEn:    "6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-1003\nTEL: 03-3344-5111", // 住所（英語）
  venueMapUrl:       "https://maps.google.com/?q=ヒルトン東京", // Googleマップ URL

  // ── アクセス ─────────────────────────────────────────────────
  trainBodyJa:       "都営大江戸線「都庁前駅」A6出口より徒歩5分\n東京メトロ丸の内線「西新宿駅」2番出口より徒歩10分",
  trainBodyEn:       "Toei Oedo Line: 5 min walk from Tochomae Station (Exit A6)\nTokyo Metro Marunouchi Line: 10 min walk from Nishi-Shinjuku Station (Exit 2)",
  carBodyJa:         "地下駐車場をご利用いただけます（有料）\n首都高速「新宿出口」より約5分",
  carBodyEn:         "Underground parking available (paid)\nApprox. 5 min from Shinjuku Exit on the Metropolitan Expressway",

  // ── RSVP締切 ────────────────────────────────────────────────
  rsvpDeadline:      "9月30日",

  // ── 引き出物カタログ ──────────────────────────────────────────
  catalogueStandard: "https://example.com/catalogue/standard", // 一般ゲスト用
  cataloguePremium:  "https://example.com/catalogue/premium",  // 上司・役員用
  premiumKey:        "yk2025", // プレミアム認証キー（自由に変更可）

  // ── Google スプレッドシート連携 ──────────────────────────────
  // ↓ 手順4で取得したURLをここに貼り付けてください
  spreadsheetUrl:    "", // 例: "https://script.google.com/macros/s/XXXXXX/exec"
};
// ================================================================
// ▲▲▲ カスタマイズエリアここまで ▲▲▲
// ================================================================
// ================================================================
// ▲▲▲ ここまでが設定エリア ▲▲▲
// ================================================================
// 25b225b225b2 30533053307e3067304c8a2d5b9a30a830ea30a2 25b225b225b2
// ================================================================

// ================================================================
// 翻訳テキスト — 日本語・英語
// ================================================================
const T = {
  ja: {
    // Nav
    home: "HOME", rsvp: "出欠確認", gallery: "ギャラリー",
    // Hero
    invitation: "WEDDING INVITATION",
    rsvpBtn: "ご出席の回答はこちら",
    scrollHint: "",
    // Greeting
    greetingLabel: "ごあいさつ",
    greetingBody: "この度、私たちは結婚式を挙げることになりました。\n皆様のご臨席を賜り、ともに喜びを分かち合えれば\nこれ以上の幸せはございません。\n\nぜひお気軽にご回答ください。",
    // Schedule
    scheduleLabel: "SCHEDULE", scheduleTitle: "当日のスケジュール",
    ceremony: "挙　式", reception: "披露宴",
    ceremonyPlace: "ヒルトン東京　チャペル",
    receptionPlace: "ヒルトン東京　グランドボールルーム",
    receptionOpen: "受付開始　11:30〜",
    // Venue
    venueLabel: "VENUE", venueTitle: "会場", venueName: "ヒルトン東京",
    venueAddress: "〒163-1003\n東京都新宿区西新宿6-6-2\nTEL: 03-3344-5111",
    mapBtn: "🗺️ Google マップで開く",
    // Access
    accessLabel: "ACCESS", accessTitle: "アクセス",
    trainTitle: "電車でお越しの方",
    trainBody: "都営大江戸線「都庁前駅」A6出口より徒歩5分\n東京メトロ丸の内線「西新宿駅」2番出口より徒歩10分",
    carTitle: "お車でお越しの方",
    carBody: "地下駐車場をご利用いただけます（有料）\n首都高速「新宿出口」より約5分",
    // Gift
    giftTitle: "ご祝儀について",
    giftBody: "ご祝儀は当日、受付にてお受けしております。\n皆様のご臨席が何よりの贈り物です。",
    // RSVP
    rsvpSectionLabel: "ご出欠のご確認",
    rsvpSectionTitle: "お返事をお聞かせください",
    step: "STEP",
    // Step1
    step1Title: "ご出席いただけますか？",
    step1Hint: "タップしてお選びください",
    attendYesLabel: "喜んで出席します",
    attendYesSub: "ご家族での参加も大歓迎です",
    attendNoLabel: "残念ですが欠席します",
    attendNoSub: "またの機会にぜひお会いしましょう",
    // Step2
    step2Title: "代表者のお名前と人数を教えてください",
    repNameLabel: "代表者のお名前（漢字）",
    repNamePlaceholder: "例：山田 太郎",
    repKanaLabel: "代表者のお名前（ふりがな）",
    repKanaPlaceholder: "例：やまだ たろう",
    countLabel: "ご出席人数（ご本人を含む）",
    countHint: "ご家族やお連れ様がいる場合は人数を変更してください",
    countUnit: "名",
    // Step3
    step3Title: "各参加者の情報を教えてください",
    step3TitleNo: "アレルギーはございますか？",
    step3Hint: "大人・子供の選択と、アレルギーをお知らせください",
    representative: "代表者",
    companion: "同行者",
    adultChildLabel: "大人 / お子様",
    adult: "大人", child: "お子様",
    ageLabel: "お子様の年齢",
    agePlaceholder: "選択してください",
    ageUnit: "歳",
    menuLabel: "🍽️ お食事メニュー",
    recommended: "おすすめ",
    menuRecommendNote: "歳のお子様には",
    menuRecommendNote2: "がおすすめです",
    menuLunch: "お子様ランチ", menuLunchTarget: "2歳〜6歳（未就学児〜低学年）向け",
    menuJunior: "ジュニアコース", menuJuniorTarget: "7歳〜12歳（小学校中〜高学年）向け",
    menuAdult: "大人と同じコース", menuAdultTarget: "中学生以上向け",
    menuNone: "食事不要", menuNoneTarget: "0〜1歳（乳幼児）向け",
    allergyLabel: "食物アレルギー",
    allergyOptional: "（なければ空欄でOK）",
    allergyPlaceholder: "例：えび・かに・ナッツ類",
    allergyOptionalShort: "（任意）",
    allergyPlaceholderShort: "例：えび・かに",
    totalSummary: "合計", totalAdult: "大人", totalChild: "お子様",
    // Step4
    step4Title: "お二人へのメッセージ",
    messageLabel: "メッセージ",
    messageOptional: "（任意・空欄でもOKです）",
    messagePlaceholder: "お二人へひとことどうぞ。",
    confirmLabel: "送信内容の確認",
    confirmRep: "代表者", confirmAttend: "出欠", confirmAttendYes: "出席", confirmAttendNo: "欠席",
    confirmCount: "出席人数", confirmAdult: "大人", confirmChild: "お子様",
    confirmMealLunch: "お子様ランチ", confirmMealJunior: "ジュニアコース",
    confirmMealAdult: "大人と同じコース", confirmMealNone: "食事不要",
    confirmAllergy: "のアレルギー", confirmMeal: "のお食事",
    backBtn: "← 戻る", nextBtn: "次へ →", submitBtn: "送信する ✓",
    // Done
    doneLabel: "ご回答ありがとうございます",
    doneYesTitle: "喜んでお待ちしております",
    doneNoTitle: "またの機会に",
    doneYesBody: "ご回答を承りました。\n皆様にお会いできることを楽しみにしております。",
    doneNoBody: "ご回答ありがとうございました。\nお気持ちだけでも大変嬉しく思います。",
    confirmSummaryLabel: "回答内容の確認",
    catalogueLabel: "GIFT CATALOGUE",
    catalogueTitle: "引き出物のご選択について",
    catalogueBody: "お時間のあるときに、\nウェブカタログからお好きな品をお選びください。",
    catalogueSub: "式当日までいつでもご覧いただけます",
    catalogueBtn: "カタログを見る →",
    catalogueNote: "※ お時間のあるときにいつでもどうぞ",
    // Gallery
    galleryLabel: "思い出のギャラリー",
    galleryTitle: "Our Story",
    gallerySubtitle: "ふたりの歩みをご覧ください",
    uploadTitle: "お写真を共有してください",
    uploadSub: "当日の写真をここに追加できます",
    uploadBtn: "写真を選ぶ",
    lightboxClose: "タップで閉じる",
    // Footer
    footerContact: "ご不明な点はLINEまたはお電話でお問い合わせください",
    photoLabels: ["春の出会い","プロポーズ","旅行の思い出","日常のひととき","婚約指輪","記念日","前撮り","ふたりで","お気に入りの場所"],
  },
  en: {
    // Nav
    home: "HOME", rsvp: "RSVP", gallery: "Gallery",
    // Hero
    invitation: "WEDDING INVITATION",
    rsvpBtn: "Reply to Invitation",
    scrollHint: "",
    // Greeting
    greetingLabel: "Message",
    greetingBody: "We are delighted to announce our wedding ceremony.\nWe would be honored to have you celebrate\nthis special day with us.\n\nPlease reply at your earliest convenience.",
    // Schedule
    scheduleLabel: "SCHEDULE", scheduleTitle: "Day Schedule",
    ceremony: "Ceremony", reception: "Reception",
    ceremonyPlace: "Hilton Tokyo — Chapel",
    receptionPlace: "Hilton Tokyo — Grand Ballroom",
    receptionOpen: "Check-in from 11:30 AM",
    // Venue
    venueLabel: "VENUE", venueTitle: "Venue", venueName: "Hilton Tokyo",
    venueAddress: "〒163-1003\n6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo\nTEL: 03-3344-5111",
    mapBtn: "🗺️ Open in Google Maps",
    // Access
    accessLabel: "ACCESS", accessTitle: "Access",
    trainTitle: "By Train",
    trainBody: "Toei Oedo Line: 5 min walk from Tochomae Station (Exit A6)\nTokyo Metro Marunouchi Line: 10 min walk from Nishi-Shinjuku Station (Exit 2)",
    carTitle: "By Car",
    carBody: "Underground parking available (paid)\nApprox. 5 min from Shinjuku Exit on the Metropolitan Expressway",
    // Gift
    giftTitle: "Monetary Gift",
    giftBody: "We will gratefully accept monetary gifts at the reception desk on the day.\nYour presence is the greatest gift of all.",
    // RSVP
    rsvpSectionLabel: "RSVP",
    rsvpSectionTitle: "Please let us know",
    step: "STEP",
    // Step1
    step1Title: "Will you be able to attend?",
    step1Hint: "Please tap to select",
    attendYesLabel: "Joyfully accept",
    attendYesSub: "Families and partners are most welcome",
    attendNoLabel: "Regretfully decline",
    attendNoSub: "We hope to celebrate with you another time",
    // Step2
    step2Title: "Please enter your name and party size",
    repNameLabel: "Your name (Kanji / Full name)",
    repNamePlaceholder: "e.g. Taro Yamada",
    repKanaLabel: "Your name (reading / romanization)",
    repKanaPlaceholder: "e.g. Yamada Taro",
    countLabel: "Number of guests (including yourself)",
    countHint: "Please update if you are bringing family or a partner",
    countUnit: "",
    // Step3
    step3Title: "Please tell us about each guest",
    step3TitleNo: "Any dietary restrictions?",
    step3Hint: "Please select adult / child and note any allergies",
    representative: "You",
    companion: "Guest",
    adultChildLabel: "Adult / Child",
    adult: "Adult", child: "Child",
    ageLabel: "Child's age",
    agePlaceholder: "Please select",
    ageUnit: " yrs",
    menuLabel: "🍽️ Meal selection",
    recommended: "Recommended",
    menuRecommendNote: "For a ",
    menuRecommendNote2: "-year-old, we suggest",
    menuLunch: "Children's Lunch", menuLunchTarget: "Ages 2–6",
    menuJunior: "Junior Course", menuJuniorTarget: "Ages 7–12",
    menuAdult: "Standard Course", menuAdultTarget: "Age 13+",
    menuNone: "No meal needed", menuNoneTarget: "Age 0–1 (infant)",
    allergyLabel: "Food allergies",
    allergyOptional: "(leave blank if none)",
    allergyPlaceholder: "e.g. shellfish, nuts",
    allergyOptionalShort: "(optional)",
    allergyPlaceholderShort: "e.g. shellfish",
    totalSummary: "Total", totalAdult: "Adults", totalChild: "Children",
    // Step4
    step4Title: "A message for the couple",
    messageLabel: "Message",
    messageOptional: "(optional)",
    messagePlaceholder: "Feel free to leave a note for the couple.",
    confirmLabel: "Review your reply",
    confirmRep: "Name", confirmAttend: "Attendance", confirmAttendYes: "Attending", confirmAttendNo: "Not attending",
    confirmCount: "Party size", confirmAdult: "adults", confirmChild: "children",
    confirmMealLunch: "Children's Lunch", confirmMealJunior: "Junior Course",
    confirmMealAdult: "Standard Course", confirmMealNone: "No meal",
    confirmAllergy: "'s allergies", confirmMeal: "'s meal",
    backBtn: "← Back", nextBtn: "Next →", submitBtn: "Submit ✓",
    // Done
    doneLabel: "Thank you for your reply",
    doneYesTitle: "We look forward to seeing you",
    doneNoTitle: "We hope to see you soon",
    doneYesBody: "Your RSVP has been received.\nWe can't wait to celebrate with you.",
    doneNoBody: "Thank you for letting us know.\nWe truly appreciate your kind thoughts.",
    confirmSummaryLabel: "Your RSVP summary",
    catalogueLabel: "GIFT CATALOGUE",
    catalogueTitle: "Choose Your Gift",
    catalogueBody: "Whenever you have a moment,\nplease browse our gift catalogue and pick something you'd enjoy.",
    catalogueSub: "Available anytime until the wedding day",
    catalogueBtn: "Browse Catalogue →",
    catalogueNote: "※ No rush — anytime is fine",
    // Gallery
    galleryLabel: "Our Story",
    galleryTitle: "Our Story",
    gallerySubtitle: "A glimpse into our journey together",
    uploadTitle: "Share your photos",
    uploadSub: "You can add photos from the day here",
    uploadBtn: "Choose photos",
    lightboxClose: "Tap to close",
    // Footer
    footerContact: "For any questions, please contact us via LINE or phone",
    photoLabels: ["First meeting","Proposal","Travel memories","Everyday moments","Engagement ring","Anniversary","Pre-wedding shoot","Together","Our favorite place"],
  }
};
// ================================================================


const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Noto+Serif+JP:wght@300;400;500&display=swap');
`;

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #faf7f2;
    --ivory: #f3ede3;
    --gold: #b8953a;
    --gold-light: #d4af6a;
    --gold-pale: #e8d9b0;
    --charcoal: #2a2520;
    --warm-mid: #6b5c48;
    --warm-light: #c4b49a;
    --line: rgba(184,149,58,0.25);
  }
  html { scroll-behavior: smooth; }
  body { background: var(--cream); font-family: 'Noto Serif JP', serif; color: var(--charcoal); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes petal {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.3; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  .anim-fade-up { animation: fadeUp 0.9s ease both; }
  .anim-fade { animation: fadeIn 1.2s ease both; }

  .ornament {
    display: flex; align-items: center; gap: 16px;
    color: var(--gold); font-size: 13px; letter-spacing: 0.2em;
  }
  .ornament::before, .ornament::after {
    content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
  }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 6vw, 48px);
    font-weight: 300;
    font-style: italic;
    color: var(--charcoal);
    letter-spacing: 0.05em;
    line-height: 1.2;
  }

  .gold-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg, #c9a84c, #8a6a1e, #c9a84c);
    background-size: 200% auto;
    color: #fff; border: none; border-radius: 2px;
    font-family: 'Noto Serif JP', serif; font-size: 16px; font-weight: 400;
    padding: 18px 40px; cursor: pointer; letter-spacing: 0.15em;
    transition: background-position 0.5s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(184,149,58,0.3);
    -webkit-tap-highlight-color: transparent;
    min-height: 56px;
  }
  .gold-btn:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(184,149,58,0.4); }
  .gold-btn:active { transform: translateY(0); }

  .ghost-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent; border: 1px solid var(--gold);
    color: var(--gold); border-radius: 2px;
    font-family: 'Noto Serif JP', serif; font-size: 15px;
    padding: 16px 36px; cursor: pointer; letter-spacing: 0.12em;
    transition: all 0.3s; min-height: 52px;
    -webkit-tap-highlight-color: transparent;
  }
  .ghost-btn:hover { background: var(--gold); color: #fff; }

  .card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 2px;
    box-shadow: 0 2px 20px rgba(42,37,32,0.06);
  }

  input, textarea, select {
    width: 100%; padding: 16px 18px;
    border: 1px solid var(--warm-light); border-radius: 2px;
    font-family: 'Noto Serif JP', serif; font-size: 16px;
    color: var(--charcoal); background: #fff;
    transition: border-color 0.3s;
    -webkit-appearance: none;
  }
  input:focus, textarea:focus, select:focus {
    outline: none; border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(184,149,58,0.12);
  }
  label { display: block; font-size: 13px; color: var(--warm-mid); letter-spacing: 0.1em; margin-bottom: 8px; }

  .nav-link {
    font-size: 13px; letter-spacing: 0.15em; color: var(--warm-mid);
    text-decoration: none; cursor: pointer; padding: 8px 4px;
    border-bottom: 1px solid transparent; transition: all 0.3s;
    -webkit-tap-highlight-color: transparent;
    background: none; border: none; font-family: 'Noto Serif JP', serif;
  }
  .nav-link:hover { color: var(--gold); border-bottom-color: var(--gold-pale); }
  .nav-link.active { color: var(--gold); }

  .divider {
    width: 1px; height: 60px; background: var(--line); margin: 0 auto;
  }

  .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .photo-placeholder {
    aspect-ratio: 1; background: var(--ivory);
    border: 1px solid var(--line); border-radius: 2px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 6px; color: var(--warm-light); font-size: 28px; cursor: pointer;
    transition: all 0.3s;
  }
  .photo-placeholder:hover { background: var(--gold-pale); border-color: var(--gold); }

  .timeline-item { display: flex; gap: 20px; align-items: flex-start; }
  .timeline-dot {
    width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--gold);
    background: var(--cream); flex-shrink: 0; margin-top: 6px;
    position: relative;
  }
  .timeline-dot::after {
    content: ''; position: absolute; top: 10px; left: 3px;
    width: 1px; height: 60px; background: var(--line);
  }

  .select-card {
    border: 2px solid var(--warm-light); border-radius: 4px; padding: 20px 24px;
    cursor: pointer; transition: all 0.3s; background: #fff;
    display: flex; align-items: center; gap: 16px;
    -webkit-tap-highlight-color: transparent;
    font-family: 'Noto Serif JP', serif;
  }
  .select-card:hover { border-color: var(--gold); box-shadow: 0 4px 16px rgba(184,149,58,0.15); }
  .select-card.selected { border-color: var(--gold); background: #fffdf6; }
  .select-card .radio {
    width: 24px; height: 24px; border-radius: 50%; border: 2px solid currentColor;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .select-card.selected .radio { border-color: var(--gold); background: var(--gold); }
  .select-card.selected .radio::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #fff; }

  .step-bar { display: flex; align-items: center; gap: 0; }
  .step-item { display: flex; align-items: center; gap: 0; }
  .step-circle {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 500; transition: all 0.4s;
  }
  .step-line { width: 40px; height: 1px; }

  .gift-item {
    border: 1px solid var(--line); border-radius: 2px; padding: 20px;
    cursor: pointer; transition: all 0.3s; background: #fff;
    -webkit-tap-highlight-color: transparent;
  }
  .gift-item:hover { border-color: var(--gold); box-shadow: 0 4px 16px rgba(184,149,58,0.12); }
  .gift-item.reserved { background: #fafaf7; border-color: var(--warm-light); }

  /* ── モバイル ── */
  @media (max-width: 600px) {
    .photo-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── PC / タブレット ── */
  @media (min-width: 768px) {
    /* ナビを広げる */
    .nav-link { font-size: 14px; padding: 8px 12px; }

    /* HEROのCTAボタンを横並びに */
    .hero-cta { flex-direction: row !important; justify-content: center; }
    .hero-cta button { width: auto !important; min-width: 240px; }

    /* スケジュールカードを横並びに */
    .schedule-grid { flex-direction: row !important; }
    .schedule-grid > div { flex: 1; }

    /* アクセスカードを横並びに */
    .access-grid { flex-direction: row !important; }
    .access-grid > div { flex: 1; }

    /* フォームを少し広げる */
    input, textarea, select { font-size: 17px; }

    /* ギャラリーグリッドを4列に */
    .photo-grid { grid-template-columns: repeat(4, 1fr); }
  }
`;

// ─── Petal Animation Component ───
function Petals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 8 + Math.random() * 8,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: "absolute", top: "-20px", left: `${p.left}%`,
          width: p.size, height: p.size,
          background: "radial-gradient(ellipse, #e8c8c0 40%, transparent 70%)",
          borderRadius: "50% 0 50% 0", transform: "rotate(45deg)",
          animation: `petal ${p.duration}s ${p.delay}s infinite linear`,
          opacity: 0.6,
        }} />
      ))}
    </div>
  );
}

// ─── Navigation ───
function Nav({ activePage, setPage, lang, setLang, t }) {
  const links = [
    { id: "home", label: t.home },
    { id: "rsvp", label: t.rsvp },
    { id: "gallery", label: t.gallery },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(250,247,242,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line)", padding: "0 20px",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 8 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", letterSpacing: "0.1em", color: "var(--charcoal)" }}>
          Y & K
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {links.map(l => (
            <button key={l.id} className={`nav-link ${activePage === l.id ? "active" : ""}`} onClick={() => setPage(l.id)}>
              {l.label}
            </button>
          ))}
          {/* 言語切り替え */}
          <div style={{ marginLeft: 8, display: "flex", border: "1px solid var(--gold-pale)", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
            {["ja", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "6px 12px", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", cursor: "pointer",
                fontFamily: "sans-serif",
                background: lang === l ? "var(--gold)" : "#fff",
                color: lang === l ? "#fff" : "var(--warm-mid)",
                border: "none", transition: "all 0.2s",
                lineHeight: 1,
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ───
function HomePage({ setPage, t, lang }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Petals />

      {/* ── フルスクリーン Hero（動画背景） ── */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>

        {/* 背景動画 ※自分の前撮り動画に差し替えてください */}
        <video autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}>
          <source src="https://videos.pexels.com/video-files/5274855/5274855-hd_1280_720_25fps.mp4" type="video/mp4" />
        </video>

        {/* 暗めオーバーレイ（文字を読みやすくする） */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(15,10,5,0.4) 0%, rgba(15,10,5,0.5) 55%, rgba(15,10,5,0.72) 100%)",
        }} />

        {/* ゴールド細枠（装飾） */}
        <div style={{ position: "absolute", inset: 20, zIndex: 2, border: "1px solid rgba(184,149,58,0.4)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 26, zIndex: 2, border: "1px solid rgba(184,149,58,0.15)", pointerEvents: "none" }} />

        {/* コンテンツ */}
        <div style={{ position: "relative", zIndex: 3, padding: "100px 32px 80px", width: "100%", maxWidth: 640, margin: "0 auto" }}>

          {/* 上部オーナメント */}
          <div style={{ animation: "fadeIn 1.4s ease both", marginBottom: 28 }}>
            <svg width="180" height="20" viewBox="0 0 180 20">
              <line x1="0" y1="10" x2="72" y2="10" stroke="#b8953a" strokeWidth="0.6" opacity="0.7"/>
              <circle cx="80" cy="10" r="2" fill="#b8953a" opacity="0.6"/>
              <circle cx="90" cy="10" r="3.5" fill="#b8953a" opacity="0.9"/>
              <circle cx="100" cy="10" r="2" fill="#b8953a" opacity="0.6"/>
              <line x1="108" y1="10" x2="180" y2="10" stroke="#b8953a" strokeWidth="0.6" opacity="0.7"/>
            </svg>
          </div>

          <div style={{ fontSize: 11, letterSpacing: "0.5em", color: "rgba(212,175,106,0.85)", marginBottom: 32, animation: "fadeIn 1.4s 0.2s ease both" }}>
            {t.invitation}
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(60px, 15vw, 108px)", lineHeight: 1, color: "#fff",
            marginBottom: 0, letterSpacing: "0.04em",
            textShadow: "0 4px 32px rgba(0,0,0,0.35)",
            animation: "fadeUp 1.1s 0.35s ease both",
          }}>Yuki</h1>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 5vw, 38px)",
            color: "var(--gold-light)", margin: "4px 0",
            animation: "fadeUp 1.1s 0.5s ease both",
          }}>&amp;</div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(60px, 15vw, 108px)", lineHeight: 1, color: "#fff",
            marginBottom: 44, letterSpacing: "0.04em",
            textShadow: "0 4px 32px rgba(0,0,0,0.35)",
            animation: "fadeUp 1.1s 0.6s ease both",
          }}>Kenji</h1>

          {/* 日付・会場 */}
          <div style={{ animation: "fadeUp 1.1s 0.75s ease both", marginBottom: 52 }}>
            <div style={{ width: 48, height: 1, background: "rgba(184,149,58,0.7)", margin: "0 auto 22px" }} />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 4vw, 23px)", letterSpacing: "0.18em", color: "rgba(255,255,255,0.92)", marginBottom: 10 }}>
              {lang === "en" ? SITE_CONFIG.dateEn : SITE_CONFIG.date}
            </div>
            <div style={{ fontSize: 12, letterSpacing: "0.28em", color: "rgba(212,175,106,0.8)" }}>
              {SITE_CONFIG.venueSubEn}
            </div>
            <div style={{ width: 48, height: 1, background: "rgba(184,149,58,0.7)", margin: "22px auto 0" }} />
          </div>

          {/* CTA */}
          <div className="hero-cta" style={{ animation: "fadeUp 1.1s 0.9s ease both", display: "flex", flexDirection: "column", gap: 14, alignItems: "center", width: "100%", maxWidth: 320, margin: "0 auto" }}>
            <button className="gold-btn" style={{ width: "100%" }} onClick={() => setPage("rsvp")}>
              {t.rsvpBtn}
            </button>
          </div>
        </div>

        {/* スクロール促進矢印 */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 3, animation: "float 2.5s ease-in-out infinite" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(184,149,58,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* ごあいさつ（白背景） */}
      <div style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div className="ornament" style={{ marginBottom: 40 }}>{t.greetingLabel}</div>
          <p style={{ fontSize: 16, lineHeight: 2.6, color: "var(--warm-mid)", letterSpacing: "0.06em", whiteSpace: "pre-line" }}>
            {t.greetingBody.replace(/\\n/g, "\n")}
          </p>
          <div style={{ marginTop: 40, fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <span>{lang === "en" ? SITE_CONFIG.brideFullNameEn : SITE_CONFIG.brideFullNameJa}</span>
            <span style={{ color: "var(--gold)", fontSize: 22 }}>&amp;</span>
            <span>{lang === "en" ? SITE_CONFIG.groomFullNameEn : SITE_CONFIG.groomFullNameJa}</span>
          </div>
        </div>
      </div>

      {/* 当日のスケジュール・会場・アクセス（シャンパン背景） */}
      <div style={{ background: "#f5ede0", padding: "72px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          {/* SCHEDULE */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.35em", marginBottom: 16 }}>{t.scheduleLabel}</div>
            <div style={{ fontSize: 24, color: "var(--charcoal)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              {t.scheduleTitle}
            </div>
            <div style={{ width: 40, height: 1, background: "rgba(184,149,58,0.4)", margin: "20px auto 0" }} />
          </div>

          <div className="schedule-grid" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
            {[
              { category: t.ceremony, time: "12:00", place: t.ceremonyPlace },
              { category: t.reception, time: "14:00", place: t.receptionPlace },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid rgba(184,149,58,0.25)", borderRadius: 2, background: "rgba(255,255,255,0.55)", padding: "24px 28px" }}>
                <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.25em", marginBottom: 8 }}>{item.category}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: "var(--charcoal)", lineHeight: 1, marginBottom: 10 }}>{item.time}</div>
                <div style={{ fontSize: 16, color: "var(--warm-mid)", lineHeight: 1.7 }}>{item.place}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 14, color: "var(--warm-light)", letterSpacing: "0.12em", marginBottom: 60 }}>
            {t.receptionOpen}
          </div>

          {/* VENUE */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.35em", marginBottom: 16 }}>{t.venueLabel}</div>
            <div style={{ fontSize: 24, color: "var(--charcoal)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              {t.venueTitle}
            </div>
            <div style={{ width: 40, height: 1, background: "rgba(184,149,58,0.4)", margin: "20px auto 0" }} />
          </div>

          <div style={{ border: "1px solid rgba(184,149,58,0.25)", borderRadius: 2, background: "rgba(255,255,255,0.55)", padding: "24px 28px", marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", marginBottom: 12 }}>{lang === "en" ? SITE_CONFIG.venueEn : SITE_CONFIG.venue}</div>
            <div style={{ fontSize: 14, color: "var(--warm-mid)", lineHeight: 2.2, whiteSpace: "pre-line" }}>
              {lang === "en" ? SITE_CONFIG.venueAddressEn : SITE_CONFIG.venueAddress}
            </div>
          </div>

          {/* 地図 */}
          <div style={{ height: 200, background: "rgba(255,255,255,0.55)", border: "1px solid rgba(184,149,58,0.2)", borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12, overflow: "hidden", position: "relative" }}>
            <svg width="200" height="120" viewBox="0 0 200 120">
              <rect x="20" y="40" width="160" height="8" fill="var(--warm-light)" opacity="0.4" rx="2"/>
              <rect x="80" y="10" width="8" height="100" fill="var(--warm-light)" opacity="0.4" rx="2"/>
              <rect x="120" y="10" width="8" height="100" fill="var(--warm-light)" opacity="0.3" rx="2"/>
              <rect x="40" y="65" width="80" height="8" fill="var(--warm-light)" opacity="0.3" rx="2"/>
              <circle cx="100" cy="55" r="12" fill="var(--gold)" opacity="0.8"/>
              <text x="100" y="59" textAnchor="middle" fill="#fff" fontSize="12">H</text>
            </svg>
            <div style={{ fontSize: 13, color: "var(--gold)", letterSpacing: "0.1em" }}>📍 ヒルトン東京</div>
          </div>

          <a href={SITE_CONFIG.venueMapUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: 52 }}>
            <button className="gold-btn" style={{ width: "100%" }}>{t.mapBtn}</button>
          </a>

          {/* ACCESS */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.35em", marginBottom: 16 }}>{t.accessLabel}</div>
            <div style={{ fontSize: 24, color: "var(--charcoal)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              {t.accessTitle}
            </div>
            <div style={{ width: 40, height: 1, background: "rgba(184,149,58,0.4)", margin: "20px auto 0" }} />
          </div>

          <div className="access-grid" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 52 }}>
            {[
              { icon: "🚃", title: t.trainTitle, body: lang === "en" ? SITE_CONFIG.trainBodyEn : SITE_CONFIG.trainBodyJa },
              { icon: "🚗", title: t.carTitle, body: lang === "en" ? SITE_CONFIG.carBodyEn : SITE_CONFIG.carBodyJa },
            ].map((item, i) => (
              <div key={i} style={{ border: "1px solid rgba(184,149,58,0.25)", borderRadius: 2, background: "rgba(255,255,255,0.55)", padding: "22px 24px" }}>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>{item.icon} {item.title}</div>
                <div style={{ fontSize: 14, color: "var(--warm-mid)", lineHeight: 2, whiteSpace: "pre-line" }}>{item.body}</div>
              </div>
            ))}
          </div>

          {/* ご祝儀 */}
          <div style={{ border: "1px solid rgba(184,149,58,0.25)", borderRadius: 2, background: "rgba(255,255,255,0.55)", padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 22 }}>💌</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{t.giftTitle}</div>
            </div>
            <div style={{ fontSize: 14, color: "var(--warm-mid)", lineHeight: 2.2 }}>
{t.giftBody.split("\n").map((l,i) => <span key={i}>{l}<br /></span>)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── RSVP PAGE ───
function RSVPPage({ isPremium, t }) {
  const TOTAL_STEPS = 4;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    attend: null,
    repName: "",
    repKana: "",
    count: 1,
    members: [{ label: "代表者", type: "adult", meal: "adult", allergy: "" }],
    message: "",
  });
  const [done, setDone] = useState(false);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(false);

    const adultCount = form.members.filter(m => m.type === "adult").length;
    const childCount = form.members.filter(m => m.type === "child").length;

    const payload = {
      timestamp: new Date().toLocaleString("ja-JP"),
      name: form.repName,
      kana: form.repKana,
      attend: form.attend === "yes" ? "出席" : "欠席",
      count: form.count,
      adults: adultCount,
      children: childCount,
      members: form.members.map((m, i) => ({
        label: i === 0 ? form.repName : `同行者${i}`,
        type: m.type === "child" ? "子供" : "大人",
        age: m.age || "",
        meal: m.meal === "lunch" ? "お子様ランチ" :
              m.meal === "junior" ? "ジュニアコース" :
              m.meal === "adult" ? "大人コース" : "食事不要",
        allergy: m.allergy || "",
      })),
      message: form.message,
    };

    // スプレッドシートURLが未設定の場合はそのまま完了
    if (!SITE_CONFIG.spreadsheetUrl) {
      setSubmitting(false);
      setDone(true);
      return;
    }

    try {
      await fetch(SITE_CONFIG.spreadsheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setDone(true);
    } catch (e) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // 人数変更時にmembersを動的に更新
  const updateCount = (newCount) => {
    const count = parseInt(newCount);
    const current = form.members;
    let next = [...current];
    if (count > current.length) {
      for (let i = current.length; i < count; i++) {
        next.push({ label: "", type: "adult", meal: "adult", allergy: "" });
      }
    } else {
      next = next.slice(0, count);
    }
    // 1人目は常に代表者
    if (next[0]) next[0].label = "代表者";
    setForm(f => ({ ...f, count, members: next }));
  };

  const updateMember = (idx, field, val) => {
    setForm(f => {
      const members = [...f.members];
      members[idx] = { ...members[idx], [field]: val };
      return { ...f, members };
    });
  };

  const adultCount = form.members.filter(m => m.type === "adult").length;
  const childCount = form.members.filter(m => m.type === "child").length;

  const StepBar = () => (
    <div style={{ marginBottom: 40 }}>
      <div className="step-bar" style={{ justifyContent: "center" }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s, i) => (
          <div key={s} className="step-item">
            <div className="step-circle" style={{
              background: step >= s ? "var(--gold)" : "var(--ivory)",
              color: step >= s ? "#fff" : "var(--warm-light)",
              border: `1.5px solid ${step >= s ? "var(--gold)" : "var(--warm-light)"}`,
            }}>{s}</div>
            {i < TOTAL_STEPS - 1 && (
              <div className="step-line" style={{ background: step > s ? "var(--gold)" : "var(--warm-light)", opacity: 0.5 }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: "var(--warm-light)", letterSpacing: "0.15em", marginTop: 10 }}>
        {t.step} {step} / {TOTAL_STEPS}
      </div>
    </div>
  );

  // ── 完了画面 ──
  if (done) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", textAlign: "center" }}>
      <div style={{ animation: "fadeUp 0.9s ease both", maxWidth: 440 }}>
        <div style={{ fontSize: 64, marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>🎊</div>
        <div className="ornament" style={{ marginBottom: 24 }}>{t.doneLabel}</div>
        <h2 className="section-title" style={{ marginBottom: 20 }}>
          {form.attend === "yes" ? t.doneYesTitle : t.doneNoTitle}
        </h2>
        <p style={{ fontSize: 14, color: "var(--warm-mid)", lineHeight: 2, marginBottom: 32 }}>
          {form.attend === "yes"
            ? t.doneYesBody.replace(/\\n/g, "\n")
            : t.doneNoBody.replace(/\\n/g, "\n")}
        </p>

        {/* 回答サマリー */}
        <div style={{ padding: "24px", background: "var(--ivory)", border: "1px solid var(--line)", borderRadius: 2, textAlign: "left", fontSize: 14, lineHeight: 2.2, marginBottom: 32 }}>
          <div style={{ color: "var(--warm-light)", fontSize: 11, letterSpacing: "0.1em", marginBottom: 10 }}>{t.confirmSummaryLabel}</div>
          <div>{t.confirmRep}：<strong>{form.repName}</strong>（{form.repKana}）</div>
          <div>{t.confirmAttend}：<strong>{form.attend === "yes" ? t.confirmAttendYes : t.confirmAttendNo}</strong></div>
          {form.attend === "yes" && (
            <>
              <div>{t.confirmCount}：<strong>{form.count}</strong>（{t.confirmAdult} {adultCount}・{t.confirmChild} {childCount}）</div>
              {form.members.map((m, i) => (
                <div key={i} style={{ fontSize: 13, color: "var(--warm-mid)" }}>
                  {m.type === "child" && (
                    <div>{i === 0 ? t.representative : `${t.companion}${i}`}（{m.age}{t.ageUnit}）{t.confirmMeal}：<strong>{
                      m.meal === "lunch" ? t.confirmMealLunch :
                      m.meal === "junior" ? t.confirmMealJunior :
                      m.meal === "adult" ? t.confirmMealAdult : t.confirmMealNone
                    }</strong></div>
                  )}
                  {m.allergy && (
                    <div>{i === 0 ? "代表者" : `同行者${i}`}のアレルギー：<strong>{m.allergy}</strong></div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* 引き出物カタログ案内 — さりげなく、急かさないトーンで */}
        {(() => {
          // isPremiumはRootから受け取る（plan=premium & key=yk2025 の両方が必要）
          const catalogueUrl = isPremium
            ? SITE_CONFIG.cataloguePremium
            : SITE_CONFIG.catalogueStandard;

          return (
            <div style={{
              padding: "28px 24px", borderRadius: 2,
              border: "1px solid var(--gold-pale)",
              background: "linear-gradient(135deg, #fffdf6, #faf7ee)",
              textAlign: "center", animation: "fadeUp 0.9s 0.4s ease both",
            }}>
              <div style={{ fontSize: 22, marginBottom: 12 }}>🎁</div>
              <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.2em", marginBottom: 10 }}>
                {t.catalogueLabel}
              </div>
              <div style={{ fontSize: 15, color: "var(--charcoal)", fontWeight: 500, marginBottom: 8, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                {t.catalogueTitle}
              </div>
              <p style={{ fontSize: 13, color: "var(--warm-mid)", lineHeight: 2.2, marginBottom: 20 }}>
                {t.catalogueBody.replace(/\\n/g, "\n").split("\n").map((l,i) => <span key={i}>{l}<br /></span>)}
                <span style={{ fontSize: 11, color: "var(--warm-light)" }}>{t.catalogueSub}</span>
              </p>
              <a href={catalogueUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #c9a84c, #8a6a1e, #c9a84c)",
                  backgroundSize: "200% auto",
                  color: "#fff", borderRadius: 2,
                  fontFamily: "'Noto Serif JP', serif", fontSize: 14,
                  padding: "14px 32px", letterSpacing: "0.12em",
                  boxShadow: "0 4px 16px rgba(184,149,58,0.25)",
                  cursor: "pointer", transition: "all 0.3s",
                }}>
                  {t.catalogueBtn}
                </div>
              </a>
              <div style={{ fontSize: 11, color: "var(--warm-light)", marginTop: 12 }}>
                {t.catalogueNote}
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="ornament" style={{ marginBottom: 16 }}>{t.rsvpSectionLabel}</div>
          <h2 className="section-title">{t.rsvpSectionTitle}</h2>
        </div>

        <StepBar />

        {/* ── STEP 1: 出欠 ── */}
        {step === 1 && (
          <div style={{ animation: "fadeUp 0.6s ease both" }}>
            <h3 style={{ fontSize: 20, textAlign: "center", marginBottom: 8, fontWeight: 400 }}>
              {t.step1Title}
            </h3>
            <p style={{ textAlign: "center", fontSize: 13, color: "var(--warm-light)", marginBottom: 36 }}>
              {t.step1Hint}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { val: "yes", emoji: "🎉", label: t.attendYesLabel, sub: t.attendYesSub },
                { val: "no", emoji: "🙏", label: t.attendNoLabel, sub: t.attendNoSub },
              ].map(opt => (
                <div key={opt.val} className={`select-card ${form.attend === opt.val ? "selected" : ""}`}
                  onClick={() => { setForm(f => ({ ...f, attend: opt.val })); setTimeout(next, 400); }}>
                  <div className="radio" style={{ color: form.attend === opt.val ? "var(--gold)" : "var(--warm-light)" }} />
                  <div>
                    <div style={{ fontSize: 18, marginBottom: 2 }}>{opt.emoji} {opt.label}</div>
                    <div style={{ fontSize: 12, color: "var(--warm-light)" }}>{opt.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: 代表者名 + 人数選択 ── */}
        {step === 2 && (
          <div style={{ animation: "fadeUp 0.6s ease both" }}>
            <h3 style={{ fontSize: 20, textAlign: "center", marginBottom: 36, fontWeight: 400 }}>
              {t.step2Title}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label>{t.repNameLabel}</label>
                <input type="text" placeholder={t.repNamePlaceholder} value={form.repName}
                  onChange={e => setForm(f => ({ ...f, repName: e.target.value }))} />
              </div>
              <div>
                <label>{t.repKanaLabel}</label>
                <input type="text" placeholder={t.repKanaPlaceholder} value={form.repKana}
                  onChange={e => setForm(f => ({ ...f, repKana: e.target.value }))} />
              </div>

              {form.attend === "yes" && (
                <div>
                  <label>{t.countLabel}</label>
                  <div style={{ position: "relative" }}>
                    <select value={form.count} onChange={e => updateCount(e.target.value)}
                      style={{ paddingRight: 40, cursor: "pointer", appearance: "none" }}>
                      {[1,2,3,4,5,6,7].map(n => (
                        <option key={n} value={n}>{n}{t.countUnit}</option>
                      ))}
                    </select>
                    <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--warm-mid)", fontSize: 12 }}>▼</div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--warm-light)", marginTop: 8 }}>
                    {t.countHint}
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
              <button className="ghost-btn" onClick={back} style={{ flex: 1 }}>{t.backBtn}</button>
              <button className="gold-btn" onClick={next} style={{ flex: 2 }} disabled={!form.repName}>
                {t.nextBtn}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: 同行者の大人/子供 + アレルギー ── */}
        {step === 3 && (
          <div style={{ animation: "fadeUp 0.6s ease both" }}>
            <h3 style={{ fontSize: 20, textAlign: "center", marginBottom: 8, fontWeight: 400 }}>
              {form.attend === "yes" ? t.step3Title : t.step3TitleNo}
            </h3>
            {form.attend === "yes" && (
              <p style={{ textAlign: "center", fontSize: 13, color: "var(--warm-light)", marginBottom: 32 }}>
                大人・子供の選択と、アレルギーをお知らせください
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {form.attend === "yes" ? form.members.map((m, i) => (
                <div key={i} style={{ background: "var(--ivory)", border: "1px solid var(--line)", borderRadius: 4, padding: "20px 18px" }}>
                  {/* 参加者ラベル */}
                  <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.12em", marginBottom: 14, fontWeight: 500 }}>
                    {i === 0 ? `👤 ${t.representative}（${form.repName}）` : `👤 ${t.companion} ${i}`}
                  </div>

                  {/* 大人/子供 トグル */}
                  <div style={{ marginBottom: m.type === "child" ? 16 : 16 }}>
                    <label style={{ marginBottom: 10 }}>{t.adultChildLabel}</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { val: "adult", label: t.adult, emoji: "🧑" },
                        { val: "child", label: t.child, emoji: "👶" },
                      ].map(opt => (
                        <div key={opt.val}
                          onClick={() => updateMember(i, "type", opt.val)}
                          style={{
                            flex: 1, padding: "12px 8px", textAlign: "center",
                            borderRadius: 4, cursor: "pointer", transition: "all 0.2s",
                            border: `2px solid ${m.type === opt.val ? "var(--gold)" : "var(--warm-light)"}`,
                            background: m.type === opt.val ? "#fffdf5" : "#fff",
                            fontSize: 15, fontFamily: "'Noto Serif JP', serif",
                            color: m.type === opt.val ? "var(--gold)" : "var(--warm-mid)",
                            fontWeight: m.type === opt.val ? 600 : 400,
                          }}>
                          {opt.emoji} {opt.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* お子様のみ：年齢 + メニュー選択 */}
                  {m.type === "child" && (() => {
                    const age = m.age !== undefined ? parseInt(m.age) : null;
                    // 年齢に基づくおすすめメニュー
                    const recommended =
                      age === null ? null :
                      age <= 1 ? "none" :
                      age <= 6 ? "lunch" :
                      age <= 12 ? "junior" :
                      "adult";
                    const recLabel = {
                      none: t.menuNone, lunch: t.menuLunch,
                      junior: t.menuJunior, adult: t.menuAdult
                    };
                    const menuOptions = [
                      { val: "lunch",  label: t.menuLunch,  target: t.menuLunchTarget },
                      { val: "junior", label: t.menuJunior, target: t.menuJuniorTarget },
                      { val: "adult",  label: t.menuAdult,  target: t.menuAdultTarget },
                      { val: "none",   label: t.menuNone,   target: t.menuNoneTarget },
                    ];

                    return (
                      <div style={{ animation: "fadeUp 0.3s ease both", marginBottom: 16 }}>

                        {/* 年齢プルダウン */}
                        <div style={{ marginBottom: 16 }}>
                          <label>{t.ageLabel}</label>
                          <div style={{ position: "relative" }}>
                            <select
                              value={m.age !== undefined ? m.age : ""}
                              onChange={e => {
                                const newAge = e.target.value;
                                const autoMeal =
                                  parseInt(newAge) <= 1 ? "none" :
                                  parseInt(newAge) <= 6 ? "lunch" :
                                  parseInt(newAge) <= 12 ? "junior" : "adult";
                                // 年齢変更時にメニューも自動セット
                                setForm(f => {
                                  const members = [...f.members];
                                  members[i] = { ...members[i], age: newAge, meal: autoMeal };
                                  return { ...f, members };
                                });
                              }}
                              style={{ paddingRight: 40, cursor: "pointer", appearance: "none" }}>
                              <option value="">{t.agePlaceholder}</option>
                              {Array.from({ length: 13 }, (_, idx) => (
                                <option key={idx} value={idx}>{idx}{t.ageUnit}</option>
                              ))}
                            </select>
                            <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--warm-mid)", fontSize: 12 }}>▼</div>
                          </div>
                        </div>

                        {/* メニュー選択（年齢入力後に表示） */}
                        {m.age !== undefined && m.age !== "" && (
                          <div style={{ padding: "16px", borderRadius: 4, background: "#fff", border: "1px solid var(--gold-pale)" }}>
                            <label style={{ color: "var(--gold)", marginBottom: 6 }}>{t.menuLabel}</label>
                            {/* おすすめバッジ */}
                            {recommended && (
                              <div style={{
                                fontSize: 12, color: "var(--warm-mid)", background: "var(--ivory)",
                                padding: "8px 12px", borderRadius: 3, marginBottom: 12,
                                border: "1px solid var(--gold-pale)"
                              }}>
                                💡 {t.menuRecommendNote}{age}{t.menuRecommendNote2} <strong style={{ color: "var(--gold)" }}>「{recLabel[recommended]}」</strong>
                              </div>
                            )}
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                              {menuOptions.map(opt => (
                                <div key={opt.val}
                                  onClick={() => updateMember(i, "meal", opt.val)}
                                  style={{
                                    display: "flex", alignItems: "flex-start", gap: 12,
                                    padding: "12px 14px", borderRadius: 4, cursor: "pointer",
                                    border: `1.5px solid ${m.meal === opt.val ? "var(--gold)" : opt.val === recommended ? "var(--gold-pale)" : "var(--warm-light)"}`,
                                    background: m.meal === opt.val ? "#fffdf5" : opt.val === recommended ? "#fdfbf4" : "#fafaf7",
                                    transition: "all 0.2s", position: "relative",
                                  }}>
                                  {/* おすすめラベル */}
                                  {opt.val === recommended && (
                                    <div style={{
                                      position: "absolute", top: -1, right: 10,
                                      fontSize: 10, background: "var(--gold)", color: "#fff",
                                      padding: "2px 8px", borderRadius: "0 0 4px 4px",
                                      letterSpacing: "0.08em",
                                    }}>{t.recommended}</div>
                                  )}
                                  {/* ラジオ */}
                                  <div style={{
                                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 3,
                                    border: `2px solid ${m.meal === opt.val ? "var(--gold)" : "var(--warm-light)"}`,
                                    background: m.meal === opt.val ? "var(--gold)" : "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                  }}>
                                    {m.meal === opt.val && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                                  </div>
                                  <div>
                                    <div style={{
                                      fontSize: 14, fontFamily: "'Noto Serif JP', serif", marginBottom: 2,
                                      color: m.meal === opt.val ? "var(--charcoal)" : "var(--warm-mid)",
                                      fontWeight: m.meal === opt.val ? 600 : 400,
                                    }}>
                                      {opt.label}
                                    </div>
                                    <div style={{ fontSize: 11, color: "var(--gold)" }}>{opt.target}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* アレルギー */}
                  <div>
                    <label>{t.allergyLabel} <span style={{ color: "var(--warm-light)" }}>{t.allergyOptional}</span></label>
                    <input type="text" placeholder={t.allergyPlaceholder}
                      value={m.allergy}
                      onChange={e => updateMember(i, "allergy", e.target.value)} />
                  </div>
                </div>
              )) : (
                // 欠席の場合はアレルギーのみ
                <div>
                  <label>{t.allergyLabel} <span style={{ color: "var(--warm-light)" }}>{t.allergyOptionalShort}</span></label>
                  <input type="text" placeholder={t.allergyPlaceholderShort} value={form.members[0]?.allergy || ""}
                    onChange={e => updateMember(0, "allergy", e.target.value)} />
                </div>
              )}
            </div>

            {/* 人数サマリー（出席時のみ） */}
            {form.attend === "yes" && (
              <div style={{ marginTop: 20, padding: "14px 18px", background: "#fff", border: "1px solid var(--line)", borderRadius: 4, display: "flex", gap: 24, justifyContent: "center", fontSize: 14 }}>
                <span>{t.totalSummary} <strong style={{ color: "var(--gold)" }}>{form.count}</strong></span>
                <span style={{ color: "var(--warm-light)" }}>|</span>
                <span>{t.totalAdult} <strong>{adultCount}</strong></span>
                <span style={{ color: "var(--warm-light)" }}>|</span>
                <span>{t.totalChild} <strong>{childCount}</strong></span>
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button className="ghost-btn" onClick={back} style={{ flex: 1 }}>{t.backBtn}</button>
              <button className="gold-btn" onClick={next} style={{ flex: 2 }}>{t.nextBtn}</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: メッセージ + 確認 ── */}
        {step === 4 && (
          <div style={{ animation: "fadeUp 0.6s ease both" }}>
            <h3 style={{ fontSize: 20, textAlign: "center", marginBottom: 36, fontWeight: 400 }}>
              {t.step4Title}
            </h3>
            <div style={{ marginBottom: 24 }}>
              <label>{t.messageLabel} <span style={{ color: "var(--warm-light)" }}>{t.messageOptional}</span></label>
              <textarea rows={4} placeholder={t.messagePlaceholder}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ resize: "vertical" }} />
            </div>

            {/* 送信内容確認 */}
            <div style={{ padding: "22px", background: "var(--ivory)", border: "1px solid var(--line)", borderRadius: 4, fontSize: 14, lineHeight: 2.2 }}>
              <div style={{ color: "var(--warm-light)", fontSize: 11, letterSpacing: "0.1em", marginBottom: 10 }}>{t.confirmLabel}</div>
              <div>{t.confirmRep}：<strong>{form.repName}</strong>（{form.repKana}）</div>
              <div>{t.confirmAttend}：<strong>{form.attend === "yes" ? t.confirmAttendYes : t.confirmAttendNo}</strong></div>
              {form.attend === "yes" && (
                <>
                  <div>{t.confirmCount}：<strong>{form.count}</strong>（{t.confirmAdult} {adultCount}・{t.confirmChild} {childCount}）</div>
                  {form.members.map((m, i) => (
                    <div key={i} style={{ fontSize: 13, color: "var(--warm-mid)" }}>
                      {m.type === "child" && (
                        <div>
                          {i === 0 ? t.representative : `${t.companion}${i}`}（{m.age}{t.ageUnit}）{t.confirmMeal}：
                          <strong>{
                            m.meal === "lunch" ? t.confirmMealLunch :
                            m.meal === "junior" ? t.confirmMealJunior :
                            m.meal === "adult" ? t.confirmMealAdult :
                            t.confirmMealNone
                          }</strong>
                        </div>
                      )}
                      {m.allergy && (
                        <div>{i === 0 ? t.representative : `${t.companion}${i}`}{t.confirmAllergy}：<strong>{m.allergy}</strong></div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <button className="ghost-btn" onClick={back} style={{ flex: 1 }}>{t.backBtn}</button>
              <button className="gold-btn" onClick={submit} style={{ flex: 2 }} disabled={submitting}>{submitting ? "..." : t.submitBtn}</button>
            </div>
            {submitError && (
              <div style={{ marginTop: 16, padding: "12px 16px", background: "#fff5f5", border: "1px solid #ffcccc", borderRadius: 2, fontSize: 13, color: "#c0392b", textAlign: "center" }}>
                送信に失敗しました。もう一度お試しいただくか、LINEでご連絡ください。
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// ─── GALLERY PAGE ───
function GalleryPage({ t }) {
  const [selected, setSelected] = useState(null);
  const placeholders = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    emoji: ["🌸", "💐", "🌹", "🕊️", "💍", "🥂", "🎊", "✨", "🌿"][i],
    label: t.photoLabels[i],
  }));

  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div className="ornament" style={{ marginBottom: 16 }}>{t.galleryLabel}</div>
          <h2 className="section-title">{t.galleryTitle}</h2>
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: "var(--warm-mid)", marginBottom: 48 }}>
          {t.gallerySubtitle}
        </p>

        <div className="photo-grid">
          {placeholders.map((ph, i) => (
            <div key={ph.id} className="photo-placeholder" onClick={() => setSelected(ph)}
              style={{ animationDelay: `${i * 0.05}s` }}>
              <span style={{ fontSize: 36 }}>{ph.emoji}</span>
              <span style={{ fontSize: 11, color: "var(--warm-light)", letterSpacing: "0.08em" }}>{ph.label}</span>
            </div>
          ))}
        </div>

        {/* Upload area */}
        <div style={{
          marginTop: 32, padding: "40px 24px", border: "2px dashed var(--gold-pale)",
          borderRadius: 2, textAlign: "center", background: "var(--ivory)"
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📤</div>
          <div style={{ fontSize: 15, color: "var(--warm-mid)", marginBottom: 8 }}>{t.uploadTitle}</div>
          <div style={{ fontSize: 13, color: "var(--warm-light)", marginBottom: 20 }}>
            {t.uploadSub}
          </div>
          <button className="ghost-btn">{t.uploadBtn}</button>
        </div>

        {/* Lightbox */}
        {selected && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(42,37,32,0.9)",
            zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.3s ease both",
          }} onClick={() => setSelected(null)}>
            <div style={{
              background: "var(--cream)", padding: "60px 48px", borderRadius: 4,
              textAlign: "center", maxWidth: 400, animation: "fadeUp 0.4s ease both"
            }}>
              <div style={{ fontSize: 80, marginBottom: 16 }}>{selected.emoji}</div>
              <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>{selected.label}</div>
              <div style={{ fontSize: 13, color: "var(--warm-light)" }}>{t.lightboxClose}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ───
function Footer({ setPage, t, lang }) {
  return (
    <footer style={{ background: "var(--charcoal)", padding: "60px 24px 40px", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", color: "var(--gold-pale)", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        <span>{lang === "en" ? SITE_CONFIG.brideFullNameEn : SITE_CONFIG.brideFullNameJa}</span>
        <span style={{ color: "var(--gold)", fontSize: 22 }}>&amp;</span>
        <span>{lang === "en" ? SITE_CONFIG.groomFullNameEn : SITE_CONFIG.groomFullNameJa}</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--warm-light)", letterSpacing: "0.2em", marginBottom: 32 }}>
        {lang === "en" ? SITE_CONFIG.dateEn : SITE_CONFIG.date} — {lang === "en" ? SITE_CONFIG.venueEn : SITE_CONFIG.venue}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
        {["home", "rsvp", "gallery"].map(p => (
          <button key={p} className="nav-link" onClick={() => setPage(p)} style={{ color: "var(--warm-light)", fontSize: 11, letterSpacing: "0.15em" }}>
            {p.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ width: 60, height: 1, background: "var(--gold)", opacity: 0.3, margin: "0 auto 20px" }} />
      <div style={{ fontSize: 11, color: "var(--warm-mid)" }}>
        {t.footerContact}
      </div>
    </footer>
  );
}

// ─── ROOT ───
export default function WeddingInvitation() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("ja");
  const t = T[lang];

  // URLパラメータを読み取ってプレミアムか判定
  const params = new URLSearchParams(window.location.search);
  const isPremium = params.get("plan") === "premium" && params.get("key") === SITE_CONFIG.premiumKey;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <style>{FONTS + STYLES}</style>
      <Nav activePage={page} setPage={setPage} lang={lang} setLang={setLang} t={t} />
      <main style={{ minHeight: "100vh" }}>
        {page === "home" && <HomePage setPage={setPage} t={t} lang={lang} />}
        {page === "rsvp" && <RSVPPage isPremium={isPremium} t={t} />}
        {page === "gallery" && <GalleryPage t={t} />}
      </main>
      <Footer setPage={setPage} t={t} lang={lang} />
    </>
  );
}
