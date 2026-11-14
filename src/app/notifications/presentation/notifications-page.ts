import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Page, UI, State } from '../../shared/presentation/ui';
import { Row } from '../../shared/domain/models';
@Component({
  standalone: true,
  imports: [...UI, State, RouterLink],
  template: `<header class="page-header">
      <h1>{{ i.t('notifications') }}</h1>
      <button mat-stroked-button (click)="reload()" [disabled]="busy()">
        {{ i.t('refresh') }}
      </button>
    </header>
    <app-state [busy]="busy() || running()" [error]="error()" />
    <section class="surface notification-list">
      @for (n of rows(); track n.id) {
        <article>
          <div>
            <strong>{{ i.t(n.type ?? '') }}</strong>
            @if (n.type === 'LOW_STOCK') {
              @if (product(n); as p) {
                <p>
                  <a routerLink="/inventory" [queryParams]="{ sku: p.sku }"
                    >{{ p.sku }} · {{ p.name }}</a
                  >
                </p>
              } @else {
                <p>
                  {{ i.t('notificationProductUnavailable')
                  }}{{ n.productId ? ': ' + n.productId : '' }}
                </p>
              }
            }
            <p>{{ i.formatDate(n.createdAt) }}</p>
          </div>
          @if (!n.read) {
            <button mat-stroked-button (click)="read(n)" [disabled]="running()">
              {{ i.t(running() ? 'saving' : 'read') }}
            </button>
          }
        </article>
      } @empty {
        <p class="empty">{{ i.t('empty') }}</p>
      }
    </section>`,
})
export class NotificationsPage extends Page {
  readonly products = signal<Row[]>([]);
  constructor() {
    super();
    void this.reload();
  }
  async reload() {
    this.busy.set(true);
    this.error.set('');
    try {
      const [notifications, products] = await Promise.all([
        this.api.list('notifications'),
        this.api.list('products'),
      ]);
      this.rows.set(notifications);
      this.products.set(products);
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.busy.set(false);
    }
  }
  product(n: Row) {
    return this.products().find((product) => product.id === n.productId);
  }
  read(n: Row) {
    void this.run('PATCH', 'notifications/' + n.id, { read: true }, () =>
      this.load('notifications'),
    );
  }
}
