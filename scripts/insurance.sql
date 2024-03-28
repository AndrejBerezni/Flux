CREATE TABLE IF NOT EXISTS insurance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vehicle VARCHAR(255) NOT NULL,
    stripe_product_id VARCHAR(255),
    stripe_price_id VARCHAR(255),
    price_description VARCHAR(255),
    coverage_name VARCHAR(255) NOT NULL,
    financial_responsibility VARCHAR(255),
    );

INSERT INTO insurance(vehicle, stripe_product_id, stripe_price_id, price_description, coverage_name, financial_responsibility)
VALUES ('cars','prod_PowKPbD29ajeMo','price_1OzISOAobn1NR6UqQTWkErWZ', '19.29€ / per day', 'maximum', '€0.00 financial responsibility'),
('cars','prod_PowLqG4uUeQDep','price_1OzIT0Aobn1NR6UqQ2IPx0jf', '11.58€ / per day', 'medium', '€700.00 financial responsibility'),
('cars',null,null, 'Included', 'minimum', '€1450.00 financial responsibility'),
('bikes','prod_PowMSknqHuHIJ0','price_1OzITiAobn1NR6UqYuTery5V', '9.99€ / per day', 'maximum', '€0.00 financial responsibility'),
('bikes','prod_PowNbMfv2rao8w','price_1OzIUQAobn1NR6Uqp2lDntI8', '4.99€ / per day', 'medium', '€400.00 financial responsibility'),
('bikes',null,null, 'Included', 'minimum', '€950.00 financial responsibility'),
('scooters','prod_PowNwBLGLbO7Oo','price_1OzIUxAobn1NR6Uq7zS2OzS5', '1.99€ / per day', 'maximum', '€0.00 financial responsibility'),
('scooters','prod_PowOjCIl3p1Keq','price_1OzIVdAobn1NR6UqTAm4Uv5u', '0.59€ / per day', 'medium', '€200.00 financial responsibility'),
('scooters',null,null, 'Included', 'minimum', '€350.00 financial responsibility');