async function fetchQuestData() {
  const statusDiv = document.getElementById('status');
  const tableBody = document.querySelector('#quest-table tbody');
  statusDiv.textContent = 'Loading...';
  tableBody.innerHTML = '';

  try {
    const response = await fetch('https://apps.runescape.com/runemetrics/profile/profile?user=acetoymaker');
    const data = await response.json();

    if (!data.quests) {
      statusDiv.textContent = 'No quest data available or profile is private.';
      return;
    }

    data.quests.forEach((quest) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const statusCell = document.createElement('td');

      nameCell.textContent = quest.title;
      if (quest.status === 'COMPLETED') {
        statusCell.textContent = '✅ Completed';
      } else if (quest.status === 'IN_PROGRESS') {
        statusCell.textContent = '🟡 In Progress';
      } else {
        statusCell.textContent = '❌ Not Started';
      }

      row.appendChild(nameCell);
      row.appendChild(statusCell);
      tableBody.appendChild(row);
    });

    statusDiv.textContent = `Loaded ${data.quests.length} quests.`;
  } catch (error) {
    console.error(error);
    statusDiv.textContent = 'Error loading data. Try again later.';
  }
}

window.onload = fetchQuestData;
