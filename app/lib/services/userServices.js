import { FIRESTORE } from '../../firebaseConfig';
import { collection, query, where, orderBy, limit, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

const PAGE_SIZE = 3;

const getUsers = async () => {
  const usersRef = collection(FIRESTORE, 'users');
  const q = query(usersRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return users;
};

const getUserByEmail = async (email) => {
  const usersRef = collection(FIRESTORE, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  return null;
};

const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(FIRESTORE, 'users'), userData);
    console.log(`User added with ID: ${docRef.id}`);
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    await deleteDoc(collection(FIRESTORE, 'users', userId));
    console.log(`User with ID: ${userId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting user from Firestore:', error);
  }
};

const userService = {
  getUsers,
  getUserByEmail,
  addUser,
  deleteUser,
};

export default userService;