
package com.hospital.management.controller;

import com.hospital.management.entity.Prescription;
import com.hospital.management.service.PrescriptionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Prescription> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Prescription add(@RequestBody Prescription prescription) {
        return service.add(prescription);
    }
}
