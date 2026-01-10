import { CheckIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Price() {
  const t = useTranslations("Price");

  const tiers = [
    {
      id: "tier-hobby",
      name: t("card_1_name"),
      priceMonthly: t("card_1_priceMonthly"),
      priceTime: t("card_1_priceTime"),
      description: t("card_1_description"),
      features: [
        t("card_1_feature_1"),
        t("card_1_feature_2"),
        t("card_1_feature_3"),
        t("card_1_feature_4"),
      ],
      href: t("card_1_href"),
      btnTitle: t("card_1_buttomn_title"),
    },
    {
      id: "tier-team",
      name: t("card_2_name"),
      priceMonthly: t("card_2_priceMonthly"),
      priceTime: t("card_2_priceTime"),
      description: t("card_2_description"),
      features: [
        t("card_2_feature_1"),
        t("card_2_feature_2"),
        t("card_2_feature_3"),
        t("card_2_feature_4"),
        t("card_2_feature_5"),
      ],
      href: t("card_2_href"),
      btnTitle: t("card_2_buttomn_title"),
    },
  ];

  return (
    <div className="overflow-hidden bg-[#fac853]">
      {/* Рендерим тайтл */}
      <div className="mx-auto max-w-7xl px-6 pb-96 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-lg/7 font-normal text-white uppercase">
            {t("subtitle")}
          </h2>
          <p className="mt-2 text-balance text-4xl font-semibold text-white sm:text-6xl">
            {t("title")}
          </p>
        </div>
      </div>

      <div className="flow-root bg-gradient-to-b to-white from-[#fac853] pb-24 sm:pb-32">
        <div className="-mt-80 mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {/* Рендерим карточки */}
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between bg-gradient-to-b from-white to-white/50 backdrop-blur-md p-8 shadow-xl ring-1 ring-gray-500/5 sm:p-10 rounded-md z-10"
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="text-base/7 font-semibold text-[#9551c9]"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-semibold tracking-tight text-gray-900">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-base/7 font-semibold text-gray-800">
                        {tier.priceTime}
                      </span>
                    </div>
                    <p className="mt-6 text-base/7 text-gray-800 pr-0 lg:pr-4">
                      {tier.description}
                    </p>
                    <ul className="mt-10 space-y-4 text-base/6 text-gray-800">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            aria-hidden="true"
                            className="h-6 w-5 flex-none text-[#9551c9] stroke-[#9551c9]"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="button"
                    className="mt-8 block rounded-md bg-[#9551c9] px-3.5 py-2 text-center text-lg/6 font-semibold text-white shadow-sm hover:bg-[#8646b7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:outline-black "
                  >
                    {tier.btnTitle}
                  </a>
                </div>
              ))}
            </div>

            {/* Рендерим экстра блок */}
            <div className="ring-1 ring-gray-900/10 lg:gap-y-10 mx-auto bg-white/50 backdrop-blur-md max-w-md lg:max-w-4xl p-10 mt-12 rounded-md shadow-xl">
              <div className="flex flex-col items-center">
                <h3 className="text-xl text-[#9551c9] uppercase font-semibold text-center">
                  {t("extra_card_subtitle")}
                </h3>
                <p className="mt-1 text-base/7 text-gray-600 text-center max-w-2xl">
                  {t("extra_card_description")}
                </p>
              </div>
            </div>
          </div>

          {/* Flower 1 */}
          <div
            className="absolute -bottom-20 lg:-bottom-14 left-[50%] lg:left-60"
            aria-hidden="true"
          >
            <Image
              src="/flower.webp"
              alt=""
              width={120}
              height={120}
              className="rotate-2 transition-all duration-500 ease-out hover:w-[125px] hover:scale-105 hover:rotate-6"
            />
          </div>

          {/* Flower 2 */}
          <div
            className="absolute -top-10 right-12 sm:top-48 sm:right-20 z-30"
            aria-hidden="true"
          >
            <Image
              src="/flower.webp"
              alt=""
              width={200}
              height={200}
              className="transition-all duration-500 ease-out rotate-0 w-[120px] sm:w-[200px] hover:w-[210px] hover:scale-105 hover:rotate-8"
            />
          </div>

          {/* Flower 3 */}
          <div
            className="absolute top-6 left-8 hidden sm:block"
            aria-hidden="true"
          >
            <Image
              src="/flower.webp"
              alt=""
              width={250}
              height={250}
              className="rotate-2 transition-all duration-500 ease-out hover:w-[260px] hover:scale-105 hover:-rotate-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
