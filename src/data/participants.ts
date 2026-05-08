export type Participant = {
  id: string;
  name: string;
  bio: string;
  imageSrc: string;
};

/**
 * Добавляйте новых участников в этот массив — карточки обновятся автоматически.
 */
export const participants: Participant[] = [
  {
    id: "p1",
    name: "Арсений К.",
    bio: "Саксофон и электроника, готовит дебютный живой сет в формате listening session.",
    imageSrc: "https://picsum.photos/seed/part-arseniy/400/400",
  },
  {
    id: "p2",
    name: "Полина М.",
    bio: "Авторские песни на русском; первая полноценная акустика в нашем зале.",
    imageSrc: "https://picsum.photos/seed/part-polina/400/400",
  },
  {
    id: "p3",
    name: "Тимур В.",
    bio: "Театральный монолог с музыкой — ищет баланс между текстом и импровизацией.",
    imageSrc: "https://picsum.photos/seed/part-timur/400/400",
  },
  {
    id: "p4",
    name: "Лиза О.",
    bio: "Скрипка и петля; участвует в серии камерных вечеров «Открытая сцена».",
    imageSrc: "https://picsum.photos/seed/part-liza/400/400",
  },
  {
    id: "p5",
    name: "Даниил Р.",
    bio: "Битмейкер и вокал; готовит первое выступление с живым бэндом.",
    imageSrc: "https://picsum.photos/seed/part-daniil/400/400",
  },
  {
    id: "p6",
    name: "Ника С.",
    bio: "Джазовый вокал; работает с экспертным советом над программой мини-концерта.",
    imageSrc: "https://picsum.photos/seed/part-nika/400/400",
  },
  {
    id: "p7",
    name: "Григор А.",
    bio: "Классическая гитара; дебютирует с сочинением для небольшой аудитории.",
    imageSrc: "https://picsum.photos/seed/part-grigor/400/400",
  },
];
