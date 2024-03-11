import { Inter } from 'next/font/google';
import './globals.css';
import { cn, constructMetadata } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body className={cn('relative h-full font-sans antialiased', inter.className)}>
				<Providers>
					<main className="relative flex flex-col min-h-screen">
						<Navbar />
						<div className="flex-1 flex-grow">{children}</div>
						<Footer />
					</main>

					<Toaster position="top-center" richColors />
				</Providers>
			</body>
		</html>
	);
}
