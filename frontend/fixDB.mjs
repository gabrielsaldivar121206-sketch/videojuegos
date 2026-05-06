import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyBXtl0CShWGREbKVwAAAAbSSJOI77MGSb4',
  authDomain: 'videojuegos-e555d.firebaseapp.com',
  projectId: 'videojuegos-e555d'
});
const db = getFirestore(app);

async function fix() {
  const snap = await getDocs(collection(db, 'games'));
  for (const d of snap.docs) {
    const data = d.data();
    let newImage = data.image;
    
    // Fix all header.jpg
    if (newImage && newImage.includes('header.jpg')) {
      newImage = newImage.replace('header.jpg', 'capsule_616x353.jpg');
    }
    
    // Fix low-res image URLs
    if (newImage && newImage.includes('width=360&height=203')) {
      newImage = newImage.replace('width=360&height=203', 'width=1280&height=720');
    }

    // Specific fixes
    const titleLower = (data.title || '').toLowerCase();
    if (titleLower.includes('mario bros')) {
      newImage = 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000068688/c42553b4fd0312c31e70ec7468c6c9cb186cd17f2a4ea349224f66ca1215bb41';
    }
    if (titleLower.includes('fortnite')) {
      newImage = 'https://cdn2.unrealengine.com/28-br-s28-egs-launcher-blade-2560x1440-2560x1440-97eb70b22df6.jpg';
    }
    if (titleLower.includes('crimson desert')) {
      newImage = 'https://cdn.akamai.steamstatic.com/steam/apps/2883490/capsule_616x353.jpg';
    }

    if (newImage !== data.image) {
      console.log(`Updating ${data.title}...`);
      await updateDoc(doc(db, 'games', d.id), { image: newImage });
    }
  }
  console.log('All fixed!');
  process.exit(0);
}

fix();
