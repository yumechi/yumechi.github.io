---
slug: /sre-kaigi-2026-era-of-generation-ai
title: 「生成AI時代にこそ求められるSRE」を読んだ
authors: yumechi
tags: [SRE, 生成AI]
---

生成AI時代におけるSREの役割と実践について解説されたスライドを読みました。

<!-- truncate -->

## 資料リンク

- [生成AI時代にこそ求められるSRE](https://speakerdeck.com/ymotongpoo/sre-for-gen-ai-era)

## 感想・学び

- dora というリサーチサイトがある https://dora.dev/research/
- コンテキスト（AIが動きやすい環境）、ガードレール（AIの失敗をより早く検知・改善する）

### コンテキスト

- 動的な情報（テレメトリー）の連携や、そのシステム特有の情報が必要（言語化する）
- ポストモーテムの文脈でもAIにテレメトリーとして渡す情報を増やす

### ガードレール

- 密封（Hermetic）ビルド（常に同じ結果になるビルド）、サプライチェーンセキュリティ
- 内部アーティファクトリポジトリーで検証済みのリポジトリをミラーして利用する、SBOM有効化、SLAS導入
- テスト: ファジング、プロパティーベーステスト、ミューテーションテスト
- Policy as Code: OPA, Conftest, AWS Config
- SLO, SRE文化

ガードレールの文脈で拾ってきたワード、結構知らないものが多いので要調査。
コンテキスト周りは実際にやれることを具体的に探してみようかな。
