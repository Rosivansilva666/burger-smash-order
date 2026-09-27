import { useState } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItemsList } from "@/components/CartItemsList";
import { CheckoutFields } from "@/components/CheckoutFields";
import { brl } from "@/lib/format";
import { CUPONS } from "@/lib/menu";
import { useCart } from "@/context/cart";
import { useIsMobile } from "@/hooks/use-mobile";
import { linkWhatsapp, montarTextoPedido } from "@/lib/whatsapp";
import {
  CHECKOUT_INICIAL,
  calcularTotais,
  validarCheckout,
  type Checkout,
  type ErrosCheckout,
} from "@/lib/checkout";

export function CartSheet({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const { itens, subtotal, tempoEstimado, limpar } = useCart();
  const ehMobile = useIsMobile();
  const [dados, setDados] = useState<Checkout>(CHECKOUT_INICIAL);
  const [erros, setErros] = useState<ErrosCheckout>({});
  const [enviando, setEnviando] = useState(false);

  const { taxa, percentual, desconto, total } = calcularTotais(subtotal, dados);
  const aoMudar = (parcial: Partial<Checkout>) => setDados((a) => ({ ...a, ...parcial }));

  const aplicarCupom = () => {
    const codigo = dados.cupomTexto.trim().toUpperCase();
    if (CUPONS[codigo]) {
      aoMudar({ cupomAplicado: codigo });
      toast.success(`Cupom ${codigo} aplicado: ${CUPONS[codigo]}% off`);
    } else {
      aoMudar({ cupomAplicado: null });
      toast.error("Cupom invalido ou expirado");
    }
  };

  const enviar = () => {
    const novosErros = validarCheckout(dados);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    const texto = montarTextoPedido({
      itens,
      cliente: dados.nome.trim(),
      telefone: dados.telefone,
      modo: dados.modo,
      endereco: dados.endereco.trim(),
      bairro: dados.bairro,
      taxa,
      cupom: dados.cupomAplicado,
      descontoPercentual: percentual,
      subtotal,
      desconto,
      total,
      pagamento: dados.pagamento,
      troco: dados.troco,
      tempoEstimado,
    });

    window.open(linkWhatsapp(texto), "_blank", "noopener");
    setEnviando(false);
    toast.success("Pedido montado. Finalize no WhatsApp.");
    limpar();
    setDados(CHECKOUT_INICIAL);
    onFechar();
  };

  return (
    <Sheet open={aberto} onOpenChange={(v) => (v ? null : onFechar())}>
      <SheetContent
        side={ehMobile ? "bottom" : "right"}
        className={`flex flex-col gap-0 p-0 ${ehMobile ? "h-[90vh]" : "w-full sm:max-w-md"}`}
      >
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-display text-2xl">SEU PEDIDO</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <CartItemsList />
          {itens.length > 0 ? (
            <CheckoutFields dados={dados} erros={erros} aoMudar={aoMudar} aplicarCupom={aplicarCupom} />
          ) : null}
        </div>

        {itens.length > 0 ? (
          <div className="space-y-2 border-t border-border p-4">
            <Linha rotulo="Subtotal" valor={brl(subtotal)} />
            {desconto > 0 ? <Linha rotulo={`Desconto (${percentual}%)`} valor={`-${brl(desconto)}`} /> : null}
            {dados.modo === "entrega" ? <Linha rotulo="Taxa de entrega" valor={brl(taxa)} /> : null}
            <div className="flex items-center justify-between pt-1">
              <span className="font-display text-xl">TOTAL</span>
              <span className="font-display text-2xl text-primary">{brl(total)}</span>
            </div>
            <button
              type="button"
              disabled={enviando}
              onClick={enviar}
              className="h-12 w-full rounded-md bg-primary font-display text-xl tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {enviando ? "ENVIANDO..." : "ENVIAR PEDIDO NO WHATSAPP"}
            </button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{rotulo}</span>
      <span className="text-foreground">{valor}</span>
    </div>
  );
}
