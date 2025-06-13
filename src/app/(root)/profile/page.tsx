import UserProfileSection from "@/components/shared/section-user-profile";

export default function SettingProfilePage() {
  return (
    <div className="p-3 w-full max-w-7xl m-auto space-y-2">
      <h4 className="font-semibold text-lg">Thông tin cá nhân</h4>
      <div className="bg-background dark:bg-sidebar p-3 rounded-md">
        <UserProfileSection />
      </div>
    </div>
  );
}
