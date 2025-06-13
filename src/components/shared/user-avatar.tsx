import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function UserAvatar({
  userName,
  className,
}: {
  userName?: string;
  className?: string;
}) {
  return (
    <Avatar
      className={cn(
        className,
        "mr-2 overflow-hidden  bg-accent rounded-full flex items-center justify-center"
      )}
    >
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>
        {userName?.trim().split(" ").filter(Boolean).at(-1)?.[0] || "?"}
      </AvatarFallback>
    </Avatar>
  );
}
