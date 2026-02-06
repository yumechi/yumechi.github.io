---
slug: /sre-kaigi-2026-iass-sass
title: 「IaaS/SaaS管理におけるSREの実践」を読んだ
authors: yumechi
tags: [SRE, IaaS, SaaS]
---

SRE KAIGI 2026で発表された、IaaS/SaaS管理におけるSREの実践についてのスライドを読みました。権限管理のToil削減やInnersourceによる権限移譲など、実践的な取り組みが紹介されています。

<!-- truncate -->

## 資料リンク

- [IaaS/SaaS管理におけるSREの実践](https://speakerdeck.com/bbqallstars/saasguan-li-niokeru-srenoshi-jian-sre-kaigi-2026)

## 感想・学び

- 権限の強いユーザーに対する依頼のToil に課題感
- Innersourceによる権限移譲
- 申請から Pull Request に意識を変える？
- github の CODEOWNER 機能の利用
- Wiz という CNAPP のためのサービス利用
- 自動化しながらも重要な棚卸しのタイミングでは、Human in the loop の考え方を適用して検査している

CODEOWNER機能あまり知らないので調べないとなあと思った。
PRに意識を変えていくのも良さそうだなと思いました。
