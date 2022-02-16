export interface Nivel {
    nivel: string
}

export interface NivelAttributes extends Nivel{
    id?: number
}

export interface NivelResponse extends NivelAttributes{
    numeroDevs: number
}

export interface Desenvolvedor {
    nome: string
    sexo?: string
    datanascimento: Date
    idade: number
    hobby?: string
    nivel_id: number
}

export interface DesenvolvedorAttributes extends Desenvolvedor{ 
    id: number
    nivel?: Nivel
}