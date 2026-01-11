import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-linear-to-b from-[#9551c9]/20 to-[#9551c9]/50 text-gray-800">
      <div className="mx-auto max-w-7xl px-6  py-8 flex flex-col lg:flex-row items-center justify-between text-center gap-6">
        {/* Privacy policy link */}
        <Link
          href={{ pathname: "/policy" }}
          className="font-semibold transition-colors duration-200 hover:text-[#9551c9] p-2 "
        >
          {t("policy")}
        </Link>

        {/* Text and link to creator */}
        <div className="text-base flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-3">
          <p className="text-gray-800">&copy; {t("copyright")}.</p>
          <a
            href={t("create_link")}
            className="font-semibold transition-colors duration-200 hover:text-[#9551c9] p-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("create")}
          >
            {t("create")}.
          </a>
        </div>
      </div>
    </footer>
  );
}
