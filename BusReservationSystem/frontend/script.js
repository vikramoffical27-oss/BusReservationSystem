// ======================================================
// GLOBAL VARIABLES
// ======================================================

let selectedSeat = null;
let bookedSeats = [];

const API = "http://localhost:8080";


// ======================================================
// SIGNUP
// ======================================================

function signup() {

    const username =
        document.getElementById("username")?.value.trim();

    const email =
        document.getElementById("email")?.value.trim();

    const password =
        document.getElementById("password")?.value.trim();


    if (!username || !email || !password) {

        alert("Please fill all fields.");
        return;
    }


    fetch(API + "/users/signup", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })

    })

    .then(response => response.text())

    .then(data => {

        alert(data);

        if (data.trim() === "Registration Successful") {

            window.location.href = "login.html";
        }

    })

    .catch(error => {

        console.error("SIGNUP ERROR:", error);

        alert(
            "Unable to register.\n" +
            "Make sure Spring Boot backend is running."
        );

    });
}


// ======================================================
// LOGIN
// ======================================================

function loginUser() {

    const email =
        document.getElementById("email")?.value.trim();

    const password =
        document.getElementById("password")?.value.trim();


    if (!email || !password) {

        alert("Please enter email and password.");
        return;
    }


    fetch(API + "/users/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    })

    .then(response => response.text())

    .then(data => {

        console.log("LOGIN RESPONSE:", data);

        alert(data);


        if (data.trim() === "Login Successful") {

            localStorage.setItem(
                "loggedInEmail",
                email
            );

            window.location.href =
                "searchbus.html";
        }

    })

    .catch(error => {

        console.error("LOGIN ERROR:", error);

        alert(
            "Login failed.\n" +
            "Make sure Spring Boot backend is running."
        );

    });
}


// ======================================================
// SEARCH BUS
// ======================================================

function searchBus() {

    const source =
        document.getElementById("source")?.value.trim();

    const destination =
        document.getElementById("destination")?.value.trim();

    const journeyDate =
        document.getElementById("journeyDate")?.value;


    if (!source ||
        !destination ||
        !journeyDate) {

        alert(
            "Please enter From, To and Journey Date."
        );

        return;
    }


    const url =
        API +
        "/bus/search?source=" +
        encodeURIComponent(source) +
        "&destination=" +
        encodeURIComponent(destination);


    console.log("SEARCH URL:", url);


    fetch(url)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Bus search failed: " +
                    response.status
                );
            }

            return response.json();
        })

        .then(data => {

            console.log("BUS DATA:", data);


            const result =
                document.getElementById("result");


            if (!result) {
                return;
            }


            if (!data || data.length === 0) {

                result.innerHTML = `

                    <div class="empty">

                        <h3>🚌 No buses found</h3>

                        <p>
                            No buses available for
                            ${source} → ${destination}
                        </p>

                    </div>

                `;

                return;
            }


            let output = "";


            data.forEach(bus => {

                output += `

                    <div class="bus-card">

                        <h3>
                            🚌 ${bus.busName}
                        </h3>

                        <p>
                            <b>Bus Number:</b>
                            ${bus.busNumber}
                        </p>

                        <p>
                            📍
                            ${bus.source}
                            →
                            ${bus.destination}
                        </p>

                        <p>
                            🕐
                            ${bus.departureTime}
                            →
                            ${bus.arrivalTime}
                        </p>

                        <p>
                            📅
                            Journey Date:
                            <b>${journeyDate}</b>
                        </p>

                        <p>
                            💰
                            Fare:
                            <b>₹${bus.fare}</b>
                        </p>

                        <p>
                            💺
                            Available Seats:
                            <b>${bus.availableSeats}</b>
                        </p>

                        <button
                            type="button"
                            class="book-btn"
                            onclick="selectBus(
                                ${bus.id},
                                '${escapeQuotes(bus.busName)}',
                                '${escapeQuotes(bus.busNumber)}',
                                '${escapeQuotes(bus.source)}',
                                '${escapeQuotes(bus.destination)}',
                                '${escapeQuotes(bus.departureTime)}',
                                '${escapeQuotes(bus.arrivalTime)}',
                                ${bus.fare},
                                '${escapeQuotes(journeyDate)}'
                            )"
                        >
                            🎟️ Book Ticket
                        </button>

                    </div>

                `;
            });


            result.innerHTML = output;

        })

        .catch(error => {

            console.error(
                "SEARCH BUS ERROR:",
                error
            );

            alert(
                "Unable to search buses.\n\n" +
                "Make sure Spring Boot backend is running."
            );

        });
}


