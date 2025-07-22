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

- **フレームワーク**: Docusaurus 3.8.1
- **言語**: TypeScript
- **ランタイム**: Node.js 24+
- **パッケージマネージャー**: pnpm