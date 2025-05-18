/**
 * QA Toolkit specific JavaScript functionality
 */

document.addEventListener("DOMContentLoaded", () => {
  // Category tabs functionality
  const categoryTabs = document.querySelectorAll(".qa-category-tab")
  const categoryContents = document.querySelectorAll(".qa-category-content")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all category contents
      categoryContents.forEach((content) => content.classList.remove("active"))

      // Show the corresponding content
      const categoryId = tab.getAttribute("data-category")
      document.getElementById(categoryId).classList.add("active")
    })
  })

  // Template preview functionality
  const previewButtons = document.querySelectorAll(".qa-preview-btn")
  const modal = document.getElementById("qa-template-preview-modal")
  const closeModal = document.querySelector(".qa-close-modal")
  const previewTitle = document.getElementById("qa-preview-title")
  const previewContent = document.getElementById("qa-template-preview-content")
  const modalDownloadBtn = document.getElementById("qa-modal-download-btn")

  previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const templateId = button.getAttribute("data-template")
      const templateName = button.closest(".qa-template-card").querySelector("h3").textContent

      // Set the modal title
      previewTitle.textContent = templateName + " Preview"

      // Load the template preview content
      loadTemplatePreview(templateId)

      // Set the download button data
      modalDownloadBtn.setAttribute("data-template", templateId)
      modalDownloadBtn.setAttribute(
        "data-format",
        button.closest(".qa-template-card").querySelector(".qa-download-btn").getAttribute("data-format"),
      )

      // Show the modal
      modal.style.display = "block"

      // Prevent scrolling on the body
      document.body.style.overflow = "hidden"
    })
  })

  // Close modal functionality
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Download buttons functionality
  const downloadButtons = document.querySelectorAll(".qa-download-btn")

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const templateId = button.getAttribute("data-template")
      const format = button.getAttribute("data-format")
      downloadTemplate(templateId, format)
    })
  })

  // Modal download button
  if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener("click", () => {
      const templateId = modalDownloadBtn.getAttribute("data-template")
      const format = modalDownloadBtn.getAttribute("data-format")
      downloadTemplate(templateId, format)
    })
  }

  // Function to load template preview
  function loadTemplatePreview(templateId) {
    // In a real implementation, this would fetch the template content from the server
    // For now, we'll use placeholder content based on the template ID

    let previewHTML = ""

    switch (templateId) {
      case "comprehensive-test-plan":
        previewHTML = generateTestPlanPreview("Comprehensive Test Plan")
        break
      case "agile-test-plan":
        previewHTML = generateTestPlanPreview("Agile Test Plan")
        break
      case "mobile-app-test-plan":
        previewHTML = generateTestPlanPreview("Mobile App Test Plan")
        break
      case "functional-test-cases":
        previewHTML = generateTestCasesPreview("Functional Test Cases")
        break
      case "api-test-cases":
        previewHTML = generateTestCasesPreview("API Test Cases")
        break
      case "security-test-cases":
        previewHTML = generateTestCasesPreview("Security Test Cases")
        break
      case "web-app-checklist":
        previewHTML = generateChecklistPreview("Web App Checklist")
        break
      case "accessibility-checklist":
        previewHTML = generateChecklistPreview("Accessibility Checklist")
        break
      case "performance-checklist":
        previewHTML = generateChecklistPreview("Performance Checklist")
        break
      case "bug-report-template":
        previewHTML = generateBugReportPreview()
        break
      case "test-summary-report":
        previewHTML = generateReportPreview("Test Summary Report")
        break
      case "test-strategy-template":
        previewHTML = generateReportPreview("Test Strategy Template")
        break
      default:
        previewHTML = "<p>Preview not available for this template.</p>"
    }

    previewContent.innerHTML = previewHTML
  }

  // Function to download template
  function downloadTemplate(templateId, format) {
    // In a real implementation, this would trigger a download of the actual template file
    // For now, we'll simulate a download by creating a blob and triggering a download

    let content = ""
    let filename = ""
    let mimeType = ""

    // Set the appropriate MIME type based on the format
    switch (format) {
      case "docx":
        mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        break
      case "xlsx":
        mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        break
      case "pdf":
        mimeType = "application/pdf"
        break
      default:
        mimeType = "text/plain"
    }

    // Generate content based on template ID (in a real implementation, this would be the actual template content)
    switch (templateId) {
      case "comprehensive-test-plan":
        content = "Comprehensive Test Plan Template Content"
        filename = "comprehensive-test-plan." + format
        break
      case "agile-test-plan":
        content = "Agile Test Plan Template Content"
        filename = "agile-test-plan." + format
        break
      case "mobile-app-test-plan":
        content = "Mobile App Test Plan Template Content"
        filename = "mobile-app-test-plan." + format
        break
      case "functional-test-cases":
        content = "Functional Test Cases Template Content"
        filename = "functional-test-cases." + format
        break
      case "api-test-cases":
        content = "API Test Cases Template Content"
        filename = "api-test-cases." + format
        break
      case "security-test-cases":
        content = "Security Test Cases Template Content"
        filename = "security-test-cases." + format
        break
      case "web-app-checklist":
        content = "Web App Checklist Template Content"
        filename = "web-app-checklist." + format
        break
      case "accessibility-checklist":
        content = "Accessibility Checklist Template Content"
        filename = "accessibility-checklist." + format
        break
      case "performance-checklist":
        content = "Performance Checklist Template Content"
        filename = "performance-checklist." + format
        break
      case "bug-report-template":
        content = "Bug Report Template Content"
        filename = "bug-report-template." + format
        break
      case "test-summary-report":
        content = "Test Summary Report Template Content"
        filename = "test-summary-report." + format
        break
      case "test-strategy-template":
        content = "Test Strategy Template Content"
        filename = "test-strategy-template." + format
        break
      default:
        content = "Template content not available."
        filename = "template." + format
    }

    // In a real implementation, you would serve actual files
    // For this demo, we'll create a simple text file with the template name
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)

    // Show a success message
    alert(
      `Template "${filename}" has been downloaded. In a real implementation, this would be an actual ${format.toUpperCase()} file.`,
    )
  }

  // Helper functions to generate preview content
  function generateTestPlanPreview(title) {
    return `
            <div style="font-family: Arial, sans-serif;">
                <h1 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">${title}</h1>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">1. Introduction</h2>
                    <p><strong>1.1 Purpose</strong><br>This document outlines the test plan for [Project Name]. It defines the testing approach, resources, schedule, and deliverables.</p>
                    <p><strong>1.2 Scope</strong><br>This test plan covers [describe scope of testing].</p>
                    <p><strong>1.3 References</strong><br>[List any reference documents]</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">2. Test Strategy</h2>
                    <p><strong>2.1 Testing Levels</strong><br>[Describe the levels of testing to be performed]</p>
                    <p><strong>2.2 Testing Types</strong><br>[Describe the types of testing to be performed]</p>
                    <p><strong>2.3 Test Environment</strong><br>[Describe the test environment requirements]</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">3. Test Schedule</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Activity</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Start Date</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">End Date</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Test Planning</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">DD/MM/YYYY</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">DD/MM/YYYY</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Name]</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Test Case Development</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">DD/MM/YYYY</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">DD/MM/YYYY</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Name]</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Test Execution</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">DD/MM/YYYY</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">DD/MM/YYYY</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Name]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">4. Resources</h2>
                    <p><strong>4.1 Team</strong><br>[List team members and their roles]</p>
                    <p><strong>4.2 Hardware</strong><br>[List hardware requirements]</p>
                    <p><strong>4.3 Software</strong><br>[List software requirements]</p>
                </div>
                
                <div>
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">5. Risks and Mitigations</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Risk</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Impact</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Mitigation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Risk 1]</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Impact]</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Mitigation Strategy]</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Risk 2]</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Impact]</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[Mitigation Strategy]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
  }

  function generateTestCasesPreview(title) {
    return `
            <div style="font-family: Arial, sans-serif;">
                <h1 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">${title}</h1>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background-color: #f1f5f9;">
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">ID</th>
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Test Case</th>
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Description</th>
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Preconditions</th>
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Test Steps</th>
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Expected Result</th>
                            <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">TC-001</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Verify Login with Valid Credentials</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Test login functionality with valid username and password</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">User account exists in the system</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">
                                1. Navigate to login page<br>
                                2. Enter valid username<br>
                                3. Enter valid password<br>
                                4. Click login button
                            </td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">User is successfully logged in and redirected to dashboard</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Not Executed</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">TC-002</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Verify Login with Invalid Credentials</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Test login functionality with invalid username and password</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">None</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">
                                1. Navigate to login page<br>
                                2. Enter invalid username<br>
                                3. Enter invalid password<br>
                                4. Click login button
                            </td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Error message is displayed and user remains on login page</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Not Executed</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">TC-003</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Verify Password Reset</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Test password reset functionality</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">User account exists in the system</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">
                                1. Navigate to login page<br>
                                2. Click "Forgot Password" link<br>
                                3. Enter registered email<br>
                                4. Click submit button
                            </td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Password reset email is sent to the user's email address</td>
                            <td style="border: 1px solid #cbd5e1; padding: 10px;">Not Executed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
  }

  function generateChecklistPreview(title) {
    return `
            <div style="font-family: Arial, sans-serif;">
                <h1 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">${title}</h1>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">Instructions</h2>
                    <p>Use this checklist to verify that all aspects of the application have been tested. Mark each item as "Pass", "Fail", or "N/A" as appropriate.</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">1. Functionality</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Item</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Status</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">All links are working correctly</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">All forms submit correctly</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">All buttons perform expected actions</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">All error messages are displayed correctly</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">2. Usability</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Item</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Status</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Navigation is intuitive</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">UI is consistent across all pages</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Font sizes and colors are appropriate</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div>
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">3. Compatibility</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Item</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Status</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Works in Chrome</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Works in Firefox</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Works in Safari</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Works in Edge</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Responsive on mobile devices</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Responsive on tablets</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">[ ] Pass [ ] Fail [ ] N/A</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
  }

  function generateBugReportPreview() {
    return `
            <div style="font-family: Arial, sans-serif;">
                <h1 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">Bug Report Template</h1>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Bug ID:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">[Auto-generated]</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Title:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">[Brief description of the bug]</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Reported By:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">[Your Name]</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Date Reported:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">[DD/MM/YYYY]</div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Severity:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [ ] Critical [ ] High [ ] Medium [ ] Low
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Priority:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [ ] High [ ] Medium [ ] Low
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Environment:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        <p><strong>OS:</strong> [Operating System and Version]</p>
                        <p><strong>Browser:</strong> [Browser and Version]</p>
                        <p><strong>Device:</strong> [Device Type]</p>
                        <p><strong>App Version:</strong> [Application Version]</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Description:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [Detailed description of the bug]
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Steps to Reproduce:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        <ol>
                            <li>[Step 1]</li>
                            <li>[Step 2]</li>
                            <li>[Step 3]</li>
                        </ol>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Expected Result:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [What should happen when the steps are followed]
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Actual Result:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [What actually happens when the steps are followed]
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Screenshots/Videos:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [Attach screenshots or videos if available]
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="margin-bottom: 5px;">Additional Information:</h3>
                    <div style="border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
                        [Any additional information that might be helpful]
                    </div>
                </div>
            </div>
        `
  }

  function generateReportPreview(title) {
    return `
            <div style="font-family: Arial, sans-serif;">
                <h1 style="color: #4f46e5; text-align: center; margin-bottom: 30px;">${title}</h1>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">1. Executive Summary</h2>
                    <p>This section provides a high-level summary of the testing activities and results. It should be concise and highlight the most important findings.</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">2. Test Scope</h2>
                    <p>This section describes what was tested and what was not tested. It should clearly define the boundaries of the testing effort.</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">3. Test Results Summary</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Test Type</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Total Tests</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Passed</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Failed</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Blocked</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Not Run</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Functional</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">50</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">45</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">3</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Performance</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">10</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">8</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Security</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">15</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">12</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">1</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div style="margin-bottom: 30px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">4. Defect Summary</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <thead>
                            <tr style="background-color: #f1f5f9;">
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Severity</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Total</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Open</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Fixed</th>
                                <th style="border: 1px solid #cbd5e1; padding: 10px; text-align: left;">Deferred</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Critical</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">1</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">1</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">High</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">3</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">1</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">0</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Medium</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">5</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">1</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">Low</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">8</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">3</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">2</td>
                                <td style="border: 1px solid #cbd5e1; padding: 10px;">3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div>
                    <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">5. Conclusion and Recommendations</h2>
                    <p>This section provides a conclusion based on the test results and recommendations for next steps. It should address whether the application is ready for release and any actions that should be taken before release.</p>
                </div>
            </div>
        `
  }
})
