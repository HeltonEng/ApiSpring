package com.example.apiSpring.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apiSpring.entities.Usuarios;


public interface UserRepository extends JpaRepository<Usuarios, Long>{

	//procurando por nome 
    List<Usuarios> findByNome(String Nome);


}
