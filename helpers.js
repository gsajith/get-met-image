const getImage = async (id) => {
  return { gotId: id };
};

const getRandomImage = async () => {
  return { gotRandomId: Math.random() };
};

export { getImage, getRandomImage };
