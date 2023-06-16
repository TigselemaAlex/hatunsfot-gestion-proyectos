package com.example.backend.security.service;

import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.model.UserPrincipal;
import com.example.backend.utils.mappers.UserMapper;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserPrincipalService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserPrincipalService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        UserPrincipal userPrincipal = UserMapper.INSTANCE.userPrincipalFromUser(user);
        userPrincipal.setAuthorities(UserMapper.INSTANCE.mapRolesToAuthorities(user.getRole()));
        return userPrincipal;
    }
}
