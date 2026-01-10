"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import { Autoplay, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";

export default function Programs() {
  const t = useTranslations("Programs");

  const sections = ["1", "2", "3", "4", "5", "6"].map((i) => ({
    index: Number(i) - 1,
    id: t(`section${i}_id`),
    title: t(`section${i}_title`),
    description: t(`section${i}_description`),
    buttonText: t(`section${i}_button_text`),
    buttonLink: t(`section${i}_button_link`),
    bgColor: t(`section${i}_bg_color`),
    bgImg: t(`section${i}_bg_img`),
    bgImgS: t(`section${i}_bg_img_small`),
    icon: t(`section${i}_icon`),
    iconActive: t(`section${i}_icon_active`),
  }));

  const [activeSection, setActiveSection] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );

  const handleTabClick = (index: number) => {
    setActiveSection(index);
    swiperInstance?.slideTo(index);
  };

  return (
    <section
      className="bg-linear-to-b from-[#f7c44b] to-sky-400"
      aria-label="Programs section"
    >
      {/* Tabs rendered once */}
      <div className="max-w-7xl mx-auto pt-8 px-6 lg:px-8 lg:-mb-24 relative z-20 ">
        <div
          className="flex gap-4 flex-wrap items-center mb-6 sm:mb-14 lg:justify-start justify-center"
          role="tablist"
          aria-label="Program navigation"
        >
          {sections.map((s, j) => {
            const isActive = activeSection === j;

            const handleKeyDown = (
              e: React.KeyboardEvent<HTMLButtonElement>
            ) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const newIndex =
                  e.key === "ArrowRight"
                    ? (j + 1) % sections.length
                    : (j - 1 + sections.length) % sections.length;
                setActiveSection(newIndex);
                swiperInstance?.slideTo(newIndex);
                document
                  .getElementById(`tab-${sections[newIndex].id}`)
                  ?.focus();
              }
            };

            return (
              <button
                key={s.id}
                id={`tab-${s.id}`}
                aria-controls={`panel-${s.id}`}
                onClick={() => handleTabClick(j)}
                onKeyDown={handleKeyDown}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                aria-label={s.title}
                className={`relative p-2 rounded-full shadow-lg focus-visible:outline-black ${
                  isActive
                    ? "border-2 border-white bg-opacity-20 bg-white"
                    : "bg-white hover:bg-opacity-80"
                }`}
                style={{
                  width: isActive ? "100px" : "80px",
                  height: isActive ? "100px" : "80px",
                  overflow: "visible",
                }}
              >
                <Image
                  src={isActive ? s.iconActive : s.icon}
                  alt=""
                  aria-hidden="true"
                  width={isActive ? 100 : 80}
                  height={isActive ? 100 : 80}
                  className={`transition-all ${
                    isActive ? "w-25 h-25" : "w-26 h-26"
                  }`}
                  style={{
                    position: isActive ? "absolute" : "relative",
                    zIndex: isActive ? 10 : 1,
                    objectFit: "contain",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Slides */}
      <Swiper
        modules={[Autoplay, Keyboard, Mousewheel]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        keyboard={{ enabled: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveSection(swiper.realIndex)}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        role="region"
        aria-label="Programs carousel"
      >
        {sections.map((s) => (
          <SwiperSlide key={s.id}>
            <div
              id={`panel-${s.id}`}
              aria-labelledby={`tab-${s.id}`}
              tabIndex={-1}
              role="tabpanel"
              className="max-w-7xl mx-auto  lg:pt-36"
              style={{
                background: `radial-gradient(ellipse at center, ${s.bgColor}30%, rgba(0,0,0,0) 70%)`,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-12 px-6 lg:px-8 ">
                {/* Text */}
                <div className=" max-w-2xl lg:max-w-xl xl:max-w-2xl lg:pr-6 mx-auto lg:mx-0">
                  <h2 className="text-3xl sm:text-6xl font-semibold tracking-tight mb-10 text-white">
                    {s.title}
                  </h2>
                  <p
                    className="text-base/8 sm:text-lg/8 lg:text-xl/8 font-normal text-white pb-12 text-justify"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {s.description}
                  </p>
                  <a
                    href={s.buttonLink}
                    className="text-lg font-semibold text-white py-3 px-6 text-center block rounded-md w-full bg-white/20 backdrop-blur-md shadow-md transition duration-300 ease-in-out hover:bg-white/30 hover:shadow-lg focus-visible:outline-black"
                    aria-label={`More about ${s.title}`}
                  >
                    {s.buttonText}
                  </a>
                </div>

                {/* Image */}
                <div className="relative w-full max-w-2xl h-62.5 sm:h-112.5 lg:w-112.5 lg:h-150 lg:max-w-2xl mx-auto flex justify-center items-center mt-0 lg:-mt-32">
                  <div
                    className="absolute inset-0 bg-cover bg-center lg:hidden rounded-lg shadow-lg "
                    aria-hidden="true"
                    style={{
                      backgroundImage: s.bgImgS.startsWith("/")
                        ? `url(${s.bgImgS})`
                        : `url(/${s.bgImgS})`,
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center hidden lg:block rounded-lg "
                    aria-hidden="true"
                    style={{
                      backgroundImage: s.bgImg.startsWith("/")
                        ? `url(${s.bgImg})`
                        : `url(/${s.bgImg})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
