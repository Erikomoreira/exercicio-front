let inputNomeMedico = document.getElementById("medicoNome");
let frmRD = document.getElementById("form-RD");
let crm = document.getElementById("medicoCRM");
let quantidade = document.getElementById("quantidadeCaixas");
let inputNomePaciente = document.getElementById("pacienteNome");
let pacienteCPF = document.getElementById("pacienteCPF");


const validarForm = (e) => { // pegar o evento
    e.preventDefault(); // abortando o envio

    let nomeValor = inputNomeMedico.value.trim();
    let crmValor = crm.value.trim();
    let quantidadeValor = quantidade.value.trim();
    let pacienteValor = inputNomePaciente.value.trim();
    let cpfValor = pacienteCPF.value.trim();


    if (ehCRM(crmValor) && ehNome(nomeValor) && ehQuantidade(quantidadeValor) && ehNome(pacienteValor)) {

        abreModal();

    }

}

const TestaCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}


const enviaFormulario = () => {
    frmRD.submit();
}


const abreModal = () => {

    $("#enviarFormulario").modal({
        show: true
    });

}

const ehQuantidade = (quantidadeInput) => {

    if (quantidadeInput < 0) {

        erroCampo(quantidade);
        quantidade.focus();
        return false;

    }

    return true;

}

const ehCRM = (crmInput) => {

    if (crmInput.length < 10) {

        erroCampo(crm);
        crm.focus();
        return false;

    }

    return true;

}

const ehNome = (nome) => {

    let re = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
    if (!re.test(nome) || ehTamanhoMinimo(nome.length, 3)) {
        erroCampo(inputNomeMedico);
        inputNomeMedico.focus();
        return false;
    }
    return true;

};

const ehTamanhoMinimo = (campo, tamanho) => {
    return campo < tamanho;
};

const erroCampo = (campo) => {
    campo.setAttribute('class', 'form-control is-invalid');
}

frmRD.addEventListener('submit', validarForm);
closeModal.addEventListener('click', enviaFormulario);