export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(value: string | number | Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}
