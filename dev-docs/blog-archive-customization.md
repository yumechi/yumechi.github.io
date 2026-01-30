# ブログアーカイブページのカスタマイズ手順

Docusaurusのブログアーカイブページを年・月別にグループ化する手順です。

## 概要

- `/blog/archive` で年 > 月 > 日 の階層構造で記事を表示
- `/blog` ページ下部にアーカイブへのリンクを追加

## 前提条件

- Docusaurus 3.x
- pnpm

## 手順

### 1. 依存関係の追加

```bash
pnpm add @docusaurus/theme-common
```

### 2. カスタムアーカイブコンポーネントの作成

`src/components/CustomBlogArchivePage.tsx` を作成します：

```tsx
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

export default function CustomBlogArchivePage({archive}: Props): ReactNode {
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
```

### 3. docusaurus.config.ts の設定

`docusaurus.config.ts` のブログ設定に `blogArchiveComponent` を追加します：

```ts
presets: [
  [
    'classic',
    {
      // ...
      blog: {
        showReadingTime: true,
        routeBasePath: '/blog',
        blogArchiveComponent: '@site/src/components/CustomBlogArchivePage',
      },
      // ...
    },
  ],
],
```

### 4. BlogListPaginator の swizzle（アーカイブリンク追加、任意）

ブログ一覧ページからアーカイブへのリンクを追加する場合：

```bash
pnpm docusaurus swizzle @docusaurus/theme-classic BlogListPaginator --eject --typescript --danger
```

`src/theme/BlogListPaginator/index.tsx` を編集してリンクを追加：

```tsx
import React, {type ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type {Props} from '@theme/BlogListPaginator';

export default function BlogListPaginator(props: Props): ReactNode {
  const {metadata} = props;
  const {previousPage, nextPage} = metadata;

  return (
    <>
      <nav
        className="pagination-nav"
        aria-label={translate({
          id: 'theme.blog.paginator.navAriaLabel',
          message: 'Blog list page navigation',
          description: 'The ARIA label for the blog pagination',
        })}>
        {previousPage && (
          <PaginatorNavLink
            permalink={previousPage}
            title={
              <Translate
                id="theme.blog.paginator.newerEntries"
                description="The label used to navigate to the newer blog posts page (previous page)">
                Newer entries
              </Translate>
            }
          />
        )}
        {nextPage && (
          <PaginatorNavLink
            permalink={nextPage}
            title={
              <Translate
                id="theme.blog.paginator.olderEntries"
                description="The label used to navigate to the older blog posts page (next page)">
                Older entries
              </Translate>
            }
            isNext
          />
        )}
      </nav>
      <div className="margin-top--lg text--center">
        <Link to="/blog/archive" className="button button--secondary">
          すべての記事を見る（アーカイブ）
        </Link>
      </div>
    </>
  );
}
```

### 5. ビルド確認

```bash
pnpm build
pnpm serve
```

`/blog/archive` と `/blog` ページを確認します。

## swizzle との比較

| 方法 | メリット | デメリット |
|------|----------|------------|
| **blogArchiveComponent** | 設定で明示的に指定、独立したコンポーネント | - |
| **swizzle** | デフォルトのコードをベースにできる | `src/theme/` に配置が必要、Unsafeの警告 |

`blogArchiveComponent` を使う方が、何をカスタマイズしているか設定ファイルで明示的に分かるため推奨です。

## Docusaurusアップデート時の対応

### 壊れた場合の対処

1. `ArchiveBlogPost` 型や `Props` 型の変更を確認
2. コンポーネントを新しいAPIに合わせて修正

### 確認すべきポイント

- `ArchiveBlogPost` 型の構造変更
- `Props` 型の構造変更
- `@docusaurus/theme-common` のAPI変更

## 関連ファイル

- `src/components/CustomBlogArchivePage.tsx` - カスタムアーカイブコンポーネント
- `src/theme/BlogListPaginator/index.tsx` - アーカイブリンク追加（swizzle）
- `docusaurus.config.ts` - `blogArchiveComponent` 設定
- `package.json` - `@docusaurus/theme-common` の依存

## 参考リンク

- [📦 plugin-content-blog | Docusaurus](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog)
- [Blog Archive for Docusaurus | johnnyreilly](https://johnnyreilly.com/blog-archive-for-docusaurus)
- [GitHub Issue #4431](https://github.com/facebook/docusaurus/issues/4431)
