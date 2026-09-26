import { brl } from "@/lib/format";
import { LOJA } from "@/lib/menu";
import { precoItem, type ItemCarrinho } from "@/context/cart";

export type DadosPedido = {
  itens: ItemCarrinho[];
  cliente: string;
  telefone: string;
  modo: "entrega" | "retirada";
  endereco: string;
  bairro: string;
  taxa: number;
  cupom: string | null;
  descontoPercentual: number;
  subtotal: number;
  desconto: number;
  total: number;
  pagamento: string;
  troco: string;
  tempoEstimado: number;
};

export function montarTextoPedido(p: DadosPedido): string {
  const linhas: string[] = [];
  linhas.push(`*NOVO PEDIDO: ${LOJA.nome}*`);
  linhas.push("");
  linhas.push(`Cliente: ${p.cliente}`);
  linhas.push(`Telefone: ${p.telefone}`);
  linhas.push(`Tipo: ${p.modo === "entrega" ? "Entrega" : "Retirada"}`);
  if (p.modo === "entrega") {
    linhas.push(`Endereco: ${p.endereco}`);
    linhas.push(`Bairro: ${p.bairro} (Taxa ${brl(p.taxa)})`);
  }
  linhas.push("--------------------------------");
  linhas.push("ITENS DO PEDIDO:");
  p.itens.forEach((item, indice) => {
    linhas.push(`${indice + 1}. ${item.nome} x${item.quantidade}`);
    if (item.ponto) linhas.push(`   Ponto: ${item.ponto}`);
    item.adicionais.forEach((a) => linhas.push(`   + ${a.nome} (+${brl(a.preco)})`));
    if (item.observacao) linhas.push(`   Obs: ${item.observacao}`);
    linhas.push(`   Subtotal: ${brl(precoItem(item))}`);
  });
  linhas.push("--------------------------------");
  linhas.push(`*Subtotal*: ${brl(p.subtotal)}`);
  if (p.cupom) linhas.push(`*Cupom* ${p.cupom} (-${p.descontoPercentual}%): -${brl(p.desconto)}`);
  if (p.modo === "entrega") linhas.push(`*Taxa de entrega*: ${brl(p.taxa)}`);
  linhas.push(`*TOTAL*: ${brl(p.total)}`);
  linhas.push(`*Pagamento*: ${p.pagamento}${p.troco ? ` (troco para ${p.troco})` : ""}`);
  linhas.push(`*Tempo estimado*: ~${p.tempoEstimado}min`);
  return linhas.join("\n");
}

export function linkWhatsapp(texto: string): string {
  return `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
}
