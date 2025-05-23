/*
  # Initial Schema Setup for ShieldSentry

  1. New Tables
    - `scans`
      - `id` (uuid, primary key)
      - `url` (text)
      - `scan_result` (jsonb)
      - `risk_level` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)
      - `source` (text)
      - `status` (text)

    - `alerts`
      - `id` (uuid, primary key)
      - `type` (text)
      - `source` (text)
      - `url` (text)
      - `detected_at` (timestamp)
      - `status` (text)
      - `risk` (text)
      - `user_id` (uuid, foreign key)

    - `user_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `notifications` (jsonb)
      - `protection` (jsonb)
      - `scan_sources` (jsonb)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create scans table
CREATE TABLE IF NOT EXISTS scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  scan_result jsonb NOT NULL DEFAULT '{}',
  risk_level text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  source text NOT NULL,
  status text NOT NULL
);

ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own scans"
  ON scans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  source text NOT NULL,
  url text NOT NULL,
  detected_at timestamptz DEFAULT now(),
  status text NOT NULL,
  risk text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own alerts"
  ON alerts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  notifications jsonb NOT NULL DEFAULT '{
    "email": true,
    "browser": true,
    "mobile": false
  }',
  protection jsonb NOT NULL DEFAULT '{
    "level": "medium",
    "autoBlock": true,
    "scanDownloads": true,
    "checkLinks": true,
    "anonymizeData": false
  }',
  scan_sources jsonb NOT NULL DEFAULT '{
    "email": true,
    "web": true,
    "social": true,
    "messaging": false
  }',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own settings"
  ON user_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to automatically create user settings
CREATE OR REPLACE FUNCTION create_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to create user settings on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_settings();