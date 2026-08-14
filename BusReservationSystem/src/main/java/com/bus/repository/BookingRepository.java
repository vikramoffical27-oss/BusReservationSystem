package com.bus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bus.entity.Booking;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    List<Booking> findByEmail(String email);

    Optional<Booking> findByBusIdAndSeatNumber(
            Long busId,
            int seatNumber
    );

    boolean existsByBusIdAndSeatNumber(
            Long busId,
            int seatNumber
    );

    List<Booking> findByBusId(Long busId);
}