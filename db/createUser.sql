INSERT INTO humanenewsletter (name, email)
VALUES ($1, $2)
RETURNING "id", "name", "email"
