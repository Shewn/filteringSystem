import * as fs from 'fs';
import { Rule, Trade, Response } from '../../schema';

// Read JSON files
const tradesData = JSON.parse(fs.readFileSync('data/data.json', 'utf8'));
const rulesData = JSON.parse(fs.readFileSync('data/rules.json', 'utf8'));
let trades: Trade[] = tradesData.data;
let rules: Rule[] = rulesData.data;

// Apply a single rule to a trade
export const applyRule = (trade: Trade, rule: Rule): boolean => {
  const { field, operator, value } = rule;
  const tradeValue = trade[field];

  // Handle nullable trade values
  if (tradeValue === null) {
    if (operator === 'not_equals') {
      return value !== null;
    }
    return false;
  }

  switch (operator) {
    case '>':
      return tradeValue > value;
    case '<':
      return tradeValue < value;
    case 'equals':
      return tradeValue === value;
    case 'not_equals':
      return tradeValue !== value;
    case 'between':
      return tradeValue >= value[0] && tradeValue <= value[1];
    default:
      return false;
  }
};

// Filter trades based on rules
export const filterTrades = (): Response => {
  const filteredTrades = trades.filter((trade) =>
    rules.every((rule) => applyRule(trade, rule))
  );

  if (filteredTrades.length === 0) {
    return {
      success: false,
      message: 'No trades matched the applied rules.',
    };
  }

  return {
    success: true,
    message: 'Trades filtered successfully.',
    filteredTrades,
  };
};

// Add a new rule
export const addRule = (newRule: Rule): Response => {
  const exists = rules.find((rule) => rule.rule_id === newRule.rule_id);
  if (exists) {
    return {
      success: false,
      message: `Rule with ID ${newRule.rule_id} already exists.`,
    };
  }
  rules.push(newRule);
  return {
    success: true,
    message: 'Rule added successfully.',
    rules,
  };
};

// Modify an existing rule
export const modifyRule = (
  ruleId: number,
  updatedRule: Partial<Rule>
): Response => {
  const ruleIndex = rules.findIndex((rule) => rule.rule_id === ruleId);
  if (ruleIndex === -1) {
    return {
      success: false,
      message: `Rule with ID ${ruleId} not found.`,
    };
  }
  rules[ruleIndex] = { ...rules[ruleIndex], ...updatedRule };
  return {
    success: true,
    message: `Rule with ID ${ruleId} updated successfully.`,
    rules,
  };
};

// Remove a rule
export const removeRule = (ruleId: number): Response => {
  const ruleIndex = rules.findIndex((rule) => rule.rule_id === ruleId);
  if (ruleIndex === -1) {
    return {
      success: false,
      message: `Rule with ID ${ruleId} not found.`,
    };
  }
  rules.splice(ruleIndex, 1);
  return {
    success: true,
    message: `Rule with ID ${ruleId} removed successfully.`,
    rules,
  };
};

// Helper to reload trades and rules from files
export const reloadData = (): void => {
  trades = tradesData.data;
  rules = rulesData.data;
};
