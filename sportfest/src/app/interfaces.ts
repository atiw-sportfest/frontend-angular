export interface Variable {
    var_id?: number,
    name?: string,
    desc?: string,
    expressionParameter?: string,
    typ?: Datentyp,
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

export interface Regel {
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
    id?: number,
    name?: string,
    beschreibung?: string,
    aktiviert?: boolean,
    klassenleistung?: boolean,
    regel?: RegelNEU,
    variablen?: VariableNEU[],
    versus?: boolean
}
export interface RegelNEU {
    id?: number,
    script?: string
}
export interface VariableNEU {
    id?: number,
    bezeichnung?: string
    typ?: TypNEU
}
export interface TypNEU {
    id?: number,
    datentyp?: string,
    einheit?: string,
    format?: string,
    bsp?: string
}

export interface ErgebnisNEU {
    id?: number,
    leistungen?: LeistungNEU[],
    klasse?: Klasse,
    schueler?: SchuelerNEU,
    disziplin?: DisziplinNEU,
    punkte?: number,
    rang?: number, //Nur notwendig für das Anzeigen der Ergebnisse, kommt nicht vom Backend
    versus?: number,
    visibleVersus?: number //Nur notwendig für das Anzeigen der Ergebnisse, berechnet aus versus vom Backend
}

export interface LeistungNEU {
    id?: number,
    wert?: string,
    variable?: VariableNEU
}
export interface AnmeldungNEU {
    id?: number,
    schueler?: SchuelerNEU,
    disziplin?: number 
}
export interface SchuelerNEU {
    sid?: number,
    vorname?: string,
    name?: string,
    klasse?: Klasse,
    gid?: number
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