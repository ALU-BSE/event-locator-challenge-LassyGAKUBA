
const events = [
  {
    id: 1,
    name: "Kigali Music Festival",
    date: "2025-07-20",
    category: "music",
    location: "Kigali Arena",
    description: "Enjoy the best of African music in a live concert event."
  },
  {
    id: 2,
    name: "Tech Innovators Meetup",
    date: "2025-07-22",
    category: "tech",
    location: "Kigali Convention Centre",
    description: "Connect with tech leaders and showcase your ideas."
  },
  {
    id: 3,
    name: "APR VS RAYON SPORTS",
    date: "2025-07-25",
    category: "sports",
    location: "Amahoro Stadium",
    description: "Join a day of fun, Cheering for your favorite team."
  }
];

const categoryColors = {
  music: "primary",
  sports: "success",
  tech: "info"
};

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q")?.toLowerCase() || "",
    date: params.get("date") || "",
    category: params.get("category")?.toLowerCase() || ""
  };
}

function renderEvents() {
  const { q, date, category } = getQueryParams();
  const container = document.getElementById("eventsContainer");

  const filtered = events.filter(event => {
    const matchesSearch = !q || event.name.toLowerCase().includes(q);
    const matchesDate = !date || event.date === date;
    const matchesCategory = !category || event.category.toLowerCase() === category;
    return matchesSearch && matchesDate && matchesCategory;
  });

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }

  filtered.forEach(event => {
    const badge = `<span class="badge bg-${categoryColors[event.category] || 'secondary'}">${event.category}</span>`;
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between align-items-center">
            ${event.name} ${badge}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">${event.date} • ${event.location}</h6>
          <p class="card-text">${event.description}</p>
          <a href="event-details.html?id=${event.id}" class="btn btn-outline-primary btn-sm">View Details</a>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function renderEventDetails() {
  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  const event = events.find(e => e.id === id);
  const container = document.getElementById("eventDetails");

  if (!event) {
    container.innerHTML = "<p>Event not found.</p>";
    return;
  }

  const badge = `<span class="badge bg-${categoryColors[event.category] || 'secondary'}">${event.category}</span>`;
  container.innerHTML = `
    <a href="events.html" class="btn btn-outline-secondary mb-4">← Back to Events</a>
    <div class="card p-4 shadow-sm">
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Category:</strong> ${badge}</p>
      <p>${event.description}</p>
    </div>`;
}

const currentPage = window.location.pathname.split("/").pop();
if (currentPage === "events.html") renderEvents();
if (currentPage === "event-details.html") renderEventDetails();