// ======================================================
// SELECT BUS
// ======================================================

// ======================================================
// SELECT BUS
// ======================================================

function selectBus(
    id,
    busName,
    busNumber,
    source,
    destination,
    departureTime,
    arrivalTime,
    fare,
    journeyDate
) {

    console.log("=================================");
    console.log("BOOK TICKET CLICKED");
    console.log("Bus ID:", id);
    console.log("Bus Name:", busName);
    console.log("Bus Number:", busNumber);
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Departure:", departureTime);
    console.log("Arrival:", arrivalTime);
    console.log("Fare:", fare);
    console.log("Journey Date:", journeyDate);
    console.log("=================================");

    // Save selected bus information
    localStorage.setItem("selectedBusId", String(id));
    localStorage.setItem("selectedBusName", busName);
    localStorage.setItem("selectedBusNumber", busNumber);
    localStorage.setItem("selectedSource", source);
    localStorage.setItem("selectedDestination", destination);
    localStorage.setItem("selectedDepartureTime", departureTime);
    localStorage.setItem("selectedArrivalTime", arrivalTime);
    localStorage.setItem("selectedFare", String(fare));

    // Save journey date
    localStorage.setItem("journeyDate", journeyDate);

    // Clear previous seat selection
    localStorage.removeItem("selectedSeat");

    // Open booking page
    window.location.href = "booking.html";
}


// ======================================================
// ESCAPE QUOTES
// ======================================================

function escapeQuotes(value) {

    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}


// ======================================================
// LOAD SELECTED BUS
// ======================================================

// ======================================================
// LOAD SELECTED BUS
// ======================================================

function loadSelectedBus() {

    const busDetails =
        document.getElementById("busDetails");

    const busId =
        localStorage.getItem("selectedBusId");

    if (!busId) {

        alert("No bus selected.");

        window.location.href =
            "buses.html";

        return;
    }

    console.log("Loading selected bus ID:", busId);

    // Show loading message
    busDetails.innerHTML = `
        <div class="loading">
            🚌 Loading bus details...
        </div>
    `;


    fetch(
        "http://localhost:8080/bus/" +
        encodeURIComponent(busId)
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Bus not found. HTTP Status: "
                + response.status
            );

        }

        return response.json();

    })

    .then(bus => {

        console.log(
            "SELECTED BUS FROM BACKEND:",
            bus
        );


        // Store latest information
        localStorage.setItem(
            "selectedBusName",
            bus.busName || ""
        );

        localStorage.setItem(
            "selectedBusNumber",
            bus.busNumber || ""
        );

        localStorage.setItem(
            "selectedSource",
            bus.source || ""
        );

        localStorage.setItem(
            "selectedDestination",
            bus.destination || ""
        );

        localStorage.setItem(
            "selectedDepartureTime",
            bus.departureTime || ""
        );

        localStorage.setItem(
            "selectedArrivalTime",
            bus.arrivalTime || ""
        );

        localStorage.setItem(
            "selectedFare",
            bus.fare || ""
        );


        const journeyDate =
            localStorage.getItem("journeyDate") || "--";


        // Display actual selected bus
        busDetails.innerHTML = `

            <div class="selected-bus-card">

                <div class="selected-bus-title">

                    <span class="bus-icon">
                        🚌
                    </span>

                    <h2>
                        ${bus.busName || "Bus"}
                    </h2>

                </div>


                <div class="selected-bus-number">

                    <strong>
                        Bus Number:
                    </strong>

                    ${bus.busNumber || "--"}

                </div>


                <div class="selected-route">

                    <div class="route-location">

                        <span>
                            FROM
                        </span>

                        <strong>
                            ${bus.source || "--"}
                        </strong>

                    </div>


                    <div class="route-arrow">
                        🚌
                        <br>
                        →
                    </div>


                    <div class="route-location">

                        <span>
                            TO
                        </span>

                        <strong>
                            ${bus.destination || "--"}
                        </strong>

                    </div>

                </div>


                <div class="bus-details-grid">

                    <div class="detail-item">

                        <span>
                            📅 Journey Date
                        </span>

                        <strong>
                            ${journeyDate}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            🛫 Departure
                        </span>

                        <strong>
                            ${bus.departureTime || "--"}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            🛬 Arrival
                        </span>

                        <strong>
                            ${bus.arrivalTime || "--"}
                        </strong>

                    </div>


                    <div class="detail-item">

                        <span>
                            💰 Fare
                        </span>

                        <strong>
                            ₹${bus.fare || "--"}
                        </strong>

                    </div>

                </div>

            </div>

        `;


        // Set hidden bus ID
        const hiddenBusId =
            document.getElementById("busId");

        if (hiddenBusId) {

            hiddenBusId.value =
                bus.id;

        }

    })

    .catch(error => {

        console.error(
            "LOAD SELECTED BUS ERROR:",
            error
        );


        busDetails.innerHTML = `

            <div class="error-box">

                ❌ Unable to load bus details.

                <br><br>

                Please go back and select
                a bus again.

            </div>

        `;

    });
}


