package cz.upce.nnpda.sensors.dao;

import cz.upce.nnpda.sensors.model.database.MeasuredValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeasuredValueRepository extends JpaRepository<MeasuredValue, Integer> {

    Page<MeasuredValue> findAllBySensorId(Pageable pageable, int sensorId);

}