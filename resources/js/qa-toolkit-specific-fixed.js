document.addEventListener("DOMContentLoaded", () => {
  console.log("QA Toolkit Fixed JS loading...")

  // Template modal elements
  const templateModal = document.getElementById("template-modal")
  const closeModalBtn = document.getElementById("close-modal")
  const templateTitle = document.getElementById("template-title")
  const templateStructure = document.getElementById("template-structure")
  const templateForm = document.getElementById("template-form")
  const templateOutput = document.getElementById("template-output")

  // Tab navigation in template modal
  const structureTab = document.getElementById("structure-tab")
  const contentTab = document.getElementById("content-tab")
  const outputTab = document.getElementById("output-tab")
  const structureContent = document.getElementById("structure-content")
  const contentContent = document.getElementById("content-content")
  const outputContent = document.getElementById("output-content")

  // Buttons in template modal
  const nextStructureBtn = document.getElementById("next-structure")
  const nextContentBtn = document.getElementById("next-content")
  const generateOutputBtn = document.getElementById("generate-output")
  const copyOutputBtn = document.getElementById("copy-output")

  // Category buttons functionality
  const categoryButtons = document.querySelectorAll(".category-button")
  const resourceCategories = document.querySelectorAll(".resource-category")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Category button clicked:", this.getAttribute("data-category"))
      const category = this.getAttribute("data-category")

      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Show/hide categories based on selection
      if (category === "all") {
        resourceCategories.forEach((cat) => (cat.style.display = "block"))
      } else {
        resourceCategories.forEach((cat) => {
          if (cat.getAttribute("data-category") === category) {
            cat.style.display = "block"
          } else {
            cat.style.display = "none"
          }
        })
      }
    })
  })

  // Toggle preview functionality
  const toggleButtons = document.querySelectorAll(".toggle-preview")
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Toggle preview button clicked:", this.getAttribute("data-id"))
      const previewId = this.getAttribute("data-id")
      togglePreview(previewId)
    })
  })

  // Function to toggle preview
  function togglePreview(previewId) {
    const previewElement = document.getElementById(previewId)

    if (!previewElement) {
      console.error(`Preview element with ID ${previewId} not found`)
      return
    }

    if (previewElement.classList.contains("expanded")) {
      previewElement.classList.remove("expanded")
      document.querySelector(`[data-id="${previewId}"]`).textContent = "Show More"
    } else {
      previewElement.classList.add("expanded")
      document.querySelector(`[data-id="${previewId}"]`).textContent = "Show Less"
    }
  }

  // UI/UX Tabs functionality
  const uiuxTabs = document.querySelectorAll(".uiux-tab")
  const uiuxContents = document.querySelectorAll(".uiux-content")

  uiuxTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const contentId = this.getAttribute("data-content")

      // Remove active class from all tabs and contents
      uiuxTabs.forEach((t) => t.classList.remove("active"))
      uiuxContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      this.classList.add("active")
      document.getElementById(contentId).classList.add("active")
    })
  })

  // Responsive view toggle
  const responsiveButtons = document.querySelectorAll(".responsive-button")
  const responsiveContents = document.querySelectorAll(".responsive-content")

  responsiveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const view = this.getAttribute("data-view")

      // Remove active class from all buttons and contents
      responsiveButtons.forEach((btn) => btn.classList.remove("active"))
      responsiveContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(view + "-view").classList.add("active")
    })
  })

  // Search functionality
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.getElementById("search-input")

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault()
      performSearch()
    })
  }

  function performSearch() {
    if (!searchInput) return

    const searchTerm = searchInput.value.toLowerCase().trim()
    console.log("Searching for:", searchTerm)

    if (searchTerm === "") {
      // Reset all resources to visible if search is empty
      resourceCategories.forEach((cat) => (cat.style.display = "block"))
      document.querySelectorAll(".resource-card").forEach((card) => (card.style.display = "block"))
      return
    }

    // Make all categories visible initially
    resourceCategories.forEach((cat) => (cat.style.display = "block"))

    // Filter resource cards
    const resourceCards = document.querySelectorAll(".resource-card")
    const hasVisibleCards = {}

    resourceCards.forEach((card) => {
      const title = card.querySelector(".resource-title").textContent.toLowerCase()
      const description = card.querySelector(".resource-description").textContent.toLowerCase()
      const tags = Array.from(card.querySelectorAll(".resource-tag"))
        .map((tag) => tag.textContent.toLowerCase())
        .join(" ")

      const categorySection = card.closest(".resource-category")
      const categoryId = categorySection.getAttribute("data-category")

      if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
        card.style.display = "block"
        hasVisibleCards[categoryId] = true
      } else {
        card.style.display = "none"
      }
    })

    // Hide categories with no visible cards
    resourceCategories.forEach((cat) => {
      const categoryId = cat.getAttribute("data-category")
      if (!hasVisibleCards[categoryId]) {
        cat.style.display = "none"
      }
    })
  }

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
        },
        {
          id: "featureCoverage",
          label: "Feature Coverage (%)",
          type: "number",
          placeholder: "e.g., 85",
          min: "0",
          max: "100",
        },
        {
          id: "requirementCoverage",
          label: "Requirement Coverage (%)",
          type: "number",
          placeholder: "e.g., 92",
          min: "0",
          max: "100",
        },
        {
          id: "codeCoverage",
          label: "Code Coverage (%)",
          type: "number",
          placeholder: "e.g., 78",
          min: "0",
          max: "100",
        },
        { id: "testCasesExecuted", label: "Test Cases Executed", type: "number", placeholder: "e.g., 245" },
        { id: "testCasesTotal", label: "Total Test Cases", type: "number", placeholder: "e.g., 250" },
        {
          id: "recommendations",
          label: "Recommendations",
          type: "textarea",
          placeholder: "List any recommendations based on the test results",
        },
        {
          id: "conclusion",
          label: "Conclusion",
          type: "textarea",
          placeholder: "Overall assessment of quality and readiness",
        },
      ],
    },
    "user-bug-form": {
      title: "User-Reported Bug Form",
      structure: `# USER ISSUE REPORT FORM

Thank you for taking the time to report an issue. The information you provide will help us fix the problem quickly.

## What went wrong?
[Brief description of the issue]

## What did you expect to happen?
[What you expected the app/site to do]

## Can you reproduce the issue?
- [ ] Yes, every time
- [ ] Yes, sometimes
- [ ] No, it happened only once
- [ ] Not sure

## Steps to reproduce (if applicable)
1. [First step]
2. [Second step]
3. [Continue as needed]

## Device and technical details
Device Type: [Smartphone / Tablet / Laptop / Desktop / Other]
Device Model: [e.g., iPhone 13 Pro, Dell XPS 15]
Operating System: [e.g., iOS 15.4, Windows 11]
Browser (if applicable): [e.g., Chrome, Safari]
App Version (if applicable): [e.g., 2.4.1]

## Additional information
[Any other details that might help us understand the issue]

## Contact information (optional)
Email: [Your email address if you'd like us to follow up]`,
      fields: [
        {
          id: "issueDescription",
          label: "What went wrong?",
          type: "textarea",
          placeholder: "Brief description of the issue",
        },
        {
          id: "expectedBehavior",
          label: "What did you expect to happen?",
          type: "textarea",
          placeholder: "What you expected the app/site to do",
        },
        {
          id: "reproducibility",
          label: "Can you reproduce the issue?",
          type: "select",
          options: ["Yes, every time", "Yes, sometimes", "No, it happened only once", "Not sure"],
        },
        {
          id: "stepsToReproduce",
          label: "Steps to reproduce",
          type: "textarea",
          placeholder: "List the steps to reproduce the issue",
        },
        {
          id: "deviceType",
          label: "Device Type",
          type: "select",
          options: ["Smartphone", "Tablet", "Laptop", "Desktop", "Other"],
        },
        { id: "deviceModel", label: "Device Model", type: "text", placeholder: "e.g., iPhone 13 Pro, Dell XPS 15" },
        {
          id: "operatingSystem",
          label: "Operating System",
          type: "text",
          placeholder: "e.g., iOS 15.4, Windows 11",
        },
        { id: "browser", label: "Browser", type: "text", placeholder: "e.g., Chrome, Safari" },
        { id: "appVersion", label: "App Version", type: "text", placeholder: "e.g., 2.4.1" },
        {
          id: "additionalInfo",
          label: "Additional Information",
          type: "textarea",
          placeholder: "Any other details that might help us understand the issue",
        },
        { id: "contactEmail", label: "Contact Email (optional)", type: "email", placeholder: "Your email address" },
      ],
    },
    "launch-checklist": {
      title: "Launch Readiness Checklist",
      structure: `# LAUNCH READINESS CHECKLIST

## FUNCTIONAL VERIFICATION
- [ ] All critical user journeys have been tested end-to-end
- [ ] All high and medium priority bugs have been fixed
- [ ] Known issues have been documented with workarounds
- [ ] Error handling and validation has been tested
- [ ] Search functionality works as expected
- [ ] Form submissions are processed correctly
- [ ] Email notifications and confirmations are working

## PERFORMANCE & SCALABILITY
- [ ] Load testing has been performed at 2x expected volume
- [ ] Response times are within acceptable thresholds
- [ ] Database queries are optimized
- [ ] CDN configuration is optimized
- [ ] Auto-scaling is configured (if applicable)
- [ ] Caching strategy is implemented and tested

## SECURITY
- [ ] Security vulnerabilities have been addressed
- [ ] Authentication and authorization work correctly
- [ ] Sensitive data is encrypted
- [ ] Input validation is implemented
- [ ] CSRF protection is in place
- [ ] Rate limiting is configured

## COMPATIBILITY
- [ ] Application works in all supported browsers
- [ ] Application works on all supported devices
- [ ] Application works on all supported operating systems
- [ ] Responsive design has been tested
- [ ] Accessibility requirements have been met

## DEPLOYMENT & OPERATIONS
- [ ] Deployment process is documented
- [ ] Rollback procedure is documented and tested
- [ ] Monitoring is configured
- [ ] Alerting is configured
- [ ] Logging is implemented
- [ ] Backup and recovery procedures are in place

## DOCUMENTATION & TRAINING
- [ ] User documentation is complete
- [ ] Admin documentation is complete
- [ ] Support team has been trained
- [ ] Known issues and workarounds are documented

## BUSINESS READINESS
- [ ] Marketing materials are ready
- [ ] Legal requirements have been met
- [ ] Analytics tracking is implemented
- [ ] Stakeholders have approved the release`,
      fields: [
        {
          id: "projectName",
          label: "Project Name",
          type: "text",
          placeholder: "Name of the project being launched",
        },
        { id: "version", label: "Version", type: "text", placeholder: "e.g., v1.0.0" },
        { id: "launchDate", label: "Planned Launch Date", type: "date" },
        { id: "preparedBy", label: "Prepared By", type: "text", placeholder: "Your Name" },
        { id: "preparedDate", label: "Preparation Date", type: "date" },
        {
          id: "additionalNotes",
          label: "Additional Notes",
          type: "textarea",
          placeholder: "Any additional notes or context for this launch",
        },
      ],
    },
    "security-checklist": {
      title: "Security Baseline Checklist",
      structure: `# SECURITY BASELINE CHECKLIST

## AUTHENTICATION & AUTHORIZATION
- [ ] Strong password requirements enforced
- [ ] Account lockout after failed login attempts
- [ ] Two-factor authentication available
- [ ] Password reset flow is secure
- [ ] Session timeout implemented
- [ ] Role-based access control implemented
- [ ] Authorization checks on all sensitive endpoints

## DATA PROTECTION
- [ ] Sensitive data encrypted at rest
- [ ] TLS/SSL used for all communications
- [ ] PII is minimized and protected
- [ ] Database connection strings and credentials are secured
- [ ] Encryption keys properly managed
- [ ] Data backups are encrypted

## INPUT VALIDATION & OUTPUT ENCODING
- [ ] Input validation implemented for all user inputs
- [ ] Output encoding implemented to prevent XSS
- [ ] SQL injection prevention implemented
- [ ] File upload validation and scanning
- [ ] API parameters are validated
- [ ] Content Security Policy implemented

## SESSION MANAGEMENT
- [ ] Secure session handling implemented
- [ ] CSRF protection implemented
- [ ] Session IDs are properly protected
- [ ] Sessions expire after inactivity
- [ ] Secure cookie attributes used
- [ ] Session fixation protection implemented

## ERROR HANDLING & LOGGING
- [ ] Error messages don't reveal sensitive information
- [ ] Exceptions are properly caught and handled
- [ ] Security events are logged
- [ ] Logs don't contain sensitive information
- [ ] Log integrity is protected
- [ ] Monitoring for suspicious activity implemented

## INFRASTRUCTURE SECURITY
- [ ] Firewall configured properly
- [ ] Network segmentation implemented
- [ ] Unnecessary services disabled
- [ ] System hardening performed
- [ ] Regular security patching process in place
- [ ] DDoS protection implemented

## SECURITY TESTING
- [ ] Regular vulnerability scanning performed
- [ ] Penetration testing performed
- [ ] Security code review performed
- [ ] Dependency scanning for vulnerabilities
- [ ] Security regression testing performed
- [ ] Security incident response plan tested`,
      fields: [
        {
          id: "applicationName",
          label: "Application Name",
          type: "text",
          placeholder: "Name of the application being assessed",
        },
        { id: "version", label: "Version", type: "text", placeholder: "e.g., v1.0.0" },
        { id: "assessmentDate", label: "Assessment Date", type: "date" },
        { id: "assessedBy", label: "Assessed By", type: "text", placeholder: "Your Name" },
        {
          id: "scope",
          label: "Assessment Scope",
          type: "textarea",
          placeholder: "Define the scope of this security assessment",
        },
        {
          id: "additionalNotes",
          label: "Additional Notes",
          type: "textarea",
          placeholder: "Any additional notes or context for this assessment",
        },
      ],
    },
    "accessibility-checklist": {
      title: "Web Accessibility Testing Checklist",
      structure: `# WEB ACCESSIBILITY TESTING CHECKLIST

## PERCEIVABLE
### Text Alternatives
- [ ] All images have appropriate alt text
- [ ] Complex images have extended descriptions
- [ ] Decorative images have null alt attributes
- [ ] Form inputs have associated text labels
- [ ] Button text clearly describes the action

### Time-based Media
- [ ] Videos have captions
- [ ] Audio content has transcripts
- [ ] Media players have accessible controls

### Adaptable
- [ ] Content can be presented in different ways
- [ ] Correct semantic HTML elements are used
- [ ] Page structure uses proper heading hierarchy (H1-H6)
- [ ] Tables have proper headers and structure

### Distinguishable
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast with background
- [ ] Text can be resized up to 200% without loss of content
- [ ] Audio can be paused, stopped, or volume adjusted

## OPERABLE
### Keyboard Accessible
- [ ] All functionality is available via keyboard
- [ ] Keyboard focus is visible
- [ ] Keyboard focus order is logical
- [ ] No keyboard traps exist

### Enough Time
- [ ] Time limits can be adjusted or extended
- [ ] Moving content can be paused, stopped, or hidden
- [ ] Auto-updating content can be paused, stopped, or hidden

### Seizures and Physical Reactions
- [ ] No content flashes more than 3 times per second

### Navigable
- [ ] Pages have descriptive titles
- [ ] Each page has at least one heading
- [ ] Skip navigation link is provided
- [ ] Link text is descriptive and makes sense out of context

## UNDERSTANDABLE
### Readable
- [ ] Language of page is specified
- [ ] Language of parts is specified when it changes
- [ ] Unusual words and abbreviations are explained

### Predictable
- [ ] Navigation is consistent across pages
- [ ] Components with same functionality are identified consistently
- [ ] Changes of context are initiated only by user request

### Input Assistance
- [ ] Form errors are identified and described to users
- [ ] Labels or instructions are provided for user input
- [ ] Error suggestions are provided when detected
- [ ] Critical forms can be reviewed before submission

## ROBUST
### Compatible
- [ ] HTML is valid and well-formed
- [ ] ARIA is used correctly
- [ ] Custom controls have appropriate roles and states
- [ ] Status messages can be programmatically determined`,
      fields: [
        {
          id: "websiteName",
          label: "Website/Application Name",
          type: "text",
          placeholder: "Name of the website or application being tested",
        },
        { id: "url", label: "URL", type: "url", placeholder: "https://example.com" },
        { id: "testDate", label: "Test Date", type: "date" },
        { id: "testedBy", label: "Tested By", type: "text", placeholder: "Your Name" },
        {
          id: "browsers",
          label: "Browsers Tested",
          type: "text",
          placeholder: "e.g., Chrome 99, Firefox 98, Safari 15.4",
        },
        {
          id: "assistiveTech",
          label: "Assistive Technologies Tested",
          type: "text",
          placeholder: "e.g., NVDA, VoiceOver, JAWS",
        },
        {
          id: "scope",
          label: "Test Scope",
          type: "textarea",
          placeholder: "Define the scope of this accessibility assessment",
        },
        {
          id: "additionalNotes",
          label: "Additional Notes",
          type: "textarea",
          placeholder: "Any additional notes or context for this assessment",
        },
      ],
    },
    "dev-testing-guide": {
      title: "Developer-Led Testing Guide",
      structure: `# DEVELOPER-LED TESTING GUIDE

## INTRODUCTION
This guide helps developers implement effective testing practices into their daily workflow to catch bugs early and deliver higher quality code.

## WHY DEVELOPER TESTING MATTERS
- Catches bugs when they're cheapest to fix (during development)
- Reduces back-and-forth with QA team
- Improves code quality and maintainability
- Saves time in the overall development cycle
- Builds knowledge of edge cases and failure modes

## EFFECTIVE TESTING MINDSET
### Switch Contexts
The most important skill in developer testing is the ability to mentally switch from a builder mindset ("make it work") to a tester mindset ("break it if possible").

### Techniques for Context Switching:
1. Take a short break after implementation
2. Approach testing as if you didn't write the code
3. Ask: "What assumptions did I make while coding?"
4. Consider: "What could users do that I didn't expect?"

## TESTING APPROACHES
### 1. Unit Testing
- Test individual functions and methods in isolation
- Focus on edge cases and boundary conditions
- Use test-driven development when appropriate
- Aim for high code coverage

### 2. Integration Testing
- Test how components work together
- Focus on interfaces between components
- Test error handling between components
- Verify data flows correctly between components

### 3. Functional Testing
- Test complete user workflows
- Verify business requirements are met
- Test both happy paths and error paths
- Validate UI behavior and state management

## PRACTICAL TESTING CHECKLIST
### Before You Start Coding
- [ ] Understand the requirements fully
- [ ] Identify potential edge cases
- [ ] Plan your testing approach

### During Development
- [ ] Write unit tests for new code
- [ ] Test edge cases as you go
- [ ] Verify error handling
- [ ] Check for performance issues

### Before Submitting for Review
- [ ] Run all tests (unit, integration, etc.)
- [ ] Test the feature manually as a user would
- [ ] Verify all acceptance criteria are met
- [ ] Check for any regressions

## COMMON TESTING PITFALLS
1. Only testing the "happy path"
2. Not testing edge cases
3. Not testing error handling
4. Not testing with realistic data
5. Not testing performance
6. Not testing security

## CONCLUSION
Developer-led testing is not about replacing QA but about catching issues earlier when they're easier and cheaper to fix. By incorporating these practices into your daily workflow, you'll deliver higher quality code and become a more effective developer.`,
      fields: [
        {
          id: "teamName",
          label: "Development Team Name",
          type: "text",
          placeholder: "Name of your development team",
        },
        {
          id: "projectType",
          label: "Project Type",
          type: "text",
          placeholder: "e.g., Web Application, Mobile App, API",
        },
        {
          id: "primaryLanguages",
          label: "Primary Programming Languages",
          type: "text",
          placeholder: "e.g., JavaScript, Python, Java",
        },
        {
          id: "testingTools",
          label: "Testing Tools Used",
          type: "text",
          placeholder: "e.g., Jest, Cypress, JUnit",
        },
        {
          id: "customApproaches",
          label: "Custom Testing Approaches",
          type: "textarea",
          placeholder: "Any team-specific testing approaches or methodologies",
        },
        {
          id: "challengesNotes",
          label: "Specific Challenges & Notes",
          type: "textarea",
          placeholder: "Any specific testing challenges or additional notes for your team",
        },
      ],
    },
    "test-strategy-framework": {
      title: "5-Minute Test Strategy Framework",
      structure: `# 5-MINUTE TEST STRATEGY FRAMEWORK

## THE CHALLENGE
In fast-paced environments, there's rarely time to create detailed test plans. This framework helps you quickly develop a focused testing strategy that:
- Identifies highest-risk areas
- Maximizes test coverage with limited resources
- Ensures critical issues won't reach production

## THE 5-MINUTE PROCESS

### MINUTE 1: Define Business Risk
Answer these questions:
1. What's the worst thing that could happen if this breaks?
2. Which features are most visible to users/customers?
3. Which areas impact revenue/data integrity?

List the top 3 areas that emerged from these questions.

### MINUTE 2: Consider Technical Risk
For each high-business-risk area, consider:
1. What changed recently in this area?
2. Which parts have complex code/logic?
3. Which parts have been buggy in the past?

Add any new areas that emerged to your high-risk list.

### MINUTE 3: Prioritize Test Areas
Combine your business and technical risk assessments to create a prioritized list:
1. Critical: Must test thoroughly (business + technical risk)
2. High: Should test well (high risk in either category)
3. Medium: Test if time permits
4. Low: Minimal testing needed

### MINUTE 4: Select Test Approaches
For each priority level, choose appropriate test approaches:
- Critical: Thorough manual testing + automated tests
- High: Focused manual testing + key automated tests
- Medium: Key scenario testing
- Low: Smoke testing only

### MINUTE 5: Create Execution Plan
1. Allocate available time across priority levels (e.g., 60% Critical, 30% High, 10% Medium)
2. Identify who will perform each testing activity
3. Define what "done" means for each priority level
4. Determine how results will be reported

## OUTPUT
You now have a risk-based test strategy that:
- Focuses on what matters most
- Makes the best use of limited resources
- Can be communicated to stakeholders in 2 minutes
- Provides clear direction to the testing team`,
      fields: [
        {
          id: "projectName",
          label: "Project/Feature Name",
          type: "text",
          placeholder: "Name of the project or feature",
        },
        { id: "releaseDate", label: "Target Release Date", type: "date" },
        { id: "preparedBy", label: "Prepared By", type: "text", placeholder: "Your Name" },
        { id: "preparedDate", label: "Preparation Date", type: "date" },
        {
          id: "businessRisks",
          label: "Top Business Risks",
          type: "textarea",
          placeholder: "List the top 3 business risks",
        },
        {
          id: "technicalRisks",
          label: "Top Technical Risks",
          type: "textarea",
          placeholder: "List the top 3 technical risks",
        },
        {
          id: "criticalAreas",
          label: "Critical Test Areas",
          type: "textarea",
          placeholder: "List the critical areas that must be tested thoroughly",
        },
        {
          id: "highAreas",
          label: "High Priority Test Areas",
          type: "textarea",
          placeholder: "List the high priority areas that should be tested well",
        },
        {
          id: "timeAllocation",
          label: "Time Allocation",
          type: "textarea",
          placeholder: "How will you allocate the available testing time?",
        },
        {
          id: "additionalNotes",
          label: "Additional Notes",
          type: "textarea",
          placeholder: "Any additional notes or context for this test strategy",
        },
      ],
    },
    "quality-gates": {
      title: "Quality Gates for Startups",
      structure: `# QUALITY GATES FOR STARTUPS

## WHAT ARE QUALITY GATES?
Quality gates are lightweight checkpoints in the development process that validate quality criteria before work proceeds to the next stage. Unlike heavyweight processes, these are designed to:

- Take minimal time to implement
- Focus only on critical quality aspects
- Adapt to changing priorities
- Improve quality without adding bureaucracy

## IMPLEMENTATION GUIDE

### GATE 1: REQUIREMENTS REVIEW
**When:** Before development starts
**Time Required:** 15-30 minutes
**Who:** Product Owner, Tech Lead, optional QA representative

**Key Questions:**
1. Are acceptance criteria clear and testable?
2. Are edge cases and error scenarios defined?
3. Are there any security or performance implications?
4. Is the scope clear and appropriately sized?

**Output:** Refined user story with clear acceptance criteria

### GATE 2: DESIGN REVIEW
**When:** After initial technical design, before implementation
**Time Required:** 15-30 minutes
**Who:** Tech Lead, Senior Developer(s), optional QA representative

**Key Questions:**
1. Does the design address all requirements?
2. Are there any technical risks or dependencies?
3. Is the approach scalable and maintainable?
4. Are there any security considerations?

**Output:** Validated technical approach with identified risks

### GATE 3: CODE REVIEW
**When:** Before merging code
**Time Required:** 15-45 minutes
**Who:** Peer developer(s)

**Key Questions:**
1. Does the code implement the requirements correctly?
2. Does the code follow team standards and best practices?
3. Are there adequate unit tests?
4. Are there any performance or security concerns?

**Output:** Improved code quality and knowledge sharing

### GATE 4: QA VERIFICATION
**When:** After feature implementation, before release
**Time Required:** 30-60 minutes
**Who:** QA or developer performing testing role

**Key Questions:**
1. Do all acceptance criteria pass?
2. Have edge cases been tested?
3. Is there any regression in existing functionality?
4. Is the feature usable and intuitive?

**Output:** Verified feature ready for release

### GATE 5: RELEASE READINESS
**When:** Before deploying to production
**Time Required:** 15-30 minutes
**Who:** Tech Lead, Product Owner, QA representative

**Key Questions:**
1. Have all critical and high-priority bugs been fixed?
2. Has the feature been tested in a production-like environment?
3. Are monitoring and rollback plans in place?
4. Has documentation been updated?

**Output:** Go/No-Go decision for release

## ADAPTING TO YOUR NEEDS
- Start with just 2-3 gates that address your biggest quality pain points
- Keep the process lightweight and focused
- Adjust criteria based on project risk and importance
- Document decisions but minimize bureaucracy
- Review and improve the process regularly`,
      fields: [
        { id: "companyName", label: "Company Name", type: "text", placeholder: "Your startup's name" },
        {
          id: "productName",
          label: "Product/Project Name",
          type: "text",
          placeholder: "Name of the product or project",
        },
        { id: "teamSize", label: "Team Size", type: "number", placeholder: "Number of team members" },
        {
          id: "developmentMethodology",
          label: "Development Methodology",
          type: "text",
          placeholder: "e.g., Scrum, Kanban, Custom Agile",
        },
        {
          id: "currentPainPoints",
          label: "Current Quality Pain Points",
          type: "textarea",
          placeholder: "Describe your current quality challenges",
        },
        {
          id: "priorityGates",
          label: "Priority Gates to Implement",
          type: "textarea",
          placeholder: "Which quality gates would you prioritize implementing first?",
        },
        {
          id: "customCriteria",
          label: "Custom Gate Criteria",
          type: "textarea",
          placeholder: "Any custom criteria you'd like to add to the quality gates",
        },
        {
          id: "implementationNotes",
          label: "Implementation Notes",
          type: "textarea",
          placeholder: "Any notes on how you plan to implement these quality gates",
        },
      ],
    },
  }

  // Download button functionality
  const resourceButtons = document.querySelectorAll(".resource-button, .qa-preview-btn")
  resourceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Resource button clicked:", this.getAttribute("data-template"))
      const templateId = this.getAttribute("data-template")

      if (!templateId || !templateData[templateId]) {
        console.error(`Template data not found for ID: ${templateId}`)
        showNotification("Template not found", "error")
        return
      }

      openTemplateModal(templateId)
    })
  })

  // Function to open template modal
  function openTemplateModal(templateId) {
    const template = templateData[templateId]

    // Set modal title
    templateTitle.textContent = template.title

    // Set template structure
    templateStructure.textContent = template.structure

    // Generate form fields
    generateFormFields(templateId, template.fields)

    // Reset tabs
    structureTab.classList.add("active")
    contentTab.classList.remove("active")
    outputTab.classList.remove("active")
    structureContent.classList.add("active")
    contentContent.classList.remove("active")
    outputContent.classList.remove("active")

    // Clear output
    templateOutput.textContent = ""

    // Show modal with animation
    templateModal.style.display = "block"
    setTimeout(() => {
      templateModal.classList.add("show")
      document.body.style.overflow = "hidden"
    }, 10)
  }

  // Close modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      templateModal.classList.remove("show")
      setTimeout(() => {
        templateModal.style.display = "none"
        document.body.style.overflow = "auto"
      }, 300)
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === templateModal) {
      templateModal.classList.remove("show")
      setTimeout(() => {
        templateModal.style.display = "none"
        document.body.style.overflow = "auto"
      }, 300)
    }
  })

  // Tab navigation
  structureTab.addEventListener("click", () => {
    structureTab.classList.add("active")
    contentTab.classList.remove("active")
    outputTab.classList.remove("active")
    structureContent.classList.add("active")
    contentContent.classList.remove("active")
    outputContent.classList.remove("active")
  })

  contentTab.addEventListener("click", () => {
    structureTab.classList.remove("active")
    contentTab.classList.add("active")
    outputTab.classList.remove("active")
    structureContent.classList.remove("active")
    contentContent.classList.add("active")
    outputContent.classList.remove("active")
  })

  outputTab.addEventListener("click", () => {
    structureTab.classList.remove("active")
    contentTab.classList.remove("active")
    outputTab.classList.add("active")
    structureContent.classList.remove("active")
    contentContent.classList.remove("active")
    outputContent.classList.add("active")
  })

  // Next buttons
  nextStructureBtn.addEventListener("click", () => {
    structureTab.classList.remove("active")
    contentTab.classList.add("active")
    outputTab.classList.remove("active")
    structureContent.classList.remove("active")
    contentContent.classList.add("active")
    outputContent.classList.remove("active")
  })

  nextContentBtn.addEventListener("click", () => {
    // Generate output first
    generateOutput()

    structureTab.classList.remove("active")
    contentTab.classList.remove("active")
    outputTab.classList.add("active")
    structureContent.classList.remove("active")
    contentContent.classList.remove("active")
    outputContent.classList.add("active")
  })

  // Generate output
  generateOutputBtn.addEventListener("click", generateOutput)

  // Copy output
  copyOutputBtn.addEventListener("click", () => {
    const outputText = templateOutput.textContent
    if (!outputText) {
      showNotification("No content to copy", "error")
      return
    }

    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        showNotification("Content copied to clipboard!")
        copyOutputBtn.innerHTML = `
          <svg class="action-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Copied!
        `
        setTimeout(() => {
          copyOutputBtn.innerHTML = `
            <svg class="action-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
            </svg>
            Copy to Clipboard
          `
        }, 2000)
      })
      .catch((err) => {
        console.error("Could not copy text: ", err)
        showNotification("Failed to copy. Please try again.", "error")
      })
  })

  // Helper function to generate form fields
  function generateFormFields(templateId, fields) {
    if (!templateForm) return

    templateForm.innerHTML = ""
    templateForm.setAttribute("data-template", templateId)

    fields.forEach((field) => {
      const formGroup = document.createElement("div")
      formGroup.className = "form-group"

      const label = document.createElement("label")
      label.className = "form-label"
      label.setAttribute("for", field.id)
      label.textContent = field.label
      formGroup.appendChild(label)

      let input

      if (field.type === "textarea") {
        input = document.createElement("textarea")
        input.className = "form-input form-textarea"
        input.rows = 4
      } else if (field.type === "select") {
        input = document.createElement("select")
        input.className = "form-input"
        field.options.forEach((option) => {
          const optionElement = document.createElement("option")
          optionElement.value = option
          optionElement.textContent = option
          input.appendChild(optionElement)
        })
      } else {
        input = document.createElement("input")
        input.className = "form-input"
        input.type = field.type
      }

      input.id = field.id
      input.name = field.id

      if (field.placeholder) {
        input.placeholder = field.placeholder
      }

      if (field.min) {
        input.min = field.min
      }

      if (field.max) {
        input.max = field.max
      }

      formGroup.appendChild(input)
      templateForm.appendChild(formGroup)
    })
  }

  // Helper function to generate output
  function generateOutput() {
    const templateId = templateForm.getAttribute("data-template")
    if (!templateId || !templateData[templateId]) {
      console.error(`Template data not found for ID: ${templateId}`)
      showNotification("Template not found", "error")
      return
    }

    const template = templateData[templateId]
    let output = template.structure

    // Get form values
    const formData = {}
    template.fields.forEach((field) => {
      const input = document.getElementById(field.id)
      if (input) {
        formData[field.id] = input.value.trim()
      }
    })

    // Replace placeholders with form values
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        const value = formData[key]

        // Try to replace common placeholders based on the field ID
        if (key === "projectName") {
          output = output.replace(/\[Project Name\]/g, value)
        } else if (key === "preparedBy") {
          output = output.replace(/\[Your Name\]/g, value)
        } else if (key === "reportDate" || key === "preparedDate") {
          output = output.replace(/\[YYYY-MM-DD\]/g, value)
        } else if (key === "version") {
          output = output.replace(/\[Version or Sprint #\]/g, value)
        } else if (key === "description") {
          output = output.replace(/\[Provide a clear, concise description of the bug\]/g, value)
        } else if (key === "stepsToReproduce") {
          // Replace the steps placeholder with actual steps
          const steps = value
            .split("\n")
            .map((step, index) => `${index + 1}. ${step}`)
            .join("\n")
          output = output.replace(/1\. \[First step\]\n2\. \[Second step\]\n3\. \[Third step\]\n\.\.\./g, steps)
        } else if (key === "testingPeriodStart" && formData["testingPeriodEnd"]) {
          // Handle date range
          output = output.replace(
            /\[Start Date\] to \[End Date\]/g,
            `${formData["testingPeriodStart"]} to ${formData["testingPeriodEnd"]}`,
          )
        } else if (key === "executiveSummary") {
          output = output.replace(/\[1-2 sentences summarizing the overall quality status\]/g, value)
        } else if (key === "featureCoverage") {
          output = output.replace(/\[e\.g\., 85%\]/g, `${value}%`)
        } else if (key === "issueDescription") {
          output = output.replace(/\[Brief description of the issue\]/g, value)
        } else if (key === "expectedBehavior") {
          if (templateId === "user-bug-form") {
            output = output.replace(/\[What you expected the app\/site to do\]/g, value)
          } else {
            output = output.replace(/\[What should happen when the steps are followed correctly\]/g, value)
          }
        } else if (key === "actualBehavior") {
          output = output.replace(/\[What actually happens when the steps are followed\]/g, value)
        } else if (key === "deviceType") {
          output = output.replace(/\[Smartphone \/ Tablet \/ Laptop \/ Desktop \/ Other\]/g, value)
        } else if (key === "deviceModel") {
          output = output.replace(/\[e\.g\., iPhone 13 Pro, Dell XPS 15\]/g, value)
        } else if (key === "operatingSystem") {
          output = output.replace(/\[e\.g\., iOS 15\.4, Windows 11\]/g, value)
        } else if (key === "browser") {
          output = output.replace(/\[e\.g\., Chrome, Safari\]/g, value)
        } else if (key === "appVersion") {
          output = output.replace(/\[e\.g\., 2\.4\.1\]/g, value)
        } else if (key === "contactEmail") {
          output = output.replace(/\[Your email address if you'd like us to follow up\]/g, value)
        } else if (key === "additionalInfo") {
          output = output.replace(/\[Any other details that might help us understand the issue\]/g, value)
        }
      }
    })

    // Set output
    templateOutput.textContent = output

    // Show notification
    showNotification("Template generated successfully!")
  }

  // Helper function to show notification
  function showNotification(message, type = "success") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification")
    if (existingNotification) {
      existingNotification.remove()
    }

    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`

    // Set icon based on type
    let icon = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `

    if (type === "error") {
      icon = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      `
    }

    notification.innerHTML = `${icon} ${message}`

    // Add to document
    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  console.log("QA Toolkit Fixed JS loaded successfully!")
})
