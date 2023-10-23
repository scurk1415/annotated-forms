export type ValidationError =
  RequiredError |
  NumberError |
  MinError |
  MaxError |
  ValidateError;


export type RequiredError = {
  type: 'REQUIRED'
}

export type NumberError = {
  type: 'NOT_A_NUMBER'
}

export type MinError = {
  type: 'MIN_ERROR',
  params: {
    minValue: number
  }
}

export type MaxError = {
  type: 'MAX_ERROR',
  params: {
    maxValue: number
  }
}

export type ValidateError = {
  type: 'VALIDATE',
  params: {
    [key: string]: string
  }
}
