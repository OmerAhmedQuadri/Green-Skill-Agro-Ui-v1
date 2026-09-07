// Green Skill Agro - Wholesale Distribution Platform (Saudi Arabia)
// Mock Enterprise Domain Data & Specifications

export const SYSTEM_INFO = {
  appName: "Green Skill Agro",
  subTitle: "Field Sales & Inventory Management Platform",
  version: "v1.4 Enterprise",
  warehouse: "Riyadh Central Distribution Center (WH-01)",
  currentUser: {
    name: "Sami Al-Mansoor",
    role: "Operational Manager",
    tier: "Manager",
    permissions: ["Catalogue", "Vendors", "Inventory", "Cash", "Attendance", "Sales", "Stores", "Returns", "Reports", "Targets"]
  },
  lastSync: "Live (Online)",
  currency: "SAR"
};

export const ROLE_PROFILES = {
  superadmin: {
    id: "USR-001",
    name: "Abdulaziz Al-Saud",
    email: "abdulaziz@greenskillagro.sa",
    phone: "+966 50 111 2222",
    address: "King Fahd Road, Olaya District, Riyadh 12211, Kingdom of Saudi Arabia",
    role: "Super Administrator",
    roleKey: "superadmin",
    accountStatus: "Active (Root Security)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    permissions: [
      "System Control",
      "Tenant Management",
      "Database Governance",
      "Branch Administration",
      "Global Audit",
      "Security Override",
      "API Management"
    ]
  },
  admin: {
    id: "USR-002",
    name: "Admin System Owner",
    email: "admin@greenskillagro.sa",
    phone: "+966 50 333 4444",
    address: "Al-Malaz District, University Street, Riyadh 12831, Kingdom of Saudi Arabia",
    role: "System Administrator",
    roleKey: "admin",
    accountStatus: "Active (Admin Tier)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    permissions: [
      "System Rules Config",
      "Catalog & Templates",
      "Vendor Master Data",
      "Role & Permission Control",
      "Feature Toggles",
      "Audit Log Review",
      "PO Authorization"
    ]
  },
  manager: {
    id: "USR-003",
    name: "Sami Al-Mansoor",
    email: "sami.almansoor@greenskillagro.sa",
    phone: "+966 50 987 6543",
    address: "Central Distribution Center WH-01, Industrial Area 2, Riyadh 14321, Kingdom of Saudi Arabia",
    role: "Operational Manager",
    roleKey: "manager",
    accountStatus: "Active (Branch WH-01)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
    permissions: [
      "Catalogue Management",
      "Vendors Portal",
      "Inventory Stock Control",
      "Cash Reconciliation",
      "Attendance Review",
      "Sales Approvals",
      "Stores Onboarding",
      "Returns & Write-Offs",
      "Reports & Analytics",
      "Target Allocation"
    ]
  },
  seller: {
    id: "SEL-101",
    name: "Omar Farooq",
    email: "omar.farooq@greenskillagro.sa",
    phone: "+966 50 123 4567",
    address: "Al-Naseem District, Route 4 North, Riyadh 14233, Kingdom of Saudi Arabia",
    role: "Field Sales Representative",
    roleKey: "seller",
    accountStatus: "Active (Checked In)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    permissions: [
      "POS Terminal Access",
      "Van Inventory Stock View",
      "Store Portfolio Access",
      "Cash Handover Submission",
      "Daily Attendance Check-In",
      "Store Onboarding Submission"
    ]
  }
};

