import smashClassic from "@/assets/smash-classic.jpg";
import smashBacon from "@/assets/smash-bacon.jpg";
import smashBbq from "@/assets/smash-bbq.jpg";
import monsterSmash from "@/assets/monster-smash.jpg";
import smashTrufado from "@/assets/smash-trufado.jpg";
import smashPicante from "@/assets/smash-picante.jpg";
import doubleSmash from "@/assets/double-smash.jpg";
import combo from "@/assets/combo.jpg";
import batataFrita from "@/assets/batata-frita.jpg";
import batataBacon from "@/assets/batata-bacon.jpg";
import onionRings from "@/assets/onion-rings.jpg";
import queijoEmpanado from "@/assets/queijo-empanado.jpg";
import refriLata from "@/assets/refrigerante-lata.jpg";
import refriGarrafa from "@/assets/refrigerante-garrafa.jpg";
import milkChocolate from "@/assets/milkshake-chocolate.jpg";
import milkMorango from "@/assets/milkshake-morango.jpg";
import brownieImg from "@/assets/brownie.jpg";
import churrosImg from "@/assets/churros.jpg";
import petitImg from "@/assets/petit-gateau.jpg";

export type CategoriaId = "lanches" | "combos" | "acompanhamentos" | "bebidas" | "sobremesas";

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  tempo: number;
  categoria: CategoriaId;
  imagem: string;
  montavel: boolean;
};

export const CATEGORIAS: { id: CategoriaId; nome: string }[] = [
  { id: "lanches", nome: "Lanches" },
  { id: "combos", nome: "Combos" },
  { id: "acompanhamentos", nome: "Acompanhamentos" },
  { id: "bebidas", nome: "Bebidas" },
  { id: "sobremesas", nome: "Sobremesas" },
];

export const PONTOS_CARNE = ["Mal passado", "Ao ponto", "Bem passado"] as const;

export type Adicional = { id: string; nome: string; preco: number };

export const ADICIONAIS: Adicional[] = [
  { id: "bacon", nome: "Bacon Crocante", preco: 5 },
  { id: "cheddar", nome: "Queijo Cheddar Extra", preco: 4 },
  { id: "ovo", nome: "Ovo", preco: 3 },
  { id: "cebola", nome: "Cebola Caramelizada", preco: 4 },
  { id: "molho", nome: "Molho Especial", preco: 3 },
  { id: "jalapeno", nome: "Jalapeno", preco: 3 },
];

