
package com.hospital.management.controller;

import com.hospital.management.entity.Bill;
import com.hospital.management.service.BillService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "*")
public class BillController {

    private final BillService service;

    public BillController(BillService service) {
        this.service = service;
    }

    @GetMapping
    public List<Bill> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Bill add(@RequestBody Bill bill) {
        return service.add(bill);
    }
}
