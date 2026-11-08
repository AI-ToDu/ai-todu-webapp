import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User, Row } from '../domain/models';
import { transportConfig } from './transport';
@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  private transport = transportConfig();
  readonly sessionKey =
    this.transport.mode === 'server' ? 'ai-todu-server-session' : 'ai-todu-session';
  private base = this.transport.baseUrl || new URL('api/v1/', document.baseURI).href;
  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const token = localStorage.getItem(this.sessionKey);
    try {
      return await firstValueFrom(
        this.http.request<T>(method, this.base + path, {
          ...(body !== undefined ? { body } : {}),
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'Accept-Language':
              localStorage.getItem('ai-todu-language') === 'es_419' ? 'es-419' : 'en-US',
            ...(this.transport.mode === 'http-demo' ? { 'X-AI-ToDu-Transport': 'http' } : {}),
          },
        }),
      );
    } catch (e) {
      throw new Error(
        e instanceof HttpErrorResponse ? (e.error?.code ?? 'NETWORK_ERROR') : 'NETWORK_ERROR',
      );
    }
  }
  async list(path: string) {
    return (await this.request<{ items: Row[] }>('GET', path)).items;
  }
}
@Injectable({ providedIn: 'root' })
export class Session {
  private api = inject(Api);
  readonly user = signal<User | null>(null);
  async restore() {
    if (localStorage.getItem(this.api.sessionKey)) {
      try {
        this.user.set(await this.api.request<User>('GET', 'auth/me'));
      } catch {
        localStorage.removeItem(this.api.sessionKey);
      }
    }
  }
  async login(email: string, password: string) {
    const result = await this.api.request<{ token: string; user: User }>('POST', 'auth/login', {
      email,
      password,
    });
    localStorage.setItem(this.api.sessionKey, result.token);
    this.user.set(result.user);
  }
  async logout() {
    try {
      await this.api.request('POST', 'auth/logout', {});
    } finally {
      localStorage.removeItem(this.api.sessionKey);
      this.user.set(null);
    }
  }
  can(section: string) {
    const role = this.user()?.role;
    if (role === 'ADMIN') return true;
    return role === 'WAREHOUSE'
      ? ['inventory', 'purchases', 'movements', 'notifications'].includes(section)
      : role === 'SALES'
        ? ['inventory', 'sales', 'returns', 'notifications'].includes(section)
        : role === 'LOGISTICS'
          ? ['inventory', 'logistics', 'notifications'].includes(section)
          : false;
  }
  firstRoute() {
    return this.user()?.role === 'ADMIN'
      ? 'overview'
      : this.user()?.role === 'SALES'
        ? 'sales'
        : this.user()?.role === 'LOGISTICS'
          ? 'logistics'
          : 'inventory';
  }
}
