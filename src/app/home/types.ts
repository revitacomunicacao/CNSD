export interface IHome {
    id : number
    title : string
    banners : {
        nome : string
        foto: string
        link : string
    }[]
    ensino_cnsd : string
    ensino : {
        nome : string
        imagem : string
        link: string
    }[]
    diferenciais : {
        nome : string
        foto : string
        link : string
    }[]
    depoimentos : {
        nome : string
        foto : string
        periodo_estudo: string
        ocupacao : string
        depoimento : string
    }[]
    fique_ligado : {
        nome : string
        link : string
    }[]
}