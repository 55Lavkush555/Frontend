import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotIcon from '@/components/ChatbotIcon';

export const metadata = {
  title: 'Lavkush — Portfolio',
  description: 'Full-stack developer portfolio showcasing projects, blogs, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black antialiased">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <ChatbotIcon />
      </body>
    </html>
  );
}
