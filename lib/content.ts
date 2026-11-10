/**
 * Every word on the site lives here.
 *
 * FACTS RULE (from Joel's handover, updated with his website comments of 21 Oct 2026):
 * - Never call Bizmo a "tablet". It is a work device / business device.
 * - Tech specs (Joel, 9 Nov 2026: the site must show the actual specs). Publish only the confirmed
 *   figures: 6 GB / 128 GB UFS + microSD, FHD 1920x1200 IPS, autofocus rear camera, 4G LTE, Wi-Fi ac,
 *   BT 5.0, GPS, USB-C, the security stack, eSIM, international, Android Auto.
 *   Partner feedback 10 Nov 2026: never name the processor (model, cores, nm) or camera megapixels.
 *   Joel confirmed on 9 Nov 2026: 10.95" display, 7000 mAh battery, dual SIM (physical or eSIM),
 *   5 MP front camera, LED flash, sensors (accelerometer, light, e-compass, gyroscope).
 *   Still out: talk time or calls (VoIP positioning), Android version, Google Play (approval pending).
 * - Do not mention price, "one price", "no monthly fees" or anything about billing.
 * - Do not say "no browser". Say "pre-approved app list, apps added upon request".
 * - Do not use the number 190, or any app count. Say "hundreds of work apps".
 * - Allowed since 21 Oct 2026: works internationally, eSIM, Android Auto.
 * - Never mention Google Play/GMS, Android version, launch dates, or Safe Telecom.
 * Anything new goes to Joel before it goes here.
 */

export const site = {
  name: "Bizmo",
  domain: "bizmousa.com",
  company: "Bizmo Inc.",
  oneLine: "Built for Business. Built Kosher.",
  tagline: "The technology you need for business. Nothing you never asked for.",
  category: "The kosher business device",
};

export const nav = [
  { href: "#system", label: "How it works" },
  { href: "#apps", label: "Apps" },
  { href: "#specs", label: "Tech specs" },
  { href: "#compare", label: "Compare" },
];

export const legalNav = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

/* ------------------------------------------------------------------ film A: the device */

export const hero = {
  title: ["Built for Business.", "Built Kosher."],
  lead: "Bizmo is the first and only work device that is built for business and built kosher. Bizmo has its own operating system, a pre-approved list of business apps, and is Rabbinically certified. Zero distraction.",
  tagline: site.tagline,
  cta: "Get notified at launch",
  status: "The kosher business device. Entering production now.",
  facts: [
    ["System", "Its own, from its own source code"],
    ["Apps", "Hundreds approved. Apps added upon request."],
    ["Certified", "Rabbinically certified"],
  ],
};

export const turn = {
  title: "Recognizable across the room.",
  body: "It does not look like any other device because it is not. Bizmo is visually distinct, so anyone can recognize it as a kosher device.",
};

export const explode = {
  title: "Built from the ground up.",
  body: "Bizmo is not an ordinary device with a filter on top. It runs its own operating system, built from its own source code, with the filtering built into the apps themselves.",
  callouts: {
    processor: { label: "Fast processor", sub: "6 GB memory, 128 GB UFS storage" },
    camera: { label: "Autofocus camera", sub: "For scanning and signing documents" },
    display: { label: "10.95″ FHD display", sub: "1920 × 1200 IPS" },
  },
};

export const layers = {
  title: "Kosher is built into the system, not added on top.",
  body: "The filtering happens inside the device, in the apps themselves, and nothing goes around it. Bizmo is locked at the firmware, so it cannot be bypassed the way a filter app can.",
  stack: [
    { id: "apps", label: "Pre-approved business apps", sub: "Nothing outside the approved list runs" },
    { id: "os", label: "Bizmo's own operating system", sub: "Built from its own source code" },
    { id: "verified", label: "Verified boot", sub: "Full encryption" },
    { id: "boot", label: "Secure boot", sub: "Locked bootloader" },
  ],

};

/* ------------------------------------------------------------------ apps */

