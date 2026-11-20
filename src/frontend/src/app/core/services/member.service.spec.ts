import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberService } from './member.service';
import { Member } from '../models/member.model';

describe('MemberService (Signals & CRUD)', () => {
  let service: MemberService;
  let httpMock: HttpTestingController;

  const mockMembers: Member[] = [
    {
      id: 'm-1',
      communityId: 'comm-1',
      name: 'Francisco de Assis',
      status: 'ACTIVE',
      isSteward: true,
      ministry: 'Pastoral do Dízimo',
    },
    {
      id: 'm-2',
      communityId: 'comm-1',
      name: 'Clara de Assis',
      status: 'ACTIVE',
      isSteward: false,
      ministry: 'Liturgia',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService],
    });
    service = TestBed.inject(MemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve carregar membros com filtro de comunidade', () => {
    service.loadMembers('comm-1').subscribe((list) => {
      expect(list.length).toBe(2);
      expect(service.members().length).toBe(2);
      expect(service.totalCount()).toBe(2);
      expect(service.stewardsCount()).toBe(1);
    });

    const req = httpMock.expectOne((r) => r.url === '/api/members' && r.params.get('communityId') === 'comm-1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMembers);
  });

  it('deve criar novo membro e atualizar a lista', () => {
    const newMember: Member = {
      id: 'm-3',
      communityId: 'comm-1',
      name: 'Antônio de Pádua',
      status: 'ACTIVE',
      isSteward: true,
    };

    service.createMember(newMember).subscribe((res) => {
      expect(res.id).toBe('m-3');
      expect(service.members().length).toBe(1);
    });

    const req = httpMock.expectOne('/api/members');
    expect(req.request.method).toBe('POST');
    req.flush(newMember);
  });
});
