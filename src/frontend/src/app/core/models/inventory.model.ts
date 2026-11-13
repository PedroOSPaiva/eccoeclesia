export type InventoryItemType = 'CONSUMABLE' | 'DURABLE' | 'UNKNOWN';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  minimumQuantity: number;
  lastUpdated: string;
  type: InventoryItemType;
  expirationDate?: string;
  warrantyMonths?: number;
}

export interface CreateConsumableDto {
  name: string;
  description: string;
  quantity: number;
  minimumQuantity: number;
  expirationDate: string;
}

export interface CreateDurableDto {
  name: string;
  description: string;
  quantity: number;
  minimumQuantity: number;
  warrantyMonths: number;
}

