package cz.upce.nnpda.sensors.model.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cz.upce.nnpda.sensors.model.dto.NewSensor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "measured_value")
public class MeasuredValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private double value;

    @Column(nullable = false)
    private String unit;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sensor_id", nullable=false)
    private Sensor sensor;

    @Column(nullable = false)
    private long time;

    public MeasuredValue() {

    }

    public MeasuredValue(double value, String unit, Sensor sensor, long time) {
        this.value = value;
        this.unit = unit;
        this.sensor = sensor;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
