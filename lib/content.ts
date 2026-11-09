/**
 * Every word on the site lives here.
 *
 * FACTS RULE (from Joel's handover, updated with his website comments of 21 Oct 2026):
 * - Never call Bizmo a "tablet". It is a work device / business device.
 * - No hardware numbers anywhere (processor model, RAM, storage, megapixels, resolution,
 *   battery, screen size). Use general terms: fast processor, responsive touch, sharp camera.
 * - Do not mention price, "one price", "no monthly fees" or anything about billing.
 * - Do not say "no browser". Say "pre-approved app list, more apps added on request".
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
  { href: "#specs", label: "The device" },
  { href: "#compare", label: "Compare" },
];

export const legalNav = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

/* ------------------------------------------------------------------ film A: the device */

export const hero = {
  title: ["Built for Business.", "Built Kosher."],
  lead: "Bizmo is the first and only work device that is built for business and built kosher. Its own operating system, a pre-approved list of business apps, zero distractions, and Rabbinically certified.",
  tagline: site.tagline,
  cta: "Get notified at launch",
  status: "The kosher business device. Entering production now.",
  facts: [
    ["System", "Its own, from its own source code"],
    ["Apps", "Hundreds approved, more on request"],
    ["Certified", "Rabbinically certified"],
  ],
};

export const turn = {
  title: "Recognisable across the room.",
  body: "Bizmo is visually distinct, so anyone can see it is a kosher device. It does not look like any other device, because it is not one.",
};

export const explode = {
  title: "Built from the ground up.",
  body: "Bizmo is not an ordinary device with a filter on top. It runs its own operating system, built from its own source code, with the filtering built into the apps themselves.",
  callouts: {
    processor: { label: "Fast processor", sub: "Plenty of memory and storage for a full day of work" },
    camera: { label: "Sharp camera", sub: "Scan and sign documents" },
    display: { label: "Bright, responsive display", sub: "" },
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
  // the in-device filtering diagram drawn on the screen during this beat
  diagram: {
    apps: ["Bank", "Invoices", "Email", "Calls"],
    filter: "Filter",
    filterSub: "Inside Bizmo",
    out: "Internet",
    note: "Nothing leaves the device unfiltered",
    frame: "Locked at the firmware",
  },
};

/* ------------------------------------------------------------------ apps */

export const apps = {
  title: "Hundreds of work apps",
  titleSecond: "already approved.",
  titleThird: "More added on request.",
  body: "Bizmo runs a pre-approved list of business apps: banking, payments, Microsoft and Google work apps, phone-over-internet, security cameras, printing, transit and community apps. Zero distractions.",
  request: {
    kicker: "Need an app?",
    title: "Pre-approved app list. More apps added on request.",
    body: "Any business-related app can be approved, and the list keeps growing. Tell your dealer what your business runs on, and it's added.",
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
  title: "Bright display.",
  titleSecond: "Responsive touch.",
};

/* General terms only: Bizmo is not sold on a spec sheet. */
export const specs = {
  title: "Built to work.",
  lead: "Everything you need to get the job done, and nothing you never asked for.",
  stats: [
    { value: "Fast", label: "processor, with plenty of memory and storage" },
    { value: "Responsive", label: "touch on a bright, sharp display" },
    { value: "Sharp", label: "camera for scanning and signing documents" },
    { value: "Locked", label: "at the firmware, so it cannot be bypassed" },
  ],
  extras: {
    title: "Wherever work takes you.",
    items: [
      { k: "Works internationally", v: "Take Bizmo on the road. It works abroad, with local carriers." },
      { k: "eSIM", v: "Add a plan without a physical SIM card, at home or when travelling." },
      { k: "Android Auto", v: "Navigation and phone-over-internet on your car's screen." },
    ],
  },
  rows: [
    { k: "Performance", v: "A fast processor with plenty of memory and storage for a full day of work." },
    { k: "Display", v: "Bright and sharp, with responsive touch." },
    { k: "Camera", v: "A sharp rear camera for scanning and signing documents." },
    { k: "Connectivity", v: "Cellular, Wi-Fi, Bluetooth and GPS. Works internationally. eSIM ready." },
    { k: "In the car", v: "Android Auto." },
    { k: "Security", v: "Secure boot, locked bootloader, verified boot, full encryption." },
    { k: "Platform", v: "Its own operating system and source code. Filtering built into the apps. Only pre-approved business apps run. Native speed, no proxy." },
  ],
};

/* ------------------------------------------------------------------ film C: trust */

export const trust = {
  title: "Certified by Vaad HaKehilos.",
  titleSecond: "Tested by dozens of satisfied users.",
  body: "Rabbinically certified, and customizable to your own satisfaction. Every Bizmo can be set to the standard your community, institution or business asks for.",
};

/* ------------------------------------------------------------------ comparison */

export const compare = {
  title: ["Built kosher,", "not filtered after the fact."],
  body: "The real alternative to Bizmo is an ordinary device with a filter subscription. Here is how they differ.",
  head: ["", "Ordinary device with a filter", "Bizmo"],
  rows: [
    ["Filtering", "Covers mostly the web browser", "Built into every app, inside the device"],
    ["Apps", "Everything stays open to distraction", "Pre-approved business apps, more on request"],
    ["Control", "The filter company decides what is blocked", "Full control over every app, set to your standard"],
    ["Speed", "Slowed by a proxy server", "Native speed, no proxy"],
    ["Appearance", "Looks like any device", "Visually distinct, recognisable as kosher"],
    ["Protection", "Can be bypassed", "Locked bootloader, verified boot, full encryption"],
    ["Certification", "None", "Certified by Vaad HaKehilos"],
  ],
};

/* ------------------------------------------------------------------ audience */

export const audience = {
  title: ["For people who already", "carry a device for work."],
  body: "Bizmo is a cleaner, certified replacement for the work device you carry today: built for productivity, with zero distractions. Sold through authorized dealers.",
  roles: ["Business owners", "Salespeople", "Contractors", "Field workers", "Travelers", "Office professionals"],
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
