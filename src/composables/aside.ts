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
    filter: (v) => v.filter((v) => !v.trashed),
  },
  {
    icon: "ph:desktop",
    label: "Locally stored",
    href: "/locally-stored",
    filter: (v) =>
      v.filter((v) => ["both", "local"].includes(v.is_stored) && !v.trashed),
  },
  {
    icon: "ph:cloud",
    label: "Cloud synced",
    href: "/cloud-synced",
    filter: (v) =>
      v.filter((v) => ["both", "cloud"].includes(v.is_stored) && !v.trashed),
  },
  {
    icon: "ph:star",
    label: "Starred",
    href: "/starred",
    filter: (v) => v.filter((v) => v.starred && !v.trashed),
  },
  {
    icon: "ph:users",
    label: "Shared with me",
    href: "/shared-with-me",
    filter: (v) => v.filter((v) => !v.trashed),
  },
  {
    icon: "ph:trash",
    label: "Trash",
    href: "/trash",
    filter: (v) => v.filter((v) => v.trashed),
  },
];
