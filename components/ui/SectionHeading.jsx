import AnimatedText from "@/components/ui/AnimatedText";

export default function SectionHeading({
  title,
  subtitle,
  center = false,
  className = "",
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""} ${className}`}>
      <AnimatedText
        text={title}
        tag="h2"
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
      />
      {subtitle && (
        <AnimatedText
          text={subtitle}
          tag="p"
          className="text-lg text-gray-400 "
          delay={0.2}
        />
      )}
    </div>
  );
}
