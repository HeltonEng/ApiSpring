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

import com.example.apiSpring.dao.ProdutosRepository;
import com.example.apiSpring.entities.Produtos;


@RestController
@RequestMapping(value = "/api")
public class produtosController {

	@Autowired
	private ProdutosRepository produtosRepository;
	
	@CrossOrigin
	@GetMapping("/produtos")
	public List<Produtos> getUsers() {		
		List<Produtos> list = produtosRepository.findAll();		
		return list;
	}
		
	@CrossOrigin
	@PostMapping("/save")
	public Produtos saveUser(@RequestBody Produtos produto) {
		produtosRepository.save(produto);
		return produto;
	}
	
	@CrossOrigin
	@GetMapping("/find/{nome}")
	public List<Produtos> getUserByNome(@PathVariable String nome) {
		List<Produtos> produto = produtosRepository.findByProduto(nome);
		return produto;
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public Optional<Produtos> getUserById(@PathVariable Integer id) {
		Optional<Produtos> produto = produtosRepository.findById(id);
		return produto;
	}
	
	@CrossOrigin
	@DeleteMapping("/delete/{id}")
	public Optional<Produtos> deleteUser(@PathVariable Integer id) {
		Optional<Produtos> produto =produtosRepository.findById(id);
		produtosRepository.deleteById(id);
		return produto;
	}
	
	@CrossOrigin
	@PutMapping("/update/{id}")
	public Optional<Produtos> updateUser(@PathVariable Integer id, @RequestBody Produtos produtoDetail) {
           Optional<Produtos> produto = produtosRepository.findById(id);
           Produtos produtoUpdate = new Produtos();
           produtoUpdate = produto.get();
           produtoUpdate.setProduto(produtoDetail.getProduto());
           produtoUpdate.setMarca(produtoDetail.getMarca());
           produtoUpdate.setUrl(produtoDetail.getUrl());
           produtoUpdate.setPreco(produtoDetail.getPreco());
           produtosRepository.save(produtoUpdate);
		   return produto;
	}
}
