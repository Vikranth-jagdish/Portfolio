import type { Metadata } from "next";

const SITE = "https://vikranth.space";
const PAGE_URL = `${SITE}/labs/vtop-mcp`;

const TITLE =
  "VTOP API / MCP Server for VIT Chennai — attendance, marks, timetable | @vikranth2005/vtop-mcp";
const DESCRIPTION =
  "Programmatic access to VIT Chennai's VTOP — a VTOP API exposed as an MCP server. Get attendance, marks, timetable, exam seats, CGPA and curriculum progress from Claude, Cursor or VS Code, or script it yourself. Free, open source. npm i @vikranth2005/vtop-mcp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    // MCP-specific
    "vtop mcp",
    "vtop mcp server",
    "vtop-mcp",
    "@vikranth2005/vtop-mcp",
    "model context protocol vtop",
    "mcp server vit",
    "vtop mcp claude",
    "vtop mcp cursor",
    // broader VTOP intent
    "vtop api",
    "vtop server",
    "vtop bot",
    "vtop scraper",
    "vtop automation",
    "vtop integration",
    "vtop attendance api",
    "vtop attendance checker",
    "vtop attendance bot",
    "vtop marks api",
    "vtop timetable api",
    "vtop cgpa calculator",
    "vtop data access",
    "vtop reverse engineering",
    "vtop python",
    "vtop nodejs",
    "vtop login api",
    // campus / brand
    "vit vtop",
    "vit chennai vtop",
    "vtopcc",
    "vtopcc.vit.ac.in",
    "vit chennai attendance",
    "vikranth jagdish vtop",
  ],
  alternates: { canonical: PAGE_URL },
  authors: [{ name: "Vikranth Jagdish", url: SITE }],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Vikranth Jagdish",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "VTOP MCP — VIT Chennai VTOP for Claude / Cursor / VS Code",
    description: DESCRIPTION,
    creator: "@vikranth_j",
  },
};

// JSON-LD: helps search engines + AI agents understand this is a
// SoftwareApplication / npm package, improving "vtop mcp" discoverability.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VTOP MCP (@vikranth2005/vtop-mcp)",
  alternateName: [
    "VTOP API",
    "VTOP MCP Server",
    "VIT Chennai VTOP API",
    "vtop-mcp",
  ],
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  description: DESCRIPTION,
  url: PAGE_URL,
  downloadUrl: "https://www.npmjs.com/package/@vikranth2005/vtop-mcp",
  installUrl: "https://www.npmjs.com/package/@vikranth2005/vtop-mcp",
  softwareHelp: "https://github.com/Vikranth-jagdish/VtopMCP",
  codeRepository: "https://github.com/Vikranth-jagdish/VtopMCP",
  programmingLanguage: "TypeScript",
  author: { "@type": "Person", name: "Vikranth Jagdish", url: SITE },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  keywords:
    "vtop api, vtop mcp, vtop server, vtop attendance, vtop automation, vit chennai, model context protocol, claude, cursor",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
