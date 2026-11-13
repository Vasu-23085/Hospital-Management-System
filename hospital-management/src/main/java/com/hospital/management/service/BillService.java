
package com.hospital.management.service;

import com.hospital.management.entity.Bill;
import com.hospital.management.repository.BillRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BillService {

    private final BillRepository repository;

    public BillService(BillRepository repository) {
        this.repository = repository;
    }

    public List<Bill> getAll() {
        return repository.findAll();
    }

    public Bill add(Bill bill) {
        return repository.save(bill);
    }
}
