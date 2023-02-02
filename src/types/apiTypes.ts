export type TNewUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  vehicles: TVehicle[];
};

export type TUserWithoutPassword = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  vehicles: TVehicle[];
};

export type TVehicle = {
  id: string;
  name: string;
  model: TVehicleModel;
  user: TUser;
};

export type TNewVehicle = {
  name: string;
  modelId: string;
  userId: string;
};

export type TVehicleModel = {
  id: string;
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  brand: TVehicleBrand;
  users: TUser[];
};

export type TNewVehicleModel = {
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  brandId: string;
};

export type TVehicleBrand = {
  id: string;
  name: string;
  logoUrl: string;
  models: TVehicleModel[];
};

export type TNewVehicleBrand = {
  name: string;
  logoUrl: string;
};

export type TCredentials = {
  email: string;
  password: string;
};

export type TAuthState = {
  user: TUserWithoutPassword | null;
  isAuth: boolean;
};