export const CURRENT_SELLER = {
  id: "SEL-101",
  name: "Omar Farooq",
  role: "Field Sales Representative",
  tier: "Seller",
  assignedVehicle: {
    id: "VH-01",
    registration: "KSA-8841-R",
    model: "Toyota Hilux Cargo 2.8L",
    stockValue: 84200
  },
  shiftStatus: "Checked In (07:30 AM)",
  checkInTime: "07:30 AM",
  odometerStart: 142850,
  odometerCurrent: 142992,
  distanceTodayKm: 142,
  route: "Riyadh North & Central",
  cashInHand: 14500,
  cashLimit: 12000,
  cashBreachWarning: true,
  dailySalesTarget: 40000,
  dailySalesAchieved: 32400,
  monthlySalesTarget: 250000,
  monthlySalesAchieved: 198000,
  assignedStoresCount: 14,
  visitedTodayCount: 5,
  scheduledTodayCount: 6
};

export const METRICS = {
  totalInventoryValue: 1845200,
  warehouseValue: 1420000,
  fleetValue: 325200,
  inTransitValue: 100000,
  expiryRiskCount: 3,
  expiryRiskValue: 14200,
  
  todayCollections: 142500,
  collectionsApproved: 118000,
  collectionsPending: 24500,
  overdueAmount: 38400,
  overdueStoresCount: 4,

  todaySales: 168400,
  vehicleSales: 125900,
  dispatchSales: 42500,
  activeDispatchesPending: 4,

  activeSellersCount: 6,
  sellersCheckedIn: 5,
  cashCeilingBreaches: 2,
  pendingApprovalsTotal: 7
};

export const APPROVAL_ITEMS = {
  writeOffs: [
    {
      id: "WO-2026-089",
      sku: "OKRA-PK-5KG",
      productName: "Okra Seed (Parbhani Kranti)",
      lotNumber: "OKR-2025-09A",
      quantity: "12 Bags (60 kg)",
      unitCost: 360,
      totalValue: 4320,
      holdingLocation: "Riyadh Central Warehouse (Bin B-04)",
      submittedBy: "Tariq Al-Rashid (Warehouse Supervisor)",
      dateSubmitted: "2026-09-04 16:30",
      reason: "Expired stock - Exceeded 30-day clearance window. Verified unsaleable.",
      photoEvidence: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80",
      status: "Pending Manager Approval"
    },
    {
      id: "WO-2026-091",
      sku: "MESH-HD-50M",
      productName: "Shade Net Heavy Duty (50m Roll)",
      lotNumber: "SN-2026-02",
      quantity: "5 Rolls",
      unitCost: 430,
      totalValue: 2150,
      holdingLocation: "Vehicle #VH-04 (Seller: Faisal Ahmed)",
      submittedBy: "Faisal Ahmed (Seller)",
      dateSubmitted: "2026-09-05 09:15",
      reason: "Physical tearing of protective mesh during transit loading.",
      photoEvidence: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80",
      status: "Pending Manager Approval"
    }
  ],
  dispatchRequests: [
    {
      id: "DP-2026-044",
      storeName: "Al-Madina Agri Center",
      location: "Al-Qassim Branch / Route",
      sellerName: "Omar Farooq",
      sku: "TOM-HYB-1KG",
      productName: "Hybrid Tomato Seed (Red Crown F1)",
      requestedQty: "50 Cans (50 kg)",
      vehicleCurrentStock: "10 Cans (Insufficient)",
      orderValue: 18500,
      dateRequested: "2026-09-05 10:20",
      status: "Pending Dispatch Handling",
      handlingManager: null
    },
    {
      id: "DP-2026-045",
      storeName: "Al-Nakhla Farm Supplies",
      location: "Riyadh Industrial Zone",
      sellerName: "Khalid Mansoor",
      sku: "CUC-ALP-500G",
      productName: "Cucumber Seed (Alpha F1)",
      requestedQty: "100 Pouches (50 kg)",
      vehicleCurrentStock: "20 Pouches (Insufficient)",
      orderValue: 22000,
      dateRequested: "2026-09-05 11:05",
      status: "Being Handled",
      handlingManager: "Sami Al-Mansoor"
    }
  ],
  cashHandovers: [
    {
      id: "CS-2026-112",
      sellerName: "Omar Farooq",
      route: "Riyadh North",
      type: "Bank Deposit",
      declaredAmount: 14500,
      bankName: "Al Rajhi Bank (Deposit Ref: #AR-99831)",
      dateSubmitted: "2026-09-05 14:10",
      proofImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      status: "Pending Verification",
      ceilingBreachFlag: true
    },
    {
      id: "CS-2026-114",
      sellerName: "Tariq Al-Rashid",
      route: "Al-Kharj Zone",
      type: "Manager Direct Handover",
      declaredAmount: 10000,
      bankName: "Physical Cash Envelope",
      dateSubmitted: "2026-09-05 13:45",
      proofImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80",
      status: "Pending Verification",
      ceilingBreachFlag: false
    }
  ],
  storeOverrides: [
    {
      id: "OVR-2026-012",
      storeName: "Green Oasis Agribusiness Store",
      sellerName: "Faisal Ahmed",
      creditCycle: "30-Day Monthly",
      creditLimit: 40000,
      currentOutstanding: 51200,
      daysOverdue: 12,
      requestedSaleValue: 8500,
      reason: "Store owner promised payment cheque tomorrow morning. Requires one-time dispatch override.",
      status: "Pending Override Decision"
    }
  ],
  newStores: [
    {
      id: "STR-NEW-904",
      storeName: "Al-Baraka Seeds & Mesh Co.",
      ownerName: "Ibrahim Al-Harbi",
      contactPhone: "+966 50 123 4567",
      city: "Tabuk",
      sellerName: "Khalid Mansoor",
      crNumber: "1010994821",
      vatNumber: "30049281900003",
      proposedCycle: "Weekly Cycle",
      proposedLimit: 25000,
      storefrontPhoto: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      coordinates: "24.7136° N, 46.6753° E",
      duplicateCheck: "Passed (No nearby store matching)",
      status: "Pending Approval"
    }
  ]
};

