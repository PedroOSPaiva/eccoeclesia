import { useEffect, useMemo, useState } from 'react';
import birthdayService from '../services/birthdayService.js';
import './BirthdaysPage.css';

function computeDetails(person) {
  const today = new Date();
  const birthDate = new Date(person.birthDate);
  const currentYear = today.getUTCFullYear();
  let nextBirthday = new Date(Date.UTC(currentYear, birthDate.getUTCMonth(), birthDate.getUTCDate()));
  if (nextBirthday <= today) {
    nextBirthday = new Date(Date.UTC(currentYear + 1, birthDate.getUTCMonth(), birthDate.getUTCDate()));
  }
  const daysUntil = Math.round((nextBirthday - today) / (1000 * 60 * 60 * 24));
  const turningAge = nextBirthday.getUTCFullYear() - birthDate.getUTCFullYear();

  return {
    ...person,
    daysUntil,
    turningAge,
    nextBirthday
  };
}

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(date);
}

function BirthdaysPage() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    birthdayService
      .list()
      .then((list) => {
        const enriched = list.map(computeDetails).sort((a, b) => a.daysUntil - b.daysUntil);
        setPeople(enriched);
        setError(null);
      })
      .catch(() => setError('Não foi possível carregar os aniversariantes.'))
      .finally(() => setLoading(false));
  }, []);

  const nextMonth = useMemo(() => people.filter((person) => person.daysUntil <= 30), [people]);

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <header>
        <h1 className="page-title">Aniversariantes</h1>
        <p>Visualize quem está prestes a celebrar mais um ano de vida e combine homenagens.</p>
      </header>

{error && <p className="error" role="alert">{error}</p>}

      <section className="section" style={{ borderLeft: '4px solid #f59e0b' }}>
        <h2 style={{ marginBottom: '0.35rem' }}>Cadastro de aniversariantes</h2>
        <p className="muted" style={{ margin: 0 }}>
          No momento este painel está em modo de consulta. O endpoint de cadastro ainda não está disponível no backend.
          Como alternativa, mantenha os dados atualizados via arquivo/integração até liberarmos o formulário de cadastro.
        </p>
      </section>

      <section className="section">
        <div className="birthdays-header">
          <div>
            <h2>Próximos 30 dias</h2>
            <p className="muted">Datas mais próximas primeiro.</p>
          </div>
          <div className="badge">{nextMonth.length} na fila</div>
        </div>

        {loading ? (
          <p>Carregando…</p>
        ) : people.length === 0 ? (
          <p>Nenhum aniversariante cadastrado.</p>
        ) : (
          <div className="birthday-grid">
            {people.map((person) => (
              <article key={person.id} className="birthday-card">
                <div className="birthday-date">{formatDate(person.nextBirthday)}</div>
                <h3>{person.name}</h3>
                <p className="muted">{person.ministry}</p>
                <dl className="birthday-meta">
                  <div>
                    <dt>Idade</dt>
                    <dd>{person.turningAge} anos</dd>
                  </div>
                  <div>
                    <dt>Contagem regressiva</dt>
                    <dd>{person.daysUntil} dia(s)</dd>
                  </div>
                  <div>
                    <dt>Contato</dt>
                    <dd>{person.contact || '—'}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BirthdaysPage;
