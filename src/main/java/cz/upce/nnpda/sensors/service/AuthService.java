package cz.upce.nnpda.sensors.service;

import cz.upce.nnpda.sensors.dao.UserRepository;
import cz.upce.nnpda.sensors.model.UserRole;
import cz.upce.nnpda.sensors.model.database.User;
import cz.upce.nnpda.sensors.model.dto.Credentials;
import cz.upce.nnpda.sensors.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    EmailService emailService;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = findByUsername(name);

        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return new ArrayList<>();
            }

            @Override
            public String getPassword() {
                return user.getPassword();
            }

            @Override
            public String getUsername() {
                return user.getUsername();
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        };
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    public User addUser(Credentials credentials) {
        User user = new User();
        user.setUsername(credentials.getName());
        user.setPassword(encoder.encode(credentials.getPassword()));
        user.setRole(UserRole.AUTHENTICATED.getValue());
        return userRepository.save(user);
    }

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = findByUsername(username);

        if (user == null) {
            throw new AccessDeniedException("");
        }

        return user;
    }

    public void requireUser(int userId) {
        int currentUserId = getCurrentUser().getId();

        if (userId != currentUserId) {
            throw new AccessDeniedException("");
        }
    }

    public void requireRole(UserRole role) {
        User currentUser = getCurrentUser();

        if (currentUser.getRole() < role.getValue()) {
            throw new AccessDeniedException("");
        }
    }

    public void resetPassword(String username) {
        String token = jwtUtil.generateToken(username);
        emailService.sendEmail(username, "Reset password", "Reset password link:\n\n" + "http://localhost:3000/reset-password/" + token);
    }

    public void setPassword(int userId, String password) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            user.setPassword(encoder.encode(password));
            userRepository.save(user);
        }

    }

}
