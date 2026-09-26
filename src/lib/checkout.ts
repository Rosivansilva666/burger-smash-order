import { BAIRROS, CUPONS } from "@/lib/menu";
import { telefoneValido } from "@/lib/format";

export type Checkout = {
  modo: "entrega" | "retirada";
  bairro: string;
  endereco: string;
  cupomTexto: string;
  cupomAplicado: string | null;
  nome: string;
  telefone: string;
  pagamento: "PIX" | "Dinheiro" | "Cartao";
  troco: string;
};

export const CHECKOUT_INICIAL: Checkout = {
  modo: "entrega",
  bairro: BAIRROS[0].nome,
  endereco: "",
  cupomTexto: "",
  cupomAplicado: null,
  nome: "",
  telefone: "",
  pagamento: "PIX",
  troco: "",
};

export function taxaDoBairro(nome: string): number {
  return BAIRROS.find((b) => b.nome === nome)?.taxa ?? 0;
}

export function descontoPercentual(cupom: string | null): number {
  return cupom ? (CUPONS[cupom] ?? 0) : 0;
}

export function calcularTotais(subtotal: number, dados: Checkout) {
  const taxa = dados.modo === "entrega" ? taxaDoBairro(dados.bairro) : 0;
  const percentual = descontoPercentual(dados.cupomAplicado);
  const desconto = (subtotal * percentual) / 100;
  return { taxa, percentual, desconto, total: Math.max(0, subtotal - desconto) + taxa };
}

export type ErrosCheckout = Partial<Record<"nome" | "telefone" | "endereco" | "troco", string>>;

export function validarCheckout(dados: Checkout): ErrosCheckout {
  const erros: ErrosCheckout = {};
  if (dados.nome.trim().length < 3) erros.nome = "Informe seu nome completo";
  if (!telefoneValido(dados.telefone)) erros.telefone = "Telefone incompleto";
  if (dados.modo === "entrega" && dados.endereco.trim().length < 8)
    erros.endereco = "Informe rua, numero e complemento";
  if (dados.pagamento === "Dinheiro" && dados.troco.trim().length === 0)
    erros.troco = "Informe o valor do troco";
  return erros;
}
