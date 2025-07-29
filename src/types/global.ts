type Error = {
  message: string;
  code: number;
};

type Success = {
  success: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Params = {};

export type {Error, Success, Params};
