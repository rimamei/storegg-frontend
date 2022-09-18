export interface CategoryTypes {
  _id: string;
  name: string;
  __v: number;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BanksTypes {
  _id: string;
  name: string;
  bankName: string;
  noRekening: string;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BanksTypes[];
}

export interface NominalsTypes {
  _id: string;
  coinName: string;
  coinQuantity: number;
  price: number;
}

export interface CategoryProps {
  _id: string;
  name: string;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
}

export interface userStateTypes {
  id: string;
  name: string;
  email: string;
  avatar: any;
}

export interface JWTPayloadTypes {
  player: UserTypes;
  iat: string;
}

export interface CheckoutTypes {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}

export interface TopupCategoriesTypes {
  _id: string;
  name: string;
  value: number;
}

export interface HistoryPaymentTypes {
  bankName: string;
  name: string;
  noRekening: string;
  type: string;
}

export interface HistoryUserTypes {
  name: string;
  phoneNumber: number;
}

export interface HistoryVoucherTopupTypes {
  category: string;
  coinName: string;
  coinQuantity: string;
  gameName: string;
  price: number;
  thumbnail: string;
}

export interface HistoryTransactionTypes {
  _id: string;
  accountUser: string;
  banks: BanksTypes[];
  name: string;
  category: CategoryTypes[];
  historyPayment: HistoryPaymentTypes;
  historyUser: HistoryUserTypes;
  historyVoucherTopup: HistoryVoucherTopupTypes;
  player: string;
  tax: number;
  user: string;
  status: 'Pending' | 'Success' | 'Failed';
  value: number;
  voucherTopup: string;
}