export const FLEET_DATA = [
  {
    vehicleId: "VH-01",
    registration: "KSA-8841-R",
    model: "Toyota Hilux Cargo 2.8L",
    assignedSeller: "Omar Farooq",
    route: "Riyadh North & Central",
    attendanceStatus: "Checked In (07:30 AM)",
    checkInDetails: "Selfie Verified | Odo: 142,850 km",
    stockValue: 84200,
    cashInHand: 14500,
    cashLimit: 12000,
    cashBreach: true,
    todaySales: 32400,
    distanceKm: 142,
    activeHours: "6h 45m",
    lastAuditDate: "2026-08-25",
    auditVariance: "0.00 SAR (Clean)",
    auditDueFlag: false
  },
  {
    vehicleId: "VH-02",
    registration: "KSA-4912-Q",
    model: "Isuzu D-Max Super Cab",
    assignedSeller: "Khalid Mansoor",
    route: "Al-Qassim Highway Corridor",
    attendanceStatus: "Checked In (08:15 AM)",
    checkInDetails: "Selfie Verified | Odo: 198,410 km",
    stockValue: 112000,
    cashInHand: 8200,
    cashLimit: 15000,
    cashBreach: false,
    todaySales: 48100,
    distanceKm: 210,
    activeHours: "7h 10m",
    lastAuditDate: "2026-07-28",
    auditVariance: "Flagged (Overdue 35 Days)",
    auditDueFlag: true
  },
  {
    vehicleId: "VH-03",
    registration: "KSA-3029-K",
    model: "Hyundai Mighty Box Truck",
    assignedSeller: "Tariq Al-Rashid",
    route: "Al-Kharj Agricultural Belt",
    attendanceStatus: "Checked In (07:00 AM)",
    checkInDetails: "Selfie Verified | Odo: 89,120 km",
    stockValue: 78000,
    cashInHand: 3100,
    cashLimit: 12000,
    cashBreach: false,
    todaySales: 19800,
    distanceKm: 98,
    activeHours: "5h 50m",
    lastAuditDate: "2026-09-01",
    auditVariance: "0.00 SAR (Clean)",
    auditDueFlag: false
  },
  {
    vehicleId: "VH-04",
    registration: "KSA-9104-D",
    model: "Ford Ranger Heavy Duty",
    assignedSeller: "Faisal Ahmed",
    route: "Eastern Province / Dammam",
    attendanceStatus: "Split Shift (Shift 2 Active)",
    checkInDetails: "Selfie Verified | Odo: 165,300 km",
    stockValue: 51000,
    cashInHand: 18900,
    cashLimit: 12000,
    cashBreach: true,
    todaySales: 42200,
    distanceKm: 185,
    activeHours: "8h 15m",
    lastAuditDate: "2026-08-20",
    auditVariance: "-150.00 SAR (Reconciled)",
    auditDueFlag: false
  }
];

