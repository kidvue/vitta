import { faker } from "@faker-js/faker";
import { isTauri } from "@tauri-apps/api/core";
import * as idb from "idb-keyval";

export const BOOK_FREQUENCIES: Book["budget"]["frequency"][] = [
  "annual",
  "monthly",
  "weekly",
  "biweekly",
  "biannually",
  "quarterly",
];

export const useSelectedBooks = () =>
  useState<string[]>("selected-books", () => []);
export const useBookStore = () => idb.createStore("vitta", "books");
export const useBookState = () =>
  useState<Book[]>("books", () => [createFakeBook()]);
export async function loadBooks() {
  // Tauri
  if (hasWindow() && isTauri()) {
    console.log("TODO: Load books in Tauri");
  }
  // Client
  else if (hasWindow()) {
    const books = useBookState();
    const local_books = await idb.values<Book>(useBookStore());

    books.value = [...books.value, ...local_books];
  }
  // SSR
  else {
    console.log("TODO: Load books in Tauri");
  }
}
export function createFakeBook(): Book {
  faker.seed();

  const budget_amount = faker.number.int({ min: 1000, max: 5000 });
  const dd_amount = faker.number.float({
    max: 750,
    min: 300,
    fractionDigits: 2,
  });

  return {
    name: "Example Book",
    id: faker.string.nanoid(),
    starred: faker.datatype.boolean(),
    trashed: faker.helpers.arrayElement([
      faker.date.recent({ days: 14 }),
      undefined,
    ]),
    updated: new Date(),
    author: faker.string.nanoid(),
    coauthors: [],
    created: faker.date.recent({ days: 180 }),
    store: faker.helpers.arrayElement(["both", "cloud", "local"]),
    is_stored: faker.helpers.arrayElement(["both", "cloud", "local"]),
    budget: {
      amount: budget_amount,
      frequency: faker.helpers.arrayElement(BOOK_FREQUENCIES),
    },
    pages: [
      {
        type: "income",
        name: "Work",
        transactions: [
          {
            amount: dd_amount,
            name: "Direct Deposit from *****, Inc.",
            date: new Date(),
            tags: [],
          },
        ],
        recurring: [
          {
            name: "Direct Deposit from *****, Inc.",
            amount: dd_amount,
            cron: "0 0 * * thu",
            tags: [],
          },
        ],
      },
      {
        type: "expense",
        name: "Expense",
        transactions: [
          {
            amount: 6.75,
            name: "Spotify",
            date: faker.date.recent({ days: 10 }),
            tags: [],
          },
        ],
        recurring: [
          {
            name: "Spotify",
            amount: 553,
            cron: "0 0 14 * *",
            tags: ["Entertainment"],
          },
          {
            name: "Discover Billing Ends",
            amount: 0,
            cron: "0 0 7 * *",
            tags: ["Credit Card"],
          },
        ],
      },
    ],
  };
}

export type Book = {
  name: string;
  id: string;
  starred: boolean;
  trashed: Date | undefined;
  updated: Date;
  created: Date;
  author: string;
  coauthors: string[];
  store: "local" | "cloud" | "both";
  is_stored: "local" | "cloud" | "both";
  budget: {
    amount: number;
    frequency:
      | "annual"
      | "monthly"
      | "weekly"
      | "biweekly"
      | "biannually"
      | "quarterly";
  };
  pages: Array<{
    type: "expense" | "income";
    name: string;
    transactions: Array<{
      name: string;
      amount: number;
      date: Date;
      tags: string[];
    }>;
    recurring: Array<{
      name: string;
      amount: number;
      cron: string;
      tags: string[];
    }>;
  }>;
};
