
const modules = {
    departments: {
        title: "Departments",
        endpoint: "/api/departments",
        fields: [
            ["departmentName", "Department Name", "text"],
            ["location", "Location", "text"],
            ["phone", "Phone", "text"]
        ]
    },
    doctors: {
        title: "Doctors",
        endpoint: "/api/doctors",
        fields: [
            ["doctorName", "Doctor Name", "text"],
            ["specialization", "Specialization", "text"],
            ["email", "Email", "email"],
            ["phone", "Phone", "text"],
            ["consultationFee", "Consultation Fee", "number"],
            ["departmentId", "Department ID", "number"]
        ]
    },
    patients: {
        title: "Patients",
        endpoint: "/api/patients",
        fields: [
            ["patientName", "Patient Name", "text"],
            ["dateOfBirth", "Date of Birth", "date"],
            ["gender", "Gender", "select", ["Male", "Female", "Other"]],
            ["phone", "Phone", "text"],
            ["email", "Email", "email"],
            ["address", "Address", "text"]
        ]
    },
    appointments: {
        title: "Appointments",
        endpoint: "/api/appointments",
        fields: [
            ["patientId", "Patient ID", "number"],
            ["doctorId", "Doctor ID", "number"],
            ["appointmentDate", "Appointment Date", "datetime-local"],
            ["status", "Status", "select", ["Scheduled", "Completed", "Cancelled"]],
            ["reason", "Reason", "text"]
        ]
    },
    "medical-records": {
        title: "Medical Records",
        endpoint: "/api/medical-records",
        fields: [
            ["appointmentId", "Appointment ID", "number"],
            ["diagnosis", "Diagnosis", "text"],
            ["treatment", "Treatment", "text"],
            ["notes", "Notes", "text"]
        ]
    },
    prescriptions: {
        title: "Prescriptions",
        endpoint: "/api/prescriptions",
        fields: [
            ["recordId", "Medical Record ID", "number"],
            ["prescribedDate", "Prescribed Date", "date"],
            ["instructions", "Instructions", "text"]
        ]
    },
    medicines: {
        title: "Medicines",
        endpoint: "/api/medicines",
        fields: [
            ["medicineName", "Medicine Name", "text"],
            ["manufacturer", "Manufacturer", "text"],
            ["unitPrice", "Unit Price", "number"],
            ["stockQuantity", "Stock Quantity", "number"],
            ["expiryDate", "Expiry Date", "date"]
        ]
    },
    "prescription-items": {
        title: "Prescription Items",
        endpoint: "/api/prescription-items",
        fields: [
            ["prescriptionId", "Prescription ID", "number"],
            ["medicineId", "Medicine ID", "number"],
            ["dosage", "Dosage", "text"],
            ["frequency", "Frequency", "text"],
            ["duration", "Duration", "text"],
            ["quantity", "Quantity", "number"]
        ]
    },
    bills: {
        title: "Bills",
        endpoint: "/api/bills",
        fields: [
            ["appointmentId", "Appointment ID", "number"],
            ["totalAmount", "Total Amount", "number"],
            ["status", "Status", "select", ["Pending", "Partially Paid", "Paid", "Cancelled"]]
        ]
    },
    payments: {
        title: "Payments",
        endpoint: "/api/payments",
        fields: [
            ["billId", "Bill ID", "number"],
            ["paymentAmount", "Payment Amount", "number"],
            ["paymentMethod", "Payment Method", "select", ["Cash", "Card", "UPI", "Net Banking"]],
            ["transactionReference", "Transaction Reference", "text"]
        ]
    }
};

const content = document.getElementById("content");
const message = document.getElementById("message");

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;

    setTimeout(() => {
        message.className = "message";
    }, 4000);
}

async function apiGet(endpoint) {
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error("Server returned " + response.status);
    }

    return response.json();
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function renderDashboard() {
    document.getElementById("pageTitle").textContent = "Dashboard";
    document.getElementById("pageSubtitle").textContent =
        "Hospital overview and statistics";

    content.innerHTML = `
        <div class="stats">
            <div class="stat-card">
                <div class="stat-icon">👨‍⚕️</div>
                <p>Total Doctors</p>
                <h2 id="doctorCount">...</h2>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🧑‍🤝‍🧑</div>
                <p>Total Patients</p>
                <h2 id="patientCount">...</h2>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📅</div>
                <p>Appointments</p>
                <h2 id="appointmentCount">...</h2>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💳</div>
                <p>Total Bills</p>
                <h2 id="billCount">...</h2>
            </div>
        </div>

        <div class="panel">
            <h2>Welcome to HealthCare Hospital</h2>
            <p>
                Manage hospital operations from one centralized dashboard.
                You can manage departments, doctors, patients, appointments,
                medical records, prescriptions, medicines, bills and payments.
            </p>
        </div>

        <div class="panel">
            <h2>System Modules</h2>
            <p>
                10 integrated database modules · Spring Boot backend ·
                MySQL database · HTML, CSS and JavaScript frontend.
            </p>
        </div>
    `;

    loadDashboardCounts();
}

