export type ValidationError =
  {
    type: 'REQUIRED'
  } |
  {
    type: 'NOT_A_NUMBER'
  } |
  {
    type: 'MIN_ERROR',
    minValue: number
  } |
  {
    type: 'MAX_ERROR',
    maxValue: number
  } |
  {
    type: 'VALIDATE',
    [key: string]: string
  };
