package cz.upce.nnpda.sensors.dao;

import cz.upce.nnpda.sensors.model.database.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {

    Page<Device> findAllByUserId(Pageable pageable, int userId);

}