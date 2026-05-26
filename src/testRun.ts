import { AssetOpsActiveEngine, ScannedAssetContext } from "./teams/activeEngine";

const engine = new AssetOpsActiveEngine();

console.log("==================================================");
console.log("🎬 STARTING ASSETOPS ACTIVE ENGINE SIMULATION");
console.log("==================================================\n");

// 1. Simulate an automated phone camera scan on a company truck dashboard sticker
const mockScanEvent: ScannedAssetContext = {
  barcodeData: "TAG-CAR-003",
  scannedByEmail: "sam.driver@construction.com.au", // Extracted seamlessly from Microsoft SSO token
  timestamp: new Date()
};

console.log("--- TEST 1: Processing Live Mobile Scan Event ---");
const scanResult = engine.processMobileScan(mockScanEvent);
console.log(scanResult, "\n");

// 2. Simulate the backend scanning for ghost asset leaks (un-scanned Telstra/Optus data plans)
console.log("--- TEST 2: Automated Cost Optimization Audit ---");
const ghostAssets = engine.findFinancialLeaks();
ghostAssets.forEach(asset => {
  console.log(`⚠️ ALARM: ${asset.category} [${asset.assetTag}] hasn't checked in for ${asset.daysSinceLastScan} days! Recommend cutting data subscription line.`);
});
console.log("\n");

// 3. Simulate an Entra ID user offboarding check
console.log("--- TEST 3: HR Exit Audit (Generating Recovery Manifest) ---");
const targetDeparture = "alex.d@company.com.au";
const activeRecoveryReceipt = engine.generateOffboardingRecoveryReceipt(targetDeparture);

console.log(`Employee [${targetDeparture}] is leaving the firm. Lock network access and recover these physical items immediately:`);
activeRecoveryReceipt.forEach(item => {
  console.log(`  - 🛑 [ ] Recover: ${item.category} (Serial: ${item.assetTag})`);
});
console.log("\n==================================================");
