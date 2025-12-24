import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();

    // Extract all fields
    const description = formData.get("description") as string;
    const saasBoxKey = formData.get("saasBoxKey") as string;
    const saasBoxSecret = formData.get("saasBoxSecret") as string;
    const consoleLogs = formData.get("consoleLogs") as string;
    const networkRequests = formData.get("networkRequests") as string;
    const systemInfo = formData.get("systemInfo") as string;
    const screenshot = formData.get("screenshot") as File | null;

    // Convert screenshot to base64 string if present
    let screenshotBase64: string | undefined;
    if (screenshot) {
      const bytes = await screenshot.arrayBuffer();
      const buffer = Buffer.from(bytes);
      screenshotBase64 = buffer.toString("base64");
    }

    const event = await inngest.send({
      name: "bug-reporter/bug.reported",
      data: {
        description,
        saasBoxKey,
        saasBoxSecret,
        consoleLogs,
        networkRequests,
        systemInfo,
        screenshotBase64: screenshotBase64 ?? null,
      },
    });

    const cleanupEvent = await inngest.send({
      name: "bug-reporter/cleanup.triggered",
      data: {
        saasBoxKey,
        saasBoxSecret,
      },
    });

    const insertedId = event?.ids?.[0];

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
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
