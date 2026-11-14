import { Injectable, signal } from '@angular/core';
const en: Record<string, string> = {
  addToCart: 'Add to sale',
  outOfStock: 'Out of stock',
  unavailableForSale: 'Not available for sale',
  productsCount: 'products',
  availableUnits: 'Available units',
  saving: 'Saving… Please wait',

  serverNote:
    'Your workspace is stored on the server and shared with its authorized users. Use fictional data for academic evaluation.',
  employeePasswordNote:
    'Set an initial password of at least 8 characters and share it with the employee through a private channel.',
  weatherTitle: 'Regional weather for dispatch planning',
  weatherHint: 'Reference conditions for central Lima; confirm conditions on your route',
  precipitation: 'Precipitation',
  wind: 'Wind',
  weatherUnavailable: 'Weather is temporarily unavailable. You can continue managing dispatches.',
  SALE_CONFIRMED: 'Sale confirmed',
  DELIVERY_CONFIRMED: 'Delivery confirmed',
  UPSTREAM_UNAVAILABLE: 'The external service is temporarily unavailable.',
  IDEMPOTENCY_CONFLICT: 'This request identifier was already used with different data.',
  CONFLICT: 'A record with those details already exists.',
  INTERNAL_ERROR: 'The server could not complete the operation. Please retry.',
  app: 'AI-ToDu',
  type: 'Movement type',
  passwordHint: 'At least 8 characters',
  backWorkspace: 'Back to workspace',
  overview: 'Overview',
  inventory: 'Inventory',
  purchases: 'Purchasing',
  sales: 'Sales',
  logistics: 'Dispatches',
  returns: 'Returns',
  team: 'Team',
  notifications: 'Notifications',
  movements: 'Stock history',
  login: 'Sign in',
  register: 'Create workspace',
  logout: 'Sign out',
  language: 'Language',
  menu: 'Open navigation',
  workspace: 'Operations workspace',
  demo: 'Academic demo · use fictional data only',
  demoNote: 'Data persists in this demo. No actual payments or fiscal receipts are issued.',
  email: 'Email address',
  password: 'Password',
  company: 'Company name',
  fullName: 'Full name',
  welcome: 'Everything your next delivery needs.',
  welcomeText: 'Keep inventory, purchasing, sales and dispatches in one traceable workflow.',
  demoAccess: 'Demo access',
  demoCredentials: 'admin@demo.ai-todu.test · DemoOnly2026!',
  noAccount: 'New to AI-ToDu?',
  hasAccount: 'Already have a workspace?',
  create: 'Create',
  save: 'Save',
  cancel: 'Cancel',
  close: 'Close',
  search: 'Search by name or SKU',
  refresh: 'Refresh',
  loading: 'Loading workspace…',
  empty: 'No records yet',
  emptyHint: 'Create the first record to start this workflow.',
  error: 'The operation could not be completed.',
  saved: 'Changes saved',
  required: 'Check the required fields and valid values.',
  name: 'Name',
  sku: 'SKU',
  quantity: 'Quantity',
  available: 'Available',
  price: 'Unit price',
  cost: 'Unit cost',
  minimum: 'Minimum stock',
  status: 'Status',
  actions: 'Actions',
  date: 'Date',
  reason: 'Reason',
  product: 'Product',
  supplier: 'Supplier',
  order: 'Purchase order',
  receive: 'Receive items',
  newProduct: 'New product',
  stockMovement: 'Record movement',
  conservation: 'Conservation',
  receipt: 'Stock receipt',
  issue: 'Stock issue',
  loss: 'Stock loss',
  newSupplier: 'Add supplier',
  contact: 'Contact',
  newPurchase: 'New purchase order',
  ordered: 'Ordered',
  received: 'Received',
  pending: 'Pending',
  add: 'Add',
  cart: 'Current sale',
  checkout: 'Confirm sale',
  total: 'Total',
  unitPrice: 'Price',
  stock: 'Stock',
  history: 'Sales history',
  cancelSale: 'Cancel sale',
  receiptTitle: 'Demo receipt · not a fiscal document',
  newDispatch: 'New dispatch',
  sale: 'Sale',
  driver: 'Driver',
  vehicle: 'Vehicle',
  destination: 'Delivery address',
  startRoute: 'Start route',
  deliver: 'Confirm delivery',
  recipient: 'Received by',
  incident: 'Report incident',
  description: 'Description',
  newDriver: 'Add driver',
  newVehicle: 'Add vehicle',
  license: 'Driver licence',
  plate: 'Plate',
  newReturn: 'Record return',
  disposition: 'Disposition',
  restock: 'Restock',
  returnLoss: 'Record as loss',
  revenue: 'Net sales',
  grossMargin: 'Gross contribution',
  inventoryValue: 'Inventory at cost',
  lowStock: 'Low stock products',
  activeDispatches: 'Dispatches in transit',
  saleCount: 'Confirmed sales',
  overviewHint: 'Calculated from the transactions recorded in this workspace.',
  marginNote:
    'Gross contribution deducts product cost and recorded stock losses. It is not net business profit.',
  workflow: 'Your operational flow',
  flow1: 'Receive and inspect stock',
  flow2: 'Record a sale',
  flow3: 'Prepare and deliver',
  flow4: 'Review the evidence',
  overviewIntro: 'A clear view of what is ready, what is moving and what needs attention.',
  newEmployee: 'Register employee',
  role: 'Role',
  activationNote:
    'Employees are registered for planning. Account activation and invitations are planned for AV2.',
  read: 'Mark as read',
  reference: 'Reference',
  print: 'Print receipt',
  details: 'Details',
  returnPolicy: 'Return disposition',
  privacy: 'Privacy',
  terms: 'Terms of use',
  legalTitle: 'Academic demo terms and privacy',
  legalText:
    'This prototype is for university evaluation with fictional data. Avoid personal, financial and confidential business information. In server mode, workspace records are stored in PostgreSQL and accessible to authorized workspace users. Your session token is stored in this browser until sign-out or expiry. Optional demo mode keeps records in this browser or the local demo server. No real payments or SUNAT documents are issued. The dispatch weather panel sends only fixed coordinates for central Lima to Open-Meteo.',
  back: 'Back to workspace',
  notFound: 'Page not found',
  goHome: 'Open workspace',
  GOOD: 'Good condition',
  QUARANTINED: 'Quarantined',
  DAMAGED: 'Damaged',
  OPEN: 'Open',
  PARTIAL: 'Partially received',
  RECEIVED: 'Received',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
  PENDING: 'Pending dispatch',
  IN_TRANSIT: 'In transit',
  DELIVERED: 'Delivered',
  ADMIN: 'Administrator',
  WAREHOUSE: 'Warehouse operator',
  SALES: 'Sales operator',
  LOGISTICS: 'Dispatch operator',
  RECEIPT: 'Stock receipt',
  ISSUE: 'Stock issue',
  LOSS: 'Stock loss',
  OPENING: 'Opening balance',
  PURCHASE_RECEIPT: 'Purchase receipt',
  SALE: 'Sale',
  CANCELLATION: 'Sale cancellation',
  RETURN: 'Customer return',
  LOW_STOCK: 'Low stock alert',
  RESTOCK: 'Restock',
  DEMO: 'Demo',
  UNAUTHENTICATED: 'Sign in again to continue.',
  FORBIDDEN: 'Your role does not have access to this operation.',
  INSUFFICIENT_STOCK: 'The quantity exceeds the stock available. Review the cart.',
  INVALID_QUANTITY: 'Enter a positive whole quantity.',
  INVALID_MONEY: 'Enter a non-negative amount with up to two decimals.',
  INVALID_SKU: 'Use a SKU of 2–32 letters, digits or hyphens.',
  INVALID_ADDRESS: 'Enter a delivery address of 5–240 characters.',
  INVALID_TEXT: 'Check the text length and required fields.',
  INVALID_CREDENTIALS: 'The email or password is incorrect.',
  INVALID_EMAIL: 'Enter a valid email address.',
  EMAIL_EXISTS: 'This email is already registered.',
  SKU_EXISTS: 'This SKU is already registered.',
  PRODUCT_BLOCKED: 'This product is quarantined or damaged.',
  EMPTY_LINES: 'Add at least one item.',
  DUPLICATE_LINE: 'An item was included more than once.',
  EXCESS_RECEIPT: 'The receipt exceeds the outstanding quantity.',
  ORDER_CLOSED: 'This purchase order has already been received.',
  ALREADY_CANCELLED: 'This sale was already cancelled.',
  SALE_DISPATCHED: 'This sale is already assigned to a dispatch.',
  SALE_HAS_RETURN: 'This sale has a return; it cannot be cancelled.',
  INVALID_TRANSITION: 'That dispatch status change is not allowed.',
  RESOURCE_BUSY: 'This driver or vehicle is already in transit.',
  EXCESS_RETURN: 'The return exceeds the quantity sold.',
  INVALID_STATUS: 'Select a valid status.',
  NOT_FOUND: 'The requested record is unavailable.',
  STORAGE_UNAVAILABLE:
    'Demo storage is unavailable. Allow site storage or try the local HTTP demo.',
  NETWORK_ERROR: 'The API could not be reached. Wait for the server to start and retry.',
};
@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<'en_US' | 'es_419'>(
    new URLSearchParams(location.search).get('lang') === 'es_419'
      ? 'es_419'
      : new URLSearchParams(location.search).get('lang') === 'en_US'
        ? 'en_US'
        : localStorage.getItem('ai-todu-language') === 'es_419'
          ? 'es_419'
          : 'en_US',
  );
  private spanish: Record<string, string> = {};
  t(key: string): string {
    return (this.lang() === 'es_419' ? this.spanish[key] : undefined) ?? en[key] ?? key;
  }
  async load() {
    try {
      const response = await fetch(new URL('i18n/es_419.json', document.baseURI));
      if (response.ok) this.spanish = await response.json();
    } catch {}
    this.apply();
  }
  toggle() {
    this.lang.update((l) => (l === 'en_US' ? 'es_419' : 'en_US'));
    localStorage.setItem('ai-todu-language', this.lang());
    this.apply();
  }
  private apply() {
    document.documentElement.lang = this.lang() === 'en_US' ? 'en' : 'es-419';
  }
  formatMoney(value: number) {
    return new Intl.NumberFormat(this.lang() === 'en_US' ? 'en-US' : 'es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(value ?? 0);
  }
  formatDate(value: string | undefined) {
    return value
      ? new Intl.DateTimeFormat(this.lang() === 'en_US' ? 'en-US' : 'es-PE', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date(value))
      : '—';
  }
}
