import { useEffect, useState } from 'react';
import inventoryService from '../services/inventoryService.js';

const consumableDefaults = {
  name: '',
  description: '',
  quantity: '',
  minimumQuantity: '',
  expirationDate: ''
};

const durableDefaults = {
  name: '',
  description: '',
  quantity: '',
  minimumQuantity: '',
  warrantyMonths: ''
};

function formatItemType(type) {
  if (type === 'CONSUMABLE') {
    return 'Consumível';
  }
  if (type === 'DURABLE') {
    return 'Durável';
  }
  return type;
}

function detailForItem(item) {
  if (item.type === 'CONSUMABLE') {
    return item.expirationDate ? `Validade: ${item.expirationDate}` : 'Sem validade informada';
  }
  if (item.type === 'DURABLE') {
    return item.warrantyMonths != null ? `Garantia: ${item.warrantyMonths} mês(es)` : 'Sem garantia informada';
  }
  return '—';
}

function InventoryPage() {
  const [items, setItems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [consumableForm, setConsumableForm] = useState(() => ({ ...consumableDefaults }));
  const [durableForm, setDurableForm] = useState(() => ({ ...durableDefaults }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const [list, alertList] = await Promise.all([
        inventoryService.listItems(),
        inventoryService.listAlerts()
      ]);
      setItems(list);
      setAlerts(alertList);
    } catch (err) {
      setError('Não foi possível carregar o estoque.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleConsumableChange = (event) => {
    const { name, value } = event.target;
    setConsumableForm((current) => ({ ...current, [name]: value }));
  };

  const handleDurableChange = (event) => {
    const { name, value } = event.target;
    setDurableForm((current) => ({ ...current, [name]: value }));
  };

  const handleConsumableSubmit = async (event) => {
    event.preventDefault();
    try {
      await inventoryService.createConsumable({
        name: consumableForm.name,
        description: consumableForm.description,
        quantity: Number(consumableForm.quantity),
        minimumQuantity: Number(consumableForm.minimumQuantity),
        expirationDate: consumableForm.expirationDate
      });
      setConsumableForm({ ...consumableDefaults });
      refresh();
    } catch (err) {
      setError('Erro ao cadastrar consumível.');
    }
  };

  const handleDurableSubmit = async (event) => {
    event.preventDefault();
    try {
      await inventoryService.createDurable({
        name: durableForm.name,
        description: durableForm.description,
        quantity: Number(durableForm.quantity),
        minimumQuantity: Number(durableForm.minimumQuantity),
        warrantyMonths:
          durableForm.warrantyMonths === '' ? null : Number(durableForm.warrantyMonths)
      });
      setDurableForm({ ...durableDefaults });
      refresh();
    } catch (err) {
      setError('Erro ao cadastrar patrimônio.');
    }
  };

  const handleMovement = async (item, type) => {
    const value = window.prompt('Quantidade:');
    if (value === null) {
      return;
    }
    const quantity = Number(value);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return;
    }
    const pathSegment = item.type === 'CONSUMABLE' ? 'consumables' : 'durables';
    try {
      if (type === 'entry') {
        await inventoryService.recordEntry(item.id, pathSegment, quantity);
      } else {
        await inventoryService.recordExit(item.id, pathSegment, quantity);
      }
      refresh();
    } catch (err) {
      setError('Não foi possível registrar a movimentação.');
    }
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Controle de estoque</h1>
        <p>Cadastre insumos e acompanhe movimentações.</p>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      <section className="section">
        <h2>Novo insumo (consumível)</h2>
        <form className="form-grid" onSubmit={handleConsumableSubmit}>
          <div className="input-group">
            <label htmlFor="consumable-name">Nome</label>
            <input id="consumable-name" name="name" value={consumableForm.name} onChange={handleConsumableChange} required />
          </div>
          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="consumable-description">Descrição</label>
            <input
              id="consumable-description"
              name="description"
              value={consumableForm.description}
              onChange={handleConsumableChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="consumable-quantity">Quantidade</label>
            <input
              id="consumable-quantity"
              name="quantity"
              type="number"
              min="0"
              value={consumableForm.quantity}
              onChange={handleConsumableChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="consumable-minimum">Quantidade mínima</label>
            <input
              id="consumable-minimum"
              name="minimumQuantity"
              type="number"
              min="0"
              value={consumableForm.minimumQuantity}
              onChange={handleConsumableChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="consumable-expiration">Validade</label>
            <input
              id="consumable-expiration"
              name="expirationDate"
              type="date"
              value={consumableForm.expirationDate}
              onChange={handleConsumableChange}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="primary-button" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <h2>Novo patrimônio (durável)</h2>
        <form className="form-grid" onSubmit={handleDurableSubmit}>
          <div className="input-group">
            <label htmlFor="durable-name">Nome</label>
            <input id="durable-name" name="name" value={durableForm.name} onChange={handleDurableChange} required />
          </div>
          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="durable-description">Descrição</label>
            <input
              id="durable-description"
              name="description"
              value={durableForm.description}
              onChange={handleDurableChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="durable-quantity">Quantidade</label>
            <input
              id="durable-quantity"
              name="quantity"
              type="number"
              min="0"
              value={durableForm.quantity}
              onChange={handleDurableChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="durable-minimum">Quantidade mínima</label>
            <input
              id="durable-minimum"
              name="minimumQuantity"
              type="number"
              min="0"
              value={durableForm.minimumQuantity}
              onChange={handleDurableChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="durable-warranty">Garantia (meses)</label>
            <input
              id="durable-warranty"
              name="warrantyMonths"
              type="number"
              min="0"
              value={durableForm.warrantyMonths}
              onChange={handleDurableChange}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="primary-button" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <h2>Itens cadastrados</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : items.length === 0 ? (
          <p>Nenhum item cadastrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Detalhes</th>
                <th>Quantidade</th>
                <th>Mínimo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.name}
                    {item.quantity <= item.minimumQuantity && <span className="badge warning" style={{ marginLeft: '0.5rem' }}>Alerta</span>}
                  </td>
                  <td>{formatItemType(item.type)}</td>
                  <td>{item.description || 'Sem descrição'}</td>
                  <td>{detailForItem(item)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.minimumQuantity}</td>
                  <td>
                    <button type="button" onClick={() => handleMovement(item, 'entry')} style={{ marginRight: '0.5rem' }}>
                      Entrada
                    </button>
                    <button type="button" onClick={() => handleMovement(item, 'exit')}>
                      Saída
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="section">
        <h2>Alertas</h2>
        {alerts.length === 0 ? (
          <p>Nenhum alerta ativo.</p>
        ) : (
          <ul>
            {alerts.map((item) => (
              <li key={item.id}>
                {item.name} — {item.quantity}/{item.minimumQuantity}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default InventoryPage;
