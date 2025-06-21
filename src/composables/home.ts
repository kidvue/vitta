import { faker } from "@faker-js/faker";

export type AsideTab = {
  icon: string;
  label: string;
  href: string;
  filter: (v: Book[]) => Book[];
};

export const ASIDE_TABS: Array<AsideTab> = [
  {
    icon: "ph:tray",
    label: "My books",
    href: "/",
    filter: (v) => v,
  },
  {
    icon: "ph:desktop",
    label: "Locally stored",
    href: "/locally-stored",
    filter: (v) => v.filter((v) => ["both", "local"].includes(v.is_stored)),
  },
  {
    icon: "ph:cloud",
    label: "Cloud synced",
    href: "/cloud-synced",
    filter: (v) => v.filter((v) => ["both", "cloud"].includes(v.is_stored)),
  },
  {
    icon: "ph:star",
    label: "Starred",
    href: "/starred",
    filter: (v) => v.filter((v) => v.starred),
  },
  {
    icon: "ph:users",
    label: "Shared with me",
    href: "/shared-with-me",
    filter: (v) => v,
  },
  {
    icon: "ph:trash",
    label: "Trash",
    href: "/trash",
    filter: (v) => v.filter((v) => v.trashed),
  },
];

const FREQUENCIES: Book["budget"]["frequency"][] = [
  "annual",
  "monthly",
  "weekly",
  "biweekly",
  "biannually",
  "quarterly",
];

const EXAMPLE_BOOK: Book = {
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
    amount: faker.number.int({ min: 1000, max: 5000 }),
    frequency: faker.helpers.arrayElement(FREQUENCIES),
  },
  pages: [
    {
      type: "income",
      name: "Work",
      transactions: [
        {
          amount: 553,
          name: "Work",
          date: new Date(),
          tags: [],
        },
      ],
      recurring: [
        {
          name: "Work",
          amount: 553,
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

export const useCurrentPage = () => useState("current-page", () => "");
export const useIsGridView = () => useState("is-grid-view", () => true);
export const useBooks = () => useState<Book[]>("books", () => [EXAMPLE_BOOK]);

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
