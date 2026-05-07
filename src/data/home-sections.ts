import {
  GraduationCap,
  HeartHandshake,
  Mic2,
  Music,
  Sparkles,
  Theater,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AudienceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Для кого сайт и программа — явные «якоря» для нового посетителя. */
export const audienceCards: AudienceCard[] = [
  {
    title: "Музыканты и вокалисты",
    description:
      "Сольные сеты, ансамбли, авторская песня — помогаем собрать программу и спокойно выйти к слушателям.",
    icon: Music,
  },
  {
    title: "Актёры и перформеры",
    description:
      "Монологи, смешанные форматы — работаем над контактом со зрителем и уверенностью на сцене.",
    icon: Theater,
  },
  {
    title: "Те, кто только начинает",
    description:
      "Опыта мало или он только из «домашних» записей — мы начинаем с малого шага и понятного плана.",
    icon: Sparkles,
  },
];

export type HowStep = {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const howItWorksSteps: HowStep[] = [
  {
    step: 1,
    title: "Заявка и знакомство",
    description:
      "Расскажите о себе в форме ниже — мы ответим и объясним, как устроена программа.",
    icon: HeartHandshake,
  },
  {
    step: 2,
    title: "Подбор наставников и формата",
    description:
      "Предложим формат выступления и подключим экспертов: звук, постановка, юридические основы при необходимости.",
    icon: Users,
  },
  {
    step: 3,
    title: "Репетиции и пробный выход",
    description:
      "Готовимся на репетициях и при желании проходим пробный выход перед небольшой аудиторией.",
    icon: Mic2,
  },
  {
    step: 4,
    title: "Концерт или открытый показ",
    description:
      "Фиксируем дату микро-концерта или показа — вы выступаете в поддерживающей атмосфере.",
    icon: GraduationCap,
  },
];
