UPDATE bbox_games
SET game_total_plays = game_total_plays + 1
WHERE game_id = $1;