// scripts/migrate.js - Database Migration Script
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database migration...');
    
    // Create tables
    await client.query(`
      -- Main tools table
      CREATE TABLE IF NOT EXISTS tools (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL UNIQUE,
          description TEXT NOT NULL,
          icon_name VARCHAR(50) NOT NULL DEFAULT 'Database',
          color_scheme JSONB NOT NULL DEFAULT '{"icon": "text-blue-400", "bg": "bg-blue-500/20", "accent": "blue"}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      -- Tool environments table (E1, E2, E3)
      CREATE TABLE IF NOT EXISTS tool_environments (
          id SERIAL PRIMARY KEY,
          tool_id INTEGER NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
          env_type VARCHAR(10) NOT NULL CHECK (env_type IN ('E1', 'E2', 'E3')),
          url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(tool_id, env_type)
      );
    `);

    await client.query(`
      -- Tool features table
      CREATE TABLE IF NOT EXISTS tool_features (
          id SERIAL PRIMARY KEY,
          tool_id INTEGER NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
          feature_text VARCHAR(255) NOT NULL,
          display_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tool_environments_tool_id ON tool_environments(tool_id);
      CREATE INDEX IF NOT EXISTS idx_tool_features_tool_id ON tool_features(tool_id);
      CREATE INDEX IF NOT EXISTS idx_tool_features_order ON tool_features(tool_id, display_order);
    `);

    // Create updated_at trigger function
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers
    await client.query(`
      DROP TRIGGER IF EXISTS update_tools_updated_at ON tools;
      CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      
      DROP TRIGGER IF EXISTS update_tool_environments_updated_at ON tool_environments;
      CREATE TRIGGER update_tool_environments_updated_at BEFORE UPDATE ON tool_environments
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    // Check if data already exists
    const existingTools = await client.query('SELECT COUNT(*) FROM tools');
    
    if (parseInt(existingTools.rows[0].count) === 0) {
      console.log('📝 Inserting initial data...');
      
      // Insert existing tools data
      await client.query(`
        INSERT INTO tools (name, description, icon_name, color_scheme) VALUES
        ('Grafana', 'Custom dashboards, real-time alerts, and data visualization', 'Grafana', '{"icon": "text-red-400", "bg": "bg-indigo-500/20", "accent": "cyan"}'),
        ('ELK', 'Open-source log management and analysis stack', 'ELK', '{"icon": "text-yellow-400", "bg": "bg-yellow-500/20", "accent": "yellow"}'),
        ('EAG', 'Cloud-based containerization platform for app management', 'EAG', '{"icon": "text-cyan-400", "bg": "bg-cyan-500/20", "accent": "cyan"}'),
        ('Apigee', 'API management platform for seamless integration and scalability', 'Apigee', '{"icon": "text-purple-400", "bg": "bg-purple-500/20", "accent": "purple"}'),
        ('Dynatrace', 'AI-Powered application performance monitoring solution', 'Dynatrace', '{"icon": "text-green-400", "bg": "bg-green-500/20", "accent": "green"}');
      `);

      // Insert tool environments
      await client.query(`
        INSERT INTO tool_environments (tool_id, env_type, url) VALUES
        -- Grafana environments
        (1, 'E1', $1), (1, 'E2', $2), (1, 'E3', $3),
        -- ELK environments  
        (2, 'E1', $4), (2, 'E2', $5), (2, 'E3', $6),
        -- EAG environments
        (3, 'E1', $7), (3, 'E2', $8), (3, 'E3', $9),
        -- Apigee environments
        (4, 'E1', $10), (4, 'E2', $11), (4, 'E3', $12),
        -- Dynatrace environments
        (5, 'E1', $13), (5, 'E2', $14), (5, 'E3', $15);
      `, [
        process.env.NEXT_PUBLIC_E1_GRAFANA_URL || null,
        process.env.NEXT_PUBLIC_E2_GRAFANA_URL || null,
        process.env.NEXT_PUBLIC_E3_GRAFANA_URL || null,
        process.env.NEXT_PUBLIC_E1_ELK_URL || null,
        process.env.NEXT_PUBLIC_E2_ELK_URL || null,
        process.env.NEXT_PUBLIC_E3_ELK_URL || null,
        process.env.NEXT_PUBLIC_E1_EAG_URL || null,
        process.env.NEXT_PUBLIC_E2_EAG_URL || null,
        process.env.NEXT_PUBLIC_E3_EAG_URL || null,
        process.env.NEXT_PUBLIC_E1_APIGEE_URL || null,
        process.env.NEXT_PUBLIC_E2_APIGEE_URL || null,
        process.env.NEXT_PUBLIC_E3_APIGEE_URL || null,
        process.env.NEXT_PUBLIC_E1_DYNATRACE_URL || null,
        process.env.NEXT_PUBLIC_E2_DYNATRACE_URL || null,
        process.env.NEXT_PUBLIC_E3_DYNATRACE_URL || null
      ]);

      // Insert tool features
      await client.query(`
        INSERT INTO tool_features (tool_id, feature_text, display_order) VALUES
        -- Grafana features
        (1, 'Custom dashboards', 1),
        (1, 'Real-time alerts', 2),
        (1, 'Data visualization', 3),
        -- ELK features
        (2, 'Log analysis', 1),
        (2, 'Data discovery', 2),
        (2, 'Visual analytics', 3),
        -- EAG features
        (3, 'Metrics scraping', 1),
        (3, 'Time-series data', 2),
        (3, 'Query language', 3),
        -- Apigee features
        (4, 'Request tracing', 1),
        (4, 'Performance monitoring', 2),
        (4, 'Service dependencies', 3),
        -- Dynatrace features
        (5, 'AI-Powered monitoring', 1),
        (5, 'Full-stack observability', 2),
        (5, 'Automatic root cause analysis', 3);
      `);
      
      console.log('Initial data inserted successfully');
    } else {
      console.log('Data already exists, skipping initial data insertion');
    }

    console.log('Database migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migration
runMigration();