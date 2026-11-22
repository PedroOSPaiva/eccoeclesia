import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommunityService } from './community.service';
import { Community } from '../models/community.model';

describe('CommunityService (Signals & Active Community)', () => {
  let service: CommunityService;
  let httpMock: HttpTestingController;

  const mockCommunities: Community[] = [
    { id: 'comm-1', name: 'Matriz Paroquial', code: 'MATRIZ', isMainParish: true },
    { id: 'comm-2', name: 'Comunidade São José', code: 'SJO', isMainParish: false },
  ];

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommunityService],
    });
    service = TestBed.inject(CommunityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve inicializar com valor padrão ALL se não houver no localStorage', () => {
    expect(service).toBeTruthy();
    expect(service.isAll()).toBeTrue();
  });

  it('deve carregar comunidades e atualizar signals', () => {
    service.loadCommunities().subscribe((list) => {
      expect(list.length).toBe(2);
      expect(service.communities().length).toBe(2);
    });

    const req = httpMock.expectOne('/api/communities');
    expect(req.request.method).toBe('GET');
    req.flush(mockCommunities);
  });

  it('deve atualizar a comunidade ativa e persistir no localStorage', () => {
    service.setActiveCommunity('comm-1');
    expect(service.activeCommunityId()).toBe('comm-1');
    expect(localStorage.getItem('ecoecclesia_active_community_id')).toBe('comm-1');
    expect(service.isAll()).toBeFalse();
  });
});
