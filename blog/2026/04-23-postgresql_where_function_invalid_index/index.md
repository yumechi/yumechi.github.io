---
slug: /postgresql_where_function_invalid_index
title: 「【PostgreSQL】 WHERE 句に関数をかけるとインデックスが使われないことを確認してみた」を読んだ
authors: yumechi
tags: [SQL, PostgreSQL]
---

PostgreSQLにおいてWHERE句で関数を使用した場合、インデックスが活用されない現象についての検証記事。データベースのパフォーマンス最適化に関わる重要な知見です。

<!-- truncate -->

## 資料リンク

- [【PostgreSQL】 WHERE 句に関数をかけるとインデックスが使われないことを確認してみた](https://dev.classmethod.jp/articles/postgresql-where-function-disables-index/)

## 感想・学び

動き的にはそうなるだろうなあと思いつつ、関数インデックス自体をそういえば試せていないことを思い出したので、どこかで試す。
