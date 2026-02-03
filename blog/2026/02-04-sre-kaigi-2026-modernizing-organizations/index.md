---
slug: /sre-kaigi-2026-modernizing-organizations
title: 「モノタロウにおけるSREの現在地：モダナイゼーションの過程で変化していく組織に、SREはどう向き合ったか」を読んだ
authors: yumechi
tags: []
---

モノタロウ社におけるSREチームの取り組みと、モダナイゼーションの過程での組織変化への対応についての発表資料です。

<!-- truncate -->

## 資料リンク

- [モノタロウにおけるSREの現在地：モダナイゼーションの過程で変化していく組織に、SREはどう向き合ったか](https://speakerdeck.com/monotaro/monotarouniokerusrenoxian-zai-di-motanaisesiyonnoguo-cheng-tebian-hua-siteikuzu-zhi-ni-srehatouxiang-kihe-tutaka)

## 感想・学び

- SLO運用をはじめ、サービスのコンテナ化が進む。そしてサービスがとても複雑… CUJ も定義している
- Runbook を利用してマニュアルなどを整備 https://www.runbook.jp/
- データパイプライン、バッチシステムに対してSLO定義が難しい問題（設計ハードル）
- SREチームが結成され、様々な取り組み
- DataDog による分散トレースの強化
- 過去の開発資料は具体の具体みたいな取り組みがわかりそう

DataDog の利活用とか、SLOを指標としてうまく使っているなぁと感じた。バッチのSLO確かに難しいな…。
また個別の工夫については過去の資料も追ってみると面白そうだなと思った。
