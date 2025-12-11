export function toPersianDigits(input = "") {
  return input.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

/**
 * فرمت کردن قیمت به تومان با جداکننده هزارگان
 * @param {string|number} price - قیمت به دلار
 * @returns {string} - قیمت فرمت شده به تومان
 */
export function formatPrice(price) {
  if (!price) return "توافقی";

  // تبدیل به عدد
  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice)) return "توافقی";

  // فرمت کردن با جداکننده هزارگان
  const formatted = numPrice.toLocaleString("en-US");

  // تبدیل به فارسی (اختیاری - می‌توانید حذف کنید اگر می‌خواهید اعداد انگلیسی بمانند)
  const persianFormatted = toPersianDigits(formatted);

  return `${persianFormatted} تومان`;
}
