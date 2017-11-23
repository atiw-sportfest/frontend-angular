export interface Variable {
    var_id?: number,
    name?: string,
    desc?:string,
    expressionParameter?:string,
    typ?:Datentyp,
    sortAsc: boolean,
    sortIndex: number
}

export interface Datentyp {
    tid?: string
    zustaende?: Zustand[];
}

export interface Zustand {
    zid?: number,
    name?: string,
    desc?: string,
    value?: string
}

export interface Regel{
    index?: string;
    expression?: string,
    points?: number,
}

export interface Disziplin {
    aktiviert?: boolean,
    beschreibung?: string,
    did?: number,
    kontrahentenAnzahl?: number,
    maxTeilnehmer?: number,
    minTeilnehmer?: number,
    name?: string,
    regeln?: Regel[],
    teamleistung?: boolean,
    variablen?: Variable[]
}

export interface DisziplinNEU {
    did?: number,
    name?: string,
    beschreibung?: string,
    team?: boolean,
    regel?: RegelNEU,
    variablen?: VariableNEU[]
}
export interface RegelNEU{
    index?: number,
    script?: string
}
export interface VariableNEU{
    bezeichnung?: string
    typ?: TypNEU
}
export interface TypNEU{
    datentyp: string,
    einheit: string,
    format: string,
    bsp?: string
}
export interface Klasse {
    kid?: number,
    name?: string
}
export interface Schueler {
    sid?: number,
    vorname?: string,
    name?: string,
    kid?: number,
    gid?: number
}
export interface Ergebnis {
    ergebnis?: string,
    firstEntry?: boolean
}

export interface Ergebnis2 {
    wert?: string,
    "var"?: VariableValue
}

export interface VariableValue {
    var_id?: number
}

export interface Leistung {
    did?: number,
    kid?: number,
    sid?: number,
    ergebnisse: Array<Ergebnis2>,
    versus: number
}