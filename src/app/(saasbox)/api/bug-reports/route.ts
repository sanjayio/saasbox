import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/drizzle/db';
import { credential, bugReport } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {    
    // Parse multipart form data
    const formData = await request.formData();
    
    // Extract all fields
    const description = formData.get('description') as string;
    const saasBoxKey = formData.get('saasBoxKey') as string;
    const saasBoxSecret = formData.get('saasBoxSecret') as string;
    const consoleLogs = formData.get('consoleLogs') as string;
    const networkRequests = formData.get('networkRequests') as string;
    const systemInfo = formData.get('systemInfo') as string;
    const screenshot = formData.get('screenshot') as File;
    
    // Parse JSON fields
    let parsedConsoleLogs;
    let parsedNetworkRequests;
    let parsedSystemInfo;
    
    try {
      parsedConsoleLogs = consoleLogs ? JSON.parse(consoleLogs) : [];
    } catch (error) {
      console.error("Failed to parse consoleLogs:", error);
      parsedConsoleLogs = [];
    }
    
    try {
      parsedNetworkRequests = networkRequests ? JSON.parse(networkRequests) : [];
    } catch (error) {
      console.error("Failed to parse networkRequests:", error);
      parsedNetworkRequests = [];
    }
    
    try {
      parsedSystemInfo = systemInfo ? JSON.parse(systemInfo) : {};
    } catch (error) {
      console.error("Failed to parse systemInfo:", error);
      parsedSystemInfo = {};
    }
    
    const credentials = await db
      .select({
        id: credential.id,
        userId: credential.userId,
      })
      .from(credential)
      .where(and(eq(credential.key, saasBoxKey), eq(credential.secret, saasBoxSecret)))
      .limit(1);
    
    if (!credentials || credentials.length === 0) {
      return NextResponse.json(
        { error: "Invalid SaaSBox credentials" },
        { status: 401 }
      );
    }
    
    const credentialRecord = credentials[0];
    if (!credentialRecord) {
      return NextResponse.json(
        { error: "Invalid SaaSBox credentials" },
        { status: 401 }
      );
    }
    
    const { id: credentialId, userId } = credentialRecord;

    // Convert screenshot to base64 string if present
    let screenshotBase64: string | undefined;
    if (screenshot) {
      const bytes = await screenshot.arrayBuffer();
      const buffer = Buffer.from(bytes);
      screenshotBase64 = buffer.toString('base64');
    }

    // Insert bug report into database using drizzle query builder
    const insertedReports = await db.insert(bugReport).values({
      description,
      userId,
      credentialId,
      consoleLogs: parsedConsoleLogs,
      networkRequests: parsedNetworkRequests,
      systemInfo: parsedSystemInfo,
      screenshot: screenshotBase64 || null,
      createdAt: new Date(),
    }).returning();
    
    const insertedId = insertedReports[0]?.id;

    return NextResponse.json({
      success: true,
      message: "Bug report received successfully",
      id: insertedId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error processing bug report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
