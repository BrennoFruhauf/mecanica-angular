import { Vehicle } from './vehicle';
import { Address } from './address';

export interface Person {
  personId: string;
  personRole: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address?: Address;
  vehicles?: Vehicle[];
}
