/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {
  useState,
  useTransition,
  useRef,
  useEffect,
  ReactElement,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  defaultValue: string;
  label: string;
  children: ReactNode;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);

    // Handle locale change in URL
    startTransition(() => {
      const currentLocaleRegex = /^\/[a-z]{2}/;
      const newPath = pathname.replace(currentLocaleRegex, `/${value}`);
      router.replace(newPath);
    });
  };

  // Закрытие при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="inline-block relative" ref={dropdownRef}>
      <p className="sr-only">{label}</p>

      {/* Custom select button */}
      <div
        tabIndex={0} // добавляем tabIndex
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="relative z-10 cursor-pointer bg-white border border-gray-300 rounded-full shadow-md text-black-400 w-12 h-12 text-center flex justify-center items-center transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        <span className="font-semibold text-base transition-colors duration-200 hover:text-[#9551c9] focus:text-[#9551c9]">
          {selectedOption}
        </span>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          role="listbox" // добавляем роль listbox для меню
          className="absolute mt-[-46px] pt-12 w-12 bg-white border border-gray-300 rounded-full shadow-lg"
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<{ value: string }>(child)) {
              return (
                <li
                  role="option" // добавляем роль option для каждого элемента
                  tabIndex={0} // добавляем tabIndex, чтобы элементы были доступны для табуляции
                  aria-selected={selectedOption === child.props.value} // добавляем атрибут aria-selected
                  className="relative py-2 mx-auto cursor-pointer text-center rounded-full transition-all duration-300 text-gray-400
                           hover:bg-[#9551c9]/20 focus:bg-[#9551c9]/20 focus:text-black  hover:text-black"
                  onClick={() => handleSelect(child.props.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(child.props.value);
                    }
                  }}
                >
                  {child}
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </div>
  );
}