// ======================================================
// LOAD LOGGED-IN EMAIL
// ======================================================

function loadLoggedInEmail() {

    const email =
        localStorage.getItem("loggedInEmail");


    if (!email) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return false;
    }


    const emailField =
        document.getElementById("email");


    if (emailField) {

        emailField.value = email;

        emailField.disabled = true;
    }


    return true;
}


// ======================================================
// LOAD BOOKED SEATS
// ======================================================

function loadSeats() {

    const busId =
        localStorage.getItem("selectedBusId");


    if (!busId) {
        return;
    }


    console.log(
        "Loading booked seats for bus:",
        busId
    );


    fetch(
        API +
        "/booking/booked-seats?busId=" +
        encodeURIComponent(busId)
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Seat API returned " +
                response.status
            );
        }

        return response.json();

    })

    .then(data => {

        console.log(
            "BOOKED SEATS:",
            data
        );


        // Convert everything to numbers
        bookedSeats =
            Array.isArray(data)
                ? data.map(Number)
                : [];


        displaySeats();

    })

    .catch(error => {

        console.error(
            "LOAD SEATS ERROR:",
            error
        );


        // Even if seat API fails,
        // display seats so user can continue.
        bookedSeats = [];

        displaySeats();


        console.warn(
            "Could not load booked seats. " +
            "Showing all seats as available."
        );

    });
}


// ======================================================
// DISPLAY SEATS
// ======================================================

// ======================================================
// DISPLAY 40 SEATS - 2 + 3 BUS LAYOUT
// ======================================================

function displaySeats() {

    const container = document.getElementById("seats");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    // Create main seat layout
    const layout = document.createElement("div");
    layout.className = "seat-layout";

    /*
        40 seats

        LEFT       AISLE       RIGHT
        1   2        |        3   4   5
        6   7        |        8   9   10
        11  12       |        13  14  15
        16  17       |        18  19  20
        21  22       |        23  24  25
        26  27       |        28  29  30
        31  32       |        33  34  35
        36  37       |        38  39  40
    */

    let seatNumber = 1;

    for (let row = 0; row < 8; row++) {

        const seatRow = document.createElement("div");
        seatRow.className = "seat-row";


        // ==========================================
        // LEFT SIDE - 2 SEATS
        // ==========================================

        const leftSide = document.createElement("div");
        leftSide.className = "seat-side left-side";


        for (let i = 0; i < 2; i++) {

            const button = createSeatButton(seatNumber);

            leftSide.appendChild(button);

            seatNumber++;
        }


        // ==========================================
        // AISLE
        // ==========================================

        const aisle = document.createElement("div");

        aisle.className = "aisle";

        aisle.innerHTML = `<span>AISLE</span>`;


        // ==========================================
        // RIGHT SIDE - 3 SEATS
        // ==========================================

        const rightSide = document.createElement("div");

        rightSide.className = "seat-side right-side";


        for (let i = 0; i < 3; i++) {

            const button = createSeatButton(seatNumber);

            rightSide.appendChild(button);

            seatNumber++;
        }


        // ==========================================
        // ADD TO ROW
        // ==========================================

        seatRow.appendChild(leftSide);

        seatRow.appendChild(aisle);

        seatRow.appendChild(rightSide);

        layout.appendChild(seatRow);
    }


    container.appendChild(layout);
}


