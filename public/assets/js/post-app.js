// Initialize Supabase client
const { createClient } = window.supabase;
const supabaseUrl = 'https://mltpljjibkmxncsmqtie.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdHBsamppYmtteG5jc21xdGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzc5MjYsImV4cCI6MjA1NTYxMzkyNn0.5cHIVtarRAbwHy-hanBCz884_ZwkkvaIJ-P4pxQeCQo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Store editor instances
let editors = {};

document.addEventListener('DOMContentLoaded', () => {
  const jobForm = document.getElementById('jobForm');
  if (jobForm) {
    jobForm.addEventListener('submit', handleJobSubmission);
  }

  // Initialize CKEditor instances
  initializeRichTextEditors();
});

function initializeRichTextEditors() {
  document.querySelectorAll('.html-editor').forEach((element) => {
    ClassicEditor.create(element, {
      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'link',
        'blockQuote',
        '|',
        'undo',
        'redo',
      ],
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
        ],
      },
      placeholder: 'Type your content here...',
    })
      .then((editor) => {
        editors[element.id] = editor;

        // Handle paste events
        editor.editing.view.document.on('paste', (evt, data) => {
          // Get the pasted content
          const pastedText = data.dataTransfer.getData('text/plain');

          // Convert plain text bullet points to proper HTML list
          if (pastedText) {
            const lines = pastedText.split('\n');
            let formattedContent = '';
            let inList = false;

            lines.forEach((line) => {
              line = line.trim();
              // Check for bullet points or numbered lists
              if (
                line.match(
                  /^[\u2022\u2023\u2043\u204C\u204D\u2219\u25AA\u25CF\u25E6\u2043\u2022]\s+/
                )
              ) {
                // Bullet point
                if (!inList) {
                  formattedContent += '<ul>';
                  inList = true;
                }
                formattedContent += `<li>${line.replace(
                  /^[\u2022\u2023\u2043\u204C\u204D\u2219\u25AA\u25CF\u25E6\u2043\u2022]\s+/,
                  ''
                )}</li>`;
              } else if (line.match(/^\d+[\.\)]\s+/)) {
                // Numbered list
                if (!inList) {
                  formattedContent += '<ol>';
                  inList = true;
                }
                formattedContent += `<li>${line.replace(
                  /^\d+[\.\)]\s+/,
                  ''
                )}</li>`;
              } else {
                // Regular text
                if (inList) {
                  formattedContent +=
                    line.endsWith('</ul>') || line.endsWith('</ol>')
                      ? ''
                      : '</ul>';
                  inList = false;
                }
                formattedContent += `<p>${line}</p>`;
              }
            });

            if (inList) {
              formattedContent += '</ul>';
            }

            // Insert the formatted content
            const viewFragment = editor.data.processor.toView(formattedContent);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(modelFragment);

            // Prevent the default paste behavior
            evt.stop();
          }
        });

        // Add event listener to clean up content on input
        editor.model.document.on('change:data', () => {
          const content = editor.getData();
          if (content === '<p>&nbsp;</p>') {
            editor.setData('');
          }
        });
      })
      .catch((error) => {
        console.error('Error initializing editor:', error);
      });
  });
}

