SELECT bs.stat_id, bg.game_name, bs.times_played, bs.total_wins, bs.high_score FROM bbox_stats bs
JOIN bbox_games bg ON bs.game_id = bg.game_id
WHERE user_id = $1;