import { PageIntro } from "@/components/motion/page-intro";
import { ParticipantsView } from "@/components/participants/participants-view";
import { getParticipants } from "@/lib/cms/storage";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Участники",
  description:
    "Молодые исполнители программы «Открытая сцена» — музыканты, вокалисты и актёры на пути к первой публичной сцене.",
  path: "/uchastniki",
});

export default async function ParticipantsPage() {
  const participants = await getParticipants();

  return (
    <div className="border-b border-border/40 bg-muted/15">
      <div className="section-shell section-y">
        <PageIntro
          eyebrow="Сообщество"
          title="Участники"
          description="Актуальный состав артистов программы."
        />

        <div className="mt-10 sm:mt-12">
          <ParticipantsView participants={participants} />
        </div>
      </div>
    </div>
  );
}
