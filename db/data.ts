import { Role } from ".prisma/client";

// Customer Data (10)
export const customers = [
  {
    fullname: "Devonna Gohn",
    email: "dgohn0@gravatar.com",
    password: "oQqupSqQ7J6Z",
    shippingAddress: "56 Mcguire Court",
    phone: "868-457-3515",
  },
  {
    fullname: "Sarena Sapir",
    email: "ssapir1@quantcast.com",
    password: "K7lI5tml",
    shippingAddress: "425 Aberg Alley",
    phone: "732-407-2992",
  },
  {
    fullname: "Constantine Duncanson",
    email: "cduncanson2@merriam-webster.com",
    password: "815f16",
    shippingAddress: "217 Melvin Hill",
    phone: "998-181-2642",
  },
  {
    fullname: "Mr.Demo",
    email: "demo@gmail.com",
    password: "$2b$10$1RVAMssajUDlT1ejrw13COnkppuj4BaidguYcIo3knI41cXi/lAcm",
    shippingAddress: "4 Anthes Circle",
    phone: null,
  },
  {
    fullname: "Ruthi Shotter",
    email: "rshotter4@parallels.com",
    password: "3H5X3q",
    shippingAddress: "2640 Heath Center",
    phone: null,
  },
  {
    fullname: "Issie Patzelt",
    email: "ipatzelt5@answers.com",
    password: "l2AATT",
    shippingAddress: "2413 Glacier Hill Hill",
    phone: "123-658-2298",
  },
  {
    fullname: "Genevieve Aldam",
    email: "galdam6@amazonaws.com",
    password: "XLZu9vV",
    shippingAddress: "948 Almo Street",
    phone: "875-764-0070",
  },
  {
    fullname: "Lefty MacMichael",
    email: "lmacmichael7@newyorker.com",
    password: "ppzFSk0Df7Jt",
    shippingAddress: "3 Sachs Parkway",
    phone: "518-668-3711",
  },
  {
    fullname: "Imogene Ratray",
    email: "iratray8@washington.edu",
    password: "OwPJrMzC",
    shippingAddress: "6 Prairieview Avenue",
    phone: "730-197-7925",
  },
  {
    fullname: "Avrom Pyser",
    email: "apyser9@shareasale.com",
    password: "emmCrqghfW",
    shippingAddress: "697 Onsgard Terrace",
    phone: "303-887-9494",
  },
];

export const admins: {
  username: string;
  email: string;
  password: string;
  role: Role;
}[] = [
  {
    username: "superadmin",
    email: "superadmin@gmail.com",
    password: "$2b$10$89O/57zd05yMYmkT4JJqhekHY7W0rtTVYpsrgohbZYcdOIouMFB2O",
    role: "SUPERADMIN",
  },
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "$2b$10$4sLZXBrPa4Hm4Mde3OJ0GesAgyhhmglcpOfNCQ8K6/5GIJbAfbWMO",
    role: "ADMIN",
  },
  {
    username: "mod",
    email: "mod@gmail.com",
    password: "$2b$10$pDf2Qjhh2WilM8pN7r44zuodGA3zoFN/Zu8CCAI0pwQXkUR.okT/a",
    role: "MODERATOR",
  },
];

// Category Data (3)
export const categories = [
  {
    name: "men",
    description: "sapien non mi integer ac neque duis bibendum morbi non",
    thumbnailImage: "http://dummyimage.com/720x400.png/cc0000/ffffff",
  },
  {
    name: "women",
    description:
      "eget vulputate ut ultrices vel augue vestibulum ante ipsum primis",
    thumbnailImage: "http://dummyimage.com/720x400.png/dddddd/000000",
  },
  {
    name: "bags",
    description:
      "turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh",
    thumbnailImage: "http://dummyimage.com/720x400.png/dddddd/000000",
  },
];

// Category Data (3)
export const collections = [
  {
    name: "collections tesT",
    description:
      "collections tesT collections tesT collections tesT collections tesT",
    thumbnailImage: "http://dummyimage.com/720x400.png/cc0000/ffffff",
  },
];

// Products Data (100)
export const products = [
  {
    name: "Aerified",
    description:
      "condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros",
    detail:
      "mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum",
    categoryId: 1,
    collectionId: 1,
  },
];

export const proOptions = [
  {
    color: "#607d8b",
    price: 100,
    size: "M,L",
    stock: 23,
    images: "http://dummyimage.com/720x400.png/cc0000/ffffff",
    productId: 1,
  },
];
