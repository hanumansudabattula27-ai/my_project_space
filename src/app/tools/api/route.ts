// // app/api/tools/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { Pool } from 'pg';

// // Database connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
// });

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

// export interface CreateToolRequest {
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
//     url: string;
//   }>;
//   features: string[];
// }

// // GET - Fetch all tools with environments and features
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
    
//     // Process tools to match expected format
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

// // POST - Create new tool
// export async function POST(request: NextRequest) {
//   const client = await pool.connect();
  
//   try {
//     const body: CreateToolRequest = await request.json();
    
//     // Validate required fields
//     if (!body.name || !body.description || !body.icon_name) {
//       return NextResponse.json(
//         { error: 'Name, description, and icon_name are required' },
//         { status: 400 }
//       );
//     }

//     await client.query('BEGIN');

//     // Insert tool
//     const toolResult = await client.query(
//       `INSERT INTO tools (name, description, icon_name, color_scheme) 
//        VALUES ($1, $2, $3, $4) 
//        RETURNING id`,
//       [body.name, body.description, body.icon_name, JSON.stringify(body.color_scheme)]
//     );
    
//     const toolId = toolResult.rows[0].id;

//     // Insert environments
//     if (body.environments && body.environments.length > 0) {
//       const envValues = body.environments.map((env, index) => 
//         `($1, $${index * 2 + 2}, $${index * 2 + 3})`
//       ).join(', ');
      
//       const envParams = [toolId];
//       body.environments.forEach(env => {
//         envParams.push(env.env_type, env.url ? env.url : null);
//       });

//       await client.query(
//         `INSERT INTO tool_environments (tool_id, env_type, url) VALUES ${envValues}`,
//         envParams
//       );
//     }

//     // Insert features
//     if (body.features && body.features.length > 0) {
//       const featureValues = body.features.map((_, index) => 
//         `($1, $${index + 2}, ${index + 1})`
//       ).join(', ');
      
//       await client.query(
//         `INSERT INTO tool_features (tool_id, feature_text, display_order) VALUES ${featureValues}`,
//         [toolId, ...body.features]
//       );
//     }

//     await client.query('COMMIT');

//     return NextResponse.json(
//       { message: 'Tool created successfully', toolId },
//       { status: 201 }
//     );
    
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error creating tool:', error);
    
//     if (error instanceof Error && error.message.includes('duplicate key')) {
//       return NextResponse.json(
//         { error: 'Tool name already exists' },
//         { status: 409 }
//       );
//     }
    
//     return NextResponse.json(
//       { error: 'Failed to create tool' },
//       { status: 500 }
//     );
//   } finally {
//     client.release();
//   }
// }

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "API route works" });
}