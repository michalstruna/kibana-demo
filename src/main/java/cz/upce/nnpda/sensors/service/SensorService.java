package cz.upce.nnpda.sensors.service;

import cz.upce.nnpda.sensors.dao.MeasuredValueRepository;
import cz.upce.nnpda.sensors.dao.SensorRepository;
import cz.upce.nnpda.sensors.model.SensorType;
import cz.upce.nnpda.sensors.model.database.Device;
import cz.upce.nnpda.sensors.model.database.MeasuredValue;
import cz.upce.nnpda.sensors.model.database.Sensor;
import cz.upce.nnpda.sensors.model.dto.NewSensor;
import cz.upce.nnpda.sensors.model.dto.UpdatedSensor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private MeasuredValueRepository measuredValueRepository;

    public Sensor getById(int id) {
        return sensorRepository.findById(id).orElse(null);
    }

    public Page<Sensor> getAllByDeviceId(Pageable pageable, int deviceId) {
        return sensorRepository.findAllByDeviceId(pageable, deviceId);
    }

    public Sensor add(NewSensor newSensor, Device device) {
        Sensor sensor = new Sensor(newSensor, device);
        return sensorRepository.save(sensor);
    }

    public void remove(int sensorId) {
        sensorRepository.deleteById(sensorId);
    }

    public Sensor update(int sensorId, UpdatedSensor newSensor) {
        Sensor sensor = getById(sensorId);
        sensor.setName(newSensor.getName());
        sensor.setDevice(newSensor.getDevice());

        sensorRepository.save(sensor);
        return sensor;
    }

    /**
     * Measure data from each sensor (count-times).
     */
    public void measureAll(int count) {
        List<Sensor> sensors = sensorRepository.findAll();
        List<MeasuredValue> values = new ArrayList<>();
        Random random = new Random();

        for (Sensor sensor : sensors) {
            long time = Math.round(System.currentTimeMillis() / 60000.0) * 60000;

            for (int i = 0; i < count; i++) {
                MeasuredValue value = new MeasuredValue(0, SensorType.valueOf(sensor.getType()).getUnit(), sensor, time);
                values.add(value);
                time -= 60 * 60 * 1000; // Hour in ms.

                switch (SensorType.valueOf(sensor.getType())) {
                    case ANEMOMETER:
                        value.setValue(random.nextGaussian() * Math.sqrt(12) + 6);
                        break;
                    case BAROMETER:
                        value.setValue(random.nextGaussian() * Math.sqrt(30) + 101325 - 8 * sensor.getDevice().getAltitude());
                        break;
                    case HYGROMETER:
                        value.setValue(Math.min(100, random.nextGaussian() * Math.sqrt(20) + 70));
                        break;
                    case THERMOMETER:
                        value.setValue(random.nextGaussian() * Math.sqrt(30) + 15);
                        break;
                }
            }
        }

        measuredValueRepository.saveAll(values);
    }

    public Page<MeasuredValue> getMeasuredValues(Pageable pageable, int sensorId) {
        return measuredValueRepository.findAllBySensorId(pageable, sensorId);
    }

}
