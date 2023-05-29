export type SignUpInfo = {
  name: string;
  email: string;
  password: string;
};

export type UserInfo = SignUpInfo & {
  uid: string;
};
