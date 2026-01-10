// src\app\[locale]\page.tsx
import { getTranslations } from "next-intl/server";

import Hero from "../components/Hero";
import Metodology from "../components/Metodology";
import Programs from "../components/Programs";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import Price from "../components/Price";
import Contact from "../components/Contact";
import Cookie from "../components/Cookie";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "IndexPage" });

  const baseUrl = "https://www.plastiliin.com";
  const canonicalUrl = `${baseUrl}/${locale}/home-${locale}`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/home-en`,
        uk: `${baseUrl}/uk/home-uk`,
        ru: `${baseUrl}/ru/home-ru`,
        et: `${baseUrl}/et/home-et`,
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: canonicalUrl,
      siteName: "Plastiliin",
      type: "website",
      locale,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Plastiliin — детский развивающий центр",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "IndexPage" });

  return (
    <>
      <h2 className=" hidden">{t("title")}</h2>
      <p className=" hidden">{t("about")}</p>
      <Hero />
      <Metodology />
      <Programs />
      <Team />
      <Testimonials />
      <Price />
      <Contact />
      <Cookie />
    </>
  );
}
