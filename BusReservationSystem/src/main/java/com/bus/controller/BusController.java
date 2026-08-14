package com.bus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bus.entity.Bus;
import com.bus.repository.BusRepository;

@RestController
@RequestMapping("/bus")
@CrossOrigin(origins = "*")
public class BusController {

    @Autowired
    private BusRepository busRepository;


    // ==========================================
    // ADD BUS
    // ==========================================

    @PostMapping("/add")
    public Bus addBus(@RequestBody Bus bus) {

        return busRepository.save(bus);
    }


    // ==========================================
    // GET ALL BUSES
    // ==========================================

    @GetMapping("/all")
    public List<Bus> getAllBuses() {

        return busRepository.findAll();
    }


    // ==========================================
    // GET BUS BY ID
    // ==========================================

    @GetMapping("/{id}")
    public Bus getBusById(
            @PathVariable Long id) {

        return busRepository
                .findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Bus not found with ID: " + id
                    )
                );
    }


    // ==========================================
    // SEARCH BUS
    // ==========================================

    @GetMapping("/search")
    public List<Bus> searchBus(
            @RequestParam String source,
            @RequestParam String destination) {

        return busRepository
                .findBySourceAndDestination(
                        source,
                        destination
                );
    }

}