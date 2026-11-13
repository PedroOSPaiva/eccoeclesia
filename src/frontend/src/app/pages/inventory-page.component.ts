import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../core/services/inventory.service';
import { CreateConsumableDto, CreateDurableDto } from '../core/models/inventory.model';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  template: `
    <div class="inventory-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Gestão de Patrimônio & Almoxarifado</span>
          <h1>Inventário Comunitário</h1>
          <p class="subtitle">Controle de bens duráveis (patrimônio) e itens de consumo paroquial.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="inventoryService.loading()">
            Atualizar
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleForm()">
            + Novo Item
          </button>
        </div>
      </header>

      @if (inventoryService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="inventoryService.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Alertas de Estoque Mínimo -->
      @if (inventoryService.lowStockCount() > 0) {
        <div class="alert alert-warning">
          <strong>Atenção ao Almoxarifado:</strong> Existem {{ inventoryService.lowStockCount() }} item(ns) abaixo da quantidade mínima recomendada.
        </div>
      }

      <!-- Formulário de Cadastro -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Cadastrar Item no Inventário</h3>
            <button class="btn-close" (click)="toggleForm()">&times;</button>
          </div>
          <form [formGroup]="itemForm" (ngSubmit)="submitItem()" class="item-form">
            <div class="form-row">
              <div class="field">
                <label for="itemType">Tipo de Bem</label>
                <select id="itemType" formControlName="type" (change)="onTypeChange()">
                  <option value="DURABLE">Bem Durável (Patrimônio / Equipamento)</option>
                  <option value="CONSUMABLE">Consumível (Almoxarifado / Vela / Óstia)</option>
                </select>
              </div>
              <div class="field flex-2">
                <label for="name">Nome do Item</label>
                <input id="name" type="text" formControlName="name" placeholder="Ex: Microfone sem fio, Cálice Litúrgico" />
              </div>
            </div>

            <div class="form-row">
              <div class="field flex-2">
                <label for="desc">Descrição Detalhada</label>
                <input id="desc" type="text" formControlName="description" placeholder="Marca, modelo, localização na paróquia" />
              </div>
              <div class="field">
                <label for="qty">Quantidade em Estoque</label>
                <input id="qty" type="number" formControlName="quantity" />
              </div>
              <div class="field">
                <label for="minQty">Estoque Mínimo</label>
                <input id="minQty" type="number" formControlName="minimumQuantity" />
              </div>
            </div>

            <div class="form-row">
              @if (isDurable()) {
                <div class="field">
                  <label for="warranty">Garantia (Meses)</label>
                  <input id="warranty" type="number" formControlName="warrantyMonths" placeholder="12" />
                </div>
              } @else {
                <div class="field">
                  <label for="expiration">Data de Validade</label>
                  <input id="expiration" type="date" formControlName="expirationDate" />
                </div>
              }
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="itemForm.invalid || inventoryService.loading()">
                Cadastrar Item
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Tabela de Inventário -->
      <section class="card table-card">
        @if (inventoryService.loading() && inventoryService.items().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando inventário...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Item / Patrimônio</th>
                  <th>Tipo</th>
                  <th>Localização / Descrição</th>
                  <th class="text-center">Quantidade</th>
                  <th class="text-center">Mínimo</th>
                  <th>Status</th>
                  <th>Última Atualização</th>
                </tr>
              </thead>
              <tbody>
                @for (item of inventoryService.items(); track item.id) {
                  <tr [class.row-alert]="item.quantity <= item.minimumQuantity">
                    <td><strong>{{ item.name }}</strong></td>
                    <td>
                      @if (item.type === 'DURABLE') {
                        <span class="badge badge-durable">Durável</span>
                      } @else {
                        <span class="badge badge-consumable">Consumível</span>
                      }
                    </td>
                    <td>{{ item.description }}</td>
                    <td class="text-center font-bold">{{ item.quantity }}</td>
                    <td class="text-center text-muted">{{ item.minimumQuantity }}</td>
                    <td>
                      @if (item.quantity <= item.minimumQuantity) {
                        <span class="status-warning">Estoque Baixo</span>
                      } @else {
                        <span class="status-ok">Normal</span>
                      }
                    </td>
                    <td class="col-date">{{ item.lastUpdated | date:'dd/MM/yyyy HH:mm' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="empty-state">
                      <p>Nenhum item cadastrado no inventário paroquial.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `,
  styles: [`
    .inventory-container { display: flex; flex-direction: column; gap: 1.25rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }
    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }
    .header-actions { display: flex; gap: 0.6rem; align-items: center; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .item-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }
    .flex-2 { flex: 2; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }
    .table-card { padding: 0; overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }
    .row-alert { background: #fffbeb; }
    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }
    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; }
    .badge-durable { background: #e0e7ff; color: #4338ca; }
    .badge-consumable { background: #fef3c7; color: #b45309; }
    .status-ok { color: #059669; font-weight: 600; font-size: 0.8rem; }
    .status-warning { color: #d97706; font-weight: 700; font-size: 0.8rem; }
    .font-bold { font-weight: 700; }
    .text-center { text-align: center; }
    .text-muted { color: #94a3b8; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary { background: #7c3aed; color: #fff; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .alert-warning { background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.875rem; }
    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }
    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #7c3aed; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class InventoryPageComponent implements OnInit {
  protected readonly inventoryService = inject(InventoryService);
  private readonly fb = inject(FormBuilder);

  protected readonly showForm = signal<boolean>(false);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly itemForm = this.fb.group({
    type: ['DURABLE', Validators.required],
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(0)]],
    minimumQuantity: [1, [Validators.required, Validators.min(0)]],
    warrantyMonths: [12],
    expirationDate: [''],
  });

  isDurable(): boolean {
    return this.itemForm.get('type')?.value === 'DURABLE';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.inventoryService.loadItems().subscribe();
    this.inventoryService.loadAlerts().subscribe();
  }

  toggleForm(): void {
    this.showForm.update((v) => !v);
  }

  onTypeChange(): void {
    // Reavalia estado dos campos
  }

  submitItem(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const val = this.itemForm.getRawValue();
    if (val.type === 'DURABLE') {
      const dto: CreateDurableDto = {
        name: val.name!,
        description: val.description!,
        quantity: Number(val.quantity),
        minimumQuantity: Number(val.minimumQuantity),
        warrantyMonths: Number(val.warrantyMonths || 0),
      };
      this.inventoryService.createDurable(dto).subscribe({
        next: () => {
          this.successMessage.set('Bem durável cadastrado com sucesso!');
          this.itemForm.reset({ type: 'DURABLE', quantity: 1, minimumQuantity: 1, warrantyMonths: 12 });
          this.showForm.set(false);
        },
      });
    } else {
      const dto: CreateConsumableDto = {
        name: val.name!,
        description: val.description!,
        quantity: Number(val.quantity),
        minimumQuantity: Number(val.minimumQuantity),
        expirationDate: val.expirationDate || new Date().toISOString().substring(0, 10),
      };
      this.inventoryService.createConsumable(dto).subscribe({
        next: () => {
          this.successMessage.set('Item de consumo cadastrado com sucesso!');
          this.itemForm.reset({ type: 'CONSUMABLE', quantity: 1, minimumQuantity: 1 });
          this.showForm.set(false);
        },
      });
    }
  }
}
