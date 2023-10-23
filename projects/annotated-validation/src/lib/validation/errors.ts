export type ValidationError =
  {
    type: 'REQUIRED'
  } |
  {
    type: 'NOT_A_NUMBER'
  } |
  {
    type: 'MIN_ERROR',
    params: {
      minValue: number
    }
  } |
  {
    type: 'MAX_ERROR',
    params: {
      maxValue: number
    }
  } |
  {
    type: 'VALIDATE',
    params: {
      [key: string]: string
    }
  };
