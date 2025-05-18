/**
 * QA Toolkit specific JavaScript functionality - Fixed Version
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("QA Toolkit Fixed JS loading...");

  // Category tabs functionality
  const categoryTabs = document.querySelectorAll(".qa-category-tab");
  const categoryContents = document.querySelectorAll(".qa-category-content");

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Hide all category contents
      categoryContents.forEach((content) => content.classList.remove("active"));

      // Show the corresponding content
      const categoryId = tab.getAttribute("data-category");
      document.getElementById(categoryId).classList.add("active");
    });
  });

  // Toggle template preview functionality
  const toggleButtons = document.querySelectorAll(".toggle-preview");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const previewId = this.getAttribute("data-id");
      const previewElement = document.getElementById(previewId);

      if (previewElement.classList.contains("expanded")) {
        previewElement.classList.remove("expanded");
        this.textContent = "Show More";
      } else {
        previewElement.classList.add("expanded");
        this.textContent = "Show Less";
      }
    });
  });

  // Category filter functionality
  const categoryButtons = document.querySelectorAll(".category-button");
  const resourceCategories = document.querySelectorAll(".resource-category");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show/hide categories based on selection
      if (category === "all") {
        resourceCategories.forEach((cat) => (cat.style.display = "block"));
        document.querySelector(".uiux-reference").style.display = "block";
      } else if (category === "uiux") {
        resourceCategories.forEach((cat) => (cat.style.display = "none"));
        document.querySelector(".uiux-reference").style.display = "block";
      } else {
        document.querySelector(".uiux-reference").style.display = "none";
        resourceCategories.forEach((cat) => {
          if (cat.getAttribute("data-category") === category) {
            cat.style.display = "block";
          } else {
            cat.style.display = "none";
          }
        });
      }
    });
  });

  // UI/UX Tabs functionality
  const uiuxTabs = document.querySelectorAll(".uiux-tab");
  const uiuxContents = document.querySelectorAll(".uiux-content");

  uiuxTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const contentId = this.getAttribute("data-content");

      // Remove active class from all tabs and contents
      uiuxTabs.forEach((t) => t.classList.remove("active"));
      uiuxContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      document.getElementById(contentId).classList.add("active");
    });
  });

  // Responsive view toggle
  const responsiveButtons = document.querySelectorAll(".responsive-button");
  const responsiveContents = document.querySelectorAll(".responsive-content");

  responsiveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const view = this.getAttribute("data-view");

      // Remove active class from all buttons and contents
      responsiveButtons.forEach((btn) => btn.classList.remove("active"));
      responsiveContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(view + "-view").classList.add("active");
    });
  });

  // Search functionality
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.getElementById("search-input");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      performSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        performSearch();
      }
    });
  }

  function performSearch() {
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
      // Reset all resources to visible if search is empty
      resourceCategories.forEach((cat) => (cat.style.display = "block"));
      document.querySelectorAll(".resource-card").forEach((card) => (card.style.display = "block"));
      document.querySelector(".uiux-reference").style.display = "block";
      return;
    }

    // Make all categories visible initially
    resourceCategories.forEach((cat) => (cat.style.display = "block"));

    // Hide UI/UX reference if not relevant to search
    const uiuxReference = document.querySelector(".uiux-reference");
    if (
      searchTerm.includes("ui") ||
      searchTerm.includes("ux") ||
      searchTerm.includes("visual") ||
      searchTerm.includes("design") ||
      searchTerm.includes("interface")
    ) {
      uiuxReference.style.display = "block";
    } else {
      uiuxReference.style.display = "none";
    }

    // Filter resource cards
    const resourceCards = document.querySelectorAll(".resource-card");
    let hasVisibleCards = {};

    resourceCards.forEach((card) => {
      const title = card.querySelector(".resource-title").textContent.toLowerCase();
      const description = card.querySelector(".resource-description").textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll(".resource-tag"))
        .map((tag) => tag.textContent.toLowerCase())
        .join(" ");

      const categorySection = card.closest(".resource-category");
      const categoryId = categorySection.getAttribute("data-category");

      if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
        card.style.display = "block";
        hasVisibleCards[categoryId] = true;
      } else {
        card.style.display = "none";
      }
    });

    // Hide categories with no visible cards
    resourceCategories.forEach((cat) => {
      const categoryId = cat.getAttribute("data-category");
      if (!hasVisibleCards[categoryId]) {
        cat.style.display = "none";
      }
    });
  }

  // Template preview functionality
  const previewButtons = document.querySelectorAll(".qa-preview-btn, .resource-button");
  const templateModal = document.getElementById("template-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const templateTitle = document.getElementById("template-title");
  const templateStructure = document.getElementById("template-structure");
  const templateForm = document.getElementById("template-form");
  const templateOutput = document.getElementById("template-output");

  // Tab navigation in template modal
  const structureTab = document.getElementById("structure-tab");
  const contentTab = document.getElementById("content-tab");
  const outputTab = document.getElementById("output-tab");
  const structureContent = document.getElementById("structure-content");
  const contentContent = document.getElementById("content-content");
  const outputContent = document.getElementById("output-content");

  // Buttons in template modal
  const nextStructureBtn = document.getElementById("next-structure");
  const nextContentBtn = document.getElementById("next-content");
  const generateOutputBtn = document.getElementById("generate-output");
  const copyOutputBtn = document.getElementById("copy-output");

  // Template data storage
  const templateData = {
    "bug-report-template": {
      title: "Bug Report Template",
      structure: `# BUG REPORT TEMPLATE

## BASIC INFORMATION
**Bug ID:** [Auto-generated or manually assigned]
**Reported By:** [Your Name]
**Date Reported:** [YYYY-MM-DD]
**Priority:** [High/Medium/Low]
**Severity:** [Critical/Major/Minor/Cosmetic]
**Status:** [New]

## ENVIRONMENT
**Device:** [e.g., MacBook Pro, iPhone 13, etc.]
**OS & Version:** [e.g., Windows 11, iOS 15.4]
**Browser & Version:** [e.g., Chrome 99.0.4844.51]
**App Version:** [e.g., 2.4.1]
**Screen Resolution:** [e.g., 1920x1080]

## DESCRIPTION
[Provide a clear, concise description of the bug]

## STEPS TO REPRODUCE
1. [First step]
2. [Second step]
3. [Third step]
...

## EXPECTED BEHAVIOR
[What should happen when the steps are followed correctly]

## ACTUAL BEHAVIOR
[What actually happens when the steps are followed]

## ATTACHMENTS
[Screenshots, videos, logs, or other relevant files]

## ADDITIONAL NOTES
[Any other information that might be helpful]`,
      fields: [
        { id: "bugId", label: "Bug ID", type: "text", placeholder: "e.g., BUG-123" },
        { id: "reportedBy", label: "Reported By", type: "text", placeholder: "Your Name" },
        { id: "dateReported", label: "Date Reported", type: "date" },
        {
          id: "priority",
          label: "Priority",
          type: "select",
          options: ["High", "Medium", "Low"],
        },
        {
          id: "severity",
          label: "Severity",
          type: "select",
          options: ["Critical", "Major", "Minor", "Cosmetic"],
        },
        { id: "device", label: "Device", type: "text", placeholder: "e.g., MacBook Pro, iPhone 13" },
        { id: "osVersion", label: "OS & Version", type: "text", placeholder: "e.g., Windows 11, iOS 15.4" },
        {
          id: "browserVersion",
          label: "Browser & Version",
          type: "text",
          placeholder: "e.g., Chrome 99.0.4844.51",
        },
        { id: "appVersion", label: "App Version", type: "text", placeholder: "e.g., 2.4.1" },
        { id: "description", label: "Description", type: "textarea", placeholder: "Describe the bug in detail" },
        {
          id: "stepsToReproduce",
          label: "Steps to Reproduce",
          type: "textarea",
          placeholder: "List the steps to reproduce the bug",
        },
        {
          id: "expectedBehavior",
          label: "Expected Behavior",
          type: "textarea",
          placeholder: "What should happen",
        },
        {
          id: "actualBehavior",
          label: "Actual Behavior",
          type: "textarea",
          placeholder: "What actually happens",
        },
      ],
    },
    "coverage-report-template": {
      title: "Test Coverage Report Template",
      structure: `# TEST COVERAGE REPORT

## PROJECT OVERVIEW
**Project Name:** [Project Name]
**Version/Sprint:** [Version or Sprint #]
**Report Date:** [YYYY-MM-DD]
**Report Prepared By:** [Your Name]
**Testing Period:** [Start Date] to [End Date]

## EXECUTIVE SUMMARY
[1-2 sentences summarizing the overall quality status]

## COVERAGE METRICS
**Feature Coverage:** [e.g., 85%] (Features tested / Total features)
**Requirement Coverage:** [e.g., 92%] (Requirements tested / Total requirements)
**Code Coverage:** [e.g., 78%] (Code tested / Total code)
**Test Case Execution:** [e.g., 245/250] (Executed / Total planned)

## RISK ASSESSMENT
**High-Risk Areas Coverage:** [e.g., 100%]
**Medium-Risk Areas Coverage:** [e.g., 85%]
**Low-Risk Areas Coverage:** [e.g., 75%]

## TEST RESULTS SUMMARY
**Total Test Cases:** [Number]
**Passed:** [Number] ([Percentage]%)
**Failed:** [Number] ([Percentage]%)
**Blocked:** [Number] ([Percentage]%)
**Not Executed:** [Number] ([Percentage]%)

## DEFECTS SUMMARY
**Total Defects:** [Number]
**Critical:** [Number]
**High:** [Number]
**Medium:** [Number]
**Low:** [Number]

## RECOMMENDATIONS
[List any recommendations based on the test results]

## CONCLUSION
[Overall assessment of quality and readiness]`,
      fields: [
        { id: "projectName", label: "Project Name", type: "text", placeholder: "Project Name" },
        { id: "versionSprint", label: "Version/Sprint", type: "text", placeholder: "e.g., v1.2.3 or Sprint 5" },
        { id: "reportDate", label: "Report Date", type: "date" },
        { id: "preparedBy", label: "Prepared By", type: "text", placeholder: "Your Name" },
        { id: "testingPeriodStart", label: "Testing Period Start", type: "date" },
        { id: "testingPeriodEnd", label: "Testing Period End", type: "date" },
        {
          id: "executiveSummary",
          label: "Executive Summary",
          type: "textarea",
          placeholder: "Brief summary of overall quality status",

