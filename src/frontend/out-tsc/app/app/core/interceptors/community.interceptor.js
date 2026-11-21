import { inject } from '@angular/core';
import { CommunityService } from '../services/community.service';
/**
 * Interceptor funcional responsável por injetar o identificador da comunidade ativa (communityId)
 * em headers e query params nas rotas financeiras (/api/expenses, /api/revenues, /api/ledger).
 * Caso a comunidade selecionada seja "Todas / Consolidado" (ALL), nenhum filtro é injetado.
 */
export const communityInterceptor = (req, next) => {
    const communityService = inject(CommunityService);
    const activeCommunityId = communityService.activeCommunityId();
    // Se estiver em modo "Todas / Consolidado" (null ou 'ALL'), prossegue sem alterar a requisição
    if (!activeCommunityId || activeCommunityId === 'ALL') {
        return next(req);
    }
    const financialEndpoints = ['/api/expenses', '/api/revenues', '/api/ledger'];
    const isFinancialReq = financialEndpoints.some((endpoint) => req.url.includes(endpoint));
    if (!isFinancialReq) {
        return next(req);
    }
    // Anexa o cabeçalho X-Community-Id
    let modifiedReq = req.clone({
        setHeaders: {
            'X-Community-Id': activeCommunityId,
        },
    });
    // Para requisições GET, anexa também como query param se ainda não estiver presente
    if (req.method === 'GET' && !req.params.has('communityId')) {
        modifiedReq = modifiedReq.clone({
            params: modifiedReq.params.set('communityId', activeCommunityId),
        });
    }
    // Para requisições POST/PUT com body JSON, injeta communityId se for objeto e não contiver ainda
    if ((req.method === 'POST' || req.method === 'PUT') && req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
        const bodyObj = req.body;
        if (!bodyObj['communityId']) {
            modifiedReq = modifiedReq.clone({
                body: {
                    ...bodyObj,
                    communityId: activeCommunityId,
                },
            });
        }
    }
    return next(modifiedReq);
};
//# sourceMappingURL=community.interceptor.js.map