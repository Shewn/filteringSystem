import express from 'express';
import {
  filterTrades,
  addRule,
  modifyRule,
  removeRule,
  reloadData,
} from './app/controller';
import cors from 'cors';
import { Rule } from '../schema';

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

// Express app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.options('*', cors(corsOptions));
// Reload data before starting the server
reloadData();

// Get all filtered trades
app.get('/api/trades', cors(corsOptions), (req, res) => {
  const result = filterTrades();
  res.status(result.success ? 200 : 404).json(result);
});

// Add a new rule
app.post('/api/rules', cors(corsOptions), (req, res) => {
  const newRule: Rule = req.body;
  const result = addRule(newRule);
  res.status(result.success ? 201 : 400).json(result);
});

// Modify an existing rule
app.put('/api/rules/:id', (req, res) => {
  const ruleId = parseInt(req.params.id);
  const updatedRule: Partial<Rule> = req.body;
  const result = modifyRule(ruleId, updatedRule);
  res.status(result.success ? 200 : 404).json(result);
});

// Delete a rule
app.delete('/api/rules/:id', (req, res) => {
  const ruleId = parseInt(req.params.id);
  const result = removeRule(ruleId);
  res.status(result.success ? 200 : 404).json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
