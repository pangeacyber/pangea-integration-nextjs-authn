import { NextRequest, NextResponse } from "next/server";
import { PangeaConfig, FileScanService, TransferMethod, FileScanUploader } from "pangea-node-sdk";

const delay = async (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

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

  const request = await req.json()
  const request_id = request.request_id;
  var response;
  console.log("request id: ", request_id);
  try {
     const request = {
       verbose: true,
       raw: true,
       provider: "crowdstrike",
       transfer_method: TransferMethod.PUT_URL,
     };
    for (let retry = 0; retry < 10; retry++) {
      try {
        // Wait until result could be ready
        await delay(20 * 1000);
        response = await client.pollResult(request_id);
        console.log("Result:", response.result);
        break;
      } catch {
        console.log(`Result is not ready yet. Retry: ${retry}`);
      }
    }
  } catch (e) {
    console.log(e.toString());
  }

  return NextResponse.json(response.result || { error: "timed out waiting for result"});
}
