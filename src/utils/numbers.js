export function toMoney(value) {
    if (!value && value !== 0) return '--';
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}
