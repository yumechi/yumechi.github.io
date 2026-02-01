---
slug: /sre-kaigi-2026-legacy-batch
title: 「レガシー共有バッチ基盤への挑戦 - SREドリブンなリアーキテクチャリングの取り組み」を聞いた
authors: yumechi
tags: [SRE, バッチ処理]
---

SRE KAIGI 2026で発表されたレガシーバッチ基盤のリアーキテクチャリングに関する取り組みの資料を読みました。

<!-- truncate -->

## 資料リンク

- [レガシー共有バッチ基盤への挑戦 - SREドリブンなリアーキテクチャリングの取り組み](https://speakerdeck.com/codmoninc/tackling-the-legacy-shared-batch-infrastructure-an-sre-driven-re-architecting-initiative)

## 感想・学び

- 現状の調査をし、アーキテクチャだけでなく、アプリケーション処理の調査もする
- 独自の作り込みを避けてマネージドサービスに寄せ、運用できる人を増やす方向性を取る
- バッチに対する負荷テストの実施、計測を行う
    - 気になる点: 時間かかるバッチが複数あるときはどうテスト計画するんだろう？ 複数の環境を立てて計測、終わったら消すとか？

下記、自分のブログから一部抜き出しです
https://namonakimichi.hatenablog.com/entry/2026/02/01/025854
