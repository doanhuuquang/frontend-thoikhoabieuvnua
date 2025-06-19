import UserProfileSection from "@/components/shared/section-user-profile";

export default function SettingProfilePage() {
  return (
    <div className="w-full p-1 max-w-7xl m-auto">
      <div className="lg:w-[50%] w-full flex flex-wrap">
        <UserProfileSection />
      </div>
    </div>
  );
}
