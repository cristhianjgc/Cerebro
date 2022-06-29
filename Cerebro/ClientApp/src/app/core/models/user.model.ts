export interface User {
  email: string,
  userId: string,
  nickname: string,
  username: string
}

export interface UserResponse {
  user: User,
  status: number,
  message: string
}