import { ExpertCard } from "@/components/experts/expert-card";
import { PageIntro } from "@/components/motion/page-intro";
import { landingContent } from "@/data/landing-content";
import { getExperts } from "@/lib/cms/storage";
import { createPageMetadata } from "@/lib/seo";

const { expertCouncil } = landingContent;

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Экспертный совет",
  description: expertCouncil.intro,
  path: "/ekspertnyy-sovet",
});

export default async function ExpertCouncilPage() {
  const experts = await getExperts();

  return (
    <div className="border-b border-border/40">
      <div className="section-shell section-y">
        <PageIntro
          eyebrow={expertCouncil.eyebrow}
          title={expertCouncil.title}
          description={`${expertCouncil.intro} ${expertCouncil.listIntro} ${expertCouncil.bullets.join("; ")}.`}
        />

        <div
          className={
            experts.length === 1
              ? "mx-auto mt-10 max-w-md sm:mt-12"
              : "mt-10 grid items-stretch gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          }
        >
          {experts.map((expert, index) => (
            <ExpertCard key={expert.id} expert={expert} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