export const INVENTORY_STOCK = [
  {
    sku: "OKRA-PK-5KG",
    productName: "Okra Seed (Parbhani Kranti)",
    category: "Vegetable Seeds",
    subCategory: "Open Pollinated",
    productType: "Seeds",
    packSize: "5 kg Bag",
    vendorCode: "VND-EMIRATES-01",
    warehouseQty: 240,
    fleetQty: 45,
    unitPrice: 360,
    totalValue: 102600,
    lotNumber: "OKR-2025-09A",
    mfd: "2025-03-10",
    expiryDate: "2026-09-30",
    daysToExpiry: 25,
    expiryFlag: "Time-based Warning (25 Days Left)",
    expiryStatus: "Warning",
    dispatchPriority: "First-Expiry-First-Out"
  },
  {
    sku: "TOM-HYB-1KG",
    productName: "Hybrid Tomato Seed (Red Crown F1)",
    category: "Vegetable Seeds",
    subCategory: "Hybrid F1",
    productType: "Seeds",
    packSize: "1 kg Can",
    vendorCode: "VND-ROYAL-DUTCH",
    warehouseQty: 850,
    fleetQty: 120,
    unitPrice: 370,
    totalValue: 358900,
    lotNumber: "TOM-2026-01",
    mfd: "2026-01-15",
    expiryDate: "2027-06-30",
    daysToExpiry: 298,
    expiryFlag: "Healthy",
    expiryStatus: "Good",
    dispatchPriority: "Standard"
  },
  {
    sku: "MESH-HD-50M",
    productName: "Shade Net Heavy Duty 80%",
    category: "Agriculture Essentials",
    subCategory: "Shade Mesh",
    productType: "Agriculture Essentials",
    packSize: "50m Roll",
    vendorCode: "VND-RIYADH-NETS",
    warehouseQty: 150,
    fleetQty: 28,
    unitPrice: 430,
    totalValue: 76540,
    lotNumber: "SN-2026-02",
    mfd: "N/A",
    expiryDate: "N/A (Expiry Disabled)",
    daysToExpiry: 999,
    expiryFlag: "No Expiry Tracking",
    expiryStatus: "Good",
    dispatchPriority: "Standard"
  },
  {
    sku: "CUC-ALP-500G",
    productName: "Cucumber Seed (Alpha F1)",
    category: "Vegetable Seeds",
    subCategory: "Hybrid F1",
    productType: "Seeds",
    packSize: "500g Pouch",
    vendorCode: "VND-EMIRATES-01",
    warehouseQty: 180,
    fleetQty: 60,
    unitPrice: 220,
    totalValue: 52800,
    lotNumber: "CUC-2025-11B",
    mfd: "2025-05-20",
    expiryDate: "2026-10-15",
    daysToExpiry: 40,
    expiryFlag: "Sale-rate Velocity Warning",
    expiryStatus: "Warning",
    dispatchPriority: "Priority Clearance"
  },
  {
    sku: "EGG-BLK-1KG",
    productName: "Eggplant Seed (Black Beauty)",
    category: "Vegetable Seeds",
    subCategory: "Open Pollinated",
    productType: "Seeds",
    packSize: "1 kg Can",
    vendorCode: "VND-JORDAN-AGRI",
    warehouseQty: 320,
    fleetQty: 40,
    unitPrice: 190,
    totalValue: 68400,
    lotNumber: "EGG-2026-03",
    mfd: "2026-02-01",
    expiryDate: "2027-08-15",
    daysToExpiry: 344,
    expiryFlag: "Healthy",
    expiryStatus: "Good",
    dispatchPriority: "Standard"
  }
];

