package cz.upce.nnpda.sensors.model;

public enum UserRole {
    AUTHENTICATED(1),
    ADMIN(2);

    private int value;

    private UserRole(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
