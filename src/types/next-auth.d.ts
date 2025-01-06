declare module "next-auth" {
    interface User {
      id: string;
      accessToken: string;
      expiresIn: number;
      refreshToken: string;
      refreshExpiresIn: number;
    }
  
    interface JWT {
      accessToken: string;
      expiresIn: number;
      refreshToken: string;
      refreshExpiresIn: number;
    }
  }
  