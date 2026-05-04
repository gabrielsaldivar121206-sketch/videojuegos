import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

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

// Import game data from data/games.js
import { featuredGames, heroGame } from './src/data/games.js';

const gamesToSeed = [
  // Add heroGame first (Pragmata)
  {
    title: heroGame.title,
    price: heroGame.price,
    discount: heroGame.discount,
    rating: 5.0,
    genre: heroGame.categories.join(', '),
    categories: heroGame.categories,
    image: heroGame.image,
    isNew: heroGame.isNew,
    systemReq: "OS: Windows 10/11 64-bit\nProcessor: Intel Core i7 / AMD Ryzen 7\nMemory: 16 GB RAM\nGraphics: NVIDIA GeForce RTX 3070"
  },
  // Map featuredGames
  ...featuredGames.map(game => ({
    title: game.title,
    price: game.price,
    discount: game.discount,
    rating: 5.0,
    genre: game.categories.join(', '),
    categories: game.categories,
    image: game.image,
    isNew: game.isNew,
    systemReq: "OS: Windows 10\nMemory: 8 GB RAM" // generic requirement
  }))
];

const seedDB = async () => {
  console.log("Conectando a Firebase y limpiando la base de datos...");
  const gamesCol = collection(db, "games");
  const querySnapshot = await getDocs(gamesCol);

  for (const document of querySnapshot.docs) {
    await deleteDoc(doc(db, "games", document.id));
    console.log(`Eliminado: ${document.id}`);
  }

  console.log("Subiendo nuevos juegos...");
  for (const game of gamesToSeed) {
    const docRef = await addDoc(gamesCol, game);
    console.log(`Añadido: ${game.title} con ID: ${docRef.id}`);
  }

  console.log("¡Semilla completada exitosamente!");
  process.exit(0);
};

seedDB().catch(console.error);