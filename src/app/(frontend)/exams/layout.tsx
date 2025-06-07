import { Navbar } from "@/components/dashboard/navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto pb-6 px-4 md:px-6">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}