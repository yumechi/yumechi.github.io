import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import type {ArchiveBlogPost, Props} from '@theme/BlogArchivePage';
import Heading from '@theme/Heading';

type MonthProp = {
  month: string;
  monthName: string;
  posts: ArchiveBlogPost[];
};

type YearProp = {
  year: string;
  months: MonthProp[];
};

const MONTH_NAMES = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];

function Month({month, monthName, posts}: MonthProp) {
  return (
    <div className="margin-left--md margin-bottom--md">
      <Heading as="h4" id={`${posts[0]?.metadata.date.split('-')[0]}-${month}`}>
        {monthName}
      </Heading>
      <ul>
        {posts.map((post) => {
          const day = new Date(post.metadata.date).getUTCDate();
          return (
            <li key={post.metadata.permalink}>
              <Link to={post.metadata.permalink}>
                {day}日 - {post.metadata.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Year({year, months}: YearProp) {
  return (
    <div className="margin-bottom--lg">
      <Heading as="h3" id={year}>
        {year}年
      </Heading>
      {months.map((monthProp) => (
        <Month key={monthProp.month} {...monthProp} />
      ))}
    </div>
  );
}

function YearsSection({years}: {years: YearProp[]}) {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        {years.map((yearProp) => (
          <Year key={yearProp.year} {...yearProp} />
        ))}
      </div>
    </section>
  );
}

function listPostsByYearMonth(blogPosts: readonly ArchiveBlogPost[]): YearProp[] {
  const postsByYearMonth = new Map<string, Map<string, ArchiveBlogPost[]>>();

  for (const post of blogPosts) {
    const [year, month] = post.metadata.date.split('-');
    if (!postsByYearMonth.has(year)) {
      postsByYearMonth.set(year, new Map());
    }
    const yearMap = postsByYearMonth.get(year)!;
    if (!yearMap.has(month)) {
      yearMap.set(month, []);
    }
    yearMap.get(month)!.push(post);
  }

  const result: YearProp[] = [];
  const sortedYears = Array.from(postsByYearMonth.keys()).sort((a, b) => b.localeCompare(a));

  for (const year of sortedYears) {
    const yearMap = postsByYearMonth.get(year)!;
    const sortedMonths = Array.from(yearMap.keys()).sort((a, b) => b.localeCompare(a));
    const months: MonthProp[] = sortedMonths.map((month) => ({
      month,
      monthName: MONTH_NAMES[parseInt(month, 10) - 1],
      posts: yearMap.get(month)!.sort(
        (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
      ),
    }));
    result.push({year, months});
  }

  return result;
}

export default function BlogArchive({archive}: Props): ReactNode {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page',
  });
  const years = listPostsByYearMonth(archive.blogPosts);
  return (
    <>
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className="hero hero--primary">
          <div className="container">
            <Heading as="h1" className="hero__title">
              {title}
            </Heading>
            <p className="hero__subtitle">{description}</p>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  );
}
