//Url api spring
const apiUrl = "192.168.0.116";

//Funcoes de carregamento de pagina
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const pageContent = document.getElementById('page-content');

// Função para carregar o conteúdo da página no elemento "page-content"
function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(data => {
            if (pageUrl === 'inicial'){
                pageContent.innerHTML = null;
                inicial.style.display = 'block';
            }else{
                inicial.style.display = 'none';
                pageContent.innerHTML = data;
                // Carrega os dados da API apenas quando a página colaboradores.php é carregada
                if (pageUrl === 'colaboradores.php') {
                    //menuToggle.click();
                    fetchColaboradoresData();
                }
                // Carrega os dados da API apenas quando a página produtos.php é carregada
                if (pageUrl === 'produtos.php') {
                    fetchProdutosData();
                }
                if (pageUrl === 'sair.php') {
                    alert("Até logo.");
                    window.location.replace("index.php");
                }
            }
        })
        .catch(error => {
            console.error('Erro ao carregar a página:', error);
        });
}

// Event listener para os links do menu
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const pageUrl = this.getAttribute('data-page');
        loadPage(pageUrl);
        menuToggle.click();
    });
});

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    setTimeout(() => {
        const element = document.querySelector('.content');
        element.classList.toggle('open');
    },20)
});

//Lendo dados
// Função para carregar os dados da API e preencher a tabela
function fetchColaboradoresData() {
    fetch('http://' + apiUrl + ':8080/user/usuarios')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //const tableBody = document.getElementById('tableClient');
            // Limpa a tabela antes de preencher com os dados atualizados
            //tableBody.innerHTML = '';

            // Loop pelos dados recebidos e cria uma nova linha na tabela para cada colaborador
            data.forEach(colaborador => {
                //const newRow = tableBody.insertRow();
                const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                    <td>${colaborador.id}</td>
                    <td>${colaborador.nome}</td>
                    <td>${colaborador.senha}</td>
                    <td>${colaborador.perfil}</td>
                    <td>
                        <button type="button" class="button green" onclick=editar(${colaborador.id})>Editar</button>
                        <button type="button" class="button red" onclick="deleta(${colaborador.id})">Excluir</button>
                    </td>
                `;
                document.querySelector('#tableClient>tbody').appendChild(newRow);
              });
        })
}

//Lendo dados
// Função para carregar os dados da API e preencher a tabela
function fetchProdutosData() {
    fetch('http://' + apiUrl + ':8080/api/produtos')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //const tableBody = document.getElementById('tableClient');
            // Limpa a tabela antes de preencher com os dados atualizados
            //tableBody.innerHTML = '';

            // Loop pelos dados recebidos e cria uma nova linha na tabela para cada colaborador
            data.forEach(produto => {
                //const newRow = tableBody.insertRow();
                const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.produto}</td>
                    <td>${produto.marca}</td>
                    <td><img src=img/${produto.url} width="100" height="100"></td>
                    <td>${produto.preco}</td>
                    <td>
                        <button type="button" class="button green" onclick=editarProduto(${produto.id})>Editar</button>
                        <button type="button" class="button red" onclick="deletaProduto(${produto.id},'${produto.url}')">Excluir</button>
                    </td>
                `;
                document.querySelector('#tableClient>tbody').appendChild(newRow);
              });
        })
}

//busca
function buscar(){
    b = document.getElementById('busca').value;
    console.log(b);
    fetch('http://' + apiUrl + ':8080/user/find/' + b)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tableBody = document.getElementById('tableClient');
        // Limpa a tabela antes de preencher com os dados atualizados
        tableBody.innerHTML = '';

        // Loop pelos dados recebidos e cria uma nova linha na tabela para cada colaborador
        data.forEach(colaborador => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
                <td>${colaborador.id}</td>
                <td>${colaborador.nome}</td>
                <td>${colaborador.perfil}</td>
                <td>
                    <button type="button" class="button green" onclick=editar(${colaborador.id})>Editar</button>
                    <button type="button" class="button red" onclick="deleta(${colaborador.id})">Excluir</button>
                </td>
            `;
        });
    })
    .catch(function(error) {
        console.log(error);
      });
}

//busca produtos
function buscarProdutos(){
    b = document.getElementById('busca').value;
    console.log(b);
    fetch('http://' + apiUrl + ':8080/api/find/' + b)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const tableBody = document.getElementById('tableClient');
        // Limpa a tabela antes de preencher com os dados atualizados
        tableBody.innerHTML = '';

        // Loop pelos dados recebidos e cria uma nova linha na tabela para cada colaborador
        data.forEach(produto => {
            const newRow = tableBody.insertRow();
            newRow.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.produto}</td>
            <td>${produto.marca}</td>
            <td><img src=img/${produto.url} width="100" height="100"></td>
            <td>${produto.preco}</td>
            <td>
                <button type="button" class="button green" onclick=editarProduto(${produto.id})>Editar</button>
                <button type="button" class="button red" onclick="deletaProduto(${produto.id})">Excluir</button>
            </td>
        `;
        });
    })
    .catch(function(error) {
        console.log(error);
      });
}

