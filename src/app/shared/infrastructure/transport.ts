import { environment } from '../../../environments/environment';
import { resolveTransport } from './transport-policy';

export function transportConfig(search = location.search, hostname = location.hostname) {
  return resolveTransport(
    search,
    hostname,
    environment.apiBaseUrl,
    sessionStorage.getItem('ai-todu-transport'),
  );
}
