---
name: calc-blog-output
description: ブログ投稿統計グラフを生成し、output ディレクトリに出力します
---

# Calc Blog Output

ブログの投稿統計を集計し、年別の月間投稿数グラフをPNG形式で出力します。

## 実行手順

### 1. ブログディレクトリの確認

```bash
ls blog/
```

存在する年ディレクトリを確認します（例: 2023, 2026）。

### 2. 出力ディレクトリの作成

```bash
mkdir -p output
```

### 3. コンテナのビルド

```bash
podman build -t blog-analytics tools/blog-analytics/
```

### 4. 統計グラフの生成

存在する各年について、月別統計グラフを生成します：

```bash
podman run --rm \
  -v ./blog:/data/blog:ro \
  -v ./output:/data/output \
  blog-analytics --year <YYYY> --output /data/output/<YYYY>-monthly.png
```

例：
- 2023年: `--year 2023 --output /data/output/2023-monthly.png`
- 2026年: `--year 2026 --output /data/output/2026-monthly.png`

### 5. 結果の確認

```bash
ls -la output/
```

生成されたグラフファイルを確認し、ユーザーに報告します。

## オプション: 月間日別グラフ

特定の月の日別グラフを生成する場合：

```bash
podman run --rm \
  -v ./blog:/data/blog:ro \
  -v ./output:/data/output \
  blog-analytics --year <YYYY> --month <MM> --output /data/output/<YYYY>-<MM>-daily.png
```

## 注意事項

- `output/` ディレクトリは `.gitignore` に含まれています
- コンテナ実行には Podman が必要です
- 生成されたグラフはユーザーに表示して確認してもらいます
