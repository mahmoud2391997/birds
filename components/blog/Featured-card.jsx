import { Play } from "lucide-react";
import Image from "next/image";

export function FeaturedCard({
  title,
  subtitle,
  status,
  image,
  gradient,
  hasPlayButton,
}) {
  return (
    <div className="relative rounded-xl overflow-hidden group cursor-pointer transition-transform hover:scale-105">
      {image ? (
        <div className="relative h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        <div className={`h-48 bg-gradient-to-br ${gradient}`} />
      )}

      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <div>
          <p className="text-sm opacity-90 mb-2">{subtitle}</p>
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
        </div>

        <div className="flex items-end justify-between">
          {status && <p className="text-sm opacity-90">{status}</p>}
          {hasPlayButton && (
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-5 h-5 ml-1" fill="white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
