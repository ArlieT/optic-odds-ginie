import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'opticodds/3.0.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  getSports(): Promise<FetchResponse<200, types.GetSportsResponse200>> {
    return this.core.fetch('/sports', 'get');
  }

  getSportsActive(): Promise<FetchResponse<200, types.GetSportsActiveResponse200>> {
    return this.core.fetch('/sports/active', 'get');
  }

  getLeagues(metadata?: types.GetLeaguesMetadataParam): Promise<FetchResponse<200, types.GetLeaguesResponse200>> {
    return this.core.fetch('/leagues', 'get', metadata);
  }

  getLeaguesActive(metadata?: types.GetLeaguesActiveMetadataParam): Promise<FetchResponse<200, types.GetLeaguesActiveResponse200>> {
    return this.core.fetch('/leagues/active', 'get', metadata);
  }

  getSportsbooks(): Promise<FetchResponse<200, types.GetSportsbooksResponse200>> {
    return this.core.fetch('/sportsbooks', 'get');
  }

  getSportsbooksActive(metadata?: types.GetSportsbooksActiveMetadataParam): Promise<FetchResponse<200, types.GetSportsbooksActiveResponse200>> {
    return this.core.fetch('/sportsbooks/active', 'get', metadata);
  }

  getSportsbooksLastPolled(metadata?: types.GetSportsbooksLastPolledMetadataParam): Promise<FetchResponse<200, types.GetSportsbooksLastPolledResponse200>> {
    return this.core.fetch('/sportsbooks/last-polled', 'get', metadata);
  }

  getMarkets(metadata?: types.GetMarketsMetadataParam): Promise<FetchResponse<200, types.GetMarketsResponse200>> {
    return this.core.fetch('/markets', 'get', metadata);
  }

  getMarketsActive(metadata: types.GetMarketsActiveMetadataParam): Promise<FetchResponse<200, types.GetMarketsActiveResponse200>> {
    return this.core.fetch('/markets/active', 'get', metadata);
  }

  getTeams(metadata?: types.GetTeamsMetadataParam): Promise<FetchResponse<200, types.GetTeamsResponse200>> {
    return this.core.fetch('/teams', 'get', metadata);
  }

  getPlayers(metadata?: types.GetPlayersMetadataParam): Promise<FetchResponse<200, types.GetPlayersResponse200>> {
    return this.core.fetch('/players', 'get', metadata);
  }

  getFixtures(metadata?: types.GetFixturesMetadataParam): Promise<FetchResponse<200, types.GetFixturesResponse200>> {
    return this.core.fetch('/fixtures', 'get', metadata);
  }

  getFixturesActive(metadata?: types.GetFixturesActiveMetadataParam): Promise<FetchResponse<200, types.GetFixturesActiveResponse200>> {
    return this.core.fetch('/fixtures/active', 'get', metadata);
  }

  getTournaments(metadata?: types.GetTournamentsMetadataParam): Promise<FetchResponse<200, types.GetTournamentsResponse200>> {
    return this.core.fetch('/tournaments', 'get', metadata);
  }

  getConferences(metadata?: types.GetConferencesMetadataParam): Promise<FetchResponse<200, types.GetConferencesResponse200>> {
    return this.core.fetch('/conferences', 'get', metadata);
  }

  getDivisions(metadata?: types.GetDivisionsMetadataParam): Promise<FetchResponse<200, types.GetDivisionsResponse200>> {
    return this.core.fetch('/divisions', 'get', metadata);
  }

  getFixturesOdds(metadata: types.GetFixturesOddsMetadataParam): Promise<FetchResponse<200, types.GetFixturesOddsResponse200>> {
    return this.core.fetch('/fixtures/odds', 'get', metadata);
  }

  getFixturesOddsHistorical(metadata: types.GetFixturesOddsHistoricalMetadataParam): Promise<FetchResponse<200, types.GetFixturesOddsHistoricalResponse200>> {
    return this.core.fetch('/fixtures/odds/historical', 'get', metadata);
  }

  getFixturesResults(metadata?: types.GetFixturesResultsMetadataParam): Promise<FetchResponse<200, types.GetFixturesResultsResponse200>> {
    return this.core.fetch('/fixtures/results', 'get', metadata);
  }

  getFixturesPlayerResults(metadata?: types.GetFixturesPlayerResultsMetadataParam): Promise<FetchResponse<200, types.GetFixturesPlayerResultsResponse200>> {
    return this.core.fetch('/fixtures/player-results', 'get', metadata);
  }

  getTournamentsResults(metadata: types.GetTournamentsResultsMetadataParam): Promise<FetchResponse<200, types.GetTournamentsResultsResponse200>> {
    return this.core.fetch('/tournaments/results', 'get', metadata);
  }

  getFixturesPlayerResultsLastX(metadata?: types.GetFixturesPlayerResultsLastXMetadataParam): Promise<FetchResponse<200, types.GetFixturesPlayerResultsLastXResponse200>> {
    return this.core.fetch('/fixtures/player-results/last-x', 'get', metadata);
  }

  getFixturesResultsHeadToHead(metadata: types.GetFixturesResultsHeadToHeadMetadataParam): Promise<FetchResponse<200, types.GetFixturesResultsHeadToHeadResponse200>> {
    return this.core.fetch('/fixtures/results/head-to-head', 'get', metadata);
  }

  getFutures(metadata?: types.GetFuturesMetadataParam): Promise<FetchResponse<200, types.GetFuturesResponse200>> {
    return this.core.fetch('/futures', 'get', metadata);
  }

  getFuturesOdds(metadata: types.GetFuturesOddsMetadataParam): Promise<FetchResponse<200, types.GetFuturesOddsResponse200>> {
    return this.core.fetch('/futures/odds', 'get', metadata);
  }

  getGraderOdds(metadata: types.GetGraderOddsMetadataParam): Promise<FetchResponse<200, types.GetGraderOddsResponse200>> {
    return this.core.fetch('/grader/odds', 'get', metadata);
  }

  getGraderFutures(metadata: types.GetGraderFuturesMetadataParam): Promise<FetchResponse<200, types.GetGraderFuturesResponse200>> {
    return this.core.fetch('/grader/futures', 'get', metadata);
  }

  getInjuries(metadata?: types.GetInjuriesMetadataParam): Promise<FetchResponse<200, types.GetInjuriesResponse200>> {
    return this.core.fetch('/injuries', 'get', metadata);
  }

  postParlayOdds(body: types.PostParlayOddsBodyParam): Promise<FetchResponse<200, types.PostParlayOddsResponse200>> {
    return this.core.fetch('/parlay/odds', 'post', body);
  }

  getStreamSportOdds(metadata: types.GetStreamSportOddsMetadataParam): Promise<FetchResponse<200, types.GetStreamSportOddsResponse200>> {
    return this.core.fetch('/stream/{sport}/odds', 'get', metadata);
  }

  getStreamSportResults(metadata: types.GetStreamSportResultsMetadataParam): Promise<FetchResponse<200, types.GetStreamSportResultsResponse200>> {
    return this.core.fetch('/stream/{sport}/results', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetConferencesMetadataParam, GetConferencesResponse200, GetDivisionsMetadataParam, GetDivisionsResponse200, GetFixturesActiveMetadataParam, GetFixturesActiveResponse200, GetFixturesMetadataParam, GetFixturesOddsHistoricalMetadataParam, GetFixturesOddsHistoricalResponse200, GetFixturesOddsMetadataParam, GetFixturesOddsResponse200, GetFixturesPlayerResultsLastXMetadataParam, GetFixturesPlayerResultsLastXResponse200, GetFixturesPlayerResultsMetadataParam, GetFixturesPlayerResultsResponse200, GetFixturesResponse200, GetFixturesResultsHeadToHeadMetadataParam, GetFixturesResultsHeadToHeadResponse200, GetFixturesResultsMetadataParam, GetFixturesResultsResponse200, GetFuturesMetadataParam, GetFuturesOddsMetadataParam, GetFuturesOddsResponse200, GetFuturesResponse200, GetGraderFuturesMetadataParam, GetGraderFuturesResponse200, GetGraderOddsMetadataParam, GetGraderOddsResponse200, GetInjuriesMetadataParam, GetInjuriesResponse200, GetLeaguesActiveMetadataParam, GetLeaguesActiveResponse200, GetLeaguesMetadataParam, GetLeaguesResponse200, GetMarketsActiveMetadataParam, GetMarketsActiveResponse200, GetMarketsMetadataParam, GetMarketsResponse200, GetPlayersMetadataParam, GetPlayersResponse200, GetSportsActiveResponse200, GetSportsResponse200, GetSportsbooksActiveMetadataParam, GetSportsbooksActiveResponse200, GetSportsbooksLastPolledMetadataParam, GetSportsbooksLastPolledResponse200, GetSportsbooksResponse200, GetStreamSportOddsMetadataParam, GetStreamSportOddsResponse200, GetStreamSportResultsMetadataParam, GetStreamSportResultsResponse200, GetTeamsMetadataParam, GetTeamsResponse200, GetTournamentsMetadataParam, GetTournamentsResponse200, GetTournamentsResultsMetadataParam, GetTournamentsResultsResponse200, PostParlayOddsBodyParam, PostParlayOddsResponse200 } from './types';
