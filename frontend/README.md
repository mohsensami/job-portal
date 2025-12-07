# 🚀 Job Portal - Full Stack MERN Application

یک پلتفرم کامل جستجو و درخواست شغل با استفاده از تکنولوژی‌های مدرن MERN Stack

A comprehensive job search and application platform built with modern MERN Stack technologies

---

## 📋 فهرست مطالب / Table of Contents

- [ویژگی‌ها / Features](#-ویژگیها--features)
- [تکنولوژی‌های استفاده شده / Tech Stack](#-تکنولوژیهای-استفاده-شده--tech-stack)
- [نصب و راه‌اندازی / Installation](#-نصب-و-راهاندازی--installation)
- [ساختار پروژه / Project Structure](#-ساختار-پروژه--project-structure)
- [API Endpoints](#-api-endpoints)
- [استفاده / Usage](#-استفاده--usage)
- [نقش‌ها و دسترسی‌ها / Roles & Permissions](#-نقشها-و-دسترسیها--roles--permissions)
- [مشارکت / Contributing](#-مشارکت--contributing)
- [مجوز / License](#-مجوز--license)

---

## ✨ ویژگی‌ها / Features

### 🔐 احراز هویت / Authentication

- سیستم احراز هویت مدرن با JWT و Cookie
- فرم‌های ورود و ثبت‌نام با اعتبارسنجی (Formik & Yup)
- محافظت از مسیرها با Route Guards
- مدیریت Session و Token

### 👤 داشبورد کاربر / User Dashboard

- مشاهده تاریخچه درخواست‌های شغل
- مدیریت اطلاعات شخصی
- پیگیری وضعیت درخواست‌ها (pending, accepted, rejected)
- اعمال فیلتر و جستجو

### 👨‍💼 داشبورد ادمین / Admin Dashboard

- مدیریت کامل کاربران و مشاغل
- ایجاد و ویرایش مشاغل
- مدیریت دسته‌بندی‌های شغل (Job Types)
- آمار و تحلیل با نمودارها (Charts)
- خروجی CSV از داده‌ها
- DataGrid برای نمایش و مدیریت داده‌ها

### 🔍 جستجو و فیلتر / Search & Filter

- جستجوی پیشرفته مشاغل
- فیلتر بر اساس دسته‌بندی
- فیلتر بر اساس موقعیت مکانی
- نمایش جزئیات کامل هر شغل

### 🎨 رابط کاربری / User Interface

- طراحی Responsive با Material UI (MUI)
- پشتیبانی از حالت Dark & Light
- پشتیبانی کامل از RTL (راست به چپ) برای فارسی
- Sidebar قابل باز و بسته شدن
- Toast Notifications برای بازخورد کاربر
- Pagination برای لیست‌ها

### 🏗️ معماری / Architecture

- الگوی MVC در Backend
- High Order Components (HOC)
- State Management با Redux
- مدیریت خطاهای مرکزی

---

## 🛠️ تکنولوژی‌های استفاده شده / Tech Stack

### Backend

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Cookie Parser** - Cookie Management
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP Request Logger
- **dotenv** - Environment Variables

### Frontend

- **React 18** - UI Library
- **Vite** - Build Tool
- **Redux** - State Management
- **Redux Thunk** - Async Actions
- **React Router DOM** - Routing
- **Material UI (MUI)** - Component Library
- **MUI DataGrid** - Data Table
- **Formik** - Form Management
- **Yup** - Schema Validation
- **Axios** - HTTP Client
- **React Toastify** - Notifications
- **React Google Charts** - Charts & Analytics
- **React Pro Sidebar** - Sidebar Component
- **Moment.js** - Date Formatting
- **Emotion** - CSS-in-JS (RTL Support)

---

## 📦 نصب و راه‌اندازی / Installation

### پیش‌نیازها / Prerequisites

- Node.js (v14 یا بالاتر)
- MongoDB (محلی یا Atlas)
- npm یا yarn

### مراحل نصب / Installation Steps

1. **کلون کردن پروژه / Clone the repository**

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

2. **نصب وابستگی‌های Backend / Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **تنظیم متغیرهای محیطی Backend / Setup Backend Environment Variables**

   فایل `.env` در پوشه `backend` ایجاد کنید:

```env
DATABASE=your_mongodb_connection_string
PORT=9000
JWT_SECRET=your_jwt_secret_key
```

4. **نصب وابستگی‌های Frontend / Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

5. **اجرای Backend Server / Run Backend Server**

```bash
cd ../backend
npm start
```

سرور روی پورت 9000 اجرا می‌شود (یا پورتی که در .env تعریف کرده‌اید)

6. **اجرای Frontend Development Server / Run Frontend Dev Server**

```bash
cd ../frontend
npm run dev
```

اپلیکیشن روی `http://localhost:5173` (یا پورت پیش‌فرض Vite) اجرا می‌شود

---

## 📁 ساختار پروژه / Project Structure

```
job-portal/
├── backend/
│   ├── controllers/          # کنترلرهای منطق کسب و کار
│   │   ├── authController.js
│   │   ├── jobsController.js
│   │   ├── jobsTypeController.js
│   │   └── userController.js
│   ├── middleware/           # Middleware ها
│   │   ├── auth.js          # احراز هویت
│   │   └── error.js         # مدیریت خطا
│   ├── models/              # مدل‌های دیتابیس
│   │   ├── jobModel.js
│   │   ├── jobTypeModel.js
│   │   └── userModel.js
│   ├── routes/              # مسیرهای API
│   │   ├── authRoutes.js
│   │   ├── jobsRoutes.js
│   │   ├── jobsTypeRoutes.js
│   │   └── userRoutes.js
│   ├── utils/               # توابع کمکی
│   │   └── errorResponse.js
│   ├── app.js               # فایل اصلی Express
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── component/        # کامپوننت‌های قابل استفاده مجدد
    │   ├── pages/           # صفحات اصلی
    │   │   ├── admin/       # صفحات ادمین
    │   │   ├── user/        # صفحات کاربر
    │   │   └── global/      # کامپوننت‌های عمومی
    │   ├── redux/           # Redux Store و Actions
    │   │   ├── actions/
    │   │   ├── reducers/
    │   │   └── store.js
    │   ├── service/         # سرویس‌های API
    │   ├── theme.js         # تنظیمات تم MUI
    │   └── App.jsx          # کامپوننت اصلی
    ├── public/              # فایل‌های استاتیک
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication

- `POST /api/register` - ثبت‌نام کاربر جدید
- `POST /api/login` - ورود کاربر
- `GET /api/logout` - خروج کاربر

### Users

- `GET /api/user/:id` - دریافت اطلاعات کاربر
- `PUT /api/user/update` - به‌روزرسانی اطلاعات کاربر
- `GET /api/allusers` - دریافت لیست تمام کاربران (Admin)

### Jobs

- `GET /api/jobs` - دریافت لیست مشاغل
- `GET /api/job/:id` - دریافت جزئیات یک شغل
- `POST /api/job/create` - ایجاد شغل جدید (Admin)
- `PUT /api/job/update/:id` - به‌روزرسانی شغل (Admin)
- `DELETE /api/job/delete/:id` - حذف شغل (Admin)
- `GET /api/jobs/search/:keyword` - جستجوی مشاغل
- `POST /api/job/:id/apply` - درخواست برای یک شغل

### Job Types

- `GET /api/jobtype` - دریافت لیست دسته‌بندی‌ها
- `POST /api/jobtype/create` - ایجاد دسته‌بندی جدید (Admin)
- `PUT /api/jobtype/update/:id` - به‌روزرسانی دسته‌بندی (Admin)
- `DELETE /api/jobtype/delete/:id` - حذف دسته‌بندی (Admin)

---

## 💻 استفاده / Usage

### برای کاربران عادی / For Regular Users

1. ثبت‌نام یا ورود به حساب کاربری
2. جستجو و فیلتر مشاغل
3. مشاهده جزئیات هر شغل
4. ارسال درخواست برای مشاغل مورد نظر
5. پیگیری وضعیت درخواست‌ها در داشبورد کاربر

### برای ادمین‌ها / For Admins

1. ورود به حساب ادمین
2. دسترسی به داشبورد ادمین
3. ایجاد و مدیریت مشاغل
4. ایجاد و مدیریت دسته‌بندی‌ها
5. مشاهده و مدیریت کاربران
6. مشاهده آمار و تحلیل‌ها
7. خروجی گرفتن از داده‌ها به صورت CSV

---

## 🔑 نقش‌ها و دسترسی‌ها / Roles & Permissions

### کاربر عادی (Role: 0)

- مشاهده و جستجوی مشاغل
- ارسال درخواست برای مشاغل
- مشاهده تاریخچه درخواست‌ها
- ویرایش اطلاعات شخصی

### ادمین (Role: 1)

- تمام دسترسی‌های کاربر عادی
- ایجاد، ویرایش و حذف مشاغل
- ایجاد، ویرایش و حذف دسته‌بندی‌ها
- مشاهده و مدیریت کاربران
- دسترسی به آمار و تحلیل‌ها

---

## 🎯 ویژگی‌های فنی / Technical Features

- ✅ **RESTful API** - طراحی API بر اساس اصول REST
- ✅ **JWT Authentication** - احراز هویت امن با JSON Web Tokens
- ✅ **Password Encryption** - رمزنگاری رمز عبور با bcrypt
- ✅ **Error Handling** - مدیریت مرکزی خطاها
- ✅ **Input Validation** - اعتبارسنجی ورودی‌ها در Frontend و Backend
- ✅ **Responsive Design** - طراحی واکنش‌گرا برای تمام دستگاه‌ها
- ✅ **RTL Support** - پشتیبانی کامل از راست به چپ
- ✅ **Dark/Light Theme** - پشتیبانی از تم تاریک و روشن
- ✅ **State Management** - مدیریت حالت با Redux
- ✅ **Code Organization** - سازماندهی کد با الگوی MVC

---

## 🤝 مشارکت / Contributing

مشارکت‌های شما خوشآمد است! لطفاً:

1. Fork کنید
2. یک Branch برای ویژگی جدید ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. به Branch خود Push کنید (`git push origin feature/AmazingFeature`)
5. یک Pull Request باز کنید

---

## 📝 مجوز / License

این پروژه تحت مجوز ISC منتشر شده است.

---

## 👨‍💻 نویسنده / Author

**Emmann**

---

## 🙏 تشکر / Acknowledgments

- Material UI برای کامپوننت‌های زیبا
- MongoDB برای دیتابیس قدرتمند
- تمام کتابخانه‌های Open Source که در این پروژه استفاده شده‌اند

---

## 📞 تماس / Contact

برای سوالات و پیشنهادات، لطفاً یک Issue در Repository باز کنید.

---

**⭐ اگر این پروژه برای شما مفید بود، یک Star بدهید!**
