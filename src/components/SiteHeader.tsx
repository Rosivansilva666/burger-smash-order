import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Receipt } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { LOJA } from "@/lib/menu";
import { lojaAberta } from "@/lib/format";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const [comScroll, setComScroll] = useState(false);
  const [aberta, setAberta] = useState(false);
  const { user, sair } = useAuth();

  useEffect(() => {
    setAberta(lojaAberta(LOJA.abreHora, LOJA.fechaHora));
    const aoRolar = () => setComScroll(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b border-border bg-background/95 transition-shadow ${
        comScroll ? "shadow-lg shadow-background backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Inicio">
          <BrandLogo size={34} />
          <span className="font-display text-xl leading-none tracking-wide text-foreground">
            {LOJA.nome}
          </span>
        </Link>

        <span
          className={`ml-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
            aberta ? "bg-success/15 text-success" : "bg-secondary/15 text-secondary"
          }`}
        >
          {aberta ? "Aberto agora" : "Fechado"}
        </span>

        <div className="ml-auto hidden text-right text-[11px] leading-tight text-muted-foreground lg:block">
          <p>
            {LOJA.abreHora}h as {LOJA.fechaHora}h
          </p>
          <p>{LOJA.endereco}</p>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:ml-3">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="h-11 px-2">
                <Link to="/pedidos" aria-label="Meus pedidos">
                  <Receipt className="size-5" />
                  <span className="hidden sm:inline">Pedidos</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-11 px-2" onClick={sair}>
                <LogOut className="size-5" />
                <span className="sr-only">Sair</span>
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm" className="h-11 px-2">
              <Link to="/entrar">
                <LogIn className="size-5" />
                <span className="hidden sm:inline">Entrar</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
