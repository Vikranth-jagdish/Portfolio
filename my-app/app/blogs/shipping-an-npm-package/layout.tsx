import type { Metadata } from "next";

const SITE = "https://www.vikranth.space";
const PAGE_URL = `${SITE}/blogs/shipping-an-npm-package`;

const TITLE = "Shipping a tiny tool was harder than building it";
const DESCRIPTION =
  "A plain-words story of building and publishing an npm package with an AI. What a tarball is, why Windows physically could not ship it, the bug that had nothing to do with the code, automated releases, and what working with an AI actually feels like.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "shipping npm package",
    "why npm publish fails on windows",
    "executable bit npm bin",
    "what is a tarball",
    "npm publish github actions",
    "trusted publishing oidc",
    "npm provenance",
    "publishing from windows",
    "working with ai assistant",
    "vtop-mcp",
    "vikranth jagdish blog",
  ],
  alternates: { canonical: PAGE_URL },
  authors: [{ name: "Vikranth Jagdish", url: SITE }],
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Vikranth Jagdish",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@vikranth_j",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