// ======================================================
// CREATE INDIVIDUAL SEAT BUTTON
// ======================================================

function createSeatButton(number) {

    const button = document.createElement("button");

    button.type = "button";

    button.className = "seat";

    button.innerText = number;


    // ==========================================
    // CHECK BOOKED SEAT
    // ==========================================

    if (bookedSeats.includes(number)) {

        button.disabled = true;

        button.classList.add("booked");

        button.title = "Seat Already Booked";

    } else {

        button.onclick = function () {

            selectSeat(
                number,
                button
            );

        };
    }


    return button;
}


// ======================================================
// SELECT SEAT
// ======================================================

function selectSeat(
    seatNumber,
    button
) {

    selectedSeat =
        Number(seatNumber);


    // Save immediately
    localStorage.setItem(
        "selectedSeat",
        String(selectedSeat)
    );


    const selected =
        document.getElementById(
            "selectedSeat"
        );


    if (selected) {

        selected.innerText =
            selectedSeat;
    }


    document
        .querySelectorAll(".seat")
        .forEach(seat => {

            seat.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );


    console.log(
        "SELECTED SEAT:",
        selectedSeat
    );
}


// ======================================================
// BOOK TICKET
// ======================================================

function bookTicket() {

    const passengerName =
        document.getElementById(
            "passengerName"
        )?.value.trim();


    const age =
        document.getElementById(
            "age"
        )?.value;


    const gender =
        document.getElementById(
            "gender"
        )?.value;


    const busId =
        document.getElementById(
            "busId"
        )?.value;


    const email =
        localStorage.getItem(
            "loggedInEmail"
        );


    console.log("==============================");
    console.log("BOOKING");
    console.log("Passenger:", passengerName);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Bus ID:", busId);
    console.log("Email:", email);
    console.log("Seat:", selectedSeat);
    console.log("==============================");


    // ==========================
    // VALIDATION
    // ==========================

    if (!passengerName) {

        alert(
            "Please enter passenger name."
        );

        return;
    }


    if (!age) {

        alert(
            "Please enter age."
        );

        return;
    }


    if (Number(age) <= 0) {

        alert(
            "Please enter a valid age."
        );

        return;
    }


    if (!gender) {

        alert(
            "Please select gender."
        );

        return;
    }


    if (!email) {

        alert(
            "Please login first."
        );

        window.location.href =
            "login.html";

        return;
    }


    if (!busId) {

        alert(
            "Bus ID is missing.\n" +
            "Please select a bus again."
        );

        window.location.href =
            "searchbus.html";

        return;
    }


    // Recover selected seat if page refreshed
    if (selectedSeat === null) {

        const savedSeat =
            localStorage.getItem(
                "selectedSeat"
            );

        if (savedSeat) {

            selectedSeat =
                Number(savedSeat);
        }
    }


    if (
        selectedSeat === null ||
        isNaN(selectedSeat)
    ) {

        alert(
            "Please select a seat."
        );

        return;
    }


    // ==========================
    // BOOKING OBJECT
    // ==========================

    const booking = {

        passengerName:
            passengerName,

        age:
            Number(age),

        gender:
            gender,

        email:
            email,

        busId:
            Number(busId),

        seatNumber:
            Number(selectedSeat)

    };


    console.log(
        "SENDING BOOKING:",
        booking
    );


    // Disable button to prevent double booking
    const bookButton =
        document.querySelector(
            'button[onclick="bookTicket()"]'
        );


    if (bookButton) {

        bookButton.disabled = true;

        bookButton.innerText =
            "Booking...";
    }


    // ==========================
    // SEND TO BACKEND
    // ==========================

    fetch(
        API + "/booking/add",
        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(booking)

        }
    )

    .then(async response => {

        const text =
            await response.text();


        console.log(
            "HTTP STATUS:",
            response.status
        );

        console.log(
            "SERVER RESPONSE:",
            text
        );


        if (!response.ok) {

            throw new Error(
                text ||
                "Booking failed. HTTP " +
                response.status
            );
        }


        return text;

    })

    .then(data => {

        console.log(
            "BOOKING SUCCESS:",
            data
        );


        // ==========================
        // CREATE TICKET DATA
        // ==========================

        const ticket = {

            passengerName:
                passengerName,

            age:
                Number(age),

            gender:
                gender,

            email:
                email,

            busId:
                Number(busId),

            seatNumber:
                Number(selectedSeat),

            busName:
                localStorage.getItem(
                    "selectedBusName"
                ),

            busNumber:
                localStorage.getItem(
                    "selectedBusNumber"
                ),

            source:
                localStorage.getItem(
                    "selectedSource"
                ),

            destination:
                localStorage.getItem(
                    "selectedDestination"
                ),

            departureTime:
                localStorage.getItem(
                    "selectedDepartureTime"
                ),

            arrivalTime:
                localStorage.getItem(
                    "selectedArrivalTime"
                ),

            journeyDate:
                localStorage.getItem(
                    "journeyDate"
                ),

            fare:
                localStorage.getItem(
                    "selectedFare"
                )

        };


        // Save ticket
        localStorage.setItem(
            "lastTicket",
            JSON.stringify(ticket)
        );


        // Save individual values too
        localStorage.setItem(
            "selectedSeat",
            String(selectedSeat)
        );

        localStorage.setItem(
            "passengerName",
            passengerName
        );


        alert(
            data ||
            "Ticket Booked Successfully"
        );


        // Go to ticket
        window.location.href =
            "ticket.html";

    })

    .catch(error => {

        console.error(
            "BOOKING ERROR:",
            error
        );


        alert(
            "Booking failed.\n\n" +
            error.message
        );


        if (bookButton) {

            bookButton.disabled =
                false;

            bookButton.innerText =
                "🎟️ Book Ticket";
        }

    });
}


