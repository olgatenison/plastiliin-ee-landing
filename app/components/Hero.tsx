"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <div
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#8d67be] via-[#f5bb32] to-white"
      role="banner"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        {/* Desktop (md and up) */}
        <div className="hidden md:block w-full max-w-7xl h-full relative">
          <Image
            src="/hero/hero-bg.webp"
            alt=""
            fill
            priority
            className="object-cover"
            aria-hidden="true"
            sizes="(min-width: 768px) 100vw"
          />
        </div>

        {/* Small mobile screens (< 640px) */}
        <div className="block sm:hidden w-full h-full relative">
          <Image
            src="/hero/third-bg.webp"
            alt=""
            fill
            priority
            className="object-cover object-bottom"
            aria-hidden="true"
            sizes="100vw"
          />
        </div>

        {/* Mobile screens from sm (≥ 640px) to md (< 768px) */}
        <div className="hidden sm:block md:hidden w-full h-full relative">
          <Image
            src="/hero/second-bg.webp"
            alt=""
            fill
            loading="lazy"
            className="object-cover object-bottom"
            aria-hidden="true"
            sizes="100vw"
          />
        </div>
      </div>
      <h1 className="hidden">{t("hidden")}</h1>
      {/* text */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative py-36">
        <h3 className="text-gray-800 font-medium text-[16px] lg:text-[17px] text-center pb-2">
          {t("subtitle")}
        </h3>

        <div>
          <h2
            className="font-bold text-white uppercase text-center text-5xl lg:text-7xl"
            aria-label={t("title_all")}
          >
            {t("title_1")}
          </h2>

          <div className="flex-col sm:flex-row flex justify-center">
            <span
              className="block font-bold text-white uppercase text-center text-5xl lg:text-7xl pb-3"
              aria-hidden="true"
            >
              {t("title_2")}
            </span>
            <div className="ml-0 sm:ml-3 ">
              <span
                className="block font-light text-white uppercase text-2xl sm:text-[14px] lg:text-2xl pt-1 text-center sm:text-left"
                aria-hidden="true"
              >
                {t("title_3")}
              </span>
              <span
                className="block font-light text-white uppercase text-2xl sm:text-[14px]  lg:text-2xl pb-0 sm:pb-3 text-center sm:text-left"
                aria-hidden="true"
              >
                {t("title_4")}
              </span>
            </div>
          </div>
        </div>

        {/* button */}
        <div className="pb-[80px] sm:pb-[230px] lg:pb-[330px] pt-4">
          <a
            href={t("link1_href")}
            target="_blank"
            rel="noopener noreferrer"
            className=" focus-visible:outline focus-visible:outline-2 focus-visible:outline-black text-base lg:text-lg font-semibold text-white py-3 px-6 text-center block rounded-md w-fit mx-auto bg-white/20 backdrop-blur-md shadow-md transition duration-300 ease-in-out hover:bg-white/30 hover:shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
          >
            {t("link1_name")}
          </a>
        </div>

        {/* items decor */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Decor */}
          <div className="hidden md:block absolute left-2 md:left-2 bottom-8 md:bottom-14 w-32 lg:w-44 aspect-[1/1]">
            <div className="relative w-full h-full">
              <Image
                src="/hero/left-decor.webp"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          </div>

          {/* Center Decor */}
          {/* <div className="hidden md:block absolute left-1/4 top-40 lg:top-40 lg:w-12 w-8 aspect-[1/1]">
            <div className="relative w-full h-full">
              <Image
                src="/hero/center-decor.webp"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          </div> */}

          {/* Right Decor */}
          <div className="hidden md:block absolute right-2 lg:right-0 top-36 lg:top-52 w-44 lg:w-64 aspect-[1/1]">
            <div className="relative w-full h-full">
              <Image
                src="/hero/right-decor.webp"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
