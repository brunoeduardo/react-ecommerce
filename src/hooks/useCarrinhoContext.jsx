import { useContext} from "react"
import {CarrinhoContext} from "@/context/CarrinhoContext"
import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_QUANTIDADE } from "@/reducers/CarrinhoReducer"

const addProdutoAction = (novoProduto) => ({
    type: ADD_PRODUTO,
    payload: novoProduto
})

const removeProdutoAction = (idProduto) => ({
    type: REMOVE_PRODUTO,
    payload: idProduto
})

const updateProdutoAction = (idProduto, quantidade) => ({
    type: UPDATE_QUANTIDADE,
    payload: {idProduto, quantidade}
})

export const useCarrinhoContext = () => {
    const {carrinho, dispatch, quantidade, valorTotal} = useContext(CarrinhoContext)

    const adicionarProduto = (novoProduto) => {
        dispatch(addProdutoAction(novoProduto))
    }

    const removerProduto = (idProduto) => {
        const produto = carrinho.find((item) => item.id === idProduto)

        if(produto && produto.quantidade > 1) {
            dispatch(updateProdutoAction(idProduto, produto.quantidade -1))
        } else {
            dispatch(removeProdutoAction(idProduto))
        }
    } 

    const removerProdutoCarrinho = (idProduto) => {
        dispatch(removeProdutoAction(idProduto))
    } 


    return {carrinho, dispatch, adicionarProduto, removerProduto, removerProdutoCarrinho, valorTotal, quantidade}
}
