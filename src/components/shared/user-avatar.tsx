import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2 } from "lucide-react";

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
        "mr-2 overflow-hidden bg-accent flex items-center justify-center"
      )}
    >
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="w-full h-full object-center object-cover"
      />
      <AvatarFallback>
        {userName?.trim().split(" ").filter(Boolean).at(-1)?.[0] || (
          <Loader2 className="animate-spin" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