export const PURCHASE_ORDERS = [
  {
    poNumber: "PO-2026-019",
    vendorName: "Emirates Seed Corporation",
    vendorCode: "VND-EMIRATES-01",
    itemsSummary: "500x Tomato F1 1KG, 300x Cucumber Alpha 500g",
    totalValue: 185000,
    stateIndex: 6,
    stateName: "6. In transit",
    dateRaised: "2026-08-01",
    expectedArrival: "2026-09-17",
    leadTimeDays: 35,
    adminApprovalStatus: "Approved by Admin",
    reorderSource: "Manual Order"
  },
  {
    poNumber: "PO-2026-021",
    vendorName: "Al-Riyadh Agri Nets Co.",
    vendorCode: "VND-RIYADH-NETS",
    itemsSummary: "200x Shade Net 80% 50m Rolls",
    totalValue: 45000,
    stateIndex: 2,
    stateName: "2. Pending approval",
    dateRaised: "2026-09-04",
    expectedArrival: "2026-09-25",
    leadTimeDays: 20,
    adminApprovalStatus: "Awaiting Admin Review",
    reorderSource: "Manager Submitted"
  },
  {
    poNumber: "PO-2026-022",
    vendorName: "Royal Dutch Seeds BV",
    vendorCode: "VND-ROYAL-DUTCH",
    itemsSummary: "1000x Carrot Nantes 1KG",
    totalValue: 210000,
    stateIndex: 1,
    stateName: "1. Draft",
    dateRaised: "2026-09-05",
    expectedArrival: "2026-10-15",
    leadTimeDays: 40,
    adminApprovalStatus: "Draft (System Forecasted)",
    reorderSource: "System Reorder Recommendation"
  },
  {
    poNumber: "PO-2026-018",
    vendorName: "Jordan Agri Chemicals & Seeds",
    vendorCode: "VND-JORDAN-AGRI",
    itemsSummary: "400x Squash Zucchini Seeds 500g",
    totalValue: 62000,
    stateIndex: 7,
    stateName: "7. Partially received",
    dateRaised: "2026-07-25",
    expectedArrival: "2026-09-02",
    leadTimeDays: 38,
    adminApprovalStatus: "Approved by Admin",
    reorderSource: "Manual Order"
  }
];

export const STORE_CREDIT_DATA = [
  {
    storeId: "STR-102",
    storeName: "Al-Madina Agri Center",
    ownerName: "Tariq Al-Amri",
    city: "Al-Qassim",
    assignedSeller: "Omar Farooq",
    creditCycle: "Weekly Cycle",
    creditLimit: 30000,
    outstandingBalance: 14500,
    daysOverdue: 0,
    status: "Active (Within Credit Limit)",
    blocked: false
  },
  {
    storeId: "STR-188",
    storeName: "Green Oasis Agribusiness Store",
    ownerName: "Sultan Al-Otaibi",
    city: "Jeddah",
    assignedSeller: "Faisal Ahmed",
    creditCycle: "30-Day Monthly",
    creditLimit: 40000,
    outstandingBalance: 51200,
    daysOverdue: 12,
    status: "Blocked (Over Credit Limit & Past Due)",
    blocked: true
  },
  {
    storeId: "STR-210",
    storeName: "Al-Nakhla Farm Supplies",
    ownerName: "Fahad Al-Dossary",
    city: "Riyadh",
    assignedSeller: "Khalid Mansoor",
    creditCycle: "Bill-to-Bill",
    creditLimit: 0,
    outstandingBalance: 0,
    daysOverdue: 0,
    status: "Active (Pay-on-Delivery)",
    blocked: false
  },
  {
    storeId: "STR-255",
    storeName: "Al-Kharj Seed & Irrigation Hub",
    ownerName: "Majid Al-Qahtani",
    city: "Al-Kharj",
    assignedSeller: "Tariq Al-Rashid",
    creditCycle: "Custom (14 Days)",
    creditLimit: 25000,
    outstandingBalance: 28900,
    daysOverdue: 5,
    status: "Blocked (Overdue Balance)",
    blocked: true
  }
];

