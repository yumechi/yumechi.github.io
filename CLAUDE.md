## コミュニケーション言語

このプロジェクトでは日本語でコミュニケーションを取ります。日本語を利用できない場合のみ英語でコミュニケーションします。

## プロジェクトの目的

yumechi の個人ホームページです。プロフィールや読んだ記事の感想などを掲載しています。

## 利用技術

- Docusaurus 3.9.2
- TypeScript
- Node.js 24+
- pnpm（mise経由で管理）

## プロジェクト構成

```
.
├── CLAUDE.md
├── README.md
├── LICENSE
├── docusaurus.config.ts    # Docusaurus設定
├── sidebars.ts             # サイドバー設定
├── package.json
├── tsconfig.json
├── blog/                   # ブログ記事
│   ├── _template.md        # ブログテンプレート
│   ├── YYYY/               # 年別ディレクトリ
│   │   └── MM-DD-slug/     # 記事ディレクトリ
│   │       └── index.md
│   └── authors.yml         # 著者情報
├── docs/                   # ドキュメント（プロフィール等）
├── src/
│   ├── components/         # Reactコンポーネント
│   ├── css/                # カスタムCSS
│   └── pages/              # カスタムページ
└── static/                 # 静的ファイル
```

## Skills

### create-blog-page

読んだ記事やスライドの感想を書くブログ記事を作成する。

**使い方**: `/create-blog-page` を実行し、以下の情報を提供する：
- ブログ記事のタイトル
- slug（URLに使用する識別子）
- タグ（任意）
- 日付（デフォルト: 当日）
- 資料のタイトルとURL
- 感想・学び

### build-test

プロジェクトをビルドしてローカルサーバーで確認する。

**使い方**: `/build-test` を実行

### process-blog-issue

GitHub issueに記載されたブログ記事リクエストを処理し、記事を作成してPRを作成する。

**使い方**: `/process-blog-issue` を実行
- `blog-request` ラベルが付いた全てのオープンissueを自動的に処理
- 各issueごとに別々のブランチとPRを作成
- 特定のissue番号を指定した場合はそのissueのみ処理

### calc-blog-output

ブログ投稿統計グラフを生成し、output ディレクトリに出力する。

**使い方**: `/calc-blog-output` を実行
- 各年の月別投稿数グラフ（YYYY-monthly.png）を生成
- 投稿がある各月の日別投稿数グラフ（YYYY-MM-daily.png）を生成
- 並行実行で高速に処理
- 生成されたグラフは `output/` ディレクトリに保存

### clean-branch

mainブランチに切り替え、マージ済みのローカルブランチを削除する。

**使い方**: `/clean-branch` を実行
- mainブランチに切り替えて最新を取得
- リモートで削除されたブランチ参照を整理
- `gh poi` でマージ済みブランチを削除

## ツール

### ブログ投稿統計グラフ生成ツール

ブログの投稿統計をグラフ化するツールです。詳細は [tools/blog-analytics/CLAUDE.md](./tools/blog-analytics/CLAUDE.md) を参照してください。