async function loadDashboardCounts() {
    const requests = [
        ["doctorCount", "/api/doctors"],
        ["patientCount", "/api/patients"],
        ["appointmentCount", "/api/appointments"],
        ["billCount", "/api/bills"]
    ];

    for (const [elementId, endpoint] of requests) {
        try {
            const data = await apiGet(endpoint);
            const element = document.getElementById(elementId);
            if (element) element.textContent = data.length;
        } catch (error) {
            const element = document.getElementById(elementId);
            if (element) element.textContent = "Error";
        }
    }
}

function renderModule(page) {
    const config = modules[page];
    if (!config) return;

    document.getElementById("pageTitle").textContent = config.title;
    document.getElementById("pageSubtitle").textContent =
        "Add new records and view existing " + config.title.toLowerCase();

    const formFields = config.fields.map(field => {
        const [name, label, type, options] = field;

        if (type === "select") {
            return `
                <div class="form-group">
                    <label for="${name}">${label}</label>
                    <select id="${name}" name="${name}" required>
                        <option value="">Select ${label}</option>
                        ${options.map(option =>
                `<option value="${option}">${option}</option>`
            ).join("")}
                    </select>
                </div>
            `;
        }

        return `
            <div class="form-group">
                <label for="${name}">${label}</label>
                <input
                    id="${name}"
                    name="${name}"
                    type="${type}"
                    ${type === "number" ? 'step="any"' : ""}
                    required
                >
            </div>
        `;
    }).join("");

    content.innerHTML = `
        <div class="section-grid">
            <div class="panel">
                <h2>Add ${config.title}</h2>
                <form id="recordForm">
                    ${formFields}
                    <button class="primary-btn" type="submit">
                        + Add ${config.title}
                    </button>
                </form>
            </div>

            <div class="panel">
                <h2>All ${config.title}</h2>
                <input class="search-box" id="tableSearch"
                    placeholder="Search records...">
                <div class="table-wrap">
                    <table>
                        <thead id="tableHead"></thead>
                        <tbody id="tableBody">
                            <tr><td class="empty">Loading records...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    document.getElementById("recordForm").addEventListener("submit", event => {
        submitRecord(event, page);
    });

    document.getElementById("tableSearch").addEventListener("input", event => {
        filterTable(event.target.value);
    });

    loadRecords(page);
}

async function loadRecords(page) {
    const config = modules[page];

    try {
        const records = await apiGet(config.endpoint);

        const columns = records.length
            ? Object.keys(records[0])
            : config.fields.map(field => field[0]);

        document.getElementById("tableHead").innerHTML = `
            <tr>
                ${columns.map(column =>
            `<th>${escapeHTML(column)}</th>`
        ).join("")}
            </tr>
        `;

        const tbody = document.getElementById("tableBody");

        if (records.length === 0) {
            tbody.innerHTML = `
                <tr><td class="empty" colspan="${columns.length}">
                    No records found.
                </td></tr>
            `;
            return;
        }

        tbody.innerHTML = records.map(record => `
            <tr>
                ${columns.map(column =>
            `<td>${escapeHTML(record[column])}</td>`
        ).join("")}
            </tr>
        `).join("");

    } catch (error) {
        document.getElementById("tableBody").innerHTML = `
            <tr><td class="empty">
                Could not load records. Check backend connection.
            </td></tr>
        `;
        showMessage("Unable to load " + config.title + ": " + error.message, "error");
    }
}

async function submitRecord(event, page) {
    event.preventDefault();

    const config = modules[page];
    const formData = new FormData(event.target);
    const record = {};

    for (const field of config.fields) {
        const [name, label, type] = field;
        const value = formData.get(name);

        if (type === "number") {
            record[name] = Number(value);
        } else {
            record[name] = value;
        }
    }

    try {
        const response = await fetch(config.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "HTTP " + response.status);
        }

        showMessage(config.title + " record added successfully!", "success");
        event.target.reset();
        loadRecords(page);

    } catch (error) {
        showMessage("Could not add record: " + error.message, "error");
    }
}

function filterTable(search) {
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase()
            .includes(search.toLowerCase()) ? "" : "none";
    });
}

function openPage(page) {
    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });

    if (page === "dashboard") {
        renderDashboard();
    } else {
        renderModule(page);
    }
}

document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => openPage(button.dataset.page));
});

renderDashboard();
