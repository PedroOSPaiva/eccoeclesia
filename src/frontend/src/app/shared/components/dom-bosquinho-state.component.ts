import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dom-bosquinho-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dom-bosco-card" [class.is-loading-mode]="mode === 'loading'" role="alert">
      <!-- Ilustração Vetorial: Dom Bosquinho (São João Bosco em traço maduro e acolhedor) -->
      <div class="character-container">
        <svg viewBox="0 0 160 160" width="135" height="135" class="dom-bosco-svg" [class.pulse-halo]="mode === 'loading'" role="img" aria-label="São João Bosco">
          <defs>
            <!-- Gradiente da Auréola -->
            <linearGradient id="db-halo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#d97706" />
            </linearGradient>

            <!-- Gradiente do Círculo de Fundo -->
            <radialGradient id="db-bg" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="70%" stop-color="#fefce8" />
              <stop offset="100%" stop-color="#fef3c7" />
            </radialGradient>

            <!-- Gradiente da Batina -->
            <linearGradient id="db-cassock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>

            <!-- Gradiente do Cabelo -->
            <linearGradient id="db-hair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3d2c1e" />
              <stop offset="50%" stop-color="#241a12" />
              <stop offset="100%" stop-color="#17100b" />
            </linearGradient>

            <!-- Gradiente da Pele -->
            <linearGradient id="db-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffedd5" />
              <stop offset="100%" stop-color="#fed7aa" />
            </linearGradient>
          </defs>

          <!-- Fundo Circular Delicado -->
          <circle cx="80" cy="80" r="74" fill="url(#db-bg)" stroke="#fde047" stroke-width="1.5" />

          <!-- Auréola Dourada Luminosa de Santidade -->
          <circle cx="80" cy="62" r="50" fill="none" stroke="url(#db-halo)" stroke-width="2.5" stroke-dasharray="8 4" class="halo-circle" opacity="0.85" />
          <circle cx="80" cy="62" r="46" fill="#fef9c3" opacity="0.35" />

          <!-- Batina Preta Sacerdotal (Ombros e Busto) -->
          <path d="M34 154 C35 130, 48 114, 64 109 L96 109 C112 114, 125 130, 126 154 Z" fill="url(#db-cassock)" />
          <!-- Dobras e Costura da Batina -->
          <path d="M80 119 L80 154" stroke="#334155" stroke-width="1.5" />
          <!-- Botões Pequenos da Batina -->
          <circle cx="80" cy="126" r="1.5" fill="#475569" />
          <circle cx="80" cy="135" r="1.5" fill="#475569" />
          <circle cx="80" cy="144" r="1.5" fill="#475569" />

          <!-- Colarinho Romano Branco (Alzacolletto Clerical) -->
          <path d="M68 108 L92 108 L89 120 L71 120 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
          <path d="M74 108 L86 108 L85 117 L75 117 Z" fill="#f8fafc" />

          <!-- Pescoço com Sombra Suave -->
          <path d="M70 94 L70 110 L90 110 L90 94 Z" fill="url(#db-skin)" />
          <path d="M70 94 C76 99, 84 99, 90 94 L90 100 C84 103, 76 103, 70 100 Z" fill="#fbcfe8" opacity="0.3" />

          <!-- Orelhas -->
          <path d="M51 72 C49 68, 48 80, 52 83 C54 84, 55 80, 54 74 Z" fill="#fed7aa" />
          <path d="M52 74 C51 75, 51 79, 53 80" stroke="#f97316" stroke-width="0.8" fill="none" opacity="0.5" />
          <path d="M109 72 C111 68, 112 80, 108 83 C106 84, 105 80, 106 74 Z" fill="#fed7aa" />
          <path d="M108 74 C109 75, 109 79, 107 80" stroke="#f97316" stroke-width="0.8" fill="none" opacity="0.5" />

          <!-- Rosto Sereno de Dom Bosco -->
          <path d="M53 66 C53 84, 63 98, 80 98 C97 98, 107 84, 107 66 C107 51, 96 46, 80 46 C64 46, 53 51, 53 66 Z" fill="url(#db-skin)" />

          <!-- Cabelos de Fundo / Laterais Onduladas -->
          <path d="M51 64 C47 54, 52 42, 62 36 C72 30, 88 30, 98 36 C108 42, 113 54, 109 64 C112 70, 111 76, 107 80 C106 74, 107 67, 105 63 C103 54, 96 48, 80 48 C64 48, 57 54, 55 63 C53 67, 54 74, 53 80 C49 76, 48 70, 51 64 Z" fill="url(#db-hair)" />

          <!-- Cabelo Frontal com Risca Lateral e Ondas Clássicas -->
          <path d="M50 58 C51 44, 60 35, 75 33 C88 32, 104 36, 110 49 C113 56, 112 66, 108 72 C106 64, 106 58, 102 53 C96 46, 88 44, 78 45 C68 46, 58 50, 50 58 Z" fill="url(#db-hair)" />
          <!-- Franja com risca lateral característica -->
          <path d="M54 58 C58 50, 68 47, 73 47 C79 47, 85 51, 93 49 C100 47, 104 53, 106 58 C100 55, 93 54, 88 56 C80 59, 72 61, 64 58 C59 56, 56 57, 54 58 Z" fill="#2d2015" />
          <path d="M68 46 C74 41, 84 41, 92 43 C96 44, 102 47, 105 52 C101 48, 95 46, 88 45 C80 44, 74 44, 68 46 Z" fill="#4a3728" opacity="0.6" />

          <!-- Sobrancelhas Naturais e Expressivas -->
          <path d="M63 65 C67 62.5, 73 63, 76 65.5" stroke="#2b1d11" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <path d="M84 65.5 C87 63, 93 62.5, 97 65" stroke="#2b1d11" stroke-width="2.2" stroke-linecap="round" fill="none" />

          <!-- Olhos Serenos e Acolhedores -->
          <!-- Olho Esquerdo -->
          <path d="M64 71.5 Q70 67.5 76 71.5" stroke="#1f2937" stroke-width="2" stroke-linecap="round" fill="none" />
          <path d="M65 72.5 Q70 75 75 72.5" stroke="#9ca3af" stroke-width="0.8" stroke-linecap="round" fill="none" />
          <ellipse cx="70" cy="71.8" rx="3.2" ry="3" fill="#2d2015" />
          <circle cx="70" cy="71.8" r="1.8" fill="#0f172a" />
          <circle cx="71" cy="70.8" r="0.9" fill="#ffffff" />

          <!-- Olho Direito -->
          <path d="M84 71.5 Q90 67.5 96 71.5" stroke="#1f2937" stroke-width="2" stroke-linecap="round" fill="none" />
          <path d="M85 72.5 Q90 75 95 72.5" stroke="#9ca3af" stroke-width="0.8" stroke-linecap="round" fill="none" />
          <ellipse cx="90" cy="71.8" rx="3.2" ry="3" fill="#2d2015" />
          <circle cx="90" cy="71.8" r="1.8" fill="#0f172a" />
          <circle cx="91" cy="70.8" r="0.9" fill="#ffffff" />

          <!-- Nariz Suave e Digno -->
          <path d="M80 67 L80 77.5 C80 79.5, 78 80.5, 77 79.5" stroke="#d97706" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.65" />
          <path d="M81 79.5 C82.5 79.5, 83.5 78.5, 83.5 77.5" stroke="#d97706" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.45" />

          <!-- Sorriso Sereno, Paternal e Acolhedor -->
          <path d="M72 85.5 C76 89.5, 84 89.5, 88 85.5" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <path d="M70.5 84.5 C71 85.5, 71.5 86, 72 86.5" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5" />
          <path d="M89.5 84.5 C89 85.5, 88.5 86, 88 86.5" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5" />
          <path d="M76 90 C78.5 91.5, 81.5 91.5, 84 90" stroke="#ea580c" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.35" />
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
