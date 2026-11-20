import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="about-container">
      <!-- Cabeçalho Principal -->
      <header class="about-header">
        <span class="badge-noble">História, Fé & Memória</span>
        <h1>Sobre o EcoEcclesia</h1>
        <p class="lead">
          Uma plataforma concebida para unir tecnologia moderna, fidelidade contábil e o zelo fraternal
          a serviço da administração das comunidades eclesiásticas.
        </p>
      </header>

      <!-- Cartão: A Missão e o Porquê de Existir -->
      <section class="card mission-card">
        <div class="icon-orb">
          <!-- Fachada de Igreja e Comunidade -->
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="2" x2="12" y2="7"></line>
            <line x1="10" y1="4" x2="14" y2="4"></line>
            <path d="M12 7l-7 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9l-7-5z"></path>
            <path d="M10 21v-4a2 2 0 0 1 4 0v4"></path>
          </svg>
        </div>
        <div class="mission-text">
          <h2>Por que o EcoEcclesia existe?</h2>
          <p>
            A administração de uma comunidade de fé não se resume a números frios: cada valor arrecadado representa
            a generosidade do dízimo, a oferta abnegada do fiel e o esforço conjunto para manter as pastorais vivas,
            os templos acolhedores e a caridade ativa aos mais necessitados.
          </p>
          <p>
            O <strong>EcoEcclesia</strong> nasceu da necessidade real de simplificar a prestação de contas, garantindo
            que párocos, tesoureiros e conselhos fiscais possam registrar entradas e saídas com transparência auditável,
            facilidade no dia a dia e total conformidade com as boas práticas de governança comunitária.
          </p>
        </div>
      </section>

      <!-- Padroeiro da Comunidade: São João Bosco -->
      <section class="card patron-card">
        <div class="patron-badge">Padroeiro da Comunidade</div>
        <div class="patron-content">
          <div class="patron-symbol">⛪</div>
          <div>
            <h3>Sob a Inspiração e Intercessão de São João Bosco</h3>
            <p>
              Nossa comunidade caminha sob o exemplo e a bênção de <strong>Dom Bosco</strong>,
              o santo educador dos jovens, da fraternidade e da santa alegria. Inspirados pelo seu apelo
              de <em>"Servir ao Senhor com alegria!"</em>, o EcoEcclesia foi desenhado para ser uma ferramenta
              acolhedora, tornando o trabalho pastoral e administrativo mais leve, transparente e harmonioso.
            </p>
          </div>
        </div>
      </section>

      <!-- Seção Principal: In Memoriam & Gratidão -->
      <section class="memorial-section">
        <div class="section-title">
          <span class="cross-symbol">✝</span>
          <h2>In Memoriam & Dedicatória Especial</h2>
          <p class="section-subtitle">
            O alicerce deste projeto foi construído a partir da sabedoria, da oração e do coração de pessoas inesquecíveis.
          </p>
        </div>

        <!-- Homenagens de Destaque In Memoriam -->
        <div class="memorial-grid">
          <!-- Dona Cristina Célia Pesca -->
          <div class="card memorial-card">
            <div class="memorial-ribbon">In Memoriam</div>
            <div class="memorial-header">
              <div class="candle-icon">🕯️</div>
              <div>
                <h3>Dona Cristina Célia Pesca</h3>
                <span class="memorial-role">Inspiração e Fonte de Conhecimento Paroquial</span>
              </div>
            </div>
            <div class="memorial-quote">
              <blockquote>
                "Dedicamos este trabalho com profundo carinho, saudade e eterna gratidão à memória de
                <strong>Dona Cristina Célia Pesca</strong>. Sua generosidade ao partilhar vivências,
                orientações práticas e a realidade dos desafios eclesiásticos foi a semente que deu
                vida a cada detalhe e fluxo pensado no EcoEcclesia. Que sua memória continue viva em
                cada fruto desta obra a serviço do bem comum."
              </blockquote>
            </div>
          </div>

          <!-- Avó Arlete -->
          <div class="card memorial-card memorial-card-alt">
            <div class="memorial-ribbon">In Memoriam</div>
            <div class="memorial-header">
              <div class="candle-icon">🕊️</div>
              <div>
                <h3>Avó Arlete</h3>
                <span class="memorial-role">Matriarca de Fé e Pilar da Nossa Comunidade</span>
              </div>
            </div>
            <div class="memorial-quote">
              <blockquote>
                "Em memória carinhosa, reverente e eterna de nossa querida <strong>Avó Arlete</strong>,
                cuja trajetória de vida, testemunho de fé inabalável, oração humilde e dedicação exemplar aos irmãos
                são parte fundamental da história da nossa comunidade. Seu amor e suas bênçãos continuam
                vivos e inspirando cada passo deste projeto."
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Colaboradores Fundamentais -->
        <div class="tribute-grid">
          <!-- Minha Mãe Jarlene -->
          <div class="card tribute-card">
            <div class="tribute-badge">Apoio & Inspiração</div>
            <div class="tribute-avatar">❤️</div>
            <h4>Jarlene</h4>
            <span class="tribute-relation">Mãe, incentivadora e luz constante</span>
            <p>
              Pelo amor incondicional, orações e apoio incansável durante cada etapa do desenvolvimento,
              lembrando sempre da importância de colocar a tecnologia a serviço do amor e da comunhão fraterna.
            </p>
          </div>

          <!-- Tesoureira Naninha -->
          <div class="card tribute-card">
            <div class="tribute-badge">Vivência Contábil</div>
            <div class="tribute-avatar">💼</div>
            <h4>Naninha</h4>
            <span class="tribute-relation">Tesoureira e guardiã dos processos paroquiais</span>
            <p>
              Pela dedicação exemplar à tesouraria, partilhando com generosidade a rotina real de conciliação,
              comprovantes e livro razão, permitindo que o sistema atendesse com precisão quem está na linha de frente.
            </p>
          </div>
        </div>
      </section>

      <!-- Idealização e Autoria -->
      <section class="card author-card">
        <div class="author-info">
          <div class="author-badge">Idealização & Arquitetura</div>
          <h3>Criado e Desenvolvido por Pedro Paiva</h3>
          <p>
            Desenvolvido como uma solução robusta e moderna, empregando arquitetura limpa com Java 21,
            Spring Boot, PostgreSQL e Angular moderno com controle reativo por Signals, com o compromisso
            de entregar excelência técnica aliada a um propósito nobre.
          </p>
        </div>
        <div class="author-actions">
          <a routerLink="/dashboard" class="btn-back">&larr; Voltar ao Dashboard</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 960px;
      margin: 0 auto 3rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .about-header {
      text-align: center;
      padding: 1.5rem 1rem 0.5rem;
    }

    .badge-noble {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #b45309;
      background: #fef3c7;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 0.75rem;
    }

    .about-header h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.75rem 0;
      letter-spacing: -0.02em;
    }

    .lead {
      font-size: 1.1rem;
      color: #475569;
      line-height: 1.6;
      max-width: 700px;
      margin: 0 auto;
    }

    .card {
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      padding: 1.75rem;
    }

    .mission-card {
      display: flex;
      gap: 1.5rem;
      align-items: flex-start;
      border-left: 5px solid #2563eb;
    }

    .icon-orb {
      background: #eff6ff;
      color: #2563eb;
      width: 52px;
      height: 52px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .mission-text h2 {
      margin: 0 0 0.75rem 0;
      color: #0f172a;
      font-size: 1.35rem;
      font-weight: 700;
    }

    .mission-text p {
      color: #334155;
      line-height: 1.65;
      margin: 0 0 0.85rem 0;
      font-size: 0.95rem;
    }

    .mission-text p:last-child {
      margin-bottom: 0;
    }

    .patron-card {
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
      border: 1px solid #bbf7d0;
      border-left: 5px solid #10b981;
    }

    .patron-badge {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #047857;
      background: #d1fae5;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      margin-bottom: 0.75rem;
    }

    .patron-content {
      display: flex;
      gap: 1.25rem;
      align-items: center;
    }

    .patron-symbol {
      font-size: 2.25rem;
      flex-shrink: 0;
    }

    .patron-content h3 {
      margin: 0 0 0.4rem 0;
      color: #065f46;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .patron-content p {
      margin: 0;
      color: #047857;
      font-size: 0.925rem;
      line-height: 1.6;
    }

    .memorial-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section-title {
      text-align: center;
    }

    .cross-symbol {
      font-size: 1.5rem;
      color: #b45309;
      display: block;
      margin-bottom: 0.25rem;
    }

    .section-title h2 {
      margin: 0 0 0.35rem 0;
      color: #0f172a;
      font-size: 1.5rem;
      font-weight: 800;
    }

    .section-subtitle {
      color: #64748b;
      margin: 0;
      font-size: 0.95rem;
    }

    .memorial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.25rem;
    }

    .memorial-card {
      position: relative;
      background: linear-gradient(135deg, #fffdf8 0%, #fff7ed 100%);
      border: 1px solid #fde68a;
      border-left: 6px solid #d97706;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .memorial-card-alt {
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
      border: 1px solid #bfdbfe;
      border-left: 6px solid #2563eb;
    }

    .memorial-card-alt .memorial-ribbon {
      color: #1e40af;
      background: #dbeafe;
      border-color: #bfdbfe;
    }

    .memorial-card-alt .memorial-header h3 {
      color: #1e3a8a;
    }

    .memorial-card-alt .memorial-role {
      color: #2563eb;
    }

    .memorial-card-alt .memorial-quote blockquote {
      color: #1e293b;
      border-left-color: #3b82f6;
    }

    .memorial-ribbon {
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #92400e;
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
    }

    .memorial-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .candle-icon {
      font-size: 2rem;
    }

    .memorial-header h3 {
      margin: 0;
      color: #78350f;
      font-size: 1.3rem;
      font-weight: 800;
    }

    .memorial-role {
      font-size: 0.8rem;
      color: #b45309;
      font-weight: 600;
    }

    .memorial-quote blockquote {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.65;
      color: #451a03;
      font-style: italic;
      padding-left: 1rem;
      border-left: 3px solid #f59e0b;
    }

    .tribute-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
    }

    .tribute-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.75rem 1.5rem;
      border-top: 4px solid #3b82f6;
    }

    .tribute-badge {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #1e40af;
      background: #eff6ff;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      margin-bottom: 0.75rem;
    }

    .tribute-avatar {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .tribute-card h4 {
      margin: 0 0 0.25rem 0;
      color: #0f172a;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .tribute-relation {
      font-size: 0.8rem;
      color: #2563eb;
      font-weight: 600;
      margin-bottom: 0.85rem;
    }

    .tribute-card p {
      margin: 0;
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.55;
    }

    .author-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #1e293b;
    }

    .author-badge {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #60a5fa;
      background: rgba(96, 165, 250, 0.15);
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      margin-bottom: 0.5rem;
    }

    .author-info h3 {
      margin: 0 0 0.5rem 0;
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .author-info p {
      margin: 0;
      color: #94a3b8;
      font-size: 0.875rem;
      line-height: 1.55;
      max-width: 580px;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: #2563eb;
      color: #ffffff;
      padding: 0.7rem 1.2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: background 0.15s, transform 0.15s;
    }

    .btn-back:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
    }
  `],
})
export class AboutPageComponent {}
