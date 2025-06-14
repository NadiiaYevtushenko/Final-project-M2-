'use client'

import { collection, addDoc, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';

import { db } from './firebase';

interface User {
  id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}


export const registerCustomer = async (formData: User): Promise<any> => {
 try {
   await addDoc(collection(db, 'customers'), formData);
 } catch (e) {
     console.error('Помилка при відправці даних форми реєстрації:', e);
     throw e;
 }
};

export const getCustomer = async (): Promise<User[]> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Користувач не авторизований');
  }

  const querySnapshot = await getDocs(collection(db, 'customers'));
  const users: User[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as User;
    users.push({ ...data, id: doc.id });
  });

  return users;
};