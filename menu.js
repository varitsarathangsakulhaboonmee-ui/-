// Central menu data. To swap an image, replace the `image` URL only.
// Prices are in Japanese Yen (¥). Names/descriptions in TH / EN / JA.

const IMG = 'https://media.base44.com/images/public/6aa6ccecd87a40f04856ee95';

export const menuItems = [
  // — Promotion (Larb) —
  {
    id: 'promotion-larb',
    nameTH: 'เมนูโปรโมชั่น', nameEN: 'Promotion Menu', nameJA: 'プロモーションメニュー',
    descTH: 'ลาบคำตันสูตรพิเศษ หอมข้าวคั่ว สมุนไพร และเครื่องเทศ',
    descEN: 'Kam Tan signature larb with roasted rice, herbs and spices.',
    descJA: 'カムタン特製ラープ、香ばしい炒り米とハーブ、スパイス。',
    price: 1100, category: 'food', customizable: true, hasSizes: true,
    imageFit: 'contain',
    image: `${IMG}/a0a6abd3e_IMG_20260916_011235.jpg`,
  },
  {
    id: 'khao-niao',
    nameTH: 'ข้าวเหนียว', nameEN: 'Sticky Rice', nameJA: 'もち米',
    descTH: 'ข้าวเหนียวนึ่งร้อนๆ',
    descEN: 'Freshly steamed sticky rice.',
    descJA: '蒸きたてのもち米。',
    price: 200, category: 'food', customizable: false,
    image: `${IMG}/4a797212e_generated_image.png`,
  },

  // — Drinks —
  {
    id: 'mekhong',
    nameTH: 'เหล้าแม่โขง', nameEN: 'Mekhong Spirit', nameJA: 'メコン酒',
    descTH: 'วิสกี้ไทยแม่โขง รสชาติหอมนุ่ม', descEN: 'Thai Mekhong spirit, smooth and fragrant.', descJA: 'タイのメコン酒、香りまろやか。',
    price: 890, category: 'drinks', customizable: false,
    image: `${IMG}/5d53fdc98_generated_image.png`,
  },
  {
    id: 'water',
    nameTH: 'น้ำเปล่า', nameEN: 'Water', nameJA: '水',
    descTH: 'น้ำดื่มบริสุทธิ์', descEN: 'Pure drinking water.', descJA: 'ピュアウォーター。',
    price: 200, category: 'drinks', customizable: false,
    image: `${IMG}/e0a4d42f6_generated_image.png`,
  },
];

export const categories = [
  { id: 'all', nameTH: 'ทั้งหมด', nameEN: 'All', nameJA: 'すべて' },
  { id: 'food', nameTH: 'อาหาร', nameEN: 'Food', nameJA: 'フード' },
  { id: 'drinks', nameTH: 'เครื่องดื่ม', nameEN: 'Drinks', nameJA: 'ドリンク' },
];

export const sizes = [
  { id: 'S', nameTH: 'เล็ก (S)', nameEN: 'Small (S)', nameJA: 'S（スモール）', price: 900 },
  { id: 'M', nameTH: 'กลาง (M)', nameEN: 'Medium (M)', nameJA: 'M（ミディアム）', price: 1100 },
  { id: 'L', nameTH: 'ใหญ่ (L)', nameEN: 'Large (L)', nameJA: 'L（ラージ）', price: 1300 },
  { id: 'XL', nameTH: 'พิเศษ (XL)', nameEN: 'Extra Large (XL)', nameJA: 'XL（エクストララージ）', price: 1500 },
];

export const toppings = [
  { id: 'rice-powder', nameTH: 'เพิ่มข้าวคั่ว', nameEN: 'Extra roasted rice', nameJA: '炒り米追加', price: 200 },
  { id: 'extra-spicy', nameTH: 'เพิ่มความเผ็ด', nameEN: 'Extra spicy', nameJA: '辛さ追加', price: 300 },
  { id: 'veggies', nameTH: 'เพิ่มผัก', nameEN: 'Extra veggies', nameJA: '野菜追加', price: 300 },
];

export const spiceLevels = [
  { id: 'none', nameTH: 'ไม่เผ็ด', nameEN: 'Not spicy', nameJA: '辛くない', price: 0 },
  { id: 'mild', nameTH: 'เผ็ดน้อย', nameEN: 'Mild', nameJA: '少し辛い', price: 0 },
  { id: 'medium', nameTH: 'เผ็ดกลาง', nameEN: 'Medium', nameJA: '中辛', price: 0 },
  { id: 'hot', nameTH: 'เผ็ดมาก', nameEN: 'Hot', nameJA: '激辛', price: 0 },
];

const langKey = { th: 'TH', en: 'EN', ja: 'JA' };

export const itemName = (item, lang) => item[`name${langKey[lang] || 'TH'}`] || item.nameTH;
export const itemDesc = (item, lang) => item[`desc${langKey[lang] || 'TH'}`] || item.descTH;
export const catName = (cat, lang) => cat[`name${langKey[lang] || 'TH'}`] || cat.nameTH;
export const toppingName = (tp, lang) => tp[`name${langKey[lang] || 'TH'}`] || tp.nameTH;
export const spiceName = (s, lang) => s[`name${langKey[lang] || 'TH'}`] || s.nameTH;
export const sizeName = (s, lang) => s[`name${langKey[lang] || 'TH'}`] || s.nameTH;

export const getItemById = (id) => menuItems.find((m) => m.id === id);