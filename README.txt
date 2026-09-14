HEAT Racing Online v1.30

GitHub Pages 公開用ファイルです。
このフォルダ内のファイルを GitHub Pages 側へアップロードしてください。

接続先 Worker:
https://heat-racing-online.naitoryo7110.workers.dev

主なオンライン仕様
- 固定 ROOM1～ROOM4
- 最大10人参加
- ROOM参加者 + CPU で合計10台まで
- 再接続対応
- 退出 / ROOM初期化 / 共有ピン
- ホストがレース設定・開始を担当
- ゲーム状態を Cloudflare Workers / Durable Objects に保存
- ホスト再接続時はチェックポイントから進行復元
- 共通プレイヤー名 boardgamePlayerName 対応
- 空ROOM作成時のみ共通管理Workerでホスト権限確認
- 実ゲーム開始時のみ共通プレイ記録を送信

ルール
- 2～4人: 最後尾1人へアドレナリン
- 5～8人: 最後尾2人へアドレナリン
- 9～10人: 最後尾3人へアドレナリン

注意
Worker のデプロイ先URLを変更した場合は online.js の SERVER_URL を変更してください。