// ======================================================
// LOAD MY BOOKINGS
// ======================================================

function loadBookings() {

    const email =
        localStorage.getItem("loggedInEmail");


    if (!email) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    const result =
        document.getElementById("result");


    result.innerHTML = `
        <div class="loading">
            🚌 Loading your bookings...
        </div>
    `;


    fetch(
        "http://localhost:8080/booking/mybooking?email="
        + encodeURIComponent(email)
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to load bookings: "
                + response.status
            );

        }

        return response.json();

    })

    .then(async bookings => {

        console.log(
            "Bookings:",
            bookings
        );


        if (!bookings ||
            bookings.length === 0) {

            result.innerHTML = `

                <div class="no-bookings">

                    <div style="font-size:50px;">
                        🎫
                    </div>

                    <h3>
                        No Bookings Found
                    </h3>

                    <p>
                        You don't have any bus
                        tickets yet.
                    </p>

                    <button
                        onclick="
                            window.location.href='searchbus.html'
                        "
                    >
                        🚌 Book a Bus
                    </button>

                </div>

            `;

            return;

        }


        /*
         * Get bus information for every booking
         */

        const bookingData =
            await Promise.all(

                bookings.map(async ticket => {

                    try {

                        const response =
                            await fetch(
                                "http://localhost:8080/bus/"
                                + ticket.busId
                            );


                        if (!response.ok) {

                            throw new Error(
                                "Bus not found"
                            );

                        }


                        const bus =
                            await response.json();


                        return {

                            ticket: ticket,

                            bus: bus

                        };

                    }

                    catch (error) {

                        console.error(
                            "Bus loading error:",
                            error
                        );


                        return {

                            ticket: ticket,

                            bus: null

                        };

                    }

                })

            );


        let output = "";


        bookingData.forEach(
            ({ ticket, bus }) => {


                /*
                 * Bus information
                 */

                const busName =
                    bus?.busName
                    || "Bus";


                const busNumber =
                    bus?.busNumber
                    || "N/A";


                const source =
                    bus?.source
                    || "Unknown";


                const destination =
                    bus?.destination
                    || "Unknown";


                const departureTime =
                    bus?.departureTime
                    || "--";


                const arrivalTime =
                    bus?.arrivalTime
                    || "--";


                const fare =
                    bus?.fare
                    ?? "--";


                /*
                 * Journey date
                 *
                 * If you later store journeyDate
                 * in the booking table, this will
                 * automatically use it.
                 */

                const journeyDate =
                    ticket.journeyDate
                    || localStorage.getItem(
                        "journeyDate"
                    )
                    || "--";


                output += `

                    <div class="booking-card">


                        <!-- =================
                             TOP
                        ================= -->

                        <div class="booking-top">


                            <div>

                                <div class="bus-name">

                                    🚌 ${busName}

                                </div>


                                <div class="bus-number">

                                    Bus Number:
                                    <strong>
                                        ${busNumber}
                                    </strong>

                                </div>

                            </div>


                            <div class="booking-status">

                                ✓ CONFIRMED

                            </div>


                        </div>



                        <!-- =================
                             ROUTE
                        ================= -->

                        <div class="route-section">


                            <div class="route-place">

                                <span class="route-label">
                                    FROM
                                </span>

                                <span class="route-city">
                                    📍 ${source}
                                </span>

                                <span class="route-time">

                                    🕐 ${departureTime}

                                </span>

                            </div>


                            <div class="route-arrow">

                                <span class="route-line">
                                </span>

                                🚌

                                <span class="route-line">
                                </span>

                            </div>


                            <div class="route-place">

                                <span class="route-label">
                                    TO
                                </span>

                                <span class="route-city">
                                    📍 ${destination}
                                </span>

                                <span class="route-time">

                                    🕐 ${arrivalTime}

                                </span>

                            </div>


                        </div>



                        <!-- =================
                             DETAILS
                        ================= -->

                        <div class="booking-details">


                            <div class="detail-box">

                                <span class="detail-label">
                                    Passenger
                                </span>

                                <span class="detail-value">

                                    👤
                                    ${ticket.passengerName}

                                </span>

                            </div>


                            <div class="detail-box">

                                <span class="detail-label">
                                    Seat
                                </span>

                                <span class="detail-value">

                                    💺
                                    ${ticket.seatNumber}

                                </span>

                            </div>


                            <div class="detail-box">

                                <span class="detail-label">
                                    Journey Date
                                </span>

                                <span class="detail-value">

                                    📅
                                    ${journeyDate}

                                </span>

                            </div>


                            <div class="detail-box">

                                <span class="detail-label">
                                    Fare
                                </span>

                                <span class="detail-value">

                                    💰 ₹${fare}

                                </span>

                            </div>


                        </div>



                        <!-- =================
                             BOTTOM
                        ================= -->

                        <div class="booking-bottom">


                            <div class="booking-id">

                                Booking ID:

                                <strong>
                                    #${ticket.id}
                                </strong>

                                &nbsp; | &nbsp;

                                Age:

                                <strong>
                                    ${ticket.age}
                                </strong>

                                &nbsp; | &nbsp;

                                Gender:

                                <strong>
                                    ${ticket.gender}
                                </strong>

                            </div>


                            <button
                                class="cancel-btn"
                                onclick="
                                    cancelTicket(${ticket.id})
                                "
                            >

                                ✕ Cancel Ticket

                            </button>


                        </div>


                    </div>

                `;

            });


        result.innerHTML =
            output;

    })

    .catch(error => {

        console.error(
            "LOAD BOOKINGS ERROR:",
            error
        );


        result.innerHTML = `

            <div class="no-bookings">

                <div style="font-size:50px;">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Bookings
                </h3>

                <p>
                    Please make sure your
                    Spring Boot backend is running.
                </p>

                <button
                    onclick="loadBookings()"
                >
                    🔄 Try Again
                </button>

            </div>

        `;

    });

}


