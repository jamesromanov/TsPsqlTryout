type ProductType = "book" | "pen";

interface ProductModel {
  name: string;
  price: number;
  decription: string;
}

let products: ProductModel[] = [
  {
    name: "Lightning mcqueen",
    price: 300,
    decription: "This is a car toy that all boys love to play!",
  },
  {
    name: "Barbie",
    price: 900,
    decription: "Barbie doll for girls to play and enjoy their youth with!",
  },
  {
    name: "Toy story",
    price: 1900,
    decription: "Toy collection that includes all toys and dolls",
  },
];
