import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { CreateUserDto, UserAccount } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService<UserAccount, CreateUserDto> {
  protected override get apiUrl(): string {
    return '/api/users';
  }

  // Alias para manter compatibilidade com componentes existentes
  readonly users = this.items;

  loadUsers(): Observable<UserAccount[]> {
    return this.load();
  }

  createUser(dto: CreateUserDto): Observable<UserAccount> {
    return this.create(dto);
  }

  deleteUser(id: string): Observable<void> {
    return this.delete(id);
  }
}
