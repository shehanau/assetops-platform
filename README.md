# AssetOps Microsoft Integration Hub 🇦🇺

Welcome to the core repository for **AssetOps.com.au**. 

This repository contains the functional architecture designed to bridge physical business infrastructure—such as **SIM cards, mobile devices, laptops, tablets, and fleet vehicles**—directly into your existing Microsoft 365 tenant (**Microsoft Teams, Entra ID, and SharePoint**).

Unlike static spreadsheets or basic Microsoft Lists that rely entirely on manual updates, AssetOps serves as an **Active Enforcement Layer** that captures events natively via mobile workers.

---

## 📂 Architecture Breakdown

* **`/appPackage/manifest.json`**: The application registration schema mapping device-level camera and Single Sign-On (SSO) permissions for Microsoft Teams.
* **`/src/teams/activeEngine.ts`**: The core operational automation layer. It processes phone camera barcode telemetry, validates user profiles against Entra ID, audits ghost assets, and generates offboarding logs.
* **`/src/testRun.ts`**: A pre-configured deployment script used to simulate real-world asset lifecycle tracking scenarios.

---

## ⚡ Active Automation vs. Passive Microsoft Lists

Traditional tools like SharePoint Lists or Microsoft Excel are **passive filing cabinets**—they fail because field crews, drivers, and on-site tradies forget to manually type in serial numbers. AssetOps turns data logging into a 2-second background action:

1. **Scan-to-Action Mechanics:** A worker opens Microsoft Teams, hits the scan prompt, and scans a physical asset sticker. The system reads their encrypted Entra ID session token and dynamically updates custody. No administrative data entry required.
2. **Ghost Asset Elimination:** The system runs background audits on operational lifecycles. If high-cost inventory lines (like Telstra/Optus SIM card plans) fail to perform a physical check-in for over 60 days, it automatically flags the line to stop financial leaks.
3. **Automated HR Offboarding Guard:** The moment an account is deactivated or modified within Entra ID, AssetOps scans your connected SharePoint lists to generate a physical recovery manifest (e.g., specific laptops, car keys, and mobile tech) before the employee leaves the company.

---

## 🔬 Live Simulation Testing Guide (Run in 60 Seconds)

You can run and evaluate this core logic directly in your web browser without downloading or installing any local software packages using **GitHub Codespaces**:

### 1. Fire Up the Cloud Terminal
* Click the green **`<> Code`** button at the top right of this repository.
* Select the **Codespaces** tab, and click **Create codespace on main**.
* Wait a few moments for your cloud development interface to load.

### 2. Execute the Test Command
Go to the **Terminal** window at the bottom of your screen, paste the following command string, and press **Enter**:

```bash
npm install ts-node typescript @types/node && npx ts-node src/testRun.ts
