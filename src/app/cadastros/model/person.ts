import { Vehicle } from './vehicle';

export interface Person {
  personId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  addressNumber: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  vehicle: Vehicle[];
}
