import LogoutButton from "@/components/shared/logout";

export default function SettingProfilePage() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Cài đặt chung</h1>
      <p className="text-secondary-foreground">
        Trang thông tin cá nhân sẽ được cập nhật trong tương lai.
        <LogoutButton />
      </p>
    </div>
  );
}
