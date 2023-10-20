export const Role = {
  MANAGER: "MANAGER",
  CUSTOMER: "CUSTOMER",
} as const;

export const OrderStatus = {
  WAITING: "WAITING",
  PREPARATION: "PREPARATION",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED"
} as const;

export const ConsumeLocation = {
  IN_HOUSE: "IN_HOUSE",
  TAKE_AWAY: "TAKE_AWAY",
} as const;