export const apps = {
  title: "Hundreds of work apps",
  titleSecond: "already approved.",
  titleThird: "Apps added upon request.",
  body: "Bizmo runs a pre-approved list of business apps: banking, payments, Microsoft and Google work apps, phone-over-internet, security cameras, printing, transit and community apps. Zero distractions.",
  request: {
    kicker: "Need an app?",
    title: "Pre-approved app list. Apps added upon request.",
    body: "Any business-related app can be approved. Tell your dealer what your business runs on, and it's added.",
    cta: "Request an app",
  },
  control: {
    title: "Full control over every app.",
    body: "Bizmo controls every app on the device, so each one can be made fully kosher on the inside, not just blocked from the outside. That is something no filter can do.",
  },
  note: "The approved list grows and changes over time. App names and icons are trademarks of their owners.",
  categories: [
    {
      id: "finance",
      name: "Banking and finance",
      apps: ["Chase Mobile", "Amex", "Bank of America", "Wells Fargo", "Citi Mobile", "Capital One", "TD Bank", "U.S. Bank", "M&T Mobile Banking", "Santander", "KeyBank", "Navy Federal", "USAA", "Merrill Edge", "E*TRADE", "thinkorswim", "Marcus by Goldman Sachs", "T. Rowe Price", "BMO", "CIBC", "Scotiabank", "Bank Hapoalim", "Leumi", "Bank Yahav", "The OJC Fund"],
    },
    {
      id: "work",
      name: "Documents and work",
      apps: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft OneDrive", "Google Drive", "Google Sheets", "Docusign", "Adobe Fill & Sign", "Dropbox", "Evernote", "Asana", "Smartsheet", "Zendesk", "Mailchimp", "Genius Scan", "Buildium", "Zola Suite"],
    },
    {
      id: "pay",
      name: "Payments, accounting and HR",
      apps: ["QuickBooks Online", "Square Point of Sale", "Cardknox Payments", "Fingercheck", "TSheets", "Timesheet", "Eastern Union Mortgage Calculator"],
    },
    {
      id: "talk",
      name: "Phone-over-internet and messaging",
      apps: ["Zoom Workplace", "Microsoft Teams", "Slack", "Google Chat", "RingCentral", "3CX", "Phone.com", "Talkroute", "Zoiper", "Grandstream Wave", "Jivetel", "Mongotel"],
    },
    {
      id: "security",
      name: "Sign-in and security",
      apps: ["Microsoft Authenticator", "Google Authenticator", "Duo Mobile", "Okta Verify", "1Password", "LastPass", "RSA SecurID", "FortiToken", "Intune Company Portal"],
    },
    {
      id: "building",
      name: "Cameras, alarms and buildings",
      apps: ["Ring", "Arlo", "Blink", "ADT Control", "Hik-Connect", "Reolink", "UniFi", "eufy Security", "Schlage Home", "ecobee", "Total Connect 2.0", "DoorBird", "Night Owl"],
    },
    {
      id: "travel",
      name: "Travel, transit and parking",
      apps: ["Waze", "Moovit", "E-ZPass NY", "The Official MTA App", "NJ TRANSIT", "ParkNYC", "PayByPhone", "Zipcar", "Avis", "AAA", "Rav-Kav", "Priority Pass"],
    },
    {
      id: "more",
      name: "Printing, trades, utilities and community",
      apps: ["HP Print", "Epson iPrint", "Canon Print", "Brother Print", "Con Edison", "GEICO", "Allstate", "Doximity", "OneKey MLS", "Supra eKEY", "Southwire calculators", "Yeled", "IamResponding"],
    },
  ],
};

/** File name for an app's icon: "Chase Mobile" -> chase-mobile (public/apps/chase-mobile.png) */
export const appSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ------------------------------------------------------------------ daily work (home screen illustration) */

/*
  Home screen tiles. `icon` is the file name under /public/apps/ (PNG or WebP, square, ≥ 256 px).
  When the file exists the real app icon is shown; until then the tile shows `short`.
  Drop the icon files into public/apps/ and nothing else needs to change.
*/
export const daily = {
  title: ["The apps you work with.", "Nothing you never asked for."],
  body: "Banking, invoicing, signatures, phone-over-internet, navigation and security cameras. Bizmo runs the business apps you already use, with zero distractions.",
  caption: "Illustration. The final screen may differ. App icons are trademarks of their owners.",
  apps: [
    { name: "Chase", short: "C", icon: "chase" },
    { name: "QuickBooks", short: "Q", icon: "quickbooks" },
    { name: "Docusign", short: "D", icon: "docusign" },
    { name: "Zoom", short: "Z", icon: "zoom" },
    { name: "RingCentral", short: "R", icon: "ringcentral" },
    { name: "Google Sheets", short: "S", icon: "google-sheets" },
    { name: "Microsoft Word", short: "W", icon: "microsoft-word" },
    { name: "Square", short: "S", icon: "square" },
    { name: "Waze", short: "W", icon: "waze" },
    { name: "Ring", short: "R", icon: "ring" },
    { name: "E-ZPass", short: "E", icon: "e-zpass" },
    { name: "Phone", short: "", icon: "phone" },
  ],
};

