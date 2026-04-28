export const newsData = Array.from({ length: 50 }).map((_, i) => ({
  id: String(i),
  title: `Новина ${i + 1}`,
  description: `Детальний опис для новини номер ${i + 1}.`,
  image: `https://picsum.photos/seed/${i}/200`,
}));

export const contactsData = [
  {
    title: "Викладачі",
    data: [
      { id: "1", name: "Іван Іванов" },
      { id: "2", name: "Петро Петров" },
    ],
  },
  {
    title: "Студенти",
    data: [
      { id: "3", name: "Олексій Олексієнко" },
      { id: "4", name: "Марія Марієнко" },
    ],
  },
];