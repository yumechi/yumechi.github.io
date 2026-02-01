# ブログ投稿統計グラフ生成ツール

## 概要

Docusaurusブログの投稿統計を棒グラフで可視化し、PNG出力するツールです。
登壇資料などで活用するために作成されました。

## 利用技術

- Python 3.13
- uv（パッケージマネージャー）
- Altair / Vega-Lite（グラフ描画）
- vl-convert-python（PNG出力）
- Podman（コンテナ実行環境）

## ディレクトリ構成

```
tools/blog-analytics/
├── CLAUDE.md           # このファイル
├── README.md           # 使用方法ドキュメント
├── Containerfile       # Podmanコンテナビルド定義
├── pyproject.toml      # Python依存関係定義
├── uv.lock             # 依存関係ロックファイル（自動生成）
└── blog_analytics.py   # メインスクリプト
```

## 機能

1. **年間月別グラフ**: 指定した年の月ごと（1〜12月）の投稿数を棒グラフで表示
2. **月間日別グラフ**: 指定した年月の日ごとの投稿数を棒グラフで表示

## 基本的な使い方

詳細は [README.md](./README.md) を参照してください。

```bash
# コンテナビルド（プロジェクトルートから実行）
podman build -t blog-analytics tools/blog-analytics/

# 年間月別グラフ生成
mkdir -p output
podman run --rm \
  -v ./blog:/data/blog:ro \
  -v ./output:/data/output \
  blog-analytics --year 2023 --output /data/output/2023-monthly.png

# 月間日別グラフ生成
podman run --rm \
  -v ./blog:/data/blog:ro \
  -v ./output:/data/output \
  blog-analytics --year 2023 --month 12 --output /data/output/2023-12-daily.png
```

## コマンドライン引数

| 引数 | 説明 | 必須 |
|------|------|------|
| `--year YYYY` | 対象年 | ✅ |
| `--month MM` | 対象月（指定すると日別グラフ） | - |
| `--output PATH` | 出力ファイルパス | - |
| `--blog-dir PATH` | ブログディレクトリ | - |

## 注意事項

- 出力ディレクトリ（`/output/`）はgitignore対象です
- `uv.lock` は自動生成されるためgitignore対象です
- ブログディレクトリは `blog/YYYY/MM-DD-slug/index.md` 形式を前提としています
