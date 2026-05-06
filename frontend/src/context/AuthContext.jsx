import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, googleProvider, storage } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Crear o actualizar perfil en Firestore
  const upsertUserProfile = async (firebaseUser) => {
    const ref = doc(db, 'users', firebaseUser.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || 'Jugador',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || null,
        bannerURL: null,
        role: 'user', // Por defecto todos son usuarios normales
        wishlist: [],
        library: [],
        createdAt: serverTimestamp()
      });
    }
    const updated = await getDoc(ref);
    setUserProfile(updated.data());
  };

  // Subir foto de perfil
  const uploadProfilePicture = async (file) => {
    if (!user) return null;
    try {
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Actualizar en Firebase Auth
      await updateProfile(user, { photoURL: downloadURL });
      
      // Actualizar en Firestore
      await updateDoc(doc(db, 'users', user.uid), { photoURL: downloadURL });
      
      // Actualizar estado local
      setUserProfile(prev => ({ ...prev, photoURL: downloadURL }));
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  };

  // Subir banner de perfil
  const uploadProfileBanner = async (file) => {
    if (!user) return null;
    try {
      const storageRef = ref(storage, `profile_banners/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Actualizar en Firestore
      await updateDoc(doc(db, 'users', user.uid), { bannerURL: downloadURL });
      
      // Actualizar estado local
      setUserProfile(prev => ({ ...prev, bannerURL: downloadURL }));
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading profile banner:", error);
      throw error;
    }
  };

  // Eliminar foto de perfil
  const deleteProfilePicture = async () => {
    if (!user || !userProfile?.photoURL) return;
    try {
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await deleteObject(storageRef);
      
      // Actualizar en Firebase Auth
      await updateProfile(user, { photoURL: null });
      
      // Actualizar en Firestore
      await updateDoc(doc(db, 'users', user.uid), { photoURL: null });
      
      // Actualizar estado local
      setUserProfile(prev => ({ ...prev, photoURL: null }));
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      throw error;
    }
  };

  // Eliminar banner de perfil
  const deleteProfileBanner = async () => {
    if (!user || !userProfile?.bannerURL) return;
    try {
      const storageRef = ref(storage, `profile_banners/${user.uid}`);
      await deleteObject(storageRef);
      
      // Actualizar en Firestore
      await updateDoc(doc(db, 'users', user.uid), { bannerURL: null });
      
      // Actualizar estado local
      setUserProfile(prev => ({ ...prev, bannerURL: null }));
    } catch (error) {
      console.error("Error deleting profile banner:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await upsertUserProfile(firebaseUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerWithEmail = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await upsertUserProfile({ ...cred.user, displayName });
    return cred;
  };

  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    await upsertUserProfile(cred.user);
    return cred;
  };

  const logout = () => signOut(auth);

  const refreshProfile = async () => {
    if (user) {
      const ref = doc(db, 'users', user.uid);
      const updated = await getDoc(ref);
      if (updated.exists()) {
        setUserProfile(updated.data());
      }
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    refreshProfile,
    uploadProfilePicture,
    uploadProfileBanner,
    deleteProfilePicture,
    deleteProfileBanner
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
