import { NextRequest, NextResponse } from "next/server";
import { PangeaConfig, FileScanService } from "pangea-node-sdk";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const fileToScan = files[0];
  console.log(fileToScan);

  const config = new PangeaConfig({
    domain: process.env.NEXT_PUBLIC_PANGEA_DOMAIN,
    queuedRetryEnabled: true,
    pollResultTimeoutMs: 60 * 1000,
  });

  const client = new FileScanService(
    String(process.env.AUTHN_SERVICE_TOKEN),
    config
  );

  try {
    //     const request = {
    //       verbose: true,
    //       raw: true,
    //       provider: "reversinglabs",
    //       transfer_method: TransferMethod.PUT_URL,
    //     };
    //
    //     response = await client.requestUploadURL(request);
    //
    //     // extract upload url and upload details that should be posted with the file
    //     // If use TransferMethod.PUT_URL it's not needed file_details
    //     const url = response.accepted_result?.accepted_status.upload_url || "";
    //     console.log(`Got presigned url: ${url}`);
    //     // Create an uploader and upload the file
    //     const uploader = new FileScanUploader();
    //     await uploader.uploadFile(
    //       url,
    //       {
    //         file: yourFilepath,
    //         name: "file",
    //       },
    //       {
    //         transfer_method: TransferMethod.PUT_URL,
    //       }
    //     );
    //     console.log("Upload file success");
    //     console.log("Let's try to poll scan result...");
    //     const maxRetry = 12;
    //     for (let retry = 0; retry < maxRetry; retry++) {
    //       try {
    //         // Wait until result could be ready
    //         await delay(10 * 1000);
    //         const request_id = response.request_id || "";
    //         response = await client.pollResult(request_id);
    //         console.log("Result:", response.result);
    //         break;
    //       } catch {
    //         console.log(`Result is not ready yet. Retry: ${retry}`);
    //       }
    //     }
  } catch (e) {
    //     if (e instanceof PangeaErrors.APIError) {
    //       console.log(e.toString());
    //     } else {
    //       console.log("Error: ", e);
    //     }
  }

  return NextResponse.json({ message: "Files Created" });
}
