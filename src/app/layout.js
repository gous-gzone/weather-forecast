import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata = {
  title: 'Weather Forecast - Premium Weather App',
  description: 'Advanced weather forecasting with dynamic UI, animations, and real-time data',
  keywords: 'weather, forecast, temperature, humidity, wind, precipitation',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="theme-color" content="#1e293b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="h-full antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
