-- ===========================================
-- Cartiva AI - Supabase Database Schema
-- ===========================================
-- Run this SQL in your Supabase SQL Editor to create the required tables
-- Go to: Supabase Dashboard > SQL Editor > New Query

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- Demo Requests Table
-- ===========================================
-- Stores demo booking form submissions
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT NOT NULL,
    industry TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);

-- Create index for sorting by date
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);

-- ===========================================
-- Contact Submissions Table
-- ===========================================
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index for sorting by date
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- ===========================================
-- Row Level Security (RLS) Policies
-- ===========================================
-- Enable RLS on tables for security
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for server-side operations)
-- Note: Service role bypasses RLS by default, but these policies
-- ensure proper security if accessed through other means

-- Allow insert from authenticated service role
CREATE POLICY "Allow service role insert demo_requests" ON demo_requests
    FOR INSERT
    TO service_role
    WITH CHECK (true);

CREATE POLICY "Allow service role select demo_requests" ON demo_requests
    FOR SELECT
    TO service_role
    USING (true);

CREATE POLICY "Allow service role insert contact_submissions" ON contact_submissions
    FOR INSERT
    TO service_role
    WITH CHECK (true);

CREATE POLICY "Allow service role select contact_submissions" ON contact_submissions
    FOR SELECT
    TO service_role
    USING (true);

-- ===========================================
-- Useful Views (Optional)
-- ===========================================

-- View: Recent demo requests (last 30 days)
CREATE OR REPLACE VIEW recent_demo_requests AS
SELECT 
    id,
    first_name || ' ' || last_name AS full_name,
    email,
    website,
    industry,
    message,
    created_at
FROM demo_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- View: Demo request stats by industry
CREATE OR REPLACE VIEW demo_requests_by_industry AS
SELECT 
    industry,
    COUNT(*) AS total_requests,
    MAX(created_at) AS last_request
FROM demo_requests
GROUP BY industry
ORDER BY total_requests DESC;

-- ===========================================
-- Grant permissions to views
-- ===========================================
GRANT SELECT ON recent_demo_requests TO service_role;
GRANT SELECT ON demo_requests_by_industry TO service_role;
