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

const gamesToSeed = [
  {
    title: "Pragmata",
    price: 59.80,
    discount: 45,
    rating: 5.0,
    genre: "Acción / Aventura",
    categories: ["Acción", "Aventura", "Ciencia Ficción"],
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3357650/341da3fa5338fad44ae87b2d14edfe6be80ff4c3/capsule_616x353.jpg?t=1777351016", // Using elden ring placeholder as pragmata is not out
    isNew: true,
    systemReq: "OS: Windows 10/11 64-bit\nProcessor: Intel Core i7 / AMD Ryzen 7\nMemory: 16 GB RAM\nGraphics: NVIDIA GeForce RTX 3070"
  },
  {
    title: "Forza Horizon 6 Premium Edition + Acceso avanzado",
    price: 119.38,
    discount: 33,
    rating: 5.0,
    genre: "Carreras",
    categories: ["Carreras", "Mundo Abierto", "Multijugador"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg", // Forza horizon 5 placeholder
    isNew: true,
    systemReq: "OS: Windows 10/11 64-bit\nProcessor: Intel Core i5\nMemory: 16 GB RAM\nGraphics: NVIDIA GeForce RTX 3060"
  },
  {
    title: "Miasma Chronicles",
    price: 49.99,
    discount: 0,
    rating: 5.0,
    genre: "Estrategia",
    categories: ["RPG", "Estrategia"],
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1649010/capsule_616x353.jpg?t=1764623984",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 8 GB RAM"
  },
  {
    title: "Avatar: The Last Airbender",
    price: 39.99,
    discount: 0,
    rating: 5.0,
    genre: "Aventura",
    categories: ["Acción", "Aventura"],
    image: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000043029/4ff8a1e4c87575f265e51de4b90de45040aa6e5350b30fab13894bf493f2ea68",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 8 GB RAM"
  },
  {
    title: "Minecraft: Java & Bedrock Edition",
    price: 29.99,
    discount: 0,
    rating: 5.0,
    genre: "Supervivencia",
    categories: ["Supervivencia", "Mundo Abierto"],
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202603/3122/a4defb730333cc78c28f27f47b7d654f8353be50b0dc8050.jpg", // Project zomboid placeholder
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 4 GB RAM"
  },
  {
    title: "American Truck Simulator",
    price: 19.99,
    discount: 75,
    rating: 4.5,
    genre: "Simulación",
    categories: ["Simulación", "Conducción"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/270880/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7\nMemory: 4 GB RAM"
  },
  {
    title: "Crimson Desert",
    price: 59.99,
    discount: 0,
    rating: 5.0,
    genre: "RPG",
    categories: ["Acción", "RPG", "Mundo Abierto"],
    image: "https://img.asmedia.epimg.net/resizer/v2/WQDDDMXDFFCGRHFJBAFPWSCTKI.jpg?auth=04e831620ab4852fd5839db12a05a1ce01f58da18dc9febf733957980e31b69e&width=360&height=203&focal=474%2C364",
    isNew: true,
    systemReq: "OS: Windows 10/11\nMemory: 16 GB RAM"
  },
  {
    title: "Sengoku Dynasty",
    price: 29.99,
    discount: 15,
    rating: 5.0,
    genre: "Supervivencia / RPG",
    categories: ["Supervivencia", "RPG", "Estrategia"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1702010/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 16 GB RAM"
  },
  {
    title: "Cyberpunk 2077",
    price: 59.99,
    discount: 50,
    rating: 4.8,
    genre: "Acción / RPG",
    categories: ["Acción", "Sci-Fi", "RPG"],
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/a757b56d2078be8b09a04e2ad531f1fefafaa129/capsule_616x353.jpg?t=1769690377",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 16 GB RAM"
  },
  {
    title: "Elden Ring",
    price: 59.99,
    discount: 0,
    rating: 5.0,
    genre: "Acción / RPG",
    categories: ["Acción", "RPG", "Fantasía oscura"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 12 GB RAM"
  },
  {
    title: "Baldur's Gate 3",
    price: 59.99,
    discount: 10,
    rating: 5.0,
    genre: "RPG / Estrategia",
    categories: ["RPG", "Estrategia", "Mundo Abierto"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
    isNew: true,
    systemReq: "OS: Windows 10\nMemory: 16 GB RAM"
  },
  {
    title: "Red Dead Redemption 2",
    price: 59.99,
    discount: 60,
    rating: 4.9,
    genre: "Acción / Aventura",
    categories: ["Acción", "Aventura", "Mundo Abierto"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 12 GB RAM"
  },
  {
    title: "The Witcher 3: Wild Hunt",
    price: 29.99,
    discount: 75,
    rating: 5.0,
    genre: "RPG",
    categories: ["RPG", "Acción", "Mundo Abierto"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7\nMemory: 8 GB RAM"
  },
  {
    title: "Grand Theft Auto V",
    price: 29.99,
    discount: 0,
    rating: 4.8,
    genre: "Acción",
    categories: ["Acción", "Multijugador", "Mundo Abierto"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10\nMemory: 8 GB RAM"
  },
  {
    title: "Helldivers 2",
    price: 39.99,
    discount: 0,
    rating: 4.9,
    genre: "Acción / Sci-Fi",
    categories: ["Acción", "Sci-Fi", "Multijugador"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2536700/header.jpg",
    isNew: true,
    systemReq: "OS: Windows 10\nMemory: 16 GB RAM"
  },
  {
    title: "Stardew Valley",
    price: 14.99,
    discount: 20,
    rating: 5.0,
    genre: "Simulación / RPG",
    categories: ["RPG", "Simulación", "Indie"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
    isNew: false,
    systemReq: "OS: Windows Vista\nMemory: 2 GB RAM"
  },
  {
    title: "Hollow Knight",
    price: 14.99,
    discount: 50,
    rating: 5.0,
    genre: "Metroidvania",
    categories: ["Acción", "Indie", "Plataformas"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7\nMemory: 4 GB RAM\nGraphics: GeForce 9800GTX+"
  },
  {
    title: "Hades",
    price: 24.99,
    discount: 40,
    rating: 5.0,
    genre: "Roguelike",
    categories: ["Acción", "Indie", "RPG"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7 SP1\nMemory: 4 GB RAM\nGraphics: 1GB VRAM"
  },
  {
    title: "Dead Cells",
    price: 24.99,
    discount: 40,
    rating: 4.8,
    genre: "Roguelike / Metroidvania",
    categories: ["Acción", "Indie"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7+\nMemory: 2 GB RAM\nGraphics: Nvidia 450 GTS / Radeon HD 5750"
  },
  {
    title: "Terraria",
    price: 9.99,
    discount: 50,
    rating: 5.0,
    genre: "Supervivencia",
    categories: ["Indie", "Supervivencia", "Mundo Abierto"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg",
    isNew: false,
    systemReq: "OS: Windows Xp, Vista, 7, 8/8.1, 10\nMemory: 2.5 GB RAM\nGraphics: 128mb Video Memory"
  },
  {
    title: "God of War",
    price: 49.99,
    discount: 40,
    rating: 4.9,
    genre: "Acción / Aventura",
    categories: ["Acción", "Aventura", "RPG"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10 64-bit\nMemory: 8 GB RAM\nGraphics: NVIDIA GTX 960 (4 GB)"
  },
  {
    title: "Marvel's Spider-Man Remastered",
    price: 59.99,
    discount: 33,
    rating: 4.8,
    genre: "Acción",
    categories: ["Acción", "Mundo Abierto", "Aventura"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10 64-bit\nMemory: 8 GB RAM\nGraphics: NVIDIA GTX 950"
  },
  {
    title: "Resident Evil 4",
    price: 39.99,
    discount: 25,
    rating: 5.0,
    genre: "Survival Horror",
    categories: ["Acción", "Terror", "Supervivencia"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg",
    isNew: true,
    systemReq: "OS: Windows 10 64-bit\nMemory: 8 GB RAM\nGraphics: AMD Radeon RX 560"
  },
  {
    title: "Sekiro: Shadows Die Twice",
    price: 59.99,
    discount: 50,
    rating: 4.9,
    genre: "Acción",
    categories: ["Acción", "Aventura"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7 64-bit\nMemory: 4 GB RAM\nGraphics: NVIDIA GeForce GTX 760"
  },
  {
    title: "It Takes Two",
    price: 39.99,
    discount: 65,
    rating: 5.0,
    genre: "Acción / Aventura",
    categories: ["Multijugador", "Acción", "Aventura"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1426210/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 8.1 64-bit\nMemory: 8 GB RAM\nGraphics: Nvidia GTX 980"
  },
  {
    title: "Ghost of Tsushima DIRECTOR'S CUT",
    price: 59.99,
    discount: 0,
    rating: 4.9,
    genre: "Acción / Aventura",
    categories: ["Acción", "Mundo Abierto", "Aventura"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/2215430/header.jpg",
    isNew: true,
    systemReq: "OS: Windows 10 64-bit\nMemory: 8 GB RAM\nGraphics: NVIDIA GeForce GTX 960 4GB"
  },
  {
    title: "Persona 5 Royal",
    price: 59.99,
    discount: 50,
    rating: 5.0,
    genre: "RPG",
    categories: ["RPG", "Estrategia"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1687950/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 10 64-bit\nMemory: 8 GB RAM\nGraphics: Nvidia GeForce GTX 650 Ti"
  },
  {
    title: "Celeste",
    price: 19.99,
    discount: 75,
    rating: 5.0,
    genre: "Plataformas",
    categories: ["Indie", "Plataformas"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg",
    isNew: false,
    systemReq: "OS: Windows 7\nMemory: 2 GB RAM\nGraphics: Intel HD 4000"
  },
  {
    title: "Lies of P",
    price: 59.99,
    discount: 30,
    rating: 4.8,
    genre: "Acción / RPG",
    categories: ["Acción", "RPG", "Fantasía oscura"],
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg",
    isNew: true,
    systemReq: "OS: Windows 10 64bit\nMemory: 8 GB RAM\nGraphics: AMD Radeon RX 560 4GB / NVIDIA GeForce GTX 960 4GB"
  }
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
