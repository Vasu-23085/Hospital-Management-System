
package com.hospital.management.service;

import com.hospital.management.entity.Prescription;
import com.hospital.management.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository repository;

    public PrescriptionService(PrescriptionRepository repository) {
        this.repository = repository;
    }

    public List<Prescription> getAll() {
        return repository.findAll();
    }

    public Prescription add(Prescription prescription) {
        return repository.save(prescription);
    }
}
