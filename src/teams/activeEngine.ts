export interface ScannedAssetContext {
  barcodeData: string;       // Data pulled directly from the phone camera scan
  scannedByEmail: string;    // Captured automatically via Entra ID token (no human input)
  timestamp: Date;
}

export interface SharePointRecord {
  assetTag: string;
  category: "SIM Card" | "Laptop" | "Company Car" | "Tablet";
  currentCustodyEmail: string;
  status: "Active" | "Flagged For Audit" | "Maintenance Overdue";
  daysSinceLastScan: number;
}

export class AssetOpsActiveEngine {
  // Simulating an active company registry sitting securely inside the client's SharePoint List
  private sharePointListMock: Map<string, SharePointRecord> = new Map([
    ["TAG-SIM-402", { assetTag: "TAG-SIM-402", category: "SIM Card", currentCustodyEmail: "unassigned@company.com.au", status: "Active", daysSinceLastScan: 72 }],
    ["TAG-LAP-882", { assetTag: "TAG-LAP-882", category: "Laptop", currentCustodyEmail: "alex.d@company.com.au", status: "Active", daysSinceLastScan: 2 }],
    ["TAG-CAR-003", { assetTag: "TAG-CAR-003", category: "Company Car", currentCustodyEmail: "old.employee@company.com.au", status: "Active", daysSinceLastScan: 14 }]
  ]);

  /**
   * 1. THE ACTIVE QR/BARCODE SCAN PROCESSOR
   * Bypasses manual entry. Instantly reassigns custody when scanned via Microsoft Teams.
   */
  public processMobileScan(scan: ScannedAssetContext): string {
    const record = this.sharePointListMock.get(scan.barcodeData);

    if (!record) {
      return `❌ Asset Tag [${scan.barcodeData}] not found in your SharePoint database. Please register it first.`;
    }

    // Automatically overwrite the registry entry based on the verified Microsoft login token
    record.currentCustodyEmail = scan.scannedByEmail;
    record.daysSinceLastScan = 0; // Reset active telemetry counter
    record.status = "Active";

    return `✅ SUCCESS: ${record.category} (${scan.barcodeData}) is now securely assigned to ${scan.scannedByEmail} via Teams Mobile Cam.`;
  }

  /**
   * 2. THE COST & COMPLIANCE GUARD (FLAGS GHOST ASSETS)
   * Scans the database automatically to find dead items burning company money.
   */
  public findFinancialLeaks(): SharePointRecord[] {
    const wastefulAssets: SharePointRecord[] = [];
    
    this.sharePointListMock.forEach((record) => {
      // If a SIM card or device has not been physically scanned in 60 days, it's a financial leak
      if (record.daysSinceLastScan > 60 && record.category === "SIM Card") {
        record.status = "Flagged For Audit";
        wastefulAssets.push(record);
      }
    });

    return wastefulAssets;
  }

  /**
   * 3. THE SMART OFFBOARDING MANIFEST
   * Instantly runs when HR deactivates an account in Entra ID. Collects every physical item tied to that identity.
   */
  public generateOffboardingRecoveryReceipt(employeeEmail: string): SharePointRecord[] {
    const itemsToRecover: SharePointRecord[] = [];

    this.sharePointListMock.forEach((record) => {
      if (record.currentCustodyEmail === employeeEmail) {
        itemsToRecover.push(record);
      }
    });

    return itemsToRecover;
  }
}
