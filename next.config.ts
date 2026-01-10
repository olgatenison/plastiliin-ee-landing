import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {}, // важно для Turbopack/Next 16
};

export default withNextIntl(nextConfig);
