import { CalculadoraCls } from './utils/CalculadoraCls';

function passaValor(bt: string): void {
  const calc: CalculadoraCls = new CalculadoraCls();
  const tela = document.querySelector('#txtVisor') as HTMLInputElement
  calc.txtVisor = tela.value
  calc.enviaValor(bt)
}
