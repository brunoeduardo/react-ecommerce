import React from "react";
import Produto from "./Produto";
import produtos from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { useContext } from "react";
import {CarrinhoContext} from "@/context/CarrinhoContext"
const Produtos = () => {
  const {carrinho, setCarrinho} = useContext(CarrinhoContext);

  const adicionarProduto = (novoProduto) => {
    const existeProduto = carrinho.some((item) => item.id === novoProduto.id)

    if(!existeProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho([...carrinho, novoProduto])
    }

    setCarrinho((carrinho) => carrinho.map((item) => {
      if(item.id === novoProduto.id) item.quantidade += 1;

      return item;
    }))

  }

  return (
    <section role="produtos" aria-label="Produtos que estão bombando!">
      <Titulo>Produtos que estão bombando!</Titulo>
      <div className="container row mx-auto">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            {...produto}
            adicionarProduto={adicionarProduto}
          />
        ))}
      </div>
    </section>
  );
};

export default Produtos;
