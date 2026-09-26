import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { brl, dataHora } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/cozinha")({
  head: () => ({
    meta: [
      { title: "Painel da cozinha: Burguer Amostra" },
      { name: "description", content: "Acompanhamento e atualizacao do status dos pedidos da cozinha." },
      { property: "og:title", content: "Painel da cozinha: Burguer Amostra" },
      { property: "og:description", content: "Fila de pedidos em tempo real da hamburgueria." },
    ],
  }),
  component: Cozinha,
});

const FLUXO = ["recebido", "preparo", "pronto", "entrega", "concluido"] as const;
const ROTULOS: Record<string, string> = {
  recebido: "Recebido",
  preparo: "Em preparo",
  pronto: "Pronto",
  entrega: "Saiu para entrega",
  concluido: "Concluido",
  cancelado: "Cancelado",
};

function Cozinha() {
  const { user, ehCozinha, carregando } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (carregando) return;
    if (!user) navigate({ to: "/entrar" });
    else if (!ehCozinha) navigate({ to: "/pedidos" });
  }, [carregando, user, ehCozinha, navigate]);

  const pedidos = useQuery({
    queryKey: ["fila-cozinha"],
    enabled: Boolean(user) && ehCozinha,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!ehCozinha) return;
    const canal = supabase
      .channel("cozinha-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        queryClient.invalidateQueries({ queryKey: ["fila-cozinha"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(canal);
    };
  }, [ehCozinha, queryClient]);

  const avancar = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: (typeof FLUXO)[number] }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status atualizado");
      queryClient.invalidateQueries({ queryKey: ["fila-cozinha"] });
    },
    onError: () => toast.error("Nao deu pra atualizar o pedido"),
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-3xl">PAINEL DA COZINHA</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fila de producao em tempo real. Toque no botao para avancar o pedido.
        </p>

        {pedidos.isLoading ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : null}

        {pedidos.data && pedidos.data.length === 0 ? (
          <p className="mt-6 rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nenhum pedido na fila agora. A chapa ta pronta.
          </p>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {(pedidos.data ?? []).map((p) => {
            const indice = FLUXO.indexOf(p.status as (typeof FLUXO)[number]);
            const proximo = indice >= 0 && indice < FLUXO.length - 1 ? FLUXO[indice + 1] : null;
            return (
              <article key={p.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-xl">{p.cliente_nome}</span>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    {ROTULOS[p.status] ?? p.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{dataHora(p.created_at)}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {(p.itens as { nome: string; quantidade: number; adicionais?: string[] }[]).map(
                    (item, i) => (
                      <li key={i}>
                        {item.quantidade}x {item.nome}
                        {item.adicionais?.length ? ` (${item.adicionais.join(", ")})` : ""}
                      </li>
                    ),
                  )}
                </ul>
                <p className="mt-2 text-sm text-foreground">
                  {p.modo === "entrega" ? `Entrega: ${p.endereco}` : "Retirada no balcao"}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="font-display text-2xl text-primary">{brl(Number(p.total))}</span>
                  {proximo ? (
                    <button
                      type="button"
                      disabled={avancar.isPending}
                      onClick={() => avancar.mutate({ id: p.id, status: proximo })}
                      className="h-11 rounded-md bg-primary px-4 font-display text-lg text-primary-foreground disabled:opacity-60"
                    >
                      {(ROTULOS[proximo] ?? proximo).toUpperCase()}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
