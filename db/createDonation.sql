INSERT INTO donationsmade (amount_donated, email, user_id)
VALUES($1, $2, $3)
RETURNING "amount_donated", "email", "user_id";