// ======================================================
// DISPLAY BOOKINGS
// ======================================================

function displayBookings(data) {

    const result =
        document.getElementById(
            "result"
        );


    if (!result) {
        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        result.innerHTML = `

            <div class="no-bookings">

                <div class="empty-icon">
                    🎫
                </div>

                <h3>
                    No Bookings Found
                </h3>

                <p>
                    You don't have any
                    bus tickets yet.
                </p>

                <button
                    onclick="
                        window.location.href='searchbus.html'
                    "
                >
                    🚌 Book a Bus
                </button>

            </div>

        `;

        return;
    }


    let output = "";


    data.forEach(ticket => {

        output += `

            <div class="ticket-card">

                <div class="ticket-top">

                    <div>

                        <span class="ticket-label">
                            BUSGO
                        </span>

                        <h3>
                            🚌 Bus Ticket
                        </h3>

                    </div>

                    <div class="ticket-status">
                        ✓ CONFIRMED
                    </div>

                </div>


                <div class="ticket-line"></div>


                <div class="ticket-route">

                    <div class="location">

                        <span class="small-label">
                            PASSENGER
                        </span>

                        <strong>
                            ${ticket.passengerName}
                        </strong>

                    </div>


                    <div class="route-arrow">
                        🚌
                    </div>


                    <div class="location">

                        <span class="small-label">
                            SEAT
                        </span>

                        <strong>
                            ${ticket.seatNumber}
                        </strong>

                    </div>

                </div>


                <div class="ticket-info">

                    <div>

                        <span>
                            Booking ID
                        </span>

                        <strong>
                            #${ticket.id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Age
                        </span>

                        <strong>
                            ${ticket.age}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Gender
                        </span>

                        <strong>
                            ${ticket.gender}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Bus ID
                        </span>

                        <strong>
                            ${ticket.busId}
                        </strong>

                    </div>

                </div>


                <div class="ticket-line"></div>


                <div class="ticket-bottom">

                    <div>

                        <span class="small-label">
                            EMAIL
                        </span>

                        <strong>
                            ${ticket.email}
                        </strong>

                    </div>


                    <button
                        class="cancel-btn"
                        onclick="
                            cancelTicket(${ticket.id})
                        "
                    >
                        ✕ Cancel Ticket
                    </button>

                </div>

            </div>

        `;

    });


    result.innerHTML =
        output;
}


