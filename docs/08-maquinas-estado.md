# Máquinas de Estados do Domínio (State Diagrams)

## Propósito
Este documento modela o ciclo de vida e as transições de estado das entidades centrais do **EcoEcclesia** (`members`, `stewards` e `expenses`), confrontando a ausência atual de controle de ciclo de vida com os estados finitos e auditáveis do modelo alvo.

**Data de revisão:** 17 de novembro de 2026  
**Status:** Vigente  

---

## 1. Ciclo de Vida de Membro (`members` — Alvo: Migration V6)

O fiel da comunidade deixa de ser um registro estático de aniversário em arquivo CSV e assume uma jornada eclesial e relacional com a paróquia.

```mermaid
stateDiagram-v2
    [*] --> Visitante : Cadastro inicial na acolhida pastoral (member.status = 'VISITANTE')
    [*] --> Ativo : Fiel transferido ou já integrado (member.status = 'ATIVO')

    Visitante --> Ativo : Batismo / Crisma / Profissão de fé / Adesão formal (member.status = 'ATIVO')
    Ativo --> Inativo : Mudança de comunidade, transferência ou falecimento (member.status = 'INATIVO')
    Inativo --> Ativo : Retorno à comunidade paroquial / Reintegração (member.status = 'ATIVO')
    
    Inativo --> [*] : Arquivamento canônico do registro

    note right of Visitante
        Campos disparadores:
        - member.status = 'VISITANTE'
        - member.community_id = UUID
        - member.ministry = NULL
    end note

    note right of Ativo
        Campos disparadores:
        - member.status = 'ATIVO'
        - member.community_id = UUID da capela
        - member.birth_date = DATE
        - member.ministry = nome da pastoral
        Habilita vínculo com dizimista (stewards).
    end note

    note right of Inativo
        Campos disparadores:
        - member.status = 'INATIVO'
        - member.updated_at = NOW()
        Desativa automaticamente vínculos ativos.
    end note
```

---

## 2. Ciclo de Vida do Dizimista (`stewards` — Alvo: Migration V7)

Modela a participação financeira fraternal do fiel na manutenção pastoral e física do templo, preservando a dignidade humana e o sigilo das contribuições.

```mermaid
stateDiagram-v2
    [*] --> Ativo : Adesão formal ao dízimo (steward.status = 'ATIVO', start_date = CURRENT_DATE)

    Ativo --> Suspenso : Ausência prolongada de contribuição (ex.: 6 meses sem dízimo em revenues)
    Suspenso --> Ativo : Retomada da contribuição comunitária (novo registro em revenues com steward_id)
    
    Ativo --> Inativo : Pedido expresso do fiel ou mudança de paróquia (steward.status = 'INATIVO')
    Suspenso --> Inativo : Desligamento definitivo do fiel / Transferência (steward.status = 'INATIVO')
    
    Inativo --> Ativo : Retomada e reativação formal do envelope (steward.status = 'ATIVO')
    Inativo --> [*]

    note right of Ativo
        Campos de controle:
        - steward.status = 'ATIVO'
        - steward.member_id = UUID (Membro ativo)
        - steward.envelope_number = VARCHAR
        - steward.start_date = DATE
    end note

    note right of Suspenso
        Gatilho de sistema:
        - steward.status = 'SUSPENSO'
        - Disparado por rotina periódica de conciliação
          quando não há receita registrada no período.
        - Não gera bloqueio punitivo (abordagem pastoral).
    end note

    note right of Inativo
        Campos de controle:
        - steward.status = 'INATIVO'
        - steward.updated_at = NOW()
        - Invalida emissão de recibos periódicos.
    end note
```

---

## 3. Ciclo de Vida de Despesa (`expenses` — Atual vs. Alvo)

Contrasta o mecanismo simplório e volátil atual (onde registros são criados ou deletados fisicamente sem rastro) com o ciclo de vida auditável e em conformidade contábil.

```mermaid
stateDiagram-v2
    state "Estado Atual (HOJE — Sem Máquina de Estados e Volátil)" as EstadoAtual {
        [*] --> Criada : POST /api/expenses (Grava no InMemoryExpenseRepository e espelha no Razão)
        Criada --> [*] : DELETE /api/expenses/:id (Exclusão física direta repository.deleteById)
        
        note right of Criada
            HOJE:
            - Sem campo status na tabela expenses.
            - Sem campos de auditoria (created_by, updated_by).
            - Exclusão física apaga o comprovante sem rastreabilidade.
            - Falha no espelho do Razão é ignorada (try/catch silencioso).
        end note
    }

    state "Estado Alvo (ALVO — Ciclo de Vida Contábil e Auditável)" as EstadoAlvo {
        [*] --> Rascunho : Operador digita comprovante (expense.status = 'RASCUNHO')
        Rascunho --> Lancada : Confirmação e geração da partida no Razão (expense.status = 'LANCADA')
        Lancada --> Conciliada : Conciliação com extrato bancário oficial (expense.status = 'CONCILIADA')
        Lancada --> Cancelada : Estorno formal autorizado por ADMIN (expense.status = 'CANCELADA')
        Rascunho --> Cancelada : Descarte do rascunho pelo operador
        
        Conciliada --> [*] : Fechamento do balancete mensal
        Cancelada --> [*] : Arquivamento com justificativa

        note right of Lancada
            ALVO:
            - expense.status = 'LANCADA'
            - expense.community_id = UUID (Obrigatório)
            - expense.ledger_entry_id = VARCHAR (FK com Razão)
            - expense.created_by = UUID (Usuário que criou)
            - Proíbe DELETE físico: cancelamento gera
              estorno com histórico e autoria preservados.
        end note
    }
```

---

## 4. Comparativo de Auditoria e Integridade Contábil

| Critério | Estado Atual (HOJE) | Estado Proposto (ALVO) |
| :--- | :--- | :--- |
| **Campo de Status** | Inexistente (entidade nasce ativa e morre ao deletar). | `status` estruturado como Enum canônico e contábil. |
| **Exclusão de Registros** | Exclusão física no banco (`DELETE FROM expenses WHERE id = ?`). | Exclusão lógica com transição para `CANCELADA` preservando histórico. |
| **Rastreabilidade de Autoria** | Nenhuma tabela possui `created_by` ou `updated_by`. | `created_by` (UUID) e `updated_by` (UUID) auditados via Spring Security. |
| **Timestamp de Modificação** | Inexistente em `expenses` e `revenues` (só têm `created_at`). | `created_at` e `updated_at` preenchidos automaticamente. |
| **Vínculo com o Razão** | Chamada procedural solta em bloco `try/catch ignored`. | Vínculo bidirecional transacional (`ledger_entry_id`) com rollback em falha. |

---

## 5. Pendências / A confirmar

1. **Gatilho de Suspensão de Dizimista:** Confirmar se o prazo de inadimplência para transição de `stewards.status` de `ATIVO` para `SUSPENSO` deve ser de 3, 6 ou 12 meses sem lançamentos de dízimo.
2. **Reversão de Despesa Conciliada:** Definir se uma despesa no estado `CONCILIADA` pode ser reaberta ou estornada (exige lançamento contábil compensatório no Razão) ou se é terminantemente bloqueada contra alterações.
3. **Migração do Status de Membros Existentes:** Ao importar os registros de `data/birthdays.csv` para a tabela `members` (Migration `V4`/`V6`), confirmar se todos devem nascer com o status `'ATIVO'` por padrão.
