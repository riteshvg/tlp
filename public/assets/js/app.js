// Initialize Supabase client
const { createClient } = window.supabase;
const supabaseUrl = 'https://mltpljjibkmxncsmqtie.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdHBsamppYmtteG5jc21xdGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzc5MjYsImV4cCI6MjA1NTYxMzkyNn0.5cHIVtarRAbwHy-hanBCz884_ZwkkvaIJ-P4pxQeCQo';
const supabase = createClient(supabaseUrl, supabaseKey);

// Constants
const ITEMS_PER_PAGE = 10;

// Global variables
let currentPage = 1;
let totalJobs = 0;
let jobsData = [];
let summaryTimeoutId = null;

// Default filters
const filters = {
  keyword: '',
  jobType: '',
  solutions: '',
};

// Function to filter jobs
function filterJobs(jobs) {
  if (!jobs) return [];

  return jobs.filter((job) => {
    // Job Type filter
    const matchesJobType =
      !filters.jobType ||
      (job.jobType &&
        job.jobType.toLowerCase() === filters.jobType.toLowerCase());

    // Solutions filter - Split solutions into array and check if any match
    const matchesSolutions =
      !filters.solutions ||
      (job.solutions &&
        job.solutions
          .toLowerCase()
          .split(',')
          .some((solution) =>
            solution.trim().includes(filters.solutions.toLowerCase())
          ));

    // Keyword search across multiple fields
    const searchTerms = filters.keyword.toLowerCase().split(' ');
    const searchableContent = [
      job.title || '',
      job.company || '',
      job.description || '',
      job.solutions || '',
      job.location || '',
    ]
      .join(' ')
      .toLowerCase();

    const matchesKeyword =
      !filters.keyword ||
      searchTerms.every((term) => searchableContent.includes(term));

    return matchesJobType && matchesSolutions && matchesKeyword;
  });
}

// Function to handle filter changes
function handleFilterChange(event) {
  const searchInput = document.getElementById('searchKeyword');
  const jobTypeSelect = document.getElementById('filterJobType');
  const solutionsSelect = document.getElementById('filterSolutions');

  // Update filters
  filters.keyword = searchInput ? searchInput.value.trim() : '';
  filters.jobType = jobTypeSelect ? jobTypeSelect.value : '';
  filters.solutions = solutionsSelect ? solutionsSelect.value : '';

  // Reset to first page
  currentPage = 1;

  // Apply filters and update display
  const filteredJobs = filterJobs(jobsData);
  displayJobs(filteredJobs);
}

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
          <th>Job Type</th>
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
            <td>${formatSolutions(job.solutions || '')}</td>
            <td><span class="badge bg-secondary">${
              job.jobType || 'Not Specified'
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

// Helper function to format solutions
function formatSolutions(solutions) {
  if (!solutions) return 'Not Specified';
  return solutions
    .split(',')
    .map(
      (solution) => `<span class="badge bg-info me-1">${solution.trim()}</span>`
    )
    .join(' ');
}

// Function to update the jobs summary
function updateSummary(total) {
  const summaryElement = document.getElementById('jobsSummary');
  if (summaryElement) {
    summaryElement.textContent = `Found ${total} job${total !== 1 ? 's' : ''}`;
  }
}

// Function to display pagination
function displayPagination(totalItems) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let paginationHTML = '<ul class="pagination justify-content-center">';

  // Previous button
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
    </li>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }

  // Next button
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
    </li>
  `;

  paginationHTML += '</ul>';
  paginationContainer.innerHTML = paginationHTML;

  // Add event listeners to pagination links
  paginationContainer.querySelectorAll('.page-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newPage = parseInt(e.target.dataset.page);
      if (
        newPage &&
        newPage !== currentPage &&
        newPage > 0 &&
        newPage <= totalPages
      ) {
        currentPage = newPage;
        const filteredJobs = filterJobs(jobsData);
        displayJobs(filteredJobs);
      }
    });
  });
}

// Function to update search placeholder
function updateSearchPlaceholder() {
  const searchInput = document.getElementById('searchKeyword');
  if (searchInput) {
    searchInput.placeholder = 'Search by title, company, or location...';
  }
}

// Debounce function for search input
function debounce(func, wait) {
  let timeout;
  return function executedFunction(event) {
    const later = () => {
      clearTimeout(timeout);
      func(event);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to load jobs
async function loadJobs() {
  try {
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) throw error;

    jobsData = jobs || [];
    displayJobs(jobsData);
  } catch (error) {
    console.error('Error loading jobs:', error);
    const jobList = document.getElementById('jobList');
    if (jobList) {
      jobList.innerHTML = `
        <div class="alert alert-danger">
          Error loading jobs. Please try again later.
        </div>
      `;
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize search placeholder
  updateSearchPlaceholder();

  // Add event listeners for filters
  const searchInput = document.getElementById('searchKeyword');
  const jobTypeSelect = document.getElementById('filterJobType');
  const solutionsSelect = document.getElementById('filterSolutions');

  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleFilterChange, 300));
  }

  if (jobTypeSelect) {
    jobTypeSelect.addEventListener('change', handleFilterChange);
  }

  if (solutionsSelect) {
    solutionsSelect.addEventListener('change', handleFilterChange);
  }

  // Load initial jobs
  loadJobs();
});
