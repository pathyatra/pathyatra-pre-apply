import "./globals.css";

export const metadata = {
  title: "PathYatra Partner — Early Access for Bus Owners",
  description:
    "PathYatra Partner App — No paper tickets, no cash leakage. Register for early access and get 3 months zero commission for the first 100 bus owners.",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "PathYatra Partner — Early Access",
    description:
      "Make your bus transport business 100% smart and transparent. Early access registration open.",
    type: "website",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
