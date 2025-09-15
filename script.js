// Sample data
let activities = [
    { id: 1, type: "Recycling", description: "Recycled 3 glass bottles", carbon: 1.2, date: "2023-07-15" },
    { id: 2, type: "Transportation", description: "Biked to work", carbon: 3.5, date: "2023-07-14" },
    { id: 3, type: "Reduction", description: "Used reusable bags", carbon: 0.8, date: "2023-07-13" }
];

// DOM elements
const activityForm = document.getElementById('activityForm');
const activitiesTable = document.getElementById('activitiesTable');
const totalActivitiesEl = document.getElementById('totalActivities');
const totalCarbonEl = document.getElementById('totalCarbon');
const weeklyGoalEl = document.getElementById('weeklyGoal');

// Initialize with current date
document.getElementById('date').valueAsDate = new Date();

// Update stats
function updateStats() {
    totalActivitiesEl.textContent = activities.length;

    const totalCarbon = activities.reduce((sum, activity) => sum + activity.carbon, 0);
    totalCarbonEl.textContent = totalCarbon.toFixed(1) + ' kg';

    const goalPercent = Math.min(Math.round((totalCarbon / 7.5) * 100), 100);
    weeklyGoalEl.textContent = goalPercent + '%';
}

// Render activities table
function renderActivities() {
    activitiesTable.innerHTML = '';

    activities.forEach(activity => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${activity.type}</td>
            <td>${activity.description}</td>
            <td>${activity.carbon} kg</td>
            <td>${activity.date}</td>
            <td class="actions">
                <button class="edit" onclick="editActivity(${activity.id})"><i class="fas fa-edit"></i></button>
                <button class="delete" onclick="deleteActivity(${activity.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;

        activitiesTable.appendChild(row);
    });

    updateStats();
}

// Add new activity
activityForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const type = document.getElementById('activityType').value;
    const description = document.getElementById('activityDescription').value;
    const carbon = parseFloat(document.getElementById('carbonSaved').value);
    const date = document.getElementById('date').value;

    const newActivity = {
        id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
        type,
        description,
        carbon,
        date
    };

    activities.push(newActivity);
    renderActivities();

    // Reset form
    activityForm.reset();
    document.getElementById('date').valueAsDate = new Date();
});

// Edit activity
window.editActivity = function(id) {
    const activity = activities.find(a => a.id === id);

    if (activity) {
        document.getElementById('activityType').value = activity.type;
        document.getElementById('activityDescription').value = activity.description;
        document.getElementById('carbonSaved').value = activity.carbon;
        document.getElementById('date').value = activity.date;

        // Remove the activity from the list (will be re-added when form is submitted)
        activities = activities.filter(a => a.id !== id);
        renderActivities();
    }
};

// Delete activity
window.deleteActivity = function(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
        activities = activities.filter(a => a.id !== id);
        renderActivities();
    }
};

// Initial render
renderActivities();
