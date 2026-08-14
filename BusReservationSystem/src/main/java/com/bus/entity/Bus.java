package com.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bus")
public class Bus {

    // ==========================
    // ID
    // ==========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================
    // BUS DETAILS
    // ==========================

    @Column(name = "bus_name")
    private String busName;

    @Column(name = "bus_number")
    private String busNumber;


    // ==========================
    // ROUTE
    // ==========================

    @Column(name = "source")
    private String source;

    @Column(name = "destination")
    private String destination;


    // ==========================
    // TIME
    // ==========================

    @Column(name = "departure_time")
    private String departureTime;

    @Column(name = "arrival_time")
    private String arrivalTime;


    // ==========================
    // FARE & SEATS
    // ==========================

    @Column(name = "fare")
    private double fare;

    @Column(name = "available_seats")
    private int availableSeats;


    // ==========================
    // DEFAULT CONSTRUCTOR
    // ==========================

    public Bus() {
    }


    // ==========================
    // CONSTRUCTOR
    // ==========================

    public Bus(
            String busName,
            String busNumber,
            String source,
            String destination,
            String departureTime,
            String arrivalTime,
            double fare,
            int availableSeats
    ) {

        this.busName = busName;
        this.busNumber = busNumber;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.fare = fare;
        this.availableSeats = availableSeats;
    }


    // ==========================
    // ID GETTER / SETTER
    // ==========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // ==========================
    // BUS NAME
    // ==========================

    public String getBusName() {
        return busName;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }


    // ==========================
    // BUS NUMBER
    // ==========================

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }


    // ==========================
    // SOURCE
    // ==========================

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }


    // ==========================
    // DESTINATION
    // ==========================

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }


    // ==========================
    // DEPARTURE TIME
    // ==========================

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }


    // ==========================
    // ARRIVAL TIME
    // ==========================

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }


    // ==========================
    // FARE
    // ==========================

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }


    // ==========================
    // AVAILABLE SEATS
    // ==========================

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

}