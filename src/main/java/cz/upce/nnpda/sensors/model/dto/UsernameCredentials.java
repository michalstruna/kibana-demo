package cz.upce.nnpda.sensors.model.dto;

public class UsernameCredentials {

    private String username;

    public UsernameCredentials() {

    }

    public UsernameCredentials(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