/* ------------------------------------------------------------------ speed */

export const speed = {
  title: "Native speed. No proxy.",
  body: "A filter subscription sends your traffic through a filter server, and everything waits for it. Bizmo filters inside the device, so your apps connect without the detour.",
  lanes: {
    filter: { label: "Ordinary device with a filter", nodes: ["Ordinary devices", "Filter server", "Your bank, email, apps"] },
    bizmo: { label: "Bizmo", nodes: ["Bizmo", "Your bank, email, apps"] },
  },
};

/* ------------------------------------------------------------------ film B: close-ups + the device */

export const camera = {
  title: "A sharp camera.",
  body: "Scan and sign documents with approved apps such as Genius Scan and Adobe Fill & Sign.",
};

export const display = {
  title: "10.95-inch FHD display.",
  titleSecond: "1920 × 1200 IPS.",
};

/* Tech specs. Figures here are the confirmed, publishable ones (see the facts rule at the top). */
export const specs = {
  title: "Everything inside.",
  lead: "Built for a full day of real work, and locked at the firmware.",
  extras: {
    title: "Wherever work takes you.",
    items: [
      { k: "Works internationally", v: "Take Bizmo on the road. It works abroad, with local carriers.", icon: "globe" },
      { k: "Dual SIM with eSIM", v: "Two lines, dual standby. Add a plan without a physical SIM card, at home or when travelling.", icon: "sim" },
      { k: "Android Auto", v: "Navigation and phone-over-internet on your car's screen.", icon: "car" },
    ],
  },
  // the full sheet, in four groups
  groups: [
    {
      title: "Performance",
      icon: "chip",
      rows: [
        ["Processor", "Fast, efficient mobile processor"],
        ["Memory", "6 GB RAM"],
        ["Storage", "128 GB UFS + microSD"],
        ["Battery", "7000 mAh"],
      ],
    },
    {
      title: "Display & cameras",
      icon: "display",
      rows: [
        ["Display", "10.95″ FHD 1920 × 1200 IPS"],
        ["Rear camera", "Autofocus, LED flash"],
        ["Front camera", "For video meetings"],
        ["Sensors", "Accelerometer, light, e-compass, gyroscope"],
      ],
    },
    {
      title: "Connectivity",
      icon: "signal",
      rows: [
        ["Cellular", "4G LTE, works internationally"],
        ["SIM", "Dual SIM: physical or eSIM"],
        ["Wireless", "Wi-Fi ac, Bluetooth 5.0, GPS"],
        ["Port & car", "USB-C · Android Auto"],
      ],
    },
    {
      title: "Security & software",
      icon: "shield",
      rows: [
        ["Boot", "Secure boot, locked bootloader, verified boot"],
        ["Data", "Full encryption"],
        ["System", "Bizmo's own OS, own source code"],
        ["Apps", "Only pre-approved business apps"],
      ],
    },
  ] as { title: string; icon: string; rows: [string, string][] }[],
  note: "Specifications describe the production model and may be refined before launch.",
};

/* ------------------------------------------------------------------ film C: trust */

export const trust = {
  title: "Certified by Vaad HaKehilos.",
  titleSecond: "Tested by dozens of satisfied users.",
  body: "Rabbinically certified, and customizable to your own satisfaction. Every Bizmo can be set to the standard of your community, institution or business.",
};

/* ------------------------------------------------------------------ comparison */

export const compare = {
  title: ["Built kosher,", "not filtered."],
  body: "The alternative to Bizmo is an ordinary device with a filter subscription. Here is how they differ.",
  head: ["", "Ordinary device with a filter", "Bizmo"],
  headSub: ["", "A filter added on top", "The kosher business device"],
  // [topic, with a filter, Bizmo, icon]
  rows: [
    ["Filtering", "Covers mostly the web browser", "Built into every app, inside the device", "filter"],
    ["Apps", "Everything stays open to distraction", "Pre-approved business apps. Apps added upon request.", "apps"],
    ["Control", "The filter company decides what is blocked", "Full control over every app, set to your standard", "control"],
    ["Speed", "Slowed by a proxy server", "Native speed, no proxy", "speed"],
    ["Appearance", "Looks like any device", "Visually distinct, recognizable as kosher", "eye"],
    ["Protection", "Can be bypassed", "Locked bootloader, verified boot, full encryption", "lock"],
    ["Certification", "None", "Certified by Vaad HaKehilos", "certified"],
  ] as [string, string, string, string][],
};