// Get the modal
var modal = document.getElementById("myModal");

function abrirModal(){
    modal.style.display = "block";
}

// Get the modalProduto
var modalProduto = document.getElementById("produtoModal");

function abrirModalProduto(){
    modalProduto.style.display = "block";
}

function closeForm() {
    let btn = document.getElementById('salvar');
    btn.innerHTML = 'Salvar';
    let title = document.getElementById('tm');
    title.innerHTML = 'Novo Colaborador'
    modal.style.display = "none";
    modalProduto.style.display = "none";
    document.getElementById('nomeProduto').value = "";
    document.getElementById('marcaProduto').value = "";
    document.getElementById('imagemProduto').value = "";
    document.getElementById('precoProduto').value = "";
    document.getElementById('image').src = "img/image.png";
    document.getElementById('myfile').value = "";
}

//Criar usuario
function salvarForm() {
    if(document.getElementById('nome').value != "" && document.getElementById('senha').value != ""){
    //cad = '{"id":"","nome":"' + document.getElementById('nome').value + '","senha":"' + document.getElementById('senha').value + '"}';
    cad = {nome : document.getElementById('nome').value, senha : document.getElementById('senha').value, perfil : document.getElementById('perfil').value};
    console.log(cad);

    fetch('http://' + apiUrl + ':8080/user/save', {
        method: 'POST',
        //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(cad)
    })
        .then(response => response.json());

    //document.location.reload(true);
    modal.style.display = "none";
    loadPage("colaboradores.php");
    }else{
        alert('Preencha todos os campos!!!');
    }
}

//Criar produto
function salvarFormProduto() {
    if(document.getElementById('nomeProduto').value != "" && document.getElementById('marcaProduto').value != ""){
    var urlImagem = document.getElementById('myfile').value;
    urlImagem = urlImagem.split('\\');
    cad = {
        produto: document.getElementById('nomeProduto').value, 
        marca: document.getElementById('marcaProduto').value,
        url: imgProduto.value,//urlImagem[Object.keys(urlImagem).length -1], //document.getElementById('myfile').value,
        preco: document.getElementById('precoProduto').value,
    }
    console.log(cad);
    
    //Enviar imagem
    upload(img);

    fetch('http://' + apiUrl + ':8080/api/save', {
        method: 'POST',
        //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(cad)
    })
    .then(response => response.json());
        
    //document.location.reload(true);
    //modalProduto.style.display = "none";
    closeForm();
    loadPage("produtos.php");
    }else{
        alert('Preencha todos os campos!!!');
    }
}

//Apagar usuario
function deleta(index) {
    if (confirm("Confirma exclusão do registro?")){
        //console.log(index);
        fetch('http://' + apiUrl + ':8080/user/delete/' + index, {
            method: 'DELETE'
        })
        .then(response => response.json());
        //document.location.reload();
        loadPage("colaboradores.php");
    }
}

//Apagar produto
function deletaProduto(id, url) {
    if (confirm("Confirma exclusão do registro?")){
        //console.log(index);
        fetch('http://' + apiUrl + ':8080/api/delete/' + id, {
            method: 'DELETE'
        })
        .then(response => response.json());
        fetch('http://' + apiUrl + ':8080/delete/' + url, {
            method: 'DELETE'
        })
        .then(response => response.json());
        //document.location.reload();
        loadPage("produtos.php");
    }
}

