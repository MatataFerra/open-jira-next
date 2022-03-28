interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Ea et id veniam excepteur velit voluptate sit occaecat incididunt.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "Duis commodo sit incididunt aliqua nulla magna ipsum mollit ut pariatur consectetur reprehenderit aliqua deserunt.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Aliqua consequat ipsum mollit ipsum.",
      status: "finished",
      createdAt: Date.now() - 10000,
    },
  ],
};
