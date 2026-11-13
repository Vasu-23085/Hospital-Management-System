
package com.hospital.management.service;

import com.hospital.management.entity.Payment;
import com.hospital.management.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<Payment> getAll() {
        return repository.findAll();
    }

    public Payment add(Payment payment) {
        return repository.save(payment);
    }
}
