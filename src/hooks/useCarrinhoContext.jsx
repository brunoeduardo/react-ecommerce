import { useContext, useEffect } from "react"
import {CarrinhoContext} from "@/context/CarrinhoContext"


export const useCarrinhoContext = () => {
    const {carrinho, setCarrinho, quantidade, setQuantidade, valorTotal, setValorTotal} = useContext(CarrinhoContext)

    const modificarQuantidade = (idProduto, quantidade) => {
        return carrinho.map((item) => {
            if(item.id === idProduto) item.quantidade += quantidade;
            return item;
        })
    }

    const adicionarProduto = (novoProduto) => {
        const existeProduto = carrinho.some((item) => item.id === novoProduto.id)

        if(!existeProduto) {
            novoProduto.quantidade = 1;
            return setCarrinho([...carrinho, novoProduto])
        }

        const listaProdutos = modificarQuantidade(novoProduto.id, 1)
        setCarrinho(listaProdutos)

    }

    const removerProduto = (idProduto) => {
        const produto = carrinho.find((item) => item.id === idProduto)
        const ultimoProduto = produto.quantidade === 1;
        let listaProdutos = []

        if(ultimoProduto) {
            listaProdutos = carrinho.filter((item) => item.id !== idProduto)
        } else {
            listaProdutos = modificarQuantidade(idProduto, -1)
        }

        setCarrinho(listaProdutos)
    } 

    const removerProdutoCarrinho = (idProduto) => {
        const listaProdutos = carrinho.filter((item) => item.id !== idProduto)
        setCarrinho(listaProdutos)
    } 

    useEffect(()=> {
        const {totalTemp, quantidadeTemp} = carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade

        }), {totalTemp: 0, quantidadeTemp:0})
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    }, [carrinho])


    return {carrinho, setCarrinho, adicionarProduto, removerProduto, removerProdutoCarrinho, valorTotal, quantidade}
}
