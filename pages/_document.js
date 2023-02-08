import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="AlgoChat" key="title" />
        <meta
          property="og:description"
          content="Build with Algorand"
          key="description"
        />
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_images/962068712772616196/eYwuB0TO_400x400.jpg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
