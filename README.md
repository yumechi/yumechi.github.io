# yumechi.github.io

yumechi の個人ホームページです。プロフィールや読んだ記事の感想などを掲載しています。

## 開発環境

[mise](https://mise.jdx.dev/) を使用して Node.js と pnpm を管理しています。

## 技術スタック

- **フレームワーク**: [Docusaurus 3.9.2](https://docusaurus.io/)
- **言語**: TypeScript
- **ランタイム**: Node.js 24+
- **パッケージマネージャー**: pnpm

## 環境構築/操作用のコマンド

### 依存関係のインストール

```bash
mise run install
```

### 開発サーバーの起動

```bash
mise run dev
```

### プロジェクトのビルド

```bash
mise run build
```

### ビルド済みプロジェクトの配信

```bash
mise run serve
```

### TypeScript 型チェック

```bash
mise run typecheck
```

### セキュリティ監査

```bash
mise run audit
```

### セキュリティ脆弱性の修正

```bash
mise run audit-fix
```

## 参照しているツール/フレームワークのライセンス

- [Docusaurus](https://docusaurus.io/) - MIT License
- [React](https://react.dev/) - MIT License

## ライセンス

このリポジトリのコンテンツは著作権で保護されています。コードは MIT License です。
