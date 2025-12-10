export interface AgendamentoResponse{
    
    id: string,
    dataHora: Date,
    nomeCliente: string,
    servicosId: string[],
    valorTotal: number
}