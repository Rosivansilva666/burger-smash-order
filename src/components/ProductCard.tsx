import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { brl } from "@/lib/format";
import type { Produto } from "@/lib/menu";

export function ProductCard({
  produto,
  indice,
  onAbrir,
}: {
  produto: Produto;
  indice: number;
  onAbrir: (p: Produto) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(indice * 0.05, 0.3) }}
      className="group overflow-hidden rounded-lg border border-border bg-card transition-transform md:hover:scale-[1.02]"
    >
      <button
        type="button"
        onClick={() => onAbrir(produto)}
        className="block w-full text-left"
        aria-label={`Abrir ${produto.nome}`}
      >
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />
      </button>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-display text-xl leading-none text-foreground">
          {produto.nome.toUpperCase()}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{produto.descricao}</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl leading-none text-primary">{brl(produto.preco)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{produto.tempo} min</p>
          </div>
          <button
            type="button"
            onClick={() => onAbrir(produto)}
            aria-label={`Adicionar ${produto.nome}`}
            className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            <Plus className="size-6" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
