// src/app/api/tools/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

interface CreateToolRequest {
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
    const body: CreateToolRequest = await request.json();
    
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

    // Insert new environments
    if (body.environments && body.environments.length > 0) {
      const envValues = body.environments.map((env, index) => 
        `($1, $${index * 2 + 2}, $${index * 2 + 3})`
      ).join(', ');
      
      const envParams: (number | string | null)[] = [toolId];
      body.environments.forEach(env => {
        envParams.push(env.env_type);
        envParams.push(env.url ? env.url : null);
      });

      await client.query(
        `INSERT INTO tool_environments (tool_id, env_type, url) VALUES ${envValues}`,
        envParams
      );
    }

    // Insert new features
    if (body.features && body.features.length > 0) {
      const featureValues = body.features.map((_, index) => 
        `($1, $${index + 2}, ${index + 1})`
      ).join(', ');
      
      await client.query(
        `INSERT INTO tool_features (tool_id, feature_text, display_order) VALUES ${featureValues}`,
        [toolId, ...body.features]
      );
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

    const result = await client.query(
      'DELETE FROM tools WHERE id = $1 RETURNING id',
      [toolId]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Tool deleted successfully' },
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