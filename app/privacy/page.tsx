import LegalPage, { legalMetadata } from "@/components/legal/LegalPage";
import { legal } from "@/lib/content";

export const metadata = legalMetadata(legal.privacy);

export default function Privacy() {
  return <LegalPage doc={legal.privacy} />;
}
