"use client";

import StudentCard from "@/components/shared/student-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";

function UserProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm text-end">{value}</p>
    </div>
  );
}

export default function UserProfileSection() {
  const { user, loading } = useUser();

  return (
    <div className="w-full space-y-1">
      <StudentCard className="w-full" />
      <div className="w-full flex flex-wrap gap-3 space-y-10 p-3 bg-background dark:bg-sidebar rounded-lg">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="w-50 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
          </div>
        ) : (
          <div className="space-y-2 grow">
            <p className="font-medium text-primary mb-2">Thông tin đào tạo</p>

            <UserProfileRow label="Ngày sinh" value={user?.dateOfBirth ?? ""} />
            <UserProfileRow label="Giới tính" value={user?.gender ?? ""} />
            <UserProfileRow label="Trạng thái" value={user?.status ?? ""} />
            <UserProfileRow label="Lớp" value={user?.className ?? ""} />
            <UserProfileRow label="Khoa" value={user?.faculty ?? ""} />
            <UserProfileRow
              label="Hệ đào tạo"
              value={user?.educationProgram ?? ""}
            />
            <UserProfileRow label="Ngành học" value={user?.major ?? ""} />
            <UserProfileRow
              label="Niên khóa"
              value={user?.academicYear ?? ""}
            />
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="w-50 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
            <Skeleton className="w-25 h-5 " />
          </div>
        ) : (
          <div className="space-y-2 grow">
            <p className="font-medium text-primary mb-2">Thông tin khác</p>

            <UserProfileRow
              label="Điện thoại"
              value={user?.phoneNumber ?? ""}
            />
            <UserProfileRow
              label="Email đào tạo"
              value={user?.eduEmail ?? ""}
            />
            <UserProfileRow
              label="Email cá nhân"
              value={user?.personalEmail ?? ""}
            />
            <UserProfileRow label="Nơi sinh" value={user?.placeOfBirth ?? ""} />
            <UserProfileRow
              label="Số CCCD"
              value={user?.identityNumber ?? ""}
            />
            <UserProfileRow
              label="Nơi cấp CCCD"
              value={user?.identityIssuedPlace ?? ""}
            />
            <UserProfileRow label="Quốc tịch" value={user?.nationality ?? ""} />
            <UserProfileRow label="Dân tộc" value={user?.ethnicity ?? ""} />
            <UserProfileRow
              label="Số tài khoản ngân hàng"
              value={user?.bankAccountNumber ?? ""}
            />
          </div>
        )}
      </div>
    </div>
  );
}
