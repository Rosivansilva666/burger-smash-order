import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brl, mascaraTelefone } from "@/lib/format";
import { BAIRROS } from "@/lib/menu";
import type { Checkout, ErrosCheckout } from "@/lib/checkout";

type Props = {
  dados: Checkout;
  erros: ErrosCheckout;
  aoMudar: (parcial: Partial<Checkout>) => void;
  aplicarCupom: () => void;
};

export function CheckoutFields({ dados, erros, aoMudar, aplicarCupom }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        {(["entrega", "retirada"] as const).map((modo) => (
          <button
            key={modo}
            type="button"
            onClick={() => aoMudar({ modo })}
            className={`h-11 rounded-md font-display text-lg tracking-wide transition-colors ${
              dados.modo === modo
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground"
            }`}
          >
            {modo === "entrega" ? "ENTREGA" : "RETIRADA"}
          </button>
        ))}
      </div>

      {dados.modo === "entrega" ? (
        <div className="space-y-3">
          <div>
            <Label htmlFor="bairro">Bairro</Label>
            <Select value={dados.bairro} onValueChange={(v) => aoMudar({ bairro: v })}>
              <SelectTrigger id="bairro" className="mt-1 h-11 w-full">
                <SelectValue placeholder="Escolha o bairro" />
              </SelectTrigger>
              <SelectContent>
                {BAIRROS.map((b) => (
                  <SelectItem key={b.nome} value={b.nome}>
                    {b.nome} ({brl(b.taxa)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="endereco">Endereco</Label>
            <Input
              id="endereco"
              className="mt-1 h-11"
              value={dados.endereco}
              onChange={(e) => aoMudar({ endereco: e.target.value })}
              placeholder="Rua, numero, complemento"
              aria-invalid={Boolean(erros.endereco)}
            />
            {erros.endereco ? <p className="mt-1 text-xs text-secondary">{erros.endereco}</p> : null}
          </div>
        </div>
      ) : null}

      <div>
        <Label htmlFor="cupom">Cupom</Label>
        <div className="mt-1 flex gap-2">
          <Input
            id="cupom"
            className="h-11"
            value={dados.cupomTexto}
            onChange={(e) => aoMudar({ cupomTexto: e.target.value.toUpperCase() })}
            placeholder="PRIMEIRACOMPRA"
          />
          <button
            type="button"
            onClick={aplicarCupom}
            className="h-11 shrink-0 rounded-md border border-primary px-4 font-semibold text-primary"
          >
            Aplicar
          </button>
        </div>
        {dados.cupomAplicado ? (
          <p className="mt-1 text-xs text-success">Cupom {dados.cupomAplicado} aplicado</p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            className="mt-1 h-11"
            value={dados.nome}
            onChange={(e) => aoMudar({ nome: e.target.value })}
            aria-invalid={Boolean(erros.nome)}
          />
          {erros.nome ? <p className="mt-1 text-xs text-secondary">{erros.nome}</p> : null}
        </div>
        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            className="mt-1 h-11"
            inputMode="tel"
            value={dados.telefone}
            onChange={(e) => aoMudar({ telefone: mascaraTelefone(e.target.value) })}
            placeholder="(11) 99999-9999"
            aria-invalid={Boolean(erros.telefone)}
          />
          {erros.telefone ? <p className="mt-1 text-xs text-secondary">{erros.telefone}</p> : null}
        </div>
      </div>

      <div>
        <Label>Pagamento</Label>
        <RadioGroup
          value={dados.pagamento}
          onValueChange={(v) => aoMudar({ pagamento: v as Checkout["pagamento"] })}
          className="mt-2 grid grid-cols-3 gap-2"
        >
          {(["PIX", "Dinheiro", "Cartao"] as const).map((p) => (
            <div key={p} className="flex h-11 items-center gap-2 rounded-md border border-border px-3">
              <RadioGroupItem value={p} id={`pg-${p}`} />
              <Label htmlFor={`pg-${p}`} className="cursor-pointer text-sm">
                {p}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {dados.pagamento === "Dinheiro" ? (
        <div>
          <Label htmlFor="troco">Troco para</Label>
          <Input
            id="troco"
            className="mt-1 h-11"
            value={dados.troco}
            onChange={(e) => aoMudar({ troco: e.target.value })}
            placeholder="R$ 100,00"
            aria-invalid={Boolean(erros.troco)}
          />
          {erros.troco ? <p className="mt-1 text-xs text-secondary">{erros.troco}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
