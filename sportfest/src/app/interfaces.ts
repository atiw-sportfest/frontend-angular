export interface Variable {
    name?: string,
    expId?:string,
    desc?:string,
    typ?:string
}

export interface Regel{
    regeltext?: string,
    punkte?: number,
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
    ergebnis?: number,
    firstEntry?: boolean
}