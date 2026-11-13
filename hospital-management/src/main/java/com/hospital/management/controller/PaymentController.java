
package com.hospital.management.controller;

import com.hospital.management.entity.Payment;
import com.hospital.management.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Payment> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Payment add(@RequestBody Payment payment) {
        return service.add(payment);
    }
}
