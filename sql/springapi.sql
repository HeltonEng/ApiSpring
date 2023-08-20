-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Ago-2023 às 00:10
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `springapi`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` bigint(20) NOT NULL,
  `produto` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `preco` varchar(255) DEFAULT NULL,
  `peco` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `produto`, `marca`, `url`, `preco`, `peco`) VALUES
(85, 'TV', 'Samsumg', '1692561760852-0.jpg', '3000', NULL),
(86, 'Fone', 'JBL', '1692566760124-0.jpg', '600', NULL),
(87, 'Notebook', 'DELL', '1692561821329-2.jpg', '3000', NULL),
(88, 'Caixa de Som', 'JBL', '1692561862430-3.jpg', '300', NULL),
(89, 'Pc Gamer', 'Pichau', '1692561886401-4.jpg', '5000', NULL),
(90, 'Relogio Smarth', 'Samsumg', '1692561928221-5.jpg', '500', NULL),
(91, 'Smartphone', 'Apple', '1692561992791-6.jpg', '6000', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `perfil` varchar(255) DEFAULT NULL,
  `serfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `senha`, `perfil`, `serfil`) VALUES
(1, 'admin', 'admin', 'admin', NULL),
(2, 'joao', '123456', 'user', NULL),
(3, 'pedro', '123456', 'user', NULL),
(4, 'matheus', '123456', 'user', NULL),
(5, 'ana', '123456', 'user', NULL),
(6, 'julia', '123456', 'user', NULL),
(7, 'marcos', '123456', 'user', NULL),
(8, 'vera', '123456', 'user', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
