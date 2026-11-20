import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { CommunityService } from './core/services/community.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  protected auth = inject(AuthService);
  protected communityService = inject(CommunityService);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.communityService.loadCommunities().subscribe();
    }
  }

  onCommunityChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.communityService.setActiveCommunity(select.value);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
