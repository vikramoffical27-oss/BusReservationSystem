package com.bus.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bus.entity.Booking;
import com.bus.entity.Bus;
import com.bus.repository.BookingRepository;
import com.bus.repository.BusRepository;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    BusRepository busRepository;


    // ==========================
    // BOOK TICKET
    // ==========================

@PostMapping("/add")
public String bookTicket(@RequestBody Booking booking) {

    Optional<Bus> bus =
            busRepository.findById(booking.getBusId());

    if (bus.isEmpty()) {
        return "Bus Not Found";
    }

    Bus b = bus.get();

    // Check seat already booked
    boolean seatBooked =
            bookingRepository.existsByBusIdAndSeatNumber(
                    booking.getBusId(),
                    booking.getSeatNumber()
            );

    if (seatBooked) {
        return "Seat Already Booked";
    }

    // Check available seats
    if (b.getAvailableSeats() <= 0) {
        return "No Seats Available";
    }

    // Decrease available seats
    b.setAvailableSeats(
            b.getAvailableSeats() - 1
    );

    busRepository.save(b);

    // Save booking
    bookingRepository.save(booking);

    return "Ticket Booked Successfully";
}


    // ==========================
    // GET ALL BOOKINGS
    // ==========================

    @GetMapping("/all")
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();

    }


    // ==========================
    // GET MY BOOKINGS
    // ==========================

    @GetMapping("/mybooking")
    public List<Booking> getMyBookings(
            @RequestParam String email) {

        return bookingRepository.findByEmail(email);

    }
    // ==========================
// GET BOOKED SEATS
// ==========================

@GetMapping("/booked-seats")
public List<Integer> getBookedSeats(
        @RequestParam Long busId) {

    return bookingRepository
            .findByBusId(busId)
            .stream()
            .map(Booking::getSeatNumber)
            .toList();
}


    // ==========================
    // CANCEL TICKET
    // ==========================

    @DeleteMapping("/cancel/{id}")
    public String cancelTicket(
            @PathVariable Long id) {

        Optional<Booking> booking =
                bookingRepository.findById(id);

        if (booking.isEmpty()) {

            return "Booking Not Found";

        }

        Booking b = booking.get();


        // Find the bus
        Optional<Bus> bus =
                busRepository.findById(b.getBusId());


        // Increase available seats
        if (bus.isPresent()) {

            Bus busData = bus.get();

            busData.setAvailableSeats(
                    busData.getAvailableSeats() + 1
            );

            busRepository.save(busData);

        }


        // Delete booking
        bookingRepository.deleteById(id);


        return "Ticket Cancelled Successfully";

    }

}