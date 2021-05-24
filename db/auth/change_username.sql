UPDATE bbox_users
SET user_name = $2
WHERE user_id = $1
RETURNING user_id,user_name, user_email;