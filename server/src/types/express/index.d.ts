// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      auth: {
        email: string;
        password: string;
        isAdmin: boolean;
      };
      user: {
        password: string;
        email: string;
        id: number;
        role: string;
      };
      company: {
        id: number;
      };
      candidate: {
        id: number;
      };
    }
  }
}
