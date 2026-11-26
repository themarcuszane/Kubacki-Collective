import { ContentIndex } from '@/components/mdx/content-index';
import { getAllContent } from '@/lib/content';

export default function ChaptersIndexPage() {
  return <ContentIndex section="chapters" title="Collections of work, patterns, and proof." description="Curated threads on craft, systems, and the thinking behind the aesthetic." items={getAllContent('chapters')} />;
}
