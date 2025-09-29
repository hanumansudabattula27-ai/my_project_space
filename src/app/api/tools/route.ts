import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// export interface Tool {
//   id: number;
//   name: string;
//   description: string;
//   icon_name: string;
//   color_scheme: {
//     icon: string;
//     bg: string;
//     accent: string;
//   };
//   environments: Array<{
//     env_type: 'E1' | 'E2' | 'E3';
//     url: string | null;
//   }>;
//   features: string[];
// }

// GET - Fetch all tools with environments and features
// export async function GET() {
//   const client = await pool.connect();
  
//   try {
//     const toolsQuery = `
//       SELECT 
//         t.id,
//         t.name,
//         t.description,
//         t.icon_name,
//         t.color_scheme,
//         COALESCE(
//           json_agg(
//             DISTINCT jsonb_build_object(
//               'env_type', te.env_type,
//               'url', te.url
//             )
//           ) FILTER (WHERE te.id IS NOT NULL),
//           '[]'::json
//         ) as environments,
//         COALESCE(
//           json_agg(
//             DISTINCT tf.feature_text
//             ORDER BY tf.display_order
//           ) FILTER (WHERE tf.id IS NOT NULL),
//           '[]'::json
//         ) as features
//       FROM tools t
//       LEFT JOIN tool_environments te ON t.id = te.tool_id
//       LEFT JOIN tool_features tf ON t.id = tf.tool_id
//       GROUP BY t.id, t.name, t.description, t.icon_name, t.color_scheme
//       ORDER BY t.created_at;
//     `;

//     const result = await client.query(toolsQuery);
    
//     const tools: Tool[] = result.rows.map(row => ({
//       id: row.id,
//       name: row.name,
//       description: row.description,
//       icon_name: row.icon_name,
//       color_scheme: row.color_scheme,
//       environments: row.environments || [],
//       features: row.features || []
//     }));

//     return NextResponse.json({ tools }, { status: 200 });
    
//   } catch (error) {
//     console.error('Error fetching tools:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch tools' },
//       { status: 500 }
//     );
//   } finally {
//     client.release();
//   }
// }
export async function GET() {
  const client = await pool.connect();
  
  try {
    // Get tools with their environments and features
    const toolsQuery = `
      SELECT 
        t.id,
        t.name,
        t.description,
        t.icon_name,
        t.color_scheme
      FROM tools t
      ORDER BY t.created_at;
    `;

    const result = await client.query(toolsQuery);
    
    // For each tool, get environments and features separately
    const tools = [];
    
    for (const tool of result.rows) {
      // Get environments
      const envResult = await client.query(
        'SELECT env_type, url FROM tool_environments WHERE tool_id = $1',
        [tool.id]
      );
      
      // Get features
      const featuresResult = await client.query(
        'SELECT feature_text FROM tool_features WHERE tool_id = $1 ORDER BY display_order',
        [tool.id]
      );
      
      tools.push({
        id: tool.id,
        name: tool.name,
        description: tool.description,
        icon_name: tool.icon_name,
        color_scheme: tool.color_scheme,
        environments: envResult.rows,
        features: featuresResult.rows.map(f => f.feature_text)
      });
    }

    return NextResponse.json({ tools });
    
  } catch (error) {
    console.error('Database error details:', error);
    return NextResponse.json(
      { error: 'Database error', details: error.message },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// POST - Create new tool
export async function POST(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.icon_name) {
      return NextResponse.json(
        { error: 'Name, description, and icon_name are required' },
        { status: 400 }
      );
    }

    await client.query('BEGIN');

    // Insert tool
    const toolResult = await client.query(
      `INSERT INTO tools (name, description, icon_name, color_scheme) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [body.name, body.description, body.icon_name, JSON.stringify(body.color_scheme)]
    );
    
    const toolId = toolResult.rows[0].id;

    // // Insert environments
    // if (body.environments && body.environments.length > 0) {
    //   for (const env of body.environments) {
    //     if (env.url && env.url.trim()) {
    //       await client.query(
    //         'INSERT INTO tool_environments (tool_id, env_type, url) VALUES ($1, $2, $3)',
    //         [toolId, env.env_type, env.url]
    //       );
    //     }
    //   }
    // }
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
      { message: 'Tool created successfully', toolId },
      { status: 201 }
    );
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating tool:', error);
    return NextResponse.json(
      { error: 'Failed to create tool' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
