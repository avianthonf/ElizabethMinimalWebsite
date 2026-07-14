import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsArticleBySlug, getNewsArticles } from "@/domains/news/news.fetcher";
import { Hero } from "@/shared/ui/hero";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { Stack } from "@/shared/ui/stack";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { Text } from "@/shared/ui/text";
import { ShareBar } from "@/features/share";
import { SITE_URL } from "@/shared/lib";
import { createNewsArticleSchema } from "@/shared/lib/structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import type { Metadata } from "next";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getNewsArticles();
  return articles.map((article) => ({
    slug: article.href.replace("/news/", ""),
  }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [`/images/${article.imageFilename}`],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`/images/${article.imageFilename}`],
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

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
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.title, href: `/news/${slug}` },
        ]}
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
              <Stack gap="small">
                <Link
                  href="/news/photo-gallery"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    color: "var(--p-color-royal-blue)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  📸 Photo Gallery
                </Link>
              </Stack>
              <ShareBar url={`${SITE_URL}/news/${slug}`} title={article.title} />
            </Stack>
          </Container>
        </Section>
      </>
    </>
  );
}
