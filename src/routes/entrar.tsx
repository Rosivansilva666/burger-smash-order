import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { BrandLogo } from "@/components/BrandLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar: Burguer Amostra" },
      {
        name: "description",
        content: "Acesse sua conta para acompanhar pedidos e pontos de fidelidade da Burguer Amostra.",
      },
      { property: "og:title", content: "Entrar: Burguer Amostra" },
      { property: "og:description", content: "Conta do cliente e painel da cozinha." },
    ],
  }),
  component: Entrar,
});

function Entrar() {
  const navigate = useNavigate();
  const { user, carregando } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!carregando && user) navigate({ to: "/pedidos" });
  }, [carregando, user, navigate]);

  const submeter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || senha.length < 6) {
      toast.error("Informe um email valido e uma senha com 6 caracteres ou mais");
      return;
    }
    setEnviando(true);
    const resposta =
      modo === "entrar"
        ? await supabase.auth.signInWithPassword({ email, password: senha })
        : await supabase.auth.signUp({
            email,
            password: senha,
            options: { emailRedirectTo: window.location.origin },
          });
    setEnviando(false);

    if (resposta.error) {
      toast.error(
        modo === "entrar"
          ? "Email ou senha nao conferem"
          : "Nao foi possivel criar a conta. Tente outro email.",
      );
      return;
    }
    const novoUsuario = resposta.data.user;
    if (novoUsuario) {
      await supabase.from("profiles").upsert({ id: novoUsuario.id, nome: novoUsuario.email ?? null });
    }
    toast.success("Tudo certo. Bom apetite.");
    navigate({ to: "/pedidos" });
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <BrandLogo size={36} />
          <span className="font-display text-2xl">BURGUER AMOSTRA</span>
        </Link>

        <form onSubmit={submeter} className="space-y-4 rounded-lg border border-border bg-card p-5">
          <h1 className="font-display text-2xl">
            {modo === "entrar" ? "ENTRAR NA CONTA" : "CRIAR CONTA"}
          </h1>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1 h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              className="mt-1 h-11"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={modo === "entrar" ? "current-password" : "new-password"}
            />
          </div>
          <button
            type="submit"
            disabled={enviando}
            className="h-12 w-full rounded-md bg-primary font-display text-xl text-primary-foreground disabled:opacity-60"
          >
            {enviando ? "AGUARDE..." : modo === "entrar" ? "ENTRAR" : "CRIAR CONTA"}
          </button>
          <button
            type="button"
            onClick={() => setModo(modo === "entrar" ? "criar" : "entrar")}
            className="w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            {modo === "entrar" ? "Ainda nao tenho conta" : "Ja tenho conta"}
          </button>
        </form>
      </div>
    </div>
  );
}
