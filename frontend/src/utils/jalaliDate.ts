import moment from "moment-jalaali";

/**
 * تبدیل تاریخ میلادی به شمسی و فرمت کردن آن
 * @param date - تاریخ میلادی (Date, string, یا moment object)
 * @param format - فرمت مورد نظر (پیش‌فرض: jYYYY/jMM/jDD)
 * @returns تاریخ شمسی فرمت شده
 */
export const formatJalaliDate = (
  date: Date | string | moment.Moment | null | undefined,
  format: string = "jYYYY/jMM/jDD"
): string => {
  if (!date) return "";
  try {
    return moment(date).format(format);
  } catch (error) {
    return "";
  }
};

/**
 * تبدیل تاریخ میلادی به شمسی با ساعت
 * @param date - تاریخ میلادی
 * @returns تاریخ شمسی با ساعت (مثلاً: 1403/09/15 - 14:30)
 */
export const formatJalaliDateTime = (
  date: Date | string | moment.Moment | null | undefined
): string => {
  return formatJalaliDate(date, "jYYYY/jMM/jDD - HH:mm");
};

/**
 * تبدیل تاریخ میلادی به شمسی فقط با تاریخ (بدون ساعت)
 * @param date - تاریخ میلادی
 * @returns تاریخ شمسی (مثلاً: 1403/09/15)
 */
export const formatJalaliDateOnly = (
  date: Date | string | moment.Moment | null | undefined
): string => {
  return formatJalaliDate(date, "jYYYY/jMM/jDD");
};

/**
 * تبدیل سال میلادی به سال شمسی
 * @param year - سال میلادی (عدد)
 * @returns سال شمسی (عدد)
 */
export const convertToJalaliYear = (
  year: number | string | null | undefined
): number | null => {
  if (!year) return null;
  try {
    const yearNum = typeof year === "string" ? parseInt(year) : year;
    if (isNaN(yearNum)) return null;

    // تبدیل سال میلادی به شمسی
    const date = moment(`${yearNum}-03-21`); // شروع سال شمسی تقریباً 21 مارس است
    return date.jYear();
  } catch (error) {
    return null;
  }
};

/**
 * تبدیل سال شمسی به سال میلادی
 * @param jalaliYear - سال شمسی (عدد)
 * @returns سال میلادی (عدد)
 */
export const convertFromJalaliYear = (
  jalaliYear: number | string | null | undefined
): number | null => {
  if (!jalaliYear) return null;
  try {
    const yearNum =
      typeof jalaliYear === "string" ? parseInt(jalaliYear) : jalaliYear;
    if (isNaN(yearNum)) return null;

    // تبدیل سال شمسی به میلادی
    const date = moment(`${yearNum}/01/01`, "jYYYY/jMM/jDD");
    return date.year();
  } catch (error) {
    return null;
  }
};

/**
 * فرمت تاریخ نسبی به فارسی (امروز، دیروز، X روز پیش و...)
 * @param dateString - رشته تاریخ
 * @returns تاریخ نسبی فارسی
 */
export const formatRelativeJalaliDate = (
  dateString: string | Date | null | undefined
): string => {
  if (!dateString) return "";
  try {
    const date = moment(dateString);
    const now = moment();
    const diffDays = now.diff(date, "days");

    if (diffDays === 0) return "امروز";
    if (diffDays === 1) return "دیروز";
    if (diffDays < 7) return `${diffDays} روز پیش`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
    return `${Math.floor(diffDays / 365)} سال پیش`;
  } catch (error) {
    return "";
  }
};

/**
 * گرفتن لیست سال‌های شمسی برای Select
 * @param startYear - سال شروع (شمسی)
 * @param endYear - سال پایان (شمسی) - پیش‌فرض: سال جاری
 * @returns آرایه سال‌های شمسی
 */
export const getJalaliYears = (
  startYear: number = 1350,
  endYear?: number
): number[] => {
  const currentJalaliYear = moment().jYear();
  const end = endYear || currentJalaliYear;
  const years: number[] = [];

  for (let year = end; year >= startYear; year--) {
    years.push(year);
  }

  return years;
};

export default moment;
