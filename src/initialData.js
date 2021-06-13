const initialData = {
  products: {
    "product-1": {
      id: "product-1",
      name: "Tshirt1",
      url: "/images/t-shirt1.jpeg",
    },

    "product-2": {
      id: "product-2",
      name: "Tshirt2",
      url: "/images/t-shirt2.jpg",
    },

    "product-3": {
      id: "product-3",
      name: "Tshirt3",
      url: "/images/t-shirt3.jpg",
    },
  },

  columns: {
    "column-1": {
      id: "column-1",
      title: "Included in invites",
      productIds: ["product-1", "product-2"],
    },

    "column-2": {
      id: "column-2",
      title: "Excluded from invites",
      productIds: ["product-3"],
    },
  },

  columnOrder: ["column-1", "column-2"],
};

export default initialData;
