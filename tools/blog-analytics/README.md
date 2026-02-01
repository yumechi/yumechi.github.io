# ブログ投稿統計グラフ生成ツール

Docusaurusブログの投稿統計を棒グラフで可視化し、PNG出力するツールです。
登壇資料などで活用するために作成されました。

## 機能

- **年間月別グラフ**: 指定した年の月ごと（1〜12月）のブログ投稿数を棒グラフで表示
- **月間日別グラフ**: 指定した年月の日ごとの投稿数を棒グラフで表示

## 前提条件

- [Podman](https://podman.io/) がインストールされていること

## 使用方法

### コンテナのビルド

プロジェクトルートで以下を実行：

```bash
podman build -t blog-analytics tools/blog-analytics/
```

### 年間月別グラフの生成

```bash
mkdir -p output
podman run --rm \
  -v ./blog:/data/blog:ro \
  -v ./output:/data/output \
  blog-analytics --year 2023 --output /data/output/2023-monthly.png
```

### 月間日別グラフの生成

```bash
podman run --rm \
  -v ./blog:/data/blog:ro \
  -v ./output:/data/output \
  blog-analytics --year 2023 --month 12 --output /data/output/2023-12-daily.png
```

## コマンドライン引数

| 引数 | 説明 | 必須 | デフォルト |
|------|------|------|------------|
| `--year YYYY` | 対象年 | ✅ | - |
| `--month MM` | 対象月（1-12）。指定すると日別グラフを生成 | - | - |
| `--output PATH` | 出力ファイルパス | - | `/data/output/stats.png` |
| `--blog-dir PATH` | ブログディレクトリ | - | `/data/blog` |

## ブログディレクトリ構造

このツールは以下のディレクトリ構造を前提としています：

```
blog/
├── YYYY/
│   └── MM-DD-slug/
│       └── index.md
```

例: `blog/2023/12-01-welcome/index.md` → 2023年12月1日の投稿

## 技術スタック

- Python 3.13
- uv（パッケージマネージャー）
- Altair / Vega-Lite（グラフ描画）
- vl-convert-python（PNG出力）

## 開発

### ローカルでの実行（uv環境がある場合）

```bash
cd tools/blog-analytics
uv sync
uv run python blog_analytics.py --year 2023 --blog-dir ../../blog --output ./output.png
```

## ライセンス

プロジェクトのライセンスに従います。
