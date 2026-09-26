import { Instagram, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { LOJA } from "@/lib/menu";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <BrandLogo size={32} />
            <span className="font-display text-xl text-foreground">{LOJA.nome}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Blend bovino prensado na chapa todo dia. Sem frescura, so smash.
          </p>
          <p className="mt-3 text-sm text-foreground">{LOJA.endereco}</p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={`https://wa.me/${LOJA.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent"
            >
              <MessageCircle className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-primary">HORARIOS</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {LOJA.horarios.map((h) => (
              <li key={h.dia} className="flex justify-between gap-4 text-muted-foreground">
                <span>{h.dia}</span>
                <span className="text-foreground">{h.horario}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted-foreground">
        Copyright {new Date().getFullYear()} {LOJA.nome}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
