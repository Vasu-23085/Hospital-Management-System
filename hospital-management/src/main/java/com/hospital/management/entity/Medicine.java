
package com.hospital.management.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Integer medicineId;

    @Column(name = "medicine_name", nullable = false)
    private String medicineName;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    public Medicine() {}

    public Integer getMedicineId() { return medicineId; }
    public void setMedicineId(Integer id) { this.medicineId = id; }

    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String name) { this.medicineName = name; }

    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal price) { this.unitPrice = price; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer quantity) { this.stockQuantity = quantity; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate date) { this.expiryDate = date; }
}
