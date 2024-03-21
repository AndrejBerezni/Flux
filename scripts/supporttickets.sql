CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_contact VARCHAR(255) NOT NULL,
    issue_category VARCHAR(255) NOT NULL,
    issue_description VARCHAR(800) NOT NULL,
    assigned_agent VARCHAR(255),
    resolved BOOLEAN NOT NULL DEFAULT false
    priority NUMERIC NOT NULL DEFAULT 3
);