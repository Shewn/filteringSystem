export function processInput(
  formValue: Partial<{
    selectedField: string | null;
    price: number | null;
    selectedRule: string | null;
    fieldValue: string | null;
  }>
) {
  function getKeyMap(field: any) {
    const fieldMap = new Map([
      ['Trade number', 'trade_number'],
      ['Portfolio', 'portfolio'],
      ['Counterparty', 'counterparty'],
      ['Price', 'price'],
    ]);
    return fieldMap.get(field);
  }

  function getOperator(selectedOperator: any) {
    const operatorMap = new Map([
      ['>', '>'],
      ['<', '<'],
      ['equal', 'equals'],
      ['not equal', 'not_equals'],
      ['in between', 'between'],
    ]);
    return operatorMap.get(selectedOperator);
  }
  return {
    rule_id: 1,
    field: getKeyMap(formValue.selectedField),
    operator: getOperator(formValue.selectedRule),
    value: formValue.fieldValue || formValue.price,
  };
}
