const menuData = [
  {
    title: "Academic Management",
    icon: "bx-book-content",
    toggleKey: "Academic",
    routes: [
      { to: "/semesters", title: "Semesters" },
      { to: "/shifts", title: "Shifts" },
      { to: "/mediums", title: "Mediums" },
      { to: "/sections", title: "Sections" },
      { to: "/streams", title: "Streams" },
      { to: "/subjects", title: "Subjects" },
      { to: "/board", title: "Boards" },
      { to: "/course", title: "Courses" },
      { to: "/coursegroup", title: "Course Group" },
      { to: "/classes", title: "Classes" },
      { to: "/assignteachers", title: "Assign Teachers" },
      { to: "/employe-role", title: "Employ Roles" },
    ],
  },
  {
    title: "Admission Management",
    icon: "bx-id-card",
    toggleKey: "admissionIn",
    routes: [
      { to: "/admit-students", title: "Admit Students" },
      { to: "/admit-bulk-students", title: "Admit Bulk Students" },
      { to: "/admissionenquiry", title: "Manage Inquiries" },
    ],
  },
  {
    title: "Students Management",
    icon: "bxs-user-rectangle",
    toggleKey: "stuinfo",
    routes: [
      { to: "/student-info", title: "Students Information" },
      { to: "/student-promote", title: "Students Promotions" },
      { to: "/student-transfer", title: "Students Transfer" },
      { to: "/student-birthdays", title: "Students Birthdays" },
    ],
  },
  {
    title: "Parents Account",
    icon: "bxs-user-badge",
    toggleKey: "parentinfo",
    routes: [{ to: "/manage-accounts", title: "Manage Accounts" }],
  },
  {
    title: "Home Work",
    icon: "bxs-group",
    toggleKey: "Homework",
    routes: [
      { to: "/Student-homework", title: "Student Homework" },
      { to: "/teacherhomework", title: "Teacher Homework" },
    ],
  },
  {
    title: "Live Classes",
    icon: "bx-video-plus",
    to: "/liveclass",
  },
  {
    title: "Holiday",
    icon: "bx-calendar-event",
    to: "/holiday",
  },
  {
    title: "Study Materials",
    icon: "bx-pencil",
    to: "/studymaterial",
  },
  {
    title: "Hostel Management",
    icon: "bx-building-house",
    to: "/hostelmanage",
  },
  {
    title: "Library",
    icon: "bx-book-add",
    toggleKey: "Library",
    routes: [
      { to: "/booklist", title: "Book List" },
      { to: "/bookissue", title: "Book Issue" },
    ],
  },
  {
    title: "Staff Management",
    icon: "bx-user",
    toggleKey: "staffinfo",
    routes: [
      { to: "/staff-management", title: "Staff Management" },
      { to: "/teaching-staff", title: "Teaching Staff" },
      { to: "/non-teaching-staff", title: "Non Teaching Staff" },
    ],
  },
  {
    title: "Fee Management",
    icon: "bx-rupee",
    toggleKey: "feemanagement",
    routes: [
      { to: "/feesoverview", title: "Fees Overview" },
      { to: "/feesdetails", title: "Fees Accounts" },
      { to: "/pendingfees", title: "Pending Fees" },
      { to: "/feecollection", title: "Collect Fee" },
      { to: "/feestructure", title: "Fees Structure" },
      { to: "/feeremindertoall", title: "Fees Reminder" },
    ],
  },
  {
    title: "Exam Management",
    icon: "bx-book-open",
    toggleKey: "Exam",
    routes: [
      { to: "/assignexam", title: "Assign Exam" },
      { to: "/examtype", title: "Exam Type" },
      { to: "/examdetails", title: "Exam Details" },
    ],
  },
  {
    title: "ID Card Printing",
    icon: "bx-id-card",
    toggleKey: "idCard",
    routes: [
      { to: "/student-id-card", title: "Print Student Cards" },
      { to: "/staff-id-card", title: "Print Staff Cards" },
    ],
  },
  {
    title: "Time Table Management",
    icon: "bx-calendar",
    toggleKey: "timetables",
    routes: [{ to: "/addtimetable", title: "Manage Timetable" }],
  },
  {
    title: "Test Management",
    icon: "bx-clipboard",
    toggleKey: "tests",
    routes: [
      { to: "/testlist", title: "Test List" },
      { to: "/assigngrade", title: "Assign Grades" },
      { to: "/markentry", title: "Mark Entry" },
      { to: "/particulartest", title: "Teacher Remarks" },
      { to: "/testschedule", title: "Test Schedule" },
      { to: "/tabulationsheet", title: "Tabulation Sheet" },
      { to: "/positionholders", title: "Position Holders" },
      { to: "/smsfpt", title: "Send Marks By SMS" },
      { to: "/printmarksheet", title: "Print Marksheet" },
      { to: "/testreport", title: "Test Reports" },
    ],
  },
  {
    title: "Manage Attendance",
    icon: "bx-id-card",
    toggleKey: "manageAtt",
    routes: [
      { to: "/student-attendance", title: "Students Attendance" },
      { to: "/staff-attendance", title: "Staff Attendance" },
    ],
  },
  {
    title: "Staff Salary Management",
    icon: "bx-money",
    toggleKey: "staffsalary",
    routes: [
      { to: "/staffsalarysetting", title: "Salary Generation Setting" },
      { to: "/managesalaries", title: "Manage Salaries" },
      { to: "/loanmanagement", title: "Loan Management" },
      { to: "/salaryloanreport", title: "Salary & Loan Reports" },
    ],
  },
  {
    title: "Certification",
    icon: "bx-certification",
    to: "/certification",
  },
  {
    title: "Expense Management",
    icon: "bx-wallet",
    to: "/expense-management",
  },
  {
    title: "Reporting Area",
    icon: "bx-file",
    to: "/reporting",
  },
  {
    title: "SMS Management",
    icon: "bx-message-rounded-dots",
    to: "/sms-management",
  },
  {
    title: "Mobile App Notification",
    icon: "bx-mobile-alt",
    to: "/mobile-notification",
  },
  {
    title: "Email Alerts",
    icon: "bx-envelope",
    to: "/email-alerts",
  },
  {
    title: "Manage Campus",
    icon: "bxs-school",
    to: "/manage-campus",
  },
  {
    title: "Admin Roles Management",
    icon: "bxs-group",
    to: "/admin-roles",
  },
  {
    title: "Website Management",
    icon: "bx-globe",
    to: "/website-management",
  },
  {
    title: "Books & Stationery",
    icon: "bx-book",
    to: "/books-stationery",
  },
  {
    title: "Bus Management",
    icon: "bx-bus-school",
    to: "/bus-management",
  },
  {
    title: "Sports",
    icon: "bx-run",
    to: "/sports",
  },
  {
    title: "School Information Management",
    icon: "bxs-school",
    to: "/school-info-management",
  },
  {
    title: "Stock & Inventory",
    icon: "bx-layer",
    toggleKey: "stockInventory",
    routes: [
      { to: "/stock-account", title: "Stock Account" },
      { to: "/stock-inventory", title: "Stock Inventory" },
    ],
  },
  {
    title: "Voucher",
    icon: "bx-layer",
    toggleKey: "voucher",
    routes: [
      { to: "/Voucher-purchase", title: "Purchase" },
      { to: "/Voucher-expense", title: "Expense" },
      { to: "/Voucher-sales", title: "Sales" },
      { to: "/Voucher-receipt", title: "Receipt" },
    ],
  },
  {
    title: "Accounting",
    icon: "bx-credit-card-front",
    to: "/balancesheet",
  },
  {
    title: "Notice Board",
    icon: "bx-chalkboard",
    to: "/notice-board",
  },
  {
    title: "Leave Management",
    icon: "bx-book-reader",
    to: "/leavemanagement",
  },
  {
    title: "Settings",
    icon: "bx-cog",
    to: "/settings",
  },
];

export default menuData;
