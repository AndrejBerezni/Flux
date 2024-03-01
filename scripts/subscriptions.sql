CREATE TABLE IF NOT EXISTS subscription_type (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    selected_vehicle_discount NUMERIC,
    all_vehicles_discount NUMERIC,
    gift_card_discount NUMERIC,
    insurance VARCHAR(255),
    price_monthly NUMERIC NOT NULL,
    stripe_monthly_prod_id VARCHAR(255) NOT NULL,
    price_yearly NUMERIC NOT NULL,
    stripe_yearly_prod_id VARCHAR(255) NOT NULL
    );

INSERT INTO subscription_type (name, selected_vehicle_discount, all_vehicles_discount, gift_card_discount, insurance, price_monthly, stripe_monthly_prod_id, price_yearly, stripe_yearly_prod_id)
VALUES ('Basic', 7.5, NULL, 5, NULL, 8.99, 'prod_PenEwkbBV2TAjk', 86, 'prod_PenHYUDP2NAX11'),
('Gold', 10, 2, 7.5, 'medium', 34.99, 'prod_PenGN1elItpNxJ', 335, 'prod_PenIzOUZ95RyFd'),
('Premium', NULL, 10, 12, 'maximum', 59.99, 'prod_PenGN1elItpNxJ', 575, 'prod_PenJfwKhP7op23');

INSERT INTO subscription_description (subscription_id, text)
VALUES ('ca549cb0-76b3-4065-85e6-ea644aabd267', '7.5% discount on selected vehicle type'),
('ca549cb0-76b3-4065-85e6-ea644aabd267', '5% discount on gift card purchases'),
('1a8cea25-47af-458c-8728-832876a991d9', '2% discount on all vehicles'),
('1a8cea25-47af-458c-8728-832876a991d9', '10% discount on selected vehicle type'),
('1a8cea25-47af-458c-8728-832876a991d9', 'Medium insurance included in every rent'),
('1a8cea25-47af-458c-8728-832876a991d9', '7.5% discount on gift card purchases'),
('9772f7f7-3789-4d8a-a4d2-520d2b206e61', '10% discount on all vehicles'),
('9772f7f7-3789-4d8a-a4d2-520d2b206e61', 'Maximum insurance included in every rent'),
('9772f7f7-3789-4d8a-a4d2-520d2b206e61', '12% discount on gift card purchases');