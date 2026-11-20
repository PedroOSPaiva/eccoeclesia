import {
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LedgerService } from '../core/services/ledger.service';
import { CreateLedgerEntryDto, LedgerEntryType } from '../core/models/ledger.model';
import { CHART_OF_ACCOUNTS, ChartAccountOption } from '../core/models/chart-of-accounts';
import { FinanceChartComponent } from '../shared/components/finance-chart.component';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CurrencyPipe, DatePipe, FinanceChartComponent, DomBosquinhoStateComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  protected readonly ledger = inject(LedgerService);
  private readonly fb = inject(FormBuilder);

  // Injeção automática de query params/route params graças ao withComponentInputBinding()
  readonly start = input<string>();
  readonly end = input<string>();

  // Estado local para controle do modal/card de novo lançamento
  protected readonly showCreateModal = signal<boolean>(false);
  protected readonly actionSuccess = signal<string | null>(null);
  protected readonly currentNature = signal<LedgerEntryType>('INCOME');

  // Opções do plano de contas filtradas pela natureza selecionada
  protected readonly currentAccountOptions = computed<ChartAccountOption[]>(() => {
    const nature = this.currentNature();
    return CHART_OF_ACCOUNTS.filter((acc) => acc.nature === nature);
  });

  // Formulário reativo para criação rápida de lançamento contábil
  protected readonly entryForm = this.fb.group({
    type: ['INCOME' as LedgerEntryType, [Validators.required]],
    accountCode: ['1.1.01', [Validators.required]],
    referenceCode: ['REC-' + Math.floor(1000 + Math.random() * 9000), [Validators.required]],
    costCenter: ['Geral', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    occurredOn: [new Date().toISOString().substring(0, 10), [Validators.required]],
  });

  // Data atual formatada para exibição no topo
  protected readonly today = new Date();

  ngOnInit(): void {
    // Carrega dados iniciais considerando eventuais parâmetros de rota
    this.ledger.loadEntries(this.start(), this.end()).subscribe();
  }

  onTypeChange(): void {
    const nextType = this.entryForm.get('type')?.value as LedgerEntryType;
    this.currentNature.set(nextType);
    if (nextType === 'INCOME') {
      this.entryForm.patchValue({
        accountCode: '1.1.01',
        referenceCode: 'REC-' + Math.floor(1000 + Math.random() * 9000),
      });
    } else {
      this.entryForm.patchValue({
        accountCode: '2.1.01',
        referenceCode: 'DESP-' + Math.floor(1000 + Math.random() * 9000),
      });
    }
  }

  onRefresh(): void {
    this.ledger.refresh();
  }

  onFilterChange(type: LedgerEntryType | 'ALL'): void {
    this.ledger.setFilterType(type);
  }

  toggleCreateModal(): void {
    this.showCreateModal.update((v) => !v);
    this.actionSuccess.set(null);
  }

  submitNewEntry(): void {
    if (this.entryForm.invalid) {
      this.entryForm.markAllAsTouched();
      return;
    }

    const formVal = this.entryForm.getRawValue();
    const dto: CreateLedgerEntryDto = {
      type: formVal.type!,
      accountCode: formVal.accountCode!,
      referenceCode: formVal.referenceCode!,
      costCenter: formVal.costCenter!,
      description: formVal.description!,
      amount: Number(formVal.amount),
      occurredOn: formVal.occurredOn!,
    };

    this.ledger.createEntry(dto).subscribe({
      next: () => {
        this.actionSuccess.set('Lançamento registrado com sucesso no Razão!');
        this.entryForm.patchValue({
          description: '',
          amount: '',
          referenceCode: (this.currentNature() === 'INCOME' ? 'REC-' : 'DESP-') + Math.floor(1000 + Math.random() * 9000),
        });
        setTimeout(() => {
          this.showCreateModal.set(false);
          this.actionSuccess.set(null);
        }, 1200);
      },
    });
  }
}
