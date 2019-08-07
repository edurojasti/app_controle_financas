//Objeto despesa...
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor =  valor
    }
    validarDados(){
        /*
        usando método for-in for(let i in this), para verificar cada atributo do
        objeto, e ver se cada um possui um valor ou está em branco (vazio)
        */
        for(let i in this){
            if(
              this[i] == undefined  ||
              this[i] == null       ||
              this[i] == ''         ||
              this[i] =="tipo"      ||
              this[i] =="mes"       ||
              this[i] =="dia"       || 
              this[i] =="ano"){
                return false
            }
        }
        return true
    }
}

//objeto Bd
class Bd{
    //recuperando o ID para criar um novo keyID
    getId(){
        let keyID = localStorage.getItem('keyID')
        if(keyID == undefined){keyID = 0}
        else{
            keyID = parseInt(keyID)
        }
        return keyID + 1
    }

    //gravando despesas no localStorage
    gravarDados(d){
        var idAtual = this.getId()
        console.log(idAtual)

        localStorage.setItem('keyID', idAtual)
        localStorage.setItem(idAtual, JSON.stringify(d))
    }

    //recuperando as despesas do localStorage
    recuperarDados(){
        let arrayDespesas = []

        let keyID = localStorage.getItem('keyID')
        for(let i = 1; i <= keyID; i++){
            let desepesaRecuperada = localStorage.getItem(i)

            //verificar se existem dados null no array
            if(desepesaRecuperada == null){
              continue //pula o valor nulo
            }

            //listando os registro no array
            arrayDespesas.push(JSON.parse(desepesaRecuperada))
        }
        //localStorage.getItem()
        return arrayDespesas

    }

    pesquisarDados(despesa){
        let filtroDespesas = Array()
        filtroDespesas = this.recuperarDados()
        console.log(filtroDespesas)
        console.log(despesa)
    }
}

let bd = new Bd() //instância de um objeto Bd chamando por uma variável.

//Função que ira ser chamada para cadastrar um despesa...
function cadastrarDespesa(){

    //RECUPERANDO OS VALORES DO FORMULÁRIO DE REGISTRO DE NOVA DESPESA...
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value.replace(",", ".");

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

    if(despesa.validarDados() == true){
        //chamando a função para gravar despesa
        bd.gravarDados(despesa)
        //dialog sucess!

        let tituloModal = document.getElementById('tituloModal')
        tituloModal.innerHTML = "Registro realizado com sucesso"
        tituloModal.className = "p-1 bg-light text-success"

        let textInfoModal = document.getElementById('infoModal')
        textInfoModal.innerHTML = "Todos os dados foram cadastrados corretamente!"
        textInfoModal.className = "p-1 text-dark"

        let botaoModal = document.getElementById('botaoModal')
        botaoModal.innerHTML = "Voltar"
        botaoModal.className = "btn btn-success"

        console.log(despesa)
        $('#modaltst').modal()
        limparCampos()

    }else{
        //dialog invalid!
        //alert('Dados incorretoslet tituloModal = document.getElementById('tituloModal')
        tituloModal.innerHTML = "Erro na inclusão do registro"
        tituloModal.className = "p-1 bg-light text-danger"

        let textInfoModal = document.getElementById('infoModal')
        textInfoModal.innerHTML = "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!"
        textInfoModal.className = "p-1 text-dark"

        let botaoModal = document.getElementById('botaoModal')
        botaoModal.innerHTML = "Voltar e corrigir"
        botaoModal.className = "btn btn-danger"

        console.log(despesa)
        $('#modaltst').modal()
    }
}

//Função a ser chamada para listar as despesas já cadastradas...
function carregaListaDados(){
    let todasAsDespesas = Array()
    todasAsDespesas = bd.recuperarDados()

    //percorrer o array todasAsDespesas
    todasAsDespesas.forEach(function(d){
        //console.log(d)
        if(d.tipo == "Alimentacao"){d.tipo = "Alimentação"}
        if(d.tipo == "Educacao"){d.tipo = "Educação"}
        if(d.tipo == "Saude"){d.tipo = "Saúde"}

        d.mes = parseInt(d.mes)
        if(d.mes < 10){
            d.mes = "0" + d.mes
        }

        //tbody da tabela
        let tabelaDespesas = document.getElementById('tBody_listar_despesas')

        //criando a linha <tr>
        let linhaTabela =  tabelaDespesas.insertRow()

        //colunas
        linhaTabela.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linhaTabela.insertCell(1).innerHTML = `${d.tipo}`
        linhaTabela.insertCell(2).innerHTML = `${d.descricao}`
        linhaTabela.insertCell(3).innerHTML = `${d.valor}`
    })
}

function limparCampos(){
    let ano = document.getElementById('ano').value = ''
    let mes = document.getElementById('mes').value = ''
    let dia = document.getElementById('dia').value = ''
    let tipo = document.getElementById('tipo').value = ''
    let descricao = document.getElementById('descricao').value = ''
    let valor = document.getElementById('valor').value = ''

}

function pesquisaDados(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesaPesquisada = new Despesa(ano,mes,dia,tipo,descricao,valor)

    bd.pesquisarDados(despesaPesquisada)
}
