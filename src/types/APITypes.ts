type IdleRequest = {
  status: "idle";
};

type PendingRequest = {
  status: "pending";
};

type SucceededRequest<T> = {
  status: "success";
  data: T;
};

type RejectedRequest = {
  status: "error";
  error: unknown;
};

export type RequestStatus<T> =
  | IdleRequest
  | PendingRequest
  | SucceededRequest<T>
  | RejectedRequest;
