import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken('http://localhost:8080/backend');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
