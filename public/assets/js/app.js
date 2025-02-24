// Global constants and variables
const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let totalJobs = 0;
let jobsData = [];
let filters = {
  jobType: '',
  experienceLevel: '',
  keyword: '',
};
let summaryTimeoutId = null;

// Initialize Supabase client
const { createClient } = window.supabase;
const supabaseUrl = 'https://mltpljjibkmxncsmqtie.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdHBsamppYmtteG5jc21xdGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzc5MjYsImV4cCI6MjA1NTYxMzkyNn0.5cHIVtarRAbwHy-hanBCz884_ZwkkvaIJ-P4pxQeCQo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');

  // Add filter event listeners
  const filterElements = {
    jobType: document.getElementById('filterJobType'),
    experience: document.getElementById('filterExperience'),
    keyword: document.getElementById('searchKeyword'),
  };

  console.log('Filter elements:', filterElements);

  if (filterElements.jobType) {
    filterElements.jobType.addEventListener('change', updateFilters);
  }
  if (filterElements.experience) {
    filterElements.experience.addEventListener('change', updateFilters);
  }
  if (filterElements.keyword) {
    filterElements.keyword.addEventListener('input', updateFilters);
    updateSearchPlaceholder();
  }

  // Load initial jobs
  loadJobs();
});

// Function to load jobs
async function loadJobs() {
  console.log('Loading jobs...');
  try {
    const response = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    const { data: jobs, error } = response;

    if (error) throw error;

    jobsData = jobs;
    console.log('Loaded jobs:', jobsData);
    displayJobs(jobsData);
  } catch (error) {
    console.error('Error loading jobs:', error);
    alert('Error loading jobs: ' + error.message);
  }
}

// Function to update filters
function updateFilters() {
  filters = {
    jobType: document.getElementById('filterJobType')?.value || '',
    experienceLevel: document.getElementById('filterExperience')?.value || '',
    keyword:
      document.getElementById('searchKeyword')?.value.toLowerCase() || '',
  };

  console.log('Filters updated:', filters);
  const filteredJobs = filterJobs(jobsData);
  currentPage = 1;
  displayJobs(filteredJobs);
}

// Function to reset filters
function resetFilters() {
  document.getElementById('filterJobType').value = '';
  document.getElementById('filterExperience').value = '';
  document.getElementById('searchKeyword').value = '';
  updateFilters();
}

// Function to filter jobs
function filterJobs(jobs) {
  if (!jobs) return [];

  return jobs.filter((job) => {
    const matchesJobType =
      !filters.jobType ||
      (job.jobType &&
        job.jobType.toLowerCase().includes(filters.jobType.toLowerCase()));

    const matchesExperience =
      !filters.experienceLevel ||
      job.experienceLevel === filters.experienceLevel;

    const searchTerms = filters.keyword.toLowerCase().split(' ');
    const matchesKeyword =
      !filters.keyword ||
      searchTerms.every(
        (term) =>
          job.title?.toLowerCase().includes(term) ||
          job.company?.toLowerCase().includes(term) ||
          job.description?.toLowerCase().includes(term) ||
          job.jobType?.toLowerCase().includes(term)
      );

    return matchesJobType && matchesExperience && matchesKeyword;
  });
}

//Function to update the search place holder
function updateSearchPlaceholder() {
  const searchInput = document.getElementById('searchKeyword');
  if (searchInput) {
    searchInput.placeholder = 'Search by title, company, or solution...';
  }
}

// Function to format time ago
function formatTimeAgo(dateString) {
  if (!dateString) return 'Recently';

  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
}

