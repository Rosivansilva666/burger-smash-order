import { Minus, Plus, Trash2 } from "lucide-react";
import { brl } from "@/lib/format";
import { precoItem, useCart } from "@/context/cart";

export function CartItemsList() {
  const { itens, alterarQuantidade, remover } = useCart();

  if (itens.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Seu carrinho ta vazio. Que tal um Smash Classic?
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {itens.map((item) => (
        <li key={item.uid} className="flex gap-3 rounded-md border border-border bg-card p-3">
          <img
            src={item.imagem}
            alt={item.nome}
            loading="lazy"
            width={96}
            height={96}
            className="size-16 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg leading-none text-foreground">
              {item.nome.toUpperCase()}
            </p>
            {item.ponto ? <p className="text-xs text-muted-foreground">Ponto: {item.ponto}</p> : null}
            {item.adicionais.length ? (
              <p className="text-xs text-muted-foreground">
                {item.adicionais.map((a) => a.nome).join(", ")}
              </p>
            ) : null}
            {item.observacao ? (
              <p className="text-xs text-muted-foreground">Obs: {item.observacao}</p>
            ) : null}

            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                aria-label={`Diminuir ${item.nome}`}
                onClick={() => alterarQuantidade(item.uid, -1)}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.quantidade}</span>
              <button
                type="button"
                aria-label={`Aumentar ${item.nome}`}
                onClick={() => alterarQuantidade(item.uid, 1)}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border"
              >
                <Plus className="size-4" />
              </button>
              <span className="ml-auto font-display text-lg text-primary">
                {brl(precoItem(item))}
              </span>
              <button
                type="button"
                aria-label={`Remover ${item.nome}`}
                onClick={() => remover(item.uid)}
                className="inline-flex size-9 items-center justify-center rounded-md text-secondary hover:bg-accent"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
