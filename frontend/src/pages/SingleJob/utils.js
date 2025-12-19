import { formatPrice as formatPriceUtil } from "../../utils.ts";
import { formatRelativeJalaliDate } from "../../utils/jalaliDate";

/**
 * فرمت تاریخ به صورت نسبی (امروز، دیروز، X روز پیش و...)
 * @param {string} dateString - رشته تاریخ
 * @returns {string} - تاریخ فرمت شده
 */
export const formatDate = formatRelativeJalaliDate;

/**
 * فرمت کردن قیمت به تومان با جداکننده هزارگان
 * @param {string|number} price - قیمت به دلار
 * @returns {string} - قیمت فرمت شده به تومان
 */
export const formatPrice = formatPriceUtil;
