import apiClient from './apiClient.js';

const fallbackBirthdays = [
  {
    id: 'a1',
    name: 'Ana Bezerra',
    birthDate: '1992-05-15',
    ministry: 'Pastoral Infantil',
    contact: '(11) 99999-1234'
  },
  {
    id: 'b2',
    name: 'Bruno Carvalho',
    birthDate: '1987-06-03',
    ministry: 'Liturgia',
    contact: 'bruno@paroquia.com'
  },
  {
    id: 'c3',
    name: 'Carla Dias',
    birthDate: '1995-04-28',
    ministry: 'Música',
    contact: '(11) 98888-4321'
  },
  {
    id: 'd4',
    name: 'Daniel Souza',
    birthDate: '1980-05-30',
    ministry: 'Juventude',
    contact: 'daniel@paroquia.com'
  },
  {
    id: 'e5',
    name: 'Elisa Tavares',
    birthDate: '1999-12-02',
    ministry: 'Acolhida',
    contact: '(11) 97777-0000'
  }
];

const birthdayService = {
  async list() {
    try {
      const response = await apiClient.get('/api/birthdays');
      return response.data;
    } catch (error) {
      console.warn('Usando aniversariantes de exemplo (fallback).', error?.message ?? error);
      return fallbackBirthdays;
    }
  },

  async create(payload) {
    const response = await apiClient.post('/api/birthdays', payload);
    return response.data;
  }
};

export default birthdayService;
