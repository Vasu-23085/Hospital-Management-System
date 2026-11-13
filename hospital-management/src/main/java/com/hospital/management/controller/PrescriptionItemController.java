
package com.hospital.management.controller;

import com.hospital.management.entity.PrescriptionItem;
import com.hospital.management.service.PrescriptionItemService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prescription-items")
@CrossOrigin(origins = "*")
public class PrescriptionItemController {

    private final PrescriptionItemService service;

    public PrescriptionItemController(PrescriptionItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<PrescriptionItem> getAll() {
        return service.getAll();
    }

    @PostMapping
    public PrescriptionItem add(@RequestBody PrescriptionItem item) {
        return service.add(item);
    }
}