async function handleJobSubmission(event) {
  event.preventDefault();

  // Show loading state
  const submitButton = event.target.querySelector('button[type="submit"]');
  if (!submitButton) {
    console.error('Submit button not found');
    return;
  }

  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = 'Submitting...';

  try {
    // Get form data
    const formData = {
      title: getFormField('title'),
      company: getFormField('company'),
      location: getFormField('location'),
      description: getFormField('description'),
      solutions: getFormField('solutions'),
      jobType: getFormField('jobType'),
      source: getFormField('source'),
      companydetails: getFormField('companyDetails'),
      requirements: getFormField('requirements'),
      job_link: getFormField('jobLink'),
      posted_at: new Date().toISOString(),
    };

    // Log the formData for debugging
    console.log('Submitting form data:', formData);

    // Validate form data
    const validationError = validateFormData(formData);
    if (validationError) {
      throw new Error(validationError);
    }

    // Submit to Supabase
    const { data, error } = await supabase.from('jobs').insert([formData]);

    if (error) throw error;

    // Immediately redirect to jobBoard.html
    window.location.href = 'jobBoard.html';
  } catch (error) {
    console.error('Error submitting job:', error);
    showAlert('danger', `Error posting job: ${error.message}`);
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
}

function validateFormData(formData) {
  if (!formData.title) return 'Job title is required';
  if (!formData.company) return 'Company name is required';
  if (!formData.location) return 'Location is required';
  if (!formData.description) return 'Job description is required';
  if (!formData.requirements) return 'Job requirements are required';
  if (!formData.solutions) return 'At least one solution is required';
  if (!formData.jobType) return 'Job type is required';
  if (!formData.job_link) return 'Job link is required or put N/A';

  // Additional HTML content validation
  if (formData.requirements.length > 50000)
    return 'Requirements content is too long';
  if (formData.companyDetails && formData.companyDetails.length > 50000)
    return 'Company details content is too long';

  return null;
}

function getFormField(fieldId) {
  // Check if it's a CKEditor field
  if (editors[fieldId]) {
    let content = editors[fieldId].getData().trim();

    // Clean up empty list items and extra spaces
    content = content
      .replace(/<li>&nbsp;<\/li>/g, '') // Remove empty list items with &nbsp;
      .replace(/<li>\s*<\/li>/g, '') // Remove empty list items
      .replace(/\n\s*\n/g, '\n') // Remove multiple blank lines
      .replace(/^\s+|\s+$/g, ''); // Trim whitespace

    // If the content is just an empty list, return empty string
    if (content === '<ul></ul>' || content === '<ol></ol>') {
      return '';
    }

    return content;
  }

  // Regular form field
  const field = document.getElementById(fieldId);
  if (!field) {
    throw new Error(`Form field '${fieldId}' not found`);
  }

  // Handle multiple select
  if (field.multiple) {
    return Array.from(field.selectedOptions)
      .map((option) => option.value)
      .join(', ');
  }
  return field.value.trim();
}

function cleanHtml(html) {
  if (!html) return '';

  // Define allowed tags and their allowed attributes
  const allowedTags = {
    p: [],
    br: [],
    ul: [],
    ol: [],
    li: [],
    b: [],
    strong: [],
    i: [],
    em: [],
    a: ['href'],
  };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function cleanNode(node) {
    if (node.nodeType === 3) return node.textContent; // Text node
    if (node.nodeType !== 1) return ''; // Not an element node

    const tagName = node.tagName.toLowerCase();
    if (!allowedTags[tagName]) {
      return node.textContent;
    }

    const cleanedNode = document.createElement(tagName);

    // Copy allowed attributes
    if (allowedTags[tagName].length > 0) {
      allowedTags[tagName].forEach((attr) => {
        if (node.hasAttribute(attr)) {
          cleanedNode.setAttribute(attr, node.getAttribute(attr));
        }
      });
    }

    // Clean child nodes
    Array.from(node.childNodes).forEach((child) => {
      const cleanedChild = cleanNode(child);
      if (cleanedChild) {
        if (typeof cleanedChild === 'string') {
          cleanedNode.appendChild(document.createTextNode(cleanedChild));
        } else {
          cleanedNode.appendChild(cleanedChild);
        }
      }
    });

    return cleanedNode;
  }

  return Array.from(doc.body.childNodes)
    .map((node) => {
      const cleaned = cleanNode(node);
      return cleaned instanceof Node ? cleaned.outerHTML : cleaned;
    })
    .join('');
}
function showAlert(type, message) {
  // Remove any existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Create new alert
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Insert alert before the form
  const form = document.getElementById('jobForm');
  if (form) {
    form.parentNode.insertBefore(alertDiv, form);
  }

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.classList.remove('show');
    setTimeout(() => alertDiv.remove(), 150);
  }, 5000);
}

// Clean HTML content
function cleanHtml(html) {
  if (!html) return '';

  // Define allowed tags and their allowed attributes
  const allowedTags = {
    p: [],
    br: [],
    ul: [],
    ol: [],
    li: [],
    b: [],
    strong: [],
    i: [],
    em: [],
    a: ['href'],
  };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function cleanNode(node) {
    if (node.nodeType === 3) return node.textContent; // Text node
    if (node.nodeType !== 1) return ''; // Not an element node

    const tagName = node.tagName.toLowerCase();
    if (!allowedTags[tagName]) {
      return node.textContent;
    }

    const cleanedNode = document.createElement(tagName);

    // Copy allowed attributes
    if (allowedTags[tagName].length > 0) {
      allowedTags[tagName].forEach((attr) => {
        if (node.hasAttribute(attr)) {
          cleanedNode.setAttribute(attr, node.getAttribute(attr));
        }
      });
    }

    // Clean child nodes
    Array.from(node.childNodes).forEach((child) => {
      const cleanedChild = cleanNode(child);
      if (cleanedChild) {
        if (typeof cleanedChild === 'string') {
          cleanedNode.appendChild(document.createTextNode(cleanedChild));
        } else {
          cleanedNode.appendChild(cleanedChild);
        }
      }
    });

    return cleanedNode;
  }

  return Array.from(doc.body.childNodes)
    .map((node) => {
      const cleaned = cleanNode(node);
      return cleaned instanceof Node ? cleaned.outerHTML : cleaned;
    })
    .join('');
}
