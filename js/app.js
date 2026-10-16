(function () {
  const STORAGE_KEY = "disconnected-solutions-demo-v1";
  const SESSION_KEY = "disconnected-solutions-session";

  const NAV = [
    ["patients", "Patients"],
    ["info", "Info Center"],
    ["alerts", "Alerts"],
    ["tasks", "Tasks"],
    ["search", "Search"],
    ["new-file", "New File"],
    ["folders", "Folders"],
    ["reports", "Reports"],
    ["files", "File Tracker"]
  ];

  const SITES = ["No Preference", "Main Campus", "North Campus", "South Campus", "Outpatient Center"];
  const EMPLOYEE_TYPES = ["", "Administrative/Executive Assistant", "Admitting Clerk", "Advanced Practice Nurse", "Billing Clerk", "Booking Clerk", "Contractor - Remote GE PACS", "Nursing Director", "Physician", "Physician Assistant", "Security Officer", "Virtual Contractor"];
  const SPECIALTIES = ["", "Cardiology", "Emergency Medicine", "General Medicine", "General Surgery", "Nursing", "Radiology", "Security"];
  const TIMEZONES = ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "UTC"];
  const DASHBOARD_GROUPS = ["None", "Risk Manager", "Feedback Manager", "Risk Front Line Staff", "Risk and Feedback Managers", "Claims Manager", "Risk, HCA and Feedback Front Line Staff"];
  const ICON_TEMPLATES = ["None", "Default Template for all forms", "Default Template for all Risk Forms", "Default Template for Risk and Feedback", "System Template for all Risk Forms"];
  const CARE_SETTINGS = ["Acute", "Ambulatory", "Behavioral Health", "Critical Care", "Emergency", "Perioperative"];
  const REPOSITORIES = ["None", "Risk", "Feedback", "Claims"];
  const REGULATORY = ["None", "State", "Federal", "Joint Commission"];
  const GROUPS = ["Front Line Users", "Risk Managers", "Feedback Managers", "Security Administrators", "File Managers"];
  const LOCATIONS = ["Main Campus", "North Campus", "South Campus", "Outpatient Center", "Emergency Department"];
  const SCHEDULES = [
    "Daily Alerts", "EE Event Responder Daily Alert Schedule", "EE Event Responder Hourly Alert Schedule",
    "Feedback Responder Daily Alert Schedule", "Feedback Responder Hourly Alert Schedule", "Monthly Reports",
    "New File Alert Schedule", "Patient Relations Daily Alert Schedule", "Patient Relations Hourly Alert Schedule",
    "Quarterly Reports", "Read Only Hourly Alert Schedule", "Risk Responder Daily Alert Schedule",
    "Risk Responder Hourly Alert Schedule", "Security Administrator Daily Alert Schedule",
    "Security Administrator Hourly Alert Schedule", "Weekly Reports"
  ];
  const ROLE_OPTIONS = {
    Risk: { licenses: ["Basic Administration", "Risk Management"], roles: ["Risk - File Manager", "Risk - Front Line User", "Risk Manager"] },
    Feedback: { licenses: ["Feedback Administration", "Basic Administration"], roles: ["Feedback - Manager Responder: Read, Edit", "Feedback - Front Line User", "Feedback Manager"] },
    Common: { licenses: ["File Management"], roles: ["Common - File Manager"] }
  };
  const ROLE_DESCRIPTIONS = {
    "Risk - File Manager": "Without file delete and file close functions. They can, however, Delete their own Delete-Incomplete files.",
    "Common - File Manager": "",
    "Feedback - Manager Responder: Read, Edit": "No file delete and close functions",
    "Risk - Front Line User": "",
    "Risk Manager": "",
    "Feedback - Front Line User": "",
    "Feedback Manager": ""
  };
  const FORBIDDEN_FIELDS = ["", "None"];
  const SCOPES = ["NONE", "Front Line Users", "Department", "Facility", "Enterprise"];
  const SCHEDULE_META = {
    "Daily Alerts": {
      description: "Alert set to daily recurrence.",
      status: "Inactive",
      lastTrigger: "06-04-2026 11:43:34",
      firstTrigger: "06-02-2026 14:21:56",
      timesTriggered: 7,
      contentDistributed: 0
    }
  };

  const ICONS = [
    { group: "Patient Events", name: "ADT", desc: "Admission, discharge, transfer, or transportation.", color: "#3b82f6" },
    { group: "Patient Events", name: "Airway/Anesthesia", desc: "Airway or anesthesia complications.", color: "#8b5cf6" },
    { group: "Patient Events", name: "AMA/LWOT", desc: "Patient left against medical advice or without treatment.", color: "#0ea5e9" },
    { group: "Patient Events", name: "Behavior/Restraints", desc: "Behavioral event of a patient and/or visitor.", color: "#f59e0b" },
    { group: "Patient Events", name: "Blood or Blood Product", desc: "Blood or blood product administration issue.", color: "#ef4444" },
    { group: "Patient Events", name: "Consent, ID, or Documentation", desc: "Consent, identification, or documentation issue.", color: "#64748b" },
    { group: "Patient Events", name: "Device, Equipment or Supply", desc: "Medical device, equipment, or supply issue.", color: "#6366f1" },
    { group: "Patient Events", name: "Diagnosis/Treatment", desc: "Diagnosis issue and/or treatment not as intended.", color: "#2563eb" },
    { group: "Patient Events", name: "Fall", desc: "Patient fall, including assisted and near falls.", color: "#16a34a" },
    { group: "Patient Events", name: "HAI", desc: "Healthcare-associated infection.", color: "#0891b2" },
    { group: "Patient Events", name: "HIPAA", desc: "Privacy, security, or confidentiality event.", color: "#7c3aed" },
    { group: "Patient Events", name: "Laboratory/Specimen", desc: "Specimen collection, labeling, or result issue.", color: "#ca8a04" },
    { group: "Patient Events", name: "Medication/Fluid", desc: "Medication, fluid, or other substance event.", color: "#db2777" },
    { group: "Patient Events", name: "Nutrition and Diet", desc: "Diet order, meal, or nutrition issue.", color: "#65a30d" },
    { group: "Patient Events", name: "Perinatal", desc: "Perinatal event involving maternal or newborn care.", color: "#0284c7" },
    { group: "Patient Events", name: "Radiology", desc: "Imaging or radiation-related event.", color: "#4f46e5" },
    { group: "Patient Events", name: "Radiation Treatment", desc: "Radiation therapy planning or delivery issue.", color: "#9333ea" },
    { group: "Patient Events", name: "Skin Integrity/Tissue", desc: "Pressure injury or other skin/tissue event.", color: "#e11d48" },
    { group: "Patient Events", name: "Surgery/Invasive Procedure", desc: "Surgical or invasive procedure event.", color: "#b91c1c" },
    { group: "Patient Events", name: "Tube/Drain", desc: "Tube, line, or drain issue.", color: "#0f766e" },
    { group: "Patient Events", name: "Vascular Access", desc: "IV, central line, or vascular access issue.", color: "#be123c" },
    { group: "Non-Patient Events", name: "Employee Event", desc: "Employee injury, illness, or exposure.", color: "#d97706" },
    { group: "Non-Patient Events", name: "Professional Conduct", desc: "Conduct, behavior, or professionalism concern.", color: "#7c3aed" },
    { group: "Non-Patient Events", name: "Facilities", desc: "Physical environment, utilities, or building issue.", color: "#0d9488" },
    { group: "Non-Patient Events", name: "Security/Property", desc: "Security or property event.", color: "#1d4ed8" },
    { group: "Non-Patient Events", name: "Visitor Events", desc: "Visitor injury or other visitor event.", color: "#ea580c" },
    { group: "Non-Patient Events", name: "Workplace Violence", desc: "Violence, threat, or verbal abuse.", color: "#dc2626" },
    { group: "Feedback", name: "Multiple Issue Feedback", desc: "One or more complaints, compliments, or comments.", color: "#db2777" }
  ];

  const FIRST = ["Avery", "Blake", "Casey", "Drew", "Emery", "Finley", "Gray", "Harper", "Indigo", "Jules", "Kai", "Logan", "Morgan", "Noah", "Oakley", "Parker", "Quinn", "Reese", "Shawn", "Taylor", "Uma", "Val", "Winter", "Alex", "Blair", "Cameron", "Dakota", "Elliot", "Frankie", "Hayden", "Jordan", "Kendall", "Lane", "Marlow", "Nico", "Peyton", "Riley", "Sam", "Tatum", "Wren"];
  const LAST = ["Adler", "Brooks", "Chen", "Diaz", "Ellis", "Foster", "Garcia", "Hughes", "Ibrahim", "Johnson", "Khan", "Lopez", "Murphy", "Nguyen", "Owens", "Patel", "Reed", "Singh", "Turner", "Underwood", "Vargas", "Walsh", "Young", "Zimmer", "Bennett", "Cole", "Dawson", "Edwards", "Fox", "Grant", "Hayes", "Ingram", "Keller", "Lambert", "Meyer", "Nash", "Ortiz", "Price", "Rowe", "Shaw"];

  const appEl = document.getElementById("app");
  let db = loadDb();
  let session = loadSession();
  let route = location.hash.replace(/^#\/?/, "") || "home";
  let ui = {
    menu: false,
    siteDismissed: false,
    query: "",
    searchField: "all",
    page: 1,
    pageSize: 50,
    selected: {},
    advanced: null,
    modal: null,
    draft: null,
    tab: "info",
    roleDraft: null,
    roleEditIndex: null,
    rolePick: {},
    schedulePick: {},
    schedulePickName: "Daily Alerts",
    notice: "",
    fileQuery: "",
    folder: "Risk",
    showDesc: true,
    iconQuery: "",
    category: "Any",
    anon: false
  };

  function loadDb() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && Array.isArray(saved.users)) return saved;
    } catch (e) { /* seed below */ }
    return seed();
  }
  function saveDb() { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }
  function loadSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch (e) { return null; }
  }
  function saveSession() {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(SESSION_KEY);
  }

  function blankUser(partial) {
    return Object.assign({
      id: "", userType: "Federated", containUserId: false, catalixUserId: "",
      firstName: "", middleName: "", lastName: "", employeeType: "", specialty: "",
      employeeId: "", title: "", phone: "", mobile: "", pager: "", fax: "",
      email: "", alternateEmail: "", notes: "",
      profileUpdateMethod: "Internal-Application", status: "Active",
      timeZone: "America/New_York", dashboardGroup: "None", iconWallTemplate: "None",
      careSettings: [], careSetting: "", repositorySettings: ["None"], regulatorySetting: "None",
      roles: [], groups: [], actAs: [], locations: [], schedules: [],
      lastLogin: "Never logged in", department: ""
    }, partial || {});
  }

  function seed() {
    const titles = ["Physician", "Nurse", "Security Officer", "Virtual Contractor", "Nursing Director", "Physician Assistant"];
    const users = FIRST.map((first, i) => {
      const last = LAST[i];
      const title = titles[i % titles.length];
      const status = i % 17 === 0 ? "Inactive" : i % 23 === 0 ? "Locked Out" : "Active";
      return blankUser({
        id: (first + "." + last).toUpperCase() + "@demo.local",
        firstName: first,
        lastName: last,
        title: title,
        employeeType: title === "Nurse" ? "Advanced Practice Nurse" : title,
        specialty: title === "Physician" ? SPECIALTIES[(i % (SPECIALTIES.length - 1)) + 1] : "",
        employeeId: String(100100 + i * 17),
        email: (first + "." + last).toLowerCase() + "@demo.local",
        status: status,
        dashboardGroup: i % 5 === 0 ? "Risk and Feedback Managers" : "None",
        iconWallTemplate: i % 4 === 0 ? "System Template for all Risk Forms" : "None",
        careSettings: ["Acute"],
        careSetting: "Acute",
        groups: ["Front Line Users"],
        locations: [LOCATIONS[i % LOCATIONS.length]],
        roles: [{ module: "Risk", license: "Basic Administration", role: "Risk - Front Line User", scope: "NONE", forbidden: "", description: "" }]
      });
    });
    return {
      users: users,
      files: [
        { id: "F-10421", type: "Fall", summary: "Assisted fall in hallway", status: "Submitted", by: "Avery Adler", site: "Main Campus", when: "2026-10-01" },
        { id: "F-10488", type: "Medication/Fluid", summary: "Dose given later than ordered", status: "In Review", by: "Blake Brooks", site: "North Campus", when: "2026-10-08" }
      ],
      patients: [
        { mrn: "MRN-10001", name: "Rowan Hale", unit: "4 West", site: "Main Campus" },
        { mrn: "MRN-10018", name: "Eden Cho", unit: "ED", site: "North Campus" },
        { mrn: "MRN-10044", name: "Micah Santos", unit: "ICU", site: "South Campus" },
        { mrn: "MRN-10073", name: "Sutton Blake", unit: "OR", site: "Main Campus" }
      ],
      alerts: [
        { name: "Daily Alerts", detail: "Alert set to daily occurrence.", status: "Active" },
        { name: "New File Alert Schedule", detail: "Notifies file managers of new submissions.", status: "Active" }
      ],
      tasks: [
        { name: "Review new fall file F-10421", owner: "Risk Manager", due: "2026-10-18", status: "Open" },
        { name: "Confirm user access for new hire", owner: "Security Administrator", due: "2026-10-17", status: "Open" }
      ],
      prefs: { site: "", hideLocationPrompt: false },
      nextFile: 10502
    };
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function scheduleMeta(name) {
    if (SCHEDULE_META[name]) return SCHEDULE_META[name];
    return {
      description: "",
      status: "Inactive",
      lastTrigger: "",
      firstTrigger: "",
      timesTriggered: 0,
      contentDistributed: 0
    };
  }

  function scheduleEntryName(entry) {
    return typeof entry === "string" ? entry : entry.name;
  }

  function scheduleEntryStatus(entry) {
    if (typeof entry === "string") return scheduleMeta(entry).status;
    return entry.status || scheduleMeta(entry.name).status;
  }

  function normalizeSchedules(list) {
    return (list || []).map(function (entry) {
      if (typeof entry === "string") {
        const meta = scheduleMeta(entry);
        return { name: entry, status: meta.status };
      }
      return entry;
    });
  }

  function selectedRoleIndices() {
    return Object.keys(ui.rolePick).filter(function (k) { return ui.rolePick[k]; }).map(Number);
  }

  function routeTo(path) {
    location.hash = "#/" + path;
  }

  window.addEventListener("hashchange", function () {
    const next = location.hash.replace(/^#\/?/, "") || "home";
    if (next === route) return;
    route = next;
    ui.menu = false;
    ui.page = 1;
    if (ui.modal !== "site") ui.modal = null;
    ui.notice = "";
    render();
  });

  document.addEventListener("click", onClick);
  document.addEventListener("change", onChange);
  document.addEventListener("input", onInput);
  document.addEventListener("submit", onSubmit);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (ui.roleDraft) { ui.roleDraft = null; render(); return; }
      if (ui.modal === "schedule") { ui.modal = "user"; render(); return; }
      if (ui.modal) { ui.modal = null; ui.advanced = null; render(); }
    }
  });

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.id === "login-form") {
      const user = form.username.value.trim();
      const pass = form.password.value;
      if (user.toLowerCase() === "admin" && pass === "admin123") {
        session = { name: "Admin User", initials: "AU" };
        saveSession();
        routeTo("home");
        render();
      } else {
        ui.notice = "Sign in failed. Use the demo admin account.";
        render();
      }
    }
  }

  function onInput(event) {
    if (event.target.id === "user-search") {
      ui.query = event.target.value;
      ui.page = 1;
      paintRows();
    } else if (event.target.id === "icon-search") {
      ui.iconQuery = event.target.value;
      paintIcons();
    } else if (event.target.id === "global-search") {
      ui.fileQuery = event.target.value;
    }
  }

  function onChange(event) {
    const t = event.target;
    if (t.id === "search-field") { ui.searchField = t.value; ui.page = 1; paintRows(); }
    if (t.id === "role-module" && ui.roleDraft) {
      const form = document.getElementById("role-form");
      ui.roleDraft.module = form.module.value;
      ui.roleDraft.scope = form.scope.value;
      ui.roleDraft.forbidden = form.forbidden.value;
      const pack = ROLE_OPTIONS[ui.roleDraft.module];
      ui.roleDraft.license = pack.licenses[0];
      ui.roleDraft.role = pack.roles[0];
      render();
    }
    if (t.id === "page-size") { ui.pageSize = Number(t.value); ui.page = 1; paintRows(); }
    if (t.id === "show-desc") { ui.showDesc = t.checked; paintIcons(); }
    if (t.id === "category") { ui.category = t.value; paintIcons(); }
    if (t.id === "anon") ui.anon = t.checked;
    if (t.classList.contains("row-check")) {
      ui.selected[t.value] = t.checked;
      if (!t.checked) delete ui.selected[t.value];
      render();
    }
    if (t.classList.contains("role-check")) {
      ui.rolePick[t.value] = t.checked;
      if (!t.checked) delete ui.rolePick[t.value];
      render();
    }
    if (t.id === "schedule-pick") {
      ui.schedulePickName = t.value;
      render();
    }
    if (t.classList.contains("schedule-check")) {
      ui.schedulePick[t.value] = t.checked;
      if (!t.checked) delete ui.schedulePick[t.value];
      render();
    }
  }

  function onClick(event) {
    const el = event.target.closest("[data-act]");
    if (!el) {
      if (ui.menu && !event.target.closest(".avatar-btn") && !event.target.closest(".menu")) {
        ui.menu = false;
        render();
      }
      return;
    }
    event.preventDefault();
    const act = el.dataset.act;
    const id = el.dataset.id || "";
    if (act === "nav") { ui.menu = false; routeTo(el.dataset.to); }
    else if (act === "menu") { ui.menu = !ui.menu; render(); }
    else if (act === "logout") { session = null; saveSession(); ui.menu = false; render(); }
    else if (act === "end-actas") { session.actAs = ""; saveSession(); render(); }
    else if (act === "page") { ui.page = Number(el.dataset.page); paintRows(); }
    else if (act === "open-user") openUser(id, false);
    else if (act === "new-user") openUser("", true);
    else if (act === "edit-user") openSelected();
    else if (act === "copy-user") copySelected();
    else if (act === "close") {
      if (ui.modal === "site") ui.siteDismissed = true;
      ui.modal = null; ui.roleDraft = null; ui.advanced = null; ui.notice = ""; render();
    }
    else if (act === "tab") { readUserForm(); ui.tab = el.dataset.tab; render(); }
    else if (act === "save-user") saveUser();
    else if (act === "advanced") { ui.advanced = ui.advanced || {}; ui.modal = "advanced"; render(); }
    else if (act === "apply-advanced") applyAdvanced();
    else if (act === "clear-advanced") { ui.advanced = {}; render(); }
    else if (act === "reset-list") { ui.query = ""; ui.searchField = "all"; ui.advanced = null; ui.selected = {}; ui.page = 1; render(); }
    else if (act === "change-status") { if (selectedIds().length) { ui.modal = "status"; render(); } }
    else if (act === "apply-status") applyStatus();
    else if (act === "locations") { if (selectedIds().length) { ui.modal = "locations"; render(); } }
    else if (act === "act-as") { if (selectedIds().length === 1) { ui.modal = "actas"; render(); } }
    else if (act === "apply-locations") applyLocations();
    else if (act === "apply-actas") applyActAs();
    else if (act === "add-role") {
      readUserForm();
      ui.roleEditIndex = null;
      ui.roleDraft = { module: "Risk", license: "Basic Administration", role: "Risk - File Manager", scope: "NONE", forbidden: "" };
      ui.modal = "role";
      render();
    }
    else if (act === "open-role") {
      const picks = selectedRoleIndices();
      if (picks.length !== 1) return;
      readUserForm();
      ui.roleEditIndex = picks[0];
      ui.roleDraft = JSON.parse(JSON.stringify(ui.draft.roles[picks[0]]));
      ui.modal = "role";
      render();
    }
    else if (act === "ok-role") commitRole();
    else if (act === "cancel-role") { ui.roleDraft = null; ui.roleEditIndex = null; ui.modal = "user"; render(); }
    else if (act === "del-roles") {
      readUserForm();
      selectedRoleIndices().sort(function (a, b) { return b - a; }).forEach(function (index) {
        ui.draft.roles.splice(index, 1);
      });
      ui.rolePick = {};
      render();
    }
    else if (act === "add-group") addGroup();
    else if (act === "del-group") { readUserForm(); ui.draft.groups = ui.draft.groups.filter(function (g) { return g !== id; }); render(); }
    else if (act === "add-schedule") { readUserForm(); ui.schedulePickName = "Daily Alerts"; ui.modal = "schedule"; render(); }
    else if (act === "del-schedules") {
      readUserForm();
      Object.keys(ui.schedulePick).filter(function (k) { return ui.schedulePick[k]; }).map(Number).sort(function (a, b) { return b - a; }).forEach(function (index) {
        ui.draft.schedules.splice(index, 1);
      });
      ui.schedulePick = {};
      render();
    }
    else if (act === "ok-schedule") commitSchedule();
    else if (act === "cancel-schedule") { ui.modal = "user"; render(); }
    else if (act === "skip-site") { db.prefs.hideLocationPrompt = true; saveDb(); ui.modal = null; render(); }
    else if (act === "save-site") saveSite();
    else if (act === "icon") openFile(id);
    else if (act === "submit-file") submitFile();
    else if (act === "run-search") render();
    else if (act === "folder") { ui.folder = id; render(); }
    else if (act === "header-search") {
      const box = document.getElementById("user-search") || document.getElementById("icon-search") || document.getElementById("global-search");
      if (box) box.focus();
    }
  }

  function selectedIds() { return Object.keys(ui.selected).filter(function (k) { return ui.selected[k]; }); }

  function openUser(id, isNew) {
    ui.tab = "info";
    ui.roleDraft = null;
    ui.roleEditIndex = null;
    ui.rolePick = {};
    ui.schedulePick = {};
    if (isNew) ui.draft = blankUser();
    else ui.draft = JSON.parse(JSON.stringify(db.users.find(function (u) { return u.id === id; })));
    ui.draft.schedules = normalizeSchedules(ui.draft.schedules);
    ui.draft._originalId = isNew ? "" : ui.draft.id;
    ui.modal = "user";
    render();
  }
  function openSelected() {
    const ids = selectedIds();
    if (ids.length === 1) openUser(ids[0], false);
  }
  function copySelected() {
    const ids = selectedIds();
    if (ids.length !== 1) return;
    const copy = JSON.parse(JSON.stringify(db.users.find(function (u) { return u.id === ids[0]; })));
    copy.id = "";
    copy.email = "";
    copy.lastLogin = "Never logged in";
    ui.draft = copy;
    ui.draft._originalId = "";
    ui.tab = "info";
    ui.modal = "user";
    render();
  }

  function readUserForm() {
    const form = document.getElementById("user-form");
    if (!form || !ui.draft) return;
    ["id", "userType", "catalixUserId", "firstName", "middleName", "lastName", "employeeType", "specialty", "employeeId", "title", "phone", "mobile", "pager", "fax", "email", "alternateEmail", "notes", "profileUpdateMethod", "status", "timeZone", "dashboardGroup", "iconWallTemplate", "careSetting", "regulatorySetting"].forEach(function (name) {
      const field = form.elements[name];
      if (field) ui.draft[name] = field.value;
    });
    const contain = form.elements.containUserId;
    if (contain) ui.draft.containUserId = contain.checked;
    const care = form.elements.careSettings;
    if (care) ui.draft.careSettings = Array.from(form.querySelectorAll("[name=careSettings]:checked")).map(function (n) { return n.value; });
    const repos = form.querySelectorAll("[name=repositorySettings]");
    if (repos.length) ui.draft.repositorySettings = Array.from(repos).filter(function (n) { return n.checked; }).map(function (n) { return n.value; });
    const acts = form.querySelectorAll("[name=actAsUser]");
    if (acts.length) ui.draft.actAs = Array.from(acts).filter(function (n) { return n.checked; }).map(function (n) { return n.value; });
    const locs = form.querySelectorAll("[name=userLocation]");
    if (locs.length) ui.draft.locations = Array.from(locs).filter(function (n) { return n.checked; }).map(function (n) { return n.value; });
  }

  function saveUser() {
    readUserForm();
    const u = ui.draft;
    if (!u.id.trim() || !u.firstName.trim() || !u.lastName.trim() || !u.email.trim()) {
      ui.notice = "User ID, first name, last name, and email are required.";
      render();
      return;
    }
    const duplicate = db.users.some(function (existing) {
      return existing.id.toLowerCase() === u.id.trim().toLowerCase() && existing.id !== u._originalId;
    });
    if (duplicate) { ui.notice = "A user with that User ID already exists."; render(); return; }
    const clean = Object.assign({}, u);
    delete clean._originalId;
    clean.id = clean.id.trim();
    if (u._originalId) {
      const index = db.users.findIndex(function (existing) { return existing.id === u._originalId; });
      db.users[index] = clean;
    } else db.users.unshift(clean);
    saveDb();
    ui.notice = "";
    ui.modal = null;
    ui.query = clean.id;
    ui.searchField = "id";
    ui.selected = {};
    ui.selected[clean.id] = true;
    render();
  }

  function applyAdvanced() {
    const form = document.getElementById("advanced-form").elements;
    ui.advanced = {
      id: form.id.value.trim(),
      name: form.name.value.trim(),
      employeeId: form.employeeId.value.trim(),
      specialty: form.specialty.value.trim(),
      title: form.title.value.trim(),
      status: form.status.value,
      dashboardGroup: form.dashboardGroup.value,
      iconWallTemplate: form.iconWallTemplate.value
    };
    ui.modal = null;
    ui.page = 1;
    render();
  }

  function applyStatus() {
    const status = document.getElementById("status-choice").value;
    selectedIds().forEach(function (id) {
      const user = db.users.find(function (u) { return u.id === id; });
      if (user) user.status = status;
    });
    saveDb();
    ui.modal = null;
    render();
  }

  function applyLocations() {
    const chosen = Array.from(document.querySelectorAll("[name=assignLocation]:checked")).map(function (n) { return n.value; });
    selectedIds().forEach(function (id) {
      const user = db.users.find(function (u) { return u.id === id; });
      if (user) user.locations = chosen.slice();
    });
    saveDb();
    ui.modal = null;
    render();
  }

  function applyActAs() {
    const id = document.getElementById("actas-choice").value;
    const user = db.users.find(function (u) { return u.id === id; });
    session.actAs = user.firstName + " " + user.lastName;
    saveSession();
    ui.modal = null;
    render();
  }

  function commitRole() {
    const form = document.getElementById("role-form");
    const roleName = form.role.value;
    const entry = {
      module: form.module.value,
      license: form.license.value,
      role: roleName,
      scope: form.scope.value,
      forbidden: form.forbidden.value,
      description: ROLE_DESCRIPTIONS[roleName] || ""
    };
    const duplicate = ui.draft.roles.some(function (existing, index) {
      if (ui.roleEditIndex !== null && ui.roleEditIndex !== undefined && index === ui.roleEditIndex) return false;
      return existing.role === entry.role && existing.scope === entry.scope;
    });
    if (duplicate) {
      ui.notice = "That role and scope combination is already assigned.";
      ui.modal = "role";
      render();
      return;
    }
    if (ui.roleEditIndex === null || ui.roleEditIndex === undefined) ui.draft.roles.push(entry);
    else ui.draft.roles[ui.roleEditIndex] = entry;
    ui.roleDraft = null;
    ui.roleEditIndex = null;
    ui.rolePick = {};
    ui.notice = "";
    ui.modal = "user";
    ui.tab = "roles";
    render();
  }

  function addGroup() {
    readUserForm();
    const name = document.getElementById("group-pick").value;
    if (name && ui.draft.groups.indexOf(name) < 0) ui.draft.groups.push(name);
    render();
  }

  function commitSchedule() {
    const name = document.getElementById("schedule-pick").value;
    const meta = scheduleMeta(name);
    if (!ui.draft.schedules.some(function (entry) { return scheduleEntryName(entry) === name; })) {
      ui.draft.schedules.push({ name: name, status: meta.status });
    }
    ui.modal = "user";
    ui.tab = "schedules";
    render();
  }

  function saveSite() {
    db.prefs.site = document.getElementById("preferred-site").value;
    db.prefs.hideLocationPrompt = document.getElementById("hide-site-prompt").checked;
    saveDb();
    ui.modal = null;
    render();
  }

  function openFile(type) {
    ui.modal = "file";
    ui.draft = { type: type, summary: "", description: "", site: db.prefs.site && db.prefs.site !== "No Preference" ? db.prefs.site : "Main Campus", anonymous: ui.anon };
    render();
  }

  function submitFile() {
    const form = document.getElementById("file-form");
    if (!form.summary.value.trim()) { ui.notice = "Summary is required."; render(); return; }
    db.files.unshift({
      id: "F-" + db.nextFile++,
      type: form.type.value,
      summary: form.summary.value.trim(),
      status: "Submitted",
      by: form.anonymous.checked ? "Anonymous" : session.name,
      site: form.site.value,
      when: new Date().toISOString().slice(0, 10)
    });
    saveDb();
    ui.notice = "";
    ui.modal = null;
    routeTo("files");
    render();
  }

  function filteredUsers() {
    const q = ui.query.trim().toLowerCase();
    const adv = ui.advanced || {};
    return db.users.filter(function (u) {
      if (q) {
        const hay = {
          all: [u.id, u.firstName, u.lastName, u.title, u.department, u.email].join(" "),
          id: u.id,
          first: u.firstName,
          last: u.lastName,
          title: u.title
        }[ui.searchField] || "";
        if (hay.toLowerCase().indexOf(q) < 0) return false;
      }
      if (adv.id && u.id.toLowerCase().indexOf(adv.id.toLowerCase()) < 0) return false;
      if (adv.name && (u.firstName + " " + u.lastName).toLowerCase().indexOf(adv.name.toLowerCase()) < 0) return false;
      if (adv.employeeId && String(u.employeeId).indexOf(adv.employeeId) < 0) return false;
      if (adv.specialty && u.specialty.toLowerCase().indexOf(adv.specialty.toLowerCase()) < 0) return false;
      if (adv.title && u.title.toLowerCase().indexOf(adv.title.toLowerCase()) < 0) return false;
      if (adv.status && u.status !== adv.status) return false;
      if (adv.dashboardGroup && u.dashboardGroup !== adv.dashboardGroup) return false;
      if (adv.iconWallTemplate && u.iconWallTemplate !== adv.iconWallTemplate) return false;
      return true;
    });
  }

  function options(list, selected) {
    return list.map(function (item) {
      const value = typeof item === "string" ? item : item;
      const label = value === "" ? " " : value;
      return '<option value="' + esc(value) + '"' + (value === selected ? " selected" : "") + ">" + esc(label) + "</option>";
    }).join("");
  }

  function shell(body) {
    const acting = session && session.actAs ? '<div class="banner"><span>Acting as ' + esc(session.actAs) + '</span><button class="btn" data-act="end-actas">Exit</button></div>' : "";
    return '' +
      '<header class="app-header">' +
        '<a class="brand" href="#/home" data-act="nav" data-to="home">' + logo() + '<span class="brand-name">Disconnected Solutions</span></a>' +
        '<button class="home-pill' + (route === "home" ? " active" : "") + '" data-act="nav" data-to="home">Home</button>' +
        '<nav class="nav-links">' + NAV.map(function (item) {
          return '<a href="#/' + item[0] + '" data-act="nav" data-to="' + item[0] + '"' + (route === item[0] ? ' class="active"' : "") + ">" + item[1] + "</a>";
        }).join("") + "</nav>" +
        '<div class="header-tools">' +
          '<button class="icon-btn" title="Search" data-act="header-search" aria-label="Search">' + icon("search") + "</button>" +
          '<button class="icon-btn" title="Alerts" data-act="nav" data-to="alerts" aria-label="Alerts">' + icon("bell") + "</button>" +
          '<button class="icon-btn" title="Info Center" data-act="nav" data-to="info" aria-label="Help">' + icon("help") + "</button>" +
          '<button class="avatar-btn" data-act="menu" aria-label="Account">' + esc(session.initials) + "</button>" +
        "</div>" +
        (ui.menu ? '<div class="menu"><div class="menu-label">' + esc(session.name) + (db.prefs.site ? " · " + esc(db.prefs.site) : "") + '</div><button data-act="nav" data-to="users">Admin Center · Users</button><button data-act="logout">Sign out</button></div>' : "") +
      "</header>" + acting + body + modalHtml();
  }

  function logo() {
    return '<svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4l10 4v8c0 6.2-4.2 10.2-10 12-5.8-1.8-10-5.8-10-12V8z" fill="none" stroke="white" stroke-width="1.8"/><path d="M16 11v9M11.5 15.5h9" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>';
  }
  function icon(name) {
    if (name === "search") return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
    if (name === "bell") return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>';
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.8.3-1.2.8-1.2 1.6V14"/><path d="M12 17h.01"/></svg>';
  }

  function loginHtml() {
    return '<div class="login-wrap"><form class="login-card" id="login-form">' +
      logo().replace("white", "#114743") +
      "<h1>Disconnected Solutions</h1><p class=\"sub\">Sign in to the Disconnected Solutions portal.</p>" +
      (ui.notice ? '<div class="error">' + esc(ui.notice) + "</div>" : "") +
      '<div class="stack"><label class="field">User ID<input name="username" autocomplete="username" required /></label>' +
      '<label class="field">Password<input name="password" type="password" autocomplete="current-password" required /></label>' +
      '<button class="btn primary" type="submit">Sign in</button></div>' +
      '<p class="demo-note">Demo sign-in: <strong>admin</strong> / <strong>admin123</strong></p></form></div>';
  }

  function render() {
    if (!session) { appEl.innerHTML = loginHtml(); return; }
    if (route === "home" && !db.prefs.site && !db.prefs.hideLocationPrompt && !ui.siteDismissed && !ui.modal) ui.modal = "site";
    const pages = { home: homeHtml, users: usersHtml, patients: patientsHtml, info: infoHtml, alerts: alertsHtml, tasks: tasksHtml, search: searchHtml, "new-file": newFileHtml, folders: foldersHtml, reports: reportsHtml, files: filesHtml };
    const view = (pages[route] || homeHtml)();
    appEl.innerHTML = shell('<main class="page">' + view + "</main>");
    const search = document.getElementById("user-search");
    if (search) search.value = ui.query;
  }

  function homeHtml() {
    return '<div class="wall-tools"><input id="icon-search" placeholder="Find a form" value="' + esc(ui.iconQuery) + '" />' +
      '<label class="toggle"><input id="anon" type="checkbox"' + (ui.anon ? " checked" : "") + " /> Submit Anonymously</label>" +
      '<label class="toggle"><input id="show-desc" type="checkbox"' + (ui.showDesc ? " checked" : "") + " /> Show Description</label>" +
      '<label class="toggle">Category <select id="category">' + ["Any", "Patient Events", "Non-Patient Events", "Feedback"].map(function (c) {
        return '<option' + (c === ui.category ? " selected" : "") + ">" + c + "</option>";
      }).join("") + "</select></label></div>" +
      '<h1 class="page-title">Icon Wall</h1><div id="icon-host">' + iconCards() + "</div>";
  }

  function iconCards() {
    const q = ui.iconQuery.trim().toLowerCase();
    const groups = ["Patient Events", "Non-Patient Events", "Feedback"].filter(function (g) {
      return ui.category === "Any" || ui.category === g;
    });
    return groups.map(function (group) {
      const items = ICONS.filter(function (item) {
        return item.group === group && (!q || (item.name + " " + item.desc).toLowerCase().indexOf(q) >= 0);
      });
      if (!items.length) return "";
      return '<div class="section-label">' + esc(group) + '</div><div class="icon-grid">' + items.map(function (item) {
        return '<button class="icon-card" data-act="icon" data-id="' + esc(item.name) + '"><span class="glyph" style="background:' + item.color + '">●</span><span><h3>' + esc(item.name) + "</h3>" +
          (ui.showDesc ? "<p>" + esc(item.desc) + "</p>" : "") + '</span><span class="ext">↗</span></button>';
      }).join("") + "</div>";
    }).join("");
  }
  function paintIcons() {
    const host = document.getElementById("icon-host");
    if (host) host.innerHTML = iconCards();
  }

  function usersHtml() {
    const selected = selectedIds();
    const buttons = ['<button class="btn" data-act="new-user">New</button>'];
    if (selected.length === 1) {
      buttons.push('<button class="btn" data-act="edit-user">Edit</button>');
      buttons.push('<button class="btn" data-act="copy-user">Copy</button>');
    }
    if (selected.length) buttons.push('<button class="btn" data-act="change-status">Change Status</button>');
    return '<h1 class="page-title">Users</h1><div class="toolbar">' + buttons.join("") +
      '<div class="search-wrap"><input id="user-search" placeholder="Type user details to search" /><select id="search-field">' +
      ["all", "id", "first", "last", "title"].map(function (value) {
        const labels = { all: "All", id: "User ID", first: "First Name", last: "Last Name", title: "Title" };
        return '<option value="' + value + '"' + (ui.searchField === value ? " selected" : "") + ">" + labels[value] + "</option>";
      }).join("") +
      '</select></div><button class="btn" data-act="advanced">Advanced Search</button><button class="btn" data-act="reset-list">Reset List</button>' +
      '<button class="btn" data-act="locations"' + (selected.length ? "" : " disabled") + '>Location Assignments</button>' +
      '<button class="btn" data-act="act-as"' + (selected.length === 1 ? "" : " disabled") + ">Act As</button></div>" +
      '<div class="table-card"><table class="grid" id="users-table"><thead><tr><th></th><th>User ID</th><th>First Name</th><th>Last Name</th><th>Title</th><th>Department</th><th>Last Login</th><th>Status</th></tr></thead><tbody id="user-rows">' +
      userRows() + "</tbody></table></div>" + pagerHtml() +
      '<div class="pager"><button class="btn" data-act="nav" data-to="home">Exit</button></div>';
  }

  function userRows() {
    const rows = filteredUsers();
    const start = (ui.page - 1) * ui.pageSize;
    const pageRows = rows.slice(start, start + ui.pageSize);
    if (!pageRows.length) return '<tr><td colspan="8" class="empty">No data exists</td></tr>';
    return pageRows.map(function (u) {
      const on = !!ui.selected[u.id];
      return '<tr class="' + (on ? "selected" : "") + '"><td><input class="row-check" type="checkbox" value="' + esc(u.id) + '"' + (on ? " checked" : "") + " /></td>" +
        '<td><a href="#/users" data-act="open-user" data-id="' + esc(u.id) + '">' + esc(u.id) + "</a></td><td>" + esc(u.firstName) + "</td><td>" + esc(u.lastName) + "</td><td>" + esc(u.title) + "</td><td>" + esc(u.department) + "</td><td>" + esc(u.lastLogin) + "</td><td>" + esc(u.status) + "</td></tr>";
    }).join("");
  }
  function pagerHtml() {
    const count = filteredUsers().length;
    const pages = Math.max(1, Math.ceil(count / ui.pageSize));
    if (ui.page > pages) ui.page = pages;
    let buttons = "";
    for (let i = 1; i <= pages && i <= 8; i++) buttons += '<button class="page-btn' + (i === ui.page ? " active" : "") + '" data-act="page" data-page="' + i + '">' + i + "</button>";
    return '<div class="pager"><select id="page-size">' + [10, 25, 50, 100].map(function (n) {
      return '<option value="' + n + '"' + (n === ui.pageSize ? " selected" : "") + ">" + n + "</option>";
    }).join("") + "</select>" + buttons + "</div>";
  }
  function paintRows() {
    const body = document.getElementById("user-rows");
    if (!body) { render(); return; }
    body.innerHTML = userRows();
    const pager = document.querySelector(".pager");
    if (pager) pager.outerHTML = pagerHtml();
  }

  function simpleTable(headers, rows) {
    return '<div class="table-card"><table class="grid"><thead><tr>' + headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + (rows.length ? rows.join("") : '<tr><td colspan="' + headers.length + '" class="empty">No data exists</td></tr>') + "</tbody></table></div>";
  }

  function patientsHtml() {
    return "<h1 class=\"page-title\">Patients</h1>" + simpleTable(["MRN", "Name", "Unit", "Site"], db.patients.map(function (p) {
      return "<tr><td>" + esc(p.mrn) + "</td><td>" + esc(p.name) + "</td><td>" + esc(p.unit) + "</td><td>" + esc(p.site) + "</td></tr>";
    }));
  }
  function infoHtml() {
    return '<h1 class="page-title">Info Center</h1><div class="cards">' +
      card("Users", "Create, search, and update accounts from Admin Center.") +
      card("Icon Wall", "Start a file from a form on the home page.") +
      card("File Tracker", "Follow submitted files.") +
      card("Front line access", "Dashboard template None, icon wall Risk and Feedback, risk role Front Line User, scope None.") +
      "</div>";
  }
  function card(title, text) { return '<article class="info-card"><h3>' + esc(title) + "</h3><p>" + esc(text) + "</p></article>"; }
  function alertsHtml() {
    return "<h1 class=\"page-title\">Alerts</h1>" + simpleTable(["Schedule", "Description", "Status"], db.alerts.map(function (a) {
      return "<tr><td>" + esc(a.name) + "</td><td>" + esc(a.detail) + "</td><td>" + esc(a.status) + "</td></tr>";
    }));
  }
  function tasksHtml() {
    return "<h1 class=\"page-title\">Tasks</h1>" + simpleTable(["Task", "Owner", "Due", "Status"], db.tasks.map(function (t) {
      return "<tr><td>" + esc(t.name) + "</td><td>" + esc(t.owner) + "</td><td>" + esc(t.due) + "</td><td>" + esc(t.status) + "</td></tr>";
    }));
  }
  function filesHtml() {
    return "<h1 class=\"page-title\">File Tracker</h1>" + simpleTable(["File ID", "Type", "Summary", "Status", "Submitted By", "Site", "Date"], db.files.map(function (f) {
      return "<tr><td>" + esc(f.id) + "</td><td>" + esc(f.type) + "</td><td>" + esc(f.summary) + "</td><td>" + esc(f.status) + "</td><td>" + esc(f.by) + "</td><td>" + esc(f.site) + "</td><td>" + esc(f.when) + "</td></tr>";
    }));
  }
  function searchHtml() {
    const q = ui.fileQuery.trim().toLowerCase();
    const users = !q ? [] : db.users.filter(function (u) { return (u.id + u.firstName + u.lastName).toLowerCase().indexOf(q) >= 0; }).slice(0, 20);
    const files = !q ? [] : db.files.filter(function (f) { return (f.id + f.type + f.summary).toLowerCase().indexOf(q) >= 0; });
    return '<h1 class="page-title">Search</h1><div class="toolbar"><input id="global-search" placeholder="Search users and files" value="' + esc(ui.fileQuery) + '" /><button class="btn primary" data-act="run-search">Search</button></div>' +
      "<h2 class=\"section-label\">Users</h2>" + simpleTable(["User ID", "Name", "Status"], users.map(function (u) {
        return '<tr><td><a href="#/users" data-act="open-user" data-id="' + esc(u.id) + '">' + esc(u.id) + "</a></td><td>" + esc(u.firstName + " " + u.lastName) + "</td><td>" + esc(u.status) + "</td></tr>";
      })) +
      "<h2 class=\"section-label\">Files</h2>" + simpleTable(["File ID", "Type", "Summary"], files.map(function (f) {
        return "<tr><td>" + esc(f.id) + "</td><td>" + esc(f.type) + "</td><td>" + esc(f.summary) + "</td></tr>";
      }));
  }
  function newFileHtml() {
    if (!ui.draft || !ui.draft.type) ui.draft = { type: "Fall", summary: "", description: "", site: "Main Campus" };
    return '<h1 class="page-title">New File</h1><div class="table-card" style="padding:16px;max-width:720px"><form id="file-form"><div class="form-grid">' +
      field("Type", '<select name="type">' + options(ICONS.map(function (i) { return i.name; }), ui.draft.type || "Fall") + "</select>", "span-3") +
      field("Summary *", '<input name="summary" required />', "span-3") +
      field("Site", '<select name="site">' + options(LOCATIONS, "Main Campus") + "</select>") +
      field("Anonymous", '<label class="toggle"><input name="anonymous" type="checkbox"' + (ui.anon ? " checked" : "") + " /> Submit Anonymously</label>") +
      field("Description", '<textarea name="description"></textarea>', "span-3") +
      '</div><div style="margin-top:12px"><button class="btn primary" data-act="submit-file" type="button">Submit</button></div></form></div>';
  }
  function foldersHtml() {
    const names = ["Risk", "Feedback", "Security", "Templates"];
    return '<h1 class="page-title">Folders</h1><div class="split"><div class="folder">' + names.map(function (name) {
      return '<button data-act="folder" data-id="' + esc(name) + '"' + (ui.folder === name ? ' class="active"' : "") + ">" + esc(name) + "</button>";
    }).join("") + '</div><div class="info-card"><h3>' + esc(ui.folder) + '</h3><p>Shared files for ' + esc(ui.folder) + " administration. New submissions from the icon wall are tracked in File Tracker.</p></div></div>";
  }
  function reportsHtml() {
    const active = db.users.filter(function (u) { return u.status === "Active"; }).length;
    return '<h1 class="page-title">Reports</h1><div class="cards">' +
      '<article class="info-card"><h3>Active users</h3><div class="stat">' + active + '</div><p>of ' + db.users.length + " accounts</p></article>" +
      '<article class="info-card"><h3>Open files</h3><div class="stat">' + db.files.length + "</div><p>in File Tracker</p></article>" +
      '<article class="info-card"><h3>Open tasks</h3><div class="stat">' + db.tasks.length + "</div><p>assigned work</p></article></div>";
  }

  function field(label, control, span) {
    return '<label class="field' + (span ? " " + span : "") + '"><span>' + label + "</span>" + control + "</label>";
  }

  function modalHtml() {
    if (ui.modal === "site") return siteModal();
    if (ui.modal === "user") return userModal();
    if (ui.modal === "role") return roleModal();
    if (ui.modal === "schedule") return scheduleModal();
    if (ui.modal === "advanced") return advancedModal();
    if (ui.modal === "status") return statusModal();
    if (ui.modal === "locations") return locationModal();
    if (ui.modal === "actas") return actAsModal();
    if (ui.modal === "file") return fileModal();
    return "";
  }

  function wrap(title, body, footer, narrow, extraClass) {
    return '<div class="backdrop ' + (extraClass || "") + '"><section class="modal' + (narrow ? " narrow" : "") + '" role="dialog" aria-modal="true"><header><h2>' +
      title + '</h2><button class="x" data-act="close" aria-label="Close">×</button></header><div class="body">' + body + "</div><footer>" + footer + "</footer></section></div>";
  }

  function siteModal() {
    return wrap("Setting preferred location",
      '<label class="toggle"><input id="hide-site-prompt" type="checkbox" /> Don\'t show this popup again</label><p>Please choose your default Site to help make searching for a specific location easier.</p>' +
      field("Preferred Site", '<select id="preferred-site">' + options(SITES, "No Preference") + "</select>"),
      '<button class="btn" data-act="skip-site">Skip</button><button class="btn primary" data-act="save-site">Done</button>', true);
  }

  function userModal() {
    const u = ui.draft;
    const title = u._originalId ? "Edit User" : "Create User";
    const tabs = [["info", "User Info"], ["settings", "Settings"], ["roles", "Roles"], ["groups", "User Groups"], ["actas", "Act As"], ["locations", "Locations"], ["schedules", "Schedules"]];
    const tabBar = '<div class="tabs">' + tabs.map(function (tab) {
      return '<button type="button" data-act="tab" data-tab="' + tab[0] + '"' + (ui.tab === tab[0] ? ' class="active"' : "") + ">" + tab[1] + "</button>";
    }).join("") + "</div>";
    return '<div class="backdrop"><section class="modal modal-wide" role="dialog" aria-modal="true"><header><h2>' + title +
      '</h2><button class="x" data-act="close" aria-label="Close">×</button></header><div class="body">' +
      (ui.notice ? '<div class="error">' + esc(ui.notice) + "</div>" : "") +
      '<p class="hint">Fields labeled with an asterisk(<span class="req">*</span>) are required.</p><form id="user-form">' +
      userIdentityBand(u) + tabBar + tabBody(u) + '</form></div><footer><button class="btn" data-act="close">Exit</button><button class="btn primary" data-act="save-user">Save</button></footer></section></div>';
  }

  function userIdentityBand(u) {
    const extra = ui.tab === "info"
      ? field("User Type", '<select name="userType">' + options(["Federated", "Local"], u.userType) + "</select>") +
        '<label class="field toggle span-2"><input name="containUserId" type="checkbox"' + (u.containUserId ? " checked" : "") + " /> Contain user ID</label>"
      : "";
    return '<div class="form-grid user-id-band">' +
      field("User ID *", '<input name="id" value="' + esc(u.id) + '" />') +
      field("Last Login", '<input value="' + esc(u.lastLogin) + '" disabled />') +
      field("Catalix User ID", '<input name="catalixUserId" value="' + esc(u.catalixUserId || u.employeeId || "") + '" />') +
      extra +
      "</div>";
  }

  function tabBody(u) {
    if (ui.tab === "settings") {
      return '<div class="form-grid">' +
        field("User Profile Update Method", '<select name="profileUpdateMethod">' + options(["Internal-Application", "Directory Sync"], u.profileUpdateMethod) + "</select>", "span-3") +
        field("Status", '<select name="status">' + options(["Active", "Inactive", "Locked Out"], u.status) + "</select>", "span-3") +
        field("User Time Zone", '<select name="timeZone">' + options(TIMEZONES, u.timeZone) + "</select>", "span-3") +
        field("Dashboard Group", '<select name="dashboardGroup">' + options(DASHBOARD_GROUPS, u.dashboardGroup) + "</select>", "span-3") +
        field("Icon Wall Template", '<select name="iconWallTemplate">' + options(ICON_TEMPLATES, u.iconWallTemplate) + "</select>", "span-3") +
        '<div class="field span-3"><span>Available Care Setting(s)</span><div class="chips">' + CARE_SETTINGS.map(function (item) {
          return '<label class="chip"><input name="careSettings" type="checkbox" value="' + esc(item) + '"' + (u.careSettings.indexOf(item) >= 0 ? " checked" : "") + " /> " + esc(item) + "</label>";
        }).join("") + "</div></div>" +
        field("Care Setting", '<select name="careSetting">' + options([""].concat(CARE_SETTINGS), u.careSetting) + "</select>", "span-3") +
        '<div class="field span-3"><span>Available Repository Setting(s)</span><div class="chips">' + REPOSITORIES.map(function (item) {
          return '<label class="chip"><input name="repositorySettings" type="checkbox" value="' + esc(item) + '"' + (u.repositorySettings.indexOf(item) >= 0 ? " checked" : "") + " /> " + esc(item) + "</label>";
        }).join("") + "</div></div>" +
        field("Regulatory Setting", '<select name="regulatorySetting">' + options(REGULATORY, u.regulatorySetting) + "</select>", "span-3") +
        "</div>";
    }
    if (ui.tab === "roles") {
      const picks = selectedRoleIndices();
      const openDisabled = picks.length !== 1;
      const delDisabled = !picks.length;
      const body = u.roles.length ? u.roles.map(function (role, index) {
        const desc = role.description || ROLE_DESCRIPTIONS[role.role] || "";
        return "<tr><td><input class=\"role-check\" type=\"checkbox\" value=\"" + index + "\"" + (ui.rolePick[index] ? " checked" : "") + " /></td>" +
          "<td>" + esc(role.role) + "</td><td>" + esc(desc) + "</td><td>" + esc(role.scope) + "</td><td>" + esc(role.forbidden || "") + "</td></tr>";
      }).join("") : '<tr><td colspan="5" class="empty">No Assigned Role</td></tr>';
      return '<div class="role-toolbar">' +
        '<button class="btn primary-outline" type="button" data-act="add-role">Add</button>' +
        '<button class="btn" type="button" data-act="open-role"' + (openDisabled ? " disabled" : "") + ">Open</button>" +
        '<button class="btn danger-outline" type="button" data-act="del-roles"' + (delDisabled ? " disabled" : "") + ">Delete</button></div>" +
        '<div class="table-card inner-table"><table class="grid roles-grid"><thead><tr><th></th><th>Role</th><th>Role Description</th><th>Scope</th><th>Forbidden List</th></tr></thead><tbody>' +
        body + "</tbody></table></div>";
    }
    if (ui.tab === "groups") {
      const rows = u.groups.length ? u.groups.map(function (group) {
        return '<div class="row"><span>' + esc(group) + '</span><button type="button" data-act="del-group" data-id="' + esc(group) + '">Remove</button></div>';
      }).join("") : '<div class="row"><span class="hint">No user groups</span></div>';
      return '<div class="inline"><select id="group-pick">' + options(GROUPS, GROUPS[0]) + '</select><button class="btn" type="button" data-act="add-group">Add</button></div><div class="list-block" style="margin-top:10px">' + rows + "</div>";
    }
    if (ui.tab === "actas") {
      return '<div class="check-list">' + db.users.filter(function (user) { return user.id !== u.id; }).slice(0, 12).map(function (user) {
        return '<label class="toggle"><input name="actAsUser" type="checkbox" value="' + esc(user.id) + '"' + (u.actAs.indexOf(user.id) >= 0 ? " checked" : "") + " /> " + esc(user.firstName + " " + user.lastName) + "</label>";
      }).join("") + "</div>";
    }
    if (ui.tab === "locations") {
      return '<div class="check-list">' + LOCATIONS.map(function (loc) {
        return '<label class="toggle"><input name="userLocation" type="checkbox" value="' + esc(loc) + '"' + (u.locations.indexOf(loc) >= 0 ? " checked" : "") + " /> " + esc(loc) + "</label>";
      }).join("") + "</div>";
    }
    if (ui.tab === "schedules") {
      const picked = Object.keys(ui.schedulePick).filter(function (k) { return ui.schedulePick[k]; }).length;
      const rows = u.schedules.length ? u.schedules.map(function (entry, index) {
        return "<tr><td><input class=\"schedule-check\" type=\"checkbox\" value=\"" + index + "\"" + (ui.schedulePick[index] ? " checked" : "") + " /></td>" +
          "<td>" + esc(scheduleEntryName(entry)) + "</td><td>" + esc(scheduleEntryStatus(entry)) + "</td></tr>";
      }).join("") : '<tr><td colspan="3" class="empty">No Schedule Items</td></tr>';
      return '<div class="role-toolbar">' +
        '<button class="btn primary-outline" type="button" data-act="add-schedule">Add To Schedule</button>' +
        '<button class="btn danger-outline" type="button" data-act="del-schedules"' + (picked ? "" : " disabled") + ">Delete</button></div>" +
        '<div class="table-card inner-table"><table class="grid"><thead><tr><th></th><th>Schedule Name</th><th>Status</th></tr></thead><tbody>' +
        rows + "</tbody></table></div>";
    }
    return '<div class="form-grid">' +
      field("First Name *", '<input name="firstName" value="' + esc(u.firstName) + '" />') +
      field("Middle Name", '<input name="middleName" value="' + esc(u.middleName) + '" />') +
      field("Last Name *", '<input name="lastName" value="' + esc(u.lastName) + '" />') +
      field("Employee Type", '<select name="employeeType">' + options(EMPLOYEE_TYPES, u.employeeType) + "</select>") +
      field("Specialty", '<select name="specialty">' + options(SPECIALTIES, u.specialty) + "</select>", "span-2") +
      field("Employee ID", '<input name="employeeId" value="' + esc(u.employeeId) + '" />') +
      field("Title", '<input name="title" value="' + esc(u.title) + '" />', "span-2") +
      field("Phone", '<input name="phone" value="' + esc(u.phone) + '" />') +
      field("Mobile", '<input name="mobile" value="' + esc(u.mobile) + '" />') +
      field("Pager", '<input name="pager" value="' + esc(u.pager) + '" />') +
      field("Fax", '<input name="fax" value="' + esc(u.fax) + '" />') +
      field("Email *", '<input name="email" type="email" value="' + esc(u.email) + '" />') +
      field("Alternate Email", '<input name="alternateEmail" value="' + esc(u.alternateEmail) + '" />') +
      field("Notes", '<textarea name="notes">' + esc(u.notes) + "</textarea>", "span-3") +
      "</div>";
  }

  function roleModal() {
    const role = ui.roleDraft;
    const pack = ROLE_OPTIONS[role.module];
    const licenseNote = role.module === "Risk"
      ? '<p class="hint">Risk module has unlimited Basic Administration licenses.</p>'
      : "";
    return '<div class="backdrop top"><section class="modal narrow" role="dialog"><header><h2>User Role Info</h2><button class="x" data-act="cancel-role">×</button></header><form id="role-form" class="body">' +
      '<p class="hint">Please specify a module first:</p><p class="hint">Then provide details about their role in the module:</p><div class="stack">' +
      field("Module", '<select name="module" id="role-module">' + options(Object.keys(ROLE_OPTIONS), role.module) + "</select>") +
      field("License", '<select name="license">' + options(pack.licenses, role.license) + "</select>") +
      field("Role", '<select name="role">' + options(pack.roles, role.role) + "</select>") +
      field("Scope", '<select name="scope">' + options(SCOPES, role.scope) + "</select>") +
      field("Forbidden Fields", '<select name="forbidden">' + options(FORBIDDEN_FIELDS, role.forbidden || "") + "</select>") +
      licenseNote +
      "</div></form><footer><button class=\"btn\" data-act=\"cancel-role\" type=\"button\">Cancel</button><button class=\"btn primary\" data-act=\"ok-role\" type=\"button\">OK</button></footer></section></div>";
  }

  function scheduleModal() {
    const pick = ui.schedulePickName || "Daily Alerts";
    const meta = scheduleMeta(pick);
    return '<div class="backdrop top"><section class="modal schedule-modal" role="dialog"><header><h2>Add user to Schedule</h2><span class="help-dot" title="Help">?</span><button class="x" data-act="cancel-schedule">×</button></header><div class="body">' +
      field("Schedule Name", '<select id="schedule-pick">' + options(SCHEDULES, pick) + "</select>") +
      '<div class="schedule-detail">' +
      detailRow("Schedule Description", meta.description) +
      detailRow("Schedule Status", meta.status) +
      detailRow("Last Trigger Date", meta.lastTrigger) +
      detailRow("First Trigger Date", meta.firstTrigger) +
      detailRow("# of Time Triggered", meta.timesTriggered) +
      detailRow("Content Distributed", meta.contentDistributed) +
      "</div></div><footer><button class=\"btn\" data-act=\"cancel-schedule\">Cancel</button><button class=\"btn primary\" data-act=\"ok-schedule\">OK</button></footer></section></div>";
  }

  function detailRow(label, value) {
    return '<div class="label">' + esc(label) + '</div><div class="value">' + esc(value) + "</div>";
  }

  function advancedModal() {
    const a = ui.advanced || {};
    return wrap("Search - User Profile",
      '<form id="advanced-form"><div class="stack">' +
      field("User ID", '<input name="id" value="' + esc(a.id || "") + '" />') +
      field("Name", '<input name="name" value="' + esc(a.name || "") + '" />') +
      field("Employee Id", '<input name="employeeId" value="' + esc(a.employeeId || "") + '" />') +
      field("Specialty", '<input name="specialty" value="' + esc(a.specialty || "") + '" />') +
      field("Title", '<input name="title" value="' + esc(a.title || "") + '" />') +
      field("Status", '<select name="status"><option value="">Any</option>' + options(["Active", "Inactive", "Locked Out"], a.status || "") + "</select>") +
      field("Dashboard Group", '<select name="dashboardGroup"><option value="">Any</option>' + options(DASHBOARD_GROUPS, a.dashboardGroup || "") + "</select>") +
      field("Icon Wall Template", '<select name="iconWallTemplate"><option value="">Any</option>' + options(ICON_TEMPLATES, a.iconWallTemplate || "") + "</select>") +
      "</div></form>",
      '<button class="btn" data-act="close">Cancel</button><button class="btn" data-act="clear-advanced">Clear</button><button class="btn primary" data-act="apply-advanced">OK</button>', true);
  }

  function statusModal() {
    return wrap("Change Status", field("Status", '<select id="status-choice">' + options(["Active", "Inactive", "Locked Out"], "Active") + "</select>"),
      '<button class="btn" data-act="close">Cancel</button><button class="btn primary" data-act="apply-status">Save</button>', true);
  }
  function locationModal() {
    const current = selectedIds().length === 1 ? (db.users.find(function (u) { return u.id === selectedIds()[0]; }).locations || []) : [];
    return wrap("Location Assignments", '<div class="check-list">' + LOCATIONS.map(function (loc) {
      return '<label class="toggle"><input name="assignLocation" type="checkbox" value="' + esc(loc) + '"' + (current.indexOf(loc) >= 0 ? " checked" : "") + " /> " + esc(loc) + "</label>";
    }).join("") + "</div>",
      '<button class="btn" data-act="close">Cancel</button><button class="btn primary" data-act="apply-locations">Save</button>', true);
  }
  function actAsModal() {
    const id = selectedIds()[0];
    return wrap("Act As", field("User", '<select id="actas-choice">' + options([id], id) + "</select><p class=\"hint\">The banner shows that you are working as this user.</p>"),
      '<button class="btn" data-act="close">Cancel</button><button class="btn primary" data-act="apply-actas">OK</button>', true);
  }
  function fileModal() {
    const file = ui.draft || { type: "Fall" };
    return wrap("New File — " + esc(file.type),
      (ui.notice ? '<div class="error">' + esc(ui.notice) + "</div>" : "") +
      '<form id="file-form"><div class="stack"><input type="hidden" name="type" value="' + esc(file.type) + '" />' +
      field("Summary *", '<input name="summary" />') +
      field("Site", '<select name="site">' + options(LOCATIONS, file.site || "Main Campus") + "</select>") +
      '<label class="toggle"><input name="anonymous" type="checkbox"' + (file.anonymous ? " checked" : "") + " /> Submit Anonymously</label>" +
      field("Description", '<textarea name="description"></textarea>') +
      "</div></form>",
      '<button class="btn" data-act="close">Exit</button><button class="btn primary" data-act="submit-file">Submit</button>', true);
  }

  render();
})();
