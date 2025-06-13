export interface User {
  _id: string; // ID
  studentCode: string; // Mã sinh viên
  name: string; // Họ và tên
  dateOfBirth: string; // Ngày sinh
  gender: string; // Giới tính
  status: string; // Trạng thái học tập
  className: string; // Lớp
  faculty: string; // Khoa
  educationProgram: string; // Chương trình đào tạo
  major: string; // Ngành học
  academicYear: string; // Niên khóa
  phoneNumber: string; // Số điện thoại
  eduEmail: string; // Email trường cấp
  personalEmail: string; // Email cá nhân
  placeOfBirth: string; // Nơi sinh
  identityNumber: string; // Số CMND/CCCD
  identityIssuedPlace: string; // Nơi cấp CMND/CCCD
  nationality: string; // Quốc tịch
  ethnicity: string; // Dân tộc
  bankAccountNumber: string; // Số tài khoản ngân hàng
  password: string; // Mật khẩu
  __v: number; // Phiên bản dữ liệu (MongoDB)
}
