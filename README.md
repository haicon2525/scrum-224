# 🏢 Real Estate Portal - Hệ Thống Quản Lý & Tra Cứu Quỹ Căn

[![React](https://img.shields.io/badge/React-18.x-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/Material--UI-v6-007fff.svg?logo=mui&logoColor=white)](https://mui.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3.svg?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Hệ thống cổng thông tin bất động sản tra cứu bảng hàng, quỹ căn dự án **Vinhomes Ocean Park 2 & 3**, hỗ trợ bộ lọc đa tiêu chí, định vị mặt bằng, tích hợp xác thực Auth Guard và kết nối trực tiếp API Backend UAT.

---

## 📌 Mục Lục
- [Giới Thiệu](#-giới-thiệu)
- [Công Nghệ Sử Dụng (Tech Stack)](#-công-nghệ-sử-dụng-tech-stack)
- [Cấu Trúc Thư Mục (Folder Structure)](#-cấu-trúc-thư-mục-folder-structure)
- [Các Tính Năng & Quy Chuẩn Nghiệp Vụ](#-các-tính-năng--quy-chuẩn-nghiệp-vụ)
  - [1. Xác thực & Auth Guard](#1-xác-thực--auth-guard)
  - [2. Hỗ trợ Sắp xếp (Sorting)](#2-hỗ-trợ-sắp-xếp-sorting)
  - [3. Bộ lọc Nâng cao (Advanced Filter)](#3-bộ-lọc-nâng-cao-advanced-filter)
  - [4. Định dạng Dữ liệu (Formatters)](#4-định-dạng-dữ-liệu-formatters)
  - [5. Tương tác Chi tiết & Bản đồ Mặt bằng](#5-tương-tác-chi-tiết--bản-đồ-mặt-bằng)
  - [6. Floating Version Switcher](#6-floating-version-switcher)
- [Danh Sách API Tích Hợp](#-danh-sách-api-tích-hợp)
- [Hướng Dẫn Cài Đặt & Chạy Dự Án](#-hướng-dẫn-cài-đặt--chạy-dự-án)

---

## 🌟 Giới Thiệu

Dự án cung cấp 2 phiên bản giao diện song song phục vụ quá trình phát triển và nghiệm thu:
1. **Phiên bản Bootstrap (`/bootstrap`)**: Dựng tĩnh 100% chuẩn từng pixel theo Figma thiết kế.
2. **Phiên bản MUI (`/mui`)**: Phiên bản chính thức sử dụng Material-UI, tích hợp API thật, cơ chế Auth Guard và bộ lọc tương tác trực tiếp.

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

- **Frontend Core**: React 18, TypeScript, Vite
- **UI Frameworks**:
  - **Material-UI (MUI)**: Component UI chính thức, theming hiện đại, responsive.
  - **Bootstrap 5**: Phục vụ layout tĩnh và đối chiếu thiết kế.
- **HTTP Client**: Axios với Interceptors tự động đính kèm `Bearer Token`, sinh mã định danh `X-Request-Id` và cơ chế Silent Token Auto-Refresh.
- **Routing**: `react-router-dom` v7
- **Icons**: `@mui/icons-material`

---

## 📁 Cấu Trúc Thư Mục (Folder Structure)

```text
src/
├── api/                        # Cấu hình Axios & Tích hợp API
│   ├── axiosClient.ts          # Axios instance, Interceptors, Token Refresh & Trace ID
│   └── portalApi.ts            # Master data, Search units, Projects, Phases API
├── assets/                     # Tài nguyên ảnh, icons
├── components/
│   ├── bootstrap/              # Các components giao diện Bootstrap (BsHeader, BsTable...)
│   ├── common/                 # Components dùng chung (AuthGuardModal, VersionSwitcher)
│   └── mui/                    # Các components giao diện MUI (MuiHeader, MuiHeroBanner...)
├── contexts/
│   └── AuthContext.tsx         # Context quản lý trạng thái đăng nhập, User Profile & Token
├── pages/
│   ├── BootstrapPage.tsx       # Trang giao diện Bootstrap
│   ├── MuiPage.tsx             # Trang giao diện chính thức MUI
│   └── MuiVersion/             # Các components con được module hóa của bảng hàng MUI
│       ├── AdvancedFilterPanel.tsx # Panel bộ lọc nâng cao 6 cột
│       ├── AreaRangePopover.tsx    # Popover lọc khoảng diện tích & presets
│       ├── PriceRangePopover.tsx   # Popover lọc khoảng giá & presets
│       ├── filterConstants.ts      # Hằng số presets & preview mock data
│       ├── UnitDetailModal.tsx     # Modal xem chi tiết thông tin căn hộ
│       ├── UnitFilterMUI.tsx       # Container điều phối chính của bảng hàng
│       ├── UnitListMobile.tsx      # Giao diện bảng hàng dạng thẻ trên Mobile
│       ├── UnitMapModal.tsx        # Modal bản đồ định vị tọa độ căn & zoom vị trí
│       └── UnitTable.tsx           # Bảng dữ liệu quỹ căn trên Desktop
├── styles/                     # Scoped CSS cho Bootstrap & Global styles
├── types/                      # Định nghĩa TypeScript interfaces (Unit, Auth, API...)
└── utils/
    ├── formatters.ts           # Hàm chuẩn hóa giá (xx,xx tỷ), diện tích, hướng đất
    └── useBootstrapLoader.ts   # Dynamic CSS loader cho trang Bootstrap
```

---

## 📋 Các Tính Năng & Quy Chuẩn Nghiệp Vụ

### 1. Xác thực & Auth Guard
- **Chưa đăng nhập**: Giao diện bảng hàng bị làm mờ (`blur(8px)`), khóa tương tác và hiển thị modal đăng nhập (`AuthGuardModal`).
- **Đã đăng nhập**: Tự động mở khóa giao diện, gọi API `/portal/unit/search` và nạp dữ liệu quỹ căn thực tế.

### 2. Hỗ trợ Sắp xếp (Sorting)
Cung cấp 5 tùy chọn sắp xếp tương ứng với query param `sort`:
- **Sắp xếp theo mặc định**: `"sort": "isHot:desc,createdAt:desc"` (Căn hot lên đầu và xếp theo ngày tạo mới nhất).
- **Mới nhất**: `"sort": "createdAt:desc"`
- **Cũ nhất**: `"sort": "createdAt:asc"`
- **Giá tăng dần**: `"sort": "basePrice:asc"`
- **Giá giảm dần**: `"sort": "basePrice:desc"`

### 3. Bộ lọc Nâng cao (Advanced Filter)
Hỗ trợ tìm kiếm theo 6 tiêu chí độc lập:
- **Mã căn hộ**: Param `unitCode` (tìm kiếm tức thì khi nhấn Enter).
- **Phân khu**: Param `phaseId` (nạp động theo dự án được chọn).
- **Loại căn**: Param `unitTypeCode` (nạp từ Master Data `UNIT_TYPE`).
- **Hướng đất**: Param `directionCode` (nạp từ Master Data `DIRECTION`).
- **Diện tích**: Param `minAreaLand`, `maxAreaLand` (hỗ trợ nhập min-max và radio presets: *Dưới 50m², 50-70m², 70-90m², 90-120m², Trên 120m²*).
- **Khoảng giá**: Param `minBasePrice`, `maxBasePrice` (hỗ trợ nhập min-max và radio presets: *Dưới 5 tỷ, 5-10 tỷ, 10-15 tỷ, 15-20 tỷ, Trên 20 tỷ*).

### 4. Định dạng Dữ liệu (Formatters)
Tuân thủ nghiêm ngặt quy tắc nghiệp vụ trong [src/utils/formatters.ts](src/utils/formatters.ts):
- **Giá Gốc (Base Price)**: Làm tròn xuống 2 chữ số thập phân dạng `xx,xx tỷ` (sử dụng dấu phẩy `,`).
  - `15.101.436.069 VNĐ` -> `15,10 tỷ`
  - `15.121.436.069 VNĐ` -> `15,12 tỷ`
  - `15.129.436.069 VNĐ` -> `15,12 tỷ`
- **Hướng đất (Directions)**:
  - Căn 1 hướng: Hiển thị tên hướng bình thường (ví dụ: `Tây Bắc`).
  - Căn góc từ 2 hướng trở lên: Nối các hướng bằng dấu `" - "` (ví dụ: `Tây Bắc - Bắc`, `Tây Bắc - Bắc - Đông Bắc`).
- **Diện tích**: Không làm tròn, giữ nguyên số liệu gốc và hiển thị kèm đơn vị `m²`.
- **Icon Hotdeal**: Hiển thị biểu tượng ngọn lửa đỏ 🔥 ở cột đầu tiên khi căn hộ có `isHot === true`.

### 5. Tương tác Chi tiết & Bản đồ Mặt bằng
- **Xem chi tiết căn**: Nhấn vào huy hiệu Mã căn (Unit Code) để mở modal chi tiết hiển thị đầy đủ thông số: diện tích đất, diện tích xây dựng, tầng cao, giá bán, chính sách và tiến độ.
- **Định vị trên Mặt bằng quỹ căn**: Nhấn vào icon Vị trí (Location Pin) ở cột đầu tiên để mở sơ đồ mặt bằng tổng thể, tự động ghim tọa độ chính xác của căn hộ và phóng to vị trí (Zoom 2.0x).

### 6. Floating Version Switcher
- Widget chuyển đổi phiên bản nổi cố định ở góc dưới màn hình, thiết kế dạng Glassmorphism hiện đại.
- Hỗ trợ chuyển đổi nhanh 1-click giữa Bootstrap & MUI.
- Có nút thu gọn tối đa thành nút tròn mini (`32x32px`), lưu trạng thái thu gọn vào `localStorage`.

---

## 🌐 Danh Sách API Tích Hợp

| Chức năng | Endpoint | Method | Tham số / Mô tả |
| :--- | :--- | :---: | :--- |
| **Trạng thái căn** | `/master-data/list` | `GET` | `groupCode=UNIT_STATUS` |
| **Loại căn hộ** | `/master-data/list` | `GET` | `groupCode=UNIT_TYPE` |
| **Hướng đất** | `/master-data/list` | `GET` | `groupCode=DIRECTION` |
| **Danh sách phân khu** | `/admin/projects/list` *(hoặc `/portal/phases/list`)* | `GET` | `projectId` |
| **Tìm kiếm quỹ căn** | `/portal/unit/search` | `GET` | `projectId`, `statusCode`, `unitCode`, `phaseId`, `unitTypeCode`, `directionCode`, `minAreaLand`, `maxAreaLand`, `minBasePrice`, `maxBasePrice`, `sort`, `pageNumber`, `pageSize` |
| **Chi tiết căn hộ** | `/portal/units/detail` | `GET` | `id` |
| **Xác thực đăng nhập**| `/auth/login` | `POST` | `username`, `password` |
| **Làm mới Token** | `/auth/refresh-token` | `POST` | `refreshToken` |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu môi trường
- **Node.js**: Phiên bản 18.x trở lên
- **Trình quản lý gói**: `npm` hoặc `yarn`

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173`

### 4. Kiểm tra TypeScript & Đóng gói sản phẩm (Production Build)
```bash
# Kiểm tra lỗi TypeScript không sinh file
npx tsc --noEmit

# Đóng gói bundle tối ưu hóa
npm run build
```

---

## 👥 Nhóm Phát Triển
- **Dự án**: Scrum-224 - Bảng hàng Vinhomes Ocean Park
- **Frontend Lead & Developer**: Antigravity Pair-Programming
- **Phiên bản**: 1.0.0
