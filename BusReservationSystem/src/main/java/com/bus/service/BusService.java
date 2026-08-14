package com.bus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bus.entity.Bus;
import com.bus.repository.BusRepository;

@Service
public class BusService {

    @Autowired
    private BusRepository repository;

    public Bus saveBus(Bus bus) {
        return repository.save(bus);
    }

    public List<Bus> getAllBuses() {
        return repository.findAll();
    }
}