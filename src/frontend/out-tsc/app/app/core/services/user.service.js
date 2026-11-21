import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import * as i0 from "@angular/core";
export class UserService extends BaseApiService {
    get apiUrl() {
        return '/api/users';
    }
    // Alias para manter compatibilidade com componentes existentes
    users = this.items;
    loadUsers() {
        return this.load();
    }
    createUser(dto) {
        return this.create(dto);
    }
    deleteUser(id) {
        return this.delete(id);
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵUserService_BaseFactory; return function UserService_Factory(__ngFactoryType__) { return (ɵUserService_BaseFactory || (ɵUserService_BaseFactory = i0.ɵɵgetInheritedFactory(UserService)))(__ngFactoryType__ || UserService); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=user.service.js.map