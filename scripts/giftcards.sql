CREATE TABLE IF NOT EXISTS gift_card_type (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    amount NUMERIC NOT NULL,
    stripe_coupon_id VARCHAR(255) NOT NULL,
    stripe_full_price_id VARCHAR(255) NOT NULL,
    stripe_price_id_5_off VARCHAR(255) NOT NULL,
    stripe_price_id_7_off VARCHAR(255) NOT NULL,
    stripe_price_id_12_off VARCHAR(255) NOT NULL,
);

INSERT INTO gift_card_type (amount, stripe_coupon_id, stripe_full_price_id, stripe_price_id_5_off, stripe_price_id_7_off, stripe_price_id_12_off)
VALUES (20, '9amiA8rF', 'price_1OsBNtAobn1NR6UqihQIj5tC', 'price_1OtAWaAobn1NR6UqcXUPcYiH', 'price_1OtAWzAobn1NR6Uq6Xgccw9Q', 'price_1OtAXNAobn1NR6UqWQHb28Pb'),
(50, 'jiVw6op1', 'price_1OsBOwAobn1NR6Uqy1L1maXz', 'price_1OtAUWAobn1NR6UqPepkwWze', 'price_1OtAV4Aobn1NR6UqLdiWCGXz', 'price_1OtAVOAobn1NR6Uq4FMSdzT9'),
(100, '61Wml198', 'price_1OsBQ0Aobn1NR6Uq2gdbv6I5', 'price_1OtATCAobn1NR6UqB9unae0S', 'price_1OtATQAobn1NR6UqagblTBrh', 'price_1OtATbAobn1NR6UqiBc38V8c'),
(200, 'vLvUFHME', 'price_1OsBQpAobn1NR6Uq0GG5YyDw', 'price_1OtAR9Aobn1NR6UqbnWtQWGO', 'price_1OtARcAobn1NR6UqLQB2fKGO', 'price_1OtASjAobn1NR6Uq15AlBMwz'),
(500, 'v798VKqs', 'price_1OsBRWAobn1NR6UqYBbjbMgu', 'price_1OtAOdAobn1NR6UqRTBvQ5MZ', 'price_1OtAQ0Aobn1NR6UqLyBdbtsV', 'price_1OtAQOAobn1NR6UqBodTRI9G'),
(1000, '56seHL3p', 'price_1OsBSXAobn1NR6UqHaPF2S6g', 'price_1OtAJMAobn1NR6Uqnhcn2LZW', 'price_1OtAMGAobn1NR6UqaS2RAipT', 'price_1OtAMkAobn1NR6Uq9XR2S8Sa');

CREATE TABLE IF NOT EXISTS gift_cards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    gift_card_type VARCHAR(255) NOT NULL,
    stripe_code VARCHAR(255),
    payment_successful BOOLEAN NOT NULL DEFAULT false,
    gift_card_used BOOLEAN NOT NULL DEFAULT false,
    recipient_email VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    message_for_recipient VARCHAR(255)
);