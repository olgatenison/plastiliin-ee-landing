import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {}, // важно для Turbopack/Next 16

  // Транспиляция Swiper для корректной работы CSS
  transpilePackages: ["swiper"],

  // Настройки для изображений
  images: {
    unoptimized: true, // если используете статический экспорт
    // или если нужны внешние домены:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // разрешить все HTTPS домены
      },
    ],
  },
};

export default withNextIntl(nextConfig);
