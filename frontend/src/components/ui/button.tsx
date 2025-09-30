import React, { useRef, useState } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const ButtonAnimatedGradient = ({
  children = "Click Me",
  className = "",
  ...rest
}: Props) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el || isFocused) return;
    const rect = el.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // center the highlight when focusing via keyboard
    setIsFocused(true);
    setPosition({ x: rect.width / 2, y: rect.height / 2 });
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseMove(e);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!isFocused) setOpacity(0);
  };

  return (
    <button
      ref={btnRef}
      {...rest}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (typeof rest.onMouseMove === "function") rest.onMouseMove(e);
      }}
      onFocus={(e) => {
        handleFocus();
        if (typeof rest.onFocus === "function") rest.onFocus(e);
      }}
      onBlur={(e) => {
        handleBlur();
        if (typeof rest.onBlur === "function") rest.onBlur(e);
      }}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
        if (typeof rest.onMouseEnter === "function") rest.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave();
        if (typeof rest.onMouseLeave === "function") rest.onMouseLeave(e);
      }}
      className={`relative inline-flex w-fit mx-auto h-12 items-center justify-center overflow-hidden rounded-full border-2 dark:border-[#656fe2] border-[#c0c6fc] bg-gradient-to-r dark:from-[#5129a2] dark:to-[#710cb9] from-[#9ba3fdfd] to-[#3d5af1] px-6 font-medium text-white shadow-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer ${className}`}
    >
      <div
        aria-hidden
        className="pointer-cursor absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, #656fe288, #00000026)`,
        }}
      />
      <span className="relative z-20">{children}</span>
    </button>
  );
};

export default ButtonAnimatedGradient;
