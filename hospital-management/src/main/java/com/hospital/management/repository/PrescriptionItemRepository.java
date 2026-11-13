
package com.hospital.management.repository;

import com.hospital.management.entity.PrescriptionItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionItemRepository
        extends JpaRepository<PrescriptionItem, Integer> {
}
