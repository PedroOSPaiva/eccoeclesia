import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dom-bosquinho-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dom-bosco-card" [class.is-loading-mode]="mode === 'loading'" role="alert">
      <!-- Ilustração Vetorial: Dom Bosquinho (São João Bosco em versão carismática infantil) -->
      <div class="character-container">
        <svg viewBox="0 0 160 160" width="130" height="130" class="dom-bosco-svg" [class.pulse-halo]="mode === 'loading'">
          <!-- Auréola da Santidade Salesiana -->
          <circle cx="80" cy="62" r="48" fill="#fef9c3" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4 2" class="halo-circle"/>

          <!-- Cabelos de Dom Bosco (ondulados e volumosos) -->
          <ellipse cx="80" cy="58" rx="38" ry="34" fill="#38220f"/>
          <circle cx="52" cy="58" r="14" fill="#38220f"/>
          <circle cx="108" cy="58" r="14" fill="#38220f"/>
          <circle cx="65" cy="40" r="16" fill="#38220f"/>
          <circle cx="95" cy="40" r="16" fill="#38220f"/>
          <circle cx="80" cy="36" r="18" fill="#38220f"/>

          <!-- Orelhas -->
          <circle cx="48" cy="72" r="7" fill="#fed7aa"/>
          <circle cx="112" cy="72" r="7" fill="#fed7aa"/>

          <!-- Rostinho Alegre -->
          <ellipse cx="80" cy="72" rx="32" ry="29" fill="#ffedd5"/>

          <!-- Franja clássica de Dom Bosco -->
          <path d="M54 55 Q70 65 80 54 Q90 65 106 55 Q80 44 54 55 Z" fill="#38220f"/>

          <!-- Olhinhos Felizes e Expressivos (Arco Sorridente) -->
          <path d="M66 68 Q72 63 77 68" stroke="#1f2937" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M83 68 Q88 63 94 68" stroke="#1f2937" stroke-width="3" stroke-linecap="round" fill="none"/>

          <!-- Bochechas Coradinhas -->
          <circle cx="62" cy="76" r="5" fill="#fca5a5" opacity="0.6"/>
          <circle cx="98" cy="76" r="5" fill="#fca5a5" opacity="0.6"/>

          <!-- Narizinho -->
          <ellipse cx="80" cy="74" rx="2" ry="1.5" fill="#f97316" opacity="0.7"/>

          <!-- Sorriso Acolhedor de Pai e Mestre -->
          <path d="M72 81 Q80 91 88 81" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" fill="#fee2e2"/>

          <!-- Batina Clássica Preta de Sacerdote -->
          <path d="M50 115 L56 98 Q80 96 104 98 L110 115 Q80 120 50 115 Z" fill="#0f172a"/>

          <!-- Colarinho Romano Branco (Collar clerical) -->
          <rect x="73" y="97" width="14" height="9" fill="#ffffff" rx="1.5"/>

          <!-- Mãozinha Acenando em Paz -->
          <g class="waving-hand">
            <circle cx="118" cy="98" r="8" fill="#fed7aa"/>
            <path d="M118 90 L121 95 M123 93 L125 97" stroke="#ea580c" stroke-width="1.5" stroke-linecap="round"/>
          </g>
        </svg>

        <span class="patron-badge">São João Bosco &bull; Padroeiro</span>
      </div>

      <!-- Balão de Mensagem e Ação -->
      <div class="message-container">
        <div class="message-bubble">
          <span class="quote-tag">
            {{ mode === 'loading' ? '“Dom Bosquinho a postos!”' : '“Servi ao Senhor com alegria!”' }}
          </span>
          <h3>{{ displayTitle }}</h3>
          <p>{{ displayMessage }}</p>
        </div>

        @if (mode === 'loading') {
          <div class="loading-indicator">
            <span class="spinner-small"></span>
            <span>Carregando dados da comunidade...</span>
          </div>
        } @else if (showRetry) {
          <div class="action-row">
            <button type="button" class="btn-retry" (click)="onRetryClick()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/>
              </svg>
              {{ retryLabel }}
            </button>
            @if (showDismiss) {
              <button type="button" class="btn-dismiss" (click)="onDismissClick()">
                Dispensar
              </button>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dom-bosco-card {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      padding: 1.75rem;
      background: linear-gradient(135deg, #ffffff 0%, #fefce8 100%);
      border: 1px solid #fef08a;
      border-left: 6px solid #eab308;
      border-radius: 14px;
      box-shadow: 0 4px 14px rgba(234, 179, 8, 0.1);
      margin: 1.25rem 0;
      flex-wrap: wrap;
      animation: fadeIn 0.3s ease-in-out;
    }

    .dom-bosco-card.is-loading-mode {
      background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
      border: 1px solid #bfdbfe;
      border-left: 6px solid #3b82f6;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.08);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .character-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .dom-bosco-svg {
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.06));
      animation: float-gentle 3.5s ease-in-out infinite;
    }

    .waving-hand {
      transform-origin: 118px 98px;
      animation: wave 2.5s ease-in-out infinite;
    }

    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-8deg); }
      75% { transform: rotate(10deg); }
    }

    @keyframes float-gentle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    .pulse-halo .halo-circle {
      animation: pulse-glow 2s ease-in-out infinite alternate;
    }

    @keyframes pulse-glow {
      0% { opacity: 0.6; stroke-width: 2; }
      100% { opacity: 1; stroke-width: 3.5; stroke: #3b82f6; fill: #dbeafe; }
    }

    .patron-badge {
      font-size: 0.72rem;
      font-weight: 700;
      color: #854d0e;
      background: #fef08a;
      padding: 0.2rem 0.65rem;
      border-radius: 9999px;
      letter-spacing: 0.03em;
      border: 1px solid #fde047;
    }

    .is-loading-mode .patron-badge {
      color: #1e40af;
      background: #dbeafe;
      border-color: #bfdbfe;
    }

    .message-container {
      flex: 1;
      min-width: 260px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .message-bubble {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .quote-tag {
      font-size: 0.8rem;
      font-weight: 700;
      font-style: italic;
      color: #b45309;
      letter-spacing: 0.02em;
    }

    .is-loading-mode .quote-tag {
      color: #2563eb;
    }

    .message-bubble h3 {
      margin: 0;
      font-size: 1.15rem;
      color: #78350f;
      font-weight: 800;
    }

    .is-loading-mode .message-bubble h3 {
      color: #1e3a8a;
    }

    .message-bubble p {
      margin: 0;
      font-size: 0.92rem;
      color: #451a03;
      line-height: 1.55;
    }

    .is-loading-mode .message-bubble p {
      color: #1e293b;
    }

    .loading-indicator {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #2563eb;
      margin-top: 0.25rem;
    }

    .spinner-small {
      width: 16px;
      height: 16px;
      border: 2px solid #93c5fd;
      border-top-color: #2563eb;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .action-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 0.25rem;
    }

    .btn-retry {
      background: #d97706;
      color: #ffffff;
      border: 0;
      padding: 0.55rem 1.15rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: background 0.15s, transform 0.15s;
      box-shadow: 0 2px 4px rgba(217, 119, 6, 0.25);
    }

    .btn-retry:hover {
      background: #b45309;
      transform: translateY(-1px);
    }

    .btn-dismiss {
      background: transparent;
      color: #78350f;
      border: 1px solid #fde047;
      padding: 0.5rem 0.9rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.82rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .btn-dismiss:hover {
      background: #fef08a;
    }
  `],
})
export class DomBosquinhoStateComponent {
  @Input() mode: 'error' | 'loading' = 'error';
  @Input() title?: string;
  @Input() message?: string;
  @Input() showRetry: boolean = true;
  @Input() showDismiss: boolean = false;
  @Input() retryLabel: string = 'Tentar Novamente';

  @Output() retry = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  get displayTitle(): string {
    if (this.title) return this.title;
    return this.mode === 'loading'
      ? 'Buscando registros com dedicação...'
      : 'Calma, já vamos resolver!';
  }

  get displayMessage(): string {
    if (this.message) return this.message;
    return this.mode === 'loading'
      ? 'Dom Bosquinho está conectando ao servidor paroquial para trazer as informações atualizadas.'
      : 'Dom Bosco nos ensina a nunca perder a paz e a alegria! Tivemos uma pequena dificuldade para carregar os dados desta tela. Que tal tentar novamente?';
  }

  onRetryClick(): void {
    this.retry.emit();
  }

  onDismissClick(): void {
    this.dismiss.emit();
  }
}
