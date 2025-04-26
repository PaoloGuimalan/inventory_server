export interface Item {
  name: string;
  description: string;
  category: string;
  price: number;
  dateAdded: number;
}

export let items: Item[] = [];
