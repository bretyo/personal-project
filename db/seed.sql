CREATE TABLE bbox_users(
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(100),
    user_password VARCHAR(50),
    user_name VARCHAR(12)
);

CREATE TABLE bbox_games(
    game_id SERIAL PRIMARY KEY,
    game_name VARCHAR(100),
    game_description VARCHAR(1500),
    game_players_min int,
    game_players_max int,
    game_total_plays int
);

CREATE TABLE bbox_stats(
    stat_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES bbox_users(user_id),
    game_id INT REFERENCES bbox_games(game_id),
    times_played int,
    total_wins int,
    high_score int
);

CREATE TABLE bbox_prompts(
    prompt_id SERIAL PRIMARY KEY,
    game_id INT REFERENCES bbox_games(game_id),
    prompt VARCHAR(280),
    prompt_type VARCHAR(40)
);