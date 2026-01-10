"use client";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaViber } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useTranslations } from "next-intl";
import Form from "./ui/form";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/plastiliin",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/lastekeskus_plastiliin",
    icon: FaInstagram,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/37258302501",
    icon: IoLogoWhatsapp,
  },
  {
    name: "Viber",
    href: "viber://chat?number=+37258302501",
    icon: FaViber,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@PlastiliinChildDevelopment",
    icon: FaYoutube,
  },
];

export default function Contact() {
  const t = useTranslations("Contact");

  const rawPhone = t("phone");
  const telHref = `tel:${rawPhone.replace(/[^+\d]/g, "")}`;

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="bg-gradient-to-b from-white via-white to-[#9551c9]/20 pb-12 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center">
          <Image
            src="/logo_small.webp"
            alt="Plastiliin logo"
            width={350}
            height={80}
            className="mx-auto"
          />
        </div>
        <h2
          id="contact-heading"
          className="max-w-2xl md:max-w-5xl m-auto text-5xl pt-6 lg:text-8xl text-center font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-b from-[#ff94a3] via-[#ff94a3] to-pink-400 px-6 pb-8 md:pb-12"
        >
          {t("title")}
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="px-6 pb-20 pt-8 lg:static lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg flex flex-col h-full justify-between">
            <div>
              <p className="mt-6 text-xl text-pink-400 font-semibold uppercase text-center sm:text-left">
                {t("description_title")}
              </p>
              <p className="mt-6 text-base/8 text-gray-800 font-semibold text-center sm:text-left">
                {t("description")}
              </p>
              <p className="text-base/8 text-gray-800 text-center sm:text-left">
                {t("description_2")}{" "}
                <span className="font-semibold inline ">
                  {t("description_3")}
                </span>
              </p>

              <div className="mt-10 space-y-4 text-base/7 text-gray-800">
                {/* Address */}
                <div className="flex gap-x-4 items-start">
                  <div className="flex-none">
                    <Image
                      src="/programs/icons/icon/place.webp"
                      alt=""
                      width={30}
                      height={30}
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    href={t("adress_link")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 font-semibold -mt-2"
                    aria-label={t("adress")}
                  >
                    <div className="font-semibold p-2">{t("adress")}</div>
                    <span className="text-pink-400 hover:text-pink-600 p-2">
                      {t("adress_buttnon")}
                    </span>
                  </a>
                </div>

                {/* Phone */}
                <div className="flex gap-x-4 items-start">
                  <div className="flex-none">
                    <Image
                      src="/programs/icons/icon/phone.webp"
                      alt=""
                      width={30}
                      height={30}
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    href={telHref}
                    className="hover:text-pink-400 text-gray-800 font-semibold p-2"
                    aria-label={t("phone_title")}
                  >
                    {rawPhone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex gap-x-4 items-start">
                  <div className="flex-none">
                    <Image
                      src="/programs/icons/icon/mail.webp"
                      alt=""
                      width={30}
                      height={30}
                      aria-hidden="true"
                    />
                  </div>
                  <a
                    href={`mailto:${t("email")}`}
                    className="hover:text-pink-400 text-gray-800 font-semibold p-2 break-all"
                    aria-label={t("email_title")}
                  >
                    {t("email")}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="mt-12 mb-6 text-lg uppercase text-pink-400 font-semibold text-center sm:text-left">
                {t("description_links")}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start space-x-4 ">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="p-1 rounded-full bg-transparent text-gray-800 hover:bg-gray-100 focus:outline focus:outline-2 focus:outline-black "
                  >
                    <Icon
                      size={30}
                      className="text-gray-700 transition-colors duration-200 hover:text-pink-400"
                      role="img"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Form />
      </div>
    </section>
  );
}
