// PromptPay (Thai QR Code) EMVCo payload generator.
// Produces a static PromptPay QR string for a given Thai mobile number.

function crc16ccitt(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? (crc >> 1) ^ 0x1021 : crc >> 1;
    }
  }
  var hex = (crc & 0xffff).toString(16).toUpperCase();
  while (hex.length < 4) hex = '0' + hex;
  return hex;
}

function field(id, value) {
  var len = value.length.toString();
  while (len.length < 2) len = '0' + len;
  return `${id}${len}${value}`;
}

export function buildPromptPayPayload(phone) {
  // Convert Thai mobile (e.g. "0812345678") to PromptPay account format:
  // "0" + "66" + number-without-leading-zero, left-padded to 13 digits.
  var account = '0' + '66' + phone.replace(/^0/, '');
  while (account.length < 13) account = '0' + account;
  const merchantInfo = field(
    '29',
    field('00', 'A000000672010010') + field('01', account)
  );
  const payload =
    field('00', '01') +
    field('01', '12') +
    merchantInfo +
    field('53', '764') +
    field('58', 'TH') +
    '6304';
  return payload + crc16ccitt(payload);
}

// TODO: replace with the real merchant phone number registered to PromptPay.
export const PROMPTPAY_PHONE = '0973393598';