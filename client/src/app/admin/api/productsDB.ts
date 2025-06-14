const id = crypto.randomUUID();
import Cookies from 'js-cookie';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import type { FormData } from '../../../app/helpers/typings';  
import { db } from './firebase';

const storage = getStorage();

const uploadImageToStorage = async (
  image: File,
  path: string
): Promise<string> => {
  const storageRef = ref(storage, `gs://drone-hive-d6daa.appspot.com/${path}`);
  const snapshot = await uploadBytes(storageRef, image);
  return await getDownloadURL(snapshot.ref);
};

export const addProduct = async (formData: FormData): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Користувач не авторизований');

  try {
    let productImageUrl = '';

    if (formData.productImage?.length) {
      productImageUrl = await uploadImageToStorage(
        formData.productImage[0],
        `products/${id}`
      );
    }

    const galleryImageUrls = await Promise.all(
      (formData.galleryImages || []).map(async ({ image }) => {
        if (image?.[0] instanceof File) {
          return await uploadImageToStorage(image[0], `products/${id}`);
        }
        return null;
      })
    ).then((urls) => urls.filter((url): url is string => url !== null));

    const productToUpload = {
      ...formData,
      productImageUrl,
      galleryImageUrls,
    };

    delete productToUpload.productImage;
    delete productToUpload.galleryImages;

    await addDoc(collection(db, 'products'), productToUpload);
  } catch (e) {
    alert('Ой! Схоже ви розлогінились :(');
    console.error('Помилка при додаванні продукту:', e);
    throw e;
  }
};

export const getProducts = async (): Promise<FormData[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as FormData));
  } catch (e) {
    console.error('Помилка при отриманні всіх продуктів:', e);
    throw e;
  }
};

export const getProductsByCategory = async (
  category: string
): Promise<FormData[]> => {
  try {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as FormData));
  } catch (e) {
    console.error(`Помилка при отриманні категорії "${category}":`, e);
    throw e;
  }
};

export const getProductsBySubCategory = async (
  subCategory: string
): Promise<FormData[]> => {
  try {
    const q = query(collection(db, 'products'), where('subCategory', '==', subCategory));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as FormData));
  } catch (e) {
    console.error(`Помилка при отриманні підкатегорії "${subCategory}":`, e);
    throw e;
  }
};

export const getProductByID = async (
  productId: string
): Promise<FormData | undefined> => {
  try {
    const docRef = doc(collection(db, 'products'), productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as FormData;
    } else {
      console.error(`Продукт з ID ${productId} не знайдений`);
      return undefined;
    }
  } catch (e) {
    console.error(`Помилка при отриманні продукту за ID "${productId}":`, e);
    throw e;
  }
};
