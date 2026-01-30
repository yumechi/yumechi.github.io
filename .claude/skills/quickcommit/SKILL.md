---
name: quickcommit
description: git status を確認し、問題がなければ add と commit を実行します
---

# Quick Commit

変更をステージングしてコミットする前に、コミットすべきでないファイルが含まれていないかチェックします。

## 実行手順

### 1. git status の確認

```bash
git status
```

### 2. コミットすべきでないファイルのチェック

以下のパターンに一致するファイルが含まれていないか確認してください。

#### 機密情報を含む可能性のあるファイル
- `.env`, `.env.local`, `.env.production` など環境ファイル
- `*.pem`, `*.key`, `id_rsa`, `id_ed25519` など秘密鍵
- `credentials.json`, `secrets.json` など認証情報ファイル

#### OS 生成ファイル
- `.DS_Store`
- `Thumbs.db`
- `desktop.ini`
- `._*`

#### IDE・エディタ設定ファイル
- `.idea/`
- `.vscode/settings.json`
- `*.swp`, `*.swo`
- `*~`

#### その他
- `node_modules/`, `vendor/` など依存ディレクトリ
- `*.log` ログファイル
- `*.tmp`, `*.temp` 一時ファイル

### 3. 問題がなければ add と commit

```bash
# すべての変更をステージング
git add .

# または特定のファイルのみ
git add <file>

# コミット
git commit -m "コミットメッセージ"
```

## チェック用コマンド

```bash
# 危険なファイルがステージングされていないか確認
git status --porcelain | grep -E '\.env|\.pem|\.key|id_rsa|id_ed25519|credentials\.json|secrets\.json|\.DS_Store|Thumbs\.db|desktop\.ini|^\?\? \._|\.idea/|\.vscode/settings\.json|\.swp$|\.swo$|~$'
```

## 注意事項

- 上記コマンドで何も出力されなければ、コミットして問題ありません
- 出力があった場合は、そのファイルをコミット対象から除外するか、`.gitignore` に追加してください
- コミットメッセージは変更内容を簡潔に説明してください
