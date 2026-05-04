// ── Steam CDN base (siempre confiable) ──
// Formato: https://cdn.akamai.steamstatic.com/steam/apps/{APP_ID}/header.jpg

export const featuredGames = [
  // ─── PC ───
  { id: 1,  title: 'Cyberpunk 2077',            price: 59.99, discount: 50, platform: 'PC',          isNew: false, categories: ['Action','Sci-Fi','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg' },
  { id: 3,  title: "Baldur's Gate 3",            price: 59.99, discount: 10, platform: 'PC',          isNew: true,  categories: ['RPG','Strategy'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg' },
  { id: 5,  title: 'The Witcher 3: Wild Hunt',   price: 29.99, discount: 75, platform: 'PC',          isNew: false, categories: ['RPG','Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg' },
  { id: 13, title: 'Dead by Daylight',           price: 19.99, discount: 50, platform: 'PC',          isNew: false, categories: ['Horror','Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg' },
  { id: 15, title: 'Elden Ring',                 price: 59.99, discount: 20, platform: 'PC',          isNew: false, categories: ['Action','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg' },
  { id: 16, title: 'Counter-Strike 2',           price: 0,     discount: 0,  platform: 'PC',          isNew: false, categories: ['FPS','Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg' },
  { id: 17, title: 'Red Dead Redemption 2',      price: 59.99, discount: 67, platform: 'PC',          isNew: false, categories: ['Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg' },
  { id: 18, title: 'Hades',                      price: 24.99, discount: 30, platform: 'PC',          isNew: false, categories: ['Action','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg' },

  // ─── PlayStation ───
  { id: 2,  title: 'Elden Ring PS5',             price: 59.99, discount: 15, platform: 'PlayStation', isNew: false, categories: ['Action','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg' },
  { id: 6,  title: 'Grand Theft Auto V',         price: 29.99, discount: 0,  platform: 'PlayStation', isNew: false, categories: ['Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg' },
  { id: 7,  title: 'Helldivers 2',               price: 39.99, discount: 0,  platform: 'PlayStation', isNew: true,  categories: ['Action','Sci-Fi'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2536700/header.jpg' },
  { id: 11, title: "Marvel's Spider-Man 2",      price: 69.99, discount: 15, platform: 'PlayStation', isNew: true,  categories: ['Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2284190/header.jpg' },
  { id: 19, title: 'God of War Ragnarök',        price: 59.99, discount: 30, platform: 'PlayStation', isNew: false, categories: ['Action','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg' },
  { id: 20, title: 'The Last of Us Part I',      price: 59.99, discount: 25, platform: 'PlayStation', isNew: false, categories: ['Action','Horror'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg' },
  { id: 21, title: 'Final Fantasy XVI',          price: 69.99, discount: 40, platform: 'PlayStation', isNew: false, categories: ['RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2515020/header.jpg' },

  // ─── Xbox ───
  { id: 4,  title: 'Red Dead Redemption 2 Xbox', price: 59.99, discount: 60, platform: 'Xbox',        isNew: false, categories: ['Action'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg' },
  { id: 9,  title: 'Forza Horizon 5',            price: 59.99, discount: 33, platform: 'Xbox',        isNew: false, categories: ['Racing'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg' },
  { id: 12, title: 'Halo Infinite',              price: 59.99, discount: 40, platform: 'Xbox',        isNew: false, categories: ['Action','Sci-Fi'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg' },
  { id: 22, title: 'Sea of Thieves',             price: 39.99, discount: 50, platform: 'Xbox',        isNew: false, categories: ['Adventure'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg' },
  { id: 23, title: 'Starfield',                  price: 69.99, discount: 35, platform: 'Xbox',        isNew: false, categories: ['RPG','Sci-Fi'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg' },
  { id: 24, title: 'Gears 5',                    price: 29.99, discount: 67, platform: 'Xbox',        isNew: false, categories: ['Action','Shooter'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/header.jpg' },

  // ─── Nintendo (Stardew + juegos multiplataforma en Switch) ───
  { id: 8,  title: 'Stardew Valley',             price: 14.99, discount: 20, platform: 'Nintendo',    isNew: false, categories: ['RPG','Simulation'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg' },
  { id: 10, title: 'Zelda: Tears of the Kingdom',price: 59.99, discount: 0,  platform: 'Nintendo',    isNew: false, categories: ['Action','RPG'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg' },
  { id: 14, title: 'Mario Kart 8 Deluxe',        price: 59.99, discount: 0,  platform: 'Nintendo',    isNew: false, categories: ['Racing'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg' },
  { id: 25, title: 'Super Mario Odyssey',         price: 59.99, discount: 0,  platform: 'Nintendo',    isNew: false, categories: ['Platformer'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg' },
  { id: 26, title: 'Animal Crossing: New Horizons',price: 59.99, discount: 0, platform: 'Nintendo',    isNew: false, categories: ['Simulation'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg' },
  { id: 27, title: 'Metroid Dread',              price: 39.99, discount: 10, platform: 'Nintendo',    isNew: false, categories: ['Action','Sci-Fi'],
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg' },
];

// ── Gift Cards ──
export const giftCards = {
  PC: [
    { id: 'pc-gc-1', title: 'Steam Wallet Card 20 USD',   price: 20.99, discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg' },
    { id: 'pc-gc-2', title: 'Steam Wallet Card 50 USD',   price: 50.99, discount: 5,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg' },
    { id: 'pc-gc-3', title: 'EA Play 1 mes',              price: 4.99,  discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1328670/header.jpg' },
    { id: 'pc-gc-4', title: 'Riot Points 1380 VP',        price: 9.99,  discount: 10, image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg' },
  ],
  PlayStation: [
    { id: 'ps-gc-1', title: 'PSN Card 20 USD',            price: 20.99, discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/2536700/header.jpg' },
    { id: 'ps-gc-2', title: 'PSN Card 50 USD',            price: 50.99, discount: 3,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg' },
    { id: 'ps-gc-3', title: 'PS Plus Essential 1 mes',    price: 8.99,  discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg' },
    { id: 'ps-gc-4', title: 'PS Plus Extra 3 meses',      price: 29.99, discount: 15, image: 'https://cdn.akamai.steamstatic.com/steam/apps/2515020/header.jpg' },
  ],
  Xbox: [
    { id: 'xb-gc-1', title: 'Xbox Gift Card 20 USD',      price: 20.99, discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg' },
    { id: 'xb-gc-2', title: 'Game Pass Ultimate 1 mes',   price: 14.99, discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/header.jpg' },
    { id: 'xb-gc-3', title: 'Game Pass Ultimate 3 meses', price: 39.99, discount: 10, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg' },
    { id: 'xb-gc-4', title: 'Xbox Live Gold 1 mes',       price: 9.99,  discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg' },
  ],
  Nintendo: [
    { id: 'ni-gc-1', title: 'Nintendo eShop Card 10 USD', price: 10.99, discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg' },
    { id: 'ni-gc-2', title: 'Nintendo eShop Card 25 USD', price: 25.99, discount: 0,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg' },
    { id: 'ni-gc-3', title: 'Nintendo Online 3 meses',    price: 7.99,  discount: 5,  image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg' },
    { id: 'ni-gc-4', title: 'Nintendo Online 12 meses',   price: 19.99, discount: 10, image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg' },
  ],
};

// ── Próximos lanzamientos ──
export const upcomingGames = {
  PC: [
    { id: 'up-pc-1', title: 'GTA VI',               releaseDate: '2026',      image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg' },
    { id: 'up-pc-2', title: 'Doom: The Dark Ages',   releaseDate: 'May 2025',  image: 'https://cdn.akamai.steamstatic.com/steam/apps/2179850/header.jpg' },
    { id: 'up-pc-3', title: 'Monster Hunter Wilds',  releaseDate: '2025',      image: 'https://cdn.akamai.steamstatic.com/steam/apps/2246340/header.jpg' },
  ],
  PlayStation: [
    { id: 'up-ps-1', title: 'Death Stranding 2',     releaseDate: 'Jun 2025',  image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg' },
    { id: 'up-ps-2', title: 'Ghost of Yōtei',        releaseDate: '2025',      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg' },
    { id: 'up-ps-3', title: 'Marvel Wolverine',       releaseDate: 'TBA',       image: 'https://cdn.akamai.steamstatic.com/steam/apps/2284190/header.jpg' },
  ],
  Xbox: [
    { id: 'up-xb-1', title: 'Fable',                 releaseDate: '2025',      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg' },
    { id: 'up-xb-2', title: 'State of Decay 3',      releaseDate: 'TBA',       image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg' },
    { id: 'up-xb-3', title: 'Perfect Dark',           releaseDate: 'TBA',       image: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/header.jpg' },
  ],
  Nintendo: [
    { id: 'up-ni-1', title: 'Nintendo Switch 2',     releaseDate: 'Jun 2025',  image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg' },
    { id: 'up-ni-2', title: 'Pokémon Legends Z-A',   releaseDate: '2025',      image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg' },
    { id: 'up-ni-3', title: 'Metroid Prime 4',        releaseDate: '2025',      image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg' },
  ],
};

export const gameCategories = ['Acción','Arcade','Aventura','Estrategia','FPS','Horror','Lucha','RPG','Racing','Sandbox','Shooter','Simulación','Sci-Fi'];

export const heroGame = {
  id: 99, title: 'Pragmata', price: 32.89, discount: 45, platform: 'PC',
  categories: ['Action','Sci-Fi'], isNew: true,
  image: 'https://cdn.akamai.steamstatic.com/steam/apps/3357650/header.jpg',
};

export const categoriesData = [
  { id: 1, name: 'Juegos de Acción',  count: 'Explora combates intensos',    image: 'https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg'  },
  { id: 2, name: 'RPG y Aventura',    count: 'Mundos masivos por descubrir',  image: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg'  },
  { id: 3, name: 'Estrategia',        count: 'Lidera tu imperio',             image: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg'  },
  { id: 4, name: 'Carreras',          count: 'Acelera a fondo',               image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg' },
];

export const testimonialsData = [
  { id: 1, name: "Alex 'Vortex' Chen",     role: 'Jugador Profesional', text: 'Nexus Games tiene el mejor catálogo y las ofertas más agresivas.',                        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400' },
  { id: 2, name: "Sarah 'Blade' Williams", role: 'Streamer de Twitch',  text: 'La interfaz es increíblemente fluida y comprar juegos toma solo unos segundos.',          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400' },
  { id: 3, name: 'Marcus Johnson',         role: 'Casual Gamer',        text: 'Conseguí The Witcher 3 y Red Dead Redemption 2 con unos descuentos brutales.',            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
];

export const PLATFORMS = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];

export const PLATFORM_COLORS = {
  PC:          { bg: '#666666', text: '#ffffff' },
  PlayStation: { bg: '#666666', text: '#ffffff' },
  Xbox:        { bg: '#666666', text: '#ffffff' },
  Nintendo:    { bg: '#666666', text: '#ffffff' },
};
