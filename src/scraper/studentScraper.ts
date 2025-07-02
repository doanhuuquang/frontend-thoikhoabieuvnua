import { User } from "@/types/User";
import { Page } from "playwright-core";

const LINK_BUTTON_THONG_TIN_SINH_VIEN =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[2]/app-right/app-chucnang/div/div[2]/ul[16]/li/div[1]/a[1]";
/////////////////////////////////////////////////////////////////////////////////////
const STUDENT_CODE_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[2]/div[1]/div[2]"; // Mã sinh viên
const STUDENT_NAME_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[2]/div[2]/div[2]"; // Tên sinh viên
const STUDENT_DATE_OF_BIRTH_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[2]/div[3]/div[2]"; // Ngày sinh
const STUDENT_GENDER_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[2]/div[4]/div[2]"; // Giới tính
const STUDENT_STATUS_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[2]/div[5]/div[2]"; // Trạng thái
const STUDENT_CLASS_NAME_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[3]/div[1]/div[2]"; // Tên lớp
const STUDENT_FACULTY_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[3]/div[2]/div[2]"; // Khoa
const STUDENT_EDUCATION_PROGRAM_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[3]/div[3]/div[2]"; // Chương trình đào tạo
const STUDENT_MAJOR_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[3]/div[4]/div[2]"; // Ngành học
const STUDENT_ACADEMIC_YEAR_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[1]/div/div[3]/div[5]/div[2]"; // Niên khóa
const STUDENT_PHONE_NUMBER_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[1]/div[1]/input"; // Số điện thoại
const STUDENT_EDU_EMAIL_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[1]/div[2]/input"; // Email edu
const STUDENT_PERSONAL_EMAIL_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[1]/div[3]/input"; // Email cá nhân
const STUDENT_PLACE_OF_BIRTH_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[2]/div/input"; // Nơi sinh
const STUDENT_IDENTITY_NUMBER_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[4]/div[1]/input"; // Số CMND/CCCD
const STUDENT_IDENTITY_ISSUED_PLACE_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[4]/div[3]/input"; // Nơi cấp CMND/CCCD
const STUDENT_NATIONALITY_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[5]/div[1]/ng-select/div/div/div[2]/span[2]"; // Quốc tịch
const STUDENT_ETHNICITY_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[5]/div[2]/ng-select/div/div/div[2]/span[2]"; // Dân tộc
const STUDENT_BANK_ACCOUNT_NUMBER_XPATH =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[1]/app-lylich-main/div/mat-horizontal-stepper/div/div[2]/div[1]/app-tt-lylich/div[2]/div[7]/div[3]/input"; // Số tài khoản ngân hàng

const TIMEOUT = 10000;

export async function fetchStudentInfoOnWeb(page: Page): Promise<User> {
  try {
    await page.waitForSelector(`xpath=${LINK_BUTTON_THONG_TIN_SINH_VIEN}`, {
      timeout: TIMEOUT,
    });
    await page.click(`xpath=${LINK_BUTTON_THONG_TIN_SINH_VIEN}`);

    await page.waitForSelector(`xpath=${STUDENT_CODE_XPATH}`, {
      timeout: TIMEOUT,
      state: "visible",
    });

    const [
      studentCode,
      name,
      dateOfBirth,
      gender,
      status,
      className,
      faculty,
      educationProgram,
      major,
      academicYear,
    ] = await Promise.all([
      page.textContent(`xpath=${STUDENT_CODE_XPATH}`).catch(() => null),
      page.textContent(`xpath=${STUDENT_NAME_XPATH}`).catch(() => null),
      page
        .textContent(`xpath=${STUDENT_DATE_OF_BIRTH_XPATH}`)
        .catch(() => null),
      page.textContent(`xpath=${STUDENT_GENDER_XPATH}`).catch(() => null),
      page.textContent(`xpath=${STUDENT_STATUS_XPATH}`).catch(() => null),
      page.textContent(`xpath=${STUDENT_CLASS_NAME_XPATH}`).catch(() => null),
      page.textContent(`xpath=${STUDENT_FACULTY_XPATH}`).catch(() => null),
      page
        .textContent(`xpath=${STUDENT_EDUCATION_PROGRAM_XPATH}`)
        .catch(() => null),
      page.textContent(`xpath=${STUDENT_MAJOR_XPATH}`).catch(() => null),
      page
        .textContent(`xpath=${STUDENT_ACADEMIC_YEAR_XPATH}`)
        .catch(() => null),
    ]);

    const [
      phoneNumber,
      eduEmail,
      personalEmail,
      placeOfBirth,
      identityNumber,
      identityIssuedPlace,
      bankAccountNumber,
    ] = await Promise.all([
      page.inputValue(`xpath=${STUDENT_PHONE_NUMBER_XPATH}`).catch(() => ""),
      page.inputValue(`xpath=${STUDENT_EDU_EMAIL_XPATH}`).catch(() => ""),
      page.inputValue(`xpath=${STUDENT_PERSONAL_EMAIL_XPATH}`).catch(() => ""),
      page.inputValue(`xpath=${STUDENT_PLACE_OF_BIRTH_XPATH}`).catch(() => ""),
      page.inputValue(`xpath=${STUDENT_IDENTITY_NUMBER_XPATH}`).catch(() => ""),
      page
        .inputValue(`xpath=${STUDENT_IDENTITY_ISSUED_PLACE_XPATH}`)
        .catch(() => ""),
      page
        .inputValue(`xpath=${STUDENT_BANK_ACCOUNT_NUMBER_XPATH}`)
        .catch(() => ""),
    ]);

    const [nationality, ethnicity] = await Promise.all([
      page.innerText(`xpath=${STUDENT_NATIONALITY_XPATH}`).catch(() => ""),
      page.innerText(`xpath=${STUDENT_ETHNICITY_XPATH}`).catch(() => ""),
    ]);

    return {
      studentCode: studentCode?.trim() || "Đang cập nhật",
      name: name?.trim() || "Đang cập nhật",
      dateOfBirth: dateOfBirth?.trim() || "Đang cập nhật",
      gender: gender?.trim() || "Đang cập nhật",
      status: status?.trim() || "Đang cập nhật",
      className: className?.trim() || "Đang cập nhật",
      faculty: faculty?.trim() || "Đang cập nhật",
      educationProgram: educationProgram?.trim() || "Đang cập nhật",
      major: major?.trim() || "Đang cập nhật",
      academicYear: academicYear?.trim() || "Đang cập nhật",
      phoneNumber: phoneNumber?.trim() || "Đang cập nhật",
      eduEmail: eduEmail?.trim() || "Đang cập nhật",
      personalEmail: personalEmail?.trim() || "Đang cập nhật",
      placeOfBirth: placeOfBirth?.trim() || "Đang cập nhật",
      identityNumber: identityNumber?.trim() || "Đang cập nhật",
      identityIssuedPlace: identityIssuedPlace?.trim() || "Đang cập nhật",
      nationality: nationality?.trim() || "Đang cập nhật",
      ethnicity: ethnicity?.trim() || "Đang cập nhật",
      bankAccountNumber: bankAccountNumber?.trim() || "Đang cập nhật",
      password: "Đang cập nhật",
    };
  } catch {
    throw new Error("Không thể lấy thông tin sinh viên");
  }
}
