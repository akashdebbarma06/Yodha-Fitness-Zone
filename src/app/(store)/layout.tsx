import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/store/CartDrawer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-secondary/20 selection:text-primary">
      <Header />
      <CartDrawer />
      <main className="flex-1 pt-[114px]">{children}</main>
      <Footer />
    </div>
  );
}
