export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface CreateClientDto {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  phone?: string;
}