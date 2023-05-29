export type SignUpInfo = {
  userName: string;
  email: string;
  password: string;
};

export type UserInfo = SignUpInfo & {
  uid: string;
};
