
package com.hospital.management.controller;

import com.hospital.management.entity.Medicine;
import com.hospital.management.service.MedicineService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    private final MedicineService service;

    public MedicineController(MedicineService service) {
        this.service = service;
    }

    @GetMapping
    public List<Medicine> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Medicine add(@RequestBody Medicine medicine) {
        return service.add(medicine);
    }
}
