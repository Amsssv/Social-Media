export type ToastrMessage = {
  id: number;
  message: string;
  type: ToastrMessageType;
};

export type ToastrMessageType = "warning" | "error" | "success" | "info";
