import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import { LOJA } from "@/lib/menu";
import { lojaAberta } from "@/lib/format";

export function SiteHeader() {
  const [comScroll, setComScroll] = useState(false);
  const [aberta, setAberta] = useState(false);

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
      </div>
    </header>
  );
}
