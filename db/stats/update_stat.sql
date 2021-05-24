UPDATE bbox_stats
SET times_played = times_played + 1,
    total_wins = $3,
    high_score =$4
WHERE user_id = $1 AND game_id = $2;