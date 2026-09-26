import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroBanner } from "@/components/HeroBanner";
import { CouponBanner } from "@/components/CouponBanner";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductCard } from "@/components/ProductCard";
import { ProductDialog } from "@/components/ProductDialog";
import { CartFab } from "@/components/CartFab";
import { CartSheet } from "@/components/CartSheet";
import { CATEGORIAS, PRODUTOS, type CategoriaId, type Produto } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burguer Amostra: smash burgers em Sao Paulo" },
      {
        name: "description",
        content:
          "Cardapio digital da Burguer Amostra. Monte seu smash burger, escolha combos e envie o pedido pelo WhatsApp.",
      },
      { property: "og:title", content: "Burguer Amostra: smash burgers em Sao Paulo" },
      {
        property: "og:description",
        content: "Blend bovino prensado na chapa, combos e entrega rapida. Peca em 2 toques.",
      },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  const [categoria, setCategoria] = useState<CategoriaId>("lanches");
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const listaRef = useRef<HTMLDivElement>(null);

  const irParaCardapio = (id?: CategoriaId) => {
    if (id) setCategoria(id);
    listaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const produtos = PRODUTOS.filter((p) => p.categoria === categoria);
  const nomeCategoria = CATEGORIAS.find((c) => c.id === categoria)?.nome ?? "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <HeroBanner onPedir={() => irParaCardapio("lanches")} />
      <CouponBanner />
      <CategoryNav ativa={categoria} onSelecionar={(id) => irParaCardapio(id)} />

      <main ref={listaRef} className="mx-auto max-w-6xl scroll-mt-32 px-4 py-8">
        <h2 className="font-display text-3xl text-foreground">{nomeCategoria.toUpperCase()}</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p, indice) => (
            <ProductCard key={p.id} produto={p} indice={indice} onAbrir={setProduto} />
          ))}
        </div>
      </main>

      <SiteFooter />

      <ProductDialog produto={produto} aberto={Boolean(produto)} onFechar={() => setProduto(null)} />
      <CartFab escondido={carrinhoAberto} onAbrir={() => setCarrinhoAberto(true)} />
      <CartSheet aberto={carrinhoAberto} onFechar={() => setCarrinhoAberto(false)} />
    </div>
  );
}