export const SYSTEM_CONFIG_RULES = {
  maxSellerDiscountPct: 10,
  maxSellerCashCeiling: 12000,
  storeCreditGraceDays: 7,
  expiryWarningWindowDays: 30,
  vehicleAuditWindowDays: 35,
  requirePhotoForWriteOff: true,
  autoBlockOverdueStores: true,
  vatTaxRatePct: 15,
  lastUpdatedBy: "Admin System Owner (A. Al-Mansoor)",
  lastUpdatedAt: "2026-09-05 14:20"
};

export const VENDORS_MASTER_DATA = [
  {
    vendorCode: "VND-AGRI-GREEN",
    vendorName: "Al-Riyadh Agricultural Co.",
    taxNumber: "310492049100003",
    category: "Hybrid Seeds",
    paymentTerms: "30 Days Net",
    contactPerson: "Youssef Al-Zahrani",
    phone: "+966 50 123 4567",
    email: "procurement@riyadh-agri.com.sa",
    status: "Active Authorized Vendor",
    activePOsCount: 2
  },
  {
    vendorCode: "VND-SAUDI-AGRI",
    vendorName: "Saudi Agri Tech Industries",
    taxNumber: "310994019200003",
    category: "Shade Nets & Protective MESH",
    paymentTerms: "15 Days Net",
    contactPerson: "Ibrahim Al-Ghamdi",
    phone: "+966 55 987 6543",
    email: "sales@saudiagritech.com",
    status: "Active Authorized Vendor",
    activePOsCount: 1
  },
  {
    vendorCode: "VND-ROYAL-DUTCH",
    vendorName: "Royal Dutch Seeds BV",
    taxNumber: "NL840291049B01",
    category: "Imported Vegetable Seeds",
    paymentTerms: "Letter of Credit (LC)",
    contactPerson: "Hans van der Berg",
    phone: "+31 20 555 0192",
    email: "export@royaldutchseeds.nl",
    status: "Active Global Vendor",
    activePOsCount: 1
  },
  {
    vendorCode: "VND-JORDAN-AGRI",
    vendorName: "Jordan Agri Chemicals & Seeds",
    taxNumber: "JO991040192",
    category: "Agro Chemicals & Fertilizer",
    paymentTerms: "45 Days Net",
    contactPerson: "Ahmad Hamdan",
    phone: "+962 6 500 1234",
    email: "orders@jordanagri.jo",
    status: "Active Authorized Vendor",
    activePOsCount: 3
  }
];

export const PRODUCT_CATEGORIES_DATA = [
  {
    categoryId: "CAT-01",
    categoryName: "Hybrid Vegetable Seeds",
    codePrefix: "HYB-SEED",
    defaultUom: "1KG Pack",
    taxRatePct: 15,
    skusCount: 14,
    fefoPolicy: "Strict 30-Day FEFO Clearance",
    status: "Active Master Category"
  },
  {
    categoryId: "CAT-02",
    categoryName: "Protected Agriculture Shade Nets",
    codePrefix: "NET-MESH",
    defaultUom: "Roll (50m)",
    taxRatePct: 15,
    skusCount: 6,
    fefoPolicy: "Standard FIFO Warehousing",
    status: "Active Master Category"
  },
  {
    categoryId: "CAT-03",
    categoryName: "Agro Chemicals & Crop Protection",
    codePrefix: "CROP-CARE",
    defaultUom: "5L Canister",
    taxRatePct: 15,
    skusCount: 9,
    fefoPolicy: "Batch Expiry Tracked",
    status: "Active Master Category"
  }
];

