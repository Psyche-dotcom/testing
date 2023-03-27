const images = [
  {
    image: "url....",
    category: "a",
  },
  {
    image: "url....",
    category: "a",
  },
  {
    image: "url....",
    category: "b",
  },
  {
    image: "url....",
    category: "c",
  },
];

const categories = Array.from(new Set(images.map((e) => e.category)));
const selecetedCategory = "b";

const filteredImages = images.filter((e) => e.category == selecetedCategory);

