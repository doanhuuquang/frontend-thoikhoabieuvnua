import Image from "next/image";

export default function WeatherBlock({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-background dark:bg-accent rounded-md ${className}`}
    >
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/images/weather/sunny.svg"
          alt="Weather Icon"
          width={50}
          height={50}
        />
        <div>
          <h2 className="text-xl font-semibold">Nắng</h2>
          <p className="text-gray-500">25°C</p>
        </div>
      </div>
      <h1>hello</h1>
      <div className="text-right">
        <p className="text-sm text-gray-500">Humidity: 60%</p>
        <p className="text-sm text-gray-500">Wind: 10 km/h</p>
      </div>
    </div>
  );
}
