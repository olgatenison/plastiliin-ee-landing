import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("PrivacyPolicyPage");

  const allTerms = [
    "Account",
    "Affiliate",
    "Company",
    "Cookies",
    "Country",
    "Device",
    "Personal Data",
    "Service",
    "Service Provider",
    "Usage Data",
    "Website",
    "You",
  ];

  const half = Math.ceil(allTerms.length / 2);
  const left = allTerms.slice(0, half);
  const right = allTerms.slice(half);

  return (
    <div className="bg-gradient-to-b from-white via-white to-[#9551c9]/20 pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <main
          className="mx-auto text-gray-800 space-y-12"
          id="privacy-policy-content"
        >
          {/* Page title */}
          <div className="space-y-2 text-center lg:text-left">
            <p className="text-[#9551c9] text-lg/7 font-normal uppercase">
              {t("subtitle")}
            </p>
            <h1 className="mt-2 font-bold tracking-tight text-gray-900 text-3xl sm:text-6xl text-section__value pb-4 max-w-xl">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500 pb-6">{t("last_updated")}</p>
          </div>

          {/* Intro & Interpretation */}
          <section
            className="lg:max-w-xl pb-10"
            aria-labelledby="intro-section"
          >
            <div className="pb-4" id="intro-section">
              <p>{t("intro_text")}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                {t("interpretation_title")}
              </h2>
              <p>{t("interpretation_text")}</p>
            </div>
          </section>

          {/* Definitions */}
          <section
            className="space-y-4 pb-12"
            aria-labelledby="definitions-section"
          >
            <h2 className="text-2xl font-semibold" id="definitions-section">
              {t("definitions_title")}
            </h2>
            <p>{t("definitions_intro")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
              <ul className="space-y-4 lg:max-w-md">
                {left.map((term) => (
                  <li key={term}>
                    <p className="font-semibold pb-3">{term}</p>
                    <p>{t(`definitions.${term}.definition`)}</p>
                  </li>
                ))}
              </ul>
              <ul className="space-y-4 lg:max-w-md">
                {right.map((term) => (
                  <li key={term}>
                    <p className="font-semibold">{term}</p>
                    <p>{t(`definitions.${term}.definition`)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section
            className="space-y-2 lg:max-w-xl text-center lg:text-left"
            aria-labelledby="contact-section"
          >
            <h2 className="text-2xl font-semibold" id="contact-section">
              {t("contact.title")}
            </h2>
            <p>{t("contact.text")}</p>

            <a
              href={`mailto:${t("contact.email")}`}
              className="text-[#9551c9] font-semibold hover:text-black focus:outline-none focus:ring-2 focus:ring-black p-1"
              aria-label={`Email: ${t("contact.email")}`}
            >
              {t("contact.email")}
            </a>
          </section>

          {/* Back button */}
          <div>
            <Link
              className="mt-8 block rounded-md bg-[#9551c9] px-24 py-2 text-center text-lg/6 font-semibold text-white shadow-sm hover:bg-[#8646b7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:outline-black lg:max-w-fit"
              href={{ pathname: "/" }}
              aria-label="Go back to homepage"
            >
              {t("button_text")}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
