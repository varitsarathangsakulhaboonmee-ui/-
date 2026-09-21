// Central UI string translations (th / en / ja).
// Usage: import { t } from '@/data/uiStrings'; t('menuTitle', lang)

const strings = {
  // Menu / nav
  menuTitle: { th: 'เมนูของเรา', en: 'Our Menu', ja: 'メニュー' },
  menuSub: { th: 'เมนูคำตัน', en: 'Kam Tan Menu', ja: 'カムタンのメニュー' },
  searchPlaceholder: { th: 'ค้นหาเมนู...', en: 'Search menu...', ja: 'メニューを検索…' },
  signature: { th: 'เมนูโปรโมชั่น', en: 'Promotion Menu', ja: 'プロモーションメニュー' },
  promoSub: { th: '2 Dine 1 Free', en: '2 Dine 1 Free', ja: '2名様で1名様無料！' },
  signatureTitle: { th: 'ลาบคำตัน', en: 'Signature Larb', ja: 'シグネチャーラープ' },
  signatureDesc: {
    th: 'รสชาติไทยแท้ในสไตล์ Kam Tan',
    en: 'Authentic Thai taste, Kam Tan style',
    ja: 'カムタン流の本格タイ味',
  },
  viewLarb: { th: 'ดูเมนูลาบ', en: 'View Larb Menu', ja: 'ラープメニューを見る' },
  noResult: { th: 'ไม่พบเมนูที่ค้นหา', en: 'No menu found', ja: 'メニューが見つかりません' },
  recommended: { th: 'เมนูแนะนำ', en: 'Recommended', ja: 'おすすめメニュー' },
  drinksTitle: { th: 'เครื่องดื่ม', en: 'Drinks', ja: 'ドリンク' },
  drinksSub: { th: 'เครื่องดื่มคำตัน', en: 'Kam Tan Drinks', ja: 'カムタンのドリンク' },
  back: { th: 'ย้อนกลับ', en: 'Back', ja: '戻る' },
  viewCart: { th: 'ดูตะกร้า', en: 'View Cart', ja: 'カートを見る' },
  items: { th: 'รายการ', en: 'items', ja: '点' },
  added: {
    th: 'เพิ่ม {name} ลงตะกร้าแล้ว',
    en: 'Added {name} to cart',
    ja: '{name} をカートに追加しました',
  },
  navAll: { th: 'ทั้งหมด', en: 'All', ja: 'すべて' },
  navLarb: { th: 'ลาบ', en: 'Larb', ja: 'ラープ' },
  navFood: { th: 'อาหาร', en: 'Food', ja: 'フード' },
  navAppetizer: { th: 'ของทานเล่น', en: 'Appetizer', ja: '前菜' },
  navDrinks: { th: 'เครื่องดื่ม', en: 'Drinks', ja: 'ドリンク' },
  navCart: { th: 'ตะกร้า', en: 'Cart', ja: 'カート' },
  reset: { th: 'เริ่มใหม่', en: 'Reset', ja: 'リセット' },

  // Customize
  notFound: { th: 'ไม่พบเมนู', en: 'Menu not found', ja: 'メニューが見つかりません' },
  customizeTitle: { th: 'ปรับแต่งเมนูของคุณ', en: 'Customize your meal', ja: 'メニューをカスタマイズ' },
  customizeSub: {
    th: 'เลือกท็อปปิ้งและระดับความเผ็ด',
    en: 'Choose toppings and spice level',
    ja: 'トッピングと辛さを選択',
  },
  toppings: { th: 'เพิ่มท็อปปิ้ง', en: 'Add toppings', ja: 'トッピングを追加' },
  spiceLevel: { th: 'ระดับความเผ็ด', en: 'Spice level', ja: '辛さレベル' },
  quantity: { th: 'จำนวน', en: 'Quantity', ja: '数量' },
  size: { th: 'ไซส์', en: 'Size', ja: 'サイズ' },
  decrease: { th: 'ลดจำนวน', en: 'Decrease', ja: '減らす' },
  increase: { th: 'เพิ่มจำนวน', en: 'Increase', ja: '増やす' },
  total: { th: 'รวม', en: 'Total', ja: '合計' },
  addToCart: { th: 'เพิ่มลงตะกร้า', en: 'Add to cart', ja: 'カートに追加' },

  // Cart
  reviewTitle: { th: 'ตรวจสอบรายการ', en: 'Review your order', ja: '注文内容の確認' },
  reviewSub: { th: 'Your Order', en: 'Your Order', ja: 'ご注文' },
  emptyCart: { th: 'ตะกร้าว่างเปล่า', en: 'Your cart is empty', ja: 'カートは空です' },
  chooseMenu: { th: 'เลือกเมนู', en: 'Browse menu', ja: 'メニューを見る' },
  subtotal: { th: 'ยอดรวมย่อย', en: 'Subtotal', ja: '小計' },
  totalLabel: { th: 'ยอดรวมทั้งหมด', en: 'Total', ja: '合計' },
  addMore: { th: 'เพิ่มเมนู', en: 'Add more', ja: 'さらに追加' },
  checkout: { th: 'ชำระเงิน', en: 'Checkout', ja: 'お会計へ' },

  // Payment
  paymentTitle: { th: 'ชำระเงิน', en: 'Payment', ja: 'お支払い' },
  paymentSub: { th: 'Payment', en: 'Payment', ja: 'お支払い' },
  amountDue: { th: 'ยอดชำระ', en: 'Amount due', ja: 'お支払い金額' },
  chooseMethod: { th: 'เลือกวิธีการชำระเงิน', en: 'Choose payment method', ja: 'お支払い方法を選択' },
  confirmPayment: { th: 'ยืนยันการชำระเงิน', en: 'Confirm payment', ja: '支払いを確認' },
  scanQrTitle: { th: 'สแกน QR เพื่อชำระเงิน', en: 'Scan QR to pay', ja: 'QRをスキャンしてお支払い' },
  scanQrDesc: {
    th: 'กรุณาสแกน QR Code เพื่อชำระเงิน',
    en: 'Please scan the QR code to pay',
    ja: 'QRコードをスキャンしてお支払いください',
  },
  mockQrNote: {
    th: '*ตัวอย่าง QR Code สำหรับสาธิต (Mock) ไม่ใช่ QR รับเงินจริง',
    en: '*Mock QR for demo only — not a real payment QR',
    ja: '*デモ用のモックQRです。実際の支払い用ではありません。',
  },
  paidConfirm: { th: 'ฉันชำระเงินแล้ว', en: 'I have paid', ja: '支払いました' },
  qrMethod: { th: 'สแกน QR พร้อมเพย์', en: 'PromptPay QR', ja: 'プロンプトペイQR' },
  counterMethod: { th: 'ชำระที่เคาน์เตอร์', en: 'Pay at Counter', ja: 'カウンターで支払い' },

  // Success
  successTitle: { th: 'ชำระเงินสำเร็จ!', en: 'Payment Successful!', ja: 'お支払い完了！' },
  successSub: { th: 'Payment Successful', en: 'Payment Successful', ja: 'お支払い完了' },
  thankYou: {
    th: 'ขอบคุณที่ใช้บริการ Kam Tan',
    en: 'Thank you for dining at Kam Tan',
    ja: 'カムタンをご利用いただきありがとうございます',
  },
  orderNo: { th: 'หมายเลขออเดอร์', en: 'Order number', ja: '注文番号' },
  preparing: { th: 'กำลังเตรียมอาหาร…', en: 'Preparing your order…', ja: '調理中…' },
  startNew: { th: 'เริ่มสั่งใหม่', en: 'Start new order', ja: '新しい注文を開始' },

  // Idle timer
  idleTitle: { th: 'ยังต้องการสั่งอาหารต่อหรือไม่?', en: 'Still want to order?', ja: 'まだご注文を続けますか？' },
  idleDesc: {
    th: 'ระบบจะรีเซ็ตออเดอร์ใน {s} วินาที',
    en: 'Order will reset in {s}s',
    ja: '{s}秒後にリセットされます',
  },
  continueOrder: { th: 'ยังสั่งต่อ', en: 'Continue', ja: '続ける' },

  // Reset confirm
  resetTitle: { th: 'เริ่มออเดอร์ใหม่?', en: 'Start a new order?', ja: '新しい注文を開始しますか？' },
  resetDesc: {
    th: 'รายการปัจจุบันจะถูกล้างทั้งหมด',
    en: 'Current order will be cleared',
    ja: '現在の注文はすべて消去されます',
  },
  cancel: { th: 'ยกเลิก', en: 'Cancel', ja: 'キャンセル' },
  confirm: { th: 'ยืนยัน', en: 'Confirm', ja: '確認' },
  removeItem: { th: 'ลบรายการ', en: 'Remove item', ja: 'アイテムを削除' },
};

export const t = (key, lang) => {
  const entry = strings[key];
  if (!entry) return key;
  return entry[lang] || entry.th;
};