/* ------------------------------------------------------------------ audience */

export const audience = {
  title: ["For people who already", "carry a device for work."],
  body: "Bizmo is a cleaner, certified replacement for the work device you carry today: built for productivity, with zero distractions. Sold through authorized dealers.",
  roles: [
    { name: "Business owners", sub: "Banking, payroll, the whole office in hand", icon: "owner" },
    { name: "Salespeople", sub: "CRM, quotes and signatures on the road", icon: "sales" },
    { name: "Contractors", sub: "Estimates, invoices, cameras and alarms", icon: "contractor" },
    { name: "Field workers", sub: "Navigation, time sheets, photos of the job", icon: "field" },
    { name: "Travelers", sub: "Works internationally, eSIM ready", icon: "traveler" },
    { name: "Office professionals", sub: "Microsoft and Google work apps, sign-in and security", icon: "office" },
  ],
};

/* ------------------------------------------------------------------ sign-up */

export const notify = {
  title: "Bizmo is entering production now.",
  body: "Leave your details and we'll tell you when it reaches your dealer.",
  fields: { name: "Name", email: "Email", city: "City" },
  button: "Notify me",
  sending: "Sending",
  done: (name: string) => `Thank you${name ? `, ${name.split(" ")[0]}` : ""}. We'll email you when Bizmo reaches your dealer.`,
  privacy: "We only use your details to tell you about Bizmo's launch.",
  errors: {
    name: "Enter your name.",
    email: "Enter an email address like name@example.com.",
    city: "Enter the city where you would buy Bizmo.",
    server: "We could not save your details just now. Please try again in a moment.",
  },
};

export const footer = {
  line: site.tagline,
  legal: `© ${new Date().getFullYear()} ${site.company}`,
  note: "App names, icons and trademarks belong to their owners.",
};

/* ------------------------------------------------------------------ legal pages (temporary, until counsel supplies final text) */

export const legal = {
  privacy: {
    title: "Privacy policy",
    updated: "Last updated: November 2026",
    intro: "This is a temporary privacy policy for the Bizmo launch website. It will be replaced before Bizmo ships.",
    sections: [
      {
        h: "What we collect",
        p: "If you ask to be notified about the launch, we store the name, email address and city you enter. The website does not use advertising cookies or third-party analytics.",
      },
      {
        h: "How we use it",
        p: "We use your details only to tell you about Bizmo's launch and availability through authorized dealers. We do not sell or rent your details to anyone.",
      },
      {
        h: "Who we share it with",
        p: "Your details are stored with the service providers that host this website and its sign-up list. They may process your details on our behalf and only for that purpose.",
      },
      {
        h: "How long we keep it",
        p: "We keep your details until Bizmo has launched in your area and you have been notified, or until you ask us to remove them, whichever comes first.",
      },
      {
        h: "Your choices",
        p: `To see, correct or delete your details, email privacy@${site.domain}. We will reply within 30 days.`,
      },
      {
        h: "Changes",
        p: "We will post any changes to this policy on this page and update the date above.",
      },
    ],
  },
  terms: {
    title: "Terms of service",
    updated: "Last updated: November 2026",
    intro: "These are temporary terms for the Bizmo launch website. They will be replaced before Bizmo ships.",
    sections: [
      {
        h: "This website",
        p: `${site.company} operates ${site.domain} to describe Bizmo and to let people ask to be notified about its launch. The website is informational. It does not sell Bizmo and does not take orders or payments.`,
      },
      {
        h: "Information on the website",
        p: "Bizmo is entering production. Features, apps, availability and appearance may change before launch. Nothing on this website is an offer, a warranty or a promise about the final product.",
      },
      {
        h: "Launch notifications",
        p: "When you sign up, you ask us to email you about the launch. You can stop at any time by replying to any email we send or by writing to us at the address in the privacy policy.",
      },
      {
        h: "Trademarks",
        p: "Bizmo and the Bizmo logo belong to Bizmo Inc. App names, icons and logos shown on this website belong to their owners and appear only to show which apps are approved on Bizmo.",
      },
      {
        h: "Liability",
        p: `${site.company} provides this website as is, and is not liable for any loss arising from its use, to the extent permitted by law.`,
      },
      {
        h: "Contact",
        p: `Questions about these terms: legal@${site.domain}.`,
      },
    ],
  },
};
