import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Skeleton } from "@/components/ui/skeleton";
import { brl, dataHora } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Meus pedidos: Burguer Amostra" },
      {
        name: "description",
        content: "Acompanhe seus pedidos, o status da cozinha e seus pontos de fidelidade.",
      },
      { property: "og:title", content: "Meus pedidos: Burguer Amostra" },
      { property: "og:description", content: "Historico de pedidos e programa de fidelidade." },
    ],
  }),
  component: MeusPedidos,
});

const ROTULOS: Record<string, string> = {
  recebido: "Recebido",
  preparo: "Em preparo",
  pronto: "Pronto",
  entrega: "Saiu para entrega",
  concluido: "Concluido",
  cancelado: "Cancelado",
};

function MeusPedidos() {
  const { user, carregando } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!carregando && !user) navigate({ to: "/entrar" });
  }, [carregando, user, navigate]);

  const pedidos = useQuery({
    queryKey: ["meus-pedidos", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const perfil = useQuery({
    queryKey: ["perfil", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("pontos").eq("id", user!.id).maybeSingle();
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="font-display text-3xl">MEUS PEDIDOS</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pontos de fidelidade: {perfil.data?.pontos ?? 0}. Cada pedido concluido soma pontos.
        </p>

        {pedidos.isLoading ? (
          <div className="mt-6 space-y-3">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : null}

        {pedidos.isError ? (
          <p className="mt-6 rounded-md border border-border p-4 text-sm text-secondary">
            Nao deu pra carregar seus pedidos agora. Atualize a pagina.
          </p>
        ) : null}

        {pedidos.data && pedidos.data.length === 0 ? (
          <div className="mt-6 rounded-md border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Voce ainda nao fez nenhum pedido. Que tal um Smash Classic?
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-5 font-display text-lg text-primary-foreground"
            >
              VER CARDAPIO
            </Link>
          </div>
        ) : null}

        <ul className="mt-6 space-y-3">
          {(pedidos.data ?? []).map((p) => (
            <li key={p.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-xl">{dataHora(p.created_at)}</span>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  {ROTULOS[p.status] ?? p.status}
                </span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {(p.itens as { nome: string; quantidade: number }[]).map((item, i) => (
                  <li key={i}>
                    {item.quantidade}x {item.nome}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-display text-2xl text-primary">{brl(Number(p.total))}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
