import LegalPage, { legalMetadata } from "@/components/legal/LegalPage";
import { legal } from "@/lib/content";

export const metadata = legalMetadata(legal.terms);

export default function Terms() {
  return <LegalPage doc={legal.terms} />;
}
