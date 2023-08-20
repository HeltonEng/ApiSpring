package com.example.apiSpring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Controller
public class uploadController {
    @Value("${upload.path}") // Configura o caminho de upload no application.properties
    private String uploadPath;

    @CrossOrigin
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestPart("image") MultipartFile image, @RequestPart("nome") String nome) {
        try {
            // Verifica se a pasta de upload existe, senão cria
            Path uploadFolderPath = Paths.get(uploadPath);
            if (!uploadFolderPath.toFile().exists()) {
                uploadFolderPath.toFile().mkdirs();
            }

            // Salva a imagem no disco
            File imageFile = new File(uploadFolderPath.toString(), nome); //image.getOriginalFilename());
            image.transferTo(imageFile);

            // Aqui, estamos apenas imprimindo algumas informações sobre o arquivo
            System.out.println("Nome do arquivo: " + image.getOriginalFilename());
            System.out.println("Tipo de mídia: " + image.getContentType());
            System.out.println("Tamanho do arquivo: " + image.getSize() + " bytes");
            System.out.println("Novo nome do arquivo: " + nome);

            return new ResponseEntity<>("Imagem salva com sucesso.", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao salvar a imagem.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{imageName}")
    public ResponseEntity<String> deleteImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(uploadPath, imageName);
            File imageFile = imagePath.toFile();

            if (imageFile.exists()) {
                if (imageFile.delete()) {
                    return new ResponseEntity<>("Imagem excluída com sucesso.", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Não foi possível excluir a imagem.", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                return new ResponseEntity<>("Imagem não encontrada.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao excluir a imagem.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
