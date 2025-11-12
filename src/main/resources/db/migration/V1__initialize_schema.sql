CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role)
);

CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    amount NUMERIC(19, 2) NOT NULL,
    description VARCHAR(512) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE revenues (
    id UUID PRIMARY KEY,
    amount NUMERIC(19, 2) NOT NULL,
    description VARCHAR(512) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE inventory_items (
    id UUID PRIMARY KEY,
    item_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(512),
    quantity INTEGER NOT NULL,
    minimum_quantity INTEGER NOT NULL,
    expiration_date DATE,
    warranty_months INTEGER
);

CREATE INDEX idx_expenses_created_at ON expenses(created_at);
CREATE INDEX idx_revenues_created_at ON revenues(created_at);
CREATE INDEX idx_inventory_items_type ON inventory_items(item_type);
