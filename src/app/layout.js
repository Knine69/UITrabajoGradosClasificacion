import './index.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body  className="bg-white dark:bg-slate-700 text-white min-h-full">
        {children}
      </body>
    </html>
  );
}