export const USER_PERMISSIONS_DATA = [
  {
    userId: "USR-SUP-01",
    userName: "Abdulaziz Al-Saud",
    role: "Super Admin",
    assignedLocation: "Platform Master Operations",
    status: "Active",
    canOverrideCredit: true,
    canApproveWriteOff: true,
    canReleaseDispatch: true,
    canVerifyCash: true,
    canCreateProduct: true,
    canDraftPo: true,
    canManageAdmins: true
  },
  {
    userId: "USR-ADM-01",
    userName: "Admin System Owner",
    role: "Admin",
    assignedLocation: "Master Governance Desk",
    status: "Active",
    canOverrideCredit: true,
    canApproveWriteOff: true,
    canReleaseDispatch: true,
    canVerifyCash: true,
    canCreateProduct: true,
    canDraftPo: true,
    canManageAdmins: false
  },
  {
    userId: "USR-MNG-01",
    userName: "Sami Al-Mansoor",
    role: "Manager",
    assignedLocation: "Riyadh Central WH-01",
    status: "Active",
    canOverrideCredit: true,
    canApproveWriteOff: true,
    canReleaseDispatch: true,
    canVerifyCash: true,
    canCreateProduct: true,
    canDraftPo: true,
    canManageAdmins: false
  },
  {
    userId: "USR-MNG-02",
    userName: "Tariq Al-Rashid",
    role: "Manager",
    assignedLocation: "Al-Qassim WH-02",
    status: "Active",
    canOverrideCredit: false,
    canApproveWriteOff: true,
    canReleaseDispatch: true,
    canVerifyCash: true,
    canCreateProduct: false,
    canDraftPo: true,
    canManageAdmins: false
  },
  {
    userId: "USR-SEL-01",
    userName: "Omar Farooq",
    role: "Seller",
    assignedLocation: "Van #VH-01",
    status: "Active",
    canOverrideCredit: false,
    canApproveWriteOff: false,
    canReleaseDispatch: false,
    canVerifyCash: false,
    canCreateProduct: false,
    canDraftPo: false,
    canManageAdmins: false
  },
  {
    userId: "USR-SEL-02",
    userName: "Faisal Ahmed",
    role: "Seller",
    assignedLocation: "Van #VH-02",
    status: "Active",
    canOverrideCredit: false,
    canApproveWriteOff: false,
    canReleaseDispatch: false,
    canVerifyCash: false,
    canCreateProduct: false,
    canDraftPo: false,
    canManageAdmins: false
  }
];

export const BRANCHES_MASTER_DATA = [
  {
    branchId: "WH-01",
    branchName: "Riyadh Central Distribution Center",
    region: "Central Region (Riyadh)",
    manager: "Sami Al-Mansoor",
    activeSellersCount: 4,
    inventoryValue: 1420000,
    dailyTargetSales: 150000,
    status: "Active Hub"
  },
  {
    branchId: "WH-02",
    branchName: "Al-Qassim Regional Hub",
    region: "Agricultural Belt (Buraydah)",
    manager: "Tariq Al-Rashid",
    activeSellersCount: 3,
    inventoryValue: 890000,
    dailyTargetSales: 95000,
    status: "Active Hub"
  },
  {
    branchId: "WH-03",
    branchName: "Eastern Province Distribution Center",
    region: "Eastern Region (Dammam)",
    manager: "Fahad Al-Zahrani",
    activeSellersCount: 2,
    inventoryValue: 640000,
    dailyTargetSales: 70000,
    status: "Active Hub"
  },
  {
    branchId: "WH-04",
    branchName: "Southern Agriculture Depot",
    region: "Southern Region (Abha)",
    manager: "Youssef Al-Qarni",
    activeSellersCount: 2,
    inventoryValue: 420000,
    dailyTargetSales: 50000,
    status: "Active Hub"
  }
];

