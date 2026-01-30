# プロジェクト設定

このプロジェクトは Node.js を使った Docusaurus ウェブサイトです。

環境構築やコマンドの詳細は [README.md](./README.md) を参照してください。

## Skills

### create-blog-page

読んだ記事やスライドの感想を書くブログ記事を作成する。

**使い方**: `/create-blog-page` を実行し、以下の情報を提供する：
- 記事/スライドのタイトル
- URL
- タグ（任意）
- 感想・学び

**処理内容**:
1. `blog/_template.md` をベースに新しいブログ記事を作成
2. ファイルは `blog/YYYY/MM-DD-slug/index.md` の形式で保存（年別ディレクトリ）
3. slugはタイトルから自動生成（英数字とハイフンのみ）
4. 作成日は当日の日付を使用
