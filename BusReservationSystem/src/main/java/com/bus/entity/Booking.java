package com.bus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Booking {

    // ==========================
    // BOOKING ID
    // ==========================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================
    // PASSENGER DETAILS
    // ==========================

    @Column(name = "passenger_name")
    private String passengerName;

    @Column(name = "age")
    private int age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "email")
    private String email;


    // ==========================
    // BUS ID
    // ==========================

    @Column(name = "bus_id")
    private Long busId;


    // ==========================
    // SEAT DETAILS
    // ==========================

    @Column(name = "seat_number")
    private int seatNumber;


    // ==========================
    // BUS DETAILS
    // ==========================

    @Column(name = "bus_name")
    private String busName;

    @Column(name = "bus_number")
    private String busNumber;

    @Column(name = "source")
    private String source;

    @Column(name = "destination")
    private String destination;


    // ==========================
    // JOURNEY DETAILS
    // ==========================

    @Column(name = "departure_date")
    private String departureDate;

    @Column(name = "departure_time")
    private String departureTime;

    @Column(name = "arrival_date")
    private String arrivalDate;

    @Column(name = "arrival_time")
    private String arrivalTime;


    // ==========================
    // FARE
    // ==========================

    @Column(name = "fare")
    private double fare;


    // ==========================
    // DEFAULT CONSTRUCTOR
    // ==========================

    public Booking() {
    }


    // ==========================
    // GET ID
    // ==========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // ==========================
    // PASSENGER NAME
    // ==========================

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }


    // ==========================
    // AGE
    // ==========================

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


    // ==========================
    // GENDER
    // ==========================

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    // ==========================
    // EMAIL
    // ==========================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // ==========================
    // BUS ID
    // ==========================

    public Long getBusId() {
        return busId;
    }

    public void setBusId(Long busId) {
        this.busId = busId;
    }


    // ==========================
    // SEAT NUMBER
    // ==========================

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
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
    // DEPARTURE DATE
    // ==========================

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
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
    // ARRIVAL DATE
    // ==========================

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
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
}