import { CATEGORIAS, type CategoriaId } from "@/lib/menu";

export function CategoryNav({
  ativa,
  onSelecionar,
}: {
  ativa: CategoriaId;
  onSelecionar: (id: CategoriaId) => void;
}) {
  return (
    <nav
      aria-label="Categorias do cardapio"
      className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelecionar(c.id)}
            aria-current={ativa === c.id}
            className={`h-11 shrink-0 rounded-md px-4 font-display text-lg tracking-wide transition-colors ${
              ativa === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {c.nome.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );
}
