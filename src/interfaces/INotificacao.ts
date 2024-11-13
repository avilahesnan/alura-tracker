export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO   
}

export default interface INoticiacao {
    id: number
    titulo: string
    texto: string
    tipo: TipoNotificacao
}
