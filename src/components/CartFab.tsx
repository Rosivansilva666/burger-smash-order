import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { brl } from "@/lib/format";
import { useCart } from "@/context/cart";

export function CartFab({ escondido, onAbrir }: { escondido: boolean; onAbrir: () => void }) {
  const { totalItens, subtotal, ultimaAdicao } = useCart();
  const [pulsando, setPulsando] = useState(false);

  useEffect(() => {
    if (!ultimaAdicao) return;
    setPulsando(true);
    const t = setTimeout(() => setPulsando(false), 700);
    return () => clearTimeout(t);
  }, [ultimaAdicao]);

  if (totalItens === 0 || escondido) return null;

  return (
    <button
      type="button"
      onClick={onAbrir}
      className={`fixed bottom-4 right-4 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-primary px-5 text-primary-foreground shadow-xl transition-transform md:bottom-6 ${
        pulsando ? "scale-105" : ""
      }`}
    >
      <span className="relative">
        <ShoppingBag className="size-6" />
        <span className="absolute -right-2 -top-2 inline-flex size-5 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-secondary-foreground">
          {totalItens}
        </span>
      </span>
      <span className="font-display text-xl leading-none">{brl(subtotal)}</span>
    </button>
  );
}
