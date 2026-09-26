import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CouponBanner() {
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText("PRIMEIRACOMPRA");
      toast.success("Codigo copiado. Aplique no carrinho.");
    } catch {
      toast.error("Nao deu pra copiar. Anote o codigo PRIMEIRACOMPRA.");
    }
  };

  return (
    <div className="flex h-12 items-center justify-center gap-3 bg-primary px-4 text-primary-foreground">
      <p className="truncate text-xs font-semibold sm:text-sm">
        Cupom PRIMEIRACOMPRA: 10% off no seu primeiro pedido
      </p>
      <button
        type="button"
        onClick={copiar}
        className="inline-flex h-9 shrink-0 items-center gap-1 rounded-md bg-primary-foreground px-3 text-xs font-semibold text-primary transition-opacity hover:opacity-90"
      >
        <Copy className="size-4" />
        Copiar codigo
      </button>
    </div>
  );
}
