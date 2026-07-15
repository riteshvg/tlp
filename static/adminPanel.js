// Initialize Supabase client
const SUPABASE_URL = 'your-supabase-url';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdHBsamppYmtteG5jc21xdGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzc5MjYsImV4cCI6MjA1NTYxMzkyNn0.5cHIVtarRAbwHy-hanBCz884_ZwkkvaIJ-P4pxQeCQo;
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM elements
const jobsList = document.getElementById('jobs-list');
const addJobBtn = document.getElementById('add-job-btn');
const logoutBtn = document.getElementById('logout-btn');
const jobModal = document.getElementById('job-modal');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancel-btn');
const jobForm = document.getElementById('job-form');
const modalTitle = document.getElementById('modal-title');

// Current jobs data
let jobs = [];

document.addEventListener('DOMContentLoaded', function () {
  // Check authentication
  checkAuth();

  // Event listeners
  addJobBtn.addEventListener('click', openAddJobModal);
  logoutBtn.addEventListener('click', handleLogout);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  jobForm.addEventListener('submit', handleSaveJob);

  // Close modal when clicking outside
  window.addEventListener('click', function (e) {
    if (e.target === jobModal) {
      closeModal();
    }
  });
});

async function checkAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Not logged in, redirect to login page
    window.location.href = 'admin-login.html';
    return;
  }

  // Check if user has admin role
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (userError || userData.role !== 'admin') {
    // Not an admin, sign out and redirect
    await supabase.auth.signOut();
    window.location.href = 'admin-login.html';
    return;
  }

  // Load jobs
  loadJobs();
}

async function loadJobs() {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) throw error;

    jobs = data;
    renderJobs();
  } catch (error) {
    console.error('Error loading jobs:', error);
  }
}

function renderJobs() {
  jobsList.innerHTML = '';

  jobs.forEach((job) => {
    const row = document.createElement('tr');

    const postedDate = new Date(job.posted_at).toLocaleDateString();
    const statusClass =
      job.status === 'active' ? 'status-active' : 'status-inactive';

    row.innerHTML = `
      <td>${job.title}</td>
      <td>${job.company}</td>
      <td>${job.location}</td>
      <td>${postedDate}</td>
      <td><span class="${statusClass}">${job.status}</span></td>
      <td>
        <button class="action-btn edit-btn" data-id="${job.id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn toggle-btn" data-id="${
          job.id
        }" data-status="${job.status}">
          <i class="fas ${
            job.status === 'active' ? 'fa-eye-slash' : 'fa-eye'
          }"></i>
        </button>
        <button class="action-btn delete-btn" data-id="${job.id}">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    // Add event listeners to buttons
    jobsList.appendChild(row);
  });

  // Add event listeners to action buttons
  document.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', () => openEditJobModal(btn.dataset.id));
  });

  document.querySelectorAll('.toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () =>
      toggleJobStatus(btn.dataset.id, btn.dataset.status)
    );
  });

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => confirmDeleteJob(btn.dataset.id));
  });
}

function openAddJobModal() {
  modalTitle.textContent = 'Add New Job';
  jobForm.reset();
  document.getElementById('job-id').value = '';
  document.getElementById('job-status').value = 'active';
  jobModal.style.display = 'block';
}

function openEditJobModal(jobId) {
  const job = jobs.find((j) => j.id.toString() === jobId);
  if (!job) return;

  modalTitle.textContent = 'Edit Job';

  document.getElementById('job-id').value = job.id;
  document.getElementById('job-title').value = job.title;
  document.getElementById('job-company').value = job.company;
  document.getElementById('job-location').value = job.location;
  document.getElementById('job-type').value = job.jobType || '';
  document.getElementById('job-description').value = job.description;
  document.getElementById('job-requirements').value = job.requirements;
  document.getElementById('job-link').value = job.job_link || '';
  document.getElementById('job-status').value = job.status;

  jobModal.style.display = 'block';
}

function closeModal() {
  jobModal.style.display = 'none';
}

async function handleSaveJob(e) {
  e.preventDefault();

  const jobId = document.getElementById('job-id').value;
  const isNewJob = !jobId;

  const jobData = {
    title: document.getElementById('job-title').value,
    company: document.getElementById('job-company').value,
    location: document.getElementById('job-location').value,
    jobType: document.getElementById('job-type').value,
    description: document.getElementById('job-description').value,
    requirements: document.getElementById('job-requirements').value,
    job_link: document.getElementById('job-link').value,
    status: document.getElementById('job-status').value,
  };

  try {
    let result;

    if (isNewJob) {
      // Add posted_at for new jobs
      jobData.posted_at = new Date().toISOString();

      result = await supabase.from('jobs').insert(jobData).select();
    } else {
      result = await supabase
        .from('jobs')
        .update(jobData)
        .eq('id', jobId)
        .select();
    }

    if (result.error) throw result.error;

    // Reload jobs and close modal
    await loadJobs();
    closeModal();
  } catch (error) {
    console.error('Error saving job:', error);
    alert('Error saving job. Please try again.');
  }
}

async function toggleJobStatus(jobId, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

  try {
    const { error } = await supabase
      .from('jobs')
      .update({ status: newStatus })
      .eq('id', jobId);

    if (error) throw error;

    // Reload jobs
    await loadJobs();
  } catch (error) {
    console.error('Error toggling job status:', error);
    alert('Error updating job status. Please try again.');
  }
}

function confirmDeleteJob(jobId) {
  if (
    confirm(
      'Are you sure you want to delete this job? This action cannot be undone.'
    )
  ) {
    deleteJob(jobId);
  }
}

async function deleteJob(jobId) {
  try {
    const { error } = await supabase.from('jobs').delete().eq('id', jobId);

    if (error) throw error;

    // Reload jobs
    await loadJobs();
  } catch (error) {
    console.error('Error deleting job:', error);
    alert('Error deleting job. Please try again.');
  }
}

async function handleLogout() {
  try {
    await supabase.auth.signOut();
    window.location.href = 'adminLogin.html';
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
