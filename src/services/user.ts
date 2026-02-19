import { api } from './api';
import type { User } from '../types/user';

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/items');
  return res.data;
};

export const getPaginatedUsers = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<User[]> => {
  const res = await api.get<User[]>('/items', {
    params: { page, limit, search },
  });
  return res.data;
};

export const getUser = async (id: string): Promise<User> => {
  const res = await api.get<User>(`/items/${id}`);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};

export const createUser = async (data: User): Promise<User> => {
  const res = await api.post<User>('/items', data);
  return res.data;
};

export const updateUser = async (id: string, data: User): Promise<User> => {
  const res = await api.put<User>(`/items/${id}`, data);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_avatar');

  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const res = await fetch(`${url}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Upload failed');
  }

  const data = await res.json();
  return data.secure_url;
};
