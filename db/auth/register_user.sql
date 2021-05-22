INSERT INTO bbox_users
(user_email, user_password, user_name)
VALUES
($1, $2, 'New User')
RETURNING user_id, user_email, user_name;