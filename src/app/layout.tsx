import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import ThemeScript from "@/app/_component/ThemeScript";
import { CookiesProvider } from "next-client-cookies/server";
import { ApolloWrapper } from "@/graphql/apolloWrapper";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "면접 질문 마스터",
  description: "다양한 면접 질문 모음, 면접 이제는 자신감 있게.",
};

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={notoSansKr.className}>
        <CookiesProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </CookiesProvider>
      </body>
    </html>
  );
}
