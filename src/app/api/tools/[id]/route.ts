// src/app/api/tools/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

interface UpdateToolRequest {
  name: string;
  description: string;
  icon_name: string;
  color_scheme: {
    icon: string;
    bg: string;
    accent: string;
  };
  environments: Array<{
    env_type: 'E1' | 'E2' | 'E3';
    url: string;
  }>;
  features: string[];
}

// PUT - Update existing tool
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect();
  
  try {
    const toolId = parseInt(params.id);
    const body: UpdateToolRequest = await request.json();
    
    if (isNaN(toolId)) {
      return NextResponse.json(
        { error: 'Invalid tool ID' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name || !body.description || !body.icon_name) {
      return NextResponse.json(
        { error: 'Name, description, and icon_name are required' },
        { status: 400 }
      );
    }

    await client.query('BEGIN');

    // Update tool
    await client.query(
      `UPDATE tools 
       SET name = $1, description = $2, icon_name = $3, color_scheme = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [body.name, body.description, body.icon_name, JSON.stringify(body.color_scheme), toolId]
    );

    // Delete existing environments and features
    await client.query('DELETE FROM tool_environments WHERE tool_id = $1', [toolId]);
    await client.query('DELETE FROM tool_features WHERE tool_id = $1', [toolId]);


    // Always insert all three environments (E1, E2, E3) for consistency
const allEnvironments = ['E1', 'E2', 'E3'];
for (const envType of allEnvironments) {
  const userEnv = body.environments.find(env => env.env_type === envType);
  let envUrl = userEnv?.url?.trim() || null;
  
  // Fix URL format at API level - ensure protocol is present
  if (envUrl && !envUrl.startsWith('http://') && !envUrl.startsWith('https://')) {
    envUrl = `https://${envUrl}`;
  }
  
  await client.query(
    'INSERT INTO tool_environments (tool_id, env_type, url) VALUES ($1, $2, $3)',
    [toolId, envType, envUrl]
  );
}

    // Insert features
    if (body.features && body.features.length > 0) {
      for (let i = 0; i < body.features.length; i++) {
        await client.query(
          'INSERT INTO tool_features (tool_id, feature_text, display_order) VALUES ($1, $2, $3)',
          [toolId, body.features[i], i + 1]
        );
      }
    }

    await client.query('COMMIT');

    return NextResponse.json(
      { message: 'Tool updated successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating tool:', error);
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'Tool name already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update tool' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// DELETE - Remove tool
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect();
  
  try {
    const toolId = parseInt(params.id);
    
    if (isNaN(toolId)) {
      return NextResponse.json(
        { error: 'Invalid tool ID' },
        { status: 400 }
      );
    }

    // Check if tool exists
    const checkTool = await client.query(
      'SELECT id FROM tools WHERE id = $1',
      [toolId]
    );
    
    if (checkTool.rows.length === 0) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Delete tool (CASCADE will handle environments and features)
    const result = await client.query(
      'DELETE FROM tools WHERE id = $1 RETURNING id',
      [toolId]
    );

    return NextResponse.json(
      { message: 'Tool deleted successfully', deletedId: result.rows[0].id },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error deleting tool:', error);
    return NextResponse.json(
      { error: 'Failed to delete tool' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}