package com.example.apiSpring.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apiSpring.entities.Produtos;
import com.example.apiSpring.entities.Usuarios;

public interface ProdutosRepository extends JpaRepository<Produtos, Integer>{
	//procurando por nome 
    List<Produtos> findByProduto(String Nome);

}
