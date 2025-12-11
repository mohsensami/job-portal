/**
 * فرمت تاریخ به صورت نسبی (امروز، دیروز، X روز پیش و...)
 * @param {string} dateString - رشته تاریخ
 * @returns {string} - تاریخ فرمت شده
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
