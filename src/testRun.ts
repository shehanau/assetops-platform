// =========================================================================
// 1. THE ASSETOPS ACTIVE CORE ENGINE LOGIC
// =========================================================================

export interface ScannedAssetContext {
  barcodeData: string;       // Data pulled from phone camera scan
  scannedByEmail: string;    // Captured automatically via Entra ID token
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
  // Simulating an active company registry sitting securely inside SharePoint
  private sharePointListMock: Map<string, SharePointRecord> = new Map([
    ["TAG-SIM-402", { assetTag: "TAG-SIM-402", category: "SIM Card", currentCustodyEmail: "unassigned@company.com.au", status: "Active", daysSinceLastScan: 72 }],
    ["TAG-LAP-882", { assetTag: "TAG-LAP-882", category: "Laptop", currentCustodyEmail: "alex.d@company.com.au", status: "Active", daysSinceLastScan: 2 }],
    ["TAG-CAR-003", { assetTag: "TAG-CAR-003", category: "Company Car", currentCustodyEmail: "old.employee@company.com.au", status: "Active", daysSinceLastScan: 14 }]
  ]);

  // Processes phone camera tags instantly inside Teams
  public processMobileScan(scan: ScannedAssetContext): string {
    const record = this.sharePointListMock.get(scan.barcodeData);
    if (!record) {
      return `❌ Asset Tag [${scan.barcodeData}] not found in your SharePoint database.`;
    }
    record.currentCustodyEmail = scan.scannedByEmail;
    record.daysSinceLastScan = 0; 
    record.status = "Active";
    return `✅ SUCCESS: ${record.category} (${scan.barcodeData}) is now securely assigned to ${scan.scannedByEmail} via Teams Mobile Cam.`;
  }

  // Audits ghost assets draining company money
  public findFinancialLeaks(): SharePointRecord[] {
    const wastefulAssets: SharePointRecord[] = [];
    this.sharePointListMock.forEach((record) => {
      if (record.daysSinceLastScan > 60 && record.category === "SIM Card") {
        record.status = "Flagged For Audit";
        wastefulAssets.push(record);
      }
    });
    return wastefulAssets;
  }

  // Generates HR exit manifests instantly
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

// =========================================================================
// 2. RUN THE SIMULATION DIRECTLY
// =========================================================================

const engine = new AssetOpsActiveEngine();

console.log("==================================================");
console.log("🎬 STARTING ASSETOPS ACTIVE ENGINE SIMULATION");
console.log("==================================================\n");

// Test 1: Handle a mobile scan event
const mockScanEvent: ScannedAssetContext = {
  barcodeData: "TAG-CAR-003",
  scannedByEmail: "sam.driver@construction.com.au",
  timestamp: new Date()
};
console.log("--- TEST 1: Processing Live Mobile Scan Event ---");
console.log(engine.processMobileScan(mockScanEvent), "\n");

// Test 2: Find ghost SIM cards
console.log("--- TEST 2: Automated Cost Optimization Audit ---");
const ghostAssets = engine.findFinancialLeaks();
ghostAssets.forEach(asset => {
  console.log(`⚠️ ALARM: ${asset.category} [${asset.assetTag}] hasn't checked in for ${asset.daysSinceLastScan} days! Recommend cutting data subscription line.`);
});
console.log("\n");

// Test 3: Offboarding audit
console.log("--- TEST 3: HR Exit Audit (Generating Recovery Manifest) ---");
const targetDeparture = "alex.d@company.com.au";
const activeRecoveryReceipt = engine.generateOffboardingRecoveryReceipt(targetDeparture);
console.log(`Employee [${targetDeparture}] is leaving the firm. Lock network access and recover these physical items immediately:`);
activeRecoveryReceipt.forEach(item => {
  console.log(`  - 🛑 [ ] Recover: ${item.category} (Serial: ${item.assetTag})`);
});
console.log("\n==================================================");
