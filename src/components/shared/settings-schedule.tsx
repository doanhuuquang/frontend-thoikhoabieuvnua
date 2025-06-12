"use client";

// import { useSchedule } from "@/hooks/use-schedule";
// import { useState } from "react";

export default function SettingsSchedule() {
  // const { semesters, scheduleLoading, refreshSemesters } = useSchedule();
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async () => {
  //   setError(null);

  //   try {
  //     await refreshSemesters(password);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setError(error.message);
  //     } else if (typeof error === "string") {
  //       setError(error);
  //     } else {
  //       setError("Đã xảy ra lỗi không xác định");
  //     }
  //   }
  // };

  return (
    <div>
      {/* {!semesters && (
        <>
          <p className="text-muted-foreground mb-2">
            Bạn chưa có dữ liệu thời khóa biểu!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Tải thời khóa biểu</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tải danh sách kỳ học</DialogTitle>
                <DialogDescription>
                  Vì lí do bảo mật, bạn cần nhập mật khẩu để tải thời khóa biểu.
                </DialogDescription>
              </DialogHeader>

              {error && (
                <Alert variant="destructive" className="mb-3 bg-red-500/10 ">
                  <AlertTitle>
                    <span>Oops!</span>
                  </AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={loading}>
                      Hủy
                    </Button>
                  </DialogClose>

                  <Button type="submit" disabled={loading || !password.trim()}>
                    {loading && (
                      <span className="ml-2 animate-spin">
                        <Loader2 />
                      </span>
                    )}
                    {loading ? "Đang tải..." : "Bắt đầu thiết lập"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )} */}
    </div>
  );
}