// ======================================================
// CANCEL TICKET
// ======================================================

function cancelTicket(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this ticket?"
        );


    if (!confirmCancel) {
        return;
    }


    fetch(
        API +
        "/booking/cancel/" +
        id,
        {

            method: "DELETE"

        }
    )

    .then(response => {

        return response.text();

    })

    .then(data => {

        alert(data);

        loadBookings();

    })

    .catch(error => {

        console.error(
            "CANCEL ERROR:",
            error
        );

        alert(
            "Cancellation failed.\n" +
            error.message
        );

    });
}


// ======================================================
// LOAD TICKET PAGE
// ======================================================

function loadTicket() {

    const raw =
        localStorage.getItem(
            "lastTicket"
        );


    const result =
        document.getElementById(
            "ticket"
        );


    // ==================================================
    // IF ticket.html USES DYNAMIC DIV
    // ==================================================

    if (result) {

        if (!raw) {

            result.innerHTML = `

                <div class="empty">

                    <h3>
                        No ticket available
                    </h3>

                    <a href="searchbus.html">
                        Search for a bus
                    </a>

                </div>

            `;

            return;
        }


        const ticket =
            JSON.parse(raw);


        result.innerHTML = `

            <div class="ticket">

                <div class="ticket-header">

                    <h1>
                        🚌 BusGo
                    </h1>

                    <p>
                        Booking Confirmed ✓
                    </p>

                </div>


                <div class="ticket-body">

                    <div class="ticket-row">

                        <span class="ticket-label">
                            Passenger
                        </span>

                        <span class="ticket-value">
                            ${ticket.passengerName}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Bus
                        </span>

                        <span class="ticket-value">
                            ${ticket.busName}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Bus Number
                        </span>

                        <span class="ticket-value">
                            ${ticket.busNumber}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Route
                        </span>

                        <span class="ticket-value">
                            ${ticket.source}
                            →
                            ${ticket.destination}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Journey Date
                        </span>

                        <span class="ticket-value">
                            ${ticket.journeyDate}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Departure
                        </span>

                        <span class="ticket-value">
                            ${ticket.departureTime}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Arrival
                        </span>

                        <span class="ticket-value">
                            ${ticket.arrivalTime}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Seat Number
                        </span>

                        <span class="ticket-value">
                            ${ticket.seatNumber}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Fare
                        </span>

                        <span class="ticket-value">
                            ₹${ticket.fare}
                        </span>

                    </div>


                    <div class="ticket-row">

                        <span class="ticket-label">
                            Email
                        </span>

                        <span class="ticket-value">
                            ${ticket.email}
                        </span>

                    </div>

                </div>


                <div class="ticket-footer">

                    <p>
                        Thank you for booking
                        with BusGo.
                    </p>


                    <br>


                    <button
                        onclick="
                            window.location.href='mybookings.html'
                        "
                    >
                        My Bookings
                    </button>


                    <button
                        onclick="
                            window.location.href='searchbus.html'
                        "
                    >
                        Book Another Ticket
                    </button>

                </div>

            </div>

        `;

        return;
    }


    // ==================================================
    // IF ticket.html USES INDIVIDUAL ELEMENTS
    // ==================================================

    setText(
        "ticketSource",
        localStorage.getItem(
            "selectedSource"
        )
    );

    setText(
        "ticketDestination",
        localStorage.getItem(
            "selectedDestination"
        )
    );

    setText(
        "ticketBusName",
        localStorage.getItem(
            "selectedBusName"
        )
    );

    setText(
        "ticketBusNumber",
        localStorage.getItem(
            "selectedBusNumber"
        )
    );

    setText(
        "ticketDepartureDate",
        localStorage.getItem(
            "journeyDate"
        )
    );

    setText(
        "ticketDepartureTime",
        localStorage.getItem(
            "selectedDepartureTime"
        )
    );

    setText(
        "ticketArrivalDate",
        localStorage.getItem(
            "journeyDate"
        )
    );

    setText(
        "ticketArrivalTime",
        localStorage.getItem(
            "selectedArrivalTime"
        )
    );

    setText(
        "ticketFare",
        "₹" +
        (
            localStorage.getItem(
                "selectedFare"
            ) || "--"
        )
    );

    setText(
        "ticketSeat",
        localStorage.getItem(
            "selectedSeat"
        )
    );

    setText(
        "ticketPassenger",
        localStorage.getItem(
            "passengerName"
        )
    );

    setText(
        "ticketEmail",
        localStorage.getItem(
            "loggedInEmail"
        )
    );
}


