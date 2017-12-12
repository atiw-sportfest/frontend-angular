/**
 * Sportfest Backend
 * Sportfest backend
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models                                           from '../model/models';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ErgebnisApi {

    protected basePath = 'https://sportfest.atiw.de/backend';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     * 
     * @summary Ergebnisse einer Disziplin anzeigen
     * @param did Disziplin-ID
     */
    public disziplinDidErgebnisseGet(did: number, extraHttpRequestParams?: any): Observable<Array<models.Ergebnis>> {
        return this.disziplinDidErgebnisseGetWithHttpInfo(did, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Für die anzulegenden Ergebnisse wird die Disziplin-ID mit der im Pfad angegenen ID überschrieben.
     * @summary Ergebnisse für eine Disziplin anlegen
     * @param did Disziplin-ID
     * @param ergebnisse Ergebnisse
     */
    public disziplinDidErgebnissePost(did: number, ergebnisse?: Array<models.Ergebnis>, extraHttpRequestParams?: any): Observable<Array<models.Ergebnis>> {
        return this.disziplinDidErgebnissePostWithHttpInfo(did, ergebnisse, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Ergebnisse für einen Teilnehmer einer Disziplin anzeigen
     * @param did Disziplin-ID
     * @param tid Schueler- oder Klassen-ID
     */
    public disziplinDidErgebnisseTidGet(did: number, tid: number, extraHttpRequestParams?: any): Observable<Array<models.Ergebnis>> {
        return this.disziplinDidErgebnisseTidGetWithHttpInfo(did, tid, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Leistungen einer Disziplin anzeigen
     * @param did Disziplin-ID
     */
    public disziplinDidLeistungenGet(did: number, extraHttpRequestParams?: any): Observable<Array<models.Leistung>> {
        return this.disziplinDidLeistungenGetWithHttpInfo(did, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Leistungen fuer eine Disziplin anlegen
     * @param did Disziplin-ID
     * @param tid Schueler- oder Klassen-ID
     * @param leistungen Leistungen
     */
    public disziplinDidLeistungenTidPost(did: number, tid: number, leistungen: Array<models.Leistung>, extraHttpRequestParams?: any): Observable<Array<models.Leistung>> {
        return this.disziplinDidLeistungenTidPostWithHttpInfo(did, tid, leistungen, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Ergebnis löschen
     * @param eid Ergebnis-ID
     */
    public ergebnisEidDelete(eid: number, extraHttpRequestParams?: any): Observable<{}> {
        return this.ergebnisEidDeleteWithHttpInfo(eid, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Ergebnis anzeigen
     * @param eid Ergebnis-ID
     */
    public ergebnisEidGet(eid: number, extraHttpRequestParams?: any): Observable<models.Ergebnis> {
        return this.ergebnisEidGetWithHttpInfo(eid, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Ergebnisse abrufen
     */
    public ergebnisGet(extraHttpRequestParams?: any): Observable<Array<models.Ergebnis>> {
        return this.ergebnisGetWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Ergebnisse eines Versus anzeigen
     * @param vid Versus-ID
     */
    public ergebnisVersusVidGet(vid: number, extraHttpRequestParams?: any): Observable<Array<models.Ergebnis>> {
        return this.ergebnisVersusVidGetWithHttpInfo(vid, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Leistungen anzeigen
     */
    public leistungGet(extraHttpRequestParams?: any): Observable<Array<models.Leistung>> {
        return this.leistungGetWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Leistung löschen
     * @param lid Leistungs-ID
     */
    public leistungLidDelete(lid: number, extraHttpRequestParams?: any): Observable<{}> {
        return this.leistungLidDeleteWithHttpInfo(lid, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Leistung anzeigen
     * @param lid Leistungs-ID
     */
    public leistungLidGet(lid: number, extraHttpRequestParams?: any): Observable<models.Leistung> {
        return this.leistungLidGetWithHttpInfo(lid, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * 
     * @summary Leistung bearbeiten
     * @param lid Leistungs-ID
     * @param leistung 
     */
    public leistungLidPost(lid: number, leistung?: models.Leistung, extraHttpRequestParams?: any): Observable<models.Leistung> {
        return this.leistungLidPostWithHttpInfo(lid, leistung, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }


    /**
     * Ergebnisse einer Disziplin anzeigen
     * 
     * @param did Disziplin-ID
     */
    public disziplinDidErgebnisseGetWithHttpInfo(did: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/disziplin/${did}/ergebnisse'
                    .replace('${' + 'did' + '}', String(did));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'did' is not null or undefined
        if (did === null || did === undefined) {
            throw new Error('Required parameter did was null or undefined when calling disziplinDidErgebnisseGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Ergebnisse für eine Disziplin anlegen
     * Für die anzulegenden Ergebnisse wird die Disziplin-ID mit der im Pfad angegenen ID überschrieben.
     * @param did Disziplin-ID
     * @param ergebnisse Ergebnisse
     */
    public disziplinDidErgebnissePostWithHttpInfo(did: number, ergebnisse?: Array<models.Ergebnis>, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/disziplin/${did}/ergebnisse'
                    .replace('${' + 'did' + '}', String(did));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'did' is not null or undefined
        if (did === null || did === undefined) {
            throw new Error('Required parameter did was null or undefined when calling disziplinDidErgebnissePost.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: ergebnisse == null ? '' : JSON.stringify(ergebnisse), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Ergebnisse für einen Teilnehmer einer Disziplin anzeigen
     * 
     * @param did Disziplin-ID
     * @param tid Schueler- oder Klassen-ID
     */
    public disziplinDidErgebnisseTidGetWithHttpInfo(did: number, tid: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/disziplin/${did}/ergebnisse/${tid}'
                    .replace('${' + 'did' + '}', String(did))
                    .replace('${' + 'tid' + '}', String(tid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'did' is not null or undefined
        if (did === null || did === undefined) {
            throw new Error('Required parameter did was null or undefined when calling disziplinDidErgebnisseTidGet.');
        }
        // verify required parameter 'tid' is not null or undefined
        if (tid === null || tid === undefined) {
            throw new Error('Required parameter tid was null or undefined when calling disziplinDidErgebnisseTidGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Leistungen einer Disziplin anzeigen
     * 
     * @param did Disziplin-ID
     */
    public disziplinDidLeistungenGetWithHttpInfo(did: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/disziplin/${did}/leistungen'
                    .replace('${' + 'did' + '}', String(did));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'did' is not null or undefined
        if (did === null || did === undefined) {
            throw new Error('Required parameter did was null or undefined when calling disziplinDidLeistungenGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Leistungen fuer eine Disziplin anlegen
     * 
     * @param did Disziplin-ID
     * @param tid Schueler- oder Klassen-ID
     * @param leistungen Leistungen
     */
    public disziplinDidLeistungenTidPostWithHttpInfo(did: number, tid: number, leistungen: Array<models.Leistung>, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/disziplin/${did}/leistungen/${tid}'
                    .replace('${' + 'did' + '}', String(did))
                    .replace('${' + 'tid' + '}', String(tid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'did' is not null or undefined
        if (did === null || did === undefined) {
            throw new Error('Required parameter did was null or undefined when calling disziplinDidLeistungenTidPost.');
        }
        // verify required parameter 'tid' is not null or undefined
        if (tid === null || tid === undefined) {
            throw new Error('Required parameter tid was null or undefined when calling disziplinDidLeistungenTidPost.');
        }
        // verify required parameter 'leistungen' is not null or undefined
        if (leistungen === null || leistungen === undefined) {
            throw new Error('Required parameter leistungen was null or undefined when calling disziplinDidLeistungenTidPost.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: leistungen == null ? '' : JSON.stringify(leistungen), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Ergebnis löschen
     * 
     * @param eid Ergebnis-ID
     */
    public ergebnisEidDeleteWithHttpInfo(eid: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/ergebnis/${eid}'
                    .replace('${' + 'eid' + '}', String(eid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'eid' is not null or undefined
        if (eid === null || eid === undefined) {
            throw new Error('Required parameter eid was null or undefined when calling ergebnisEidDelete.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Ergebnis anzeigen
     * 
     * @param eid Ergebnis-ID
     */
    public ergebnisEidGetWithHttpInfo(eid: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/ergebnis/${eid}'
                    .replace('${' + 'eid' + '}', String(eid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'eid' is not null or undefined
        if (eid === null || eid === undefined) {
            throw new Error('Required parameter eid was null or undefined when calling ergebnisEidGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Ergebnisse abrufen
     * 
     */
    public ergebnisGetWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/ergebnis';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Ergebnisse eines Versus anzeigen
     * 
     * @param vid Versus-ID
     */
    public ergebnisVersusVidGetWithHttpInfo(vid: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/ergebnis/versus/${vid}'
                    .replace('${' + 'vid' + '}', String(vid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'vid' is not null or undefined
        if (vid === null || vid === undefined) {
            throw new Error('Required parameter vid was null or undefined when calling ergebnisVersusVidGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Leistungen anzeigen
     * 
     */
    public leistungGetWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/leistung';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Leistung löschen
     * 
     * @param lid Leistungs-ID
     */
    public leistungLidDeleteWithHttpInfo(lid: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/leistung/${lid}'
                    .replace('${' + 'lid' + '}', String(lid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'lid' is not null or undefined
        if (lid === null || lid === undefined) {
            throw new Error('Required parameter lid was null or undefined when calling leistungLidDelete.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Leistung anzeigen
     * 
     * @param lid Leistungs-ID
     */
    public leistungLidGetWithHttpInfo(lid: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/leistung/${lid}'
                    .replace('${' + 'lid' + '}', String(lid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'lid' is not null or undefined
        if (lid === null || lid === undefined) {
            throw new Error('Required parameter lid was null or undefined when calling leistungLidGet.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Leistung bearbeiten
     * 
     * @param lid Leistungs-ID
     * @param leistung 
     */
    public leistungLidPostWithHttpInfo(lid: number, leistung?: models.Leistung, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/leistung/${lid}'
                    .replace('${' + 'lid' + '}', String(lid));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'lid' is not null or undefined
        if (lid === null || lid === undefined) {
            throw new Error('Required parameter lid was null or undefined when calling leistungLidPost.');
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json'
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: leistung == null ? '' : JSON.stringify(leistung), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
