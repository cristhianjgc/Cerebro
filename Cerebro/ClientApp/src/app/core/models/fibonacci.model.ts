export interface FibonacciResponse {
  status: number,
  result: number,
  message: string,
  position: number
}

export interface FibonacciRequest {
  email?: string,
  result?: number,
  userId?: string,
  nickname?: string,
  username?: string,
  position?: number,
  requestId?: string,
  requestDate?: Date
}

export interface HistoricalResponse {
  status: number,
  message: string,
  historical: FibonacciRequest[]
}