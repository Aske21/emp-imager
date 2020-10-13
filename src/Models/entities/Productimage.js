module.exports = {
  name: "Productimage",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    productId: {
      type: "int",
    },
    image: {
      type: "string",
    },
    createdAt: {
      type: "timestamp",
      generated: true,
    },
    modifiedAt: {
      type: "timestamp",
      generated: true,
    },
  },
};
