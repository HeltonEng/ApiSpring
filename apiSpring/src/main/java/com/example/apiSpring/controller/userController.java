package com.example.apiSpring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apiSpring.dao.UserRepository;
import com.example.apiSpring.entities.Usuarios;



@RestController
@RequestMapping(value = "/user")
public class userController {

	
	@Autowired
	private UserRepository userRepository;
	
	@CrossOrigin
	@GetMapping("/usuarios")
	public List<Usuarios> getUsers() {		
		List<Usuarios> list = userRepository.findAll();		
		return list;
	}
	
		
	@CrossOrigin
	@PostMapping("/save")
	public Usuarios saveUser(@RequestBody Usuarios user) {
		userRepository.save(user);
		return user;
	}
	
	@CrossOrigin
	@GetMapping("/find/{nome}")
	public List<Usuarios> getUserByNome(@PathVariable String nome) {
		List<Usuarios> user = userRepository.findByNome(nome);
		return user;
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public Optional<Usuarios> getUserById(@PathVariable Long id) {
		Optional<Usuarios> user = userRepository.findById(id);
		return user;
	}
	
	@CrossOrigin
	@DeleteMapping("/delete/{id}")
	public Optional<Usuarios> deleteUser(@PathVariable Long id) {
		Optional<Usuarios> user = userRepository.findById(id);
		userRepository.deleteById(id);
		return user;
	}
	
	@CrossOrigin
	@PutMapping("/update/{id}")
	public Optional<Usuarios> updateUser(@PathVariable Long id, @RequestBody Usuarios userDetail) {
           Optional<Usuarios> user = userRepository.findById(id);
           Usuarios userUpdate = new Usuarios();
           userUpdate = user.get();
           userUpdate.setNome(userDetail.getNome());
           userUpdate.setSenha(userDetail.getSenha());
           userUpdate.setPerfil(userDetail.getPerfil());
           userRepository.save(userUpdate);
		   return user;
	}
	
}
