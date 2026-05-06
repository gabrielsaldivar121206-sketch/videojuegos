export const PLATFORM_COLORS = {
  PC:          { bg: '#666666', text: '#ffffff' },
  PlayStation: { bg: '#666666', text: '#ffffff' },
  Xbox:        { bg: '#666666', text: '#ffffff' },
  Nintendo:    { bg: '#666666', text: '#ffffff' },
};

export const featuredGames = [
  // ─── PC (Juegos Populares Añadidos) ───
  { id: 'pc-mc', title: 'Minecraft Java & Bedrock Edition', price: 29.99, discount: 20, platform: 'PC', isNew: true, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1672970/capsule_616x353.jpg' },
  { id: 'pc-fc', title: 'EA SPORTS FC 24', price: 69.99, discount: 50, platform: 'PC', isNew: true, categories: ['Sports'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/capsule_616x353.jpg' },
  { id: 'pc-bndy', title: 'Bendy and the Ink Machine', price: 19.99, discount: 75, platform: 'PC', isNew: false, categories: ['Horror','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/622650/capsule_616x353.jpg' },
  
  // ─── PC (10 Juegos) ───
  { id: 'pc-1', title: 'Cyberpunk 2077', price: 59.99, discount: 50, platform: 'PC', isNew: false, categories: ['Action','RPG','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg' },
  { id: 'pc-2', title: "Baldur's Gate 3", price: 59.99, discount: 10, platform: 'PC', isNew: true, categories: ['RPG','Strategy'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg' },
  { id: 'pc-3', title: 'Elden Ring', price: 59.99, discount: 20, platform: 'PC', isNew: false, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg' },
  { id: 'pc-4', title: 'Red Dead Redemption 2', price: 59.99, discount: 67, platform: 'PC', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg' },
  { id: 'pc-5', title: 'Counter-Strike 2', price: 0, discount: 0, platform: 'PC', isNew: false, categories: ['FPS','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg' },
  { id: 'pc-6', title: 'The Witcher 3: Wild Hunt', price: 29.99, discount: 75, platform: 'PC', isNew: false, categories: ['RPG','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_616x353.jpg' },
  { id: 'pc-7', title: 'Dead by Daylight', price: 19.99, discount: 50, platform: 'PC', isNew: false, categories: ['Horror','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/capsule_616x353.jpg' },
  { id: 'pc-8', title: 'DOOM Eternal', price: 39.99, discount: 75, platform: 'PC', isNew: false, categories: ['FPS','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/782330/capsule_616x353.jpg' },
  { id: 'pc-9', title: 'Resident Evil 4', price: 39.99, discount: 25, platform: 'PC', isNew: true, categories: ['Horror','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_616x353.jpg' },
  { id: 'pc-10', title: 'Monster Hunter: World', price: 29.99, discount: 50, platform: 'PC', isNew: false, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/582010/capsule_616x353.jpg' },

  // ─── PlayStation (10 Juegos) ───
  { id: 'ps-0', title: 'The Last of Us Part II', price: 59.99, discount: 40, platform: 'PlayStation', isNew: false, categories: ['Action','Horror','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2531310/library_hero.jpg' },
  { id: 'ps-1', title: "Ghost of Tsushima DIRECTOR'S CUT", price: 59.99, discount: 20, platform: 'PlayStation', isNew: true, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2215430/capsule_616x353.jpg' },
  { id: 'ps-2', title: 'God of War Ragnarök', price: 59.99, discount: 30, platform: 'PlayStation', isNew: true, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/capsule_616x353.jpg' },
  { id: 'ps-3', title: "Marvel's Spider-Man Remastered", price: 59.99, discount: 40, platform: 'PlayStation', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1817070/capsule_616x353.jpg' },
  { id: 'ps-4', title: 'The Last of Us Part I', price: 59.99, discount: 25, platform: 'PlayStation', isNew: false, categories: ['Action','Horror'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/capsule_616x353.jpg' },
  { id: 'ps-5', title: 'Horizon Zero Dawn', price: 49.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/capsule_616x353.jpg' },
  { id: 'ps-6', title: 'Returnal', price: 59.99, discount: 20, platform: 'PlayStation', isNew: false, categories: ['Action','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1649240/capsule_616x353.jpg' },
  { id: 'ps-7', title: 'Days Gone', price: 49.99, discount: 60, platform: 'PlayStation', isNew: false, categories: ['Action','Horror'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1259420/capsule_616x353.jpg' },
  { id: 'ps-8', title: 'Helldivers 2', price: 39.99, discount: 0, platform: 'PlayStation', isNew: true, categories: ['Action','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2536700/capsule_616x353.jpg' },
  { id: 'ps-9', title: 'UNCHARTED: Legacy of Thieves', price: 49.99, discount: 40, platform: 'PlayStation', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1659420/capsule_616x353.jpg' },
  { id: 'ps-10', title: 'Final Fantasy VII Remake', price: 69.99, discount: 30, platform: 'PlayStation', isNew: false, categories: ['RPG','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1462040/capsule_616x353.jpg' },

  // ─── Xbox (10 Juegos) ───
  { id: 'xb-1', title: 'Forza Horizon 5', price: 59.99, discount: 33, platform: 'Xbox', isNew: false, categories: ['Racing'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg' },
  { id: 'xb-2', title: 'Halo Infinite', price: 59.99, discount: 40, platform: 'Xbox', isNew: false, categories: ['FPS','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/capsule_616x353.jpg' },
  { id: 'xb-3', title: 'Sea of Thieves', price: 39.99, discount: 50, platform: 'Xbox', isNew: false, categories: ['Adventure','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/capsule_616x353.jpg' },
  { id: 'xb-4', title: 'Starfield', price: 69.99, discount: 35, platform: 'Xbox', isNew: true, categories: ['RPG','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg' },
  { id: 'xb-5', title: 'Gears 5', price: 29.99, discount: 67, platform: 'Xbox', isNew: false, categories: ['Action','Shooter'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/capsule_616x353.jpg' },
  { id: 'xb-6', title: "Senua's Saga: Hellblade II", price: 49.99, discount: 0, platform: 'Xbox', isNew: true, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2461430/capsule_616x353.jpg' },
  { id: 'xb-7', title: 'Age of Empires IV', price: 39.99, discount: 25, platform: 'Xbox', isNew: false, categories: ['Strategy'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1466860/capsule_616x353.jpg' },
  { id: 'xb-8', title: 'Microsoft Flight Simulator', price: 59.99, discount: 20, platform: 'Xbox', isNew: false, categories: ['Simulation'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1250410/capsule_616x353.jpg' },
  { id: 'xb-9', title: 'Ori and the Will of the Wisps', price: 29.99, discount: 50, platform: 'Xbox', isNew: false, categories: ['Adventure','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1057090/capsule_616x353.jpg' },
  { id: 'xb-10', title: 'State of Decay 2', price: 29.99, discount: 50, platform: 'Xbox', isNew: false, categories: ['Action','Horror'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/495420/capsule_616x353.jpg' },

  // ─── Nintendo (10 Juegos) ───
  { id: 'ni-1', title: 'Hollow Knight', price: 14.99, discount: 50, platform: 'Nintendo', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg' },
  { id: 'ni-2', title: 'Stardew Valley', price: 14.99, discount: 20, platform: 'Nintendo', isNew: false, categories: ['RPG','Simulation'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg' },
  { id: 'ni-3', title: 'Hades', price: 24.99, discount: 30, platform: 'Nintendo', isNew: false, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/capsule_616x353.jpg' },
  { id: 'ni-4', title: 'Celeste', price: 19.99, discount: 75, platform: 'Nintendo', isNew: false, categories: ['Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/504230/capsule_616x353.jpg' },
  { id: 'ni-5', title: 'Dead Cells', price: 24.99, discount: 40, platform: 'Nintendo', isNew: false, categories: ['Action','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/capsule_616x353.jpg' },
  { id: 'ni-6', title: 'Cuphead', price: 19.99, discount: 30, platform: 'Nintendo', isNew: false, categories: ['Action','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/268910/capsule_616x353.jpg' },
  { id: 'ni-7', title: 'Ori and the Blind Forest', price: 19.99, discount: 60, platform: 'Nintendo', isNew: false, categories: ['Adventure','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/387290/capsule_616x353.jpg' },
  { id: 'ni-8', title: 'Persona 5 Royal', price: 59.99, discount: 40, platform: 'Nintendo', isNew: false, categories: ['RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1687950/capsule_616x353.jpg' },
  { id: 'ni-9', title: 'Sonic Mania', price: 19.99, discount: 50, platform: 'Nintendo', isNew: false, categories: ['Action','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/584400/capsule_616x353.jpg' },
  { id: 'ni-10', title: 'Blasphemous', price: 24.99, discount: 60, platform: 'Nintendo', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/774361/capsule_616x353.jpg' },

  // ─── PC (Nuevos Clásicos) ───
  { id: 'pc-11', title: 'Half-Life 2', price: 9.99, discount: 90, platform: 'PC', isNew: false, categories: ['FPS','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/220/capsule_616x353.jpg' },
  { id: 'pc-12', title: 'Portal 2', price: 9.99, discount: 90, platform: 'PC', isNew: false, categories: ['Puzzle','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/620/capsule_616x353.jpg' },
  { id: 'pc-13', title: 'The Elder Scrolls V: Skyrim', price: 39.99, discount: 50, platform: 'PC', isNew: false, categories: ['RPG','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/capsule_616x353.jpg' },
  { id: 'pc-14', title: 'Grand Theft Auto V', price: 29.99, discount: 60, platform: 'PC', isNew: false, categories: ['Action','Sandbox'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/capsule_616x353.jpg' },
  { id: 'pc-15', title: 'Left 4 Dead 2', price: 9.99, discount: 90, platform: 'PC', isNew: false, categories: ['FPS','Horror'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/550/capsule_616x353.jpg' },
  { id: 'pc-16', title: 'BioShock Infinite', price: 29.99, discount: 75, platform: 'PC', isNew: false, categories: ['FPS','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/8870/capsule_616x353.jpg' },
  { id: 'pc-17', title: 'Fallout: New Vegas', price: 9.99, discount: 75, platform: 'PC', isNew: false, categories: ['RPG','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/22380/capsule_616x353.jpg' },
  { id: 'pc-18', title: 'Mass Effect Legendary Edition', price: 59.99, discount: 80, platform: 'PC', isNew: false, categories: ['RPG','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1328670/capsule_616x353.jpg' },
  { id: 'pc-19', title: 'Terraria', price: 9.99, discount: 50, platform: 'PC', isNew: false, categories: ['Sandbox','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/capsule_616x353.jpg' },
  { id: 'pc-20', title: 'Sid Meier\'s Civilization VI', price: 59.99, discount: 90, platform: 'PC', isNew: false, categories: ['Strategy'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/capsule_616x353.jpg' },

  // ─── PlayStation (Nuevos Clásicos) ───
  { id: 'ps-11', title: 'Detroit: Become Human', price: 39.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Adventure','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1222140/capsule_616x353.jpg' },
  { id: 'ps-12', title: "Marvel's Spider-Man: Miles Morales", price: 49.99, discount: 40, platform: 'PlayStation', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1817190/capsule_616x353.jpg' },
  { id: 'ps-13', title: 'Horizon Forbidden West', price: 59.99, discount: 20, platform: 'PlayStation', isNew: true, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/2420110/capsule_616x353.jpg' },
  { id: 'ps-14', title: 'Ratchet & Clank: Rift Apart', price: 59.99, discount: 33, platform: 'PlayStation', isNew: false, categories: ['Action','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1895880/capsule_616x353.jpg' },
  { id: 'ps-15', title: 'Death Stranding', price: 39.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Adventure','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1850570/capsule_616x353.jpg' },
  { id: 'ps-16', title: 'Heavy Rain', price: 19.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Adventure','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1222120/capsule_616x353.jpg' },
  { id: 'ps-17', title: 'Beyond: Two Souls', price: 19.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Adventure','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1222130/capsule_616x353.jpg' },
  { id: 'ps-18', title: 'Sackboy: A Big Adventure', price: 59.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Platformer','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1599660/capsule_616x353.jpg' },
  { id: 'ps-19', title: 'Journey', price: 14.99, discount: 50, platform: 'PlayStation', isNew: false, categories: ['Adventure','Indie'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1036840/capsule_616x353.jpg' },
  { id: 'ps-20', title: 'Nioh 2', price: 49.99, discount: 40, platform: 'PlayStation', isNew: false, categories: ['Action','RPG'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1301210/capsule_616x353.jpg' },

  // ─── Xbox (Nuevos Clásicos) ───
  { id: 'xb-11', title: 'Halo: The Master Chief Collection', price: 39.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['FPS','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/976730/capsule_616x353.jpg' },
  { id: 'xb-12', title: 'Forza Horizon 4', price: 59.99, discount: 67, platform: 'Xbox', isNew: false, categories: ['Racing'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1293830/capsule_616x353.jpg' },
  { id: 'xb-13', title: 'Fable Anniversary', price: 34.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['RPG','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/288470/capsule_616x353.jpg' },
  { id: 'xb-14', title: 'Sunset Overdrive', price: 19.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/847370/capsule_616x353.jpg' },
  { id: 'xb-15', title: 'Ryse: Son of Rome', price: 9.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Action','Adventure'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/302510/capsule_616x353.jpg' },
  { id: 'xb-16', title: 'Quantum Break', price: 39.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Action','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/474960/capsule_616x353.jpg' },
  { id: 'xb-17', title: 'State of Decay: Year-One', price: 19.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Action','Horror'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/329430/capsule_616x353.jpg' },
  { id: 'xb-18', title: 'Gears Tactics', price: 39.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Strategy','Sci-Fi'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/1184050/capsule_616x353.jpg' },
  { id: 'xb-19', title: 'Ori and the Blind Forest: Definitive Edition', price: 19.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Adventure','Platformer'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/387290/capsule_616x353.jpg' },
  { id: 'xb-20', title: 'Psychonauts 2', price: 59.99, discount: 75, platform: 'Xbox', isNew: false, categories: ['Platformer','Action'], image: 'https://cdn.akamai.steamstatic.com/steam/apps/607080/capsule_616x353.jpg' },

  // ─── Nintendo (Nuevos Clásicos) ───
  { id: 'ni-11', title: 'Super Mario Odyssey', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Platformer','Action'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/s/super-mario-odyssey-switch/hero' },
  { id: 'ni-12', title: 'The Legend of Zelda: Breath of the Wild', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Action','Adventure'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero' },
  { id: 'ni-13', title: 'Super Smash Bros. Ultimate', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Fighting','Action'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/s/super-smash-bros-ultimate-switch/hero' },
  { id: 'ni-14', title: 'Mario Kart 8 Deluxe', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Racing','Arcade'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/m/mario-kart-8-deluxe-switch/hero' },
  { id: 'ni-15', title: 'Animal Crossing: New Horizons', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Simulation'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/a/animal-crossing-new-horizons-switch/hero' },
  { id: 'ni-16', title: 'Pokémon Sword / Shield', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['RPG','Action'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/p/pokemon-sword-switch/hero' },
  { id: 'ni-17', title: 'Luigi\'s Mansion 3', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Adventure','Action'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/l/luigis-mansion-3-switch/hero' },
  { id: 'ni-18', title: 'Splatoon 3', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Action','Shooter'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/s/splatoon-3-switch/hero' },
  { id: 'ni-19', title: 'Metroid Dread', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Action','Adventure'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/m/metroid-dread-switch/hero' },
  { id: 'ni-20', title: 'Kirby and the Forgotten Land', price: 59.99, discount: 0, platform: 'Nintendo', isNew: false, categories: ['Platformer','Action'], image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/ncom/en_US/games/switch/k/kirby-and-the-forgotten-land-switch/hero' }
];

export const giftCards = {
  PC: [
    { id: 'pc-gc-1', title: 'Steam Wallet Card 20 USD', price: 20.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg' },
    { id: 'pc-gc-2', title: 'Steam Wallet Card 50 USD', price: 50.99, discount: 5, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg' },
    { id: 'pc-gc-3', title: 'EA Play 1 mes', price: 4.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1328670/capsule_616x353.jpg' },
  ],
  PlayStation: [
    { id: 'ps-gc-1', title: 'PSN Card 20 USD', price: 20.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/2536700/capsule_616x353.jpg' },
    { id: 'ps-gc-2', title: 'PSN Card 50 USD', price: 50.99, discount: 3, image: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/capsule_616x353.jpg' },
    { id: 'ps-gc-3', title: 'PS Plus Essential 1 mes', price: 8.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/capsule_616x353.jpg' },
  ],
  Xbox: [
    { id: 'xb-gc-1', title: 'Xbox Gift Card 20 USD', price: 20.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/capsule_616x353.jpg' },
    { id: 'xb-gc-2', title: 'Game Pass Ultimate 1 mes', price: 14.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1097840/capsule_616x353.jpg' },
    { id: 'xb-gc-3', title: 'Game Pass Ultimate 3 meses', price: 39.99, discount: 10, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg' },
  ],
  Nintendo: [
    { id: 'ni-gc-1', title: 'Nintendo eShop Card 10 USD', price: 10.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg' },
    { id: 'ni-gc-2', title: 'Nintendo eShop Card 25 USD', price: 25.99, discount: 0, image: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/capsule_616x353.jpg' },
    { id: 'ni-gc-3', title: 'Nintendo Online 3 meses', price: 7.99, discount: 5, image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/capsule_616x353.jpg' },
  ],
};

export const upcomingGames = {
  PC: [
    { id: 'up-pc-1', title: 'GTA VI', releaseDate: '2026', image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/capsule_616x353.jpg' },
    { id: 'up-pc-2', title: 'Doom: The Dark Ages', releaseDate: 'May 2025', image: 'https://cdn.akamai.steamstatic.com/steam/apps/782330/capsule_616x353.jpg' },
  ],
  PlayStation: [
    { id: 'up-ps-1', title: 'Death Stranding 2', releaseDate: 'Jun 2025', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1850570/capsule_616x353.jpg' },
    { id: 'up-ps-2', title: 'Ghost of Yōtei', releaseDate: '2025', image: 'https://cdn.akamai.steamstatic.com/steam/apps/2215430/capsule_616x353.jpg' },
  ],
  Xbox: [
    { id: 'up-xb-1', title: 'Fable', releaseDate: '2025', image: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/capsule_616x353.jpg' },
    { id: 'up-xb-2', title: 'State of Decay 3', releaseDate: 'TBA', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1329380/capsule_616x353.jpg' },
  ],
  Nintendo: [
    { id: 'up-ni-1', title: 'Nintendo Switch 2', releaseDate: 'Jun 2025', image: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/capsule_616x353.jpg' },
    { id: 'up-ni-2', title: 'Pokémon Legends Z-A', releaseDate: '2025', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/capsule_616x353.jpg' },
  ],
};

export const gameCategories = ['Action','Arcade','Adventure','Strategy','FPS','Horror','Fighting','RPG','Racing','Sandbox','Shooter','Simulation','Sci-Fi'];

export const heroGame = {
  id: 'ps-0', title: 'The Last of Us Part II', price: 59.99, discount: 40, platform: 'PlayStation', categories: ['Action','Horror','Adventure'], isNew: false,
  image: 'https://cdn.akamai.steamstatic.com/steam/apps/2531310/library_hero.jpg',
};

export const categoriesData = [
  { id: 1, name: 'Juegos de Acción', count: 'Explora combates intensos', image: 'https://cdn.akamai.steamstatic.com/steam/apps/782330/capsule_616x353.jpg' },
  { id: 2, name: 'RPG y Aventura', count: 'Mundos masivos por descubrir', image: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/capsule_616x353.jpg' },
  { id: 3, name: 'Estrategia', count: 'Lidera tu imperio', image: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/capsule_616x353.jpg' },
  { id: 4, name: 'Carreras', count: 'Acelera a fondo', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg' },
];

export const testimonialsData = [
  { id: 1, name: "Alex 'Vortex' Chen", role: 'Jugador Profesional', text: 'Nexus Games tiene el mejor catálogo y las ofertas más agresivas.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400' },
  { id: 2, name: "Sarah 'Blade' Williams", role: 'Streamer de Twitch', text: 'La interfaz es increíblemente fluida y comprar juegos toma solo unos segundos.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400' },
  { id: 3, name: 'Marcus Johnson', role: 'Casual Gamer', text: 'Conseguí The Witcher 3 y Red Dead Redemption 2 con unos descuentos brutales.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
];

export const PLATFORMS = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];

export const cleanGameImage = (game) => {
  if (!game || !game.image) return game;
  return game;
};
