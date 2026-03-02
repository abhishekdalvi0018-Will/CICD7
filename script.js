// Function to fetch the latest CI/CD pipeline status
async function fetchPipelineStatus() {
  try {
    // Use the GitHub API to get the latest actions workflow run status
    const response = await fetch('https://api.github.com/repos/yourusername/your-repository/actions/runs');
    const data = await response.json();
    
    if (data.workflow_runs && data.workflow_runs.length > 0) {
      const latestRun = data.workflow_runs[0];
      const statusText = document.getElementById('status-text');
      const buildLog = document.getElementById('build-log');

      statusText.textContent = latestRun.conclusion === 'success' ? 'Pipeline Successful!' : 'Pipeline Failed!';
      buildLog.innerHTML = `
        <li><strong>Status:</strong> ${latestRun.status}</li>
        <li><strong>Conclusion:</strong> ${latestRun.conclusion}</li>
        <li><strong>Started at:</strong> ${new Date(latestRun.created_at).toLocaleString()}</li>
        <li><strong>Completed at:</strong> ${new Date(latestRun.updated_at).toLocaleString()}</li>
      `;
    }
  } catch (error) {
    console.error('Error fetching pipeline status:', error);
    document.getElementById('status-text').textContent = 'Error fetching pipeline status';
  }
}

// Fetch pipeline status every 30 seconds
setInterval(fetchPipelineStatus, 30000);