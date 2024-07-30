export interface ILoginUser {
  readonly username: string;
  readonly password: string;
}

export interface IRefreshToken {
  refreshToken: string;
}
