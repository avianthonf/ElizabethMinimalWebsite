import { notFound } from "next/navigation";
import { NEWS_ARTICLES } from "@/domains/news/news.data";
import { Hero } from "@/shared/ui/hero";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { Stack } from "@/shared/ui/stack";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { Text } from "@/shared/ui/text";
import { ShareBar } from "@/features/share";
import { SITE_URL } from "@/shared/lib/brand";
import { createNewsArticleSchema } from "@/shared/lib/structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";
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
      <>
        <Breadcrumb href="/news" label="News" currentLabel={article.title} />
        <Hero
          eyebrow={article.category}
          heading={article.title}
          description={article.date}
          backgroundImage={`/images/${article.imageFilename}`}
        />
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
              <ShareBar url={`${SITE_URL}/news/${slug}`} title={article.title} />
            </Stack>
          </Container>
        </Section>
      </>
    </>
  );
}
