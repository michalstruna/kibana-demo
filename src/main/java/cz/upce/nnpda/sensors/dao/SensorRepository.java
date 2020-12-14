package cz.upce.nnpda.sensors.dao;

import cz.upce.nnpda.sensors.model.database.Sensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Integer> {

    Page<Sensor> findAllByDeviceId(Pageable pageable, int deviceId);

}