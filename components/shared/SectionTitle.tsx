import React from "react";

interface SectionTitleProps {
  text: string;
  hasLineBreak?: boolean;
  lineWidth?: "sm" | "md" | "lg" | "full";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  text,
  hasLineBreak = false,
  lineWidth = "md",
}) => {
  const getLineWidthClass = () => {
    switch (lineWidth) {
      case "sm":
        return "w-24 md:w-32";
      case "md":
        return "w-32 md:w-48";
      case "lg":
        return "w-40 md:w-64";
      case "full":
        return "w-full max-w-md";
      default:
        return "w-32 md:w-48";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#4F0187] text-center mb-1 md:mb-2">
        {hasLineBreak
          ? text.split(" ").map((word, index, array) => {
              const midpoint = Math.ceil(array.length / 2);
              return (
                <React.Fragment key={index}>
                  {word}
                  {index === midpoint - 1 && index !== array.length - 1 && (
                    <br />
                  )}
                  {index !== midpoint - 1 && index !== array.length - 1 && " "}
                </React.Fragment>
              );
            })
          : text}
      </h2>
      <div className={`relative h-3 md:h-4 mt-1 ${getLineWidthClass()}`}>
        <svg className="w-full h-full" viewBox="0 0 120 12">
          <path
            d="M10,8 Q60,1 110,8"
            fill="none"
            stroke="rgb(45, 212, 191)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SectionTitle;
