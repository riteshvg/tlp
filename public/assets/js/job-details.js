//Destructure createClient from the global supabase object
const { createClient } = window.supabase;

//Initialize the Supabase client
const supabaseUrl = 'https://mltpljjibkmxncsmqtie.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdHBsamppYmtteG5jc21xdGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzc5MjYsImV4cCI6MjA1NTYxMzkyNn0.5cHIVtarRAbwHy-hanBCz884_ZwkkvaIJ-P4pxQeCQo';
const supabase = createClient(supabaseUrl, supabaseKey);

//Get the jobID from URL
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

//Load job details when the page loads
document.addEventListener('DOMContentLoaded', loadJobDetails);

//Load job details function
async function loadJobDetails() {
  try {
    const { data: job, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error) throw error;

    displayJobDetails(job);
  } catch (error) {
    alert('Error loading job details: ' + error.message);
  }
}

//Display job details in the page
function displayJobDetails(job) {
  const jobDetails = document.getElementById('jobDetails');

  const postedDate = formatTimeAgo(job.posted_at);
  const jobTypes = job.jobType ? job.jobType.split(', ') : [];

  jobDetails.innerHTML = `
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-start">
            <h1 class="h3">${job.title} | ${job.company} | ${job.location}</h1>
            ${
              job.job_link
                ? `
              <a href="${job.job_link}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="btn btn-success">
                  <i class="fas fa-external-link-alt me-1"></i> Apply Now
              </a>
            `
                : ''
            }
          </div>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <div class="job-types">
              ${jobTypes
                .map(
                  (type) => `
                <span class="badge bg-primary me-2">${type}</span>
              `
                )
                .join('')}
            </div>
          </div>
  
          <div class="mb-3">
            <span class="badge bg-secondary">${
              job.experienceLevel || 'N/A'
            }</span>
          </div>
  
          <div class="mb-3">
            <h5 class="h4">Job Description</h5>
            <div class="card-text job-description">
              ${job.description}
            </div>
          </div>
    
          <div class="mb-3">
            <h5 class="h4">Requirements</h5>
            <div class="requirements-list">
              ${job.requirements}
            </div>
          </div>
    
          <div class="mb-3">
            <h5 class = "h4">Company Details</h5>
            <p class="card-text">
              ${
                job.companydetails ||
                `${job.company} is currently looking for a ${job.title} to join their team.`
              }
            </p>
          </div>
    
          <div class="card-footer bg-light p-2">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                Posted on: ${new Date(job.posted_at).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
                |
                <span class="badge btn-danger">Source: ${
                  job.source || 'Direct'
                }</span>
              </small>
              <div class="d-flex gap-2">
                <button class="btn btn-primary btn-sm"><a href="jobBoard.html" class="text-white text-decoration-none">Back to Jobs</a></button>
              </div>
            </div>
          </div>
        </div>
      `;
}

//The formatTimeAgo function (formatTimeAgo(dateString))
function formatTimeAgo(dateString) {
  if (!dateString) return 'Recently';

  try {
    const date = newDate(dateString);
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
