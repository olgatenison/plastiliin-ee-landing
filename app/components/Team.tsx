import { useTranslations } from "next-intl";
import Image from "next/image";
export default function Team() {
  const t = useTranslations("Team");

  return (
    <div
      className="bg-gradient-to-b to-white from-sky-400 "
      role="region"
      aria-labelledby="team-title"
    >
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 lg:pt-24 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2
            id="team-title"
            className="text-center font-semibold text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white via-sky-100 to-sky-400 pb-4"
          >
            {t("title")}
          </h2>
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Cloud decor */}
          <div aria-hidden="true">
            <Image
              src="/cloud.webp"
              alt="decor"
              width={250}
              height={250}
              className="absolute -left-3 lg:left-12 top-[400px] lg:top-2 z-10 hidden md:block transition-transform duration-300 hover:scale-105 hover:rotate-2"
            />
            <Image
              src="/cloud.webp"
              alt="decor"
              width={200}
              height={200}
              className="absolute md:top-[600px] xl:top-[80px] md:right-12 xl:right-64 z-10 hidden md:block transition-transform duration-300 hover:scale-105 hover:rotate-2"
            />
            <Image
              src="/cloud.webp"
              alt="decor"
              width={120}
              height={120}
              className="absolute -top-10 right-20 z-10 transition-transform duration-300 hover:scale-105 hover:rotate-2"
            />
          </div>

          {/* Team content */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center xl:flex xl:items-end lg:flex-row gap-8 lg:justify-between mx-auto lg:max-w-2xl xl:max-w-7xl">
            {/* Team image */}
            <div className="order-1 lg:col-span-2 xl:order-2 flex justify-center">
              <Image
                src="/team-2-min.webp"
                alt="Team photo"
                width={672}
                height={800}
                className="rounded-lg shadow-xl object-cover"
              />
            </div>

            {/* Olga 1 */}
            <div className="lg:max-w-[350px] lg:text-center mx-auto order-2 lg:order-1 bg-white p-6 shadow-xl lg:shadow-none lg:bg-transparent ring-1 sm:ring-0 ring-gray-900/10 sm:p-10 rounded-md max-w-2xl lg:pb-0">
              <h3 className="text-3xl font-bold py-4 text-[#3192cf]">
                {t("1_member_name")}
              </h3>
              <p className="text-base font-normal text-gray-800 pb-10 lg:pb-4">
                {t("1_member_description")}
              </p>
              <h4 className="text-gray-800 pt-2 border-t border-gray-900/60">
                {t("1_member_subtitle")}
              </h4>
              <p className="text-base font-semibold text-gray-900">
                {t("1_member_ideea")}
              </p>
            </div>

            {/* Olga 2 */}
            <div className="lg:max-w-[350px] lg:text-center mx-auto order-3 lg:order-3 bg-white p-6 shadow-xl lg:shadow-none lg:bg-transparent ring-1 ring-gray-900/10 sm:p-10 rounded-md sm:ring-0 max-w-2xl lg:pb-0">
              <h3 className="text-3xl font-bold py-4 text-[#3192cf]">
                {t("2_member_name")}
              </h3>
              <p className="text-base font-normal text-gray-800 pb-10 lg:pb-4">
                {t("2_member_description")}
              </p>
              <h4 className="text-gray-800 pt-2 border-t border-gray-900/60">
                {t("2_member_subtitle")}
              </h4>
              <p className="text-base font-semibold text-gray-900">
                {t("2_member_ideea")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