export const SYSTEM_KILL_SWITCHES = [
  {
    id: "KILL-01",
    name: "Global POS Sales Freeze",
    description: "Emergency freeze on all field POS sales transactions across all branches.",
    active: false,
    risk: "Critical"
  },
  {
    id: "KILL-02",
    name: "Credit Block Bypass Override",
    description: "Master override allowing platform-wide temporary sale releases for credit-blocked stores.",
    active: false,
    risk: "High"
  },
  {
    id: "KILL-03",
    name: "System Maintenance & Read-Only Mode",
    description: "Restrict platform writes to Super Admin only during scheduled system maintenance.",
    active: false,
    risk: "High"
  }
];

export const FEATURE_TOGGLES_DATA = [
  {
    id: "TOGGLE-01",
    featureName: "Field Store Credit Sales",
    description: "Allow field sellers to sell on running credit terms (weekly/monthly/bill-to-bill).",
    enabled: true,
    category: "Field Sales Rules"
  },
  {
    id: "TOGGLE-02",
    featureName: "Van Stock Repackaging & Conversion",
    description: "Permit managers to execute Workflow D (repackaging bulk SKUs into seller packs).",
    enabled: true,
    category: "Inventory Rules"
  },
  {
    id: "TOGGLE-03",
    featureName: "Strict Cash Ceiling Order Lock",
    description: "Automatically block sellers from taking new POS sales when daily cash ceiling (12,000 SAR) is breached.",
    enabled: true,
    category: "Cash & Security"
  },
  {
    id: "TOGGLE-04",
    featureName: "Auto-Block Overdue Credit Accounts",
    description: "System automatically blocks store accounts exceeding credit grace period without manual intervention.",
    enabled: true,
    category: "Credit Governance"
  },
  {
    id: "TOGGLE-05",
    featureName: "Mandatory Photo Evidence for Write-Offs",
    description: "Require photo upload verification before manager or admin stock write-off approval.",
    enabled: true,
    category: "Audit & Compliance"
  }
];

export const ADMIN_AUDIT_TRAIL = [
  {
    id: "AUD-2026-901",
    timestamp: "2026-09-05 14:20:15",
    user: "Admin System Owner",
    role: "Admin",
    action: "UPDATE_SYSTEM_CEILING",
    details: "Max seller discount ceiling updated from 8% to 10%.",
    riskLevel: "Medium Risk"
  },
  {
    id: "AUD-2026-902",
    timestamp: "2026-09-05 12:45:00",
    user: "Admin System Owner",
    role: "Admin",
    action: "APPROVE_DRAFT_PO",
    details: "Final approval granted for PO-2026-019 (Al-Riyadh Agricultural Co.) - SAR 184,000.",
    riskLevel: "Low Risk"
  },
  {
    id: "AUD-2026-903",
    timestamp: "2026-09-04 18:10:30",
    user: "Sami Al-Mansoor",
    role: "Manager",
    action: "OVERRIDE_CREDIT_BLOCK",
    details: "Credit override granted for Green Oasis Agribusiness (STR-188). Reason: Harvest seasonal payment agreement.",
    riskLevel: "High Risk"
  },
  {
    id: "AUD-2026-904",
    timestamp: "2026-09-04 11:30:22",
    user: "Admin System Owner",
    role: "Admin",
    action: "GRANT_PERMISSION_SET",
    details: "Granted canCreateProduct permission set to Manager Sami Al-Mansoor.",
    riskLevel: "Medium Risk"
  }
];

