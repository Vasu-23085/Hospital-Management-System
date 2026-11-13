
package com.hospital.management.service;

import com.hospital.management.entity.Medicine;
import com.hospital.management.repository.MedicineRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository repository;

    public MedicineService(MedicineRepository repository) {
        this.repository = repository;
    }

    public List<Medicine> getAll() {
        return repository.findAll();
    }

    public Medicine add(Medicine medicine) {
        return repository.save(medicine);
    }
}
