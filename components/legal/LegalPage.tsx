import type { Metadata } from "next";
import { legal, site } from "@/lib/content";

type Doc = (typeof legal)["privacy"];

export function legalMetadata(doc: Doc): Metadata {
  return { title: `${doc.title}, ${site.name}`, description: doc.intro, robots: { index: false, follow: false } };
}

/* Temporary legal text, plain and readable. Replace the copy in lib/content.ts when counsel supplies the final version. */
export default function LegalPage({ doc }: { doc: Doc }) {
  return (
    <main id="main" className="legal">
      <div className="wrap mx-auto max-w-[44rem] py-24 md:py-36">
        <a href="/" className="legal-back">
          ← {site.name}
        </a>
        <h1 className="legal-title mt-10">{doc.title}</h1>
        <p className="legal-meta mt-4">{doc.updated}</p>
        <p className="legal-intro mt-8">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="legal-h2">{s.h}</h2>
            <p className="legal-p mt-3">{s.p}</p>
          </section>
        ))}
        <p className="legal-meta mt-16">
          {site.company}. {site.category}.
        </p>
      </div>
    </main>
  );
}
