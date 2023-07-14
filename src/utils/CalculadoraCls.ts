export class CalculadoraCls {

    private primeiroValor: number = 0
    private operadores: Array<string> = ['/', '*', '+', '-', 'C', '←', '=', '√', 'x²']
    private operador: string = ''
    public txtVisor: string = '0'
    private temVirgula: boolean = false

    /**
     * Recebe o botão clicado e registra o valor no visor da calculadora
     * @param bt string: valor do botão
     */
    public enviaValor(bt: string): void {
        if (bt == ',') {
            this.temVirgula = true
        }
        if (!this.operadores.includes(bt)) {
            if (!this.txtVisor) {
                this.txtVisor = bt
            }
            else {
                if (this.txtVisor == '0') {
                    this.txtVisor = bt
                } else if (bt == '0') {
                    this.txtVisor = this.txtVisor.concat(bt)
                } else {

                    this.txtVisor = this.txtVisor.concat(bt)
                    this.formatar()
                }
            }
        }
        else {
            this.limpaValor()
            if (bt == '←') {
                if (this.txtVisor.length == 0) {
                    this.txtVisor = '0'
                } else {
                    this.txtVisor = this.txtVisor.substring(0, this.txtVisor.length - 1)
                }
            }
            else if (bt == 'C') {
                this.txtVisor = '0'
            }
            else if (bt == '=') {
                if (!this.primeiroValor) {
                    this.txtVisor = '0'
                } else {

                    this.calcular(this.primeiroValor, parseFloat(this.txtVisor), this.operador)
                    this.primeiroValor = 0
                }
            }
            else if (bt == '+') {
                this.primeiroValor = parseFloat(this.txtVisor)
                this.operador = '+'
                this.txtVisor = '0'
            }
            else if (bt == '-') {
                this.primeiroValor = parseFloat(this.txtVisor)
                this.operador = '-'
                this.txtVisor = '0'
            }
            else if (bt == '/') {
                this.primeiroValor = parseFloat(this.txtVisor)
                this.operador = '/'
                this.txtVisor = '0'
            }
            else if (bt == '*') {
                this.primeiroValor = parseFloat(this.txtVisor)
                this.operador = '*'
                this.txtVisor = '0'
            } else if (bt == '√') {
                if (this.txtVisor != '0') {
                    this.primeiroValor = parseFloat(this.txtVisor)
                    this.txtVisor = Math.sqrt(this.primeiroValor).toString()
                }
            } else if (bt == 'x²') {
                if (this.txtVisor != '0') {
                    this.primeiroValor = parseFloat(this.txtVisor)
                    this.txtVisor = (this.primeiroValor ** 2).toString()
                }
            }

        }
    }

    /**
     * Realiza a operação matemática escolhida pelo usuário
     * @param vr1 number: primeiro valor informado
     * @param vr2 number: segundo valor informado
     * @param op string: qual operação foi definida  
     */
    public calcular(vr1: number, vr2: number, op: string): void {

        let resultado: number = 0
        if (op == '+') {
            resultado = vr1 + vr2
        } else if (op == '-') {
            resultado = vr1 - vr2
        } else if (op == '/') {
            if (vr1 == 0 || vr2 == 0) {
                resultado = 0
            } else {
                resultado = vr1 / vr2
            }
        } else if (op == '*') {
            resultado = vr1 * vr2
        }
        this.operador = ''
        this.txtVisor = resultado.toLocaleString('pt-br')
        this.formatar()

    }

    /**
     * Formato o valor do visor no padrão Português - Brasil
     */
    public formatar(): void {
        this.limpaValor()
        const valor: number = parseFloat(this.txtVisor)

        if (parseInt(this.txtVisor) != parseFloat(this.txtVisor)) {
            this.txtVisor = valor.toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 0 })
        } else if (this.temVirgula) {
            this.txtVisor = valor.toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 0 }).concat(',')
            this.temVirgula = false
        } else {
            this.txtVisor = valor.toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 0 })
        }

    }

    /**
     * Limpa o valor recebido, e tranforma em número para efeito de calculos  
     */
    public limpaValor(): void {
        let vrString = this.txtVisor
        const tamanho: Array<string> = vrString.split('.')
        let x: number = 0

        for (x = 0; tamanho.length >= x; x++) {
            vrString = vrString.replace('.', '')
        }
        vrString = vrString.replace(',', '.')
        this.txtVisor = vrString
    }
}