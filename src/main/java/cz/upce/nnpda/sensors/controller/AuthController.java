package cz.upce.nnpda.sensors.controller;

import cz.upce.nnpda.sensors.exception.BadRequestException;
import cz.upce.nnpda.sensors.exception.ConflictException;
import cz.upce.nnpda.sensors.model.database.User;
import cz.upce.nnpda.sensors.model.dto.*;
import cz.upce.nnpda.sensors.service.AuthService;
import cz.upce.nnpda.sensors.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("")
    public Identity auth(@RequestBody Credentials credentials) {
        User user = getAuthenticatedUser(credentials);
        Identity identity = new Identity();
        identity.setName(user.getUsername());
        identity.setToken(jwtUtil.generateToken(user.getUsername()));
        identity.setRole(user.getRole());
        return identity;
    }

    @PostMapping("/new")
    public Identity register(@RequestBody Credentials credentials) {
        if (authService.findByUsername(credentials.getName()) != null) {
            throw new ConflictException("User " + credentials.getName() + " already exists.");
        }

        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(credentials.getName());

        if (!matcher.matches()) {
            throw new BadRequestException("Username " + credentials.getName() + " is not valid email.");
        }

        User user = authService.addUser(credentials);
        Identity identity = new Identity();
        identity.setName(user.getUsername());
        identity.setToken(jwtUtil.generateToken(user.getUsername()));
        identity.setRole(user.getRole());

        return identity;
    }

    @PostMapping("/password")
    public void setPassword(@RequestBody NewTokenCredentials credentials) {
        String username = jwtUtil.getUserName(credentials.getToken());
        User user = authService.findByUsername(username);

        if (user == null) {
            throw new BadRequestException("Invalid reset token.");
        }

        authService.setPassword(user.getId(), credentials.getPassword());
    }

    @PostMapping("/password/reset")
    public void resetPassword(@RequestBody UsernameCredentials credentials) {
        authService.resetPassword(credentials.getUsername());
    }

    @PutMapping("/password")
    public void updatePassword(@RequestBody NewPassword newCredentials) {
        User user = authService.getCurrentUser();
        getAuthenticatedUser(new Credentials(user.getUsername(), newCredentials.getOldPassword()));
        authService.setPassword(user.getId(), newCredentials.getPassword());
    }

    private User getAuthenticatedUser(Credentials credentials) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentials.getName(), credentials.getPassword()));
            return authService.findByUsername(credentials.getName());
        } catch (Exception e) {
            throw new BadCredentialsException("INVALID_CREDENTIALS");
        }
    }


}
