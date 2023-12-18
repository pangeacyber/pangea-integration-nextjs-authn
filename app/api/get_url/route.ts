import { NextRequest, NextResponse } from "next/server";
import { PangeaConfig, FileScanService, TransferMethod, FileScanUploader } from "pangea-node-sdk";

export async function POST(req: NextRequest) {
  const config = new PangeaConfig({
    domain: process.env.PANGEA_DOMAIN,
    queuedRetryEnabled: true,
    pollResultTimeoutMs: 60 * 1000,
  });

  const client = new FileScanService(
    String(process.env.PANGEA_FILE_SCAN_TOKEN),
    config
  );

 var url;
  try {
     const request = {
       verbose: true,
       raw: true,
       provider: "crowdstrike",
       transfer_method: TransferMethod.PUT_URL,
     };

     var response = await client.requestUploadURL(request);
     url = response.accepted_result?.put_url || "";
     console.log(`Got presigned url: ${response}`);
  } catch (e) {
    console.log(e.toString());
  }

  return NextResponse.json({ putURL: url, request_id: response.request_id });
}
