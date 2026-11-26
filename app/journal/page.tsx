import { ContentIndex } from '@/components/mdx/content-index';
import { getAllContent } from '@/lib/content';

export default function JournalIndexPage() {
  // Some posts are published under two slugs so older links keep working. List each post once.
  const items = getAllContent('journal').filter(
    (item, index, all) => all.findIndex(other => other.frontmatter.title === item.frontmatter.title && other.content === item.content) === index
  );

  return <ContentIndex section="journal" title="Notes from the build." description="Short observations on craft, systems, and the things we learn by making them." items={items} />;
}
