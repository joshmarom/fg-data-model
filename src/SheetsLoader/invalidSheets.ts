/*
const noIndex = [
  'Accounting Pack',
  'Audit Event',
  'Cash Projection Rule',
  'ExceptionRule',
  'Feed Entry',
  'File Mapping Rule',
  'File Mapping Verification Result',
  'Fund Group',
  'Fund View',
  'FX Rate Source Rules',
  'GL Account',
  'GL Rule',
  'Income Rule',
  'ListView',
  'DRCR Template Rule',
  'Portfolio Rule',
  'Pricing Sources Rule',
  'ReportStored (Report Instance)',
  'Role',
  'Share Classes',
  'Settlement Rules',
  'Tax Rule',
  'Team',
  'TransactionFeeTreatment Rule',
  'TransactionFeeCalculation Rule',
  'User',
  'UserBookmark',
  'User Credentials',
  'User Group',
  'WorkflowActivityInstance',
];

const noIndexColumn = ['File Mapping Verification Result', 'Tax Rule'];
*/

const needToBeFixed = [
  'Base',
  'EmailTemplate',
  'Effective Forward Curve',
  // 'Effective Fx',
  'ExpenseRule',
  'ExceptionEvent',
  // 'File',
  'ReconFromPrimary',
  'ReportDistribution',
  'ReportPack (Report Set)',
  'TaskRule',
  // 'TaxLot Delta',
  // 'Workflow Activity',
  // 'Workflow Routine',
  // 'Workflow Rule',

  'Pack',
  'Print Template (Report Print)',
  'ReconFromPrimary',
  'Tag',
];

export const invalidSheets = [...needToBeFixed, 'StaticTables', 'SystemEvent'];
