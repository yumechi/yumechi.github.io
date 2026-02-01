---
name: clean-branch
description: mainブランチに切り替え、マージ済みのローカルブランチを削除します
---

# Clean Branch

ブログ記事追加後に残った不要なブランチを整理します。

## 実行手順

以下のコマンドを順番に実行します：

```bash
git switch main && git pull && git fetch -p && gh poi
```

### 各コマンドの説明

1. `git switch main` - mainブランチに切り替え
2. `git pull` - リモートの最新を取得
3. `git fetch -p` - リモートで削除されたブランチ参照をローカルから削除（prune）
4. `gh poi` - マージ済みのローカルブランチを削除

## 注意事項

- 現在のブランチに未コミットの変更がある場合、`git switch main` が失敗します
- `gh poi` は GitHub CLI の拡張機能です（インストール済みの前提）
- 削除されるブランチの一覧が表示されるので確認してください
