import { FIRESTORE } from '../../firebaseConfig';
import { collection, query, where, orderBy, limit, getDocs, addDoc, } from 'firebase/firestore';
import data from '../data';
const PAGE_SIZE = 3;

const getLatest = async () => {
  const productsRef = collection(FIRESTORE, 'products');
  const q = query(productsRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

const getFeatured = async () => {
  const productsRef = collection(FIRESTORE, 'products');
  const q = query(productsRef, where('featured', '==', true), limit(PAGE_SIZE));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

const getBySlug = async (slug) => {
  const productsRef = collection(FIRESTORE, 'products');
  const q = query(productsRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  return null;
};

const getByQuery = async ({
  q,
  category,
  sort,
  price,
  rating,
  page = '1'
}) => {
  let productsRef = collection(FIRESTORE, 'products');
  let firestoreQuery = query(productsRef);

  if (category && category !== 'all') {
    firestoreQuery = query(firestoreQuery, where('category', '==', category));
  }

  if (rating && rating !== 'all') {
    firestoreQuery = query(firestoreQuery, where('rating', '>=', Number(rating)));
  }

  // Firestore does not support complex queries for price ranges or text search like MongoDB.
  // You might need to adjust your approach for these features.

  if (sort) {
    const direction = sort === 'lowest' ? 'asc' : 'desc';
    firestoreQuery = query(firestoreQuery, orderBy('price', direction));
  }

  // Pagination with Firestore requires using startAfter and limit.
  // You would need to adjust your approach to implement pagination.

  const querySnapshot = await getDocs(firestoreQuery);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Firestore does not directly support counting documents or pages in the same way as MongoDB.
  // You might need to fetch all documents to count them or maintain a separate counter.

  return {
    products,
    // countProducts, page, pages, and categories would need to be adjusted for Firestore.
  };
};

const getCategories = async () => {
  const categoriesRef = collection(FIRESTORE, 'categories');
  const querySnapshot = await getDocs(categoriesRef);
  const categories = querySnapshot.docs.map(doc => doc.data().name);
  return categories;
};
const addProductsFirestore = async () => {
  try {
  // Add products to Firestore
    for (const product of data.products) {
      await addDoc(collection(FIRESTORE, 'products'), product);
      console.log(`Added product ${product.name}`);
    }

    console.log('Data added to Firestore successfully');
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
  }
}


const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getByQuery,
  getCategories,
  addProductsFirestore
};


export default productService;