export const PRODUTOS: Produto[] = [
  { id: "smash-classic", nome: "Smash Classic", descricao: "Blend bovino 120g prensado na chapa, queijo prato derretido, picles e molho da casa no pao brioche.", preco: 28.9, tempo: 15, categoria: "lanches", imagem: smashClassic, montavel: true },
  { id: "smash-bacon", nome: "Smash Bacon", descricao: "Blend 120g, fatias generosas de bacon crocante e cheddar derretendo no pao brioche tostado.", preco: 32.9, tempo: 15, categoria: "lanches", imagem: smashBacon, montavel: true },
  { id: "smash-bbq", nome: "Smash BBQ", descricao: "Dois blends, molho barbecue defumado, cheddar e cebola crispy no pao brioche.", preco: 34.9, tempo: 18, categoria: "lanches", imagem: smashBbq, montavel: true },
  { id: "monster-smash", nome: "Monster Smash", descricao: "Tres blends de 120g, bacon, cheddar duplo e molho especial. Fome de verdade.", preco: 42.9, tempo: 20, categoria: "lanches", imagem: monsterSmash, montavel: true },
  { id: "smash-trufado", nome: "Smash Trufado", descricao: "Blend 160g, creme trufado, cogumelos salteados e queijo brie no pao brioche.", preco: 38.9, tempo: 18, categoria: "lanches", imagem: smashTrufado, montavel: true },
  { id: "smash-picante", nome: "Smash Picante", descricao: "Blend 120g, jalapeno, molho de pimenta artesanal e cheddar bem derretido.", preco: 33.9, tempo: 15, categoria: "lanches", imagem: smashPicante, montavel: true },

  { id: "combo-classic", nome: "Combo Classic", descricao: "Smash Classic, batata frita porcao individual e refrigerante lata 350ml.", preco: 45.9, tempo: 18, categoria: "combos", imagem: combo, montavel: true },
  { id: "combo-bacon", nome: "Combo Bacon", descricao: "Smash Bacon, batata frita porcao individual e refrigerante lata 350ml.", preco: 52.9, tempo: 18, categoria: "combos", imagem: doubleSmash, montavel: true },
  { id: "combo-duplo", nome: "Combo Duplo", descricao: "Dois Smash Bacon, batata grande para dividir e dois refrigerantes lata.", preco: 79.9, tempo: 22, categoria: "combos", imagem: combo, montavel: true },
  { id: "combo-monster", nome: "Combo Monster", descricao: "Monster Smash, batata com cheddar e bacon e refrigerante 600ml.", preco: 69.9, tempo: 25, categoria: "combos", imagem: monsterSmash, montavel: true },

  { id: "batata-frita", nome: "Batata Frita", descricao: "Porcao de batata rustica bem crocante com sal marinho.", preco: 16.9, tempo: 10, categoria: "acompanhamentos", imagem: batataFrita, montavel: false },
  { id: "batata-bacon", nome: "Batata com Cheddar e Bacon", descricao: "Batata crocante coberta com cheddar cremoso e bacon em cubos.", preco: 24.9, tempo: 12, categoria: "acompanhamentos", imagem: batataBacon, montavel: false },
  { id: "onion-rings", nome: "Onion Rings", descricao: "Aneis de cebola empanados na hora com molho da casa.", preco: 19.9, tempo: 10, categoria: "acompanhamentos", imagem: onionRings, montavel: false },
  { id: "queijo-empanado", nome: "Queijo Empanado", descricao: "Palitos de queijo empanados, servidos com geleia de pimenta.", preco: 21.9, tempo: 8, categoria: "acompanhamentos", imagem: queijoEmpanado, montavel: false },

  { id: "coca-350", nome: "Refrigerante Lata 350ml", descricao: "Refrigerante de cola gelado, lata 350ml.", preco: 7.9, tempo: 1, categoria: "bebidas", imagem: refriLata, montavel: false },
  { id: "coca-600", nome: "Refrigerante 600ml", descricao: "Refrigerante de cola gelado, garrafa 600ml.", preco: 10.9, tempo: 1, categoria: "bebidas", imagem: refriGarrafa, montavel: false },
  { id: "guarana", nome: "Guarana 350ml", descricao: "Guarana gelado, lata 350ml.", preco: 6.9, tempo: 1, categoria: "bebidas", imagem: refriLata, montavel: false },
  { id: "milkshake-choc", nome: "Milkshake de Chocolate", descricao: "Milkshake cremoso 400ml com calda de chocolate.", preco: 18.9, tempo: 5, categoria: "bebidas", imagem: milkChocolate, montavel: false },
  { id: "milkshake-mor", nome: "Milkshake de Morango", descricao: "Milkshake cremoso 400ml com morango de verdade.", preco: 18.9, tempo: 5, categoria: "bebidas", imagem: milkMorango, montavel: false },
  { id: "milkshake-ovo", nome: "Milkshake de Ovomaltine", descricao: "Milkshake cremoso 400ml com crocante de ovomaltine.", preco: 19.9, tempo: 5, categoria: "bebidas", imagem: milkChocolate, montavel: false },

  { id: "brownie", nome: "Brownie com Sorvete", descricao: "Brownie quentinho com bola de sorvete de creme e calda.", preco: 22.9, tempo: 8, categoria: "sobremesas", imagem: brownieImg, montavel: false },
  { id: "churros", nome: "Churros da Casa", descricao: "Seis churros polvilhados com acucar e doce de leite para mergulhar.", preco: 14.9, tempo: 6, categoria: "sobremesas", imagem: churrosImg, montavel: false },
  { id: "petit", nome: "Petit Gateau", descricao: "Bolo com recheio de chocolate quente e sorvete de creme.", preco: 26.9, tempo: 10, categoria: "sobremesas", imagem: petitImg, montavel: false },
];

export const CUPONS: Record<string, number> = {
  PRIMEIRACOMPRA: 10,
  FOME15: 15,
  MEGA20: 20,
  LIVE10: 10,
};

export const BAIRROS: { nome: string; taxa: number }[] = [
  { nome: "Centro", taxa: 5 },
  { nome: "Jardins", taxa: 7 },
  { nome: "Moema", taxa: 12 },
  { nome: "Pinheiros", taxa: 8 },
  { nome: "Vila Madalena", taxa: 9 },
  { nome: "Itaim Bibi", taxa: 10 },
  { nome: "Brooklin", taxa: 11 },
  { nome: "Vila Olimpia", taxa: 10 },
];

export const LOJA = {
  nome: "BURGUER AMOSTRA",
  whatsapp: "5511999999999",
  endereco: "Rua das Brasas, 180, Vila Madalena, Sao Paulo",
  horarios: [
    { dia: "Segunda", horario: "18h as 23h" },
    { dia: "Terca", horario: "18h as 23h" },
    { dia: "Quarta", horario: "18h as 23h" },
    { dia: "Quinta", horario: "18h as 23h30" },
    { dia: "Sexta", horario: "18h as 01h" },
    { dia: "Sabado", horario: "18h as 01h" },
    { dia: "Domingo", horario: "18h as 23h" },
  ],
  abreHora: 18,
  fechaHora: 23,
};
