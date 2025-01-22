// Define Trade and Rule types with nullable fields

export type Trade = {
  trade_number: string | null;
  portfolio: string | null;
  counterparty: string | null;
  price: number | null;
};

export type Rule = {
  rule_id: number;
  field: keyof Trade;
  operator: '>' | '<' | 'equals' | 'not_equals' | 'between';
  value: any;
};

// Define Response type
export type Response = {
  success: boolean;
  message: string;
  filteredTrades?: Trade[];
  rules?: Rule[];
};