// Function to display jobs
function displayJobs(jobs) {
  console.log('Displaying jobs...', jobs);
  const jobList = document.getElementById('jobList');
  if (!jobList) return;

  totalJobs = jobs.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedJobs = jobs.slice(startIndex, endIndex);

  if (paginatedJobs.length === 0) {
    jobList.innerHTML = `
      <div class="alert alert-info">
        No jobs found matching your criteria. Try adjusting your filters.
      </div>
    `;
    displayPagination(0);
    updateSummary(0);
    return;
  }

  jobList.innerHTML = `
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Location</th>
          <th>Solutions</th>
          <th>Experience</th>
          <th>Source</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${paginatedJobs
          .map(
            (job) => `
          <tr>
            <td>
              <strong>${job.title || 'N/A'}</strong>
              ${
                job.company
                  ? `<br><small class="text-muted">${job.company}</small>`
                  : ''
              }
            </td>
            <td>${job.location || 'N/A'}</td>
            <td>${formatJobTypes(job.jobType || '')}</td>
            <td><span class="badge bg-secondary">${
              job.experienceLevel || 'N/A'
            }</span></td>
            <td><span class="badge bg-success">${
              job.source || 'Direct'
            }</span></td>
            <td>
              <a href="job-details.html?id=${job.id}" 
                class="btn btn-primary btn-sm text-white text-decoration-none">
                View Details
              </a>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;

  updateSummary(totalJobs);
  displayPagination(jobs.length);
}

// Helper function to format job types
function formatJobTypes(jobTypeString) {
  if (!jobTypeString) return '<span class="badge bg-primary">N/A</span>';

  return jobTypeString
    .split(',')
    .map((type) => type.trim())
    .filter((type) => type) // Remove empty strings
    .map((type) => `<span class="badge bg-primary me-1">${type}</span>`)
    .join('');
}

// Function to display pagination
function displayPagination(totalItems) {
  const paginationDiv = document.getElementById('pagination');
  if (!paginationDiv) return;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (totalPages <= 1) {
    paginationDiv.innerHTML = '';
    return;
  }

  let paginationHTML = `
    <nav aria-label="Job listings pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <button class="btn btn-primary btn-sm mx-1" 
            onclick="changePage(${currentPage - 1})" 
            ${currentPage === 1 ? 'disabled' : ''}>
            Previous
          </button>
        </li>
  `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <li class="page-item ${currentPage === i ? 'active' : ''} mx-1">
        <button class="btn ${
          currentPage === i ? 'btn-primary' : 'btn-outline-primary'
        } btn-sm"
          onclick="changePage(${i})">
          ${i}
        </button>
      </li>
    `;
  }

  paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <button class="btn btn-primary btn-sm mx-1" 
            onclick="changePage(${currentPage + 1})" 
            ${currentPage === totalPages ? 'disabled' : ''}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  `;

  paginationDiv.innerHTML = paginationHTML;
}

// Function to change page
function changePage(newPage) {
  const filteredJobs = filterJobs(jobsData);
  const maxPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  if (newPage >= 1 && newPage <= maxPages) {
    currentPage = newPage;
    displayJobs(filteredJobs);
  }
}

// Function to update summary
function updateSummary(total) {
  const summaryDiv =
    document.getElementById('jobsSummary') || createSummaryDiv();
  summaryDiv.innerHTML = `
    <div class="alert alert-info">
      Found ${total} job${total !== 1 ? 's' : ''} total
    </div>
  `;

  if (summaryTimeoutId) {
    clearTimeout(summaryTimeoutId);
  }

  summaryTimeoutId = setTimeout(() => {
    summaryDiv.style.transition = 'opacity 0.5s ease-out';
    summaryDiv.style.opacity = '0';
    setTimeout(() => {
      summaryDiv.remove();
    }, 500);
  }, 10000);
}

// Function to create summary div
function createSummaryDiv() {
  const summaryDiv = document.createElement('div');
  summaryDiv.id = 'jobsSummary';
  summaryDiv.style.transition = 'opacity 0.5s ease-out';
  summaryDiv.style.opacity = '1';
  const jobList = document.getElementById('jobList');
  if (jobList) {
    jobList.parentNode.insertBefore(summaryDiv, jobList);
  }
  return summaryDiv;
}

// Function to sanitize HTML
function sanitizeHTML(html) {
  const allowedTags = {
    p: [],
    br: [],
    ul: [],
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
    if (node.nodeType === 3) return node.textContent;
    if (node.nodeType !== 1) return '';

    const tagName = node.tagName.toLowerCase();
    if (!allowedTags[tagName]) {
      return node.textContent;
    }

    const cleanedNode = document.createElement(tagName);

    if (allowedTags[tagName].length > 0) {
      allowedTags[tagName].forEach((attr) => {
        if (node.hasAttribute(attr)) {
          cleanedNode.setAttribute(attr, node.getAttribute(attr));
        }
      });
    }

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