//Editar usuario
function editar(id) {
    //console.log(index);
    let btn = document.getElementById('salvar');
    btn.innerHTML = 'Editar';
    let title = document.getElementById('tm');
    title.innerHTML = 'Editar';
    document.getElementById('salvar').onclick = function () {
        cad = {
            id: id, nome: document.getElementById('nome').value, 
            senha: document.getElementById('senha').value,
            perfil : document.getElementById('perfil').value 
        };
        
        console.log(cad);
        fetch('http://' + apiUrl + ':8080/user/update/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cad)
        })
            .then(response => response.json());
        //document.location.reload();
        let btn = document.getElementById('salvar');
        btn.innerHTML = 'Salvar';
        let title = document.getElementById('tm');
        title.innerHTML = 'Novo Colaborador'
        modal.style.display = "none";
        loadPage("colaboradores.php");
    };

    fetch('http://' + apiUrl + ':8080/user/' + id)
        .then(T => T.json())
        .then(data => {
            //console.log(data);
            console.log(data.nome + " : " + data.senha);
            document.getElementById('nome').value = data.nome;
            document.getElementById('senha').value = data.senha;
            document.getElementById('perfil').value = data.perfil;
        });
  
    modal.style.display = "block";
}

//Editar produto
function editarProduto(idProduto) {
    //console.log(index);
    let btn = document.getElementById('salvarProduto');
    btn.innerHTML = 'Editar';
    let title = document.getElementById('tmProduto');
    title.innerHTML = 'Editar';
    document.getElementById('salvarProduto').onclick = function () {
        var urlImagem = document.getElementById('myfile').value;
        urlImagem = urlImagem.split('\\');
        cad = {
            id: idProduto, 
            produto: document.getElementById('nomeProduto').value, 
            marca: document.getElementById('marcaProduto').value,
            url: urlImagem[Object.keys(urlImagem).length -1], //document.getElementById('myfile').value,
            preco: document.getElementById('precoProduto').value
        }
        console.log(cad);

        fetch('http://' + apiUrl + ':8080/api/update/' + idProduto, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cad)
        })
        .then(response => response.json());

        //Enviar imagem
        upload(img);
        
        let btn = document.getElementById('salvarProduto');
        btn.innerHTML = 'Salvar';
        let title = document.getElementById('tmProduto');
        title.innerHTML = 'Novo Colaborador'
        modalProduto.style.display = "none";
        loadPage("produtos.php");
    };

    fetch('http://' + apiUrl + ':8080/api/' + idProduto)
        .then(T => T.json())
        .then(data => {
            console.log(data);
            document.getElementById('nomeProduto').value = data.produto;
            document.getElementById('marcaProduto').value = data.marca;
            document.getElementById('imagemProduto').value = data.url;
            document.getElementById('precoProduto').value = data.preco;
        });
  
    modalProduto.style.display = "block";
}

//Imagem
var img = document.getElementById('myfile');
var imgProduto = document.getElementById('imagemProduto');
var image = document.getElementById('image');
img.addEventListener('change', function() {
    var src = URL.createObjectURL(img.files[0]);
    imgProduto.value = generateUniqueID() + "." + img.files[0].name.split(".")[1]; //img.value.split("\\")[2];
    image.src = src; //"img/" + img.value.split("\\")[2];
    //upload(img);
})

//Upload imagem
//const upload = (file) => {}
const upload = async (file) =>{
    const formData = new FormData();
    // Adicionar a imagem selecionada ao FormData
    formData.append('image', file.files[0]);
    formData.append('nome', imgProduto.value);

    try {
        const response = await fetch('http://' + apiUrl + ':8080/upload', {
        method: 'POST',
        body: formData,
        });

        if (response.ok) {
            console.log('Imagem enviada com sucesso!');
        } else {
            console.log('Erro ao enviar a imagem:', response.statusText);
        }
    } catch (error) {
        console.log('Erro de rede:', error);
    }
    //loadPage("produtos.php");
  };

//Gerar id unico
let idCounter = 0;
function generateUniqueID() {
    const timestamp = new Date().getTime();
    const uniqueID = `${timestamp}-${idCounter}`;
    idCounter++;
    return uniqueID;
}

  
