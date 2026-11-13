
package com.hospital.management.service;

import com.hospital.management.entity.PrescriptionItem;
import com.hospital.management.repository.PrescriptionItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PrescriptionItemService {

    private final PrescriptionItemRepository repository;

    public PrescriptionItemService(PrescriptionItemRepository repository) {
        this.repository = repository;
    }

    public List<PrescriptionItem> getAll() {
        return repository.findAll();
    }

    public PrescriptionItem add(PrescriptionItem item) {
        return repository.save(item);
    }
}
