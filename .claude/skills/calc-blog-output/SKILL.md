---
name: calc-blog-output
description: ブログ投稿統計グラフを生成し、output ディレクトリに出力します
---

# Calc Blog Output

ブログの投稿統計を集計し、以下のグラフをPNG形式で出力します：
- 年別の月間投稿数グラフ（monthly）
- 各月の日別投稿数グラフ（daily）

## 実行手順

### 1. 出力ディレクトリの作成とコンテナのビルド

```bash
mkdir -p output && podman build -t blog-analytics tools/blog-analytics/
```

### 2. 全グラフの並行生成

以下のワンライナーで、存在する全ての年のmonthlyグラフと、投稿がある全ての月のdailyグラフを並行生成します：

```bash
# 年別monthlyグラフと月別dailyグラフを並行生成
(
  # monthlyグラフを並行生成
  for year in $(ls -d blog/[0-9][0-9][0-9][0-9] 2>/dev/null | xargs -n1 basename); do
    podman run --rm -v ./blog:/data/blog:ro -v ./output:/data/output blog-analytics --year "$year" --output "/data/output/${year}-monthly.png" &
  done

  # dailyグラフを並行生成（投稿がある年月のみ）
  for year in $(ls -d blog/[0-9][0-9][0-9][0-9] 2>/dev/null | xargs -n1 basename); do
    for month in $(ls blog/"$year"/ 2>/dev/null | grep -oE '^[0-9]{2}' | sort -u); do
      podman run --rm -v ./blog:/data/blog:ro -v ./output:/data/output blog-analytics --year "$year" --month "$((10#$month))" --output "/data/output/${year}-${month}-daily.png" &
    done
  done

  wait
)
```

### 3. 結果の確認

```bash
ls -la output/*.png
```

生成されたグラフファイルを確認し、ユーザーに報告します。

## 出力ファイル

- `output/YYYY-monthly.png` - 年間月別投稿数グラフ
- `output/YYYY-MM-daily.png` - 月間日別投稿数グラフ

## 注意事項

- `output/` ディレクトリは `.gitignore` に含まれています
- コンテナ実行には Podman が必要です
- 生成されたグラフはユーザーに表示して確認してもらいます
- 並行実行により、従来より高速にグラフを生成できます
