<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css">
    <title>Login</title>
</head>
<body>
    <form action="testLog.php" method="POST">
        <h1>Login</h1>
        <div class="container">
            <input type="text" required name="nome">
            <label>Nome</label>
        </div>
        <div class="container">
            <input type="password" required name="senha">
            <label>Senha</label>
        </div>
        <button type="submit" name="submit">Entrar</button>
    </form>    
</body>
</html>