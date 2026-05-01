import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXtl0CShWGREbKVwAAAAbSSJOI77MGSb4",
  authDomain: "videojuegos-e555d.firebaseapp.com",
  projectId: "videojuegos-e555d",
  storageBucket: "videojuegos-e555d.firebasestorage.app",
  messagingSenderId: "776440821829",
  appId: "1:776440821829:web:84cdfffcb22b097095cb2c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const makeAdmin = async (email) => {
  if (!email) {
    console.error("❌ Por favor, proporciona un correo. Ejemplo: node makeAdmin.js micorreo@gmail.com");
    process.exit(1);
  }

  console.log(`🔍 Buscando usuario con correo: ${email}...`);
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error(`❌ No se encontró ningún usuario con el correo: ${email}`);
    console.log("Asegúrate de haber iniciado sesión en la página web al menos una vez con este correo para que se cree tu perfil.");
    process.exit(1);
  }

  const userDoc = querySnapshot.docs[0];
  await updateDoc(doc(db, "users", userDoc.id), {
    role: 'admin'
  });

  console.log(`✅ ¡Éxito! El usuario ${email} ahora es ADMINISTRADOR.`);
  process.exit(0);
};

const emailArg = process.argv[2];
makeAdmin(emailArg).catch(console.error);
