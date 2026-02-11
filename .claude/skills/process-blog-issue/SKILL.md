---
name: process-blog-issue
description: GitHub issueからブログ記事を作成しPRを作成します
---

# Process Blog Issue

GitHub issueに記載されたブログ記事リクエストを処理し、記事を作成してPRを作成します。

## 実行手順

### 1. blog-request issueを取得

以下のコマンドで `blog-request` ラベルが付いたオープンなissueを全て取得します：

```bash
gh issue list --label blog-request --state open --json number,title,body
```

取得したissueが0件の場合は「処理対象のissueがありません」と報告して終了します。

**オプション**: ユーザーが特定のissue番号を指定した場合は、そのissueのみを処理します。

### 2. 各issueを処理

取得した各issueに対して、以下の処理を順番に実行します：

#### 2.1 issueの内容をパース

issueから以下の情報を抽出します：

- **ブログ記事のタイトル**: issueのタイトル（`title`フィールド）をそのまま使用
- **slug**: `### slug` セクションの内容
- **タグ**: `### タグ` セクションの内容（カンマ区切り）
- **資料のタイトル**: `### 資料のタイトル` セクションの内容（任意）
- **資料のURL**: `### 資料のURL` セクションの内容
- **感想・学び**: `### 感想・学び` セクションの内容

#### 2.2 ブランチを作成

**重要**: 各issueのブランチは必ずmainブランチから派生させます。複数のissueを処理する場合も、毎回mainブランチに戻ってから新しいブランチを作成してください。

```bash
git checkout main
git pull origin main
git checkout -b blog/issue-<issue番号>
```

#### 2.3 ブログ記事を作成

以下の形式でファイルを作成します：

- **ファイルパス**: `blog/YYYY/MM-DD-<slug>/index.md`
  - `YYYY` は現在の年
  - `MM-DD` は現在の月日
  - `slug` はissueから取得した値

**ファイル内容**:

```markdown
---
slug: /<slug>
title: <ブログ記事のタイトル>
authors: yumechi
tags: [<タグをカンマ区切りで>]
---

<資料の簡単な紹介文を1-2文で生成>

<!-- truncate -->

## 資料リンク

- [<資料のタイトル>](<資料のURL>)
  ※資料のタイトルが空の場合はURLをそのままリンクテキストとして使用

## 感想・学び

<感想・学びの内容>
```

#### 2.4 コミット & プッシュ

```bash
git add blog/
git commit -m "feat: <ブログ記事のタイトル>の記事を追加

Closes #<issue番号>"
git push -u origin blog/issue-<issue番号>
```

#### 2.5 PRを作成

```bash
gh pr create --title "feat: <ブログ記事のタイトル>" --body "## Summary

- issueに基づいてブログ記事を作成しました

## Related Issue

Closes #<issue番号>

---
Generated with Claude Code"
```

### 3. mainブランチに戻る

全てのissueの処理が完了したら、必ずmainブランチに戻ります：

```bash
git checkout main
```

### 4. 完了報告

ユーザーに以下を報告します：

- 処理したissueの数
- 各issueに対して作成したPRのURL一覧
- エラーがあった場合はその内容

## 注意事項

- slugは英数字とハイフンのみを使用（issueから取得した値をそのまま使用）
- タグが空の場合は空配列 `[]` を設定
- 感想が長い場合は適切に段落分けする
- issueの内容が不足している場合はスキップしてユーザーに報告する
- 複数のissueを処理する場合、各issueごとに別々のブランチとPRを作成する
- **チルダ（`~`）のエスケープ**: タイトルや本文にASCIIチルダ `~` が含まれる場合、markdownの打消し線として解釈されるのを防ぐため以下の対応を行う：
  - **frontmatterの `title`**: ダブルクォートで囲む（例: `title: "タイトル~サブタイトル~"`）
  - **markdown本文**（導入文、リンクテキスト、感想など）: `~` を `\~` にエスケープする
  - 全角チルダ `〜`（U+301C）は対象外（markdownで打消し線にならない）
