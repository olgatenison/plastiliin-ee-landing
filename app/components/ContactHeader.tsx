"use client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function ContactHeader() {
  const t = useTranslations("ContactHeader");
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (pathname === "/") {
      // Ми вже на головній — скролимо
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Не на головній — переходимо на головну з якорем
      router.push("/#contact");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="font-semibold text-base mr-5 transition-colors duration-200 hover:text-[#9551c9] focus:text-[#9551c9] focus-visible:outline-black pl-2 pr-2"
    >
      {t("title")}
    </button>
  );
}
