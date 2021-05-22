UPDATE bbox_users
SET user_password = $2
WHERE user_id = $1
RETURNING user_id, user_email, user_name;