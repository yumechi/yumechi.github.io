# プロジェクト設定

このプロジェクトは Node.js を使った Docusaurus ウェブサイトです。

## 環境管理

- **mise**: Node.js とパッケージマネージャーの管理に使用
- **Node.js**: バージョン 24（.mise.toml で管理）
- **pnpm**: パッケージマネージャー（mise経由でインストール）

## セットアップ

```bash
# 依存関係のインストール
mise run install

# 開発サーバーの起動
mise run dev
```

## 利用可能なコマンド

- `mise run dev` - 開発サーバーの起動
- `mise run build` - プロジェクトのビルド
- `mise run serve` - ビルド済みプロジェクトの配信
- `mise run typecheck` - TypeScript型チェック
- `mise run audit` - セキュリティ監査
- `mise run audit-fix` - セキュリティ脆弱性の修正

## 型チェック

TypeScript型チェックを実行する場合：
```bash
mise run typecheck
```

## 技術スタック

- **フレームワーク**: Docusaurus 3.9.2
- **言語**: TypeScript
- **ランタイム**: Node.js 24+
- **パッケージマネージャー**: pnpm

## Skills

### create-blog-page

読んだ記事やスライドの感想を書くブログ記事を作成する。

**使い方**: `/create-blog-page` を実行し、以下の情報を提供する：
- 記事/スライドのタイトル
- URL
- タグ（任意）
- 感想・学び

**処理内容**:
1. `blog/_template.md` をベースに新しいブログ記事を作成
2. ファイルは `blog/YYYY/MM-DD-slug/index.md` の形式で保存（年別ディレクトリ）
3. slugはタイトルから自動生成（英数字とハイフンのみ）
4. 作成日は当日の日付を使用