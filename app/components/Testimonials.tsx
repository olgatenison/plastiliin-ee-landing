"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Testimonial = {
  description: string;
  authorName: string;
  authorStatus: string;
  bgColor: string;
};

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  const testimonials: Testimonial[] = Array.from({ length: 8 }, (_, i) => ({
    description: t(`testimonial${i + 1}_description`),
    authorName: t(`testimonial${i + 1}_author_name`),
    authorStatus: t(`testimonial${i + 1}_author_status`),
    bgColor: t(`testimonial${i + 1}_bg_color`),
  }));

  const columnsGroups: Testimonial[][] = [[], [], [], []];
  testimonials.forEach((testimonial, index) => {
    columnsGroups[index % 4].push(testimonial);
  });

  return (
    <section
      className="bg-gradient-to-b from-white via-pink-300 to-[#fac853] pb-24 pt-24 "
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="testimonials-title"
            className="text-base sm:text-lg font-normal uppercase text-pink-400"
          >
            {t("section_title")}
          </h2>
          <p className="font-bold tracking-tight text-pink-400 text-3xl sm:text-6xl">
            {t("title")}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-8 text-gray-900 sm:mt-12 xl:mx-0 xl:max-w-none xl:grid-cols-4 xl:gap-y-8 grid-cols-1 grid-rows-1 sm:grid-cols-2">
          {columnsGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-8">
              {group.map((testimonial, idx) => (
                <TestimonialCard
                  key={`testimonial-${groupIdx}-${idx}`}
                  testimonial={testimonial}
                  id={`testimonial-${groupIdx}-${idx}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  testimonial: Testimonial;
  id: string;
};

const TestimonialCard = ({ testimonial, id }: TestimonialCardProps) => {
  const { description, authorName, authorStatus, bgColor } = testimonial;
  const [isActive, setIsActive] = useState(false);

  const handleActivate = () => setIsActive(true);
  const handleDeactivate = () => setIsActive(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <figure
      tabIndex={0}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onFocus={handleActivate}
      onBlur={handleDeactivate}
      onKeyDown={handleKeyDown}
      className="testimonial-card shadow-lg ring-1 ring-gray-900/5 rounded-md space-y-6 xl:space-y-4 cursor-pointer transition-all duration-500 ease bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 motion-safe:transition-all"
    >
      <blockquote
        className={`transition-all duration-500 ease p-4 sm:p-6 rounded-md text-base ${
          isActive ? "text-white" : "text-gray-600"
        }`}
        style={{ backgroundColor: isActive ? bgColor : "white" }}
      >
        <p className="font-normal" id={`${id}-desc`}>
          {`“${description}”`}
        </p>
      </blockquote>
      <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 py-4 px-4 transition-colors duration-500 ease">
        <div>
          <p
            id={`${id}-title`}
            className={`font-semibold text-base transition-colors duration-300 ${
              isActive ? "" : "text-gray-600"
            }`}
            style={isActive ? { color: bgColor } : {}}
          >
            {authorName}
          </p>
          <p className="text-sm text-gray-700">{authorStatus}</p>
        </div>
      </figcaption>
    </figure>
  );
};
