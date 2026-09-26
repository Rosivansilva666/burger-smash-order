import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { brl } from "@/lib/format";
import { ADICIONAIS, PONTOS_CARNE, type Produto } from "@/lib/menu";
import { novoItem, useCart } from "@/context/cart";

export function ProductDialog({
  produto,
  aberto,
  onFechar,
}: {
  produto: Produto | null;
  aberto: boolean;
  onFechar: () => void;
}) {
  const { adicionar } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const [ponto, setPonto] = useState<string>(PONTOS_CARNE[1]);
  const [extras, setExtras] = useState<string[]>([]);
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    if (aberto) {
      setQuantidade(1);
      setPonto(PONTOS_CARNE[1]);
      setExtras([]);
      setObservacao("");
    }
  }, [aberto, produto?.id]);

  if (!produto) return null;

  const selecionados = ADICIONAIS.filter((a) => extras.includes(a.id));
  const total = (produto.preco + selecionados.reduce((s, a) => s + a.preco, 0)) * quantidade;

  const confirmar = () => {
    adicionar(
      novoItem(produto, {
        quantidade,
        ponto: produto.montavel ? ponto : null,
        adicionais: selecionados,
        observacao: observacao.trim().slice(0, 200),
      }),
    );
    toast.success(`${produto.nome} no carrinho`);
    onFechar();
  };

  return (
    <Dialog open={aberto} onOpenChange={(v) => (v ? null : onFechar())}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto p-0">
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          width={1024}
          height={576}
          className="aspect-video w-full rounded-t-lg object-cover"
        />
        <div className="space-y-5 p-5 pb-28">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-display text-2xl leading-none">
              {produto.nome.toUpperCase()}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {produto.descricao} Tempo de preparo: {produto.tempo} min.
            </DialogDescription>
          </DialogHeader>

          {produto.montavel ? (
            <section>
              <h3 className="font-display text-lg text-primary">PONTO DA CARNE</h3>
              <RadioGroup value={ponto} onValueChange={setPonto} className="mt-2 gap-2">
                {PONTOS_CARNE.map((p) => (
                  <div key={p} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <RadioGroupItem value={p} id={`ponto-${p}`} />
                    <Label htmlFor={`ponto-${p}`} className="flex-1 cursor-pointer">
                      {p}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </section>
          ) : null}

          {produto.montavel ? (
            <section>
              <h3 className="font-display text-lg text-primary">ADICIONAIS</h3>
              <div className="mt-2 space-y-2">
                {ADICIONAIS.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <Checkbox
                      id={`add-${a.id}`}
                      checked={extras.includes(a.id)}
                      onCheckedChange={(v) =>
                        setExtras((atual) =>
                          v ? [...atual, a.id] : atual.filter((id) => id !== a.id),
                        )
                      }
                    />
                    <Label htmlFor={`add-${a.id}`} className="flex-1 cursor-pointer">
                      {a.nome}
                    </Label>
                    <span className="text-sm text-muted-foreground">+{brl(a.preco)}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <Label htmlFor="obs" className="font-display text-lg text-primary">
              OBSERVACOES
            </Label>
            <Textarea
              id="obs"
              value={observacao}
              maxLength={200}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Sem picles, caprichar no molho..."
              className="mt-2"
            />
          </section>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className="inline-flex size-11 items-center justify-center rounded-md border border-border"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center font-display text-2xl">{quantidade}</span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => setQuantidade((q) => Math.min(20, q + 1))}
              className="inline-flex size-11 items-center justify-center rounded-md border border-border"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-border bg-popover p-4">
          <button
            type="button"
            onClick={confirmar}
            className="h-12 w-full rounded-md bg-primary font-display text-xl tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
          >
            ADICIONAR AO PEDIDO: {brl(total)}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
