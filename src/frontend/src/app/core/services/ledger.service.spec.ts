import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LedgerService } from './ledger.service';
import { CreateLedgerEntryDto, LedgerEntry } from '../models/ledger.model';

describe('LedgerService (Signals & Reactivity)', () => {
  let service: LedgerService;
  let httpMock: HttpTestingController;

  const mockEntries: LedgerEntry[] = [
    {
      id: '1',
      accountCode: '1.1.01',
      referenceCode: 'REF-001',
      costCenter: 'Matriz',
      description: 'Dízimo Dominical',
      amount: 1500.0,
      type: 'INCOME',
      occurredOn: '2026-04-10',
    },
    {
      id: '2',
      accountCode: '2.1.01',
      referenceCode: 'REF-002',
      costCenter: 'Geral',
      description: 'Manutenção Elétrica',
      amount: 450.0,
      type: 'EXPENSE',
      occurredOn: '2026-04-12',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LedgerService],
    });
    service = TestBed.inject(LedgerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado com estado inicial vazio e não carregando', () => {
    expect(service).toBeTruthy();
    expect(service.entries().length).toBe(0);
    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeNull();
    expect(service.netBalance()).toBe(0);
  });

  it('deve carregar lançamentos e atualizar os signals computados', () => {
    service.loadEntries().subscribe((entries) => {
      expect(entries.length).toBe(2);
    });

    expect(service.loading()).toBeTrue();

    const req = httpMock.expectOne('/api/ledger');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntries);

    expect(service.loading()).toBeFalse();
    expect(service.entries().length).toBe(2);
    expect(service.totalIncome()).toBe(1500.0);
    expect(service.totalExpense()).toBe(450.0);
    expect(service.netBalance()).toBe(1050.0);
    expect(service.totalCount()).toBe(2);
  });

  it('deve filtrar entradas reativamente com filterType', () => {
    service.loadEntries().subscribe();
    httpMock.expectOne('/api/ledger').flush(mockEntries);

    service.setFilterType('INCOME');
    expect(service.filteredEntries().length).toBe(1);
    expect(service.filteredEntries()[0].description).toBe('Dízimo Dominical');

    service.setFilterType('EXPENSE');
    expect(service.filteredEntries().length).toBe(1);
    expect(service.filteredEntries()[0].description).toBe('Manutenção Elétrica');

    service.setFilterType('ALL');
    expect(service.filteredEntries().length).toBe(2);
  });

  it('deve registrar um novo lançamento e atualizar o signal de entries', () => {
    service.loadEntries().subscribe();
    httpMock.expectOne('/api/ledger').flush(mockEntries);

    const newDto: CreateLedgerEntryDto = {
      accountCode: '1.1.02',
      referenceCode: 'REF-003',
      costCenter: 'Pastoral',
      description: 'Oferta Especial',
      amount: 300.0,
      type: 'INCOME',
      occurredOn: '2026-04-15',
    };

    const createdEntry: LedgerEntry = {
      id: '3',
      ...newDto,
      amount: 300.0,
      occurredOn: '2026-04-15',
    };

    service.createEntry(newDto).subscribe((entry) => {
      expect(entry.id).toBe('3');
    });

    const postReq = httpMock.expectOne('/api/ledger');
    expect(postReq.request.method).toBe('POST');
    postReq.flush(createdEntry);

    expect(service.entries().length).toBe(3);
    expect(service.totalIncome()).toBe(1800.0);
    expect(service.netBalance()).toBe(1350.0);
  });

  it('deve capturar erro e atualizar o signal error', () => {
    service.loadEntries().subscribe({
      error: () => {
        expect(service.error()).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('/api/ledger');
    req.flush({ error: 'Falha de conexão com o banco' }, { status: 500, statusText: 'Server Error' });

    expect(service.loading()).toBeFalse();
    expect(service.error()).toBe('Falha de conexão com o banco');
  });
});

