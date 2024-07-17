import { createContext, useEffect, useMemo, useReducer, useState }  from "react";
import { CarrinhoReducer } from "@/reducers/CarrinhoReducer";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({children}) => {   
    const [carrinho, dispatch] = useReducer(CarrinhoReducer, []) 
    const [quantidade, setQuantidade] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)
    const {totalTemp, quantidadeTemp} = useMemo(() => {return carrinho.reduce((acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade
    }), {totalTemp: 0, quantidadeTemp:0});}, [carrinho]);

    useEffect(()=> {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    })

    return(
        <CarrinhoContext.Provider value={{carrinho, dispatch, quantidade, valorTotal}}>
            {children}
        </CarrinhoContext.Provider>
    )
}
