// Initialize Supabase client
const SUPABASE_URL = 'https://mltpljjibkmxncsmqtie.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdHBsamppYmtteG5jc21xdGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzc5MjYsImV4cCI6MjA1NTYxMzkyNn0.5cHIVtarRAbwHy-hanBCz884_ZwkkvaIJ-P4pxQeCQo';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', function () {
  // Check if user is already logged in
  checkAuthStatus();

  // Handle login form submission
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', handleLogin);
});

async function checkAuthStatus() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // User is already logged in, redirect to admin panel
    window.location.href = 'adminPanel.html';
  }
}

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    // Check if user has admin role
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    if (userData.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Unauthorized access');
    }

    // Redirect to admin panel
    window.location.href = 'admin-panel.html';
  } catch (error) {
    console.error('Error logging in:', error);
    errorMessage.style.display = 'block';
  }
}
