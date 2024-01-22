import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CpfService {
  cleanCPF(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }
  validateCPFlength(cpf: string): void {
    if (cpf.length !== 11) {
      throw new HttpException(
        'Invalid CPF: must have 11 digits',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  calculateAndVerifyCPF(baseCPF: string): string {
    const newCPF = baseCPF.substring(0, 9);
    const cpfWithFirstDigit = this.calculateDigit(newCPF, 10);
    const cpfWithSecondDigit = this.calculateDigit(cpfWithFirstDigit, 11);
    return cpfWithSecondDigit;
  }
  calculateDigit(baseCPF: string, num: number): string {
    let sum = 0;
    for (let i = 0; i < baseCPF.length; i++) {
      const digit = Number(baseCPF[i]);
      sum += digit * num;
      num--;
    }
    let rest = sum % 11;
    const calculatedDigit = rest < 2 ? 0 : 11 - rest;
    const result = baseCPF + `${calculatedDigit}`;
    return result;
  }
}
