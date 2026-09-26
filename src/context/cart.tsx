import type React from "react";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Adicional, Produto } from "@/lib/menu";

export type ItemCarrinho = {
  uid: string;
  produtoId: string;
  nome: string;
  precoBase: number;
  imagem: string;
  tempo: number;
  quantidade: number;
  ponto: string | null;
  adicionais: Adicional[];
  observacao: string;
};

type CartContextValue = {
  itens: ItemCarrinho[];
  adicionar: (item: Omit<ItemCarrinho, "uid">) => void;
  remover: (uid: string) => void;
  alterarQuantidade: (uid: string, delta: number) => void;
  limpar: () => void;
  totalItens: number;
  subtotal: number;
  tempoEstimado: number;
  ultimaAdicao: number;
};

// Mantem a mesma instancia do contexto entre recargas do editor (HMR)
const globalCart = globalThis as unknown as { __cartContext?: React.Context<CartContextValue | null> };
const CartContext =
  globalCart.__cartContext ?? (globalCart.__cartContext = createContext<CartContextValue | null>(null));

export function precoItem(item: ItemCarrinho): number {
  const extras = item.adicionais.reduce((soma, a) => soma + a.preco, 0);
  return (item.precoBase + extras) * item.quantidade;
}

export function novoItem(produto: Produto, dados: Partial<ItemCarrinho>): Omit<ItemCarrinho, "uid"> {
  return {
    produtoId: produto.id,
    nome: produto.nome,
    precoBase: produto.preco,
    imagem: produto.imagem,
    tempo: produto.tempo,
    quantidade: dados.quantidade ?? 1,
    ponto: dados.ponto ?? null,
    adicionais: dados.adicionais ?? [],
    observacao: dados.observacao ?? "",
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [ultimaAdicao, setUltimaAdicao] = useState(0);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = itens.reduce((soma, item) => soma + precoItem(item), 0);
    return {
      itens,
      ultimaAdicao,
      adicionar: (item) => {
        setItens((atual) => [...atual, { ...item, uid: crypto.randomUUID() }]);
        setUltimaAdicao(Date.now());
      },
      remover: (uid) => setItens((atual) => atual.filter((i) => i.uid !== uid)),
      alterarQuantidade: (uid, delta) =>
        setItens((atual) =>
          atual
            .map((i) => (i.uid === uid ? { ...i, quantidade: Math.max(0, i.quantidade + delta) } : i))
            .filter((i) => i.quantidade > 0),
        ),
      limpar: () => setItens([]),
      totalItens: itens.reduce((soma, i) => soma + i.quantidade, 0),
      subtotal,
      tempoEstimado: itens.length ? Math.max(...itens.map((i) => i.tempo)) : 0,
    };
  }, [itens, ultimaAdicao]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}
