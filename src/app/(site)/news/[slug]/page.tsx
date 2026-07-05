import { notFound } from "next/navigation";
import { NEWS_ARTICLES } from "@/data/news";
import { PageShell } from "@/components/layout";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Text } from "@/components/primitives/Text";
import { createNewsArticleSchema } from "@/lib/structured-data";
import { safeJsonStringify } from "@/lib/safe-json";
import type { Metadata } from "next";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

function findArticle(slug: string) {
  return NEWS_ARTICLES.find((a) => a.href === `/news/${slug}`);
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.href.replace("/news/", ""),
  }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = createNewsArticleSchema({
    title: article.title,
    description: article.excerpt,
    path: `/news/${slug}`,
    datePublished: article.date,
    image: `/images/${article.imageFilename}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonStringify(articleSchema) }}
      />
      <PageShell
        hero={
          <>
            <Breadcrumb href="/news" label="News" currentLabel={article.title} />
            <Hero
              eyebrow={article.category}
              heading={article.title}
              description={article.date}
              backgroundImage={`/images/${article.imageFilename}`}
            />
          </>
        }
      >
        <Section background="paper" padding="xlarge" ariaLabel={`Article: ${article.title}`}>
          <Container width="narrow">
            <Stack gap="large">
              <Stack gap="small">
                <Text variant="caption">{article.date}</Text>
                <Text variant="eyebrow">{article.category}</Text>
              </Stack>
              <Text variant="muted" size="large">
                {article.excerpt}
              </Text>
            </Stack>
          </Container>
        </Section>
      </PageShell>
    </>
  );
}
