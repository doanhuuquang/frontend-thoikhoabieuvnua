import { UserData } from "@/data/UserData";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

const getRandomBackgroundColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

export default function UserAvatar({ className }: { className?: string }) {
  const userName = UserData.name;
  const firstLetterOfName = userName?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={` ${getRandomBackgroundColor()} rounded-full flex items-center justify-center ${className}`}
    >
      <h1 className="font-bold text-[1.2rem]">{firstLetterOfName}</h1>
    </div>
  );
}
