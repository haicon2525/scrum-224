# AI Coding Assistant Rules - Real Estate Frontend Project

## 1. Tech Stack & Libraries
- Framework: React.js (TypeScript)
- UI Frameworks: Material-UI (MUI) và Bootstrap (phân tách theo trang yêu cầu).
- HTTP Client: Axios
- Icons: @mui/icons-material

## 2. Project Architecture & Requirements
- Project gồm các phiên bản giao diện:
  1. Trang Bootstrap: Dựng layout tĩnh theo Figma.
  2. Trang MUI & Tích hợp API: Trang chính thức xử lý logic, gọi API và hiển thị dữ liệu thực tế.
- Xử lý trạng thái Xác thực (Auth Guard):
  - Kiểm tra trạng thái đăng nhập. Nếu chưa đăng nhập -> Hiển thị màn hình che mờ (blur) và form login.
  - Đã đăng nhập -> Cho phép call API lấy danh sách quỹ căn.

## 3. Business Logic & Data Formatting Rules (BẮT BUỘC TUÂN THỦ)
- **Format Giá tiền (Base Price):**
  - Làm tròn xuống và định dạng theo chuẩn `xx,xx tỷ`.
  - Ví dụ: 15101436069 VNĐ -> `15,10 tỷ` (dùng dấu phẩy phân cách thập phân).
  - Công thức:
    ```ts
    export function formatBasePrice(price: number | null | undefined): string {
      if (price === null || price === undefined || isNaN(price)) return '0,00 tỷ';
      const inBillion = price / 1_000_000_000;
      const roundedDown = Math.floor(inBillion * 100) / 100;
      return `${roundedDown.toFixed(2).replace('.', ',')} tỷ`;
    }
    ```
- **Format Hướng đất (Directions):**
  - Căn bình thường: 1 hướng.
  - Căn góc từ 2 hướng trở lên: Nối các hướng bằng dấu `" - "`.
  - Ví dụ: `["Tây Bắc", "Bắc"]` -> `Tây Bắc - Bắc`.
  - Công thức:
    ```ts
    export function formatDirections(directions: string[] | string | null | undefined): string {
      if (!directions) return '-';
      if (Array.isArray(directions)) {
        return directions.filter(Boolean).join(' - ') || '-';
      }
      return directions;
    }
    ```
- **Icon Hotdeal:**
  - Nếu thuộc tính `isHot === true`, hiển thị icon Hotdeal ở cột đầu tiên của bảng.

## 4. API Integration Guidelines
- Master Data APIs:
  - `/master-data/list?groupCode=UNIT_STATUS` (Trạng thái)
  - `/master-data/list?groupCode=UNIT_TYPE` (Loại căn)
  - `/master-data/list?groupCode=DIRECTION` (Hướng đất)
  - `/admin/projects/list` (Danh sách phân khu theo dự án)
- Search & Filter API:
  - Endpoint: `/portal/unit/search`
  - Các query params hỗ trợ: `projectId`, `statusCode`, `unitCode`, `phaseId`, `unitTypeCode`, `directionCode`, `minAreaLand`, `maxAreaLand`, `minBasePrice`, `maxBasePrice`, `sort`.
  - Các tùy chọn sort:
    - Mặc định: `isHot:desc,createdAt:desc`
    - Mới nhất: `createdAt:desc`
    - Cũ nhất: `createdAt:asc`
    - Giá tăng dần: `basePrice:asc`
    - Giá giảm dần: `basePrice:desc`

## 5. Coding Standards
- Viết code sạch, chia nhỏ component (phần filter riêng, phần table hiển thị riêng).
- Xử lý đầy đủ trạng thái `loading`, `empty state` (không tìm thấy kết quả) và `error handling` khi gọi API.
- Đặt tên biến và hàm rõ nghĩa bằng tiếng Anh.