// ======================================================
// HELPER - SET TEXT
// ======================================================

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.innerText =
            value || "--";
    }
}
// ======================================================
// LOAD ALL BUSES
// ======================================================

function loadAllBuses() {

    const result =
        document.getElementById("result");

    if (!result) {
        console.error("Result element not found");
        return;
    }


    result.innerHTML = `
        <p>Loading buses...</p>
    `;


    console.log(
        "Requesting buses from backend..."
    );


    fetch("http://localhost:8080/bus/all")

        .then(response => {

            console.log(
                "Backend response status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "HTTP Error: " +
                    response.status
                );

            }


            return response.json();

        })


        .then(data => {

            console.log(
                "Buses received:",
                data
            );


            if (!data ||
                data.length === 0) {

                result.innerHTML = `

                    <div class="empty">

                        <h3>🚌 No buses available</h3>

                        <p>
                            There are currently no buses
                            in the database.
                        </p>

                    </div>

                `;

                return;

            }


            let output = "";


            data.forEach(bus => {

                output += `

                    <div class="bus-card">

                        <h2>
                            🚌 ${bus.busName}
                        </h2>


                        <p>
                            <strong>
                                Bus Number:
                            </strong>

                            ${bus.busNumber}
                        </p>


                        <p>
                            📍

                            <strong>
                                ${bus.source}
                            </strong>

                            →

                            <strong>
                                ${bus.destination}
                            </strong>
                        </p>


                        <p>
                            🕐

                            ${bus.departureTime}

                            →

                            ${bus.arrivalTime}
                        </p>


                        <p>
                            💰

                            Fare:

                            <strong>
                                ₹${bus.fare}
                            </strong>
                        </p>


                        <p>
                            💺

                            Available Seats:

                            <strong>
                                ${bus.availableSeats}
                            </strong>
                        </p>


                        <button
                            type="button"
                            class="book-btn"
                            onclick="selectBusFromBusesPage(
                                ${bus.id}
                            )"
                        >
                            🎟️ Book Ticket
                        </button>

                    </div>

                `;

            });


            result.innerHTML =
                output;

        })


        .catch(error => {

            console.error(
                "LOAD ALL BUSES ERROR:",
                error
            );


            result.innerHTML = `

                <div class="error-box">

                    <h3>
                        ❌ Unable to load buses
                    </h3>

                    <p>
                        Make sure Spring Boot is
                        running on port 8080.
                    </p>

                    <p>
                        Error:
                        ${error.message}
                    </p>

                </div>

            `;

        });

}
// ======================================================
// SELECT BUS FROM BUSES PAGE
// ======================================================

function selectBusFromBusesPage(busId) {

    console.log(
        "Selected Bus ID:",
        busId
    );


    localStorage.setItem(
        "selectedBusId",
        busId
    );


    window.location.href =
        "booking.html";
}