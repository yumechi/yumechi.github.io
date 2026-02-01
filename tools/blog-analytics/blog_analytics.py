#!/usr/bin/env python3
"""
ブログ投稿統計グラフ生成ツール

Docusaurusブログの投稿統計を棒グラフで可視化し、PNG出力する。
"""

import argparse
import re
import sys
from calendar import monthrange
from collections import Counter
from dataclasses import dataclass
from datetime import date
from pathlib import Path

import altair as alt


@dataclass
class BlogPost:
    """ブログ投稿を表すデータクラス"""
    date: date
    path: Path


def parse_args() -> argparse.Namespace:
    """コマンドライン引数を解析する"""
    parser = argparse.ArgumentParser(
        description="ブログ投稿統計グラフ生成ツール"
    )
    parser.add_argument(
        "--year",
        type=int,
        required=True,
        help="対象年（例: 2023）"
    )
    parser.add_argument(
        "--month",
        type=int,
        choices=range(1, 13),
        metavar="MM",
        help="対象月（1-12）。指定すると日別グラフを生成"
    )
    parser.add_argument(
        "--output",
        type=str,
        default="/data/output/stats.png",
        help="出力ファイルパス（デフォルト: /data/output/stats.png）"
    )
    parser.add_argument(
        "--blog-dir",
        type=str,
        default="/data/blog",
        help="ブログディレクトリ（デフォルト: /data/blog）"
    )
    return parser.parse_args()


def scan_blog_posts(blog_dir: Path) -> list[BlogPost]:
    """
    ブログディレクトリをスキャンして投稿リストを取得する

    ディレクトリ構造: blog/YYYY/MM-DD-slug/index.md
    """
    posts: list[BlogPost] = []

    if not blog_dir.is_dir():
        print(f"警告: ブログディレクトリが見つかりません: {blog_dir}", file=sys.stderr)
        return posts

    # 年ディレクトリを探索
    for year_dir in blog_dir.iterdir():
        if not year_dir.is_dir():
            continue

        # 4桁の年かどうかを確認
        if not re.match(r"^\d{4}$", year_dir.name):
            continue

        year = int(year_dir.name)

        # 記事ディレクトリを探索
        for post_dir in year_dir.iterdir():
            if not post_dir.is_dir():
                continue

            # MM-DD-slug形式かどうかを確認
            match = re.match(r"^(\d{2})-(\d{2})-", post_dir.name)
            if not match:
                continue

            # index.mdが存在するか確認
            index_file = post_dir / "index.md"
            if not index_file.is_file():
                continue

            month = int(match.group(1))
            day = int(match.group(2))

            try:
                post_date = date(year, month, day)
                posts.append(BlogPost(date=post_date, path=post_dir))
            except ValueError:
                print(f"警告: 無効な日付: {year}-{month}-{day} ({post_dir.name})", file=sys.stderr)

    return sorted(posts, key=lambda p: p.date)


def generate_monthly_chart(posts: list[BlogPost], year: int, output_path: Path) -> None:
    """年間月別投稿数の棒グラフを生成する"""
    # 指定年の投稿をフィルタリング
    year_posts = [p for p in posts if p.date.year == year]

    # 月別にカウント
    month_counts = Counter(p.date.month for p in year_posts)

    # データを作成（1-12月すべて含める）
    data = [
        {"月": m, "投稿数": month_counts.get(m, 0)}
        for m in range(1, 13)
    ]

    # グラフ作成
    chart = alt.Chart(alt.Data(values=data)).mark_bar(
        color="#4682B4"
    ).encode(
        x=alt.X("月:O", title="月", axis=alt.Axis(labelAngle=0)),
        y=alt.Y("投稿数:Q", title="投稿数", axis=alt.Axis(tickMinStep=1)),
        tooltip=["月:O", "投稿数:Q"]
    ).properties(
        title=f"{year}年 月別ブログ投稿数",
        width=600,
        height=400
    ).configure_title(
        fontSize=18,
        anchor="middle"
    ).configure_axis(
        labelFontSize=12,
        titleFontSize=14
    )

    # PNG保存
    output_path.parent.mkdir(parents=True, exist_ok=True)
    chart.save(str(output_path), ppi=150)

    print(f"グラフを保存しました: {output_path}")
    print(f"{year}年の総投稿数: {sum(month_counts.values())}件")


def generate_daily_chart(posts: list[BlogPost], year: int, month: int, output_path: Path) -> None:
    """月間日別投稿数の棒グラフを生成する"""
    # 指定年月の投稿をフィルタリング
    month_posts = [p for p in posts if p.date.year == year and p.date.month == month]

    # 日別にカウント
    day_counts = Counter(p.date.day for p in month_posts)

    # その月の日数を取得
    days_in_month = monthrange(year, month)[1]

    # データを作成（1日から末日まですべて含める）
    data = [
        {"日": d, "投稿数": day_counts.get(d, 0)}
        for d in range(1, days_in_month + 1)
    ]

    # グラフ作成
    chart = alt.Chart(alt.Data(values=data)).mark_bar(
        color="#4682B4"
    ).encode(
        x=alt.X("日:O", title="日", axis=alt.Axis(labelAngle=0)),
        y=alt.Y("投稿数:Q", title="投稿数", axis=alt.Axis(tickMinStep=1)),
        tooltip=["日:O", "投稿数:Q"]
    ).properties(
        title=f"{year}年{month}月 日別ブログ投稿数",
        width=800,
        height=400
    ).configure_title(
        fontSize=18,
        anchor="middle"
    ).configure_axis(
        labelFontSize=12,
        titleFontSize=14
    )

    # PNG保存
    output_path.parent.mkdir(parents=True, exist_ok=True)
    chart.save(str(output_path), ppi=150)

    print(f"グラフを保存しました: {output_path}")
    print(f"{year}年{month}月の総投稿数: {sum(day_counts.values())}件")


def main() -> None:
    """メイン処理"""
    args = parse_args()

    blog_dir = Path(args.blog_dir)
    output_path = Path(args.output)

    print(f"ブログディレクトリをスキャン中: {blog_dir}")
    posts = scan_blog_posts(blog_dir)
    print(f"検出した投稿数: {len(posts)}件")

    if not posts:
        print("警告: 投稿が見つかりませんでした", file=sys.stderr)

    if args.month is None:
        # 年間月別グラフ
        generate_monthly_chart(posts, args.year, output_path)
    else:
        # 月間日別グラフ
        generate_daily_chart(posts, args.year, args.month, output_path)


if __name__ == "__main__":
    main()
